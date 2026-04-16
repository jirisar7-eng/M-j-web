/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SITEMAP, SYSTEM_STATUS } from '../config/siteData.ts';
import { LayoutDashboard, PenTool, User } from 'lucide-react';
import { PageId } from '../types.ts';

interface SidebarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
}

/**
 * Komponenta postranního panelu pro Dashboard (Verze 2.1 SSM).
 */
export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside 
      id="SviD-sidebar" 
      className="hidden md:flex w-[260px] SviD-sidebar flex-col p-6 h-screen sticky top-0"
    >
      <div className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#3182ce] mb-2 text-center md:text-left">STAV SYSTÉMU: {SYSTEM_STATUS.system_health}</div>
      <div className="text-lg font-semibold border-b border-[#2d3748] pb-4 mb-4 text-center md:text-left">SYNTHESIS-ULTRA-v{SYSTEM_STATUS.verze}</div>
      
      <div className="mb-6">
        <div className="text-[10px] text-[#718096] uppercase mb-1">REŽIM</div>
        <div className="text-xs font-mono bg-[#2d3748] px-2 py-1 rounded inline-block text-sky-400">{SYSTEM_STATUS.mod} MODE v{SYSTEM_STATUS.verze}</div>
      </div>
      
      <nav id="id-sidebar-nav" className="space-y-1 mb-6">
        <div className="text-[10px] text-[#718096] uppercase font-bold mb-2 tracking-wider">MODULY</div>
        
        <button 
          onClick={() => onPageChange('HOME')}
          className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
            currentPage === 'HOME' ? 'bg-[#3182ce] text-white' : 'text-[#a0aec0] hover:text-white hover:bg-[#2d3748]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </button>

        <button 
          onClick={() => onPageChange('CMS')}
          className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
            currentPage === 'CMS' ? 'bg-[#3182ce] text-white' : 'text-[#a0aec0] hover:text-white hover:bg-[#2d3748]'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span className="text-sm font-medium">CMS Editor</span>
        </button>
      </nav>

      <div id="id-sitemap-nav" className="space-y-1">
        <div className="text-[10px] text-[#718096] uppercase font-bold mb-2 tracking-wider">NAVIGACE (SITEMAP)</div>
        {SITEMAP.map(item => (
          <button 
            key={item.id} 
            onClick={() => onPageChange(item.id as PageId)}
            className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg transition-colors text-left ${
              currentPage === item.id ? 'bg-[#2d3748] text-[#3182ce] font-bold border border-[#3182ce]/30' : 'text-[#a0aec0] hover:text-white hover:bg-[#2d3748]/50'
            }`}
          >
            <span className="text-base grayscale group-hover:grayscale-0">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        <div className="text-[9px] font-mono text-[#718096]">
          GPU_ACCELERATION: TRUE<br />
          CPU_TARGET: MAX_MOBILE
        </div>
        <div className="text-[11px] opacity-30">
          Tick: {SYSTEM_STATUS.last_tick}
        </div>
      </div>
    </aside>
  );
}
