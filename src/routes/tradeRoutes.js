const express = require('express')
const router = express.Router();
const tradeController = require("../controller/tradeController")
router.post('/update-trade/:id', tradeController.updateTrade)
router.post('/remove-trades/:id', tradeController.removeTrade)
router.post('/add-trade', tradeController.addTrade)

module.exports = router