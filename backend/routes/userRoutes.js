const express = require("express");

const router = express.Router();

const { userCredits, paymentRazorpay,verifyRazorpay } = require("../controllers/userController");

router.get("/credits", userCredits);
router.post('/pay-razor',paymentRazorpay)
router.post('/verify-razor',verifyRazorpay)
module.exports = router;