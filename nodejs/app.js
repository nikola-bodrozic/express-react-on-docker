const express = require("express");
const app = express();
const cors = require("cors");
const port = 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const delay = 1000;

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
  // res.json(users);
  setTimeout(() => {
    res.json(users);
  }, delay);
});

app.get(`${apiUrl}/users/id:`, (req, res) => {
  const result = getUser(req.params.id);
  res.json(result);
});

getUser = (id) => {
  if (id > 2)
    return {
      msg: "user doesn't exist",
    };
  return users[id - 1];
};

app.listen(port, () => console.log(`Node API up at http://localhost:${port}`));
