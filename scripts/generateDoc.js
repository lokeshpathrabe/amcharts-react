const fs = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');
const chartFileMap = require('./chartFileMapping.js');

const DOCS_PATH = path.resolve(__dirname, '../src/demo/docs');

const deleteDocFiles = () => {
  fs.readdir(DOCS_PATH, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(DOCS_PATH, file), err => {
        if (err) throw err;
      });
    }
  });
};

const getChartClassesOnly = docData => {
  const docs = [...docData];
  const childClasses = [];
  const docToRemove = docData.reduce((cls, doc) => {
    // Remove class doc for parent interface classes
    if (doc.kind === 'class' && doc.augments) {
      Array.prototype.push.apply(cls, doc.augments);
    }

    // Remove typedef in doc if any
    if (doc.kind === 'typedef') {
      cls.push(doc.id);
    }
    return cls;
  }, []);
  for (const idx in docs) {
    if (!docToRemove.includes(docs[idx].id)) {
      childClasses.push(docs[idx]);
    }
  }
  return childClasses;
};

const generateDocFile = (docName, fileList) => {
  const docData = jsdoc2md.getTemplateDataSync({
    files: fileList.map(f => path.resolve(__dirname, f)),
  });

  const chartDocData = getChartClassesOnly(docData);
  jsdoc2md.render({ data: chartDocData }).then(content => {
    const mdPath = path.join(DOCS_PATH, `${docName.toLowerCase()}.docs.mdx`);
    fs.appendFile(mdPath, content, err => {
      if (err) throw err;
    });
  });
};

deleteDocFiles();
Object.keys(chartFileMap).forEach(name => {
  generateDocFile(name, chartFileMap[name]);
});
