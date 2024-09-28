// server.js
const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Constants for Google Generative AI
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

// Function to interact with Google Generative AI
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
        parts: [{ text: "You are Tej, a friendly assistant who works for Marathwada Mitra Mandal's College of Engineering..." }],
      },
      {
        role: "model",
        parts: [{ text: "Hello! Welcome to MMCOE. My name is Tej. What's your name?" }],
      },
      {
        role: "user",
        parts: [{ text: "Hi" }],
      },
      {
        role: "model",
        parts: [{ text: "Hi there! Thanks for reaching out to MMCOE. Before we start, can you let me know your name?" }],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  return result.response.text();
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chatbot.html');
});

app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/images/loader.gif');
});

app.post('/chat', async (req, res) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
