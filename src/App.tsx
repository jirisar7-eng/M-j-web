/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar.tsx';
import { StatusBar } from './components/StatusBar.tsx';
import { MainLayout } from './components/MainLayout.tsx';
import { DashboardRouter } from './components/DashboardRouter.tsx';
import { PageId } from './types.ts';
import { SITEMAP } from './config/siteData.ts';
import { useSynthesis } from './hooks/useSynthesis.ts';

/**
 * SYNTHESIS-ULTRA-V2-2026 (Core App Index)
 * Optimalizováno pro Xiaomi 13T Pro | Modularita v2.2
 */
export default function App() {
  const [view, setView] = useState<PageId>('HOME');
  const synthesis = useSynthesis();

  return (
    <div id="SiD-layout-root" className="flex min-h-screen bg-[#f0f2f5] overflow-x-hidden">
      <Sidebar currentPage={view} onPageChange={setView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <MainLayout>
          <nav className="md:hidden grid grid-cols-2 xs:grid-cols-3 gap-2 mb-6 p-2 bg-white rounded-xl shadow-sm border border-[#e2e8f0]">
            {SITEMAP.map(item => (
              <button 
                key={item.id}
                onClick={() => setView(item.id as PageId)}
                className={`py-3 px-1 flex flex-col items-center gap-1 text-[9px] font-black rounded-lg transition-all border ${
                  view === item.id ? 'bg-[#3182ce] text-white border-[#3182ce] shadow-md' : 'text-[#718096] bg-[#f8fafc] border-[#e2e8f0]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="truncate w-full text-center uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
              </button>
            ))}
            <button 
              onClick={() => setView('CMS')}
              className={`py-3 px-1 flex flex-col items-center gap-1 text-[9px] font-black rounded-lg transition-all border ${
                view === 'CMS' ? 'bg-[#1a202c] text-white' : 'text-[#1a202c] bg-white border-[#1a202c]'
              }`}
            >
              <span className="text-lg">⌨️</span><span className="uppercase tracking-tighter">EDITOR</span>
            </button>
          </nav>

          <DashboardRouter 
            view={view} 
            setView={setView}
            input={synthesis.input}
            setInput={synthesis.setInput}
            result={synthesis.result}
            isLoading={synthesis.isLoading}
            isSyncing={synthesis.isSyncing}
            performSynthesis={synthesis.performSynthesis}
            handleGSync={synthesis.handleGSync}
            performFullProjectSync={synthesis.performFullProjectSync}
          />

          <div className="mt-8">
            <StatusBar />
          </div>
        </MainLayout>
      </div>
    </div>
  );
}
