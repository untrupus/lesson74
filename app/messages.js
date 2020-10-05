const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let messageList = [];
    const path = "./messages";
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            let fileName = path + '/' + file
            const fileContents = fs.readFileSync(fileName)
                messageList.push(JSON.parse(fileContents));
        });
        res.send(messageList.slice((messageList.length - 5), messageList.length));
    })
});

router.post('/', (req, res) => {
    const message = req.body;
    message.datetime = new Date().toJSON()
    const fileName = './messages/' + message.datetime + '.txt';

    fs.writeFile(fileName, JSON.stringify(message), (err) => {
        if (err) {
            console.error(err);
        }
        console.log('File was saved!');
    });
    res.send(JSON.stringify(message));
});

module.exports = router;