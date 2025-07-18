#!/usr/bin/env python3
"""
Sitemap Update Script for Milford India Spice Website
This script automatically updates the sitemap.xml file with current pages and timestamps.
"""

import os
import xml.etree.ElementTree as ET
from datetime import datetime
import glob


class SitemapUpdater:
    def __init__(self, base_url="https://milfordiindiaspice.com", sitemap_path="sitemap.xml"):
        self.base_url = base_url.rstrip('/')
        self.sitemap_path = sitemap_path
        self.pages = []
        
    def scan_html_files(self):
        """Scan the directory for HTML files to include in sitemap."""
        html_files = glob.glob("*.html")
        
        # Define page priorities and change frequencies
        page_config = {
            "index.html": {"priority": "1.0", "changefreq": "weekly", "url": "/"},
            "menu.html": {"priority": "0.9", "changefreq": "weekly"},
        }
        
        for html_file in html_files:
            if html_file in page_config:
                config = page_config[html_file]
                url = config.get("url", f"/{html_file}")
                self.pages.append({
                    "loc": f"{self.base_url}{url}",
                    "lastmod": datetime.now().strftime("%Y-%m-%dT%H:%M:%S+00:00"),
                    "changefreq": config["changefreq"],
                    "priority": config["priority"]
                })
    
    def create_sitemap_xml(self):
        """Create the sitemap XML structure."""
        # Create root element
        urlset = ET.Element("urlset")
        urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
        
        # Add each page
        for page in self.pages:
            url_elem = ET.SubElement(urlset, "url")
            
            loc_elem = ET.SubElement(url_elem, "loc")
            loc_elem.text = page["loc"]
            
            lastmod_elem = ET.SubElement(url_elem, "lastmod")
            lastmod_elem.text = page["lastmod"]
            
            changefreq_elem = ET.SubElement(url_elem, "changefreq")
            changefreq_elem.text = page["changefreq"]
            
            priority_elem = ET.SubElement(url_elem, "priority")
            priority_elem.text = page["priority"]
        
        return urlset
    
    def format_xml(self, elem):
        """Format XML with proper indentation."""
        from xml.dom import minidom
        rough_string = ET.tostring(elem, 'utf-8')
        reparsed = minidom.parseString(rough_string)
        return reparsed.toprettyxml(indent="  ")[23:]  # Remove first line
    
    def update_sitemap(self):
        """Update the sitemap.xml file."""
        # Scan for HTML files
        self.scan_html_files()
        
        if not self.pages:
            print("No HTML pages found to include in sitemap.")
            return False
        
        # Create XML structure
        urlset = self.create_sitemap_xml()
        
        # Format and write to file
        xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n' + self.format_xml(urlset)
        
        # Backup existing sitemap if it exists
        if os.path.exists(self.sitemap_path):
            backup_path = f"{self.sitemap_path}.backup"
            os.rename(self.sitemap_path, backup_path)
            print(f"Backed up existing sitemap to {backup_path}")
        
        # Write new sitemap
        with open(self.sitemap_path, 'w', encoding='utf-8') as f:
            f.write(xml_content)
        
        print(f"Sitemap updated successfully: {self.sitemap_path}")
        print(f"Added {len(self.pages)} pages to sitemap")
        
        return True
    
    def validate_sitemap(self):
        """Basic validation of the sitemap XML."""
        try:
            tree = ET.parse(self.sitemap_path)
            root = tree.getroot()
            
            if root.tag != "{http://www.sitemaps.org/schemas/sitemap/0.9}urlset":
                print("Warning: Invalid root element in sitemap")
                return False
            
            urls = root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}url")
            print(f"Sitemap validation passed: {len(urls)} URLs found")
            return True
            
        except ET.ParseError as e:
            print(f"Sitemap validation failed: {e}")
            return False


def main():
    """Main function to update the sitemap."""
    updater = SitemapUpdater()
    
    print("Updating sitemap...")
    success = updater.update_sitemap()
    
    if success:
        print("Validating sitemap...")
        updater.validate_sitemap()
        print("\nSitemap update complete!")
        print("Remember to:")
        print("1. Submit the updated sitemap to Google Search Console")
        print("2. Check robots.txt to ensure sitemap is referenced")
        print("3. Test sitemap URL accessibility")
    else:
        print("Failed to update sitemap.")


if __name__ == "__main__":
    main()