import React from 'react';

/**
 * Tone Selector Component
 * Allows users to choose the tone for generated content
 */
export default function ToneSelector({ value, onChange }) {
  const tones = [
    { id: 'professional', label: 'Professional', icon: '💼', description: 'Business-appropriate' },
    { id: 'casual', label: 'Casual', icon: '😊', description: 'Friendly & conversational' },
    { id: 'fun', label: 'Fun', icon: '🎉', description: 'Entertaining & playful' },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Tone
      </label>
      <div className="grid grid-cols-3 gap-3">
        {tones.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onChange(tone.id)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              value === tone.id
                ? 'border-primary bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-1">{tone.icon}</div>
            <div className="font-medium text-sm">{tone.label}</div>
            <div className="text-xs text-gray-500">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
