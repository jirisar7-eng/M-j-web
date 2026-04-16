/**
 * Funkce: Odesílání změn na GitHub jirisar7-eng
 * Poznámka: Token byl pro bezpečnost přesunut do systémových proměnných prostředí (GITHUB_TOKEN).
 */
export const pushToGithub = async (filePath: string, content: string) => {
  const commitId = `PUSH-${Date.now()}`;
  console.log(`[GIT] Odesílám ${filePath} pod ID: ${commitId}`);

  try {
    const response = await fetch("/api/github/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath, content, message: `Update ${filePath} [Synthesis v2.1]` }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "GitHub Push selhal.");
    }

    const result = await response.json();
    return { success: true, commitId: result.commitId };
  } catch (error) {
    console.error("[GIT SERVICE ERROR]", error);
    return { success: false, error: error instanceof Error ? error.message : "Neznámá chyba" };
  }
};
