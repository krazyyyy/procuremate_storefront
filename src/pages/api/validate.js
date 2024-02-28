const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const validationFile = path.join(process.cwd(), 'validation.txt');
  const validateContent = fs.readFileSync(validationFile, 'utf-8');

  res.setHeader('Content-Type', 'text/plain');
  res.send(validateContent);
}
