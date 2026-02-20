// Chatbot Controller
// This handles AI chatbot responses

// Sample product knowledge base for the chatbot
const productCategories = [
  "Men",
  "Women",
  "Beauty",
  "Home",
  "Kids",
  "Stationary",
  "Sports",
  "Books",
  "Cases",
  "Electronics",
  "Healthcare",
  "Groceries",
];

const commonQuestions = {
  order: {
    keywords: ["order", "status", "tracking", "where is my order", "my order"],
    reply:
      "To check your order status, please go to your Account page and look for the 'Orders' section. You can also use your order number to track your package.",
  },
  payment: {
    keywords: ["payment", "credit card", "upi", "bank", "pay", "bill"],
    reply:
      "We accept multiple payment methods: UPI, Bank Transfer, Credit/Debit Cards, and Digital Wallets. All transactions are secure and encrypted.",
  },
  shipping: {
    keywords: ["shipping", "delivery", "how long", "when will arrive", "address"],
    reply:
      "We offer standard (5-7 days) and express (2-3 days) shipping. Free shipping on orders above ₹499. You can change your delivery address before the product ships.",
  },
  returns: {
    keywords: ["return", "refund", "cancel", "exchange", "money back"],
    reply:
      "You can return products within 30 days if they are unused and in original packaging. Refunds are processed within 7-10 business days. No questions asked!",
  },
  products: {
    keywords: ["product", "available", "stock", "price", "category", "buy"],
    reply: `We have a wide variety of products in categories like ${productCategories.join(
      ", "
    )}. Browse our store or use the search function to find what you're looking for!`,
  },
  contact: {
    keywords: ["contact", "support", "help", "phone", "email", "call"],
    reply:
      "📞 Phone: +91-XXXX-XXXX-XX\n📧 Email: support@insightcart.com\n💬 Chat with us on WhatsApp\nWe're here 24/7 to help!",
  },
  account: {
    keywords: ["account", "password", "login", "signup", "profile", "email"],
    reply:
      "To manage your account, click on your profile icon in the top right. You can update your information, change password, and manage settings from the Account page.",
  },
  discount: {
    keywords: ["discount", "coupon", "offer", "promo", "deal", "sale"],
    reply:
      "Check our homepage for current offers and discounts! We regularly run sales and promotions. Subscribe to our newsletter to get exclusive deals.",
  },
  wishlist: {
    keywords: ["wishlist", "favorite", "save", "like"],
    reply:
      "Click the heart icon on any product to add it to your wishlist. You can view all your favorites in the 'Favorites' section from the menu.",
  },
};

const handleChatbot = (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const userMessage = message.toLowerCase();
    let reply = "Could you please rephrase that? I'm here to help! 😊";

    // Check against common questions
    for (const [key, qa] of Object.entries(commonQuestions)) {
      if (qa.keywords.some((keyword) => userMessage.includes(keyword))) {
        reply = qa.reply;
        break;
      }
    }

    // Return response
    res.json({
      success: true,
      reply: reply,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      error: "Something went wrong with the chatbot",
      reply: "I'm sorry, but I encountered an error. Please try again later.",
    });
  }
};

module.exports = { handleChatbot };
