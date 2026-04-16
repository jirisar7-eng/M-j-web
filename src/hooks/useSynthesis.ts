/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { callGemini } from '../services/callGemini.ts';
import { generateGSyncPacket } from '../services/generateGSyncPacket.ts';
import { copyToClipboard } from '../services/copyToClipboard.ts';
import { syncEntireProject } from '../services/projectSyncService.ts';

/**
 * Hook pro správu stavu syntézy a G-SYNC synchronizace.
 */
export function useSynthesis() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'error'>('idle');

  const performSynthesis = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setStatus('processing');
    try {
      const res = await callGemini(input);
      setResult(res);
      setStatus('idle');
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGSync = useCallback(() => {
    const state = { input, result, status, isLoading };
    const packet = generateGSyncPacket(state, []);
    copyToClipboard(packet);
  }, [input, result, status, isLoading]);

  const performFullProjectSync = async () => {
    setIsSyncing(true);
    try {
      await syncEntireProject();
      alert("Totální synchronizace na GitHub byla úspěšně dokončena.");
    } catch (error) {
      console.error(error);
      alert("Chyba při synchronizaci projektu: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    input,
    setInput,
    result,
    isLoading,
    isSyncing,
    status,
    performSynthesis,
    handleGSync,
    performFullProjectSync
  };
}
