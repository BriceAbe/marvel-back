const mongoose = require("mongoose");

const FavorisCharacters = mongoose.model("FavorisCharacters", {
  name: String,
  description: String,
  picture: String,
  favorite: Boolean,
  id_marvel: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FavorisCharacters;
