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

//write to file
const writeToFile = (title, text) => {
  fs.writeFileSync(
    path.join(__dirname, `../db/${title}.json`),
    JSON.stringify(text)
  );
};

//Writes data to the JSON file.

//@param {string} destination The file to be written to.
//@param {object} content The content to be written to the file.

/*const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );*/

/**
 *  Reads the data from a given file and appends content.
 *
 *  @param {object} content The content to be appended to the file.
 *  @param {string} file The path to the file to be saved to.
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, readAndAppend, writeToFile };
