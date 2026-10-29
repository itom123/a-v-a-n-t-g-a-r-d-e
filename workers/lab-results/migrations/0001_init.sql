-- AG LAB results and contacts. Rows older than 12 months are deleted by the daily cron.

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,          -- ms since epoch
  purpose TEXT NOT NULL,                -- 'results' (email me my results) | 'lead' (unlock + 1:1 reading)
  lang TEXT NOT NULL,
  version TEXT,
  mode TEXT NOT NULL,                   -- 'test' | 'self'
  type TEXT NOT NULL,
  dims TEXT,                            -- JSON {EI: pctFirst, ...}
  quality TEXT,
  flags TEXT,                           -- JSON array
  resilience INTEGER,
  element INTEGER,
  day_master INTEGER,
  archetype TEXT,
  sun INTEGER,
  moon INTEGER,
  rising INTEGER,
  quiz_ms INTEGER,
  profile TEXT,                         -- JSON
  answers TEXT,                         -- JSON [[id, 1..7], ...], only with research consent
  source TEXT                           -- JSON utm parameters
);
CREATE INDEX IF NOT EXISTS submissions_created ON submissions (created_at);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL REFERENCES submissions (id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  purpose TEXT NOT NULL,
  email TEXT,
  name TEXT,
  contact TEXT,
  who TEXT,
  age TEXT,
  consents TEXT NOT NULL,               -- JSON
  extra TEXT,                           -- JSON, e.g. the birth chart when the visitor ticks that box
  email_status TEXT,                    -- 'sent' | 'failed: …'
  message_id TEXT
);
CREATE INDEX IF NOT EXISTS contacts_email ON contacts (email, created_at);
CREATE INDEX IF NOT EXISTS contacts_created ON contacts (created_at);
