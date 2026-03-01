/**
 * Newsletter Prompt Templates
 * Generates structured email newsletters
 */

const getToneInstruction = (tone) => {
  const tones = {
    professional: 'Write in a polished, informative tone suitable for business newsletters.',
    casual: 'Use a friendly, conversational tone like writing to a colleague.',
    fun: 'Make it entertaining and engaging. Use humor and personality throughout.'
  };
  return tones[tone] || tones.professional;
};

module.exports = {
  systemPrompt: `You are an expert email marketing copywriter.
Your newsletters achieve high open rates and engagement through compelling subject lines and valuable content.`,

  userPrompt: (content, tone) => {
    const toneInstruction = getToneInstruction(tone);
    
    return `Transform the following content into a structured email newsletter.

${toneInstruction}

REQUIREMENTS:
- Subject line: Catchy, under 50 characters, creates curiosity
- Preview text: 100 characters that complement the subject
- Greeting: Warm and personal
- Opening: Hook the reader in first paragraph
- Body: 3-4 sections with clear value
- CTA: Clear call-to-action
- Sign-off: Professional closing

STRUCTURE:
{
  "subject": "...",
  "previewText": "...",
  "greeting": "...",
  "opening": "...",
  "body": ["Section 1", "Section 2", "Section 3"],
  "cta": "...",
  "signOff": "..."
}

CONTENT TO TRANSFORM:
${content}

Output format: Return ONLY a valid JSON object with the newsletter structure. No explanations.`;
  }
};
