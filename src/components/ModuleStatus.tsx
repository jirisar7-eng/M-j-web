/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2 } from 'lucide-react';

/**
 * ID: UI-001 (Část)
 * Popis: Sekce se stavem modulů.
 */
export function ModuleStatus() {
  const modules = [
    { name: 'Gemini API', status: 'Připojeno' },
    { name: 'Cloud Run', status: 'Ready' },
    { name: 'GitHub Sync', status: 'Connected' }
  ];

  return (
    <section id="module-status-card" className="SiD-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-[#f7fafc] pb-2">
        <label className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#718096]">SYSTÉMOVÉ MODULY</label>
      </div>
      
      <ul id="id-module-list" className="space-y-3">
        {modules.map((m) => (
          <li key={m.name} className="flex items-center justify-between py-1 border-b border-[#f1f5f9] last:border-0">
            <span className="text-sm text-[#2d3748]">{m.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-[#38a169]">{m.status.toUpperCase()}</span>
              <CheckCircle2 className="w-3 h-3 text-[#38a169]" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
