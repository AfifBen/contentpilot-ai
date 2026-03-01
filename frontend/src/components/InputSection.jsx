import React, { useState } from 'react';
import { Upload, Link as LinkIcon, FileText } from 'lucide-react';

/**
 * Input Section Component
 * Handles content input (text, URL, or file upload)
 */
export default function InputSection({ value, onChange, contentType, onContentTypeChange }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
      onContentTypeChange('text');
    };
    reader.readAsText(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onContentTypeChange('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            contentType === 'text'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FileText size={18} />
          Text
        </button>
        <button
          onClick={() => onContentTypeChange('url')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            contentType === 'url'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <LinkIcon size={18} />
          URL
        </button>
      </div>

      {contentType === 'text' ? (
        <>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your content here (blog post, article, notes, etc.)..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none font-sans"
          />
          
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-indigo-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-2">
              Drag & drop a .txt or .md file here
            </p>
            <p className="text-xs text-gray-500">or</p>
            <label className="inline-block mt-2">
              <span className="btn-primary cursor-pointer">
                Browse Files
              </span>
              <input
                type="file"
                accept=".txt,.md"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/blog-post"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <p className="text-sm text-gray-500">
            Enter a blog post or article URL to fetch content automatically
          </p>
        </div>
      )}

      {value && (
        <div className="text-sm text-gray-500">
          {value.length} characters
        </div>
      )}
    </div>
  );
}
