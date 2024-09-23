const express = require("express");
const app = express();
const cors = require("cors");
const port = 3008;
const csv = require("csvtojson");
const converter = require("json-2-csv");
const fs = require("node:fs");

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
  // console.log(req.body.id)
  let csvString = "";
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      jsonObj.map((item) => {
        // console.log(item.id);
        if (item.id === req.body.id) {
          if (item.status === "Open") item.status = "Closed";
          if (item.status === "Closed") item.status = "Open";
        }
      });
      // console.log(jsonObj)
      csvString = converter.json2csv(jsonObj);
      res.json(jsonObj);
    });

    // write modification to file
  fs.writeFile(csvFilePath, csvString, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("file successfully  written");
    }
  });
});

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
