const express = require('express');
const axios = require('axios');
const fs = require('fs-extra');
const schedule = require("node-schedule");
const app = express();
const API_URL = "https://reqres.in/api/users";


const port = 3000;

const {checkImage} = require('./middleware1/checkImage');
const {getUsers} = require('./middleware1/getUsers');



app.get("/api/user/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const data = await axios.get(`https://reqres.in/api/users/${userId}`);
        const userData = data.data.data;
        res.send(userData);
        
    } catch (error) {
        if (error) {
            console.log(JSON.stringify(error));
            res.send(error)
        }
    }
    
});


app.get('/api/user/:userId/avatar', async (req, res) => {
    const userId = req.params.userId;

    const localImage = await checkImage(userId);
    if (localImage) {
        res.send(localImage);
        return 
    }


    try {
        const data = await axios.get(`https://reqres.in/api/users/${userId}`);
        const image = await axios.get(data.data.data.avatar);
        var buf = new Buffer(image.data, "base64");
        fs.writeFile(`./images/${userId}.jpg`, buf);
        res.send(image.data)


        
    } catch (error) {
        if (error) {
            console.log(error);
            res.send({error})
        }
    }

});


app.delete('/api/user/:userId/avatar', async (req, res) => {

    const localImage = await checkImage();

    if (localImage) {
        await fs.unlink(`./images/${userId}.jpg`);
        res.send('Image deleted');
    } else {
        res.send('Image not found');
    }

    
})



// const jobs = schedule.scheduleJob("0 * * * * *", function() {
//     getUsers(API_URL);
// });



app.get('/test', (req, res) => {
    getUsers(API_URL);
    res.send('bla')
})







app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`started on ${port}`)
    }
})