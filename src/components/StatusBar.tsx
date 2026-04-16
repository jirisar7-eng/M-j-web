import { SYSTEM_STATUS } from '../config/siteData.ts';

/**
 * Komponenta stavového řádku ve stylu patičky dashboardu (SSM v2.1).
 */
export function StatusBar() {
  return (
    <footer id="SiD-footer" className="flex items-center justify-between text-[12px] text-[#718096] pt-4 border-t border-[#e2e8f0] mt-auto">
      <div id="id-footer-left" className="flex gap-4">
        <span>STAV: <span className="text-[#38a169]">{SYSTEM_STATUS.system_health}</span></span>
        <span>MODUL: <span className="text-[#3182ce]">{SYSTEM_STATUS.active_module}</span></span>
        <span className="opacity-50">|</span>
        <span>CMD: <span className="font-mono">{SYSTEM_STATUS.last_audit_id}</span> (<span className="text-[#38a169]">COMPLETED</span>)</span>
      </div>
      <div id="id-footer-right" className="text-[#38a169] font-semibold flex items-center gap-3">
        <span className="text-[10px] text-[#718096] font-normal">T_STAMP: {SYSTEM_STATUS.last_tick}</span>
        <span>SYNTHESIS-ULTRA-CORE / VERZE {SYSTEM_STATUS.verze}</span>
      </div>
    </footer>
  );
}
