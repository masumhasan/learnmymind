import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("learnmymind.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS progress (
    user_id INTEGER,
    workout_id INTEGER,
    reps INTEGER DEFAULT 0,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS muscle_stats (
    user_id INTEGER,
    muscle_name TEXT,
    value INTEGER DEFAULT 0,
    PRIMARY KEY(user_id, muscle_name),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS workout_tracking (
    user_id INTEGER,
    key TEXT,
    value TEXT,
    PRIMARY KEY(user_id, key),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    let user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as any;
    
    if (!user) {
      const info = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, password);
      user = { id: info.lastInsertRowid, username };
    }
    
    res.json({ user: { id: user.id, username: user.username } });
  });

  app.get("/api/progress/:userId", (req, res) => {
    const progress = db.prepare("SELECT * FROM progress WHERE user_id = ?").all(req.params.userId);
    const stats = db.prepare("SELECT * FROM muscle_stats WHERE user_id = ?").all(req.params.userId);
    const tracking = db.prepare("SELECT * FROM workout_tracking WHERE user_id = ?").all(req.params.userId);
    
    const trackingMap: Record<string, string> = {};
    tracking.forEach((t: any) => {
      trackingMap[t.key] = t.value;
    });

    res.json({ progress, stats, tracking: trackingMap });
  });

  app.post("/api/log-rep", (req, res) => {
    const { userId, muscleKey, trackingKey } = req.body;
    const now = Date.now();

    const lastLogged = db.prepare("SELECT value FROM workout_tracking WHERE user_id = ? AND key = ?").get(userId, trackingKey) as any;
    
    if (lastLogged && (now - parseInt(lastLogged.value)) < 600000) {
      return res.json({ success: false, reason: "10-minute rule" });
    }

    db.transaction(() => {
      // Update muscle stat
      db.prepare(`
        INSERT INTO muscle_stats (user_id, muscle_name, value) 
        VALUES (?, ?, 1)
        ON CONFLICT(user_id, muscle_name) DO UPDATE SET value = value + 1
      `).run(userId, muscleKey);

      // Update tracking timestamp
      db.prepare(`
        INSERT INTO workout_tracking (user_id, key, value) 
        VALUES (?, ?, ?)
        ON CONFLICT(user_id, key) DO UPDATE SET value = ?
      `).run(userId, trackingKey, now.toString(), now.toString());
    })();

    res.json({ success: true });
  });

  app.post("/api/complete-workout", (req, res) => {
    const { userId, workoutId } = req.body;
    const now = Date.now();
    const trackingKey = `workout${workoutId}.last_completed_at`;
    const countKey = `workout${workoutId}.total_completions`;

    const lastLogged = db.prepare("SELECT value FROM workout_tracking WHERE user_id = ? AND key = ?").get(userId, trackingKey) as any;
    
    if (lastLogged && (now - parseInt(lastLogged.value)) < 600000) {
      return res.json({ success: false, reason: "10-minute rule" });
    }

    db.transaction(() => {
      // Log progress
      db.prepare("INSERT INTO progress (user_id, workout_id, reps) VALUES (?, ?, 1)").run(userId, workoutId);

      // Update completion timestamp
      db.prepare(`
        INSERT INTO workout_tracking (user_id, key, value) 
        VALUES (?, ?, ?)
        ON CONFLICT(user_id, key) DO UPDATE SET value = ?
      `).run(userId, trackingKey, now.toString(), now.toString());

      // Increment completion count
      db.prepare(`
        INSERT INTO workout_tracking (user_id, key, value) 
        VALUES (?, ?, '1')
        ON CONFLICT(user_id, key) DO UPDATE SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)
      `).run(userId, countKey);
    })();

    res.json({ success: true });
  });

  app.post("/api/progress", (req, res) => {
    const { userId, workoutId, reps, muscles } = req.body;
    
    db.transaction(() => {
      db.prepare("INSERT INTO progress (user_id, workout_id, reps) VALUES (?, ?, ?)").run(userId, workoutId, reps);
      
      for (const [muscle, value] of Object.entries(muscles)) {
        db.prepare(`
          INSERT INTO muscle_stats (user_id, muscle_name, value) 
          VALUES (?, ?, ?)
          ON CONFLICT(user_id, muscle_name) DO UPDATE SET value = value + ?
        `).run(userId, muscle, value, value);
      }
    })();
    
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
