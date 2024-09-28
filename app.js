// Required Modules
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
require('./config/dbConnection'); // Your database connection file

// Chatbot-related imports
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

// Middleware and Configuration
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Chatbot Configuration
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "HI,  this is LearnSetu platfrom we encourage student to engage into Study" }],
      },
      {
        role: "model",
        parts: [{ text: "Hello! Welcome to our LearnSetu Platform. How  can I help you!!" }],
      },
      {
        role: "user",
        parts: [{ text: "Hi" }],
      },
      {
        role: "model",
        parts: [{ text: "Hi there! Thanks for reaching out to us. Before we start, can you let me know your name?" }],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  return result.response.text();
}

// Routes
app.get('/', (req, res) => {
  res.render('index');  // Adjust this as per your view setup
});

app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});

app.post('/aichat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('Incoming /chat request:', userInput);

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in /chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Your existing routes
const indexRoutes = require('./routes');
app.use(indexRoutes);

// Server Listening
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
