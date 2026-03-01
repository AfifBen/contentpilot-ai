/**
 * AI Service - Handles all AI model interactions
 * Supports OpenAI and can be extended for Anthropic
 */

const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Import prompts
const twitterPrompts = require('../prompts/twitter');
const linkedinPrompts = require('../prompts/linkedin');
const newsletterPrompts = require('../prompts/newsletter');
const instagramPrompts = require('../prompts/instagram');

/**
 * Generate content for a specific platform
 * @param {string} platform - Target platform
 * @param {string} content - Source content
 * @param {string} tone - Tone preference
 * @returns {Promise<any>} Generated content
 */
async function generateForPlatform(platform, content, tone = 'professional') {
  try {
    let prompt;
    let systemPrompt;

    switch (platform) {
      case 'twitter':
        systemPrompt = twitterPrompts.systemPrompt;
        prompt = twitterPrompts.userPrompt(content, tone);
        break;
      case 'linkedin':
        systemPrompt = linkedinPrompts.systemPrompt;
        prompt = linkedinPrompts.userPrompt(content, tone);
        break;
      case 'newsletter':
        systemPrompt = newsletterPrompts.systemPrompt;
        prompt = newsletterPrompts.userPrompt(content, tone);
        break;
      case 'instagram':
        systemPrompt = instagramPrompts.systemPrompt;
        prompt = instagramPrompts.userPrompt(content, tone);
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const generatedContent = response.choices[0].message.content;
    
    // Parse JSON response
    try {
      return JSON.parse(generatedContent);
    } catch (parseError) {
      console.warn('Failed to parse JSON, returning raw content:', parseError.message);
      return { raw: generatedContent };
    }
  } catch (error) {
    console.error(`AI generation error for ${platform}:`, error.message);
    throw error;
  }
}

/**
 * Generate content for multiple platforms
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} Generated content for all platforms
 */
async function generateMultiPlatform(options) {
  const { content, platforms, tone = 'professional' } = options;
  
  const results = {};
  const usage = { totalTokens: 0, model: 'gpt-4o-mini' };

  // Generate for each requested platform
  for (const platform of platforms) {
    console.log(`Generating content for ${platform}...`);
    try {
      results[platform] = await generateForPlatform(platform, content, tone);
    } catch (error) {
      results[platform] = { error: error.message };
    }
  }

  return { data: results, usage };
}

/**
 * Fetch content from URL
 * @param {string} url - URL to fetch
 * @returns {Promise<string>} Extracted content
 */
async function fetchFromUrl(url) {
  try {
    const axios = require('axios');
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'ContentPilot-AI/1.0'
      }
    });
    
    // Basic HTML to text extraction
    const html = response.data;
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 10000); // Limit to 10k chars
    
    return text;
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${error.message}`);
  }
}

module.exports = {
  generateForPlatform,
  generateMultiPlatform,
  fetchFromUrl
};
