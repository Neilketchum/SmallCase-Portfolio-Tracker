const Trades = require("../models/Trades")
var chalk = require('chalk');
var success = chalk.bold.green;
var error = chalk.bold.red;
const ObjectId = require('mongoose').Types.ObjectId;
const groupBy = require('lodash/groupBy');

function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
const getTotalShares = async (tickerSymbol) => {
    const trades = await Trades.find({ tickerSymbol });
    let count = 0;
    trades.map(trade => {

        if (trade.method === "BUY")
            count += trade.shares;
        else if (trade.method === "SELL")
            count -= trade.shares
    })
    console.log(count)
    return count;
}
const getTotalBuyShares = async (tickerSymbol) => {
    const trades = await Trades.find({ tickerSymbol });
    let count = 0;
    trades.map(trade => {

        if (trade.method === "BUY")
            count += trade.shares;

    })
    console.log(count)
    return count;
}

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
            }
            let returns = 0;
            for (let itr in portfolio) {
                returns += (curent_price - portfolio[itr].avgBuyPrice) * portfolio[itr].shares;
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
            }
            return res.status(200).send(portfolio)
        }
    })
}