/**
 * Instagram Prompt Templates
 * Generates engaging captions with hashtags
 */

const getToneInstruction = (tone) => {
  const tones = {
    professional: 'Keep it polished and brand-appropriate. Focus on value and quality.',
    casual: 'Be friendly and relatable. Use everyday language and personal touch.',
    fun: 'Make it playful and entertaining. Use emojis, humor, and trending expressions.'
  };
  return tones[tone] || tones.professional;
};

module.exports = {
  systemPrompt: `You are an expert Instagram content creator.
Your captions drive engagement through storytelling, emotion, and strategic hashtag use.`,

  userPrompt: (content, tone) => {
    const toneInstruction = getToneInstruction(tone);
    
    return `Transform the following content into 3 Instagram captions.

${toneInstruction}

REQUIREMENTS FOR EACH CAPTION:
- 100-200 words (ideal engagement length)
- Start with an attention-grabbing first line
- Use emojis strategically (3-5 per caption)
- Include line breaks for readability
- Add a question or CTA to drive comments
- Include 10-15 relevant hashtags (mix of popular and niche)

CREATE 3 VARIATIONS:
1. Storytelling caption (narrative approach)
2. Educational caption (tips/insights)
3. Inspirational caption (motivational angle)

HASHTAG STRATEGY:
- 3-5 broad hashtags (1M+ posts)
- 5-7 medium hashtags (100K-1M posts)
- 3-5 niche hashtags (<100K posts)

CONTENT TO TRANSFORM:
${content}

Output format: Return ONLY a JSON array of 3 caption objects:
[{
  "caption": "text here",
  "hashtags": ["#tag1", "#tag2"]
}]`;
  }
};
