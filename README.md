# high-seas-note-extension
---

# Site-Specific Notes Chrome Extension

## Overview
The **Site-Specific Notes** Chrome extension allows users to take notes, associate them with specific websites, and view them whenever they revisit the same website. The extension also provides a screenshot annotation tool with a pen for drawing and annotating images. Notes can be saved, edited, or deleted, and selecting a saved note redirects the browser to its associated website.

---

## Features
- **Website-Specific Notes**: Notes are tied to the URL where they were created, allowing you to see them only on the relevant site.
- **Screenshot Tool**: Capture screenshots of the current page, annotate them using a pen tool, and save them for later.
- **Resizable Popup**: The extension's popup is large enough for comfortable note-taking and screenshot editing.
- **Directory of Notes**: Access all saved notes in a scrollable list.
  - Click a note to redirect to the site where it was created.
  - Delete notes directly from the directory.
- **Pen Tool for Annotations**: Draw on screenshots using the integrated pen tool.

---

## Installation
1. Clone or download the repository to your computer.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top-right corner of the page).
4. Click **Load unpacked** and select the folder containing this extension's files.
5. The extension will appear in the toolbar.

---

## Usage
1. Navigate to any webpage and open the extension from the toolbar.
2. **Add Notes**:
   - Write your notes in the text area.
   - Click **Save Notes** to save them for the current website.
3. **Take Screenshots**:
   - Click **Take Screenshot** to capture the current tab.
   - Use the pen tool to annotate the screenshot.
   - Click **Save Screenshot** to store it with the current site.
4. **View and Manage Notes**:
   - Open the "Saved Notes Directory" section in the popup.
   - Click a note entry to redirect to the associated website.
   - Use the delete button to remove unwanted notes.

---

## Technologies Used
- **HTML**: For structuring the extension popup.
- **CSS**: Inline styles for a clean and responsive design.
- **JavaScript**: For note-taking, screenshot capture, pen tool, and Chrome API interactions.
- **Chrome Storage API**: To save and manage notes locally.

---

## Screenshots
- **Main Popup**:  
  - Write notes and save them for the current site.
  - Take and annotate screenshots.
- **Directory**:  
  - View all saved notes.
  - Redirect to their associated sites or delete them.

---

## Future Enhancements
- Add options for customizing the pen tool (e.g., colors, brush size).
- Support exporting notes to a file.
- Add a search bar for filtering notes by site or keyword.

---

## Contributing
Contributions are welcome! Feel free to fork this repository, create a feature branch, and submit a pull request.

---

## License
This project is licensed under the MIT License.

