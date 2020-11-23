const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../models/User");

const FavorisCharacters = require("../models/FavorisCharacters");
const FavorisComics = require("../models/FavorisComics");

// ajout et retrait de favoris COMICS dans la base
router.post("/addFavorisComics", async (req, res) => {
  try {
    const {
      id_marvel,
      picture,
      description,
      title,
      favorite,
      token,
    } = req.fields;
    // rechercher si id comics deja connue en base -- si deja connu alors le supprimer
    console.log(token);
    const search = await FavorisComics.findOne({ id_marvel });
    const searchUser = await User.findOne({ token });
    if (search) {
      await search.remove();
      res.json(false);
    } else {
      const newComics = new FavorisComics({
        title: title,
        description: description,
        picture: picture,
        favorite: favorite,
        id_marvel: id_marvel,
        owner: searchUser,
      });

      await newComics.save();

      res.json(true);
    }
  } catch (error) {
    console.log(error.message);
  }
});

// ajout et retrait de favoris CHARACTERS dans la base
router.post("/addFavorisCharacters", async (req, res) => {
  console.log(req.fields);
  try {
    const {
      id_marvel,
      picture,
      description,
      name,
      favorite,
      token,
    } = req.fields;
    // rechercher si id comics deja connue en base -- si deja connu alors le supprimer
    console.log(token);
    const search = await FavorisCharacters.findOne({ id_marvel });
    const searchUser = await User.findOne({ token });
    if (search) {
      await search.remove();
      res.json(false);
    } else {
      const newfavorisCharacters = new FavorisCharacters({
        name: name,
        description: description,
        picture: picture,
        favorite: favorite,
        id_marvel: id_marvel,
        owner: searchUser,
      });

      await newfavorisCharacters.save();

      res.json(true);
    }
  } catch (error) {
    console.log(error.message);
  }
});

//recuperer les favoris de la bdd vers front
router.post("/getFavorites", async (req, res) => {
  const { token } = req.fields;

  try {
    const user = await User.findOne({ token });
    const favoritesComics = await FavorisComics.find({ owner: user });
    const favoritesCharacters = await FavorisCharacters.find({ owner: user });

    console.log(favoritesComics);
    res.json({
      favoritesComics: favoritesComics,
      favoritesCharacters: favoritesCharacters,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
