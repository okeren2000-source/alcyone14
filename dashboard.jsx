/* global React */
// Interactive clinic dashboard — Alcyone14
// Tabs: dashboard, patients, calendar, whatsapp, payments
// Auto-play cycles through tabs on a 4.2s interval; pauses on hover/click.

const { useState, useEffect, useRef } = React;

/* ----------- Icons (inline SVG, no library) ----------- */
const Icon = {
  Dashboard: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="8" height="9" rx="1.5"></rect>
      <rect x="13" y="3" width="8" height="5" rx="1.5"></rect>
      <rect x="13" y="10" width="8" height="11" rx="1.5"></rect>
      <rect x="3" y="14" width="8" height="7" rx="1.5"></rect>
    </svg>
  ),
  Patients: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="9" cy="8" r="3.2"></circle>
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
      <circle cx="17" cy="9" r="2.4"></circle>
      <path d="M14.5 20c0-2.4 1.5-4.4 3.5-5"></path>
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="2"></rect>
      <path d="M3.5 10h17"></path>
      <path d="M8 3v4M16 3v4"></path>
      <rect x="7" y="13" width="4" height="3" rx="0.5" fill="currentColor" opacity="0.4" stroke="none"></rect>
    </svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12c0 4.4-4 8-9 8-1.2 0-2.4-.2-3.5-.6L4 21l1.2-3.5C3.8 16 3 14.1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"></path>
      <circle cx="9" cy="12" r="0.8" fill="currentColor" stroke="none"></circle>
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"></circle>
      <circle cx="15" cy="12" r="0.8" fill="currentColor" stroke="none"></circle>
    </svg>
  ),
  Pay: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="6" width="18" height="13" rx="2"></rect>
      <path d="M3 10h18"></path>
      <path d="M7 15h3"></path>
    </svg>
  ),
  Report: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 20V8"></path>
      <path d="M10 20v-6"></path>
      <path d="M16 20v-9"></path>
      <path d="M20 20V4"></path>
    </svg>
  ),
  Settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"></path>
    </svg>
  ),
};

/* ----------- Sparkline ----------- */
function Sparkline({ pts = [3, 5, 4, 6, 8, 7, 9, 8, 11, 12] }) {
  const max = Math.max(...pts), min = Math.min(...pts);
  const w = 56, h = 18;
  const d = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg className="kpi-spark" viewBox={`0 0 ${w} ${h}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ----------- Tab definitions ----------- */
function getTabs(t) {
  return [
    { key: "dashboard", icon: <Icon.Dashboard className="sb-icon" />, label: t.tabs.dashboard, section: "section1" },
    { key: "patients", icon: <Icon.Patients className="sb-icon" />, label: t.tabs.patients, section: "section1", badge: "142" },
    { key: "calendar", icon: <Icon.Calendar className="sb-icon" />, label: t.tabs.calendar, section: "section1" },
    { key: "whatsapp", icon: <Icon.Chat className="sb-icon" />, label: t.tabs.whatsapp, section: "section2", badge: "24" },
    { key: "payments", icon: <Icon.Pay className="sb-icon" />, label: t.tabs.payments, section: "section2" },
  ];
}

/* ----------- Sub-panels ----------- */
function DashboardPanel({ t }) {
  return (
    <div className="dash" key="dash">
      <div className="dash-header">
        <div>
          <h3 className="dash-title">{t.dashboardTitle}</h3>
          <div className="dash-sub">{t.todayLabel}</div>
        </div>
        <span className="dash-pill">{t.newAppt}</span>
      </div>

      <div className="kpi-row">
        {t.kpi.map((k, i) => (
          <div className="kpi" key={i}>
            <span className="kpi-label">{k.l}</span>
            <span className="kpi-value">{k.v}</span>
            <span className="kpi-delta">{k.d}</span>
            <Sparkline pts={[3 + i, 4, 5, 4, 6, 7, 6, 8, 9, 10 + i]} />
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <span>{t.todaysAppts}</span>
            <span className="body-sm">{t.apptCount}</span>
          </div>
          <div>
            {t.patients.map((p, i) => (
              <div className="appt" key={i}>
                <span className="appt-time">{p.at}</span>
                <span className="appt-pat">#{p.id} · {p.n}</span>
                <span className="appt-type">{p.t}</span>
                <span className={`tag tag-${p.st}`}>{t[`st${p.st[0].toUpperCase()}${p.st.slice(1)}`]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap: 14}}>
          <div className="card">
            <div className="card-header">
              <span>{t.weekTitle}</span>
            </div>
            <div className="weekly">
              {[0.5, 0.7, 0.95, 0.6, 0.8, 0.4, 0.2].map((h, i) => (
                <div key={i} style={{display:"flex", flexDirection:"column", height:"100%"}}>
                  <div className="week-bar" style={{height: `${h * 100}%`}}>
                    <div className="week-bar-fill" style={{height: `${Math.max(0, h - 0.3) * 100}%`}}></div>
                  </div>
                  <div className="week-label">{t.weekDays[i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span>{t.donutTitle}</span>
              <span className="body-sm">{t.donutSub}</span>
            </div>
            <div className="donut">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" fill="none" strokeWidth="10" className="donut-track" />
                <circle
                  cx="60" cy="60" r="48" fill="none" strokeWidth="10"
                  className="donut-fill"
                  strokeDasharray={`${2 * Math.PI * 48}`}
                  strokeDashoffset={`${2 * Math.PI * 48 * (1 - 0.76)}`}
                  strokeLinecap="round"
                />
                <text x="60" y="58" textAnchor="middle" fontSize="22" fontWeight="800" fill="currentColor" style={{transform:"rotate(90deg)", transformOrigin:"60px 60px"}}>76%</text>
                <text x="60" y="78" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6" style={{transform:"rotate(90deg)", transformOrigin:"60px 60px"}}>YTD</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientsPanel({ t }) {
  return (
    <div className="dash" key="patients">
      <div className="dash-header">
        <div>
          <h3 className="dash-title">{t.patientsTitle}</h3>
          <div className="dash-sub">{t.patientsSub}</div>
        </div>
        <span className="dash-pill">+ {t.tabs.patients}</span>
      </div>

      <div className="card" style={{padding: 0, overflow:"hidden"}}>
        <table className="tbl">
          <thead>
            <tr>{t.pHead.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {t.pRows.map((r, i) => (
              <tr key={i}>
                <td>
                  <div className="pat-mini">
                    <span className="pat-avatar">{r.n.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
                    <span>{r.n}</span>
                  </div>
                </td>
                <td className="mono" style={{color:"var(--ink-faint)"}}>{r.id}</td>
                <td style={{color:"var(--ink-muted)"}}>{r.l}</td>
                <td>
                  <span className={`tag ${r.s === "Active" || r.s === "פעיל" ? "tag-ok" : r.s === "Billing" || r.s === "תשלום" ? "tag-wait" : "tag-cancel"}`}>{r.s}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalendarPanel({ t }) {
  // Build 5x5 grid
  const slots = t.calHours.length;
  const days = t.calDays.length;
  return (
    <div className="dash" key="cal">
      <div className="dash-header">
        <div>
          <h3 className="dash-title">{t.calTitle}</h3>
          <div className="dash-sub">{t.calSub}</div>
        </div>
        <span className="dash-pill">{t.newAppt}</span>
      </div>

      <div className="cal">
        <div className="cal-h" style={{borderBottom: "1px solid var(--line)"}}></div>
        {t.calDays.map((d, i) => <div className="cal-h" key={`d${i}`}>{d}</div>)}
        {Array.from({length: slots}).map((_, slot) => (
          <React.Fragment key={`row${slot}`}>
            <div className="cal-c">{t.calHours[slot]}</div>
            {Array.from({length: days}).map((__, day) => {
              const evt = t.calEvents.find(e => e.day === day && e.slot === slot);
              return (
                <div className="cal-c" key={`c${slot}-${day}`}>
                  {evt && <div className={`cal-evt ${evt.k}`}>{evt.t}</div>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function WhatsAppPanel({ t }) {
  return (
    <div className="dash" key="wa">
      <div className="dash-header">
        <div>
          <h3 className="dash-title">{t.waTitle}</h3>
          <div className="dash-sub">{t.waSub}</div>
        </div>
        <span className="dash-pill">ManyChat</span>
      </div>

      <div className="card">
        <div className="chat">
          {t.waChat.map((m, i) => (
            <React.Fragment key={i}>
              <div className={`msg ${m.who}`}>{m.text}</div>
              {m.t && <div className="msg-meta" style={{alignSelf: m.who === "out" ? "flex-end" : "flex-start"}}>{m.t}</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsPanel({ t }) {
  return (
    <div className="dash" key="pay">
      <div className="dash-header">
        <div>
          <h3 className="dash-title">{t.payTitle}</h3>
          <div className="dash-sub">{t.paySub}</div>
        </div>
        <span className="dash-pill">{t.payDelta}</span>
      </div>

      <div className="pay-grid">
        <div className="card" style={{justifyContent:"space-between"}}>
          <div>
            <div className="kpi-label">{t.payTitle}</div>
            <div className="pay-big" style={{marginTop: 6}}>{t.payBig}</div>
          </div>
          <div>
            <div className="body-sm" style={{marginBottom:6}}>{t.payProg}</div>
            <div className="progress"><i style={{width:"76%"}}></i></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>{t.payList}</span>
            <span className="body-sm">{t.payTx.length}</span>
          </div>
          <div>
            {t.payTx.map((tx, i) => (
              <div className="appt" key={i} style={{gridTemplateColumns: "60px 1fr auto auto"}}>
                <span className="appt-time">{tx.t}</span>
                <span className="appt-pat">{tx.p}</span>
                <span className="appt-type">{tx.k}</span>
                <span className="mono" style={{fontWeight:600, color:"var(--ink)"}}>{tx.a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------- Main dashboard component ----------- */
function ClinicDashboard({ t, lang, autoplay, onAutoplayChange }) {
  const [active, setActive] = useState("dashboard");
  const tabs = getTabs(t);
  const intervalRef = useRef(null);
  const [tickKey, setTickKey] = useState(0); // re-trigger CSS animation
  const userInteracted = useRef(false);

  useEffect(() => {
    if (!autoplay) {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      return;
    }
    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const i = tabs.findIndex(x => x.key === prev);
        return tabs[(i + 1) % tabs.length].key;
      });
      setTickKey(k => k + 1);
    }, 4200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [autoplay, lang]);

  const switchTo = (k) => {
    if (k === active) return;
    setActive(k);
    setTickKey(t => t + 1);
    if (!userInteracted.current) {
      userInteracted.current = true;
      onAutoplayChange && onAutoplayChange(false);
    }
  };

  const Panel = {
    dashboard: <DashboardPanel t={t} />,
    patients: <PatientsPanel t={t} />,
    calendar: <CalendarPanel t={t} />,
    whatsapp: <WhatsAppPanel t={t} />,
    payments: <PaymentsPanel t={t} />,
  }[active];

  return (
    <div className="frame-wrap">
      <div className="browser">
        <div className="browser-bar">
          <div className="dots"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
          <div className="url">your-clinic.example/{active}</div>
          <button
            onClick={() => { userInteracted.current = true; onAutoplayChange && onAutoplayChange(!autoplay); }}
            className="dash-pill"
            style={{cursor:"pointer", fontFamily:"var(--font-mono)", fontSize:11}}
            title={t.autoplay}
            aria-pressed={autoplay}
          >
            {autoplay ? "● " : "○ "}{t.autoplay}
          </button>
        </div>

        <div className="app-shell">
          <aside className="sidebar">
            <div className="sidebar-brand">
              <span className="bm">A</span>
              <span>Alcyone14</span>
            </div>
            <div className="sb-section">{t.sbSection1}</div>
            {tabs.filter(x => x.section === "section1").map(tab => (
              <button
                key={tab.key}
                className={`sb-tab ${active === tab.key ? "on" : ""}`}
                onClick={() => switchTo(tab.key)}
                style={{position:"relative"}}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && <span className="sb-badge">{tab.badge}</span>}
                {autoplay && active === tab.key && (
                  <span key={`tp-${tickKey}`} className="tab-progress run"><i></i></span>
                )}
              </button>
            ))}
            <div className="sb-section">{t.sbSection2}</div>
            {tabs.filter(x => x.section === "section2").map(tab => (
              <button
                key={tab.key}
                className={`sb-tab ${active === tab.key ? "on" : ""}`}
                onClick={() => switchTo(tab.key)}
                style={{position:"relative"}}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && <span className="sb-badge">{tab.badge}</span>}
                {autoplay && active === tab.key && (
                  <span key={`tp-${tickKey}`} className="tab-progress run"><i></i></span>
                )}
              </button>
            ))}
            <button className="sb-tab">
              <Icon.Report className="sb-icon" />
              <span>{t.sbReports}</span>
            </button>
            <button className="sb-tab">
              <Icon.Settings className="sb-icon" />
              <span>{t.sbSettings}</span>
            </button>

            <div className="sidebar-foot">
              <div className="avatar">{t.userName.split(" ").map(s => s[0]).join("")}</div>
              <div style={{display:"flex", flexDirection:"column", lineHeight:1.2}}>
                <span style={{fontWeight:600, color:"var(--ink)", fontSize:12.5}}>{t.userName}</span>
                <span style={{fontSize:11, color:"var(--ink-faint)"}}>{t.userRole}</span>
              </div>
            </div>
          </aside>

          <div className="panel-wrap">
            <div className="mobile-tabs" role="tablist">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  className={`mobile-tab ${active === tab.key ? "on" : ""}`}
                  onClick={() => switchTo(tab.key)}
                  role="tab"
                  aria-selected={active === tab.key}
                >
                  {tab.label}
                  {tab.badge && <span className="sb-badge" style={{marginInlineStart:4}}>{tab.badge}</span>}
                </button>
              ))}
            </div>
            {Panel}
          </div>
        </div>
      </div>
    </div>
  );
}

window.ClinicDashboard = ClinicDashboard;
