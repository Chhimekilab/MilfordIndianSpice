<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap - Milford India Spice</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            color: #333;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 30px;
          }
          
          h1 {
            color: #d32f2f;
            border-bottom: 3px solid #d32f2f;
            padding-bottom: 10px;
            margin-bottom: 30px;
            font-size: 2.5em;
          }
          
          .site-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
            border-left: 4px solid #d32f2f;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
          }
          
          th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          
          th {
            background-color: #d32f2f;
            color: white;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.9em;
            letter-spacing: 0.5px;
          }
          
          tr:hover {
            background-color: #f8f9fa;
          }
          
          a {
            color: #d32f2f;
            text-decoration: none;
            font-weight: 500;
          }
          
          a:hover {
            text-decoration: underline;
            color: #b71c1c;
          }
          
          .priority {
            font-weight: bold;
            text-align: center;
          }
          
          .priority-high { color: #4caf50; }
          .priority-medium { color: #ff9800; }
          .priority-low { color: #f44336; }
          
          .changefreq {
            text-align: center;
            font-style: italic;
          }
          
          .lastmod {
            text-align: center;
            font-family: monospace;
            font-size: 0.9em;
          }
          
          .url-count {
            background: #e3f2fd;
            padding: 10px 20px;
            border-radius: 6px;
            display: inline-block;
            margin-bottom: 20px;
            font-weight: bold;
            color: #1976d2;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <h1>🗺️ Sitemap - Milford India Spice</h1>
          
          <div class="site-info">
            <h3>About This Sitemap</h3>
            <p>This sitemap contains <span class="url-count"><xsl:value-of select="count(sm:urlset/sm:url)"/> URLs</span> for Milford India Spice restaurant website.</p>
            <p>Search engines use this file to better understand and crawl our website structure.</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">
                <xsl:sort select="sm:priority" order="descending"/>
                <tr>
                  <td>
                    <a href="{sm:loc}" target="_blank">
                      <xsl:value-of select="sm:loc"/>
                    </a>
                  </td>
                  <td class="lastmod">
                    <xsl:value-of select="sm:lastmod"/>
                  </td>
                  <td class="changefreq">
                    <xsl:value-of select="sm:changefreq"/>
                  </td>
                  <td class="priority">
                    <xsl:variable name="priority" select="sm:priority"/>
                    <xsl:choose>
                      <xsl:when test="$priority &gt;= 0.8">
                        <span class="priority-high"><xsl:value-of select="$priority"/></span>
                      </xsl:when>
                      <xsl:when test="$priority &gt;= 0.5">
                        <span class="priority-medium"><xsl:value-of select="$priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority-low"><xsl:value-of select="$priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>