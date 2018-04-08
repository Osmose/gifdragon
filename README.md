# GIFDragon

GIFDragon is a Firefox extension that lets you save URLs for images (typically GIFs), organized by category.

## User Guide

Before saving any images, you first need to create a category.

GIFDragon adds an icon to the toolbar that lets you organize categories and view collected images, as well as context menu items for saving images.

### Managing Categories

1. Click the GIFDragon icon in the toolbar.
2. Click "Add Category" to add a new, untitled category to the list.
3. Hover over a category and click "Edit" to modify the category's name. Hit Enter or click outside of the input box to save your changes.
4. While editing, click "Delete" to delete a category. You will lose all collected URLs for that category.

### Saving Images

Once a category is created, you can right-click any image you wish to save and click "Save GIF to Category Name" to save it to that category. If you have more than one category created, the commands will be under the "GIFDragon" submenu.

### Using Images

1. Click the GIFDragon icon in the toolbar.
2. Click the name of the category containing the image you want.
3. Locate the image you wish to use.

### Caveats

- GIFDragon currently only supports drag-and-drop of images onto webpages (e.g. for Github comments).
- Only image URLs are saved. If the URL becomes invalid or no longer leads to the original image, it will be shown as missing in the UI.

## Development Setup

First, install the requirements using `npm install`. Then, the following commands are available:

| Command | Description |
| --- | --- |
| `npm start` | Launch an instance of Firefox with the add-on installed. Uses web-ext, so the add-on is automatically reloaded when changes are saved. |
| `npm run build` | Build add-on into a zip file in `web-ext-artifacts`. |
| `npm run lint` | Run linting on code. |

## License

GIFDragon is covered under the MIT license. See the `LICENSE` file for details.
