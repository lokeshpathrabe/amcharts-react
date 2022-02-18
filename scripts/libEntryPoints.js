const Path = require('path');
const fs = require('fs');

const directoryPath = Path.join(__dirname, '../src/lib');

// Adds lib index file which exports all charts to root dist folder
const libEntry = {
  '.': Path.resolve(__dirname, '../src/lib/index.js'),
};
const files = fs.readdirSync(directoryPath);
const chartFileRegex = /(.*)\.chart\.js/g;

files.forEach(file => {
  const match = chartFileRegex.exec(file);
  if (match) {
    const componentName = match[1];
    libEntry[componentName] = Path.resolve(__dirname, `../src/lib/${file}`);
  }
});

module.exports = libEntry;
