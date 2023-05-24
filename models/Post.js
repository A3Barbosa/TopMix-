const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  drinkName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  rating: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 
});

module.exports = mongoose.model("Post", PostSchema);
