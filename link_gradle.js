'use strict';
var fs = require('fs');

const LOG_LEVEL_SUCCESS = 0;
const LOG_LEVEL_WARN = 1;

const CHAR_OPEN_PARAN = '{';
const CHAR_CLOSED_PARAN = '}';

const GRADLE_FILE_PATH = 'android/build.gradle';
const MAVEN_REPO_URL =
  'https://sdks.instabug.com/nexus/repository/instabug-cp';

function getPosition(string, substring, occurrenceInString) {
  return string.split(substring, occurrenceInString).join(substring).length;
}

function findRepositoriesBlockEnd(block) {
  let repositoriesStartBlockIndex = getPosition(block, CHAR_OPEN_PARAN, 2);
  let count = 1;
  let blockEndIndex = -1;
  for (let i = repositoriesStartBlockIndex + 1; i < block.length; i++) {
    if (block.charAt(i) === CHAR_OPEN_PARAN) {
      count++;
    }

    if (block.charAt(i) === CHAR_CLOSED_PARAN) {
      count--;
    }

    if (count === 0) {
      blockEndIndex = i;
      break;
    }
  }

  return blockEndIndex;
}

function readFile(filePath, success) {
  fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
      console.log(process.cwd());
      finish(
        LOG_LEVEL_WARN,
        `Linking process could not be completed because of\n${err.message}`
      );
    }
    success(data);
  });
}

function writeFile(data) {
  fs.writeFile(GRADLE_FILE_PATH, data, err => {
    if (err) {
      finish(
        LOG_LEVEL_WARN,
        `Linking process could not be completed because of\n${err.message}`
      );
    }
    finish(LOG_LEVEL_SUCCESS, 'Linking process completed successfully');
  });
}

function finish(logLevel, message) {
  if (logLevel === LOG_LEVEL_SUCCESS) {
    console.info(message);
  } else {
    console.warn(message);
  }
  // process.exit(0);
}

function generateNewGradleFile(data) {

  if (data.includes(MAVEN_REPO_URL)) {
    finish(LOG_LEVEL_SUCCESS, '');
  }

  const regex = /allprojects\ *\n*\ *{/;
  if (!regex.test(data)) {
    finish(
      LOG_LEVEL_WARN,
      'Something went wrong while trying to complete the linking process. '
    );
  }

  
  const matchedRegex = data.match(regex);
  const block = data.substring(matchedRegex.index, data.length);
  const blockEndIndex = findRepositoriesBlockEnd(block);

  if (blockEndIndex === -1) {
    finish(
      LOG_LEVEL_WARN,
      'Something went wrong while trying to complete the linking process. '
    );
  }

  let updatedBlock = `${block.substring(0, blockEndIndex)}\tmaven {
      \t    url "${MAVEN_REPO_URL}"
       \t}  
      ${block.substring(blockEndIndex, block.length)}`;
  const newGradleFile = `${data.substring(
    0,
    matchedRegex.index
  )}${updatedBlock}`;
  return newGradleFile;
}


readFile(GRADLE_FILE_PATH, function(data) {
  const newFile = generateNewGradleFile(data)
    writeFile(newFile);
});
