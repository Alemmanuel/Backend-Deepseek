import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');


dotenv.config();

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
      }, 10000); // 5000 milisegundos = 5 segundos

      console.log(response);
      res.json({ reply: response.choices[0].message.content });
      clearTimeout(timeoutId);

      
    } catch (error) {
      // Devuelve el mensaje real del error en vez del objeto completo
      res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
  });
  

module.exports = app;  // Exportamos la app en lugar de usar app.listen() directamente

