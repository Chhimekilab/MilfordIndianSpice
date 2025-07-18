# Sitemap Update Scripts for Milford India Spice

This directory contains automated scripts to update the `sitemap.xml` file for the Milford India Spice website. The scripts automatically scan for HTML files and generate a properly formatted sitemap with current timestamps.

## 📁 Files Overview

- **`sitemap.xml`** - The main sitemap file (auto-generated)
- **`update_sitemap.py`** - Python script for sitemap updates
- **`update_sitemap.js`** - Node.js script for sitemap updates  
- **`update_sitemap.sh`** - Shell script wrapper for easy execution
- **`SITEMAP_UPDATE_README.md`** - This documentation file

## 🚀 Quick Start

### Option 1: Shell Script (Recommended)
```bash
./update_sitemap.sh
```

### Option 2: Python Script
```bash
python3 update_sitemap.py
```

### Option 3: Node.js Script
```bash
node update_sitemap.js
```

## 📋 Features

- ✅ **Automatic HTML Detection** - Scans directory for HTML files
- ✅ **Timestamp Updates** - Updates `lastmod` with current timestamp
- ✅ **Backup Creation** - Backs up existing sitemap before updating
- ✅ **XML Validation** - Basic validation of generated sitemap
- ✅ **Priority & Frequency** - Configurable priority and change frequency
- ✅ **Multiple Languages** - Python, JavaScript/Node.js, and Shell versions

## 🔧 Configuration

### Page Configuration
The scripts are pre-configured for the current site structure:

```
├── index.html     (Priority: 1.0, URL: /)
├── menu.html      (Priority: 0.9, URL: /menu.html)
└── sitemap.xml    (Generated automatically)
```

### Adding New Pages
To include new HTML pages in the sitemap:

**Python version (`update_sitemap.py`):**
```python
page_config = {
    "index.html": {"priority": "1.0", "changefreq": "weekly", "url": "/"},
    "menu.html": {"priority": "0.9", "changefreq": "weekly"},
    "new-page.html": {"priority": "0.8", "changefreq": "monthly"},  # Add this
}
```

**Node.js version (`update_sitemap.js`):**
```javascript
const pageConfig = {
    'index.html': { priority: '1.0', changefreq: 'weekly', url: '/' },
    'menu.html': { priority: '0.9', changefreq: 'weekly' },
    'new-page.html': { priority: '0.8', changefreq: 'monthly' }  // Add this
};
```

## 📊 Current Sitemap Structure

The generated sitemap follows this XML structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://milfordiindiaspice.com/</loc>
    <lastmod>2025-01-11T12:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://milfordiindiaspice.com/menu.html</loc>
    <lastmod>2025-01-11T12:00:00+00:00</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

## 🔍 Validation & Testing

### Built-in Validation
All scripts include basic XML validation:
- ✅ XML declaration check
- ✅ Namespace validation
- ✅ URL count verification

### External Validation
After updating, test your sitemap:

1. **Direct URL Test**: https://milfordiindiaspice.com/sitemap.xml
2. **Online Validators**:
   - [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
   - [Yandex Sitemap Validator](https://webmaster.yandex.com/tools/sitemap/)
3. **Google Search Console**:
   - Submit sitemap URL
   - Monitor indexing status

## 🤖 Automation

### Cron Job (Linux/Mac)
Add to crontab to update sitemap automatically:

```bash
# Update sitemap daily at 2 AM
0 2 * * * cd /path/to/website && ./update_sitemap.sh

# Update sitemap weekly on Sundays at 3 AM
0 3 * * 0 cd /path/to/website && python3 update_sitemap.py
```

### GitHub Actions (CI/CD)
```yaml
name: Update Sitemap
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  push:
    branches: [main]

jobs:
  update-sitemap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Update Sitemap
        run: python3 update_sitemap.py
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add sitemap.xml
          git commit -m "Auto-update sitemap" || exit 0
          git push
```

## 🚨 Troubleshooting

### Common Issues

**Issue: "No HTML pages found"**
- Ensure you're running the script from the website root directory
- Check that `index.html` and `menu.html` exist
- Verify file permissions

**Issue: "Permission denied"**
- Make shell script executable: `chmod +x update_sitemap.sh`
- Check write permissions for `sitemap.xml`

**Issue: "Invalid XML"**
- Check for special characters in URLs
- Ensure proper encoding (UTF-8)
- Validate XML syntax online

### Debug Mode
Run scripts with verbose output:

```bash
# Python
python3 -v update_sitemap.py

# Node.js
DEBUG=* node update_sitemap.js
```

## 📈 SEO Best Practices

### Sitemap Optimization
- ✅ **Regular Updates** - Update when content changes
- ✅ **Proper Priorities** - Homepage (1.0) > Main pages (0.9) > Other pages (0.8)
- ✅ **Accurate Timestamps** - Use actual last modification dates
- ✅ **Realistic Change Frequency** - Don't over-promise update frequency

### robots.txt Integration
Ensure your `robots.txt` references the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://milfordiindiaspice.com/sitemap.xml
```

### Search Console Submission
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Navigate to Sitemaps
4. Submit: `https://milfordiindiaspice.com/sitemap.xml`

## 📞 Support

For issues or questions about the sitemap update system:
1. Check this README for common solutions
2. Validate your sitemap using online tools
3. Review the generated `sitemap.xml` for errors
4. Test the sitemap URL directly in a browser

## 🔄 Version History

- **v1.0** - Initial sitemap update scripts
- **v1.1** - Added multiple language support (Python, Node.js, Shell)
- **v1.2** - Enhanced validation and error handling
- **v1.3** - Added automation and CI/CD examples

---
*Last updated: January 11, 2025*
*Milford India Spice - Website Maintenance*