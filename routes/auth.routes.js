const express = require("express");
const { signin, profile } = require("../controllers/auth.controller");
const { authGuard } = require("../middlewares/auth");

const router = express.Router();


router.post("/signin", signin);

router.post("/profile", authGuard, profile);

module.exports = router;
