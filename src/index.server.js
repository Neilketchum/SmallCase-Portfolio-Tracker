const express = require('express')
const app = express();
var cors = require('cors')
const env = require("dotenv")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const db = require("./config/database")
const tradeRoutes = require("../src/routes/tradeRoutes")
const detailRoutes = require("../src/routes/detailRoutes")
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const { logger } = require("./utility/chalkLogger")
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api/v1/trades', tradeRoutes)
app.use('/api/v1/info/', detailRoutes)
db();
const PORT = process.env.PORT || 7000
app.listen(PORT, () => {
    logger(`PORT is ${PORT}`, "success")
}) 