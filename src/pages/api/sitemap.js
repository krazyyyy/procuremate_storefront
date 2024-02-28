const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const sitemapPath = path.join(process.cwd(), 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

  res.setHeader('Content-Type', 'text/xml');
  res.send(sitemap);
}
