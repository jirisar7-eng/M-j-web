/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Users, Stars } from 'lucide-react';

/**
 * Komponenta LifePage - osobní sekce o rodině a cestě za technologiemi.
 */
export function LifePage() {
  return (
    <div id="SiD-life-page" className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="SiD-card p-8 bg-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#e53e3e] mb-3">
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Osobní deník</span>
          </div>
          
          <h1 className="text-4xl font-black text-[#1a202c] mb-4">Můj Život</h1>
          <p className="text-[#718096] text-lg max-w-2xl leading-relaxed">
            O mně, mých synech Jiříkovi a Štěpánkovi a nekonečné cestě za objevováním nových technologií.
          </p>
        </div>

        {/* Dekorace */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e53e3e] opacity-[0.05] rounded-bl-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="SiD-card p-6 bg-white flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#3182ce]">
            <Users className="w-6 h-6" />
            <h3 className="font-bold text-lg uppercase tracking-tight">Rodina</h3>
          </div>
          <p className="text-sm text-[#4a5568] leading-relaxed">
            Jiřík a Štěpánek jsou mým největším motorem. Sledovat, jak objevují svět, je pro mě tou největší inspirací
            při navrhování systémů, které mají lidem skutečně pomáhat.
          </p>
        </div>

        <div className="SiD-card p-6 bg-white flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#3182ce]">
            <Stars className="w-6 h-6" />
            <h3 className="font-bold text-lg uppercase tracking-tight">Vize</h3>
          </div>
          <p className="text-sm text-[#4a5568] leading-relaxed">
            Technologie pro mě nejsou jen řádky kódu, ale nástroj k syntéze lepších zítřků. 
            Mým cílem je budovat rozhraní, která jsou lidská, intuitivní a užitečná.
          </p>
        </div>
      </div>

      <div className="SiD-card p-12 bg-[#1a202c] text-center border border-[#2d3748]">
        <span className="text-[10px] font-mono text-[#718096] uppercase tracking-[0.3em] block mb-4">CMS-CORE: LIFE_STREAM_v0.1</span>
        <div className="w-12 h-1 px-4 bg-[#2d3748] mx-auto mb-6 rounded-full"></div>
        <p className="text-[#a0aec0] italic text-sm">
          "Zde se později napojí CMS modul pro osobní postřehy v reálném čase."
        </p>
      </div>
    </div>
  );
}
