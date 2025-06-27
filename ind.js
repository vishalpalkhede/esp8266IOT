const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());

let latestData = {};
let commandToSend = {command : "none"};

//server <-> esp8266
app.post("/data", (req, res) => {
    latestData = req.body.temperature;
    console.log("Recieved Data:", latestData);
    res.json({ message: "Data Recieved" });
});

app.get("/command", (req, res) => {
    console.log("Sending command:", commandToSend);
    res.json(commandToSend);
});

//html <-> server
app.get("/latest-data", (req, res) => {
    res.json({ temp: latestData });
});

// app.post("/set-command/:cmd", (req, res) => {
//     commandToSend.command = req.params.cmd;
//     res.json({ message: `command set to '${commandToSend.command}'`});
// });

app.post("/set-command", (req, res) => {
    commandToSend.command = req.body.command;
    res.json({ message: `command set to '${commandToSend.command}'`});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})