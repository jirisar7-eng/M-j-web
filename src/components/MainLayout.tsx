/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { theme } from '../styles/GlobalTheme';
import { MEDIA_ASSETS, SYSTEM_STATUS } from '../config/siteData.ts';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Hlavní obalová komponenta definující strukturu Synthesis studia v2.1.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const logo = MEDIA_ASSETS.find(asset => asset.id === "IMG-001");

  return (
    <div 
      id="SiD-main-layout"
      className="flex flex-col min-h-screen w-full"
      style={{ background: theme.colors.background }}
    >
      <header 
        id="SiD-layout-header"
        className="bg-white border-b border-[#e2e8f0] sticky top-0 z-40 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <h2 
              className="m-0 font-black uppercase text-[#1a202c]"
              style={{ fontSize: '1.4rem', letterSpacing: '4px' }}
            >
              SYNTHESIS
            </h2>
            <div id="id-layout-status" className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-[#718096] font-bold uppercase tracking-wider">v{SYSTEM_STATUS.verze} //</span>
              <span className="text-[10px] font-bold text-[#38a169] flex items-center gap-1 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38a169]"></span>
                {SYSTEM_STATUS.system_health}
              </span>
            </div>
          </div>

          {logo && (
            <img 
              id="id-layout-logo"
              src={logo.path} 
              alt={logo.alt} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 object-contain"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          )}
        </div>
      </header>
      
      <main 
        id="SiD-layout-body"
        className="flex-1 w-full max-w-7xl mx-auto"
        style={{ padding: theme.layout.padding }}
      >
        {children}
      </main>

      <footer 
        id="SiD-layout-footer"
        className="p-8 text-center border-t border-[#e2e8f0] bg-white mt-auto"
      >
        <div className="text-[12px] font-bold text-[#718096] uppercase tracking-[0.2em]">
          © 2026 Synthesis Studio | <span className="text-[#3182ce]">AI DRIVEN</span>
        </div>
        <p className="text-[10px] mt-1 text-[#a0aec0]">Engineered for Xiaomi 13T Pro / SSM v2.1</p>
      </footer>
    </div>
  );
};
