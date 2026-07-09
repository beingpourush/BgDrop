const express = require("express");

const router = express.Router();

const { clerkWebhook } = require("../controllers/webHookController");

router.post("/clerk", clerkWebhook);

module.exports = router;