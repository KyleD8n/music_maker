const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const { name, scale_id, user_id } = req.body;

    const song = await db.songs.insert({ user_id, name, scale_id });

    res.json(song);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { id } = req.params;

    await db.songs.destroy(id);
    // await db.songs.destroy({ where: { id: id } });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const { name } = req.body;
    const { id } = req.params;

    const song = await db.songs.update(id, { name });
    res.json(song);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
