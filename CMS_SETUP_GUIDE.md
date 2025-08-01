# Content Management System Setup Guide

## Overview

The Milford India Spice website includes a complete Content Management System (CMS) for managing menu items, images, and website content. This guide will help you set up and use the CMS effectively.

## 🚀 Quick Start

### 1. Environment Setup

1. **Create Environment File:**
   ```bash
   cd admin-cms
   cp env.example .env
   ```

2. **Configure Environment Variables:**
   Edit `.env` file with your secure credentials:
   ```env
   PORT=3001
   SESSION_SECRET=your-super-secret-session-key-here
   ADMIN_PASSWORD=your-secure-admin-password-here
   ```

### 2. Install Dependencies

```bash
cd admin-cms
npm install
```

### 3. Start the CMS Server

```bash
npm start
# or for development with auto-restart:
npm run dev
```

The CMS will be available at: `http://localhost:3001`

## 📋 CMS Features

### ✅ **Currently Implemented:**

1. **Menu Management**
   - Add, edit, delete menu items
   - Upload images for menu items
   - Category organization
   - Dietary information management
   - Price management
   - Out-of-stock status

2. **Image Management**
   - Upload menu item images
   - Automatic image optimization
   - Fallback placeholder system
   - File type validation

3. **Admin Authentication**
   - Secure login system
   - Session management
   - Password protection

4. **Data Structure**
   - JSON-based menu data
   - Structured categories
   - Comprehensive item details

### 🔧 **Required Updates for Full Integration:**

1. **Menu HTML Generation**
   - The `regenerateMenuHtml()` function needs to be implemented
   - Dynamic menu.html generation from CMS data
   - Template system for consistent formatting

2. **Image Integration**
   - Connect uploaded images to menu items
   - Automatic placeholder fallback
   - Image optimization and resizing

3. **Website Integration**
   - Connect CMS data to main website
   - Real-time updates
   - SEO optimization

## 🛠️ Implementation Steps

### Step 1: Complete Menu HTML Generation

The CMS currently has a placeholder for menu HTML generation. To complete this:

1. **Update `admin-cms/server.js`:**
   - Implement the `regenerateMenuHtml()` function
   - Create a template system for menu items
   - Generate proper HTML with image fallbacks

2. **Template System:**
   - Create EJS templates for menu sections
   - Implement dynamic category grouping
   - Add proper image handling

### Step 2: Image Management Integration

1. **Upload System:**
   - Images are uploaded to `menu-images/` directory
   - Automatic filename generation
   - File type validation

2. **Fallback System:**
   - Use placeholder images when no image is available
   - Automatic fallback on image load failure
   - Consistent image sizing

### Step 3: Website Integration

1. **Data Loading:**
   - Load menu data from `menu-data.json`
   - Implement caching for performance
   - Real-time updates

2. **SEO Optimization:**
   - Generate proper meta tags
   - Structured data markup
   - Image alt text management

## 📁 File Structure

```
MilfordIndianSpice/
├── admin-cms/                 # CMS Server
│   ├── server.js             # Main server file
│   ├── package.json          # Dependencies
│   ├── views/                # Admin interface templates
│   │   ├── login.ejs
│   │   ├── admin-home.ejs
│   │   ├── menu-management.ejs
│   │   └── partials/
│   └── node_modules/
├── menu-images/              # Menu item images
│   ├── placeholder.png       # Default placeholder
│   ├── vegetable-samosa.jpg  # Example menu image
│   └── README.md            # Image management guide
├── menu-data.json           # Menu data storage
├── menu.html                # Generated menu page
├── index.html               # Main website
└── CMS_SETUP_GUIDE.md       # This guide
```

## 🔐 Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong, unique passwords
   - Rotate session secrets regularly

2. **File Upload Security:**
   - Validate file types
   - Limit file sizes
   - Sanitize filenames

3. **Authentication:**
   - Use HTTPS in production
   - Implement rate limiting
   - Regular password updates

## 🚀 Deployment

### Local Development:
```bash
cd admin-cms
npm run dev
```

### Production Deployment:
1. Set up environment variables
2. Install dependencies: `npm install --production`
3. Start server: `npm start`
4. Set up reverse proxy (nginx/Apache)
5. Configure SSL certificates

## 📊 Usage Workflow

### Adding a New Menu Item:
1. Login to CMS at `http://localhost:3001`
2. Navigate to Menu Management
3. Click "Add Menu Item"
4. Fill in details (name, description, price, category)
5. Upload image (optional)
6. Set dietary information
7. Save - automatically updates menu.html

### Updating Existing Items:
1. Find item in CMS dashboard
2. Click "Edit"
3. Modify details as needed
4. Upload new image if desired
5. Save changes

### Managing Images:
1. Upload images through CMS interface
2. Images automatically saved to `menu-images/`
3. Fallback to placeholder if image fails
4. Use README.md in menu-images/ for detailed instructions

## 🔧 Troubleshooting

### Common Issues:

1. **CMS Won't Start:**
   - Check if port 3001 is available
   - Verify environment variables are set
   - Check Node.js version compatibility

2. **Images Not Uploading:**
   - Verify `menu-images/` directory exists
   - Check file permissions
   - Validate file type and size

3. **Menu Not Updating:**
   - Check `regenerateMenuHtml()` function
   - Verify file write permissions
   - Check for JavaScript errors

### Support:
- Check server logs for error messages
- Verify all dependencies are installed
- Ensure proper file permissions

## 📈 Future Enhancements

1. **Database Integration:**
   - Replace JSON with database (MySQL/PostgreSQL)
   - Better data relationships
   - Improved performance

2. **Advanced Features:**
   - Bulk import/export
   - Menu analytics
   - Customer feedback system
   - Order management integration

3. **UI Improvements:**
   - Drag-and-drop image upload
   - Rich text editor for descriptions
   - Preview functionality
   - Mobile-responsive admin interface

## 📞 Support

For technical support or questions about the CMS:
- Check this guide first
- Review server logs for errors
- Ensure all setup steps are completed
- Verify environment configuration 