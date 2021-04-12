var mongoose = require('mongoose');

//require chalk module to give colors to console text
const { logger } = require("../utility/chalkLogger")
//export this function and imported by index.server.js
module.exports = function () {
    mongoose.connect('mongodb+srv://neil:123@cluster0.q5soy.mongodb.net/smallcase?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((req, res) => {
        if (req) {
            logger("Data Base Connected", "success")
        } else {
            logger("Rejected", "error")

        }
    })
    mongoose.connection.on('error', function (err) {
        logger("Mongoose default connection has occured error", "error")
    });

    mongoose.connection.on('disconnected', function () {
        logger("Mongoose default connection is disconnected", "error")

    });

}