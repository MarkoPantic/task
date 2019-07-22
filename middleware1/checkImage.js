const fs = require('fs-extra');


const checkImage = async (imageId) => {
    console.log(imageId);
    try {
        const image = await fs.readFile(`./images/${imageId}.jpg`);
        console.log(image)
        if (image) {
            return image
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    checkImage
}