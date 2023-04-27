const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function readFromFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(error);
  }
}

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

module.exports = {
  readFromFile,
  readAndAppend
};
