/**
 * Generate Route - Main API endpoint for content generation
 * POST /api/generate
 */

const express = require('express');
const router = express.Router();
const { generateMultiPlatform, fetchFromUrl } = require('../services/aiService');

/**
 * POST /api/generate
 * Generate content for multiple social media platforms
 */
router.post('/', async (req, res, next) => {
  try {
    const { content, contentType = 'text', tone = 'professional', platforms } = req.body;

    // Validation
    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required'
      });
    }

    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one platform must be specified'
      });
    }

    // Validate platforms
    const validPlatforms = ['twitter', 'linkedin', 'newsletter', 'instagram'];
    const invalidPlatforms = platforms.filter(p => !validPlatforms.includes(p));
    if (invalidPlatforms.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid platforms: ${invalidPlatforms.join(', ')}. Valid options: ${validPlatforms.join(', ')}`
      });
    }

    // Validate tone
    const validTones = ['professional', 'casual', 'fun'];
    if (!validTones.includes(tone)) {
      return res.status(400).json({
        success: false,
        error: `Invalid tone: ${tone}. Valid options: ${validTones.join(', ')}`
      });
    }

    // Fetch content from URL if needed
    let processedContent = content;
    if (contentType === 'url') {
      try {
        processedContent = await fetchFromUrl(content);
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
    }

    // Generate content for all platforms
    const result = await generateMultiPlatform({
      content: processedContent,
      platforms,
      tone
    });

    // Success response
    res.json({
      success: true,
      data: result.data,
      usage: result.usage,
      metadata: {
        tone,
        platforms,
        contentType,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Generate route error:', error);
    next(error);
  }
});

/**
 * GET /api/generate/platforms
 * Get list of supported platforms
 */
router.get('/platforms', (req, res) => {
  res.json({
    success: true,
    platforms: [
      { id: 'twitter', name: 'Twitter/X', description: 'Tweets and threads' },
      { id: 'linkedin', name: 'LinkedIn', description: 'Professional posts' },
      { id: 'newsletter', name: 'Newsletter', description: 'Email newsletters' },
      { id: 'instagram', name: 'Instagram', description: 'Captions with hashtags' }
    ]
  });
});

/**
 * GET /api/generate/tones
 * Get list of available tones
 */
router.get('/tones', (req, res) => {
  res.json({
    success: true,
    tones: [
      { id: 'professional', name: 'Professional', description: 'Business-appropriate and polished' },
      { id: 'casual', name: 'Casual', description: 'Friendly and conversational' },
      { id: 'fun', name: 'Fun', description: 'Entertaining and playful' }
    ]
  });
});

module.exports = router;
