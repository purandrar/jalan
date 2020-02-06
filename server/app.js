const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");
const Router = require("./routes/index");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);

app.use(function(err, req, res, next) {
  if (err.statusError) {
    res.status(err.statusError).json(err.message);
  }
  res.status(500).json(err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
