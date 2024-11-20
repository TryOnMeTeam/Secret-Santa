const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.post("/add-participant", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO participants (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send("Participant added!");
    }
  );
});


router.get("/generate-pairs", (req, res) => {
  db.query("SELECT * FROM participants", (err, participants) => {
    if (err) {
      return res.status(500).send(err);
    }

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const pairs = shuffled.map((participant, i) => ({
      giver: participant.name,
      receiver: shuffled[(i + 1) % shuffled.length].name,
    }));
    res.status(200).json(pairs);
  });
});

module.exports = router;
