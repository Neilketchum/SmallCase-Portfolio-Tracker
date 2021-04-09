const holding = require("../models/Holding");
exports.getReturns = (req, res) => {
    console.log("get Returns api")
    res.status(200).json({
        "Message": "Add Trade"
    })
}

exports.getPortfolio = (req, res) => {
    console.log("Sell Trade api")
    res.status(200).json({
        "Message": "Sell Trade"
    })
}