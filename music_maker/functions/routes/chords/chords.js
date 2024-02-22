const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const db = req.app.get("db");
        const chords = await db.get_chords();

        res.json(chords);
    } catch (err) {
        next(err);
      }
});

module.exports = router;