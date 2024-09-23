const express = require("express");
const app = express();
const cors = require("cors");
const port = 3008;
const csv = require("csvtojson");
// let converter = require('json-2-csv');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const delay = 50; // set delay to show loader

const users = [
  {
    id: 1,
    name: "ronald",
  },
  {
    id: 2,
    name: "jacob",
  },
  {
    id: 3,
    name: "e",
  },
];
const apiUrl = "/api/v1";

app.get(`${apiUrl}/users`, (req, res) => {
  setTimeout(() => {
    const csvFilePath = "./data.csv";
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
         res.json(jsonObj);
      });
  }, delay);
});

app.post(`${apiUrl}/users`, function (req, res) {
  const test = {s:"q"}
  console.log(req.body)
  res.json(req.body)
});

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
