const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send([{
    sensor:"temperatura",
    data:23
  }, {
    sensor:"humedad",
    data:40
  }]);
});

app.post("/", function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
