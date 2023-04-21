const express = require("express");
const router = express.Router();

const { createPaymentIntent, createPaymentMethod } = require("./controller");

router.post("/payment-intent", createPaymentIntent);
router.post("/payment-method", createPaymentMethod);

module.exports = router;
