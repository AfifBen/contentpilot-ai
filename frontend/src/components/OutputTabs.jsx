import React, { useState } from 'react';
import { Copy, Check, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';

/**
 * Output Tabs Component
 * Displays generated content in tabbed interface by platform
 */
export default function OutputTabs({ data }) {
  const [activeTab, setActiveTab] = useState('twitter');
  const [copiedStates, setCopiedStates] = useState({});

  const platforms = {
    twitter: { 
      label: 'Twitter/X', 
      icon: Twitter, 
      color: 'bg-sky-500' 
    },
    linkedin: { 
      label: 'LinkedIn', 
      icon: Linkedin, 
      color: 'bg-blue-700' 
    },
    newsletter: { 
      label: 'Newsletter', 
      icon: Mail, 
      color: 'bg-emerald-500' 
    },
    instagram: { 
      label: 'Instagram', 
      icon: Instagram, 
      color: 'bg-pink-500' 
    },
  };

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderContent = (platform, content) => {
    if (!content) return <p className="text-gray-500">No content generated</p>;
    
    if (platform === 'newsletter' && typeof content === 'object') {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Subject:</h4>
            <p className="text-gray-900">{content.subject}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Preview:</h4>
            <p className="text-gray-600">{content.previewText}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Body:</h4>
            <div className="prose max-w-none">
              {Array.isArray(content.body) 
                ? content.body.map((section, idx) => (
                    <p key={idx} className="mb-3">{section}</p>
                  ))
                : <p>{content.body}</p>
              }
            </div>
          </div>
        </div>
      );
    }

    if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {content.map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {platform === 'twitter' ? `Tweet ${idx + 1}` : 
                   platform === 'linkedin' ? `Post ${idx + 1}` : 
                   `Option ${idx + 1}`}
                </span>
                <button
                  onClick={() => copyToClipboard(
                    typeof item === 'string' ? item : item.caption, 
                    `${platform}-${idx}`
                  )}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {copiedStates[`${platform}-${idx}`] ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
              <p className="text-gray-900 whitespace-pre-wrap">
                {typeof item === 'string' ? item : item.caption}
              </p>
              {typeof item === 'object' && item.hashtags && (
                <div className="mt-2 text-sm text-gray-500">
                  {item.hashtags.join(' ')}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <p className="text-gray-900 whitespace-pre-wrap">{content}</p>
      </div>
    );
  };

  return (
    <div className="card">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.entries(platforms).map(([key, config]) => {
          const Icon = config.icon;
          const hasError = data[key]?.error;
          
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === key
                  ? `${config.color} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={18} />
              {config.label}
              {hasError && <span className="text-red-300">⚠️</span>}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {data[activeTab] ? (
          data[activeTab].error ? (
            <div className="text-red-600 bg-red-50 p-4 rounded-lg">
              <p className="font-medium">Generation failed</p>
              <p className="text-sm mt-1">{data[activeTab].error}</p>
            </div>
          ) : (
            renderContent(activeTab, data[activeTab])
          )
        ) : (
          <div className="text-center text-gray-500 py-12">
            Select a platform to view generated content
          </div>
        )}
      </div>
    </div>
  );
}
