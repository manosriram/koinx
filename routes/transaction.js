const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const User = require("../models/user");
const Ethereum = require("../models/ethereum");
const get = require("../utils/request");
const getAndStoreEthereumPrice = require("../utils/eth");

router.get("/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
    const transactions = await get(url);
    const txns = transactions.result;

    let allTransactions = [];
    let balance = 0;
    for (let t = 0; t < txns.length; ++t) {
      if (txns[t].to === address) {
        balance += parseInt(txns[t].value, 16) / Math.pow(10, 18);
      }

      let newTransaction = await Transaction.findOne({ hash: txns[t].hash });
      if (!newTransaction) {
        newTransaction = new Transaction(txns[t]);
        newTransaction.save();
      }

      allTransactions.push(newTransaction._id);
    }

    let user = await User.findOne({ address: address });
    if (!user) {
      user = User({ address });
    }
    user.transactions = allTransactions;
    user.balance = balance;
    user.save();

    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(500).json({ message: "some error occured" });
  }
});

router.get("/balance/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const user = await User.findOne({ address });
    const eth = await Ethereum.find({});
    let price;
    if (!eth.length) {
      price = await getAndStoreEthereumPrice();
    } else {
      price = eth[0].price;
    }

    return res
      .status(200)
      .json({ balance: user.balance, ethereum_price: price });
  } catch (err) {
    return res.status(500).json({ message: "some error occured" });
  }
});

module.exports = router;
