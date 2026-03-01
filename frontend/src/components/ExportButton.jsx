import React from 'react';
import { Download } from 'lucide-react';

/**
 * Export Button Component
 * Exports generated content as JSON or TXT
 */
export default function ExportButton({ data, metadata }) {
  const exportAsJSON = () => {
    const exportData = {
      metadata,
      content: data,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    downloadFile(blob, 'contentpilot-export.json');
  };

  const exportAsTXT = () => {
    let text = `ContentPilot AI Export\n`;
    text += `Generated: ${new Date().toLocaleString()}\n`;
    text += `Tone: ${metadata?.tone || 'N/A'}\n`;
    text += `${'='.repeat(50)}\n\n`;

    Object.entries(data).forEach(([platform, content]) => {
      text += `${platform.toUpperCase()}\n`;
      text += `${'-'.repeat(30)}\n`;
      
      if (typeof content === 'string') {
        text += `${content}\n\n`;
      } else if (Array.isArray(content)) {
        content.forEach((item, idx) => {
          text += `${idx + 1}. ${typeof item === 'string' ? item : item.caption}\n`;
          if (item.hashtags) {
            text += `   Hashtags: ${item.hashtags.join(' ')}\n`;
          }
          text += '\n';
        });
      } else if (typeof content === 'object') {
        Object.entries(content).forEach(([key, value]) => {
          text += `${key}: ${Array.isArray(value) ? value.join('\n') : value}\n`;
        });
        text += '\n';
      }
      
      text += `\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    downloadFile(blob, 'contentpilot-export.txt');
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-3">
      <button onClick={exportAsJSON} className="btn-secondary flex items-center gap-2">
        <Download size={18} />
        Export JSON
      </button>
      <button onClick={exportAsTXT} className="btn-secondary flex items-center gap-2">
        <Download size={18} />
        Export TXT
      </button>
    </div>
  );
}
