const express = require("express");

const Users = require("./users/users-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// server.get("/hobbits/id", (req, res) => {
//   res.end()
// });

server.post("/users", (req, res) => {
  Users.insert(req.body)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.delete("/users/:id", (req, res) => {
    Users.remove(req.body)
        .then(user => {
            console.log(user)
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = server;
