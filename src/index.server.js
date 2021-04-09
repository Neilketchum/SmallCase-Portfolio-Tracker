const express = require('express')
const app = express();
var cors = require('cors')
const env = require("dotenv")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const db = require("./config/database")
var chalk = require('chalk');
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json());
db();
const PORT = process.env.PORT || 7000
app.listen(PORT, () => {
    console.log(connected("Process", PORT))
}) 