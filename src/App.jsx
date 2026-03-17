import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0A0A0A", bg2: "#111111", card: "#161616", card2: "#1E1E1E",
  border: "#222222", border2: "#2E2E2E",
  red: "#E8392A", red2: "#FF4D3D", redGlow: "rgba(232,57,42,0.12)", redGlow2: "rgba(232,57,42,0.06)",
  green: "#34C759", text: "#F5F5F5", muted: "#555555", muted2: "#8A8A8A",
};

function useReveal() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

const FEATURES = [
  { icon: "🏋️", title: "Equipment-Aware Workouts", desc: "Set up your gym once — every exercise, every suggestion filters to what you actually have. No more Googling substitutions.", tag: "SHIPPED" },
  { icon: "🔄", title: "Smart Substitutions", desc: "Missing equipment? IronMap finds the best alternative by movement pattern and muscle group — and tells you why it made the swap.", tag: "SHIPPED" },
  { icon: "⏱️", title: "Dynamic Island Timer", desc: "Rest timer lives on your Dynamic Island and lock screen. Switch to Spotify, reply to texts — your countdown stays visible.", tag: "SHIPPED" },
  { icon: "🔥", title: "Streaks & Check-Ins", desc: "Daily accountability items: water, protein, sleep, anything. Streaks build, completion rings fill, your crew sees who showed up.", tag: "SHIPPED" },
  { icon: "📊", title: "PR Tracking", desc: "Every set logged. Personal records tracked automatically. Progressive overload suggestions based on your last session.", tag: "SHIPPED" },
  { icon: "🧠", title: "AI Mid-Workout Coach", desc: '"Shoulder hurts" → removes overhead pressing, subs lateral raises. A few words and your session restructures on-device.', tag: "COMING SOON" },
  { icon: "⌚", title: "Apple Watch", desc: "Tap through sets from your wrist. Crown adjusts weight, rest timer syncs with your phone. Works without your phone nearby.", tag: "SHIPPED", isNew: true },
  { icon: "👥", title: "Community Codes", desc: "Drop a code in your group chat — everyone's in. No friend requests, no social graph. Just an accountability board.", tag: "SHIPPED" },
];

export default function IronMap() {
  const [timer, setTimer] = useState(147);
  const [activeTrigger, setActiveTrigger] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTimer(s => s > 0 ? s - 1 : 180), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTrigger(i => (i + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  const mins = Math.floor(timer / 60);
  const secs = String(timer % 60).padStart(2, "0");
  const progress = ((180 - timer) / 180) * 100;

  const AI_TRIGGERS = [
    { input: '"Shoulder hurts"', result: "Removes overhead pressing → subs lateral raises + face pulls", icon: "🩹" },
    { input: '"Bench is taken"', result: "Swaps to dumbbell bench with adjusted weight target", icon: "🔄" },
    { input: '"Low energy today"', result: "Reduces volume by 10%, keeps compound movements", icon: "🔋" },
  ];

  return (
    <div style={{ fontFamily: "'SF Pro Display', -apple-system, 'Helvetica Neue', sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes shimmer { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
        @keyframes watchGlow { 0%,100% { box-shadow: 0 0 30px rgba(232,57,42,0.1); } 50% { box-shadow: 0 0 40px rgba(232,57,42,0.2); } }
        a { text-decoration:none; color:inherit; }
        .nav-link { color:${C.muted2}; font-size:13px; font-weight:500; transition:color 0.2s; letter-spacing:0.3px; }
        .nav-link:hover { color:${C.text}; }
        .feat-card { background:${C.card}; border:1px solid ${C.border}; border-radius:16px; padding:28px; transition:border-color 0.3s, transform 0.3s; cursor:default; }
        .feat-card:hover { border-color:${C.border2}; transform:translateY(-3px); }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:${C.red}; color:white; padding:15px 32px; border-radius:14px; font-size:15px; font-weight:700; letter-spacing:-0.2px; transition:transform 0.2s, box-shadow 0.2s; border:none; cursor:pointer; }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 16px 40px rgba(232,57,42,0.3); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; border:1px solid ${C.border2}; color:${C.muted2}; padding:15px 32px; border-radius:14px; font-size:15px; font-weight:500; transition:all 0.2s; background:transparent; cursor:pointer; }
        .btn-ghost:hover { border-color:${C.red}; color:${C.text}; }
        .section-label { font-size:10px; font-weight:700; letter-spacing:3px; color:${C.red}; text-transform:uppercase; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .section-label::before { content:''; width:24px; height:1px; background:${C.red}; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns:1fr !important; text-align:center; gap:48px !important; }
          .hero-text { align-items:center; }
          .hero-btns { justify-content:center; }
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .stats-grid > div { border-right:none !important; }
          .feat-grid { grid-template-columns:1fr !important; }
          .split-grid { grid-template-columns:1fr !important; gap:48px !important; }
          .pricing-grid { grid-template-columns:1fr !important; max-width:400px !important; }
          .nav-links { display:none !important; }
          .section-label { justify-content:center; }
          .footer-inner { flex-direction:column; text-align:center; }
          .footer-links { justify-content:center; }
          .hero-h1 { font-size:40px !important; }
          .di-section-grid { grid-template-columns:1fr !important; }
          .hero-visual-row { flex-direction:column !important; align-items:center !important; justify-content:center !important; }
          .di-pill { align-self:center !important; margin-left:0 !important; }
          .hero-visual-col { align-items:center !important; text-align:center !important; }
          .watch-caption-col { flex-direction:column !important; align-items:center !important; gap:12px !important; }
          .watch-caption-col > div:last-child { text-align:center !important; }
          .watch-mockup-inner { width:110px !important; height:134px !important; border-radius:32px !important; }
          .watch-mockup-inner .watch-time { font-size:24px !important; }
          .hero-grid { padding-bottom:80px !important; }
          .watch-caption { margin-bottom:24px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 clamp(20px,4vw,48px)", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,10,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/favicon.png" alt="IronMap" style={{ width: 30, height: 30, borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>IronMap</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 32 }}>
          {[["#features", "Features"], ["#how", "How It Works"], ["#ai", "AI Coach"], ["#pricing", "Pricing"]].map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>
        <a href="#download" className="btn-primary" style={{ padding: "8px 20px", fontSize: 13, borderRadius: 10 }}>Get IronMap</a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", padding: "100px clamp(20px,4vw,48px) 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", overflow: "hidden" }} className="hero-grid">
        <div style={{ position: "absolute", top: "30%", left: "50%", width: 700, height: 700, background: `radial-gradient(circle, ${C.redGlow} 0%, transparent 70%)`, pointerEvents: "none", transform: "translate(-50%, -50%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-start" }} className="hero-text">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,57,42,0.08)", border: "1px solid rgba(232,57,42,0.2)", borderRadius: 100, padding: "6px 16px", fontSize: 11, fontWeight: 600, color: C.red, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 28, animation: "fadeUp 0.7s ease 0.1s both" }}>
            <span style={{ width: 6, height: 6, background: C.red, borderRadius: "50%", animation: "blink 2s ease-in-out infinite" }} />
            Available on TestFlight
          </div>
          <h1 className="hero-h1" style={{ fontSize: "clamp(44px,5.5vw,76px)", fontWeight: 800, lineHeight: 0.98, letterSpacing: -3, marginBottom: 24, animation: "fadeUp 0.7s ease 0.2s both" }}>
            Your gym.<br />Your program.<br /><span style={{ color: C.red }}>Your tribe.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: C.muted2, maxWidth: 460, marginBottom: 12, animation: "fadeUp 0.7s ease 0.3s both" }}>
            IronMap filters every exercise to the equipment your gym actually has. Log sets, track PRs, and stay accountable with your crew.
          </p>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 420, marginBottom: 40, animation: "fadeUp 0.7s ease 0.35s both" }}>
            Most apps are workout logs. IronMap is a training partner.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.4s both" }} className="hero-btns">
            <a href="#download" className="btn-primary">Download on iOS →</a>
            <a href="#features" className="btn-ghost">See Features</a>
          </div>
        </div>
        {/* Hero visual */}
        <div className="hero-visual-col" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, animation: "fadeUp 0.8s ease 0.5s both" }}>

          {/* Dynamic Island pill — aligned above phone */}
          <div className="di-pill" style={{ alignSelf: "flex-start", marginLeft: 8, background: "#000", borderRadius: 22, padding: "8px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.6)", border: `1px solid ${C.border2}`, animation: "float 3s ease-in-out infinite" }}>
            <img src="/favicon.png" alt="IronMap" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <div>
              <div style={{ fontSize: 10, color: C.muted2, letterSpacing: 0.5 }}>Barbell Squat · Set 3/4</div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, animation: "pulse 1s ease-in-out infinite" }}>{mins}:{secs}</div>
            </div>
            <div style={{ width: 32, height: 32 }}>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="13" fill="none" stroke={C.border} strokeWidth="2.5" />
                <circle cx="16" cy="16" r="13" fill="none" stroke={C.red} strokeWidth="2.5" strokeDasharray={`${progress * 0.816} 81.6`} strokeLinecap="round" transform="rotate(-90 16 16)" />
              </svg>
            </div>
          </div>

          {/* Phone + Watch row */}
          <div className="hero-visual-row" style={{ display: "flex", alignItems: "center", gap: 20 }}>

            {/* Phone */}
            <div style={{ width: 240, height: 480, background: C.card, borderRadius: 44, border: `3px solid ${C.border2}`, boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 80px ${C.redGlow2}`, overflow: "hidden", flexShrink: 0 }}>
              <div style={{ height: 48, background: C.bg, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 6 }}>
                <div style={{ width: 80, height: 24, background: "#000", borderRadius: 12 }} />
              </div>
              <div style={{ padding: "16px 20px", background: C.bg }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>Workouts</div>
                  <div style={{ background: C.card2, borderRadius: 8, padding: "4px 10px", fontSize: 9, fontWeight: 600, color: C.muted2 }}>Virgin Active</div>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                  {["S1","S2","S3","S4","R"].map((s,i) => (
                    <div key={s} style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 8, fontSize: 11, fontWeight: 700, background: i===1 ? C.red : C.card, color: i===1 ? "white" : C.muted, position: "relative" }}>
                      {s}
                      {i===1 && <div style={{ position: "absolute", top: -2, right: -2, width: 6, height: 6, background: C.red, borderRadius: "50%", border: `1.5px solid ${C.bg}` }} />}
                    </div>
                  ))}
                </div>
                {[
                  { name: "Barbell Squat", weight: "50kg", sets: "3/4", active: true },
                  { name: "Bulgarian Split Squat", weight: "6kg", sets: "0/3" },
                  { name: "Leg Press", weight: "80kg", sets: "0/3" },
                  { name: "Leg Curls", weight: "20kg", sets: "0/2" },
                ].map((ex, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: ex.active ? C.card2 : "transparent", borderRadius: 12, marginBottom: 4, borderLeft: ex.active ? `3px solid ${C.red}` : "3px solid transparent" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: ex.active ? C.text : C.muted2 }}>{ex.name}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{ex.weight} · {ex.sets} sets</div>
                    </div>
                    {ex.active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, animation: "blink 1.5s ease-in-out infinite" }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Watch + caption */}
            <div className="watch-caption-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <div className="watch-mockup-inner" style={{ width: 140, height: 170, background: "#0a0a0a", borderRadius: 40, border: "2px solid #2a2a2a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "14px 10px", boxSizing: "border-box", boxShadow: "0 10px 24px rgba(0,0,0,0.5)", transform: "rotate(4deg)" }}>
                <div style={{ color: "#666", fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", marginBottom: 2 }}>REST</div>
                <div style={{ color: C.red, fontSize: 9, fontWeight: 700, textAlign: "center", marginBottom: 2 }}>BARBELL SQUAT</div>
                <div style={{ color: "#555", fontSize: 8, marginBottom: 8 }}>3/4 done</div>
                <div className="watch-time" style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 8, animation: "pulse 1s ease-in-out infinite" }}>{mins}:{secs}</div>
                <div style={{ width: "85%", height: 2, background: "#222", borderRadius: 1, marginBottom: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(1 - timer/180) * 100}%`, background: C.red, borderRadius: 1, transition: "width 1s linear" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ color: C.red, fontSize: 9 }}>♥</span>
                  <span style={{ color: C.red, fontSize: 10, fontWeight: 600 }}>76</span>
                </div>
              </div>
              <div className="watch-caption" style={{ fontSize: 12, color: "#aaa", fontWeight: 500, textAlign: "center", maxWidth: 260, lineHeight: 1.4, position: "relative", zIndex: 1 }}>Your wrist handles the workout.<br />Phone stays in your bag.</div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "32px clamp(20px,4vw,48px)" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 900, margin: "0 auto" }}>
          {[["80+", "Exercises\nmapped"], ["26", "Equipment types\ntracked"], ["4", "Seed communities\nready"], ["$0", "Cost to\nget started"]].map(([num, label], i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", padding: "0 20px", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: C.red, letterSpacing: -2, lineHeight: 1, marginBottom: 6 }}>{num}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{label.split("\n").map((l, j) => <span key={j}>{l}{j === 0 && <br />}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "100px clamp(20px,4vw,48px)", background: C.bg }}>
        <div className="section-label">How It Works</div>
        <Reveal><h2 style={{ fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 56 }}>60 seconds to start.<br /><span style={{ color: C.red }}>Then just train.</span></h2></Reveal>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { step: "01", title: "Name your gym", desc: "Type your gym name, pick an equipment preset, toggle off what's missing.", icon: "🏠" },
            { step: "02", title: "Start training", desc: "Every exercise filtered to your equipment. Suggested weights from last session. Tap and go.", icon: "🏋️" },
            { step: "03", title: "Check in daily", desc: "Workouts auto-sync. Track water, protein, sleep. Streaks build. Rings fill.", icon: "✅" },
            { step: "04", title: "Join your crew", desc: "Enter a community code. See who checked in. Accountability without the noise.", icon: "👥" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "28px 24px", height: "100%", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.red} ${(i + 1) * 25}%, transparent ${(i + 1) * 25}%)` }} />
                <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.red, marginBottom: 8 }}>STEP {s.step}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: -0.3 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: C.muted2, lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px clamp(20px,4vw,48px)", background: C.bg2 }}>
        <div className="section-label">Features</div>
        <Reveal><h2 style={{ fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 56 }}>Built for people who<br /><span style={{ color: C.red }}>actually train.</span></h2></Reveal>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="feat-card" style={{ height: "100%", ...(f.isNew ? { borderColor: "rgba(232,57,42,0.35)", boxShadow: `0 0 24px ${C.redGlow2}` } : {}) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {f.isNew && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, padding: "4px 10px", borderRadius: 100, background: "rgba(232,57,42,0.1)", color: C.red, border: "1px solid rgba(232,57,42,0.25)", animation: "shimmer 2s ease-in-out infinite" }}>NEW</span>}
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.2, padding: "4px 10px", borderRadius: 100, background: f.tag === "SHIPPED" ? "rgba(52,199,89,0.1)" : "rgba(232,57,42,0.08)", color: f.tag === "SHIPPED" ? C.green : C.red, border: `1px solid ${f.tag === "SHIPPED" ? "rgba(52,199,89,0.2)" : "rgba(232,57,42,0.2)"}` }}>{f.tag}</span>
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: -0.3 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: C.muted2, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DYNAMIC ISLAND */}
      <section style={{ padding: "100px clamp(20px,4vw,48px)", background: C.bg, overflow: "hidden" }}>
        <div className="di-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="section-label">Always Visible</div>
            <Reveal><h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>Your timer,<br /><span style={{ color: C.red }}>everywhere.</span></h2></Reveal>
            <Reveal delay={0.1}><p style={{ fontSize: 15, color: C.muted2, lineHeight: 1.75, marginBottom: 28 }}>Rest timer counts down on your Dynamic Island and lock screen. Switch to Spotify, reply to a message — your countdown stays right there. Never lose track between sets.</p></Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["⏱️", "Lock screen countdown with exercise name + set progress"], ["🏝️", "Dynamic Island shows timer while using other apps"], ["📳", "Haptic tap when rest is complete"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 20, width: 32, textAlign: "center" }}>{icon}</span>
                    <span style={{ fontSize: 13, color: C.muted2, lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 280, background: "linear-gradient(180deg, #1a2744 0%, #0f1a2e 100%)", borderRadius: 28, padding: "24px 20px", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: 48, fontWeight: 200, letterSpacing: -2, color: "rgba(255,255,255,0.9)" }}>10:13</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Saturday, March 8</div>
                </div>
                <div style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)", borderRadius: 16, padding: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Barbell Squat</div>
                    <div style={{ fontSize: 12, color: C.muted2 }}>Set 3/4</div>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 8, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: C.red, borderRadius: 2, width: `${progress}%`, transition: "width 1s linear" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: C.muted2 }}>Rest</span>
                    <span style={{ fontSize: 15, fontWeight: 800, animation: "pulse 1s ease-in-out infinite" }}>{mins}:{secs}</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI */}
      <section id="ai" style={{ padding: "100px clamp(20px,4vw,48px)", background: C.bg2 }}>
        <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="section-label">AI Training Partner</div>
            <Reveal><h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>Your workout,<br /><span style={{ color: C.red }}>on the fly.</span></h2></Reveal>
            <Reveal delay={0.1}><p style={{ fontSize: 15, color: C.muted2, lineHeight: 1.75, marginBottom: 28 }}>Type a few words mid-workout and IronMap restructures your session. Uses your program, your equipment, your history. Runs on your phone. Stays private. Costs nothing.</p></Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {AI_TRIGGERS.map((t, i) => (
                  <div key={i} style={{ background: activeTrigger === i ? C.card2 : C.card, border: `1px solid ${activeTrigger === i ? C.border2 : C.border}`, borderRadius: 14, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start", transition: "all 0.4s ease", transform: activeTrigger === i ? "scale(1.02)" : "scale(1)" }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 4 }}>{t.input}</div>
                      <div style={{ fontSize: 13, color: C.muted2, lineHeight: 1.5 }}>{t.result}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(232,57,42,0.06)", border: "1px solid rgba(232,57,42,0.15)", borderRadius: 12, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: C.red }}>COMING SOON</span>
                <span style={{ fontSize: 12, color: C.muted2 }}>· On-device, free for all users</span>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", boxShadow: `0 24px 64px rgba(0,0,0,0.5)` }}>
              <div style={{ background: C.bg, padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                <span style={{ fontSize: 11, color: C.muted, marginLeft: 8, letterSpacing: 0.5 }}>AI ADAPTATION</span>
              </div>
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1.5, marginBottom: 18, fontFamily: "monospace" }}>SESSION 1 · UPPER A</div>
                {[
                  { name: "Barbell Bench Press", sets: "3×10", status: "done" },
                  { name: "Barbell Row", sets: "3×10", status: "active" },
                  { name: "Overhead Press", sets: "3×10", status: "removed", note: "shoulder pain" },
                  { name: "Lateral Raises", sets: "3×15", status: "added", note: "AI substitution" },
                  { name: "Face Pulls", sets: "3×15", status: "added", note: "AI substitution" },
                ].map((ex, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none", opacity: ex.status === "removed" ? 0.3 : 1 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, textDecoration: ex.status === "removed" ? "line-through" : "none", color: ex.status === "done" ? C.muted2 : C.text }}>{ex.name}</div>
                      {ex.note && <div style={{ fontSize: 10, color: ex.status === "added" ? C.red : C.muted, marginTop: 3, letterSpacing: 0.5 }}>{ex.note}</div>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, color: C.muted }}>{ex.sets}</span>
                      {ex.status === "done" && <span style={{ width: 20, height: 20, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white" }}>✓</span>}
                      {ex.status === "added" && <span style={{ fontSize: 9, fontWeight: 700, color: C.red, background: "rgba(232,57,42,0.1)", padding: "3px 8px", borderRadius: 6 }}>NEW</span>}
                      {ex.status === "active" && <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.red, animation: "blink 1.5s ease-in-out infinite" }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="checkins" style={{ padding: "100px clamp(20px,4vw,48px)", background: C.bg }}>
        <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 280, background: C.card, borderRadius: 20, padding: "32px 24px", border: `1px solid ${C.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.muted, marginBottom: 20, textAlign: "center" }}>JOIN COMMUNITY</div>
                <div style={{ background: C.bg, border: `1px solid ${C.border2}`, borderRadius: 12, padding: "14px 16px", textAlign: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: 6, color: C.red }}>VIRGIN</span>
                </div>
                <div style={{ background: C.red, borderRadius: 12, padding: "14px", textAlign: "center", fontSize: 14, fontWeight: 700, color: "white", marginBottom: 20 }}>Join Community →</div>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.muted, marginBottom: 12 }}>OR BROWSE</div>
                  {[
                    { name: "Virgin Active", code: "VIRGIN", members: "12" },
                    { name: "Mindful", code: "MINDFUL", members: "8" },
                    { name: "Morning Routine", code: "MORNING", members: "15" },
                  ].map((c, i) => (
                    <div key={c.code} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: C.muted }}>{c.code}</div>
                      </div>
                      <div style={{ fontSize: 11, color: C.muted2 }}>{c.members} members</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <div className="section-label">Community</div>
            <Reveal><h2 style={{ fontSize: "clamp(28px,3vw,48px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>Drop a code.<br /><span style={{ color: C.red }}>You're in.</span></h2></Reveal>
            <Reveal delay={0.1}><p style={{ fontSize: 15, color: C.muted2, lineHeight: 1.75, marginBottom: 28 }}>No friend requests. No follower counts. Someone drops a community code in the group chat and everyone joins in seconds. Daily check-ins, streak tracking, completion rates — it's an accountability board, not a social feed.</p></Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["🔑", "Join with a code"], ["🔥", "Streak tracking"], ["🔄", "Workouts auto-sync"], ["📊", "Completion rates"], ["🏆", "Milestone celebrations"], ["🔒", "Public or private"]].map(([icon, label]) => (
                  <div key={label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px clamp(20px,4vw,48px)", background: C.bg2 }}>
        <div className="section-label">Pricing</div>
        <Reveal><h2 style={{ fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 56 }}>Free. Really.<br /><span style={{ color: C.red }}>No catch.</span></h2></Reveal>
        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, alignItems: "start", maxWidth: 720, margin: "0 auto" }}>
          {[
            { name: "Free", price: "Free", period: "forever · no credit card", featured: false, features: ["Unlimited gym profiles", "All training programs", "Equipment-aware filtering", "Group check-ins & streaks", "PR tracking & overload suggestions", "Dynamic Island rest timer", "Community codes (join & create)", "Apple Watch support"], cta: "Download Free" },
            { name: "Pro", price: "฿299/mo", period: "AI coaching features", featured: true, features: ["Everything in Free", "AI mid-workout adaptation", "Multi-week program restructuring", "Advanced analytics", "Priority support", "Early access to new features"], cta: "Coming Soon" },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div style={{ background: p.featured ? "linear-gradient(160deg, #180808, #0D0505)" : C.card, border: `1px solid ${p.featured ? "rgba(232,57,42,0.35)" : C.border}`, borderRadius: 20, padding: "36px 28px", position: "relative", boxShadow: p.featured ? `0 0 48px rgba(232,57,42,0.06)` : "none" }}>
                {p.featured && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.red, color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, padding: "5px 18px", borderRadius: 100, whiteSpace: "nowrap" }}>AI FEATURES</div>}
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: p.featured ? C.red : C.muted, marginBottom: 16 }}>{p.name.toUpperCase()}</div>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -2, lineHeight: 1, marginBottom: 4 }}>{p.price}</div>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 28 }}>{p.period}</div>
                <div style={{ height: 1, background: p.featured ? "rgba(232,57,42,0.12)" : C.border, marginBottom: 24 }} />
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: 13, color: C.muted2, display: "flex", gap: 10, alignItems: "flex-start", lineHeight: 1.4 }}>
                      <span style={{ color: p.featured ? C.red : C.green, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "block", width: "100%", padding: 14, borderRadius: 12, textAlign: "center", fontSize: 14, fontWeight: 700, background: p.featured ? C.red : "transparent", color: p.featured ? "white" : C.muted2, border: p.featured ? "none" : `1px solid ${C.border2}`, cursor: p.featured ? "default" : "pointer" }}>{p.cta}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="download" style={{ padding: "100px clamp(20px,4vw,48px)", background: C.bg, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: `radial-gradient(ellipse, ${C.redGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
        <Reveal><h2 style={{ fontSize: "clamp(36px,5vw,72px)", fontWeight: 800, letterSpacing: -3, lineHeight: 0.95, marginBottom: 16, position: "relative" }}>Ready to train<br /><span style={{ color: C.red }}>smarter?</span></h2></Reveal>
        <Reveal delay={0.1}><p style={{ fontSize: 16, color: C.muted2, maxWidth: 440, margin: "0 auto 40px", lineHeight: 1.75, position: "relative" }}>IronMap is free on iOS. Download from TestFlight and start training with the equipment you actually have.</p></Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <a href="https://testflight.apple.com/join/TGzq2jhW" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>🍎 Download on TestFlight</a>
          </div>
        </Reveal>
        <Reveal delay={0.3}><div style={{ marginTop: 32, fontSize: 12, color: C.muted, position: "relative" }}>Free during beta · iOS · Built in Bangkok 🇹🇭</div></Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: "28px clamp(20px,4vw,48px)" }}>
        <div className="footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/favicon.png" alt="IronMap" style={{ width: 24, height: 24, borderRadius: 6 }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>IronMap</span>
          </div>
          <ul className="footer-links" style={{ display: "flex", gap: 24, listStyle: "none" }}>
            {[["#features", "Features"], ["#how", "How It Works"], ["#ai", "AI Coach"], ["#pricing", "Pricing"], ["#download", "Download"]].map(([href, label]) => (
              <li key={href}><a href={href} style={{ fontSize: 12, color: C.muted, transition: "color 0.2s" }}>{label}</a></li>
            ))}
          </ul>
          <div style={{ fontSize: 12, color: C.muted }}>© 2026 IronMap · Bangkok 🇹🇭</div>
        </div>
      </footer>
    </div>
  );
}