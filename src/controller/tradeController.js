const holding = require("../models/Holding");

exports.addTrade = (req, res) => {
    console.log("add Trade api")
    res.status(200).json({
        "Message": "Add Trade"
    })
}
exports.updateTrade = (req, res) => {
    console.log("update Trade api")
    res.status(200).json({
        "Message": "Update Trade"
    })
}
exports.sellTrade = (req, res) => {
    console.log("add Trade api")
    res.status(200).json({
        "Message": "Sell Trade"
    })
}