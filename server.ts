import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

/**
 * Full-Stack Server pro Synthesis Studio v2.1.
 * Zajišťuje bezpečnou komunikaci s GitHub API.
 */
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint pro získání seznamu souborů projektu (pro Bulk Sync)
  app.get("/api/project/files", (req, res) => {
    const walk = (dir: string): string[] => {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          if (!file.includes("node_modules") && !file.includes(".git") && !file.includes("dist") && !file.includes(".next")) {
            results = results.concat(walk(file));
          }
        } else {
          results.push(path.relative(process.cwd(), file));
        }
      });
      return results;
    };
    
    try {
      const files = walk(process.cwd()).filter(f => !f.startsWith(".") && f !== "package-lock.json");
      res.json({ files });
    } catch (error) {
      res.status(500).json({ error: "Nepodařilo se vygenerovat seznam souborů." });
    }
  });

  // API endpoint pro získání obsahu souboru
  app.get("/api/project/file-content", (req, res) => {
    const filePath = req.query.path as string;
    if (!filePath) return res.status(400).json({ error: "Chybí cesta k souboru." });
    
    try {
      const fullPath = path.join(process.cwd(), filePath);
      if (!fs.existsSync(fullPath)) return res.status(404).json({ error: "Soubor neexistuje." });
      
      const content = fs.readFileSync(fullPath, "utf-8");
      res.json({ content });
    } catch (error) {
      res.status(500).json({ error: "Nepodařilo se přečíst obsah souboru." });
    }
  });

  // API endpoint pro odesílání změn na GitHub
  app.post("/api/github/push", async (req, res) => {
    const { filePath, content, message } = req.body;
    const token = process.env.GITHUB_TOKEN;
    const repo = "jirisar7-eng/M-j-web";

    if (!token) {
      return res.status(500).json({ error: "GITHUB_TOKEN není nastaven v prostředí." });
    }

    try {
      // 1. Zjistit SHA souboru, pokud existuje
      let sha: string | undefined;
      const getFileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
        },
      });

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
      }

      // 2. Odeslat změnu (Create or Update)
      const putResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message || `Update ${filePath} [Synthesis v2.1]`,
          content: Buffer.from(content).toString("base64"),
          sha: sha,
        }),
      });

      if (!putResponse.ok) {
        const errorData = await putResponse.json();
        return res.status(putResponse.status).json(errorData);
      }

      const result = await putResponse.json();
      res.json({ success: true, commitId: result.commit.sha });
    } catch (error) {
      console.error("[GIT ERROR]", error);
      res.status(500).json({ error: "Chyba při komunikaci s GitHub API." });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Synthesis Studio v2.1 běží na http://localhost:${PORT}`);
  });
}

startServer();
