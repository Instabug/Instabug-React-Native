'use strict';
var fs = require('fs');

const LOG_LEVEL_SUCCESS = 0;
const LOG_LEVEL_WARN = 1;

const CHAR_OPEN_PARAN = '{';
const CHAR_CLOSED_PARAN = '}';

const GRADLE_FILE_PATH = 'android/build.gradle';
const MAVEN_REPO_URL =
  'https://sdks.instabug.com/nexus/repository/instabug-cp';

function readFile(filePath, success) {
  fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
      finish(
        LOG_LEVEL_WARN,
        `Linking process could not be completed because of\n${err.message}`
      );
    }
    success(data);
  });
}

function findClosureStart(data, index) {
  const alphRegex = /[a-z]/;
  let maven = '';
  let foundOpenParan = false;
  let closureStart = -1;
  for (let i = index; i >= 0; i--) {
    if (!foundOpenParan) {
      foundOpenParan = data.charAt(i) === CHAR_OPEN_PARAN;
    }

    if (alphRegex.test(data.charAt(i)) && foundOpenParan) {
      maven = data.charAt(i) + maven;
    }
    if (maven === 'maven') {
      closureStart = i;
      break;
    }
  }
  return closureStart;
}

function findClosureEnd(data, index) {
  const startIndex = index + MAVEN_REPO_URL.length + 2;
  let closureEnd = -1;
  //after
  for (let i = startIndex; i < data.length; i++) {
    if (data.charAt(i) === CHAR_CLOSED_PARAN) {
      closureEnd = i;
      break;
    }
  }
  return closureEnd;
}

function removeMavenRepo(data) {
  const regex = /\"https:\/\/sdks.instabug.com\/nexus\/repository\/instabug-cp\"/;
  if (!regex.test(data) || !data.match(regex)) {
    finish(LOG_LEVEL_SUCCESS, 'Already Unlinked');
    return data;
  } else {
    const start = findClosureStart(data, data.match(regex).index);
    const end = findClosureEnd(data, data.match(regex).index);
    let newGradle =
      data.substring(0, start) + data.substring(end + 1, data.length);
      return newGradle;
  } 
}

function writeFile(data) {
  fs.writeFile(GRADLE_FILE_PATH, data, err => {
    if (err) {
      finish(
        LOG_LEVEL_WARN,
        `Unlinking process could not be completed because of\n${err.message}`
      );
    }
    finish(LOG_LEVEL_SUCCESS, 'Unlinking process completed successfully');
  });
}

function finish(logLevel, message) {
  if (logLevel === LOG_LEVEL_SUCCESS) {
    console.info(message);
  } else {
    console.warn(message);
  }
}

readFile(GRADLE_FILE_PATH, function(data) {
  const newGradle = removeMavenRepo(data);
  writeFile(newGradle);
});
