/**
 * Twitter/X Prompt Templates
 * Generates tweets and threads optimized for Twitter's format
 */

const getToneInstruction = (tone) => {
  const tones = {
    professional: 'Keep it professional, authoritative, and insightful. Use industry terminology appropriately.',
    casual: 'Write in a friendly, conversational tone. Use contractions and relatable language.',
    fun: 'Make it entertaining, witty, and engaging. Use humor, emojis, and playful language.'
  };
  return tones[tone] || tones.professional;
};

module.exports = {
  systemPrompt: `You are an expert social media content creator specializing in Twitter/X. 
Your task is to transform input content into engaging tweets that drive engagement.`,

  userPrompt: (content, tone, options = {}) => {
    const toneInstruction = getToneInstruction(tone);
    const threadCount = options.threadCount || 5;
    
    return `Transform the following content into ${threadCount} engaging tweets for Twitter/X.

${toneInstruction}

REQUIREMENTS:
- Each tweet must be 280 characters or less
- Use relevant hashtags (2-3 per tweet)
- Include emojis where appropriate (1-2 per tweet)
- Make each tweet stand alone but work as a thread
- Start with a hook, end with a CTA or thought-provoking question
- Use line breaks for readability

CONTENT TO TRANSFORM:
${content}

Output format: Return ONLY a JSON array of tweet strings. No explanations.
Example: ["Tweet 1 here", "Tweet 2 here"]`;
  },

  threadPrompt: (content, tone) => {
    const toneInstruction = getToneInstruction(tone);
    
    return `Transform the following content into a compelling Twitter thread (5-7 tweets).

${toneInstruction}

REQUIREMENTS:
- Tweet 1: Strong hook that stops the scroll
- Tweets 2-5: Main content, one idea per tweet
- Final tweet: Summary + CTA or question
- Each tweet ≤280 characters
- Use thread indicators (1/5, 2/5, etc.)
- Add 2-3 relevant hashtags in the last tweet

CONTENT TO TRANSFORM:
${content}

Output format: Return ONLY a JSON array of tweet strings with thread numbers.`;
  }
};
