document.addEventListener("DOMContentLoaded", () => {
  const notesField = document.getElementById("text-notes");
  const saveButton = document.getElementById("save-notes");
  const screenshotButton = document.getElementById("screenshot");
  const screenshotContainer = document.getElementById("screenshot-container");
  const canvas = document.getElementById("screenshot-canvas");
  const drawModeButton = document.getElementById("draw-mode");
  const saveScreenshotButton = document.getElementById("save-annotated-screenshot");
  const notesDirectory = document.getElementById("notes-directory");

  let currentURL = "";
  let isDrawing = false;
  let ctx = canvas.getContext("2d");

  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    currentURL = new URL(tabs[0].url).origin;
    chrome.storage.local.get([currentURL], (result) => {
      if (result[currentURL]) {
        notesField.value = result[currentURL].notes || "";
      }
    });
    loadNotesDirectory();
  });

  // Save notes
  saveButton.addEventListener("click", () => {
    const notes = notesField.value;
    chrome.storage.local.set({ [currentURL]: { notes, url: currentURL } }, () => {
      alert("Notes saved!");
      loadNotesDirectory();
    });
  });

  // Take a screenshot
  screenshotButton.addEventListener("click", () => {
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
      const img = new Image();
      img.src = screenshotUrl;
      img.onload = () => {
        canvas.width = 600;
        canvas.height = 300; // Resize canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        screenshotContainer.classList.remove("hidden");
      };
    });
  });

  // Toggle drawing mode
  drawModeButton.addEventListener("click", () => {
    isDrawing = !isDrawing;
    drawModeButton.textContent = isDrawing ? "Disable Pen Tool" : "Enable Pen Tool";
  });

  // Draw on the canvas
  canvas.addEventListener("mousedown", () => (isDrawing = true));
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.lineCap = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  });

  // Save annotated screenshot
  saveScreenshotButton.addEventListener("click", () => {
    const screenshot = canvas.toDataURL();
    chrome.storage.local.get([currentURL], (result) => {
      const notesData = result[currentURL] || {};
      notesData.screenshot = screenshot;
      chrome.storage.local.set({ [currentURL]: notesData }, () => {
        alert("Annotated screenshot saved!");
        loadNotesDirectory();
      });
    });
  });

  // Load notes directory
  function loadNotesDirectory() {
    notesDirectory.innerHTML = ""; // Clear previous entries
    chrome.storage.local.get(null, (result) => {
      Object.keys(result).forEach((key) => {
        const noteData = result[key];
        const noteEntry = document.createElement("div");
        noteEntry.classList.add("note-entry");
        noteEntry.innerHTML = `
          <span>${key}</span>
          <button class="delete-btn" data-key="${key}">Delete</button>
        `;

        // Redirect on click
        noteEntry.querySelector("span").addEventListener("click", () => {
          if (noteData.url) {
            chrome.tabs.update({ url: noteData.url });
          }
        });

        // Delete note
        noteEntry.querySelector(".delete-btn").addEventListener("click", (e) => {
          const keyToDelete = e.target.dataset.key;
          chrome.storage.local.remove(keyToDelete, () => {
            alert(`Deleted notes for ${keyToDelete}`);
            loadNotesDirectory();
          });
        });

        notesDirectory.appendChild(noteEntry);
      });
    });
  }
});
