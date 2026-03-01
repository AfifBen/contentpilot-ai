/**
 * LinkedIn Prompt Templates
 * Generates professional posts optimized for LinkedIn engagement
 */

const getToneInstruction = (tone) => {
  const tones = {
    professional: 'Maintain a polished, business-appropriate tone. Focus on value and insights.',
    casual: 'Be approachable and conversational while staying professional. Share personal perspectives.',
    fun: 'Keep it light and engaging. Use storytelling and personality while remaining appropriate for LinkedIn.'
  };
  return tones[tone] || tones.professional;
};

module.exports = {
  systemPrompt: `You are an expert LinkedIn content strategist. 
Your posts drive engagement through valuable insights, storytelling, and professional wisdom.`,

  userPrompt: (content, tone) => {
    const toneInstruction = getToneInstruction(tone);
    
    return `Transform the following content into 3 distinct LinkedIn posts.

${toneInstruction}

REQUIREMENTS FOR EACH POST:
- 150-300 words (optimal LinkedIn length)
- Start with a strong hook (first 2 lines are critical)
- Use short paragraphs and line breaks for readability
- Include 1-2 relevant emojis (professional ones: 💼📈🚀💡)
- End with a question or CTA to drive comments
- Add 3-5 relevant hashtags at the end

CREATE 3 VARIATIONS:
1. Story-driven post (personal angle)
2. Educational post (tips/insights)
3. Thought leadership post (opinion/perspective)

CONTENT TO TRANSFORM:
${content}

Output format: Return ONLY a JSON array of 3 post strings. No explanations.`;
  }
};
