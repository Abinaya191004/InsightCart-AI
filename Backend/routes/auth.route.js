const express = require("express");
const router = express.Router();
const { signup, login, updateFavorites, getProfile } = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/favorites", auth, updateFavorites);
router.get("/me", auth, getProfile);

module.exports = router;
