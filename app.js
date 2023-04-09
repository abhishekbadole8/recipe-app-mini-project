const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
const Recipe = require("./models/recipeModule");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8001;
connectDb();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {

  try {
    const recipes = await Recipe.find();
    console.log(recipes)
    res.render("index", { recipes });
  } catch (error) {
    console.log("Error retriving recipes", error);
    res.status(500).send("Server Error!");
  }
});
app.get("/newRecipe", async (req, res) => {
  res.render("newRecipe");
});

app.post("/newRecipe", async (req, res) => {
  const { dish, ingrident, category } = req.body;
  try {
    const recipe = new Recipe({
      dish,
      ingrident,
      category,
    });
    console.log(req.body);
    await recipe.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
