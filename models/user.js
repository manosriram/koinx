const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  address: {
    type: String,
  },
  transactions: {
    type: [Schema.Types.ObjectId],
    ref: "Transaction",
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

// module.exports = {
// User: UserSchema,
// };
module.exports = User = mongoose.model("user", UserSchema);
