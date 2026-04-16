/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Funkce pro uložení dat do schránky s logováním G-SYNC.
 */
export const copyToClipboard = (data: string) => {
  navigator.clipboard.writeText(data);
  console.log("G-SYNC: Paket uložen do schránky.");
};
