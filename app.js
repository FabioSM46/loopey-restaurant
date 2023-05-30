const express = require("express");
const { path } = require("express/lib/application");

const app = express();

app.use(express.static("public")); //make everything inside public folder available

//app.get(path, code)

//app.post(path2,()=>{})

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/views/home-page.html");
});

app.get("/contact", (req, res, next) => {
  res.sendFile(__dirname + "/views/contact-page.html");
});

app.listen(80, () => {
  console.log("srv listening on port 80...");
});
