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

1. Save your image in this directory
2. Name it descriptively (e.g., `chicken-tikka-masala.jpg`)
3. Update the corresponding menu item in `menu.html` with the correct image path
4. The system will automatically handle loading and fallbacks

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