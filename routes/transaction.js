const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const User = require("../models/user");
const get = require("../utils/request");

router.get("/:address", async (req, res) => {
  const { address } = req.params;
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=KGN1QKSIMYEGCYSVIX3NRBQMB4E7112EF3`;
  const transactions = await get(url);
  const txns = transactions.result;

  let allTransactions = [];
  console.log(txns.length);
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

  return res.json(transactions);
});

module.exports = router;
