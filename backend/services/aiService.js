/**
 * AI Service - Handles all AI model interactions
 * Supports OpenAI or Gemini (Google)
 */

const OpenAI = require('openai');
const axios = require('axios');

const PROVIDER = (process.env.AI_PROVIDER || 'openai').toLowerCase();
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';

// Initialize OpenAI client only if needed
let openai = null;
if (PROVIDER === 'openai') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

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

    let generatedContent;

    if (PROVIDER === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('GEMINI_API_KEY is missing');

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 3000 }
      };

      let response;
      try {
        response = await axios.post(url, payload);
      } catch (err) {
        if (err.response?.status === 429) {
          await new Promise(r => setTimeout(r, 1200));
          response = await axios.post(url, payload);
        } else {
          throw err;
        }
      }

      generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generatedContent) throw new Error('Empty response from Gemini');
    } else {
      const response = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });
      generatedContent = response.choices[0].message.content;
    }
    
    // Parse JSON response (strip code fences if needed)
    const cleaned = generatedContent
      .replace(/^```json\n?/i, '')
      .replace(/^```\n?/i, '')
      .replace(/```$/i, '')
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (parseError) {
      // Try to recover array of strings
      const matches = cleaned.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g);
      if (matches && matches.length) {
        const items = matches.map(m => {
          try { return JSON.parse(m); } catch { return m.replace(/^"|"$/g, ''); }
        });
        return items;
      }
      console.warn('Failed to parse JSON, returning cleaned content:', parseError.message);
      return { raw: cleaned };
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
  const usage = { totalTokens: 0, model: PROVIDER === 'gemini' ? GEMINI_MODEL : OPENAI_MODEL };

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
