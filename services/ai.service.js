const { openai } = require('../config/ai.config');

class AIService {
    static async getCompletion(messages) {
        try {
            const completion = await openai.chat.completions.create({
                messages,
                model: 'deepseek-chat'
            });
            return completion.choices[0].message.content;
        } catch (error) {
            throw new Error(`AI Service Error: ${error.message}`);
        }
    }
}

module.exports = { AIService };