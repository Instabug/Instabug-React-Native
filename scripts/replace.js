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
const { parseArgs } = require('util');

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    pattern: {
      type: 'boolean',
      default: false,
      short: 'p',
    },
  },
});

const [search, replace, ...files] = positionals;

/** Whether to replace the search string as a regular expression or as a literal string. */
const isPattern = values.pattern;

if (search == null || replace == null || !files.length) {
  // The path of the script relative to the directory where the user ran the
  // script to be used in the error message demonstrating the usage.
  const scriptPath = path.relative(process.cwd(), __filename);

  console.error('Missing arguments.');
  console.table({ search, replace, files });

  console.error(`Usage: node ${scriptPath} [-p | --pattern] <search> <replace> <files...>`);
  process.exit(1);
}

for (const file of files) {
  try {
    const filePath = path.resolve(process.cwd(), file);

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const searchPattern = isPattern ? new RegExp(search, 'gm') : search;
    const newContent = fileContent.replaceAll(searchPattern, replace);

    fs.writeFileSync(filePath, newContent);
  } catch (error) {
    console.error(`An error occurred while replacing the content of the file: ${file}.`);
    console.error(error);
    process.exit(1);
  }
}
