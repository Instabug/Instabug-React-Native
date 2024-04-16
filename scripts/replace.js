/**
 * A script to replace all occurrences of a string in a file, this is built as a
 * replacement for the `sed` command to make it easier to replace strings with
 * special characters without the hassle of escaping them, this is important
 * when we are replacing strings that aren't known in advance like parameters
 * from files.
 *
 * Usage: node replace.js <search> <replace> <file>
 */

const fs = require('fs');
const path = require('path');

const [search, replace, file] = process.argv.slice(2);

if (!search || !replace || !file) {
  // The path of the script relative to the directory where the user ran the
  // script to be used in the error message demonstrating the usage.
  const scriptPath = path.relative(process.cwd(), __filename);

  console.error('Missing arguments.');
  console.table({ search, replace, file });

  console.error(`Usage: node ${scriptPath} <search> <replace> <file>`);
  process.exit(1);
}

try {
  const filePath = path.resolve(process.cwd(), file);

  const fileContent = fs.readFileSync(filePath, 'utf8');

  const newContent = fileContent.replaceAll(search, replace);

  fs.writeFileSync(filePath, newContent);
} catch (error) {
  console.error('An error occurred while replacing the content of the file.');
  console.error(error);
  process.exit(1);
}
