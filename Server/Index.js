const express = require("express");
const bodyParser = require("body-parser");
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hola mundo");
});

app.post("/", function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
