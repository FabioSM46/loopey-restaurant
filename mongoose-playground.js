//import Pizza from "./models/pizza.model";
const mongoose = require("mongoose");
const Pizza = require("./models/pizza.model");
mongoose
  .connect("mongodb://127.0.0.1:27017/loopeyRestaurant")
  .then((res) => {
    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    );

    const pizzaOne = {
      title: "Margherita",
      price: 10,
      isVeggie: true,
      ingredients: ["String"],
      dough: "",
      imageFile: "/images/",
    };

    //create a new document (a new pizza) and return as a Promise
    return Pizza.create(pizzaOne);
  })
  .then((pizzaFromDB) => {
    console.log("my pizza was created with id:", pizzaFromDB._id);
    //find method looks all documents inside the db and returns a Promise..an array.
    //We can use a filter inside ()
    return Pizza.find();
  })
  //how to update keys in document
  /*   .then(() => {
    return Pizza.findOneAndUpdate({ title: "Margherita" }, { price: 20 });
  })
  .then((pizzaUpdated)=>{
    console.log(`pizza ${pizzaUpdated.title} price updated`)
  }) */
  .then(() => {
    return Pizza.updateMany({ price: { $gt: 12 } }, { dough: "thin" });
  })
  .then((pizzaUpdated) => {
    console.log(`pizza ${pizzaUpdated.title} updated`);
  })
  .catch((err) => console.error("Error...:", err));
