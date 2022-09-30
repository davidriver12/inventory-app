const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: {type: Number, required: true},
  number_in_stock: {type: Number, required: true}
});

WeaponSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return "/catalog/weapon/" + this._id;
});

// Export model
module.exports = mongoose.model("Weapon", WeaponSchema);