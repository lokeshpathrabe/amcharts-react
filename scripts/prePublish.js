const fs = require('fs');
const path = require('path');

const originalPackage = path.resolve(__dirname, '../package.json');
const publishPackage = path.resolve(__dirname, '../publish-package.json');
const backUpPackage = path.resolve(__dirname, '../bck-package.json');

const pkgData = require(originalPackage);

//Remove dependencies
delete pkgData.dependencies;
delete pkgData.devDependencies;
delete pkgData.jest;

fs.writeFile(publishPackage, JSON.stringify(pkgData), function (error) {
  if (error) throw error;
});

//Rename package
fs.renameSync(originalPackage, backUpPackage);
fs.renameSync(publishPackage, originalPackage);
