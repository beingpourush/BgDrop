const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const { removeBackground } = require("../controllers/imageController");

router.post("/remove-bg", upload.single("image"), removeBackground);

module.exports = router;