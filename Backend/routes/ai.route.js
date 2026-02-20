const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const lowerMsg = message.toLowerCase();

    // Find matching product
    const products = await Product.find();

    const matched = products.find(p =>
      lowerMsg.includes(p.name.toLowerCase()) ||
      lowerMsg.includes(p.category.toLowerCase()) ||
      lowerMsg.includes(p.subCategory?.toLowerCase())
    );

    if (!matched) {
      return res.json({
        reply: "Product not available."
      });
    }

    // If product found → send to AI only for formatting
    const prompt = `
  You are an ecommerce assistant.
  Respond in ONE short sentence only.

  Product:
  ${matched.name} - ₹${matched.price}

  User question:
  ${message}
  `;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi",
        prompt,
        stream: false,
        options: {
          temperature: 0.2
        }
      }
    );

    res.json({
      reply: response.data.response.trim()
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "AI failed" });
  }
});


module.exports = router;
