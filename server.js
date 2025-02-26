require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY || 'sk-5dff92c381d8431bba1416eedc151283'
});

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt);
    console.log("Api key:", process.env.DEEPSEEK_API_KEY);
    
    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "deepseek-chat",
        });
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 10000); // 10000 milliseconds = 10 seconds

        console.log(response);
        res.json({ reply: response.choices[0].message.content });
        clearTimeout(timeoutId);
    } catch (error) {
        // Return the actual error message instead of the whole object
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});  // Start the server and log the port it's listening on when it's ready for connections

module.exports = app;  // Export the app instead of using app.listen() directly

