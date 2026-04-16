/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, Terminal } from 'lucide-react';
import { SYSTEM_STATUS } from '../config/siteData.ts';

/**
 * Komponenta HomePage - uvítací sekce studia Synthesis.
 */
export function HomePage() {
  return (
    <div id="SiD-home-welcome" className="SiD-card p-8 bg-white overflow-hidden relative border-l-4 border-[#3182ce]">
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-[#3182ce] mb-3">
          <Info className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Vítejte v Synthesis</span>
        </div>
        
        <h1 className="text-4xl font-black text-[#1a202c] mb-4 leading-tight">
          Tvoříme weby, aplikace a hry pomocí <span className="text-[#3182ce]">Google Gemini AI</span>.
        </h1>
        
        <p className="text-[#718096] text-sm max-w-2xl mb-8 leading-relaxed">
          Synthesis Studio je pokročilé vývojové prostředí optimalizované pro mobilní nasazení a AI-driven workflow. 
          Využíváme nejmodernější LLM modely pro syntézu obsahu a kódu v reálném čase.
        </p>

        <div 
          id="id-home-status-box"
          className="bg-[#1a202c] p-6 rounded-xl border border-[#2d3748] shadow-2xl overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-4 border-b border-[#2d3748] pb-3">
             <div className="flex items-center gap-2 text-[#a0aec0]">
               <Terminal className="w-4 h-4 text-[#38a169]" />
               <span className="text-[10px] font-mono uppercase tracking-wider">System Diagnostic Console</span>
             </div>
             <div className="flex gap-1.5">
               <span className="w-2 h-2 rounded-full bg-[#ff5f56]"></span>
               <span className="w-2 h-2 rounded-full bg-[#ffbd2e]"></span>
               <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
             </div>
          </div>
          
          <code className="block font-mono text-xs leading-6">
            <span className="text-[#38a169]">jirisar@synthesis:~$</span> <span className="text-white">fetch system_health</span><br />
            <span className="text-[#38a169]">System:</span> <span className="text-sky-400 font-bold">{SYSTEM_STATUS.system_health}</span><br />
            <span className="text-[#38a169]">UI:</span> <span className="text-sky-400">MOBILE_READY_v2.1</span><br />
            <span className="text-[#38a169]">Module:</span> <span className="text-white">Synthesis_Engine_{SYSTEM_STATUS.active_module}</span><br />
            <span className="text-[#718096] italic animate-pulse">_ Awaiting user input...</span>
          </code>
        </div>
      </div>

      {/* Dekorativní prvek na pozadí */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#3182ce] opacity-[0.03] rounded-full blur-[80px]"></div>
    </div>
  );
}
