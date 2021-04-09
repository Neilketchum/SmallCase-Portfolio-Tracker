const express = require('express')
const router = express.Router();
const tradeController = require("../controller/tradeController")
router.post('/update-trade', tradeController.updateTrade)
router.post('/sell-trades', tradeController.sellTrade)

router.post('/add-trades', tradeController.addTrade)

module.exports = router