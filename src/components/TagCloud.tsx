/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TAGS } from '../config/siteData.ts';

/**
 * Komponenta pro zobrazení mraku tagů.
 */
export function TagCloud() {
  return (
    <div id="SiD-tag-cloud" className="SiD-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-[#f7fafc] pb-2">
        <label className="text-[12px] font-bold uppercase tracking-[0.5px] text-[#718096]">SYSTÉMOVÉ TAGY</label>
      </div>
      <div id="SviD-tags-wrapper" className="flex flex-wrap gap-2">
        {TAGS.map(tag => (
          <span 
            key={tag}
            className="px-3 py-1 bg-[#edf2f7] text-[#4a5568] text-[11px] font-semibold rounded-full border border-[#e2e8f0] hover:bg-[#e2e8f0] transition-colors cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
