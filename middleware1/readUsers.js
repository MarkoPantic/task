const fs = require('fs-extra');

const readUsers = async (filePath) => {
    console.log(filePath);
    const data = await fs.readFile(filePath);
    return data
}

module.exports = {
    readUsers
}