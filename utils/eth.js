const get = require("./request");
const Ethereum = require("../models/ethereum");

const getEthererumPrice = async () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";
  const data = await get(url);
  return data;
};

const getAndStoreEthereumPrice = async () => {
  const price = await getEthererumPrice();

  const ethObj = {
    price: price.ethereum.inr,
    updated_at: Date.now(),
  };

  const eth = await Ethereum.find({});
  if (!eth.length) {
    const newEthereumObject = new Ethereum(ethObj);
    newEthereumObject.save();
  } else {
    const ethereum = eth[0];
    ethereum.price = ethObj.price;
    ethereum.updated_at = ethObj.updated_at;
    ethereum.save();
  }
  console.log("updated ethereum price");

  return ethObj.price;
};

module.exports = getAndStoreEthereumPrice;
