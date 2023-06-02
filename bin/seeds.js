const mongoose = require("mongoose");
const Pizza = require("../models/pizza.model");

mongoose
  .connect("mongodb://127.0.0.1/loopeyRestaurant")
  .then((x) => {
    console.log(`Connected! Database name: "${x.connections[0].name}"`);

    return Pizza.deleteMany({});
  })
  .then((response) => {
    console.log(response);

    const newPizzasArr = [
      {
        title: "Margherita",
        price: 12,
        isVeggie: true,
        ingredients: ["mozzarella", "tomato sauce", "basilicum"],
        imageFile: "/images/pizza-margherita.jpg",
      },
      {
        title: "Veggie",
        price: 15,
        isVeggie: true,
        ingredients: ["tomato", "cucumber", "olives"],
        imageFile: "/images/pizza-veggie.jpg",
      },
      {
        title: "Seafood",
        price: 20,
        recommendedDrink: "White Wine",
        ingredients: ["mozzarella", "tomato", "prawn"],
        imageFile: "/images/pizza-seafood.jpg",
      },
      {
        title: "Hawaiian",
        price: 17,
        isVeggie: true,
        recommendedDrink: "Fruit Juice",
        ingredients: ["mozzarella", "pineapple", "patience..."],
        imageFile: "/images/pizza-hawaiian.jpg",
      },
    ];

    return Pizza.insertMany(newPizzasArr);
  })
  .then((pizzaArrFromDB) => {
    //chef, our pizzas were created :)
    console.log("Number of pizzas created: ", pizzaArrFromDB.length);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error... ", err));
