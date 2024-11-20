
import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema(
  {
    date: {type: "string"},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    amount: {type: "number", required: true},
    notes: {type: "string"},
    type: {type: "string", required: true}
  },
  {
    timestamps: true
  }
)

const Transaction = models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;