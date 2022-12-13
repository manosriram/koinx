const axios = require("axios");

const get = async (url) => {
  const d = await axios.get(url);
  const x = await d.data;
  return x;
};

module.exports = get;
