const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const sitemapPath = path.join(process.cwd(), 'robots.txt');
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');

  res.setHeader('Content-Type', 'text/plain');
  res.send(sitemap);
}
