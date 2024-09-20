const express = require("express");
const app = express();
const cors = require("cors");
const port = 3008;
const csv = require("csvtojson");
// let converter = require('json-2-csv');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const delay = 50;

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

app.get(`${apiUrl}/users/id:`, (req, res) => {
  const result = getUser(req.params.id);
  res.json(result);
});

app.post(`${apiUrl}/users2`, function (req, res) {
  const first = req;
  console.log(first.params, first.headers)
});

getUser = (id) => {
  if (id > 2)
    return {
      msg: "user doesn't exist",
    };
  return users[id - 1];
};

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
