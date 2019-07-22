const fs = require('fs-extra');

const writeJson = async (data, filePath) => {


    try {
        console.log('usao');
        const oldDataString = await fs.readFile(filePath, "utf-8");
        console.log(oldDataString);
        const oldDataArr = JSON.parse(oldDataString);
        console.log(oldDataArr);

        oldDataArr.push(data);
        console.log(oldDataArr);

        await fs.writeFile(filePath, JSON.stringify(oldDataArr));

    } catch (error) {
        
    }


}

module.exports = {
    writeJson
}