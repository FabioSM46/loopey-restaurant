const express = require("express");
const hbs = require("hbs");
const app = express();

app.use(express.static("public")); //make everything inside public folder available
app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine
hbs.registerPartials(__dirname + "/views/partials"); //tells to hbs where is partials folder

app.get("/", (req, res, next) => {
  res.render("home-page");
});

app.get("/contact", (req, res, next) => {
  res.render("contact-page");
});

app.get("/pizzas/margherita", (req, res, next) => {
  const dataMargherita = {
    title: "Margherita",
    price: 12,
    recommendedDrink: "beer",
    imageFile: "/images/margherita.jpg",
    ingredients: ["mozzarella", "tomato sauce", "basilicum"],
  };
  res.render("product", dataMargherita);
});

app.get("/pizzas/veggie", (req, res, next) => {
  const dataVeggie = {
    title: "Veggie",
    price: 15,
    recommendedDrink: "power smoothie",
    imageFile: "/images/veggie.jpg",
    ingredients: ["cherry tomatoes", "basilicum", "Olives"],
  };
  res.render("product", dataVeggie);
});

app.get("/pizzas/seafood", (req, res, next) => {
  const dataSeafood = {
    title: "Seafood",
    price: 20,
    recommendedDrink: "white wine",
    imageFile: "/images/seafood.jpg",
    ingredients: ["tomato sauce", "garlic", "prawn"],
  };
  res.render("product", dataSeafood);
});

app.listen(80, () => {
  console.log("srv listening on port 80...");
});
