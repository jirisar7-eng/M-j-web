/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CornerDownLeft } from 'lucide-react';

interface InputAreaProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

/**
 * Komponenta pro vstupní text ve stylu karty.
 */
export function InputArea({ value, onChange, onSubmit, isLoading }: InputAreaProps) {
  return (
    <div id="SiD-input-card" className="SiD-card p-6 mb-6">
      <div id="id-card-header" className="flex items-center justify-between mb-4 border-b border-[#f7fafc] pb-2">
        <label className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#718096]">VSTUPNÍ DATA</label>
        <span className="text-[10px] px-2 py-1 bg-[#ebf8ff] text-[#2b6cb0] rounded-full font-bold">AKTIVNÍ</span>
      </div>
      
      <div className="relative">
        <textarea
          id="SiD-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Zadejte text pro syntézu..."
          disabled={isLoading}
          className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4 text-sm focus:outline-none focus:border-[#3182ce] transition-colors min-h-[140px] resize-none text-[#2d3748]"
        />
        <button
          id="SviD-submit-btn"
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="absolute bottom-3 right-3 p-2 bg-[#3182ce] hover:bg-[#2b6cb0] disabled:opacity-50 rounded-lg transition-all shadow-md text-white"
        >
          <CornerDownLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
