const MECHANISMS = [
  {
    n: "i",
    title: "DPAPI at rest",
    body: "Sensitive rows are encrypted with the Windows Data Protection API before they touch disk. Keys are derived from the logged-in user account — nothing for you to manage, nothing to leak.",
  },
  {
    n: "ii",
    title: "60-second RAM TTL",
    body: "Plaintext for anything flagged as secret is zeroed from process memory 60 seconds after capture. The encrypted record stays; the readable copy does not linger.",
  },
  {
    n: "iii",
    title: "No network by default",
    body: "The app has no telemetry, no crash reporter, no auto-updater phone-home. History lives in a single SQLite file in your local AppData.",
  },
  {
    n: "iv",
    title: "Auditable source",
    body: "The Rust core, the classifier heuristics, and the DPAPI wrapper are all in the public repository under MIT. Read them, fork them, patch them.",
  },
];

export function SecuritySection() {
  return (
    <section
      id="security"
      className="section-pad border-t border-[var(--border)] bg-bg-elevated"
    >
      <div className="container-page">
        <div className="mb-16 flex items-baseline justify-between gap-6 border-b border-[var(--border)] pb-6">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em]">
            Security model
          </h2>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
            Four mechanisms
          </span>
        </div>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="max-w-md text-[1rem] leading-relaxed text-muted">
              Clipboards leak. They sit in RAM, they persist across app crashes,
              they are trivially readable by any process that asks. Clipz treats
              anything the classifier marks as sensitive with a different set of
              rules than the rest of your history.
            </p>
            <div className="mt-10 border-t border-[var(--border)] pt-6">
              <div className="grid grid-cols-2 gap-6 font-mono text-[0.78rem]">
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.16em] text-faint">
                    Storage
                  </div>
                  <div className="mt-1 text-text">SQLite, DPAPI-sealed rows</div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.16em] text-faint">
                    Network
                  </div>
                  <div className="mt-1 text-text">none</div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.16em] text-faint">
                    Sensitive TTL
                  </div>
                  <div className="mt-1 text-text">60s in memory</div>
                </div>
                <div>
                  <div className="text-[0.68rem] uppercase tracking-[0.16em] text-faint">
                    License
                  </div>
                  <div className="mt-1 text-text">MIT</div>
                </div>
              </div>
            </div>
          </div>

          <ol className="flex flex-col">
            {MECHANISMS.map((m, i) => (
              <li
                key={m.n}
                className={
                  "grid grid-cols-[auto_1fr] gap-6 py-6" +
                  (i === 0 ? "" : " border-t border-[var(--border)]")
                }
              >
                <span className="pt-1 font-mono text-[0.78rem] uppercase tracking-wider text-faint">
                  {m.n}
                </span>
                <div>
                  <h3 className="text-[1.05rem] font-semibold tracking-tight">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-muted">
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
