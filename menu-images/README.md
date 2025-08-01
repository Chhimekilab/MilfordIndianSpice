# Menu Images Directory

This directory contains images for the menu items displayed on the website.

## Image Structure

Each menu item can have an associated image stored in this directory. The images should be named descriptively to match the menu items.

## Supported Image Formats

- JPG/JPEG
- PNG
- WebP

## Recommended Image Specifications

- **Dimensions**: 400x300 pixels (4:3 aspect ratio)
- **File Size**: Keep under 200KB for optimal loading
- **Quality**: High quality but web-optimized

## How It Works

1. **With Image**: When an image exists, it will be displayed at the top of the menu item card
2. **Without Image**: When no image is available, a colorful placeholder with an emoji will be shown
3. **Fallback**: If an image fails to load, the system automatically switches to the placeholder

## Adding New Images

To add images for menu items:

### Step 1: Upload the Image
1. Save your image in this directory (`menu-images/`)
2. Name it descriptively (e.g., `chicken-tikka-masala.jpg`, `butter-chicken.jpg`)
3. Ensure the image meets the recommended specifications above

### Step 2: Update the HTML Structure
Find the menu item in `menu.html` and change its structure from:
```html
<article class="menu-item">
  <img src="menu-images/placeholder.png" alt="Placeholder" class="menu-item-image-placeholder" style="display: block;">
  <div class="menu-item-content">
    <div class="menu-item-header">
      <h3>Chicken Tikka Masala</h3>
      <span class="price">$18</span>
    </div>
    <p>Description...</p>
  </div>
</article>
```

To:
```html
<article class="menu-item">
  <img src="menu-images/chicken-tikka-masala.jpg" alt="Creamy chicken tikka masala" class="menu-item-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
  <img src="menu-images/placeholder.png" alt="Placeholder" class="menu-item-image-placeholder" style="display: none;">
  <div class="menu-item-content">
    <div class="menu-item-header">
      <h3>Chicken Tikka Masala</h3>
      <span class="price">$18</span>
    </div>
    <p>Description...</p>
  </div>
</article>
```

### Key Changes:
- Add the main image with `class="menu-item-image"`
- Add `onerror` handler for automatic fallback
- Change placeholder to `style="display: none;"`
- Keep the `menu-item-content` wrapper

## Updating Existing Images

### Option 1: Replace the File
1. Delete the old image file
2. Upload the new image with the same filename
3. No HTML changes needed

### Option 2: Use a New Filename
1. Upload the new image with a different name
2. Update the `src` attribute in the HTML to point to the new filename
3. Example: Change `src="menu-images/old-image.jpg"` to `src="menu-images/new-image.jpg"`

## Deleting Images

### To Remove an Image and Show Placeholder:
1. Delete the image file from this directory
2. Update the HTML structure to remove the main image and show placeholder:

From:
```html
<img src="menu-images/chicken-tikka-masala.jpg" alt="..." class="menu-item-image" onerror="...">
<img src="menu-images/placeholder.png" alt="Placeholder" class="menu-item-image-placeholder" style="display: none;">
```

To:
```html
<img src="menu-images/placeholder.png" alt="Placeholder" class="menu-item-image-placeholder" style="display: block;">
```

### To Remove an Image Completely:
1. Delete the image file from this directory
2. Remove both image tags from the HTML
3. The menu item will display without any image

## Current Image Placeholders

The system includes emoji placeholders for different food categories:
- 🥟 - Samosas and appetizers
- 🍛 - Curry dishes
- 🥬 - Spinach-based dishes
- 🌶️ - Spicy dishes
- 🥥 - Coconut-based dishes
- 🍽️ - Platters and combinations
- 🐔 - Chicken dishes
- 🦐 - Seafood dishes
- 🥦 - Vegetable dishes

## Layout Behavior

- **With images**: Items display in a card layout with image on top, content below
- **Without images**: Items expand to use full width, content takes up the complete space
- **Responsive**: Images resize appropriately on mobile devices (150px height vs 200px on desktop)

## Performance Features

- Lazy loading with 3-second timeout
- Smooth fade-in animations
- Automatic fallback handling
- Responsive image sizing

## Troubleshooting

### Image Not Showing:
1. Check the file path in the HTML matches the actual filename
2. Ensure the image file exists in the `menu-images/` directory
3. Verify the image format is supported (JPG, PNG, WebP)
4. Check browser console for any loading errors

### Placeholder Showing Instead of Image:
1. The image file might be missing or corrupted
2. Check the `onerror` handler is working correctly
3. Verify the image filename matches exactly (case-sensitive)

### Layout Issues:
1. Ensure the `menu-item-content` wrapper is present
2. Check that both image tags have the correct classes
3. Verify the `style="display: none/block"` attributes are set correctly