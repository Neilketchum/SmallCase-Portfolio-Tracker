const express = require('express')
const router = express.Router();
const tradeController = require("../controller/tradeController")
const validator = require('express-joi-validation').createValidator({})
const valid = require("../validators/validator")

router.post('/update-trade', validator.body(valid), tradeController.updateTrade)
router.post('/remove-trades', tradeController.removeTrade)
router.post('/add-trade', validator.body(valid), tradeController.addTrade)

module.exports = router