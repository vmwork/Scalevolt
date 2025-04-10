import axios from 'axios';

// Main Claude API function
export async function generateWithClaude(prompt) {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.VUE_APP_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    return response.data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Helper functions for specific tasks
export const claudeHelpers = {
  // Generate product descriptions
  async generateProductDescription(productName, features) {
    const prompt = `Write a compelling product description for ${productName} with these features: ${features.join(', ')}`;
    return generateWithClaude(prompt);
  },
  
  // Translate text
  async translateText(text, targetLanguage) {
    const prompt = `Translate the following text to ${targetLanguage}: "${text}"`;
    return generateWithClaude(prompt);
  },
  
  // Suggest improvements for text
  async suggestImprovements(text) {
    const prompt = `Suggest improvements for the following text: "${text}"`;
    return generateWithClaude(prompt);
  }
};