const express = require("express");
const cors = require("cors");
const { OpenAIApi, Configuration } = require("openai");
const PORT = process.env.PORT || 8000;
require("dotenv").config();

// Create a new instance of the OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create a new instance of the OpenAI API client
const openai = new OpenAIApi(configuration);

// Create a new instance of express
const app = express();

// Use cors to allow cross-origin requests
app.use(cors());

// Use express.json() to parse JSON bodies
app.use(express.json());

// get request
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello from CHAT_GPT",
  });
});

// post request
app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 1,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
});

// Listen on port 5000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
