/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface TokenMeterProps {
  count: number;
}

/**
 * Komponenta pro zobrazení efektivity tokenů ve stylu karty.
 */
export function TokenMeter({ count }: TokenMeterProps) {
  const efficiency = count > 0 ? Math.max(10, 100 - (count / 10)) : 100;
  
  return (
    <div id="SiD-token-card" className="SiD-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-[#f7fafc] pb-2">
        <label className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#718096]">PRIORITY API & GEMINI</label>
      </div>
      
      <div className="flex gap-5 items-center">
        <div className="w-20 h-20 rounded-full border-[6px] border-[#edf2f7] border-t-[#3182ce] flex items-center justify-center text-[10px] font-extrabold text-[#2d3748]">
          VYSOKÁ
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#718096]">Efektivita tokenů</span>
              <span className="font-bold text-[#2d3748]">{efficiency.toFixed(0)}%</span>
            </div>
            <div className="h-2 w-full bg-[#edf2f7] rounded-full overflow-hidden">
              <div 
                id="SviD-meter-bar"
                className="h-full bg-[#3182ce] transition-all duration-500"
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>
          
          <div className="text-[12px] text-[#2d3748]">
            <strong>G-Sync Clipboard:</strong> <span className="text-[#38a169] font-semibold">Synchronizováno</span>
          </div>
        </div>
      </div>
    </div>
  );
}
