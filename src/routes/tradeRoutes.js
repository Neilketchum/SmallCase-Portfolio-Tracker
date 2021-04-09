const express = require('express')
const router = express.Router();
router.post('/update-trade', (req, res) => {
    console.log("Trades Fetch");
    res.json({
        "message": "HGello"
    })
})
router.post('/sell-trades', (req, res) => {
    console.log("Trades Fetch");
    res.json({
        "message": "HGello"
    })
})

router.post('/add-trades', (req, res) => {
    console.log("Trades Fetch");
    res.json({
        "message": "HGello"
    })
})

module.exports = router