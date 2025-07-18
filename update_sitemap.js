#!/usr/bin/env node

/**
 * Sitemap Update Script for Milford India Spice Website
 * Node.js version - updates sitemap.xml with current pages and timestamps
 */

const fs = require('fs');
const path = require('path');

class SitemapUpdater {
    constructor(baseUrl = 'https://milfordiindiaspice.com', sitemapPath = 'sitemap.xml') {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
        this.sitemapPath = sitemapPath;
        this.pages = [];
    }

    scanHtmlFiles() {
        console.log('🔍 Scanning for HTML files...');
        
        // Define page configuration
        const pageConfig = {
            'index.html': { priority: '1.0', changefreq: 'weekly', url: '/' },
            'menu.html': { priority: '0.9', changefreq: 'weekly' }
        };

        // Get all HTML files in current directory
        const files = fs.readdirSync('.').filter(file => file.endsWith('.html'));
        
        files.forEach(file => {
            if (pageConfig[file]) {
                const config = pageConfig[file];
                const url = config.url || `/${file}`;
                
                this.pages.push({
                    loc: `${this.baseUrl}${url}`,
                    lastmod: new Date().toISOString(),
                    changefreq: config.changefreq,
                    priority: config.priority
                });
                
                console.log(`  ✓ Added: ${file} -> ${this.baseUrl}${url}`);
            }
        });

        console.log(`📄 Found ${this.pages.length} pages to include in sitemap`);
    }

    generateSitemapXml() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        this.pages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${page.loc}</loc>\n`;
            xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        });

        xml += '</urlset>\n';
        return xml;
    }

    backupExistingSitemap() {
        if (fs.existsSync(this.sitemapPath)) {
            const backupPath = `${this.sitemapPath}.backup`;
            fs.copyFileSync(this.sitemapPath, backupPath);
            console.log(`💾 Backed up existing sitemap to ${backupPath}`);
            return true;
        }
        return false;
    }

    updateSitemap() {
        console.log('🚀 Starting sitemap update...');
        
        // Scan for HTML files
        this.scanHtmlFiles();

        if (this.pages.length === 0) {
            console.log('❌ No HTML pages found to include in sitemap');
            return false;
        }

        // Backup existing sitemap
        this.backupExistingSitemap();

        // Generate new sitemap
        const sitemapXml = this.generateSitemapXml();

        // Write to file
        try {
            fs.writeFileSync(this.sitemapPath, sitemapXml, 'utf8');
            console.log(`✅ Sitemap updated successfully: ${this.sitemapPath}`);
            console.log(`📊 Added ${this.pages.length} pages to sitemap`);
            return true;
        } catch (error) {
            console.error('❌ Error writing sitemap:', error.message);
            return false;
        }
    }

    validateSitemap() {
        console.log('🔍 Validating sitemap...');
        
        try {
            const content = fs.readFileSync(this.sitemapPath, 'utf8');
            
            // Basic XML validation
            if (!content.includes('<?xml version="1.0"')) {
                console.log('⚠️  Warning: Missing XML declaration');
                return false;
            }
            
            if (!content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
                console.log('⚠️  Warning: Missing or incorrect urlset declaration');
                return false;
            }

            // Count URLs
            const urlMatches = content.match(/<url>/g);
            const urlCount = urlMatches ? urlMatches.length : 0;
            
            console.log(`✅ Sitemap validation passed: ${urlCount} URLs found`);
            return true;
            
        } catch (error) {
            console.error('❌ Sitemap validation failed:', error.message);
            return false;
        }
    }

    printSummary() {
        console.log('\n📋 Sitemap Update Summary');
        console.log('========================');
        console.log(`🌐 Website: ${this.baseUrl}`);
        console.log(`📄 Sitemap file: ${this.sitemapPath}`);
        console.log(`📊 Total URLs: ${this.pages.length}`);
        console.log(`🕒 Updated: ${new Date().toLocaleString()}`);
        
        console.log('\n📌 Next Steps:');
        console.log('1. Test sitemap URL: ' + `${this.baseUrl}/sitemap.xml`);
        console.log('2. Submit to Google Search Console');
        console.log('3. Verify robots.txt references the sitemap');
        console.log('4. Use online sitemap validators to double-check');
    }
}

// Main execution
function main() {
    console.log('🌐 Milford India Spice - Sitemap Updater');
    console.log('========================================\n');

    const updater = new SitemapUpdater();
    
    const success = updater.updateSitemap();
    
    if (success) {
        updater.validateSitemap();
        updater.printSummary();
    } else {
        console.log('\n❌ Failed to update sitemap');
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = SitemapUpdater;