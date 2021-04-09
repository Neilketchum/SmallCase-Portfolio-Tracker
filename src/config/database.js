var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');



var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by index.server.js
module.exports = function () {

    mongoose.connect('mongodb+srv://neil:123@cluster0.krfbl.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((req, res) => {
        if (req) {
            console.log(connected("Data Base Connected"));
        } else {
            console.log(error("rejected"))
        }
    })
    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured error"));
    });

    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

}