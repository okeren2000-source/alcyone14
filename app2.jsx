/* global React, ReactDOM, I18N, ClinicDashboard, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle, useTweaks */

const { useState, useEffect, useMemo, useRef } = React;

/* ----------- Nav ----------- */
function Nav({ t, lang, setLang, dark, setDark }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="#top" onClick={close}>
          <span className="brand-mark">A</span>
          <span>Alcyone14</span>
        </a>

        <nav className="nav-links" aria-label="primary">
          <a href="#features">{t.nav.services}</a>
          <a href="#demo">{t.nav.demo}</a>
          <a href="#cases">{t.nav.cases}</a>
          <a href="#faq">{t.nav.faq}</a>
        </nav>

        <div className="nav-actions">
          <div className="lang-toggle" role="group" aria-label="language">
            <button className={lang === "he" ? "on" : ""} onClick={() => setLang("he")}>HE</button>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="#cta" className="btn btn-primary">{t.nav.cta}</a>
          <button className="nav-burger" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen
              ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="2" y1="2" x2="16" y2="16"/><line x1="16" y1="2" x2="2" y2="16"/></svg>
              : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="2" y1="5" x2="16" y2="5"/><line x1="2" y1="9" x2="16" y2="9"/><line x1="2" y1="13" x2="16" y2="13"/></svg>
            }
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="nav-mobile" aria-label="mobile menu">
          <a href="#features" onClick={close}>{t.nav.services}</a>
          <a href="#demo" onClick={close}>{t.nav.demo}</a>
          <a href="#cases" onClick={close}>{t.nav.cases}</a>
          <a href="#faq" onClick={close}>{t.nav.faq}</a>
          <a href="#cta" className="btn btn-primary nav-mobile-cta" onClick={close}>{t.nav.cta}</a>
        </nav>
      )}
    </header>
  );
}

/* ----------- Hero ----------- */
function Hero({ t, lang, autoplay, setAutoplay }) {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-tag rise"><span className="pulse"></span> {t.hero.tag}</span>
            <span className="eyebrow rise d1">{t.hero.vertical}</span>
            <h1 className="h-display h-1 hero-headline rise d2">
              {t.hero.titleBefore}
              <span className="accent">{t.hero.titleAccent}</span>
              {t.hero.titleAfter}
              <br />
              {t.hero.titleB}
            </h1>
            <p className="lead rise d3">{t.hero.lead}</p>
            <div className="hero-actions rise d3">
              <a href="#cta" className="btn btn-primary">
                {t.hero.ctaPrimary}
                <span className="arrow">→</span>
              </a>
              <a href="#demo" className="btn btn-ghost">{t.hero.ctaSecondary}</a>
            </div>
            <div className="hero-meta rise d4">
              <div className="stat">
                <span className="stat-value">{t.hero.meta1Value}</span>
                <span className="stat-label">{t.hero.meta1Label}</span>
              </div>
              <div className="stat">
                <span className="stat-value">{t.hero.meta2Value}</span>
                <span className="stat-label">{t.hero.meta2Label}</span>
              </div>
              <div className="stat">
                <span className="stat-value">{t.hero.meta3Value}</span>
                <span className="stat-label">{t.hero.meta3Label}</span>
              </div>
            </div>
          </div>

          <div className="rise d2 hero-dash">
            <ClinicDashboard t={t.demo} lang={lang} autoplay={autoplay} onAutoplayChange={setAutoplay} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------- Pain points ----------- */
function PainSection({ t }) {
  return (
    <section className="section" id="pain">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.pain.eyebrow}</span>
            <h2 className="h-display h-2">{t.pain.title}</h2>
          </div>
          <div className="right">{t.pain.sub}</div>
        </div>

        <div className="pain-grid">
          {t.pain.items.map((p, i) => (
            <div className="pain-card" key={i}>
              <span className="pain-num">{p.n}</span>
              <p className="pain-text">{p.text}</p>
              <div className="pain-tools">
                {p.tools.map((tt, j) => <span className="pain-tool" key={j}>{tt}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------- 10→1 Merge ----------- */
function MergeSection({ t }) {
  return (
    <section className="section" style={{paddingTop:0}}>
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.merge.eyebrow}</span>
            <h2 className="h-display h-2">{t.merge.title}</h2>
          </div>
          <div className="right">{t.merge.sub}</div>
        </div>

        <div className="merge">
          <div className="tools-scatter">
            {t.merge.tools.map((tool, i) => (
              <div className="tool-chip" key={i}>
                <span style={{width:8, height:8, borderRadius:2, background:"var(--line-strong)"}}></span>
                <span>{tool}</span>
                <span className="x">×</span>
              </div>
            ))}
          </div>

          <div className="merge-arrow" aria-hidden="true">
            <svg viewBox="0 0 80 30">
              <defs>
                <marker id="arrh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
                </marker>
              </defs>
              <line x1="2" y1="15" x2="74" y2="15" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrh)" />
            </svg>
          </div>

          <div className="unified-box">
            <div>
              <h3 className="h-3 mono" style={{fontWeight:700, letterSpacing:"0.04em"}}>{t.merge.unifiedTitle}</h3>
              <p className="body-sm" style={{marginTop:8}}>{t.merge.unifiedSub}</p>
            </div>
            <div className="unified-grid">
              {t.merge.uchips.map((c, i) => <span className="uchip" key={i}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------- Demo (large dashboard re-mount with controls) ----------- */
function DemoSection({ t, lang, autoplay, setAutoplay }) {
  return (
    <section className="section" id="demo">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.demo.eyebrow}</span>
            <h2 className="h-display h-2">{t.demo.title}</h2>
          </div>
          <div className="right">{t.demo.sub}</div>
        </div>

        <div style={{maxWidth: 1200, margin: "0 auto"}}>
          <ClinicDashboard t={t.demo} lang={lang} autoplay={autoplay} onAutoplayChange={setAutoplay} />
        </div>
      </div>
    </section>
  );
}

/* ----------- Features ----------- */
const FEAT_ICONS = [
  // app
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 19h4" strokeLinecap="round"/></svg>,
  // journey
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 6h12a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h12" strokeLinecap="round"/><circle cx="4" cy="6" r="1.6" fill="currentColor"/><circle cx="20" cy="18" r="1.6" fill="currentColor"/></svg>,
  // grid
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  // multi-branch
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3M5 17v-3M12 17v-3M19 17v-3M5 14h14"/></svg>,
  // mobile
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="7" y="2.5" width="10" height="19" rx="2"/><circle cx="12" cy="18" r="0.8" fill="currentColor"/><path d="M10 5h4" strokeLinecap="round"/></svg>,
  // custom
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

function FeaturesSection({ t }) {
  return (
    <section className="section" id="features">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.features.eyebrow}</span>
            <h2 className="h-display h-2">{t.features.title}</h2>
          </div>
          <div className="right">{t.features.sub}</div>
        </div>
      </div>

      <div className="shell" style={{padding: 0}}>
        <div className="features">
          {t.features.items.map((f, i) => {
            const I = FEAT_ICONS[i];
            return (
              <div className="feat" key={i}>
                <span className="feat-num">{f.n}</span>
                <div className="feat-icon"><I width="22" height="22" /></div>
                <h3 className="h-3">{f.title}</h3>
                <p>{f.body}</p>
                <div className="feat-foot">
                  {f.tags.map((tg, j) => <span className="tag-soft" key={j}>{tg}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------- Process ----------- */
function ProcessSection({ t }) {
  return (
    <section className="section" id="process">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.process.eyebrow}</span>
            <h2 className="h-display h-2">{t.process.title}</h2>
          </div>
          <div className="right">{t.process.sub}</div>
        </div>
        <div className="process">
          {t.process.steps.map((s, i) => (
            <div className="proc-step" key={i}>
              <span className="proc-num">{s.n}</span>
              <h3 className="h-3">{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------- Cases ----------- */
function CasesSection({ t }) {
  return (
    <section className="section" id="cases">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.cases.eyebrow}</span>
            <h2 className="h-display h-2">{t.cases.title}</h2>
          </div>
          <div className="right">{t.cases.sub}</div>
        </div>

        <div className="cases">
          {t.cases.items.map((c, i) => (
            <article className="case" key={i}>
              <div className="case-head">
                <h3 className="case-title">{c.title}</h3>
                <span className="case-vert">{c.vert}</span>
              </div>
              <div className="ba">
                <div className="before">
                  <h5>{t.lang === "he" ? "לפני" : "Before"}</h5>
                  <p>{c.before}</p>
                </div>
                <div className="after">
                  <h5>{t.lang === "he" ? "אחרי" : "After"}</h5>
                  <p>{c.after}</p>
                </div>
              </div>
              <div className="case-wins">
                {c.wins.map((w, j) => <span className="case-win" key={j}>{w}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------- Quotes ----------- */
const AV_COLORS = ["#2f6f7a", "#0b1d2a", "#b95a36"];
function QuotesSection({ t }) {
  return (
    <section className="section" id="quotes">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.quotes.eyebrow}</span>
            <h2 className="h-display h-2">{t.quotes.title}</h2>
          </div>
          <div className="right">{t.quotes.sub}</div>
        </div>

        <div className="quotes">
          {t.quotes.items.map((q, i) => (
            <article className="quote" key={i}>
              <span className="mark">"</span>
              <p>{q.text}</p>
              <div className="q-meta">
                <div className="q-avatar" style={{background: AV_COLORS[i % AV_COLORS.length]}}>{q.initials}</div>
                <div>
                  <div className="q-name">{q.name}</div>
                  <div className="q-role">{q.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------- Security ----------- */
const SEC_ICONS = [
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"/><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>,
  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 10h16M8 14h3"/></svg>,
];
function SecuritySection({ t }) {
  return (
    <section className="section" id="security">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.security.eyebrow}</span>
            <h2 className="h-display h-2">{t.security.title}</h2>
          </div>
          <div className="right">{t.security.sub}</div>
        </div>

        <div className="security">
          {t.security.items.map((s, i) => {
            const I = SEC_ICONS[i];
            return (
              <div className="sec" key={i}>
                <div className="sec-icon"><I width="28" height="28" /></div>
                <h3 className="h-3">{s.title}</h3>
                <p>{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------- FAQ ----------- */
function FaqSection({ t }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="shell">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow">{t.faq.eyebrow}</span>
            <h2 className="h-display h-2">{t.faq.title}</h2>
          </div>
        </div>

        <div className="faq">
          {t.faq.items.map((f, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-q-icon">+</span>
              </button>
              <div className="faq-a"><div className="faq-a-inner">{f.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------- Final CTA ----------- */
function CtaSection({ t }) {
  return (
    <section className="section" id="cta">
      <div className="shell">
        <div className="cta-block">
          <div>
            <span className="eyebrow" style={{color: "color-mix(in oklab, var(--bg) 60%, transparent)"}}>{t.cta.eyebrow}</span>
            <h2 className="h-display h-2" style={{marginTop: 12, marginBottom: 16}}>{t.cta.title}</h2>
            <p className="lead">{t.cta.sub}</p>
          </div>
          <div className="cta-card">
            <div>
              <span className="stat-label" style={{display:"block", marginBottom:6}}>{t.cta.eyebrow}</span>
              <h3 className="h-3" style={{color:"var(--bg)"}}>{t.cta.cardTitle}</h3>
            </div>
            <ul style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:10, color:"color-mix(in oklab, var(--bg) 75%, transparent)", fontSize:14}}>
              {t.cta.bullets.map((b, i) => (
                <li key={i} style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                  <span style={{width:14, height:14, borderRadius:"50%", background:"var(--accent)", flexShrink:0, marginTop:3}}></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="mailto:hello@alcyone14.com" className="btn btn-primary">{t.cta.btn}</a>
            <div className="body-sm" style={{color:"color-mix(in oklab, var(--bg) 55%, transparent)", textAlign:"center"}}>{t.cta.foot}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------- Footer ----------- */
function Footer({ t }) {
  return (
    <footer className="shell">
      <div className="foot">
        <div style={{display:"flex", alignItems:"center", gap:14}}>
          <span className="brand-mark" style={{width:24, height:24, fontSize:12}}>A</span>
          <span className="mono" style={{fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-muted)"}}>{t.footer.tagline}</span>
        </div>
        <div className="foot-links">
          {t.footer.links.map((l, i) => <a key={i} href="#">{l}</a>)}
        </div>
        <span>{t.footer.copy}</span>
      </div>
    </footer>
  );
}

/* ----------- Top-level App ----------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#0a0a0a", "#7c8aff", "#fafafa"],
  "density": "spacious",
  "theme": "light",
  "lang": "he"
}/*EDITMODE-END*/;

function App() {
  const [tw, setTw] = useTweaks(TWEAK_DEFAULTS);
  const lang = tw.lang;
  const t = useMemo(() => I18N[lang], [lang]);
  const [autoplay, setAutoplay] = useState(true);

  // Apply dir + theme + density on <html>
  useEffect(() => {
    document.documentElement.setAttribute("dir", t.dir);
    document.documentElement.setAttribute("lang", t.lang);
    document.documentElement.setAttribute("data-theme", tw.theme);
    document.documentElement.setAttribute("data-density", tw.density);
  }, [t, tw.theme, tw.density]);

  // Apply custom palette
  useEffect(() => {
    const [ink, accent, bg] = tw.palette;
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
    if (tw.theme === "light") {
      root.style.setProperty("--ink", ink);
      root.style.setProperty("--bg", bg);
    } else {
      root.style.removeProperty("--ink");
      root.style.removeProperty("--bg");
    }
  }, [tw.palette, tw.theme]);

  return (
    <div className="page">
      <Nav t={t} lang={lang} setLang={(l) => setTw("lang", l)} dark={tw.theme === "dark"} setDark={(d) => setTw("theme", d ? "dark" : "light")} />
      <Hero t={t} lang={lang} autoplay={autoplay} setAutoplay={setAutoplay} />
      <PainSection t={t} />
      <MergeSection t={t} />
      <DemoSection t={t} lang={lang} autoplay={autoplay} setAutoplay={setAutoplay} />
      <FeaturesSection t={t} />
      <ProcessSection t={t} />
      <CasesSection t={t} />
      <QuotesSection t={t} />
      <SecuritySection t={t} />
      <FaqSection t={t} />
      <CtaSection t={t} />
      <Footer t={t} />

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === "he" ? "פלטה" : "Palette"}>
          <TweakColor
            label={lang === "he" ? "צבעי מותג" : "Brand palette"}
            value={tw.palette}
            options={[
              ["#0b1d2a", "#2f6f7a", "#f6f4ee"],
              ["#1a1a1a", "#d97757", "#f6f4ef"],
              ["#0a0a0a", "#7c8aff", "#fafafa"],
              ["#2a2520", "#6b8e4e", "#f3efe7"],
            ]}
            onChange={(v) => setTw("palette", v)}
          />
        </TweakSection>

        <TweakSection label={lang === "he" ? "מצב תצוגה" : "Display"}>
          <TweakRadio
            label={lang === "he" ? "ערכת נושא" : "Theme"}
            value={tw.theme}
            options={["light", "dark"]}
            onChange={(v) => setTw("theme", v)}
          />
          <TweakRadio
            label={lang === "he" ? "צפיפות" : "Density"}
            value={tw.density}
            options={["spacious", "cozy"]}
            onChange={(v) => setTw("density", v)}
          />
          <TweakRadio
            label={lang === "he" ? "שפה" : "Language"}
            value={tw.lang}
            options={["he", "en"]}
            onChange={(v) => setTw("lang", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
