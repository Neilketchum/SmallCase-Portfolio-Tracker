const Trades = require("../models/Trades")
const { logger } = require("../utility/chalkLogger")
const { getTotalShares, getTotalBuyShares, isValidObjectId } = require("../utility/controllerhelper")
exports.getReturns = async (req, res) => {
    Trades.find({}, async (err, docs) => {
        if (err) {
            return res.status(400).send("Something looks wrong ,please try later")
        } else {

            let result = docs.reduce((acc, obj) => {
                acc[obj.tickerSymbol] = acc[obj.tickerSymbol] || [];
                acc[obj.tickerSymbol].push(obj);
                return acc;
            }, {});

            result = Object.values(result).map(arr => (arr.length < 1 ? arr[0] : arr));
            //Making Array of Arrays for trades of same ticker symbol
            let portfolio = [];
            let curent_price = 100.00
            for (let i in result) {
                let temp = {}
                let currentStock = result[i];
                let totalPrice = 0;
                for (let j in currentStock) {
                    if (currentStock[j].method === "BUY") {
                        totalPrice += currentStock[j].price * currentStock[j].shares;
                    }
                }
                temp.tickerSymbol = currentStock[0].tickerSymbol;
                temp.shares = await getTotalShares(currentStock[0].tickerSymbol);
                temp.avgBuyPrice = totalPrice / await getTotalBuyShares(currentStock[0].tickerSymbol);
                portfolio.push(temp)
                //Cumulating all trades into one object and pushing into one Portfolio
            }
            let returns = 0;
            for (let itr in portfolio) {
                returns += (curent_price - portfolio[itr].avgBuyPrice) * portfolio[itr].shares;
                // Calculating total returns
            }
            return res.status(200).json({
                message: "Assuming current price is always Rs. 100 for any security.",
                returns: returns
            })

        }
    })


}
exports.getTrades = async (req, res) => {
    Trades.find({}, (err, docs) => {
        if (err) {
            return res.status(400).send("Something looks wrong ,please try later")
        } else {

            let result = docs.reduce((acc, obj) => {
                acc[obj.tickerSymbol] = acc[obj.tickerSymbol] || [];
                acc[obj.tickerSymbol].push(obj);
                return acc;
            }, {});


            //Making Array of Arrays for trades of same ticker symbol
            return res.status(200).send(result)

        }
    })


}
exports.getPortfolio = async (req, res) => {
    Trades.find({}, async (err, docs) => {
        if (err) {
            return res.status(400).send("Something looks wrong ,please try later")
        } else {
            let result = docs.reduce((acc, obj) => {
                acc[obj.tickerSymbol] = acc[obj.tickerSymbol] || [];
                acc[obj.tickerSymbol].push(obj);
                return acc;
            }, {});
            result = Object.values(result).map(arr => (arr.length < 1 ? arr[0] : arr));
            //Making Array of Arrays for trades of same ticker symbol
            let portfolio = [];
            for (let i in result) {
                let temp = {}
                let currentStock = result[i];
                let totalPrice = 0;
                for (let j in currentStock) {
                    if (currentStock[j].method === "BUY") {
                        totalPrice += currentStock[j].price * currentStock[j].shares;
                    }
                }
                temp.tickerSymbol = currentStock[0].tickerSymbol;
                temp.shares = await getTotalShares(currentStock[0].tickerSymbol);
                temp.avgBuyPrice = totalPrice / await getTotalBuyShares(currentStock[0].tickerSymbol);
                portfolio.push(temp)
                //Cumulating all trades into one object and pushing into one Portfolio
            }
            return res.status(200).send(portfolio)
        }
    })
}