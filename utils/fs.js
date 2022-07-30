const fs = require("fs");
const path = require("path");

//const readFromFile = util.promisify(fs.readFile);

const readFromFile = () => {
  try {
    const filePath = path.join(__dirname, `../db/db.json`);
    const rawData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(rawData);
  } catch (error) {
    console.log(`[ERROR: Failed to read data from file | ${error.message}]`);
  }
};

/**
 *  Writes data to the JSON file.
 *
 *  @param {string} destination The file to be written to.
 *  @param {object} content The content to be written to the file.
 */
const writeToFile = (content) => {
  const filePath = path.join(__dirname, `../db/db.json`);
  fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${filePath}`)
  );
};

/**
 *  Reads the data from a given file and appends content.
 *
 *  @param {object} content The content to be appended to the file.
 *  @param {string} file The path to the file to be saved to.
 */
const readAndAppend = (content) => {
  const filePath = path.join(__dirname, `../db/db.json`);
  const rawData = fs.readFileSync(filePath, "utf8");

  if (rawData !== null) {
    const parsedData = JSON.parse(rawData);
    parsedData.push(content);
    writeToFile(parsedData);
  }
};

module.exports = { readFromFile, readAndAppend, writeToFile };
