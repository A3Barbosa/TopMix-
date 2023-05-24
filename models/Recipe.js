const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    require: true,
  },
  ingredients:{
    type: Array,
    require: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 
});

module.exports = mongoose.model("Recipe", RecipeSchema);
