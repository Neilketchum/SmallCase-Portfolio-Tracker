const express = require('express')
const detialController = require("../controller/detailController")
const router = express.Router();
router.get('/get-trades', detialController.getTrades)
router.get('/get-portfolio', detialController.getPortfolio)
router.get('/get-returns', detialController.getReturns)
module.exports = router