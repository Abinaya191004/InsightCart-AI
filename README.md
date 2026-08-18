# 🛍️ InsightCart AI

**InsightCart AI** is a full-stack AI-powered e-commerce application that allows users to browse products, search by category, manage cart and favorites, and interact with an AI assistant for product-related queries.

## ✨ Features

* 🔐 User Signup & Login with JWT Authentication
* 🛍️ Dynamic Product Listing
* 🔎 Product Search
* 📂 Category & Subcategory Filtering
* ❤️ Favorites / Wishlist
* 🛒 Shopping Cart
* 💳 Checkout & Payment Gateway Integration
* 👤 User Account & Profile
* 📱 Responsive Design with Mobile Navigation
* 🤖 AI E-commerce Assistant
* 🗄️ Products stored dynamically in MongoDB

## 🤖 AI Assistant

The project uses **Ollama** with the **Phi model** for local AI inference.

The chatbot can understand product-related questions such as:

> "Do you have men's shirts?"

and uses product information from MongoDB to provide responses such as:

> "Men Cotton T-Shirt is available for ₹699."

If the requested product is not available:

> "Product not available."

### AI Flow

```text
User Question
      ↓
React Chatbot
      ↓
Node.js / Express API
      ↓
MongoDB Product Search
      ↓
Ollama + Phi Model
      ↓
AI Response
      ↓
Chatbot UI
```

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* JavaScript
* Axios / Fetch API
* Lucide React

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* bcrypt

### Database

* MongoDB Atlas
* Mongoose

### AI

* Ollama
* Phi LLM

### Payment

* Razorpay integration for payment testing

## 📁 Project Structure

```text
InsightCart-AI/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env
│   └── index.js
│
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   └── App.jsx
│   └── package.json
│
├── screenshots/
│
└── README.md
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Abinaya191004/InsightCart-AI.git
cd InsightCart-AI
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
node index.js
```

Backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

The frontend will run on the Vite development URL shown in the terminal.

### 4. Start Ollama

Install Ollama and download the Phi model:

```bash
ollama pull phi
```

Start the model:

```bash
ollama run phi
```

The AI service runs locally through:

```text
http://localhost:11434
```

## 🔄 Application Flow

```text
User
 ↓
React Frontend
 ↓
Express REST API
 ↓
MongoDB Atlas
 ↓
Product / Authentication / Cart Data
 ↓
Ollama + Phi
 ↓
AI Assistant
```

## 🚀 Current Deployment Status

**Current version: Local Deployment**

The complete application currently runs locally, including the Ollama-based AI assistant.

Ollama is running on the local machine because the current AI implementation uses:

```text
http://localhost:11434
```

The website has not been publicly deployed yet because the AI assistant currently uses Ollama and the Phi model locally on my machine. Ollama requires a dedicated environment with sufficient computing resources, so I kept the complete application in local deployment during development. Public deployment would require hosting the AI model on a suitable cloud/VPS server or replacing Ollama with a cloud-based LLM API.

## 🔮 Future Improvements

* ☁️ Cloud deployment
* 🤖 Cloud-based LLM integration
* 📦 Order history
* 👨‍💼 Admin dashboard
* 🔔 Order notifications
* 🎯 Personalized product recommendations
* 💳 Production payment processing

