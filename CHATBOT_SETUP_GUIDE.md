# AI Chatbot Integration Guide

## Overview
Your InsightCart website now includes an AI-powered chatbot for customer support. Below is how to set it up with various AI providers.

## Current Setup
The chatbot is already integrated with a basic knowledge base. It uses keyword matching to provide helpful responses.

### Features:
- ✅ Floating chat widget in bottom-right corner
- ✅ Real-time conversation
- ✅ Quick help buttons for common queries
- ✅ Order, Payment, Shipping, Returns support
- ✅ Responsive design (mobile & desktop)

---

## How to Use (For Users)
1. Click the chat bubble (💬) in the bottom-right corner
2. Select a quick help option or type your question
3. Get instant AI-powered responses
4. Use smart suggestions for faster help

---

## Advanced Integration Options

### Option 1: OpenAI ChatGPT API (Recommended)

#### Step 1: Get OpenAI API Key
1. Sign up at [OpenAI](https://platform.openai.com/signup)
2. Navigate to API Keys section
3. Create a new API key
4. Copy and save it securely

#### Step 2: Update Backend Controller

Replace the chatbot controller with OpenAI integration:

```javascript
// Backend/controllers/chatbot.controller.js
const axios = require("axios");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const systemPrompt = `You are InsightCart's helpful customer service AI assistant. You help customers with:
- Product information
- Order tracking
- Payment and shipping details
- Returns and refunds
- Account management
Be concise, friendly, and helpful. Always suggest checking the app or contacting support for complex issues.`;

const handleChatbot = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Format conversation history for OpenAI
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    // Call OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({
      success: true,
      reply: reply,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      error: "Something went wrong with the chatbot",
      reply: "I'm sorry, I encountered an error. Please try again later.",
    });
  }
};

module.exports = { handleChatbot };
```

#### Step 3: Add Environment Variable

Add this to your `.env` file:
```
OPENAI_API_KEY=sk-your-api-key-here
```

#### Step 4: Install Required Package

```bash
npm install axios
```

---

### Option 2: Google Dialogflow

#### Step 1: Create Dialogflow Agent
1. Go to [Google Dialogflow](https://dialogflow.cloud.google.com/)
2. Create a new agent
3. Train it with intents related to your store
4. Get the API credentials JSON file

#### Step 2: Update Backend

```javascript
const dialogflow = require("@google-cloud/dialogflow");
const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient();

const handleChatbot = async (req, res) => {
  try {
    const { message, userId = "user123" } = req.body;
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, userId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en-US",
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const reply = result.fulfillmentText;

    res.json({ success: true, reply: reply });
  } catch (error) {
    console.error("Dialogflow error:", error);
    res.status(500).json({ error: "Chatbot error" });
  }
};

module.exports = { handleChatbot };
```

---

### Option 3: Azure Bot Service

1. Create an Azure Bot Resource
2. Configure LUIS (Language Understanding)
3. Get bot credentials
4. Update backend with Azure SDK

---

## Frontend Customization

### Change Chatbot Appearance

Edit `Frontend/src/Components/Chatbot.jsx`:

```jsx
// Change colors
className="bg-indigo-600" // Change to your brand color
className="text-white"

// Change bot name
<h3 className="font-bold text-lg">Your Bot Name</h3>

// Change welcome message
text: "Your custom welcome message here"
```

### Add Custom Quick Replies

Update the `quickReplies` array in `Chatbot.jsx`:

```jsx
const quickReplies = [
  "📦 Track Order",
  "💳 Payment Methods",
  "📍 Delivery Info",
  "🔄 Returns",
  "💬 Talk to Agent",
];
```

---

## Backend Knowledge Base

You can expand the knowledge base by adding more categories:

```javascript
const commonQuestions = {
  yourCategory: {
    keywords: ["keyword1", "keyword2", "keyword3"],
    reply: "Your response here",
  },
};
```

### Example:
```javascript
const commonQuestions = {
  warranty: {
    keywords: ["warranty", "guarantee", "protection"],
    reply: "All our products come with a 1-year manufacturer warranty...",
  },
  bulk: {
    keywords: ["bulk", "wholesale", "corporate"],
    reply: "We offer bulk discounts! Contact bulk@insightcart.com for details.",
  },
};
```

---

## Deployment Checklist

- [ ] Test chatbot locally
- [ ] Add API keys to production environment
- [ ] Set up error handling and logging
- [ ] Test on mobile devices
- [ ] Add analytics to track common questions
- [ ] Monitor API usage and costs
- [ ] Set up rate limiting for API calls
- [ ] Create fallback responses

---

## Analytics & Monitoring

### Track Chatbot Interactions

Add to backend:

```javascript
const ChatMessage = require("../models/ChatMessage");

const handleChatbot = async (req, res) => {
  // ... existing code ...

  // Save to database for analytics
  await ChatMessage.create({
    userMessage: message,
    botReply: reply,
    timestamp: new Date(),
    userId: req.user?.id,
  });

  res.json({ success: true, reply: reply });
};
```

---

## Troubleshooting

### Issue: Chatbot not responding
- Check API key is valid
- Verify backend route is registered
- Check browser console for errors
- Ensure CORS is properly configured

### Issue: Slow responses
- Implement response caching
- Use rate limiting
- Consider using faster models

### Issue: Inaccurate responses
- Improve knowledge base
- Fine-tune model parameters
- Add more training data

---

## Cost Estimates (as of Feb 2026)

| Provider | Cost | Pros | Cons |
|----------|------|------|------|
| **OpenAI GPT-3.5** | $0.0005-$0.002 per request | Most capable, easy to use | Requires API key, usage-based |
| **Google Dialogflow** | Free tier + $0.005 per request | Good for structured responses | Less flexible |
| **Azure Bot Service** | $0-$10/month | Integrated Azure suite | Steeper learning curve |
| **Rasa (Self-hosted)** | Free (open-source) | Full control, no costs | Requires hosting, maintenance |

---

## Next Steps

1. **Immediate**: Test current chatbot with keyword-based responses
2. **Short-term**: Integrate OpenAI for better natural language
3. **Long-term**: Collect user feedback and improve responses
4. **Advanced**: Add human handoff when bot can't help

---

## Support

For issues or questions:
- Check chatbot console logs
- Review API documentation
- Contact support@insightcart.com

Happy Chatbotting! 🤖💬
