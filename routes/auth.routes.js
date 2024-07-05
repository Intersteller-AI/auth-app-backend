const express = require("express");
const { signin, profile } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signin", signin);
router.post("/profile", profile);

module.exports = router;
