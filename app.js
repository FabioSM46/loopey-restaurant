const express = require("express");
const hbs = require("hbs");
const Pizza = require("./models/pizza.model");
const app = express();
const mongoose = require("mongoose");
const seeds = "bin/seeds.js";
const { exec } = require("child_process");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //make everything inside public folder available
app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine
hbs.registerPartials(__dirname + "/views/partials"); //tells to hbs where is partials folder

//connect to DB
mongoose
  .connect("mongodb://127.0.0.1/loopeyRestaurant")
  .then((x) => {
    console.log(`Connected! Database name: "${x.connections[0].name}"`);
    return;
  })
  //execute seeds.js...load all pizzas into the db
  .then(() => {
    exec(`node ${seeds}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error}`);
        return;
      }
      console.log("Script executed successfully!");
      if (stdout) {
        console.log(`Script output:\n${stdout}`);
      }
      if (stderr) {
        console.error(`Script errors:\n${stderr}`);
      }
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB...", err);
  });

app.get("/", (req, res, next) => {
  res.render("home-page");
});

app.get("/contact", (req, res, next) => {
  res.render("contact-page");
});

app.get("/pizzas/:pizzaName", (req, res, next) => {
  Pizza.findOne({ title: req.params.pizzaName })
    .then((pizzaFromDB) => {
      res.render("product", pizzaFromDB);
    })
    .catch((err) => {
      console.log("Error getting pizza from DB...", err);
    });
});

/////////// ROUTE PARAMS

app.get("/drinks/:drinkName", (req, res, next) => {
  //res.send(`display info about.....${req.params.drinkName}`);
  Pizza.findOne({ recommendedDrink: req.params.drinkName })
    .then((drinkFromDB) => {
      res.render("drink", drinkFromDB);
    })
    .catch((err) => {
      console.log("Error getting drink from DB...", err);
    });
});

// GET /pizzas
app.get("/pizzas", (req, res, next) => {
  let maximumPrice = req.query.maxPrice;
  maximumPrice = Number(maximumPrice); //convert to a number

  let filter = {};

  if (maximumPrice) {
    filter = { price: { $lte: maximumPrice } };
  }

  Pizza.find(filter)
    .then((pizzasArr) => {
      res.render("product-list", { pizzasArr });
    })
    .catch((e) => console.log("error getting pizzas from DB", e));
});

app.post("/login", (req, res, next) => {
  console.log("login attempt");
  console.log(req.body);
  const email = req.body.email;
  const psw = req.body.psw;

  if (email === "fopea46@gmail.com" && psw === "asd") {
    res.send("logged in!");
  } else {
    res.send("wrong credentials");
  }
});

app.listen(80, () => {
  console.log("srv listening on port 80...");
});
