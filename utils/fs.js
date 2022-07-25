const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

/**
 *  writes data to the JSON file.
 *
 *  @param {string} destination the file to be written to.
 *  @param {object} content the content to be written to the file.
 *  @returns {void} nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 *  reads the data from a given file and appends content.
 *
 *  @param {object} content the content to be appended to the file.
 *  @param {string} file the path to the file to be saved to.
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

module.exports = { readFromFile, readAndAppend };
