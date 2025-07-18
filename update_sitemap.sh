#!/bin/bash

# Sitemap Update Script for Milford India Spice Website
# This script updates the sitemap.xml file with current timestamp

echo "🌐 Updating sitemap for Milford India Spice..."
echo "==============================================="

# Check if Python script exists
if [ ! -f "update_sitemap.py" ]; then
    echo "❌ Error: update_sitemap.py not found"
    exit 1
fi

# Run the Python script
python3 update_sitemap.py

# Check if sitemap was created/updated
if [ -f "sitemap.xml" ]; then
    echo ""
    echo "✅ Sitemap updated successfully!"
    echo "📊 Sitemap size: $(wc -c < sitemap.xml) bytes"
    echo "📝 Last modified: $(date -r sitemap.xml)"
    echo ""
    echo "🔗 Your sitemap is available at: https://milfordiindiaspice.com/sitemap.xml"
    echo ""
    echo "📋 Next steps:"
    echo "  1. Test the sitemap URL in your browser"
    echo "  2. Submit to Google Search Console"
    echo "  3. Verify robots.txt references the sitemap"
else
    echo "❌ Error: Failed to create/update sitemap.xml"
    exit 1
fi