/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY! 
});

/**
 * Hlavní funkce pro syntézu textu pomocí Gemini.
 */
export async function callGemini(prompt: string): Promise<string> {
  if (!prompt) return '';

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "Jsi Synthesis Ultra V2. Tvým úkolem je stručně a efektivně syntetizovat zadané informace do české podoby. Buď technický, přesný a úsporný na tokeny.",
    }
  });

  return response.text || "Chyba při syntéze.";
}
