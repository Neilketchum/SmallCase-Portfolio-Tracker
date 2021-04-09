const express = require('express')
const router = express.Router();
router.get('/get-trades', (req, res) => {
    console.log("Trades Fetch");
    res.json({
        "message": "HGello"
    })
})
router.post('/get-potfolio', (req, res) => {
    console.log("Trades Fetch");
    res.json({
        "message": "HGello"
    })
})
router.post('/get-returns', (req, res) => {
    console.log("Trades Fetch");
    res.json({
        "message": "HGello"
    })
})
module.exports = router