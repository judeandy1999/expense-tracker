
import { Schema, model, models } from "mongoose";
import Transaction from "./transaction";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }
  }
)

// Middleware to handle cascading deletion of transactions
CategorySchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const categoryId = this._id;
  try {
    await Transaction.deleteMany({ category: categoryId });
    next();
  } catch (err: any) {
    next(err);
  }
});




const Category = models.Category || model("Category", CategorySchema);

export default Category;