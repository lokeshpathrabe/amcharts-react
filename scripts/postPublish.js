const fs = require('fs');
const path = require('path');

const originalPackage = path.resolve(__dirname, '../package.json');
const backUpPackage = path.resolve(__dirname, '../bck-package.json');
const versions = path.resolve(__dirname, '../versions.json');

//Rename package
if (fs.existsSync(backUpPackage)) {
  fs.unlinkSync(originalPackage);
  fs.renameSync(backUpPackage, originalPackage);
}

//Add latest version to versions.json
const versionsData = require(versions);

// release-it will add releasing key to versions.json as configured in package.json
if (versionsData.releasing) {
  versionsData.old.unshift(versionsData.latest);
  versionsData.latest = versionsData.releasing;
  delete versionsData.releasing;
}

fs.writeFileSync(versions, JSON.stringify(versionsData), e => {
  throw e;
});
