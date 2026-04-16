/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Save, X, Share2, Github, Loader2 } from 'lucide-react';
import { copyToClipboard } from '../services/copyToClipboard.ts';
import { pushToGithub } from '../services/githubService.ts';

interface CMSEditorProps {
  onClose: () => void;
}

/**
 * ID: CMD-CMS-INIT-001 (Aktualizováno v2.1)
 * Funkce: CMS Editor (CMA) s integrací G-SYNC a GitHub PUSH.
 */
export function CMSEditor({ onClose }: CMSEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPushing, setIsPushing] = useState(false);

  const handleSave = () => {
    const packet = { 
      title, 
      text: content, 
      timestamp: Date.now(), 
      id: `DOC-${Date.now()}` 
    };
    
    console.log("G-SYNC: Připraveno k odeslání", packet);
    copyToClipboard(JSON.stringify(packet, null, 2));
  };

  const handleGithubPush = async () => {
    if (!title) {
       alert("Zadejte prosím titulek pro název souboru.");
       return;
    }
    
    setIsPushing(true);
    const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
    const result = await pushToGithub(fileName, content);
    setIsPushing(false);

    if (result.success) {
      console.log(`[GIT SUCCESS] Commit: ${result.commitId}`);
      onClose();
    } else {
      alert(`GitHub Push selhal: ${result.error}`);
    }
  };

  return (
    <div id="SiD-cms-editor" className="SiD-card p-6 shadow-xl flex flex-col gap-6 bg-white shrink-0">
      <div className="flex items-center justify-between border-b border-[#f7fafc] pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#2d3748]">Editor Obsahu (CMA)</h2>
          <p className="text-[10px] text-[#718096] uppercase tracking-wider">Modul: CMS-CORE-v1 / G-SYNC & GIT ENABLED</p>
        </div>
        <button 
          id="SviD-close-editor"
          onClick={onClose}
          className="p-2 hover:bg-[#f1f5f9] rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-[#718096]" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#718096] uppercase">Titulek (např. Můj život)</label>
          <input 
            id="id-cms-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Zadejte název..."
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 text-sm focus:outline-none focus:border-[#3182ce] text-[#2d3748]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#718096] uppercase">Text (Piš sem...)</label>
          <textarea 
            id="id-cms-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Zde napište tělo příspěvku..."
            className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-3 text-sm focus:outline-none focus:border-[#3182ce] min-h-[250px] resize-none text-[#2d3748]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#f7fafc]">
        <button 
          id="SviD-save-cms"
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] text-[#4a5568] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#edf2f7] transition-all"
        >
          <Share2 className="w-4 h-4" />
          DO SCHRÁNKY (G-SYNC)
        </button>

        <button 
          id="SviD-push-github"
          onClick={handleGithubPush}
          disabled={isPushing}
          className="flex items-center gap-2 bg-[#1a202c] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#2d3748] transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {isPushing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Github className="w-4 h-4" />
          )}
          ODESLAT NA GITHUB
        </button>
      </div>
    </div>
  );
}
