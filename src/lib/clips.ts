export type ClipCategory = "text" | "code" | "link" | "secret";

export interface Clip {
  id: string;
  category: ClipCategory;
  /** Short preview shown in the drawer row */
  preview: string;
  /** Full value (used for the copy affordance / detail) */
  value: string;
  /** Source application it was captured from */
  source: string;
  /** Relative capture time */
  time: string;
  /** Language tag for code clips */
  lang?: string;
}

export const CATEGORIES: {
  key: ClipCategory | "all";
  label: string;
  color: string;
}[] = [
  { key: "all", label: "All", color: "var(--color-violet)" },
  { key: "text", label: "Text", color: "var(--color-muted)" },
  { key: "code", label: "Code", color: "var(--color-blue)" },
  { key: "link", label: "Links", color: "var(--color-cyan)" },
  { key: "secret", label: "Sensitive", color: "var(--color-amber)" },
];

export const CLIPS: Clip[] = [
  {
    id: "c1",
    category: "code",
    lang: "rust",
    preview: "let mut watcher = ClipboardWatcher::new();",
    value: "let mut watcher = ClipboardWatcher::new();\nwatcher.on_change(|clip| store.insert(clip));",
    source: "VS Code",
    time: "just now",
  },
  {
    id: "c2",
    category: "link",
    preview: "https://tauri.app/v2/guides/",
    value: "https://tauri.app/v2/guides/",
    source: "Arc",
    time: "12s ago",
  },
  {
    id: "c3",
    category: "secret",
    preview: "•••••••••••••••••  API key",
    value: "sk-live-••••••••••••••••••••••••",
    source: "1Password",
    time: "40s ago",
  },
  {
    id: "c4",
    category: "text",
    preview: "Ship the notch drawer before Friday standup.",
    value: "Ship the notch drawer before Friday standup.",
    source: "Notion",
    time: "1m ago",
  },
  {
    id: "c5",
    category: "code",
    lang: "sql",
    preview: "SELECT * FROM clips WHERE body MATCH ?",
    value: "SELECT rowid, body FROM clips_fts WHERE body MATCH ? ORDER BY rank LIMIT 20;",
    source: "DB Browser",
    time: "2m ago",
  },
  {
    id: "c6",
    category: "text",
    preview: "invoice #4821 — net 30, due Sept 2",
    value: "invoice #4821, net 30, due Sept 2",
    source: "Gmail",
    time: "4m ago",
  },
  {
    id: "c7",
    category: "link",
    preview: "github.com/56steve/clipz",
    value: "https://github.com/56steve/clipz",
    source: "Chrome",
    time: "6m ago",
  },
  {
    id: "c8",
    category: "code",
    lang: "ts",
    preview: "const clip = await invoke('paste_last');",
    value: "const clip = await invoke<Clip>('paste_last');",
    source: "WebStorm",
    time: "9m ago",
  },
];
