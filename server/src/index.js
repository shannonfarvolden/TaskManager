const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hit endpoint");
});
app.listen(3000);
