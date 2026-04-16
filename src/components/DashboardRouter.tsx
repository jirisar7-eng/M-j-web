/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HomePage } from './HomePage.tsx';
import { LifePage } from './LifePage.tsx';
import { CMSEditor } from './CMSEditor.tsx';
import { InputArea } from './InputArea.tsx';
import { SynthesisResult } from './SynthesisResult.tsx';
import { TokenMeter } from './TokenMeter.tsx';
import { ModuleStatus } from './ModuleStatus.tsx';
import { TagCloud } from './TagCloud.tsx';
import { ContentCard } from './ContentCard.tsx';
import { PageId } from '../types.ts';
import { RefreshCw, History } from 'lucide-react';

interface DashboardRouterProps {
  view: PageId;
  setView: (view: PageId) => void;
  input: string;
  setInput: (val: string) => void;
  result: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  performSynthesis: () => void;
  handleGSync: () => void;
  performFullProjectSync: () => void;
}

/**
 * Modulární router pro vykreslování obsahu dashboardu SYNTHESIS-ULTRA.
 */
export function DashboardRouter({
  view, setView, input, setInput, result, isLoading, isSyncing,
  performSynthesis, handleGSync, performFullProjectSync
}: DashboardRouterProps) {
  
  const recentItems = [
    { title: "Analýza trhu 2026", tags: ["AI", "Market", "Future"] },
    { title: "Optimalizace sítě", tags: ["Infra", "144Hz", "V2"] }
  ];

  switch(view) {
    case 'HOME':
      return (
        <>
          <HomePage />
          <div id="id-sync-controls" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={handleGSync}
              className="p-5 bg-[#1a202c] text-white rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-3"
            >
              <RefreshCw className="w-5 h-5 text-[#3182ce]" /> G-SYNC
            </button>
            <button 
              onClick={performFullProjectSync}
              disabled={isSyncing}
              className={`p-5 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-3 ${
                isSyncing ? 'bg-[#2d3748] text-[#718096]' : 'bg-[#1a202c] text-[#3182ce]'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'SYNC...' : 'G-SYNC FULL'}
            </button>
          </div>
          <InputArea value={input} onChange={setInput} onSubmit={performSynthesis} isLoading={isLoading} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6"><ModuleStatus /><TokenMeter count={result?.length || 0} /><TagCloud /></div>
            <div className="SiD-card p-6">
              <label className="text-[12px] font-bold uppercase text-[#718096] flex items-center gap-2 mb-4">
                <History className="w-3 h-3 text-[#3182ce]" /> AKTIVITA
              </label>
              {recentItems.map((item, idx) => <ContentCard key={idx} data={item} />)}
            </div>
          </div>
          <SynthesisResult result={result} />
        </>
      );
    case 'LIFE': return <LifePage />;
    case 'CMS': return <CMSEditor onClose={() => setView('HOME')} />;
    default:
      return (
        <div className="SiD-card p-12 text-center bg-white">
          <h2 className="text-xl font-bold text-[#1a202c]">MODUL {view} VE VÝSTAVBĚ</h2>
          <button onClick={() => setView('HOME')} className="text-[#3182ce] font-bold text-xs uppercase mt-4">NÁVRAT</button>
        </div>
      );
  }
}
