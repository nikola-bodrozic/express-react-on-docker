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
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const tmpJson = jsonObj.map((item) => {
        if (item.id == req.body.id) {
          if (item.status == "Open") item.status = "Closed";
          else item.status = "Open";
        }
        return item;
      });
      console.table(tmpJson);
      // write modification to file
      const csvString = converter.json2csv(tmpJson);
      fs.writeFile(csvFilePath, csvString, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("file successfully  written");
        }
      });
      res.json(tmpJson);
    });
});

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
