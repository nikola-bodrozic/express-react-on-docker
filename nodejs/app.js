const express = require("express");
const app = express();
const cors = require("cors");
const port = 3008;
const csv = require("csvtojson");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const apiUrl = "/api/v1";
const csvFilePath = "./data.csv";

app.get(`${apiUrl}/users`, (req, res) => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.json(jsonObj);
    });
});

app.post(`${apiUrl}/users`, function (req, res) {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      // merge array
      


      //
      res.json(jsonObj);
    });
});

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
