const express = require("express");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cors = require("cors");
const app = express();

app.use(formidable());
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userRoutes = require("./routes/user");
const favorisRoutes = require("./routes/favoris");
const siteRoutes = require("./routes/site");

app.use(userRoutes);
app.use(favorisRoutes);
app.use(siteRoutes);

app.get("/", (req, res) => {
  res.json("Bienvenue sur l'api Marvel by Brice ");
});

app.listen(process.env.PORT, () => {
  console.log("Server connecté");
});
