const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const db = req.app.get("db");
        const scales = await db.get_scales();
console.log(scales)
        res.json(scales);
    } catch (err) {
        next(err);
      }
});


module.exports = router;