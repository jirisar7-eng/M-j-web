/**
 * ID: GIT-FULL-001
 * Účel: Agregace všech souborů z AI Studia a odeslání do jirisar7-eng/synthesis
 */

import { pushToGithub } from './githubService.ts';

/**
 * Provede hromadnou synchronizaci celého projektu na GitHub.
 * Automaticky agreguje reálný obsah všech souborů přes serverové API.
 */
export const syncEntireProject = async () => {
  console.log("[G-SYNC] Zahajuji totální synchronizaci projektu...");
  
  try {
    // 1. Získat seznam souborů
    const filesRes = await fetch("/api/project/files");
    const { files } = await filesRes.json();
    
    if (!files || files.length === 0) throw new Error("Seznam souborů je prázdný.");
    
    const results = [];
    
    for (const filePath of files) {
      try {
        // 2. Získat reálný obsah souboru ze serveru
        const contentRes = await fetch(`/api/project/file-content?path=${encodeURIComponent(filePath)}`);
        const { content } = await contentRes.json();
        
        if (content === undefined) throw new Error(`Nepodařilo se získat obsah souboru: ${filePath}`);

        // 3. Odeslat na GitHub
        const status = await pushToGithub(filePath, content);
        results.push({ 
          file: filePath, 
          status: status.success ? 'OK' : 'ERROR',
          details: status.success ? status.commitId : status.error
        });
        
        console.log(`[G-SYNC] Synced: ${filePath} -> ${status.success ? 'OK' : 'FAIL'}`);
      } catch (err) {
        results.push({ file: filePath, status: 'ERROR', details: String(err) });
      }
    }

    const summary = {
      timestamp: Date.now(),
      totalFiles: files.length,
      successful: results.filter(r => r.status === 'OK').length,
      report: results
    };

    console.log("[G-SYNC] Totální synchronizace dokončena:", summary);
    return summary;
  } catch (error) {
    console.error("[G-SYNC FATAL ERROR]", error);
    throw error;
  }
};
