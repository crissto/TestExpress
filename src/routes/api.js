const express = require("express");

const { validateEntry, isPalindrome } = require("../utils");

const router = express.Router();

const scoring = [];

router.get("/getScores", function (req, res) {
  const orderedScores = scoring.sort((a, b) => b.points - a.points);
  const top5scores = orderedScores.slice(0, 5);
  res.json(top5scores);
});

router.post("/submitEntry", function (req, res) {
  const { name, word } = req.body;

  if (validateEntry({ name, word }) && isPalindrome(word)) {
    const points = word.split(" ").join("").length;
    const checkUser = scoring.findIndex((user) => user.name === name);

    if (checkUser >= 0) {
      scoring[checkUser].points = points;
    } else {
      scoring.push({ name, points });
    }

    res.json(points);
  } else {
    // The angular app doesnt do anything special depending on the statusCode. I find 419 to be funny
    res.sendStatus(419);
  }
});

module.exports = router;
