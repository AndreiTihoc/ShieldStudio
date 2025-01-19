import axios from 'axios';

const API_KEY = 'YOUR_OPENAI_API_KEY';

export const getOpenAIResponse = async (message: string) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return 'Sorry, I am having trouble responding right now.';
  }
};