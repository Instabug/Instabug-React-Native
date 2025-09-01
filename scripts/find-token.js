const fs = require('fs');
const path = require('path');

const IGNORED_DIRS = new Set(['node_modules', 'ios', 'android']);
const INCLUDED_EXTENSIONS = new Set(['.js', '.ts', '.jsx', '.tsx']);

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.has(file)) {
        getAllFiles(fullPath, fileList);
      }
    } else {
      if (INCLUDED_EXTENSIONS.has(path.extname(fullPath))) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function extractTokenFromInit(content) {
  const initMatch = content.match(/Instabug\.init\(\s*{[\s\S]*?token:\s*['"]([0-9a-zA-Z]+)['"]/);
  return initMatch ? initMatch[1] : null;
}

function extractTokenFromStart(content) {
  const startMatch = content.match(/Instabug\.start\(\s*['"]([0-9a-zA-Z]+)['"]/);
  return startMatch ? startMatch[1] : null;
}

function findInstabugToken() {
  const allFiles = getAllFiles('.');

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');

    const initToken = extractTokenFromInit(content);
    if (initToken) {
      console.log(initToken);
      process.exit(0);
    }

    const startToken = extractTokenFromStart(content);
    if (startToken) {
      console.log(startToken);
      process.exit(0);
    }
  }

  console.log("Couldn't find Instabug's app token");
  process.exit(1);
}

findInstabugToken();
