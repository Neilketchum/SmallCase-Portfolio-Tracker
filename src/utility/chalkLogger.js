var chalk = require('chalk');
var success = chalk.bold.cyan;
var error = chalk.bold.red;
exports.logger = (message, type) => {
    if (type === "success") {
        console.log(success(message))
    } else {
        console.log(error(message))
    }
}