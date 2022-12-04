const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
require('dotenv').config();

const client = mqtt.connect("mqtt://broker.emqx.io", {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
})

var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
var key = 0;

var sensorData = {
    api_key: 0,
    temperature: 0
}
var seguir = true;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateData() {
    randomTemeperature = Math.floor(20 + Math.random() * 40);
    sensorData = {
        api_key: key,
        data:{
            temperature: randomTemeperature
        }
    }
    client.publish('sensorData', JSON.stringify(sensorData))
    console.log('Published:', JSON.stringify(sensorData))

    var n = getRandomInt(30)
    if (seguir) [setTimeout(generateData, n*1000)]
}  

client.on("connect", function(connack){   
    console.log("Connected", connack); 
})

client.on("error", function(err) { 
    console.log("Error: " + err) 
    if(err.code == "ENOTFOUND") { 
        console.log("Network error, make sure you have an active internet connection") 
    } 
})
app.post('/getKey', function (req, res) {
    key = req.body['api_key']
    res.json({})
})

app.post('/start', function () {
    console.log('Starting...')
    seguir = true
    generateData()
})
app.post('/stop', function () {
    console.log('Stopping...')
    seguir = false
})

app.listen(3000);