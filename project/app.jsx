/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

/* ============================================================
   Hooks
   ============================================================ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll('.reveal').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

function useCounter(target, trigger, opts = {}) {
  const { duration = 1600, decimals = 0 } = opts;
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return decimals ? val.toFixed(decimals) : Math.round(val);
}

function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ============================================================
   Asset path helper (works in standalone bundle too)
   ============================================================ */
function R(id, fallback) {
  if (typeof window !== 'undefined' && window.__resources && window.__resources[id]) {
    return window.__resources[id];
  }
  return fallback;
}

/* ============================================================
   Image slot wrapper
   ============================================================ */
function ImgSlot({ id, placeholder, shape = 'rect', radius }) {
  return (
    <image-slot id={id} placeholder={placeholder} shape={shape} radius={radius}></image-slot>
  );
}

/* ============================================================
   Nav
   ============================================================ */
function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav-brand">
        <span className="mark">M</span>
        <div className="stack">
          <span>Mariam Kirakosyan</span>
          <span className="role">Artist Marketing · Portfolio</span>
        </div>
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#artists">UMG Artists</a>
        <a href="#cases">Case Studies</a>
        <a href="#trends">Trends</a>
        <a href="#mocks">Mock Ideas</a>
      </div>
      <div className="nav-right">
        <div className="availability">
          <span className="dot"></span>
          <span>Open to opportunities</span>
        </div>
        <button className="btn-light">
          Get in touch
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
        </button>
      </div>
    </nav>
  );
}

/* ============================================================
   Hero orbit
   ============================================================ */
function HeroOrbit() {
  return (
    <svg className="hero-orbit" viewBox="0 0 1000 1000">
      <g className="o1"><circle className="ring" cx="500" cy="500" r="200" /></g>
      <g className="o2"><circle className="ring" cx="500" cy="500" r="300" /></g>
      <g className="o3"><circle className="ring" cx="500" cy="500" r="400" /></g>
      <g className="o4"><circle className="ring" cx="500" cy="500" r="490" /></g>
      <g className="o1">
        <circle className="lime-dot" cx="700" cy="500" r="5" />
        <circle className="star" cx="300" cy="500" r="2" />
      </g>
      <g className="o2">
        <circle className="green-dot" cx="800" cy="500" r="4" />
        <circle className="star" cx="200" cy="500" r="2" />
      </g>
      <g className="o3">
        <circle className="lime-dot" cx="500" cy="100" r="3" />
        <circle className="star" cx="500" cy="900" r="2.5" />
      </g>
      <g className="o4">
        <circle className="star" cx="990" cy="500" r="2" />
        <circle className="lime-dot" cx="10" cy="500" r="3" />
      </g>
    </svg>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg"></div>
      <HeroOrbit />
      <div className="hero-content">
        <span className="hero-kicker">
          <span className="pill-new">2026</span>
          Portfolio · Observations on UMG &amp; international markets
          <span className="arrow">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
          </span>
        </span>
        <p className="hero-name">
          <span className="lime-square"></span>
          Mariam Kirakosyan
        </p>
        <h1 className="hero-title">
          <span className="word" style={{animationDelay: '0.05s'}}>International</span>{' '}
          <span className="word" style={{animationDelay: '0.15s'}}>Artist</span>{' '}
          <span className="word" style={{animationDelay: '0.25s'}}>Marketing</span>
          <br />
          <span className="word" style={{animationDelay: '0.35s'}}>in the</span>{' '}
          <span className="word accent" style={{animationDelay: '0.45s'}}>Age of</span>{' '}
          <span className="word accent" style={{animationDelay: '0.55s'}}>Virality</span>
        </h1>
        <p className="hero-sub">
          A portfolio of observations on how UMG artists are introduced, positioned, and
          scaled across the Australian and international markets — fan culture, familiarity,
          and the digital playbook.
        </p>
        <div className="hero-cta">
          <a href="#cases" className="btn-lime">
            Read the case studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a href="#trends" className="btn-ghost">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4l14 8-14 8V4z"/></svg>
            Watch trend reel
          </a>
        </div>
      </div>
      <HeroStats />
    </section>
  );
}

/* ============================================================
   Hero stats strip
   ============================================================ */
function HeroStats() {
  const [ref, inView] = useInView(0.2);
  const subjects = useCounter(24, inView);
  const cases = useCounter(6, inView);
  const trends = useCounter(2024, inView, { duration: 1200 });
  const drives = useCounter(72, inView);

  return (
    <div className="hero-stats" ref={ref}>
      <div className="stat-image">
        <span className="tag">Field notes · Sydney</span>
        <img src={R('heroImg', 'assets/cortis-profile.jpg')} alt="Studio session" />
      </div>

      <div className="stat-card">
        <div className="pretitle">Artists observed</div>
        <div className="num">{subjects}</div>
        <div className="label">Across the UMG roster &amp; adjacent international rollouts.</div>
      </div>

      <div className="stat-card stat-card-lime">
        <div className="pretitle">Case studies</div>
        <div className="num">{cases}</div>
        <div className="label">Deep-dive examples from 2024 — 2026, plus a live trend reel.</div>
        <svg className="bg-wave" width="160" height="120" viewBox="0 0 160 120" fill="none">
          <path d="M0 80 Q40 40 80 60 T160 50" stroke="#000" strokeWidth="2" fill="none"/>
          <path d="M0 100 Q40 60 80 80 T160 70" stroke="#000" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="stat-chart">
        <div className="top">
          <div>
            <div className="pct">{trends}</div>
            <div className="label" style={{fontSize: 12, color: 'var(--text-secondary)', marginTop: 4}}>Trends tracked since</div>
          </div>
          <span className="delta">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
            live
          </span>
        </div>
        <div className="bars">
          {[30, 45, 55, 40, 75, 60, 95].map((h, i) => (
            <div
              key={i}
              className={`bar ${i === 6 ? 'active' : ''}`}
              style={{ height: inView ? `${h}%` : '15%', transitionDelay: `${0.3 + i * 0.08}s` }}
            />
          ))}
        </div>
      </div>

      <div className="stat-locales">
        <div>
          <div className="pretitle">Half-life</div>
          <div className="num">{drives}h</div>
          <div className="tags">
            <span className="tag-pill">TikTok</span>
            <span className="tag-pill">Reels</span>
            <span className="tag-pill">Shorts</span>
            <span className="tag-pill">DSPs</span>
          </div>
        </div>
        <svg className="globe" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="#0a0a0a" stroke="rgba(197,216,63,0.3)" strokeWidth="1"/>
          {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y) => (
            <ellipse key={y} cx="100" cy={y} rx="85" ry={Math.abs(85 - Math.abs(y - 100))} fill="none" stroke="rgba(197,216,63,0.15)" strokeWidth="0.5"/>
          ))}
          {[20, 60, 100, 140, 180].map((x) => (
            <line key={x} x1={x} y1="15" x2={x} y2="185" stroke="rgba(197,216,63,0.15)" strokeWidth="0.5"/>
          ))}
          <circle cx="80" cy="70" r="3" fill="var(--gfc-lime)"/>
          <circle cx="130" cy="95" r="3" fill="var(--gfc-lime)"/>
          <circle cx="70" cy="130" r="3" fill="var(--gfc-lime)"/>
          <circle cx="115" cy="135" r="3" fill="var(--gfc-lime)"/>
        </svg>
      </div>
    </div>
  );
}

/* ============================================================
   Marquee
   ============================================================ */
function Marquee() {
  const labels = [
    'Universal Music Group',
    'Republic Records',
    'Interscope',
    'Def Jam',
    'Capitol Music',
    'Island Records',
    'EMI Music Australia',
    'Polydor',
  ];
  const all = [...labels, ...labels];
  return (
    <div className="container">
      <div className="marquee-section">
        <div className="marquee-label">Operating under the UMG umbrella</div>
        <div className="marquee">
          {all.map((l, i) => (
            <div key={i} className="label-brand">
              {l}
              <span className="dot-sep"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   About
   ============================================================ */
function About() {
  const ref = useReveal();
  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <aside className="about-side reveal">
            <div className="meta">— About</div>
            <h2>An observer's <span className="lime">view of the room.</span></h2>
            <p className="helper">
              This portfolio is an exercise in pattern recognition — what makes one
              international rollout land in Australia while another evaporates, and how
              fandom, familiarity, and the digital playbook quietly do most of the work.
            </p>
            <div className="signature">
              <div className="avatar">MK</div>
              <div>
                <div style={{fontSize: 14, fontWeight: 700}}>Portfolio · 2026</div>
                <div style={{fontSize: 12, color: 'var(--text-muted)'}}>Updated May · Sydney</div>
              </div>
            </div>
          </aside>

          <div className="about-copy reveal">
            <p>
              I write about <em>international artist marketing</em> from the audience's side of
              the table — paying close attention to how UMG artists are introduced, positioned,
              and scaled, and what Australian listeners actually do with them once they arrive.
              <span className="muted"> The work sits at the intersection of fan culture, streaming strategy, and the cultural reporting that runs alongside the algorithm.</span>
            </p>
            <p>
              <span className="muted">Every observation in this portfolio returns to the same question: </span>
              what makes a song, a moment, or an artist <em>travel?</em>
            </p>
            <div className="pill-row">
              {[
                'Fan culture',
                'Cultural translation',
                'Social-first storytelling',
                'Participation mechanics',
                'Australian audience',
                'Community design',
                'Discovery feel',
                'Moment design',
              ].map((s) => (
                <span key={s} className="skill">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   UMG Artists bento
   ============================================================ */
function Artists() {
  const ref = useReveal();
  const list = [
    { cls: 'a-1', img: R('badBunnyAllure', 'assets/bad-bunny-allure.webp'),  name: 'Bad Bunny',     label: 'Rimas · Republic', tag: 'Latin',    meta: 'Brand-adjacent expansion' },
    { cls: 'a-2', img: R('troyeBillboard', 'assets/troye-billboard.webp'),  name: 'Troye Sivan',   label: 'EMI Music Australia', tag: 'Pop',  meta: 'Blue Neighbourhood · 10yr' },
    { cls: 'a-3', img: R('katseyeLuna', 'assets/katseye-luna-park.webp'),   name: 'KATSEYE',       label: 'Geffen · HYBE',    tag: 'K-Pop',    meta: 'Luna Park · Sydney' },
    { cls: 'a-4', img: R('cortisFashion', 'assets/cortis-fashion.webp'),    name: 'Cortis',        label: 'Geffen',           tag: 'K-Pop',    meta: 'Fashion, Fashion' },
    { cls: 'a-5', img: R('fiveSos', 'assets/5sos-album.jpg'),               name: '5 Seconds of Summer', label: 'Polydor',    tag: 'Pop-Rock', meta: 'Local familiarity bridge' },
    { cls: 'a-6', slot: 'ruelSlot', name: 'Ruel',          label: 'RCA · Sony — case mock', tag: 'Pop',  meta: 'Drop your image here' },
  ];
  return (
    <section className="section" id="artists" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-stack">
            <span className="section-eyebrow"><span className="square"></span>UMG Roster · Observed</span>
            <h2 className="section-title">Artists I've followed <span className="accent">closely.</span></h2>
          </div>
          <p className="section-subtitle">A working group of international and local artists whose campaigns I keep returning to. Each one teaches something different about how trust, familiarity, and participation get built.</p>
        </div>

        <div className="artists-grid reveal">
          {list.map((a) => (
            <div key={a.name} className={`artist-card ${a.cls}`}>
              {a.slot ? (
                <ImgSlot id={a.slot} placeholder="Drop in: Ruel reference image" />
              ) : (
                <img src={a.img} alt={a.name} />
              )}
              <div className="overlay">
                <div className="label">{a.label}</div>
                <h3>{a.name}</h3>
                <div className="meta">
                  <span className="pill">{a.tag}</span>
                  <span>{a.meta}</span>
                </div>
              </div>
              <div className="corner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Case Studies (3 alternating, animated counters)
   ============================================================ */
function CaseStat({ v, l, suffix = '', decimals = 0, trigger }) {
  const val = useCounter(v, trigger, { decimals });
  return (
    <div className="s">
      <span className="v">{val}{suffix}</span>
      <span className="l">{l}</span>
    </div>
  );
}

function Cases() {
  const ref = useReveal();
  const [r1, inv1] = useInView(0.2);
  const [r2, inv2] = useInView(0.2);
  const [r3, inv3] = useInView(0.2);

  const studies = [
    {
      r: r1, inv: inv1,
      img: R('caseKatseye', 'assets/katseye-luna-park.webp'),
      tagLime: 'Case 01',
      tag: 'Market Entry · Australia',
      meta: ['KATSEYE', 'Geffen · HYBE', 'Sydney 2025'],
      title: 'Cultural framing through place — how Luna Park did the introduction for ',
      titleAccent: 'KATSEYE.',
      blurb: "Luna Park isn't just a venue — it's a cultural landmark embedded in Sydney nostalgia. By positioning KATSEYE inside that space, the activation grounded the group in local cultural memory before a single track had to do explanatory work. Fans travelled interstate for a short Q&A; the collaboration with Cat & Calmell created a familiarity bridge through association, not explanation.",
      stats: [
        { v: 6, l: 'APAC territories activated', suffix: '' },
        { v: 1, l: 'Cultural landmark used as the anchor', suffix: '' },
        { v: 2, l: 'Local artist bridges (Cat & Calmell)', suffix: '' },
      ],
      principle: 'Successful market entry embeds artists into environments audiences already trust.',
    },
    {
      r: r2, inv: inv2,
      reverse: true,
      img: R('caseBadBunny', 'assets/bad-bunny-portrait.webp'),
      tagLime: 'Case 02',
      tag: 'Algorithm · Brand Adjacency',
      meta: ['Bad Bunny', 'Rimas · Republic', '2024 — 2026'],
      title: 'Internet-driven global expansion, and the ',
      titleAccent: 'brand-as-trust-anchor moment.',
      blurb: "Bad Bunny's growth in Australia reflects a shift away from traditional gatekeeping toward algorithm-driven discovery, meme culture, and visibility outside music spaces entirely. The Calvin Klein campaign was the inflection point — it didn't sell a song, it sold cultural permission. The artist became readable inside a globally understood brand system, and the music became, for many new listeners, a secondary discovery.",
      stats: [
        { v: 3, l: 'Discovery now happens socially first', suffix: 'x' },
        { v: 1, l: 'Brand anchor → cultural permission', suffix: '' },
        { v: 0, l: 'Spanish required for adoption', suffix: '' },
      ],
      principle: 'Internet virality accelerates cultural permission, but does not replace strategic positioning.',
    },
    {
      r: r3, inv: inv3,
      img: R('caseTroye', 'assets/troye-rolling-stone.webp'),
      tagLime: 'Case 03',
      tag: 'Catalog · Nostalgia',
      meta: ['Troye Sivan', 'EMI Music Australia', '2024 — 2025'],
      title: 'A catalog anniversary, rerun as a ',
      titleAccent: 'current cultural event.',
      blurb: 'Blue Neighbourhood at 10 years became a "where were you when…" UGC engine. The nostalgia opened the door; the digital-native fanbase walked younger listeners through it. A clean case of how local-and-global positioning compounds — globally established, locally and emotionally embedded, natively digital.',
      stats: [
        { v: 10, l: 'Years since Blue Neighbourhood dropped', suffix: '' },
        { v: 2, l: 'Generations bonded over a single era', suffix: '' },
        { v: 1, l: 'Core memory framed as a trend', suffix: '' },
      ],
      principle: 'The rare positioning: globally established, locally embedded — let nostalgia do the rediscovery.',
    },
  ];

  return (
    <section className="section" id="cases" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-stack">
            <span className="section-eyebrow"><span className="square"></span>Case Studies · 2024 — 2026</span>
            <h2 className="section-title">Three campaigns that <span className="accent">re-shape how I think about rollouts.</span></h2>
          </div>
          <p className="section-subtitle">Two market-entry plays and one catalog moment. Each one is a study in how international artists actually arrive in Australia — and what they do once they're here.</p>
        </div>

        <div className="case-list">
          {studies.map((s, i) => (
            <article key={i} ref={s.r} className={`case-card reveal ${s.reverse ? 'reverse' : ''}`}>
              <div className="case-image">
                <div className="badge-row">
                  <span className="b-pill lime">{s.tagLime}</span>
                  <span className="b-pill">{s.tag}</span>
                </div>
                <img src={s.img} alt="" />
              </div>
              <div className="case-body">
                <div>
                  <div className="meta">
                    {s.meta.map((m, j) => (
                      <React.Fragment key={j}>
                        <span>{m}</span>
                        {j < s.meta.length - 1 && <span className="sep"></span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <h3>{s.title}<span className="lime">{s.titleAccent}</span></h3>
                </div>
                <p className="blurb">{s.blurb}</p>
                <div className="case-stats">
                  {s.stats.map((it, k) => (
                    <CaseStat key={k} {...it} trigger={s.inv} />
                  ))}
                </div>
                <div className="principle">
                  <span className="l">Core principle</span>
                  {s.principle}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Viral trends + video spotlights
   ============================================================ */
function VideoSpotlight({ vid, vidId, portrait, badgeText, badgeLime, meta, title, titleAccent, note, mechanic }) {
  const videoRef = useRef(null);
  const onClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  };
  return (
    <article className={`spotlight reveal ${portrait ? 'portrait' : ''}`}>
      <div className="video-wrap" onClick={onClick}>
        <div className="badge-row">
          <span className="b-pill lime">{badgeLime}</span>
          <span className="b-pill">{badgeText}</span>
        </div>
        <video
          ref={videoRef}
          src={R(vidId, vid)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="play-shim">
          <div className="ring">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="meta">
          {meta.map((m, i) => (
            <React.Fragment key={i}>
              <span>{m}</span>
              {i < meta.length - 1 && <span className="sep"></span>}
            </React.Fragment>
          ))}
        </div>
        <h4>{title}<span className="lime">{titleAccent}</span></h4>
        <p className="note">{note}</p>
        <div className="mechanic">
          <span className="h">Mechanic</span>
          {mechanic}
        </div>
      </div>
    </article>
  );
}

function Trends() {
  const ref = useReveal();
  const [iv, inView] = useInView(0.2);

  const regions = [
    { name: 'LATAM', pct: 84 },
    { name: 'APAC', pct: 76 },
    { name: 'Europe', pct: 58 },
    { name: 'North America', pct: 71 },
    { name: 'Australia', pct: 79 },
  ];

  return (
    <section className="section" id="trends" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-stack">
            <span className="section-eyebrow"><span className="square"></span>Viral Music Trends · Field Notes</span>
            <h2 className="section-title">How songs <span className="accent">actually</span> travel now.</h2>
          </div>
          <p className="section-subtitle">Music spreads most effectively when it becomes a format for participation, not just audio. Below: the snapshot dashboard, followed by four moments I keep coming back to — with the clip itself.</p>
        </div>

        {/* dashboard */}
        <div className="trends-grid reveal" ref={iv}>
          <div className="trend-card t-big">
            <div className="kicker">— The Snippet Economy</div>
            <h3>The 14-second chorus is now <span className="lime">the entire campaign.</span></h3>
            <p className="blurb">
              The audio snippet — not the full track, not the music video — is the single
              highest-correlation signal I see for week-one streaming behaviour. The rollout
              now starts with <em>snippet, hook, full track</em> as three discrete assets,
              each with its own creator seeding plan.
            </p>
            <div className="region-list">
              {regions.map((r, i) => (
                <div key={r.name} className="region-row">
                  <span className="name">{r.name}</span>
                  <div className="bar-bg">
                    <div
                      className="bar-fill"
                      style={{ width: inView ? `${r.pct}%` : '0%', transitionDelay: `${0.2 + i * 0.1}s` }}
                    />
                  </div>
                  <span className="v">{r.pct}%</span>
                </div>
              ))}
            </div>
            <div style={{fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em'}}>% of recent campaigns where snippet-first creator seeding drove the streaming lift · per region</div>
          </div>

          <div className="trend-card">
            <div className="kicker">— Cross-platform participation</div>
            <h4>TikTok is no longer the only feed.</h4>
            <p className="blurb" style={{marginBottom: 16}}>Where the participation mechanics tend to land, observed across recent rollouts.</p>
            <div className="platform-grid">
              <div className="platform-tile">
                <div className="p-name">TikTok</div>
                <div className="p-val">Primary <span className="p-trend">snippet seed</span></div>
              </div>
              <div className="platform-tile">
                <div className="p-name">Reels</div>
                <div className="p-val">Secondary <span className="p-trend">scale</span></div>
              </div>
              <div className="platform-tile">
                <div className="p-name">Shorts</div>
                <div className="p-val">Catalog <span className="p-trend">discovery</span></div>
              </div>
              <div className="platform-tile" style={{background: 'rgba(197,216,63,0.08)', borderColor: 'rgba(197,216,63,0.25)'}}>
                <div className="p-name" style={{color: 'var(--gfc-lime)'}}>Editorial DSPs</div>
                <div className="p-val" style={{color: 'var(--gfc-lime)'}}>Lagging signal</div>
              </div>
            </div>
          </div>

          <div className="trend-card t-lime">
            <div className="kicker">— Editorial Half-life</div>
            <div className="num">72<span className="unit">h</span></div>
            <h4 style={{marginTop: 12}}>The window for an editorial flip is now three days.</h4>
            <p className="blurb">From DSP add to chart-relevant stream count, the playlist pitch, press hit, and creator wave all live inside one 72-hour block.</p>
          </div>

          <div className="trend-card">
            <div className="kicker">— Cross-language lift</div>
            <h4>Bilingual snippets out-perform English-only in <span style={{color: 'var(--gfc-lime)'}}>non-English markets.</span></h4>
            <p className="blurb">A pattern observed across Mexican, Korean, and Brazilian rollouts. The chorus hook is the lift; the verse language is the permission slip.</p>
            <div style={{marginTop: 20, display: 'flex', gap: 6}}>
              {[40, 65, 35, 80, 55, 95, 70].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 60,
                    background: i % 2 === 0 ? 'var(--gfc-lime)' : 'rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    transform: inView ? `scaleY(${h/100})` : 'scaleY(0.1)',
                    transformOrigin: 'bottom',
                    transition: `transform 1.2s var(--ease-out) ${0.3 + i * 0.08}s`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="trend-card">
            <div className="kicker">— What I'm watching</div>
            <h4>Three signals for the next twelve months.</h4>
            <ul style={{padding: 0, listStyle: 'none', margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 12}}>
              {[
                { n: '01', t: 'Producer-led TikTok accounts overtaking artist accounts on snippet seeding.' },
                { n: '02', t: 'K-pop debut groups skipping the title-track strategy entirely.' },
                { n: '03', t: 'Spanish-language remixes as the new "feature track" economy.' },
              ].map((it) => (
                <li key={it.n} style={{display: 'flex', gap: 14, alignItems: 'flex-start'}}>
                  <span style={{fontFamily: 'var(--font-title)', fontSize: 14, fontWeight: 800, color: 'var(--gfc-lime)', minWidth: 24}}>{it.n}</span>
                  <span style={{fontSize: 13, color: 'var(--text-near-white)', lineHeight: 1.5}}>{it.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video spotlights */}
        <div className="spotlight-head reveal">
          <div>
            <span className="section-eyebrow"><span className="square"></span>The moments themselves</span>
            <h3>Four clips, four <span className="lime">mechanics.</span></h3>
          </div>
          <p className="helper">Each video shows a single participation mechanic at work. Hover to focus, click to pause — notes describe the move underneath.</p>
        </div>

        <div className="spotlight-grid">
          <VideoSpotlight
            vid="assets/video-jonas-cortis.mp4"
            vidId="vidJonas"
            portrait
            badgeLime="Co-sign"
            badgeText="Jonas Brothers × Cortis"
            meta={['Cortis · "REDRED"', 'Geffen', 'Intergenerational']}
            title="Jonas Brothers dancing to "
            titleAccent='Cortis "REDRED".'
            note="A legacy pop act publicly takes on a K-pop debut group's choreography — and it reads as recommendation, not promotion. The casual framing matters: it's a co-sign that drops the artists into the same room, not the same campaign."
            mechanic="Legacy artist endorsement through casual content. Intergenerational trust transfer that feels like a friend showing you something, rather than a label putting it in front of you."
          />

          <VideoSpotlight
            vid="assets/video-hot2go.mp4"
            vidId="vidHot2go"
            portrait
            badgeLime="Participation"
            badgeText="Chappell Roan · HOT TO GO!"
            meta={['Chappell Roan', 'Island Records', 'Choreography-led']}
            title="The crowd is the song. "
            titleAccent='"HOT TO GO!".'
            note="The choreography is baked into the track itself — Y, M, C, A re-spelled for a new generation. The dance becomes the ticket, the camp aesthetic gives audiences permission, and replication does the rest. The campaign isn't outside the room; it's the room itself."
            mechanic="Built-in choreography turns the song into a participation format. Camp aesthetics give a broad audience permission to take part — the move is the marketing."
          />

          <VideoSpotlight
            vid="assets/video-bad-bunny.mp4"
            vidId="vidBadBunny"
            portrait
            badgeLime="Cultural permission"
            badgeText="Bad Bunny · Live"
            meta={['Bad Bunny', 'Rimas · Republic', 'Concert moment']}
            title="A live moment that "
            titleAccent='reads on every feed.'
            note="The clip lives twice — once in the room, and again as a shareable, format-friendly memory for the algorithm. Bad Bunny's live presence is unusually portable: the energy compresses cleanly into a vertical 15-second segment, which is its own form of participation."
            mechanic="Live-as-content. A live performance designed (or readable) as a vertical clip, where the energy survives the compression and the algorithm carries it across non-music feeds."
          />

          <VideoSpotlight
            vid="assets/video-katseye.mp4"
            vidId="vidKatseye"
            portrait
            badgeLime="Place"
            badgeText="KATSEYE · Luna Park"
            meta={['KATSEYE', 'Geffen · HYBE', 'Sydney activation']}
            title="Luna Park does the "
            titleAccent="introduction."
            note="The activation is built on a Sydney cultural landmark, so the introduction work is already half-done. Audiences arrive with familiarity — to the place, the silhouette, the nostalgia — and the artists land inside an environment that's already trusted. The Q&A becomes content; the location does the explaining."
            mechanic="Place-as-positioning. A trusted cultural landmark frames the artist into existing local memory; the marketing is the room they walked into."
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Mock Ideas
   ============================================================ */
function Mocks() {
  const ref = useReveal();
  return (
    <section className="section" id="mocks" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div className="section-head-stack">
            <span className="section-eyebrow"><span className="square"></span>Mock Strategy Ideas</span>
            <h2 className="section-title">Three campaigns I'd love to <span className="accent">actually run.</span></h2>
          </div>
          <p className="section-subtitle">Speculative work — built on the same principles: start with community, release multiple directions early, treat creators as distribution, and design for participation over passive viewing.</p>
        </div>

        <div className="mock-list">

          {/* MOCK 1 — CORTIS */}
          <article className="mock-card reveal">
            <div className="visual">
              <span className="index">01</span>
              <span className="tag">Australian Market Entry</span>
              <ImgSlot id="mockCortis" placeholder="Drop in: Cortis visual, Australian landmark, or mood reference" />
            </div>
            <div className="body">
              <div className="meta-row">
                <span>Cortis</span>
                <span className="sep"></span>
                <span className="concept">Concept · "Familiarity through culture"</span>
              </div>
              <h3>Introduce Cortis to Australia by <span className="lime">embedding them inside existing cultural touchpoints</span> — not formal promotion.</h3>

              <div className="exec-grid">
                <div className="exec-item"><span className="h">Execution · 01</span><span className="t">Short-form cover or remix of a well-known Australian pop track (e.g. 5SOS "She Looks So Perfect").</span></div>
                <div className="exec-item"><span className="h">Execution · 02</span><span className="t">Casual TikTok-style vlog at a recognisable Sydney location (e.g. Luna Park).</span></div>
                <div className="exec-item"><span className="h">Execution · 03</span><span className="t">Reactive content using existing viral audio or local trends.</span></div>
                <div className="exec-item"><span className="h">Execution · 04</span><span className="t">Collab-style TikToks with Australian artists or creators in natural, non-promotional settings.</span></div>
              </div>

              <div className="why">
                <span className="h">Why it works</span>
                <span className="t">Uses familiarity to reduce the "foreign artist" barrier, makes discovery feel organic rather than planned, and builds early emotional recognition through culture — not marketing.</span>
              </div>
            </div>
          </article>

          {/* MOCK 2 — RUEL */}
          <article className="mock-card reveal">
            <div className="visual">
              <span className="index">02</span>
              <span className="tag">Album Rollout System</span>
              <ImgSlot id="mockRuel" placeholder="Drop in: Ruel visual, PR object reference, or intimate-photo mood" />
            </div>
            <div className="body">
              <div className="meta-row">
                <span>Ruel</span>
                <span className="sep"></span>
                <span className="concept">Concept · "Private access as marketing"</span>
              </div>
              <h3>A rollout built around <span className="lime">controlled intimacy</span> and creator-led discovery.</h3>

              <div className="exec-grid">
                <div className="exec-item"><span className="h">Execution · 01</span><span className="t">Instagram Close Friends list used as a soft "inner circle" for early snippets.</span></div>
                <div className="exec-item"><span className="h">Execution · 02</span><span className="t">Short voice memos or raw vocal previews released before any polished asset.</span></div>
                <div className="exec-item"><span className="h">Execution · 03</span><span className="t">Fan accounts organically repost screen recordings and reactions, becoming distribution.</span></div>
                <div className="exec-item"><span className="h">Execution · 04</span><span className="t">Selected creators receive minimal-branding physical PR — emotionally driven objects (phone charms, wearable pieces).</span></div>
                <div className="exec-item" style={{gridColumn: 'span 2'}}><span className="h">Execution · 05</span><span className="t">Unboxing content becomes part of the rollout storytelling itself.</span></div>
              </div>

              <div className="why">
                <span className="h">Why it works</span>
                <span className="t">Feels exclusive without being inaccessible, encourages fan-led distribution (where leaks become intentional marketing moments), and turns physical PR into a content-creation trigger.</span>
              </div>
            </div>
          </article>

          {/* MOCK 3 — Fan Feedback Loop */}
          <article className="mock-card reveal">
            <div className="visual">
              <span className="index">03</span>
              <span className="tag">Real-time Adaptive Rollout</span>
              <ImgSlot id="mockLoop" placeholder="Drop in: abstract / dashboard / fan reaction visual" />
            </div>
            <div className="body">
              <div className="meta-row">
                <span>System</span>
                <span className="sep"></span>
                <span className="concept">Concept · "The fan feedback loop"</span>
              </div>
              <h3>A campaign that <span className="lime">listens before it scales</span> — fan behaviour shapes direction in real time.</h3>

              <div className="stage-flow">
                <div className="stage-card">
                  <span className="n">STAGE 01</span>
                  <span className="h">Multi-snippet seeding</span>
                  <span className="t">Release 3–5 contrasting song snippets, each framed with different moods and visuals.</span>
                </div>
                <div className="stage-card">
                  <span className="n">STAGE 02</span>
                  <span className="h">Creator observation</span>
                  <span className="t">Micro-creators get early access via Close Friends or private links. No briefing — only freedom to react.</span>
                </div>
                <div className="stage-card">
                  <span className="n">STAGE 03</span>
                  <span className="h">Behaviour tracking</span>
                  <span className="t">Monitor audio usage, organic vs forced adoption, dominant emotional response, and the visual styles fans replicate.</span>
                </div>
                <div className="stage-card">
                  <span className="n">STAGE 04</span>
                  <span className="h">Adaptive rollout</span>
                  <span className="t">Most-engaged snippet becomes lead single. Fan-made aesthetics inform official visual direction. Organic creator formats get scaled by label teams.</span>
                </div>
              </div>

              <div className="why">
                <span className="h">Why it works · core principle</span>
                <span className="t" style={{fontFamily: 'var(--font-title)', fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-primary)'}}>
                  Don't predict what will work. Watch what people <em style={{color: 'var(--gfc-lime)', fontStyle: 'italic', fontWeight: 500}}>already choose</em>, then scale it.
                </span>
              </div>
            </div>
          </article>

        </div>

        {/* KPI */}
        <div className="kpi-block reveal">
          <div className="head">
            <div>
              <span className="section-eyebrow"><span className="square"></span>Measurement Framework</span>
              <h3>The KPIs I'd actually watch.</h3>
            </div>
            <p>Success isn't reach — it's <em>repeated, voluntary participation</em> — across three signal layers.</p>
          </div>
          <div className="kpi-grid">
            <div className="kpi-col">
              <span className="h">Engagement signals</span>
              <ul>
                <li>TikTok audio usage rate (organic vs seeded).</li>
                <li>Creator participation volume.</li>
                <li>Save / share ratios across Reels and Shorts.</li>
                <li>Comment sentiment themes — identity, humour, relatability.</li>
              </ul>
            </div>
            <div className="kpi-col">
              <span className="h">Community signals</span>
              <ul>
                <li>Growth in fan account activity.</li>
                <li>UGC volume using unofficial snippets.</li>
                <li>Close Friends / private content engagement rate.</li>
                <li>Discord / community platform interaction levels.</li>
              </ul>
            </div>
            <div className="kpi-col">
              <span className="h">Conversion signals</span>
              <ul>
                <li>Pre-save conversion from TikTok exposure.</li>
                <li>Spike timing correlation between trend and streaming lift.</li>
                <li>Repeat audio usage across multiple creators.</li>
                <li>Editorial DSP adds following organic momentum.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA + Footer
   ============================================================ */
function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div>
            <h2>Working on something <em>international?</em> Let's compare notes.</h2>
            <p>Open to roles, contracts, and conversations across artist marketing, social strategy, and cultural research.</p>
          </div>
          <div className="actions">
            <button className="btn-dark-cta">
              <span>Start a conversation</span>
              <span className="arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
              </span>
            </button>
            <span className="small-note">— Replies within 48 hours · Sydney</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-brand">
              <span className="mark">M</span>
              <div className="stack">
                <span>Mariam Kirakosyan</span>
                <span className="role">Artist Marketing · Portfolio</span>
              </div>
            </div>
            <p>A working portfolio of observations on international artist marketing, social media strategy, and fan culture. Australia · 2026.</p>
          </div>
          <div>
            <h5>Sections</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#artists">UMG Artists</a></li>
              <li><a href="#cases">Case Studies</a></li>
              <li><a href="#trends">Viral Trends</a></li>
              <li><a href="#mocks">Mock Ideas</a></li>
            </ul>
          </div>
          <div>
            <h5>Topics</h5>
            <ul>
              <li><a>Fan culture</a></li>
              <li><a>Cultural translation</a></li>
              <li><a>Participation mechanics</a></li>
              <li><a>Community design</a></li>
            </ul>
          </div>
          <div>
            <h5>Elsewhere</h5>
            <ul>
              <li><a>Email →</a></li>
              <li><a>LinkedIn →</a></li>
              <li><a>Instagram →</a></li>
              <li><a>Letterboxd →</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Mariam Kirakosyan · Portfolio. Observations only — not affiliated with UMG.</span>
          <span>Sydney · 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   App
   ============================================================ */
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Artists />
      <Cases />
      <Trends />
      <Mocks />
      <CTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
