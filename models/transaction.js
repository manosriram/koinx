const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({});

// module.exports = {
// Transaction: TransactionSchema,
// };
module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
// module.export = mongoose.model("transaction", TransactionSchema);
// module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
