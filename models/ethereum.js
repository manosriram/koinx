const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EthereumSchema = new Schema({
  price: {
    type: Number,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = {
// User: UserSchema,
// };
module.exports = Ethereum = mongoose.model("ethereum", EthereumSchema);
