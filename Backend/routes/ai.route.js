const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../models/Product");

const ignoredWords = new Set([
  "a", "an", "are", "available", "can", "do", "does", "for", "have",
  "i", "is", "it", "me", "my", "of", "please", "show", "the", "this",
  "to", "we", "what", "which", "you"
]);

const getSearchTerms = (message) => message
  .toLowerCase()
  .replace(/[’']/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .split(/\s+/)
  .filter((word) => word.length > 1 && !ignoredWords.has(word))
  .map((word) => word === "womens" ? "women" : word);

const getProductScore = (product, searchTerms) => {
  const nameTerms = getSearchTerms(product.name || "");
  const categoryTerms = getSearchTerms(`${product.category || ""} ${product.subCategory || ""}`);

  return searchTerms.reduce((score, term) => {
    if (nameTerms.includes(term)) return score + 3;
    if (categoryTerms.includes(term)) return score + 1;
    return score;
  }, 0);
};

router.post("/", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    // Fetch products
    const products = await Product.find();
    const searchTerms = getSearchTerms(message);

    // Prefer exact product-name terms over broad category matches.
    const matched = products
      .map((product) => ({ product, score: getProductScore(product, searchTerms) }))
      .sort((a, b) => b.score - a.score)[0];

    if (!matched || matched.score === 0) {
      return res.json({ reply: "Product not available." });
    }

    const matchedProduct = matched.product;

    const prompt = `
You are an ecommerce assistant.
Answer in ONE short sentence.

Product:
${matchedProduct.name} - ₹${matchedProduct.price}

User question:
${message}
`;

    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        reply: "AI service is not configured. Add AI_API_KEY to the backend .env file."
      });
    }

    const apiUrl = process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    // Use a hosted OpenAI-compatible API so the backend does not depend on Ollama.
    const response = await axios.post(
      apiUrl,
      {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 300
      },
      {
        timeout: 20000,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiReply = response.data?.choices?.[0]?.message?.content?.trim();

    res.json({
      reply: aiReply || `${matchedProduct.name} is available for ₹${matchedProduct.price}.`
    });

  } catch (error) {
    console.error("FULL AI ERROR:", error?.response?.data || error.message || error);
    res.status(500).json({
      reply: "AI service is temporarily unavailable."
    });
  }
});

module.exports = router;