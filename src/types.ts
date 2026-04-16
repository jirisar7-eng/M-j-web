/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'HOME' | 'TECH' | 'PORTFOLIO' | 'BLOG' | 'LIFE' | 'CONTACT' | 'CMS';

export interface SitemapItem {
  id: PageId;
  label: string;
  icon: string;
}
