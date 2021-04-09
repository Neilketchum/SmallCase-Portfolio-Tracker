const express = require('express')
const detialController = require("../controller/detailController")
const router = express.Router();
router.get('/get-trades', (req, res) => {
    console.log("Trades Fetch");
    res.json({
        "message": "HGello"
    })
})
router.post('/get-potfolio', detialController.getPortfolio)
router.post('/get-returns', detialController.getReturns)
module.exports = router