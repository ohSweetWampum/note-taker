// Import required modules
const fs = require('fs');
const util = require('util');

// Promisify fs.readFile and fs.writeFile functions for async/await usage
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


  //Read content from a file.

async function readFromFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(error);
  }
}


  //Read content from a file, append new content, and write back to the file.

async function readAndAppend(content, filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    await writeFile(filePath, JSON.stringify(parsedData, null, 4));
  } catch (error) {
    console.error(error);
  }
}


// Write content to a file.

async function writeToFile(filePath, content) {
  try {
    await writeFile(filePath, JSON.stringify(content, null, 4));
  } catch (error) {
    console.error(error);
  }
}

// Export functions for use in other modules
module.exports = {
  readFromFile,
  readAndAppend,
  writeToFile,
};

