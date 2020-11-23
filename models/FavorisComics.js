const mongoose = require("mongoose");

const FavorisComics = mongoose.model("FavorisComics", {
  title: String,
  description: String,
  picture: String,
  favorite: Boolean,
  id_marvel: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FavorisComics;
