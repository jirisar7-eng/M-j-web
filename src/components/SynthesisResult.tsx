/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Copy } from 'lucide-react';

interface SynthesisResultProps {
  result: string | null;
}

/**
 * Komponenta pro zobrazení výsledku syntézy ve stylu karty.
 */
export function SynthesisResult({ result }: SynthesisResultProps) {
  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div id="SiD-result-card" className="SiD-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-[#f7fafc] pb-2">
        <label id="id-label-vysledek" className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#718096] flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-[#3182ce]" /> VÝSLEDEK SYNTÉZY
        </label>
        <button 
          id="SviD-copy-btn"
          onClick={handleCopy}
          className="p-1 hover:bg-[#edf2f7] rounded transition-colors"
        >
          <Copy className="w-4 h-4 text-[#718096]" />
        </button>
      </div>
      <div 
        id="SiD-result-content"
        className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 text-sm font-mono leading-relaxed text-[#2d3748] whitespace-pre-wrap"
      >
        {result}
      </div>
    </div>
  );
}
