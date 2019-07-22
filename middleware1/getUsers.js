const axios = require("axios");
const {writeJson} = require('./writeJson');
const readUsers = require("./readUsers");
const fs = require('fs-extra')

const getUsers = async (url) => {


    try {
        const localDataStr = await fs.readFile("./users.json", "utf-8");
        const localData = JSON.parse(localDataStr)
        if (localData.length > 0) {
            const lastPage = localData[localData.length - 1].page;
            const data = await axios.get(`${url}?page=${lastPage + 1}`);
            if (data.data.data) {
                const writableData = {
                    users: [...data.data.data],
                    page: lastPage + 1
                };

                await writeJson(writableData, "./users.json");
            } else {
                throw new Error('No new pages')
            }
            
        } else {
            const data = await axios.get(`${url}?page=${0}`);
            const writableData = {
                users: [...data.data.data],
                page: 0
            };
            await writeJson(writableData, "./users.json");
        }

        
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getUsers
}