const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true
  },
  description: {type: String, required: true},
});

// Virtual for bookinstance's URL
CategorySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/category/${this.id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);