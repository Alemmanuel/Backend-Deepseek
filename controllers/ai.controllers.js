// Please install OpenAI SDK first: `npm install openai`
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY || 'sk-5dff92c381d8431bba1416eedc151283'
});

export const chatController = async (req, res) => {
    const { message } = req.body;
    console.log("Api key:", process.env.DEEPSEEK_API_KEY);
    
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "deepseek-chat",
      });

      console.log(response);
      res.json({ reply: response.choices[0].message.content });
      
    } catch (error) {
      // Devuelve el mensaje real del error en vez del objeto completo
      res.status(500).json({ error: error.message });
    }
};
