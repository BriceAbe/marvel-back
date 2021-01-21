const express = require("express");
const router = express.Router();
const md5 = require("md5");
const User = require("../models/User");
const FavorisCharacters = require("../models/FavorisCharacters");
const FavorisComics = require("../models/FavorisComics");
const mongoose = require("mongoose");
const axios = require("axios");

const apikey = process.env.APIKEY;
const private = process.env.PRIVATE_KEY;

// recuperer les infos des personnages en fonction  à partir de l'id
router.post("/comics/characters", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);

  const id = req.fields.id;
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${apikey}&hash=${hash}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// recuperer les infos d'un comics à partir de l'id
router.post("/comics/", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log(req.fields);
  const id = req.fields.id;
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${apikey}&hash=${hash}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// recupere les 100 comics image pour la page comics
router.get("/comics", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log(ts);
  console.log(apikey);
  console.log(hash);

  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=100&offset=0&orderBy=title`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// recuperer les autres personnage  avec une limite à 100 personnage par requete
router.post("/allcharacters", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log(req.fields);
  const { limit, offset } = req.fields;
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&offset=${offset}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// recuperer les autres comics avec une limite à 100 personnage par requete
router.post("/comicsPage", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log(req.fields);
  const { limit, offset } = req.fields;
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&offset=${offset}&orderBy=title`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
});

// recuperer les infos d'un personnge à partir de l'id
router.post("/character/", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log(req.fields);
  const id = req.fields.id;
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${apikey}&hash=${hash}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// recuperer les infos d'un personnge à partir de  la search
router.post("/searchCharacters/", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log("cperso" + req.fields);
  const nameSearch = req.fields.nameSearch;
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&nameStartsWith=${nameSearch}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});
// recuperer les infos d'un comics à partir de la search
router.post("/searchComics/", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log(req.fields);
  const nameSearch = req.fields.nameSearch;
  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apikey}&hash=${hash}&titleStartsWith=${nameSearch}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// recupere les 100 premieres personnages pour la home page
router.get("/allcharacters", async (req, res) => {
  const date = new Date();
  const timestamp = date.getTime() / 1000;
  const ts = Math.floor(timestamp);
  const hash = await md5(ts + private + apikey);
  console.log(ts);
  console.log(apikey);
  console.log(hash);

  try {
    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=100&offset=0`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
