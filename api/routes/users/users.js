const express = require("express");
const router = express.Router();

router.get("/:id/songs", async (req, res, next) => {
    try {
      const db = req.app.get("db");
      const { id } = req.params;
  
      const songs = await db.get_songs_by_user_id({ id });
  
      res.json(songs);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;