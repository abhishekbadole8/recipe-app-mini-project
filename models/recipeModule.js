const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  dish: {
    type: String,
    required: true,
  },
  ingrident: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Recipe", recipeSchema);
