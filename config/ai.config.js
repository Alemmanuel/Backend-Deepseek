const { OpenAI } = require('openai');

module.exports.openai = new OpenAI({
    baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api-docs.deepseek.com/',
    apiKey: process.env.DEEPSEEK_API_KEY || 'sk-5dff92c381d8431bba1416eedc151283'
});