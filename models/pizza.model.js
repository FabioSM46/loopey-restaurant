const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create a schema
//a schema is a pattern that all my elements are going to
//follow in this collection
//({name: { type: String, required: true, unique: true }}, { collection: 'records' })
const pizzaSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  isVeggie: { type: Boolean, default: false },
  recommendedDrink: { type: String, default: "Coca-Cola" },
  ingredients: { type: [String] },
  dough: { type: String, default: "thin" },
  imageFile: { type: String },
});
//create a model
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
