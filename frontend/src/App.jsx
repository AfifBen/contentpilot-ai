import React, { useState } from 'react';
import InputSection from './components/InputSection';
import ToneSelector from './components/ToneSelector';
import OutputTabs from './components/OutputTabs';
import ExportButton from './components/ExportButton';
import { useContentGeneration } from './hooks/useContentGeneration';

export default function App() {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('text');
  const [tone, setTone] = useState('professional');
  const [formError, setFormError] = useState('');

  const { generate, isGenerating, data, error, reset } = useContentGeneration();

  const platforms = ['twitter', 'linkedin', 'newsletter', 'instagram'];
  const outputData = data?.data || {};
  const metadata = data?.metadata || { tone, platforms, contentType };

  const handleGenerate = async () => {
    if (!content.trim()) {
      setFormError('Please add some content to generate from.');
      return;
    }
    setFormError('');
    reset();
    await generate({
      content,
      contentType,
      tone,
      platforms,
    });
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ContentPilot AI</h1>
            <p className="text-sm text-gray-500">Transform one piece of content into multiple social formats</p>
          </div>
          <div className="text-sm text-gray-500">MVP</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card space-y-6">
            <InputSection
              value={content}
              onChange={setContent}
              contentType={contentType}
              onContentTypeChange={setContentType}
            />

            <ToneSelector value={tone} onChange={setTone} />

            {(formError || error) && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                {formError || error?.message || 'Generation failed'}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                className="btn-primary"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating…' : 'Generate Content'}
              </button>
              {data?.data && <ExportButton data={outputData} metadata={metadata} />}
            </div>
          </div>

          <OutputTabs data={outputData} />
        </div>
      </main>
    </div>
  );
}
