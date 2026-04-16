/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ContentCardProps {
  data: {
    title: string;
    tags: string[];
  };
}

/**
 * ID: CMS-CDA-001
 * Funkce: Zobrazení obsahu optimalizované pro 144Hz plynulost.
 * Cíl: Xiaomi 13T Pro (úzký displej).
 */
export const ContentCard: React.FC<ContentCardProps> = ({ data }) => {
  return (
    <article 
      id="SiD-content-card" 
      className="w-full border-b border-[#e2e8f0] pb-4 mb-4 last:border-0 last:mb-0 transition-opacity duration-200"
    >
      <h2 
        id="id-card-title" 
        className="text-lg font-bold text-[#3182ce] mb-2 leading-tight"
      >
        {data.title}
      </h2>
      <div 
        id="SviD-tag-container" 
        className="flex flex-wrap gap-2"
      >
        {data.tags.map((tag) => (
          <span 
            key={tag} 
            className="text-[10px] font-mono bg-[#f1f5f9] text-[#718096] px-2 py-0.5 rounded border border-[#e2e8f0]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
};
