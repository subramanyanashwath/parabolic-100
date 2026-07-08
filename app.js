/* Parabolic 100 — app
   Hash-routed SPA over the problem bank in problems-*.js.
   State is localStorage-only: attempts, review scheduling, drafts, notes. */

(function () {
  "use strict";

  const META = P100.META;
  const PROBLEMS = P100.PROBLEMS.slice().sort((a, b) => a.id.localeCompare(b.id));
  const byId = {};
  PROBLEMS.forEach(p => { byId[p.id] = p; });

  const PATTERNS = P100.PATTERNS;
  const TIERS = P100.TIERS;
  const patternById = {};
  PATTERNS.forEach(pt => { patternById[pt.id] = pt; });
  PROBLEMS.forEach(p => { p.patterns = P100.PATTERN_TAGS[p.id] || []; });
  const problemsForPattern = ptId => PROBLEMS.filter(p => p.patterns.includes(ptId));

  const LS_KEY = "p100.state.v2";
  const DAY = 24 * 60 * 60 * 1000;
  const INTERVALS = [1, 3, 7, 14, 30]; // days, advanced on strong reps

  const ROLE_NOTES = {
    "CAPE SCPM": "Copilot agents, enterprise adoption, deployment motion",
    "OpenAI FDE": "Discovery-to-rollout loop inside customer environments",
    "OpenAI Deployment Eng": "Making model deployments land in production",
    "OpenAI DPM (Codex)": "Deployed-product feedback and value loops",
    "Anthropic TPM Cloud Inference": "Capacity, launches, partner cloud surfaces",
    "Anthropic TPM Inference Perf": "Latency, efficiency, serving performance",
    "Anthropic TPM Safeguards & Evals": "Safety gates and eval infrastructure",
    "Anthropic TPM API Platform": "Enterprise API adoption and platform gaps",
    "Anthropic TPM Apps Platform": "Agent surfaces, extensibility, governance",
    "MSFT MAI Evals Eng": "Frontier eval infrastructure inside Microsoft AI",
    "MSFT MAI Strategy & Ops": "Program, capacity, and strategy at MAI scale",
  };

  const AUTO_CHECKS = [
    { key: "category", label: "Category" },
    { key: "pattern", label: "Pattern" },
    { key: "primaryLens", label: "Primary lens" },
    { key: "secondaryLens", label: "Secondary lens" },
    { key: "archetype", label: "Primary archetype" },
    { key: "secondaryArchetype", label: "Secondary archetype" },
  ];

  /* ---------------- state ---------------- */

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        return {
          attempts: s.attempts || {},
          meta: s.meta || {},
          drafts: s.drafts || {},
          notes: s.notes || {},
          lastVisited: s.lastVisited || null,
        };
      }
    } catch (e) { /* corrupted state falls through to fresh */ }
    return { attempts: {}, meta: {}, drafts: {}, notes: {}, lastVisited: null };
  }

  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); }
    catch (e) { toast("Could not persist to localStorage"); }
  }

  const attemptsFor = pid => state.attempts[pid] || [];
  const lastAttempt = pid => attemptsFor(pid)[attemptsFor(pid).length - 1] || null;
  const bestScore = pid => attemptsFor(pid).reduce((m, a) => Math.max(m, a.score), 0);
  const metaFor = pid => state.meta[pid] || {};

  function statusOf(pid) {
    const n = attemptsFor(pid).length;
    if (!n) return "unsolved";
    const best = bestScore(pid);
    if (best >= 90 && n >= 2) return "mastered";
    if (best >= 70) return "solved";
    return "attempted";
  }

  const STATUS_LABEL = { unsolved: "Unsolved", attempted: "Attempted", solved: "Solved", mastered: "Mastered" };

  function draftFor(pid) {
    if (!state.drafts[pid]) {
      state.drafts[pid] = { answers: {}, predicted: 60, revealed: false, rubric: {}, edge: null };
    }
    return state.drafts[pid];
  }

  /* ---------------- time helpers ---------------- */

  const startOfDay = ts => { const d = new Date(ts); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const today = () => startOfDay(Date.now());

  function fmtDate(ts) {
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
  function fmtWhen(ts) {
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" }) + " · " +
      new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  function fmtDue(next) {
    if (next == null) return { text: "—", cls: "" };
    const days = Math.round((startOfDay(next) - today()) / DAY);
    if (days < 0) return { text: Math.abs(days) + "d overdue", cls: "overdue" };
    if (days === 0) return { text: "due today", cls: "today" };
    if (days === 1) return { text: "tomorrow", cls: "" };
    return { text: "in " + days + "d", cls: "" };
  }

  /* ---------------- scoring ---------------- */

  function autoScore(p, answers) {
    const detail = AUTO_CHECKS.map(c => {
      let want = p[c.key] || null;
      if (c.key === "pattern") want = p.patterns[0] ? patternById[p.patterns[0]].name : null;
      const got = (answers[c.key] || "").trim() || null;
      let credit = 0;
      if (c.key === "pattern") {
        const secondaries = p.patterns.slice(1).map(id => patternById[id].name);
        if (got && got === want) credit = 1;
        else if (got && secondaries.includes(got)) credit = 0.5; // a pattern this problem trains, but not the primary
      } else if (c.key === "secondaryLens" || c.key === "primaryLens") {
        const other = c.key === "primaryLens" ? p.secondaryLens : p.primaryLens;
        if (got && got === want) credit = 1;
        else if (got && got === other) credit = 0.5; // right lens, wrong slot
      } else if (c.key === "archetype" || c.key === "secondaryArchetype") {
        const other = c.key === "archetype" ? p.secondaryArchetype : p.archetype;
        if (!want && !got) credit = 1;               // correctly declined a secondary
        else if (!want && got) credit = 0.5;          // over-added a secondary
        else if (got && got === want) credit = 1;
        else if (got && got === other) credit = 0.5;  // right archetype, wrong slot
      } else {
        if (got && got === want) credit = 1;
      }
      return { key: c.key, label: c.label, got, want, credit };
    });
    const points = detail.reduce((s, d) => s + d.credit, 0);
    return { points, max: AUTO_CHECKS.length, detail };
  }

  function computeScore(auto, rubric) {
    const rubricPts = META.rubricDims.reduce((s, d) => s + (rubric[d.key] || 0), 0);
    const max = auto.max + META.rubricDims.length * 3; // 5 + 18 = 23
    return Math.round(((auto.points + rubricPts) / max) * 100);
  }

  function scheduleReview(pid, score) {
    const m = state.meta[pid] || {};
    const prev = typeof m.reviewIdx === "number" ? m.reviewIdx : -1;
    let idx;
    if (score >= 85) idx = Math.min(prev + 1, INTERVALS.length - 1);
    else if (score >= 70) idx = Math.max(prev, 0);
    else idx = 0;
    m.reviewIdx = idx;
    m.nextReview = today() + INTERVALS[idx] * DAY;
    state.meta[pid] = m;
  }

  /* ---------------- aggregate metrics ---------------- */

  function allAttempts() {
    const out = [];
    Object.keys(state.attempts).forEach(pid => {
      state.attempts[pid].forEach(a => out.push(Object.assign({ pid }, a)));
    });
    return out.sort((a, b) => a.ts - b.ts);
  }

  function avgBestOver(pids) {
    const attempted = pids.filter(id => attemptsFor(id).length);
    if (!attempted.length) return null;
    return attempted.reduce((s, id) => s + bestScore(id), 0) / attempted.length;
  }

  function readiness(pids) {
    // avg best × sqrt(coverage): quality discounted by how much of the surface you've touched
    const attempted = pids.filter(id => attemptsFor(id).length);
    if (!attempted.length) return null;
    const avg = attempted.reduce((s, id) => s + bestScore(id), 0) / attempted.length;
    return Math.round(avg * Math.sqrt(attempted.length / pids.length));
  }

  function dimAvg(key) {
    const atts = allAttempts().filter(a => a.rubric && a.rubric[key] != null);
    if (!atts.length) return null;
    return atts.reduce((s, a) => s + a.rubric[key], 0) / atts.length; // 0..3
  }

  /* Pattern mastery: proven = you've held ≥85 avg-best across at least two of
     the pattern's problems (or all of them, if fewer exist yet). Skill, not hours. */
  function patternStatus(ptId) {
    const probs = problemsForPattern(ptId);
    const attempted = probs.filter(p => attemptsFor(p.id).length);
    if (!attempted.length) return { status: "untrained", score: null, attempted: 0, total: probs.length };
    const avg = Math.round(attempted.reduce((s, p) => s + bestScore(p.id), 0) / attempted.length);
    const need = Math.min(2, probs.length);
    const proven = attempted.length >= need && avg >= 85;
    return { status: proven ? "proven" : "training", score: avg, attempted: attempted.length, total: probs.length };
  }

  function metrics() {
    const atts = allAttempts();
    const capeIds = PROBLEMS.filter(p => p.targetRoles.includes("CAPE SCPM")).map(p => p.id);
    const frontierIds = PROBLEMS.filter(p => p.targetRoles.some(r => r !== "CAPE SCPM")).map(p => p.id);

    const cape = readiness(capeIds);
    const frontierBase = readiness(frontierIds);
    const transferDim = dimAvg("transfer");
    const frontier = frontierBase == null ? null :
      Math.round(frontierBase * 0.7 + (transferDim != null ? (transferDim / 3) * 100 : frontierBase) * 0.3);

    const synthDim = dimAvg("synthesis");
    const synthesis = synthDim == null ? null : Math.round((synthDim / 3) * 100);

    const archAtts = atts.filter(a => a.auto && a.auto.detail);
    const archetypeFit = archAtts.length ? Math.round(
      archAtts.reduce((s, a) => s + (a.auto.detail.find(d => d.key === "archetype") || { credit: 0 }).credit, 0) / archAtts.length * 100
    ) : null;

    const edgeAtts = atts.filter(a => typeof a.edge === "number");
    const modelEdge = edgeAtts.length ? Math.round(50 + edgeAtts.reduce((s, a) => s + a.edge, 0) / edgeAtts.length * 50) : null;

    const calAtts = atts.filter(a => typeof a.predicted === "number");
    const calibration = calAtts.length ? Math.max(0, Math.round(
      100 - 2 * (calAtts.reduce((s, a) => s + Math.abs(a.predicted - a.score), 0) / calAtts.length)
    )) : null;

    const solved = PROBLEMS.filter(p => ["solved", "mastered"].includes(statusOf(p.id))).length;
    const mastered = PROBLEMS.filter(p => statusOf(p.id) === "mastered").length;
    const attemptedCount = PROBLEMS.filter(p => attemptsFor(p.id).length).length;
    const avgBest = avgBestOver(PROBLEMS.map(p => p.id));

    const patternsProven = PATTERNS.filter(pt => patternStatus(pt.id).status === "proven").length;
    const patternsTraining = PATTERNS.filter(pt => patternStatus(pt.id).status === "training").length;

    const dueToday = PROBLEMS.filter(p => {
      const m = metaFor(p.id);
      return m.nextReview != null && startOfDay(m.nextReview) <= today();
    }).length;

    return { cape, frontier, synthesis, archetypeFit, modelEdge, calibration,
      patternsProven, patternsTraining,
      solved, mastered, attemptedCount, avgBest, dueToday, attempts: atts.length };
  }

  /* ---------------- utils ---------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  const paras = s => String(s).split(/\n\n+/).map(t => `<p>${esc(t)}</p>`).join("");

  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  const lensName = id => { const l = META.lenses.find(x => x.id === id); return l ? l.full : id; };

  function statusDot(pid) {
    const st = statusOf(pid);
    return `<i class="dot ${st}" title="${STATUS_LABEL[st]}"></i>`;
  }

  /* ---------------- router ---------------- */

  const app = () => document.getElementById("app");

  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const parts = h.split("/").filter(Boolean);
    if (!parts.length) return { view: "landing" };
    if (parts[0] === "bank") return { view: "bank" };
    if (parts[0] === "problem" && byId[parts[1]]) return { view: "rep", pid: parts[1] };
    if (parts[0] === "patterns") return { view: "patterns" };
    if (parts[0] === "pattern" && patternById[parts[1]]) return { view: "patternDetail", ptId: parts[1] };
    if (parts[0] === "review") return { view: "review" };
    if (parts[0] === "progress") return { view: "progress" };
    return { view: "landing" };
  }

  function render() {
    const r = route();
    if (r.view === "landing") app().innerHTML = landingView();
    else app().innerHTML = shell(r, r.view === "bank" ? bankView()
      : r.view === "rep" ? repView(r.pid)
      : r.view === "patterns" ? patternsView()
      : r.view === "patternDetail" ? patternDetailView(r.ptId)
      : r.view === "review" ? reviewView()
      : progressView());
    if (r.view === "rep") { state.lastVisited = r.pid; save(); }
    window.scrollTo(0, 0);
  }

  /* ---------------- shell ---------------- */

  function shell(r, content) {
    const m = metrics();
    const nav = [
      ["bank", "Problem Bank", PROBLEMS.length],
      ["patterns", "Patterns", `${m.patternsProven}/${PATTERNS.length}`],
      ["review", "Review Queue", m.dueToday || ""],
      ["progress", "Progress", ""],
    ];
    return `
    <div class="shell">
      <aside class="sidebar">
        <a class="logo on-dark" href="#/"><span class="mark">P1</span>Parabolic 100</a>
        <nav class="side-nav">
          ${nav.map(([k, label, count]) => `
            <a href="#/${k}" class="${r.view === k || (k === "bank" && r.view === "rep") || (k === "patterns" && r.view === "patternDetail") ? "active" : ""}">
              ${label}${count !== "" ? `<span class="count">${count}</span>` : ""}
            </a>`).join("")}
        </nav>
        <div class="side-card">
          <div class="row"><span>Patterns proven</span><strong>${m.patternsProven} / ${PATTERNS.length}</strong></div>
          <div class="row"><span>Solved</span><strong>${m.solved} / ${PROBLEMS.length}</strong></div>
          <div class="row"><span>Due today</span><strong>${m.dueToday}</strong></div>
        </div>
        <div class="side-foot">
          <a href="#/">About Parabolic 100</a>
        </div>
      </aside>
      <main class="main">${content}</main>
    </div>`;
  }

  /* ---------------- landing ---------------- */

  function landingView() {
    const m = metrics();
    const cont = state.lastVisited && byId[state.lastVisited] ? state.lastVisited : null;
    const p1 = byId["001"];
    const catCount = c => PROBLEMS.filter(p => p.category === c).length;

    const previewRows = ["001", "002", "003", "004"].map(id => {
      const p = byId[id];
      return `<div>
        <span>${statusDot(id)} ${esc(p.id)} · ${esc(p.category)}</span>
        <strong>${esc(p.title)}</strong>
      </div>`;
    }).join("");

    return `
    <div class="site">
      <nav class="site-nav">
        <a class="logo" href="#/"><span class="mark">P1</span>Parabolic 100</a>
        <div class="links">
          <a href="#/bank">Problem Bank</a>
          <a href="#/patterns">Patterns</a>
          <a href="#/review">Review Queue</a>
          <a href="#/progress">Progress</a>
        </div>
        <span class="spacer"></span>
        <a class="btn btn-outline btn-sm" href="#/${cont ? "problem/" + cont : "problem/001"}">${cont ? "Continue " + cont : "Start 001"}</a>
      </nav>

      <header class="hero">
        <div>
          <p class="eyebrow">Deployment judgment gym</p>
          <h1>Parabolic 100</h1>
          <p class="subhead">The deployment judgment gym for enterprise AI excellence and frontier-scale readiness.</p>
          <p class="lede">
            One hundred canonical AI deployment situations trained the way NeetCode trains algorithms:
            every problem drills a named judgment pattern — the sliding windows of deployment work.
            Classify the bottleneck, name the pattern, choose the operating archetype, commit to a move
            in writing, then get scored against a model answer and an adversarial critique. Misses come
            back on a schedule until the pattern is proven, not just remembered.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-lg" href="#/problem/001">Start Problem 001</a>
            <a class="btn btn-outline btn-lg" href="#/bank">View Problem Bank</a>
          </div>
          <div class="hero-stats">
            <div><span>Problems live</span><strong>${PROBLEMS.length} / 100</strong></div>
            <div><span>Categories</span><strong>9</strong></div>
            <div><span>Judgment patterns</span><strong>${PATTERNS.length}</strong></div>
            <div><span>Patterns proven</span><strong>${m.patternsProven}</strong></div>
          </div>
        </div>

        <div class="pwindow" aria-label="Product preview">
          <div class="bar"><i></i><i></i><i></i><span>parabolic-100 — rep 001</span></div>
          <div class="body">
            <div class="mini-side">
              <b>P100</b>
              <span class="on">Problem Bank</span>
              <span>Review Queue</span>
              <span>Progress</span>
            </div>
            <div class="mini-main">
              <div class="mini-head">
                <strong>${esc(p1.title)}</strong>
                <em class="diff-${p1.difficulty}">${p1.difficulty}</em>
              </div>
              <div class="mini-prompt">
                ${esc(p1.prompt.slice(0, 150))}…
                <div class="mini-tags">
                  <span class="pill solid">${esc(p1.primaryLens)}</span>
                  <span class="pill solid">${esc(p1.secondaryLens)}</span>
                  <span class="pill amber">${esc(p1.archetype)}</span>
                </div>
              </div>
              <div class="mini-grid">${previewRows}</div>
            </div>
          </div>
        </div>
      </header>

      <section class="section">
        <div class="section-head">
          <p class="eyebrow">The loop</p>
          <h2>A rep is ten minutes of forced judgment.</h2>
          <p>No essays. Structured blanks that make vagueness impossible, then immediate comparison against a model answer that argues back.</p>
        </div>
        <div class="grid-4">
          <article class="card loop-card">
            <span class="step">01 — CLASSIFY</span>
            <h3>Name the situation</h3>
            <p>The judgment pattern first — then category, lenses, and the Boris archetype the situation needs. Recognition is the trained skill.</p>
          </article>
          <article class="card loop-card">
            <span class="step">02 — COMMIT</span>
            <h3>Write the call</h3>
            <p>Bottleneck, failure mode, next move, first metric, owner, falsifier — plus the 20-second exec answer and the frontier-lab translation.</p>
          </article>
          <article class="card loop-card">
            <span class="step">03 — COMPARE</span>
            <h3>Get argued with</h3>
            <p>Model answer, six-dimension rubric, an adversarial critique of the tempting wrong answers, and a calibration check on your predicted score.</p>
          </article>
          <article class="card loop-card">
            <span class="step">04 — SCHEDULE</span>
            <h3>Miss it again later</h3>
            <p>Spaced repetition: weak reps come back in a day, strong ones in a month. Mastery means scoring 90+ twice, not remembering once.</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <p class="eyebrow">Transfer surfaces</p>
          <h2>One problem bank. Three payoffs.</h2>
          <p>Every rep is written to make Monday in the enterprise seat better and to compound toward frontier-scale judgment. Role tags are lenses on where each skill transfers — a taxonomy, not a job-search list.</p>
        </div>
        <div class="grid-3">
          <article class="card surface-card">
            <span class="eyebrow">Enterprise execution</span>
            <h3>Customer deployment judgment</h3>
            <p>Scenario discovery, agent architecture, governance, enterprise rollout, and the product feedback loop — the daily judgment calls of an enterprise AI deployment seat, drilled until they're reflexes.</p>
            <div class="roles">
              <span class="pill solid">agents</span><span class="pill solid">governance</span>
              <span class="pill solid">rollouts</span><span class="pill solid">evals</span>
            </div>
          </article>
          <article class="card surface-card">
            <span class="eyebrow">Frontier-lab readiness</span>
            <h3>The judgment labs hire for</h3>
            <p>Every problem carries a frontier translation: how the same situation shows up inside a frontier lab — launch gates, capacity allocation, evals infrastructure, platform strategy.</p>
            <div class="roles">
              <span class="pill solid">deployment</span><span class="pill solid">evals infra</span>
              <span class="pill solid">launch readiness</span>
            </div>
          </article>
          <article class="card surface-card">
            <span class="eyebrow">Gnomon calibration</span>
            <h3>Judgment you can measure</h3>
            <p>Predict your score before each reveal; the gap is tracked as calibration quality. Market and capital reps force falsifiable positions with dates, not vibes.</p>
            <div class="roles">
              <span class="pill solid">calibration</span><span class="pill solid">falsifiers</span>
              <span class="pill solid">model edge</span>
            </div>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <p class="eyebrow">The pattern map</p>
          <h2>Eighteen moves. Four tiers.</h2>
          <p>The roadmap layer: named, reusable judgment moves extracted from real deployment situations. Learn the move once, recognize it everywhere — in the field, and in the interview.</p>
        </div>
        <div class="card tier-map">
          ${TIERS.map(t => `
            <div class="tier-map-row">
              <b>T${t.n} · ${esc(t.name)}</b>
              <div>${PATTERNS.filter(pt => pt.tier === t.n).map(pt => `<a class="pill" href="#/pattern/${pt.id}">${esc(pt.name)}</a>`).join("")}</div>
            </div>`).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <p class="eyebrow">The canon</p>
          <h2>${PROBLEMS.length} problems live. Designed as 100.</h2>
          <p>Nine categories mirroring the real distribution of deployment judgment — weighted toward architecture and evals, where most programs die.</p>
        </div>
        <div class="card canon-table">
          <div class="canon-row head"><span>Category</span><span>Live</span><span>Target</span><span></span></div>
          ${META.categories.map(c => `
            <div class="canon-row">
              <strong>${esc(c.name)}</strong>
              <span class="num">${catCount(c.name)}</span>
              <span class="num muted">${c.target}</span>
              <span class="bar"><i style="width:${Math.round(catCount(c.name) / c.target * 100)}%"></i></span>
            </div>`).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <p class="eyebrow">The spine</p>
          <h2>Seven lenses. Five archetypes.</h2>
          <p>Every situation gets read through the lenses that matter and answered in the operating mode it actually needs — the antidote to treating every problem as "build more stuff."</p>
        </div>
        <div class="spine">
          <div class="card spine-card">
            <h3>Lenses — how to read the situation</h3>
            <ul>${META.lenses.map(l => `<li><b>${esc(l.full)}</b><span>${esc(l.q)}</span></li>`).join("")}</ul>
          </div>
          <div class="card spine-card">
            <h3>Archetypes — how to act on it</h3>
            <ul>${META.archetypes.map(a => `<li><b>${esc(a.id)}</b><span>${esc(a.d)}</span></li>`).join("")}</ul>
          </div>
        </div>
      </section>

      <footer class="site-footer">
        <span>Local-first: attempts, scores, and review schedule live in your browser's localStorage. No accounts, no backend.</span>
      </footer>
    </div>`;
  }

  /* ---------------- problem bank ---------------- */

  const bankFilter = { cat: "All", q: "", difficulty: "", lens: "", archetype: "", role: "", status: "", pattern: "" };

  function bankView() {
    const m = metrics();
    const cats = ["All"].concat(META.categories.map(c => c.name));

    let rows = PROBLEMS.filter(p => {
      if (bankFilter.cat !== "All" && p.category !== bankFilter.cat) return false;
      if (bankFilter.difficulty && p.difficulty !== bankFilter.difficulty) return false;
      if (bankFilter.lens && p.primaryLens !== bankFilter.lens && p.secondaryLens !== bankFilter.lens) return false;
      if (bankFilter.archetype && p.archetype !== bankFilter.archetype && p.secondaryArchetype !== bankFilter.archetype) return false;
      if (bankFilter.role && !p.targetRoles.includes(bankFilter.role)) return false;
      if (bankFilter.pattern && !p.patterns.includes(bankFilter.pattern)) return false;
      if (bankFilter.status && statusOf(p.id) !== bankFilter.status) return false;
      if (bankFilter.q) {
        const q = bankFilter.q.toLowerCase();
        const hay = (p.id + " " + p.title + " " + p.tags.join(" ") + " " + p.category).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const hasFilters = bankFilter.q || bankFilter.difficulty || bankFilter.lens || bankFilter.archetype || bankFilter.role || bankFilter.status || bankFilter.pattern || bankFilter.cat !== "All";

    const tableRows = rows.map(p => {
      const best = attemptsFor(p.id).length ? bestScore(p.id) : null;
      const due = fmtDue(metaFor(p.id).nextReview);
      const starOn = metaFor(p.id).star;
      return `
      <tr data-open="${p.id}">
        <td>${statusDot(p.id)}</td>
        <td class="pid">${p.id}</td>
        <td class="ptitle">${esc(p.title)}</td>
        <td>${esc(p.category)}</td>
        <td class="diff-${p.difficulty}">${p.difficulty}</td>
        <td>${esc(p.primaryLens)}${p.secondaryLens ? ` <span class="muted">+ ${esc(p.secondaryLens)}</span>` : ""}</td>
        <td>${esc(p.archetype)}${p.secondaryArchetype ? ` <span class="muted">+ ${esc(p.secondaryArchetype)}</span>` : ""}</td>
        <td>${esc(patternById[p.patterns[0]].name)}${p.patterns.length > 1 ? ` <span class="muted">+${p.patterns.length - 1}</span>` : ""}</td>
        <td class="score">${best == null ? "—" : best}</td>
        <td class="due ${due.cls}">${due.text}</td>
        <td><button class="star ${starOn ? "on" : ""}" data-star="${p.id}" title="Portfolio candidate">${starOn ? "★" : "☆"}</button></td>
      </tr>`;
    }).join("");

    return `
    <div class="view-head">
      <div>
        <p class="eyebrow">Problem Bank</p>
        <h1>The canon, ${PROBLEMS.length} deep</h1>
        <p class="sub">Pick a rep. Ten focused minutes. The table remembers everything.</p>
      </div>
      <div class="actions">
        <a class="btn btn-primary" href="#/${nextUpId() ? "problem/" + nextUpId() : "problem/001"}">Rep next up → ${nextUpId() || "001"}</a>
      </div>
    </div>

    <div class="stats">
      <div class="stat"><span>Solved</span><strong>${m.solved}</strong><em>/ ${PROBLEMS.length}</em></div>
      <div class="stat"><span>Mastered</span><strong>${m.mastered}</strong></div>
      <div class="stat"><span>Attempts</span><strong>${m.attempts}</strong></div>
      <div class="stat"><span>Avg best</span><strong>${m.avgBest == null ? "—" : Math.round(m.avgBest)}</strong></div>
      <div class="stat"><span>Due today</span><strong>${m.dueToday}</strong></div>
      <div class="stat"><span>Patterns</span><strong>${m.patternsProven}</strong><em>/ ${PATTERNS.length}</em></div>
    </div>

    <div class="bank-layout">
      <nav class="cat-nav">
        ${cats.map(c => {
          const n = c === "All" ? PROBLEMS.length : PROBLEMS.filter(p => p.category === c).length;
          const solvedN = (c === "All" ? PROBLEMS : PROBLEMS.filter(p => p.category === c))
            .filter(p => ["solved", "mastered"].includes(statusOf(p.id))).length;
          return `<button data-cat="${esc(c)}" class="${bankFilter.cat === c ? "active" : ""}">
            <span>${esc(c)}</span><span class="n">${solvedN}/${n}</span></button>`;
        }).join("")}
      </nav>

      <div>
        <div class="filters">
          <input class="input search" type="search" placeholder="Search title, tag, id…" value="${esc(bankFilter.q)}" data-filter="q">
          <select class="select" data-filter="difficulty">
            <option value="">Difficulty</option>
            ${["Easy", "Medium", "Hard"].map(d => `<option ${bankFilter.difficulty === d ? "selected" : ""}>${d}</option>`).join("")}
          </select>
          <select class="select" data-filter="lens">
            <option value="">Lens</option>
            ${META.lenses.map(l => `<option value="${l.id}" ${bankFilter.lens === l.id ? "selected" : ""}>${esc(l.full)}</option>`).join("")}
          </select>
          <select class="select" data-filter="archetype">
            <option value="">Archetype</option>
            ${META.archetypes.map(a => `<option ${bankFilter.archetype === a.id ? "selected" : ""}>${a.id}</option>`).join("")}
          </select>
          <select class="select" data-filter="pattern">
            <option value="">Pattern</option>
            ${PATTERNS.map(x => `<option value="${x.id}" ${bankFilter.pattern === x.id ? "selected" : ""}>${esc(x.name)}</option>`).join("")}
          </select>
          <select class="select" data-filter="role">
            <option value="">Role lens</option>
            ${META.roles.map(r => `<option ${bankFilter.role === r ? "selected" : ""}>${esc(r)}</option>`).join("")}
          </select>
          <select class="select" data-filter="status">
            <option value="">Status</option>
            ${Object.keys(STATUS_LABEL).map(s => `<option value="${s}" ${bankFilter.status === s ? "selected" : ""}>${STATUS_LABEL[s]}</option>`).join("")}
          </select>
          ${hasFilters ? `<button class="btn btn-ghost btn-sm" data-action="clear-filters">Clear</button>` : ""}
        </div>

        <div class="card table-card">
          ${rows.length ? `
          <table class="ptable">
            <thead><tr>
              <th></th><th>#</th><th>Problem</th><th>Category</th><th>Diff</th>
              <th>Lens</th><th>Archetype</th><th>Pattern</th><th>Best</th><th>Review</th><th></th>
            </tr></thead>
            <tbody>${tableRows}</tbody>
          </table>` : `
          <div class="empty"><strong>No problems match</strong>Try clearing a filter or two.</div>`}
        </div>
      </div>
    </div>`;
  }

  function nextUpId() {
    // due reviews first (most overdue), then first unsolved in canon order
    const due = PROBLEMS
      .filter(p => metaFor(p.id).nextReview != null && startOfDay(metaFor(p.id).nextReview) <= today())
      .sort((a, b) => metaFor(a.id).nextReview - metaFor(b.id).nextReview);
    if (due.length) return due[0].id;
    const fresh = PROBLEMS.find(p => statusOf(p.id) === "unsolved");
    return fresh ? fresh.id : null;
  }

  /* ---------------- rep page ---------------- */

  const repTabs = {}; // transient: pid -> tab

  function currentTab(pid, unlocked) {
    const t = repTabs[pid] || "prompt";
    if (!unlocked && (t === "review" || t === "synthesis")) return "prompt";
    return t;
  }

  function repView(pid) {
    const p = byId[pid];
    const d = draftFor(pid);
    const atts = attemptsFor(pid);
    const unlocked = d.revealed || atts.length > 0;
    const tab = currentTab(pid, unlocked);
    const st = statusOf(pid);
    const idx = PROBLEMS.findIndex(x => x.id === pid);
    const prev = PROBLEMS[idx - 1], next = PROBLEMS[idx + 1];
    const starOn = metaFor(pid).star;

    const tabs = [
      ["prompt", "Prompt", true],
      ["answer", "Answer", true],
      ["review", "Model Review", unlocked],
      ["synthesis", "Synthesis", unlocked],
      ["history", "History", true],
    ];

    return `
    <div class="rep-top">
      <div class="crumbs">
        <a href="#/bank">Problem Bank</a> <span>/</span>
        <span class="mono">${p.id}</span> <span>/</span>
        <span class="diff-${p.difficulty}">${p.difficulty}</span> <span>/</span>
        <span>${esc(p.category)}</span>
      </div>
      <div class="title-row">
        <h1>${esc(p.title)}</h1>
        <span class="pill ${st === "mastered" ? "dark" : st === "solved" ? "green" : st === "attempted" ? "blue" : ""}">${STATUS_LABEL[st]}</span>
        <button class="star ${starOn ? "on" : ""}" data-star="${p.id}" title="Portfolio candidate">${starOn ? "★" : "☆"}</button>
        <div class="right">
          ${prev ? `<a class="btn btn-outline btn-sm" href="#/problem/${prev.id}">← ${prev.id}</a>` : ""}
          ${next ? `<a class="btn btn-outline btn-sm" href="#/problem/${next.id}">${next.id} →</a>` : ""}
        </div>
      </div>
      <div class="meta-row">
        ${p.targetRoles.map(r => `<span class="pill">${esc(r)}</span>`).join("")}
        ${p.tags.map(t => `<span class="pill solid">${esc(t)}</span>`).join("")}
      </div>
    </div>

    <div class="rep-layout">
      <div class="card tabs-card">
        <div class="tabs">
          ${tabs.map(([k, label, en]) => `
            <button data-tab="${k}" class="${tab === k ? "active" : ""}" ${en ? "" : "disabled"}>
              ${label}${en ? "" : `<span class="lock">🔒</span>`}
            </button>`).join("")}
        </div>
        <div class="tab-body">
          ${tab === "prompt" ? promptTab(p)
            : tab === "answer" ? answerTab(p, d)
            : tab === "review" ? reviewTab(p, d)
            : tab === "synthesis" ? synthesisTab(p)
            : historyTab(p)}
        </div>
      </div>
      ${repRail(p, d)}
    </div>`;
  }

  function promptTab(p) {
    return `
    <p class="prompt-text">${esc(p.prompt)}</p>
    <div class="arc-strip">
      <article><span>Start</span><p>${esc(p.arc.start)}</p></article>
      <article><span>Midpoint</span><p>${esc(p.arc.mid)}</p></article>
      <article><span>Endpoint</span><p>${esc(p.arc.end)}</p></article>
    </div>
    <div class="lens-ref">
      <h3 class="sec-title">The seven lenses <span class="note">pick a primary and secondary in your answer</span></h3>
      <ul>${META.lenses.map(l => `<li><b>${esc(l.full)}</b>${esc(l.q)}</li>`).join("")}</ul>
    </div>
    <div class="answer-foot">
      <span class="note">Read it once, then answer from judgment — the rep trains recall under pressure, not comprehension.</span>
      <button class="btn btn-primary" data-tab="answer">Open Answer →</button>
    </div>`;
  }

  function selectField(label, key, options, current, disabled, allowBlank) {
    return `
    <label class="field">
      <span>${label}</span>
      <select class="select" data-draft-field="${key}" ${disabled ? "disabled" : ""}>
        ${allowBlank ? `<option value="">— none —</option>` : `<option value="" ${current ? "" : "selected"} disabled hidden>Select…</option>`}
        ${options.map(o => `<option value="${esc(o.v)}" ${current === o.v ? "selected" : ""}>${esc(o.t)}</option>`).join("")}
      </select>
    </label>`;
  }

  function answerTab(p, d) {
    const a = d.answers;
    const frozen = d.revealed;
    const catOpts = META.categories.map(c => ({ v: c.name, t: c.name }));
    const lensOpts = META.lenses.map(l => ({ v: l.id, t: l.full }));
    const archOpts = META.archetypes.map(x => ({ v: x.id, t: x.id }));

    const patternSelect = `
      <label class="field">
        <span>Pattern</span>
        <select class="select" data-draft-field="pattern" ${frozen ? "disabled" : ""}>
          <option value="" ${a.pattern ? "" : "selected"} disabled hidden>Select…</option>
          ${TIERS.map(t => `<optgroup label="T${t.n} · ${t.name}">${PATTERNS.filter(x => x.tier === t.n).map(x =>
            `<option ${a.pattern === x.name ? "selected" : ""}>${esc(x.name)}</option>`).join("")}</optgroup>`).join("")}
        </select>
      </label>`;

    const textFields = META.answerFields.map(f => {
      const wide = f.kind === "textarea";
      const val = a[f.key] || "";
      return `
      <label class="field ${wide ? "wide" : ""}">
        <span>${esc(f.label)}</span>
        ${wide
          ? `<textarea class="textarea" rows="2" data-draft-field="${f.key}" placeholder="${esc(f.hint)}" ${frozen ? "disabled" : ""}>${esc(val)}</textarea>`
          : `<input class="input" type="text" data-draft-field="${f.key}" placeholder="${esc(f.hint)}" value="${esc(val)}" ${frozen ? "disabled" : ""}>`}
      </label>`;
    }).join("");

    return `
    <div class="answer-sec">
      <h3 class="sec-title">1 · Classify <span class="note">auto-checked on reveal</span></h3>
      <div class="classify-grid">
        ${selectField("Category", "category", catOpts, a.category, frozen)}
        ${patternSelect}
        ${selectField("Primary lens", "primaryLens", lensOpts, a.primaryLens, frozen)}
        ${selectField("Secondary lens", "secondaryLens", lensOpts, a.secondaryLens, frozen)}
        ${selectField("Primary archetype", "archetype", archOpts, a.archetype, frozen)}
        ${selectField("Secondary archetype", "secondaryArchetype", archOpts, a.secondaryArchetype, frozen, true)}
      </div>
    </div>

    <div class="answer-sec">
      <h3 class="sec-title">2 · Commit <span class="note">one line each — vagueness is a miss</span></h3>
      <div class="answer-grid">${textFields}</div>
    </div>

    <div class="answer-sec">
      <h3 class="sec-title">3 · Predict <span class="note">your calibration is tracked</span></h3>
      <div class="predict-row">
        <input class="range" type="range" min="0" max="100" step="5" value="${d.predicted}" data-predict ${frozen ? "disabled" : ""}>
        <output id="predict-out">${d.predicted}</output>
      </div>
    </div>

    <div class="answer-foot">
      <span class="note">${frozen
        ? "Answers locked for this attempt. Grade it in Model Review."
        : "Reveal locks your answers, auto-checks the classification, and opens the model answer + rubric."}</span>
      ${frozen
        ? `<button class="btn btn-primary" data-tab="review">Go to Model Review →</button>`
        : `<button class="btn btn-primary" data-action="reveal">Reveal model answer</button>`}
    </div>`;
  }

  function compareRow(label, yours, model) {
    return `
    <div class="compare-row">
      <header>${esc(label)}</header>
      <div class="cells">
        <div class="cell yours"><span>Yours</span>${yours ? esc(yours) : `<span class="blank-note">left blank</span>`}</div>
        <div class="cell model"><span>Model</span>${esc(model)}</div>
      </div>
    </div>`;
  }

  function reviewTab(p, d) {
    // If mid-attempt (revealed, unsaved) grade the draft; otherwise show the last saved attempt.
    const live = d.revealed;
    const att = live ? null : lastAttempt(p.id);
    const answers = live ? d.answers : (att ? att.answers : {});
    const auto = live ? autoScore(p, d.answers) : (att ? att.auto : autoScore(p, {}));
    const rubric = live ? d.rubric : (att ? att.rubric : {});
    const edge = live ? d.edge : (att ? att.edge : null);

    const chips = auto.detail.map(x => {
      const cls = x.credit === 1 ? "ok" : x.credit === 0.5 ? "half" : "miss";
      const icon = x.credit === 1 ? "✓" : x.credit === 0.5 ? "◐" : "✗";
      const want = x.want || "none";
      return `<span class="check-chip ${cls}">${icon} ${esc(x.label)}: <b>${esc(x.got || "—")}</b>${x.credit < 1 ? ` → ${esc(want)}` : ""}</span>`;
    }).join("");

    const compareRows =
      compareRow("Primary bottleneck", answers.bottleneck, p.expected.bottleneck) +
      compareRow("Dominant failure mode", answers.failureMode, p.expected.failureMode) +
      compareRow("Best next move", answers.nextMove, p.expected.nextMove) +
      compareRow("First metric to inspect", answers.metric, p.expected.metric) +
      compareRow("Owner / stakeholder", answers.owner, p.expected.owner) +
      compareRow("Falsifier", answers.falsifier, p.expected.falsifier) +
      compareRow("20-second exec answer", answers.execAnswer, p.altitude.exec) +
      compareRow("Frontier-lab translation", answers.frontierTranslation, p.altitude.frontier);

    const rubricRows = META.rubricDims.map(dim => {
      const val = rubric[dim.key];
      return `
      <div class="rubric-row">
        <div class="info">
          <b>${esc(dim.name)}</b>
          <span>${esc(p.rubric[dim.key])}</span>
        </div>
        <div class="seg" data-rubric="${dim.key}">
          ${[0, 1, 2, 3].map(n => `<button data-val="${n}" class="${val === n ? "active" : ""}" ${live ? "" : "disabled"}>${n}</button>`).join("")}
        </div>
      </div>`;
    }).join("");

    const graded = META.rubricDims.every(dim => typeof rubric[dim.key] === "number") && typeof edge === "number";
    const previewScore = graded || !live ? computeScore(auto, rubric) : null;

    return `
    ${live ? "" : att ? `<p class="small muted" style="margin-bottom:12px">Showing your last saved attempt (${fmtWhen(att.ts)}). Start a new attempt from the Answer tab.</p>` : ""}
    <h3 class="sec-title">Classification check <span class="note">${auto.points} / ${auto.max} auto-scored</span></h3>
    <div class="check-strip">${chips}</div>

    <h3 class="sec-title">Your commitment vs the model</h3>
    <div class="compare">${compareRows}</div>

    <div class="model-answer">
      <h3>Model answer</h3>
      ${paras(p.modelAnswer)}
    </div>

    <div class="adversarial">
      <span>Before you grade — the tempting wrong answers</span>
      <p>${esc(p.adversarial)}</p>
    </div>

    <h3 class="sec-title">Self-grade the six dimensions <span class="note">grade against the descriptor as a literal test — 0 absent · 3 elite</span></h3>
    <div class="rubric">${rubricRows}</div>

    <div class="edge-row">
      <h3 class="sec-title">Versus the model answer <span class="note">counts toward Model Edge</span></h3>
      <div class="seg" data-edge>
        ${[[-1, "Model was better"], [0, "Parity"], [1, "I added something it missed"]].map(([v, t]) =>
          `<button data-val="${v}" class="${edge === v ? "active" : ""}" ${live ? "" : "disabled"}>${t}</button>`).join("")}
      </div>
    </div>

    <div class="save-strip">
      <span class="preview">${live
        ? (graded ? `This attempt: <strong>${previewScore}</strong> / 100 · predicted ${d.predicted} · Δ${Math.abs(previewScore - d.predicted)} ${previewScore < d.predicted ? "overconfident" : previewScore > d.predicted ? "underconfident" : "calibrated"}` : "Grade all six dimensions and the model-edge call to save.")
        : att ? `Saved attempt: <strong>${att.score}</strong> / 100 · predicted ${att.predicted} · Δ${Math.abs(att.score - att.predicted)}` : ""}</span>
      ${live ? `<button class="btn btn-primary" data-action="save-attempt" ${graded ? "" : "disabled"}>Save attempt</button>`
             : `<button class="btn btn-outline" data-tab="answer">Start new attempt</button>`}
    </div>`;
  }

  function synthesisTab(p) {
    const notes = state.notes[p.id] || "";
    return `
    <div class="synth-core">
      <span>Ultimate synthesis</span>
      <p>${esc(p.expected.nextMove)}</p>
    </div>

    <h3 class="sec-title">Altitude rewrites <span class="note">same judgment, three rooms</span></h3>
    <div class="altitude-grid">
      <div class="altitude-card"><span>To the customer exec</span><p>${esc(p.altitude.exec)}</p></div>
      <div class="altitude-card"><span>To the engineering lead</span><p>${esc(p.altitude.engineer)}</p></div>
      <div class="altitude-card"><span>To the frontier-lab interviewer</span><p>${esc(p.altitude.frontier)}</p></div>
    </div>

    <div class="followup">
      <span>Recursive follow-up — rep it again, harder</span>
      <p>${esc(p.recursiveFollowup)}</p>
    </div>

    <div class="notes-sec">
      <h3 class="sec-title">Your notes on this problem <span class="note">saved automatically</span></h3>
      <textarea class="textarea" rows="3" data-notes placeholder="What you missed, the reusable pattern, your answer to the follow-up…">${esc(notes)}</textarea>
    </div>`;
  }

  function historyTab(p) {
    const atts = attemptsFor(p.id).slice().reverse();
    const m = metaFor(p.id);
    const due = fmtDue(m.nextReview);
    if (!atts.length) {
      return `<div class="empty"><strong>No attempts yet</strong>Run the rep from the Answer tab — every attempt lands here with score, prediction, and calibration error.</div>`;
    }
    return `
    <div class="history-list">
      ${atts.map(a => {
        const delta = Math.abs(a.predicted - a.score);
        const edgeLabel = a.edge === 1 ? "added edge" : a.edge === 0 ? "parity" : "model better";
        return `
        <div class="history-row">
          <span class="when">${fmtWhen(a.ts)}</span>
          <span class="num"><span>Score</span><b>${a.score}</b></span>
          <span class="num"><span>Predicted</span><b>${a.predicted}</b></span>
          <span class="num"><span>Calib Δ</span><b>${delta}</b></span>
          <span class="num"><span>Classify</span><b>${a.auto.points}/${a.auto.max}</b></span>
          <span class="muted small">${edgeLabel}</span>
        </div>`;
      }).join("")}
    </div>
    <div class="answer-foot">
      <span class="note">Next review ${due.text} · interval ${m.reviewIdx != null ? INTERVALS[m.reviewIdx] + "d" : "—"} · best ${bestScore(p.id)}</span>
      <button class="btn btn-danger btn-sm" data-action="reset-problem">Reset this problem</button>
    </div>`;
  }

  function repRail(p, d) {
    const atts = attemptsFor(p.id);
    const last = lastAttempt(p.id);
    const unlocked = d.revealed || atts.length > 0;
    const st = statusOf(p.id);
    const m = metaFor(p.id);
    const due = fmtDue(m.nextReview);

    const scoreCard = `
    <section class="card rail-card">
      <h3>Score</h3>
      <div class="score-wrap">
        <div class="score-ring" style="--pct:${last ? last.score : 0}"><b>${last ? last.score : "—"}</b></div>
        <div class="score-meta">
          <span>${STATUS_LABEL[st]}</span>
          <strong>${atts.length ? `best ${bestScore(p.id)} · ${atts.length} attempt${atts.length > 1 ? "s" : ""}` : "no attempts yet"}</strong>
          ${last ? `<span style="margin-top:4px">predicted ${last.predicted} · Δ${Math.abs(last.score - last.predicted)}</span>` : ""}
          <span style="margin-top:4px">next review: ${due.text}</span>
        </div>
      </div>
    </section>`;

    const dims = last ? `
    <section class="card rail-card">
      <h3>Last attempt — dimensions</h3>
      <div class="rail-rows">
        ${META.rubricDims.map(dim => {
          const v = last.rubric[dim.key] || 0;
          return `<div class="rail-row"><span>${dim.name}</span><span class="mini-bar"><i style="width:${v / 3 * 100}%"></i></span><b>${v}/3</b></div>`;
        }).join("")}
      </div>
    </section>` : "";

    const fit = unlocked ? `
    <section class="card rail-card">
      <h3>Archetype fit</h3>
      <div class="fit-list">
        ${META.archetypes.map(a => {
          const cls = a.id === p.archetype ? "primary" : a.id === p.secondaryArchetype ? "secondary" : "";
          const tag = a.id === p.archetype ? "Primary" : a.id === p.secondaryArchetype ? "Secondary" : "";
          return `<div class="fit-item ${cls}"><span>${a.id}</span><b>${tag}</b></div>`;
        }).join("")}
      </div>
    </section>` : `
    <section class="card rail-card">
      <h3>Archetype fit</h3>
      <p class="small muted">Hidden until you reveal — the archetype call is part of the rep.</p>
    </section>`;

    const pats = unlocked ? `
    <section class="card rail-card">
      <h3>Patterns trained</h3>
      <div class="fit-list">
        ${p.patterns.map((id, i) => {
          const pt = patternById[id];
          const st = patternStatus(id);
          return `<a class="fit-item" href="#/pattern/${id}"><span>${esc(pt.name)}${i === 0 ? "" : " ·2°"}</span><b class="pstatus ${st.status}">${st.status}</b></a>`;
        }).join("")}
      </div>
    </section>` : `
    <section class="card rail-card">
      <h3>Patterns trained</h3>
      <p class="small muted">Hidden until you reveal — naming the pattern is part of the rep.</p>
    </section>`;

    const roles = `
    <section class="card rail-card">
      <h3>Where this transfers</h3>
      <div class="roles-stack">
        ${p.targetRoles.map(r => `<div><b>${esc(r)}</b><span>${esc(ROLE_NOTES[r] || "")}</span></div>`).join("")}
      </div>
    </section>`;

    return `<aside class="rail">${scoreCard}${dims}${fit}${pats}${roles}</aside>`;
  }

  /* ---------------- patterns (the roadmap) ---------------- */

  function patternCard(pt) {
    const st = patternStatus(pt.id);
    return `
    <a class="card pattern-card" href="#/pattern/${pt.id}">
      <div class="pc-head">
        <h4>${esc(pt.name)}</h4>
        <span class="pstatus ${st.status}">${st.status}</span>
      </div>
      <p>${esc(pt.move)}</p>
      <div class="pc-foot">
        <span class="mono muted">${st.attempted}/${st.total} problems</span>
        <span class="bar"><i style="width:${st.score || 0}%"></i></span>
        <b class="mono">${st.score == null ? "—" : st.score}</b>
      </div>
    </a>`;
  }

  function patternsView() {
    const m = metrics();
    return `
    <div class="view-head">
      <div>
        <p class="eyebrow">Patterns</p>
        <h1>The judgment roadmap</h1>
        <p class="sub">Eighteen named moves — the sliding windows of deployment judgment. Problems are drills; these are the skills. Proven means ≥85 held across multiple problems.</p>
      </div>
      <div class="actions">
        <div class="stat" style="min-width:150px"><span>Proven</span><strong>${m.patternsProven}</strong><em>/ ${PATTERNS.length}</em></div>
      </div>
    </div>
    ${TIERS.map(t => `
      <section class="tier-sec">
        <header>
          <h2><span class="mono muted">T${t.n}</span> ${esc(t.name)}</h2>
          <p>${esc(t.d)}</p>
        </header>
        <div class="pattern-grid">
          ${PATTERNS.filter(pt => pt.tier === t.n).map(patternCard).join("")}
        </div>
      </section>`).join("")}`;
  }

  function patternDetailView(ptId) {
    const pt = patternById[ptId];
    const st = patternStatus(ptId);
    const tier = TIERS.find(t => t.n === pt.tier);
    const probs = problemsForPattern(ptId);

    const probRows = probs.map(p => {
      const best = attemptsFor(p.id).length ? bestScore(p.id) : null;
      const primary = p.patterns[0] === ptId;
      return `
      <div class="card queue-row" data-open="${p.id}">
        ${statusDot(p.id)}
        <span class="qtitle"><span class="pid">${p.id}</span>${esc(p.title)}${primary ? "" : ` <span class="pill solid" title="This problem trains it as a secondary pattern">secondary</span>`}</span>
        <span class="qcat">${esc(p.category)} · <span class="diff-${p.difficulty}">${p.difficulty}</span></span>
        <span class="qnum">best ${best == null ? "—" : best}</span>
        <span class="qdue"></span>
        <a class="btn btn-outline btn-sm" href="#/problem/${p.id}">Rep</a>
      </div>`;
    }).join("");

    const notes = probs
      .filter(p => (state.notes[p.id] || "").trim())
      .map(p => `
        <div class="playbook-note">
          <p>${esc(state.notes[p.id])}</p>
          <a href="#/problem/${p.id}" class="small muted">— your note on ${p.id} · ${esc(p.title)}</a>
        </div>`).join("");

    return `
    <div class="rep-top">
      <div class="crumbs">
        <a href="#/patterns">Patterns</a> <span>/</span>
        <span>Tier ${pt.tier} — ${esc(tier.name)}</span>
      </div>
      <div class="title-row">
        <h1>${esc(pt.name)}</h1>
        <span class="pstatus ${st.status}">${st.status}</span>
        ${st.score != null ? `<span class="mono muted">avg best ${st.score}</span>` : ""}
      </div>
    </div>

    <div class="synth-core">
      <span>The move</span>
      <p>${esc(pt.move)}</p>
    </div>

    <div class="prog-2col">
      <div class="card break-card">
        <h3>Tells — when to reach for it</h3>
        <ul class="tells">${pt.tells.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
      <div class="card break-card">
        <h3>Anti-pattern — how it's fumbled</h3>
        <p class="small" style="color:var(--muted-2);line-height:1.6">${esc(pt.antiPattern)}</p>
      </div>
    </div>

    <div class="followup" style="margin-bottom:14px">
      <span>How interviews probe it</span>
      <p>${esc(pt.interview)}</p>
    </div>

    <div class="queue-sec">
      <h2>Training problems <span class="n">${st.attempted}/${st.total} attempted · proven needs ≥85 across ${Math.min(2, st.total)}</span></h2>
      <div class="queue-list">${probRows}</div>
    </div>

    <div class="queue-sec">
      <h2>Your playbook <span class="n">notes from these problems, compounding</span></h2>
      ${notes || `<div class="card empty"><strong>Nothing here yet</strong>Notes you take on this pattern's problems land here — misses, reusable framings, your answers to the follow-ups. This page is the institutional memory of you.</div>`}
    </div>`;
  }

  /* ---------------- review queue ---------------- */

  function reviewView() {
    const withMeta = PROBLEMS.filter(p => metaFor(p.id).nextReview != null);
    const due = withMeta.filter(p => startOfDay(metaFor(p.id).nextReview) <= today())
      .sort((a, b) => metaFor(a.id).nextReview - metaFor(b.id).nextReview);
    const upcoming = withMeta.filter(p => startOfDay(metaFor(p.id).nextReview) > today())
      .sort((a, b) => metaFor(a.id).nextReview - metaFor(b.id).nextReview)
      .slice(0, 10);
    const weak = PROBLEMS.filter(p => attemptsFor(p.id).length && bestScore(p.id) < 70 && !due.includes(p));

    const row = p => {
      const m = metaFor(p.id);
      const d = fmtDue(m.nextReview);
      return `
      <div class="card queue-row" data-open="${p.id}">
        ${statusDot(p.id)}
        <span class="qtitle"><span class="pid">${p.id}</span>${esc(p.title)}</span>
        <span class="qcat">${esc(p.category)}</span>
        <span class="qnum">best ${bestScore(p.id) || "—"}</span>
        <span class="qdue ${d.cls}">${d.text}</span>
        <a class="btn btn-outline btn-sm" href="#/problem/${p.id}">Rep</a>
      </div>`;
    };

    return `
    <div class="view-head">
      <div>
        <p class="eyebrow">Review Queue</p>
        <h1>Spaced repetition</h1>
        <p class="sub">Strong reps stretch to 30 days. Weak ones come back tomorrow. Intervals: ${INTERVALS.join(" · ")} days.</p>
      </div>
      ${due.length ? `<div class="actions"><a class="btn btn-primary" href="#/problem/${due[0].id}">Clear the queue → ${due[0].id}</a></div>` : ""}
    </div>

    <div class="queue-sec">
      <h2>Due now <span class="n">${due.length}</span></h2>
      ${due.length ? `<div class="queue-list">${due.map(row).join("")}</div>`
        : `<div class="card empty"><strong>Queue clear</strong>Nothing due. Start a fresh problem in the bank — the queue fills as you rep.</div>`}
    </div>

    ${weak.length ? `
    <div class="queue-sec">
      <h2>Weak spots <span class="n">best score under 70</span></h2>
      <div class="queue-list">${weak.map(row).join("")}</div>
    </div>` : ""}

    ${upcoming.length ? `
    <div class="queue-sec">
      <h2>Upcoming <span class="n">next ${upcoming.length}</span></h2>
      <div class="queue-list">${upcoming.map(row).join("")}</div>
    </div>` : ""}`;
  }

  /* ---------------- progress ---------------- */

  function breakdownRows(groups) {
    // groups: [{name, pids}] -> rows with avg best among attempted
    const rows = groups.map(g => {
      const attempted = g.pids.filter(id => attemptsFor(id).length);
      const avg = attempted.length ? Math.round(attempted.reduce((s, id) => s + bestScore(id), 0) / attempted.length) : null;
      return { name: g.name, avg, attempted: attempted.length, total: g.pids.length };
    });
    const scored = rows.filter(r => r.avg != null);
    const spread = scored.length > 1 && Math.min(...scored.map(r => r.avg)) < Math.max(...scored.map(r => r.avg));
    const weakest = spread ? scored.reduce((a, b) => (b.avg < a.avg ? b : a)).name : null;
    return rows.map(r => `
      <div class="break-row ${r.name === weakest ? "weak" : ""}">
        <span>${esc(r.name)} <span class="muted">${r.attempted}/${r.total}</span>${r.name === weakest ? ` <span class="flag">weakest</span>` : ""}</span>
        <span class="bar"><i style="width:${r.avg || 0}%"></i></span>
        <b>${r.avg == null ? "—" : r.avg}</b>
      </div>`).join("");
  }

  function progressView() {
    const m = metrics();
    const atts = allAttempts().slice(-8).reverse();
    const fmtM = v => v == null ? "—" : v;

    const tierRows = TIERS.map(t => {
      const pts = PATTERNS.filter(pt => pt.tier === t.n);
      const proven = pts.filter(pt => patternStatus(pt.id).status === "proven").length;
      const training = pts.filter(pt => patternStatus(pt.id).status === "training").length;
      return { t, total: pts.length, proven, training };
    });

    const catGroups = META.categories.map(c => ({ name: c.name, pids: PROBLEMS.filter(p => p.category === c.name).map(p => p.id) }));
    const lensGroups = META.lenses.map(l => ({ name: l.full, pids: PROBLEMS.filter(p => p.primaryLens === l.id).map(p => p.id) })).filter(g => g.pids.length);
    const archGroups = META.archetypes.map(a => ({ name: a.id, pids: PROBLEMS.filter(p => p.archetype === a.id).map(p => p.id) })).filter(g => g.pids.length);

    const dimRows = META.rubricDims.map(dim => {
      const v = dimAvg(dim.key);
      const pct = v == null ? 0 : v / 3 * 100;
      return { name: dim.name, v, pct };
    });
    const scoredDims = dimRows.filter(d => d.v != null);
    const dimSpread = scoredDims.length > 1 && Math.min(...scoredDims.map(d => d.v)) < Math.max(...scoredDims.map(d => d.v));
    const weakestDim = dimSpread ? scoredDims.reduce((a, b) => (b.v < a.v ? b : a)).name : null;

    return `
    <div class="view-head">
      <div>
        <p class="eyebrow">Progress</p>
        <h1>The scoreboard</h1>
        <p class="sub">A skill inventory, not an effort meter: patterns proven, then the transfer composites underneath them.</p>
      </div>
      <div class="actions">
        <a class="btn btn-outline" href="#/review">Review queue${m.dueToday ? ` (${m.dueToday})` : ""}</a>
        <a class="btn btn-primary" href="#/${nextUpId() ? "problem/" + nextUpId() : "bank"}">Next rep</a>
      </div>
    </div>

    <div class="north-star">
      <div class="big"><b>${m.patternsProven}<em>/${PATTERNS.length}</em></b><span>Patterns proven</span></div>
      <div class="parts">
        ${tierRows.map(({ t, total, proven, training }) => `
          <div class="part">
            <span>T${t.n} · ${esc(t.name)}</span>
            <span class="bar"><i style="width:${(proven / total) * 100}%"></i></span>
            <b>${proven}/${total}${training ? ` <span style="opacity:.5">+${training}</span>` : ""}</b>
          </div>`).join("")}
      </div>
      <div class="foot">The north star is a skill inventory: named judgment moves held at ≥85 across multiple problems. Hours don't move it — transfer does. <a href="#/patterns" style="color:#fafafa;text-decoration:underline">Open the roadmap →</a></div>
    </div>

    <div class="metric-grid">
      <div class="card metric-card">
        <span>Enterprise readiness</span><b>${fmtM(m.cape)}</b>
        <div class="bar"><i style="width:${m.cape || 0}%"></i></div>
        <p>Avg best score on enterprise-seat problems × √coverage. Rises with breadth, not just good days.</p>
      </div>
      <div class="card metric-card">
        <span>Frontier transfer</span><b>${fmtM(m.frontier)}</b>
        <div class="bar"><i style="width:${m.frontier || 0}%"></i></div>
        <p>Readiness on lab-tagged problems (70%) + your Transfer rubric average (30%).</p>
      </div>
      <div class="card metric-card">
        <span>Model edge</span><b>${fmtM(m.modelEdge)}</b>
        <div class="bar"><i style="width:${m.modelEdge || 0}%"></i></div>
        <p>50 = parity with the model answer. Above 50 means you're regularly adding what it missed.</p>
      </div>
      <div class="card metric-card">
        <span>Calibration</span><b>${fmtM(m.calibration)}</b>
        <div class="bar"><i style="width:${m.calibration || 0}%"></i></div>
        <p>100 − 2 × avg |predicted − actual|. Knowing what you know is a tracked skill here.</p>
      </div>
    </div>

    <div class="stats">
      <div class="stat"><span>Solved</span><strong>${m.solved}</strong><em>/ ${PROBLEMS.length}</em></div>
      <div class="stat"><span>Mastered</span><strong>${m.mastered}</strong></div>
      <div class="stat"><span>Attempts</span><strong>${m.attempts}</strong></div>
      <div class="stat"><span>Avg best</span><strong>${m.avgBest == null ? "—" : Math.round(m.avgBest)}</strong></div>
      <div class="stat"><span>Archetype fit</span><strong>${fmtM(m.archetypeFit)}</strong></div>
      <div class="stat"><span>In training</span><strong>${m.patternsTraining}</strong><em>patterns</em></div>
    </div>

    <div class="prog-2col">
      <div class="card break-card">
        <h3>Categories</h3>
        ${breakdownRows(catGroups)}
      </div>
      <div class="card break-card">
        <h3>Rubric dimensions <span class="muted small">avg of all attempts, /3</span></h3>
        ${dimRows.map(d => `
          <div class="break-row ${d.name === weakestDim ? "weak" : ""}">
            <span>${d.name}${d.name === weakestDim ? ` <span class="flag">weakest</span>` : ""}</span>
            <span class="bar"><i style="width:${d.pct}%"></i></span>
            <b>${d.v == null ? "—" : d.v.toFixed(1)}</b>
          </div>`).join("")}
      </div>
    </div>

    <div class="prog-2col">
      <div class="card break-card">
        <h3>By primary lens</h3>
        ${breakdownRows(lensGroups)}
      </div>
      <div class="card break-card">
        <h3>By primary archetype</h3>
        ${breakdownRows(archGroups)}
      </div>
    </div>

    ${atts.length ? `
    <div class="prog-2col">
      <div class="card break-card">
        <h3>Recent attempts</h3>
        <div class="recent-list">
          ${atts.map(a => {
            const p = byId[a.pid];
            return `<div class="recent-row" data-open="${a.pid}">
              <span class="t"><span class="pid">${a.pid}</span>${esc(p.title)}</span>
              <span class="num">${a.score}</span>
              <span class="num muted">Δ${Math.abs(a.predicted - a.score)}</span>
              <span class="when">${fmtDate(a.ts)}</span>
            </div>`;
          }).join("")}
        </div>
      </div>
      
    </div>` : `
    <div class="card empty"><strong>No attempts yet</strong>Run <a href="#/problem/001" style="text-decoration:underline">Problem 001</a> — every score, prediction, and miss lands on this board.</div>`}
    `;
  }

  /* ---------------- actions ---------------- */

  function doReveal(pid) {
    const p = byId[pid];
    const d = draftFor(pid);
    const a = d.answers;
    const missing = [];
    if (!a.category) missing.push("category");
    if (!a.pattern) missing.push("pattern");
    if (!a.primaryLens) missing.push("primary lens");
    if (!a.archetype) missing.push("primary archetype");
    if (!(a.bottleneck || "").trim()) missing.push("bottleneck");
    if (!(a.nextMove || "").trim()) missing.push("next move");
    if (missing.length) { toast("Commit first — missing: " + missing.join(", ")); return; }
    d.revealed = true;
    repTabs[pid] = "review";
    save();
    render();
  }

  function doSaveAttempt(pid) {
    const p = byId[pid];
    const d = draftFor(pid);
    if (!d.revealed) return;
    const auto = autoScore(p, d.answers);
    const score = computeScore(auto, d.rubric);
    const attempt = {
      ts: Date.now(),
      answers: d.answers,
      predicted: d.predicted,
      auto,
      rubric: d.rubric,
      edge: d.edge,
      score,
    };
    if (!state.attempts[pid]) state.attempts[pid] = [];
    state.attempts[pid].push(attempt);
    scheduleReview(pid, score);
    const mm = state.meta[pid];
    delete state.drafts[pid];
    repTabs[pid] = "synthesis";
    save();
    const nextIn = INTERVALS[mm.reviewIdx];
    const delta = Math.abs(attempt.predicted - score);
    const calib = delta <= 5 ? "well calibrated" : attempt.predicted > score ? `overconfident by ${delta}` : `underconfident by ${delta}`;
    const parts = [`Saved — ${score}/100. You predicted ${attempt.predicted} — ${calib}.`];
    if (statusOf(pid) === "mastered") parts.push("Mastered.");
    parts.push(`Next review in ${nextIn}d.`);
    toast(parts.join(" "));
    render();
  }

  function doResetProblem(pid) {
    if (!confirm("Reset " + pid + "? This deletes its attempts, schedule, and notes.")) return;
    delete state.attempts[pid];
    delete state.meta[pid];
    delete state.drafts[pid];
    delete state.notes[pid];
    repTabs[pid] = "prompt";
    save();
    toast(pid + " reset");
    render();
  }

  /* ---------------- events ---------------- */

  document.addEventListener("click", e => {
    const star = e.target.closest("[data-star]");
    if (star) {
      e.preventDefault(); e.stopPropagation();
      const pid = star.getAttribute("data-star");
      state.meta[pid] = state.meta[pid] || {};
      state.meta[pid].star = !state.meta[pid].star;
      save(); render();
      return;
    }

    const tabBtn = e.target.closest("[data-tab]");
    if (tabBtn && !tabBtn.disabled) {
      const r = route();
      if (r.view === "rep") { repTabs[r.pid] = tabBtn.getAttribute("data-tab"); render(); }
      return;
    }

    const catBtn = e.target.closest("[data-cat]");
    if (catBtn) { bankFilter.cat = catBtn.getAttribute("data-cat"); render(); return; }

    const seg = e.target.closest(".seg [data-val]");
    if (seg && !seg.disabled) {
      const r = route();
      if (r.view !== "rep") return;
      const d = draftFor(r.pid);
      const wrap = seg.closest("[data-rubric],[data-edge]");
      if (wrap.hasAttribute("data-rubric")) d.rubric[wrap.getAttribute("data-rubric")] = Number(seg.getAttribute("data-val"));
      else d.edge = Number(seg.getAttribute("data-val"));
      save(); render();
      return;
    }

    const action = e.target.closest("[data-action]");
    if (action) {
      const act = action.getAttribute("data-action");
      const r = route();
      if (act === "reveal" && r.view === "rep") doReveal(r.pid);
      else if (act === "save-attempt" && r.view === "rep") doSaveAttempt(r.pid);
      else if (act === "reset-problem" && r.view === "rep") doResetProblem(r.pid);
      else if (act === "clear-filters") {
        Object.assign(bankFilter, { cat: "All", q: "", difficulty: "", lens: "", archetype: "", role: "", status: "", pattern: "" });
        render();
      }
      return;
    }

    const open = e.target.closest("[data-open]");
    if (open && !e.target.closest("a,button")) {
      location.hash = "#/problem/" + open.getAttribute("data-open");
      return;
    }
  });

  document.addEventListener("input", e => {
    const t = e.target;
    const r = route();

    if (t.matches("[data-draft-field]") && r.view === "rep") {
      const d = draftFor(r.pid);
      d.answers[t.getAttribute("data-draft-field")] = t.value;
      save();
      return;
    }

    if (t.matches("[data-predict]") && r.view === "rep") {
      const d = draftFor(r.pid);
      d.predicted = Number(t.value);
      const out = document.getElementById("predict-out");
      if (out) out.textContent = t.value;
      save();
      return;
    }

    if (t.matches("[data-notes]") && r.view === "rep") {
      state.notes[r.pid] = t.value;
      save();
      return;
    }

    if (t.matches('[data-filter="q"]')) {
      bankFilter.q = t.value;
      // re-render only the table region by re-rendering view (input keeps focus via re-focus)
      const pos = t.selectionStart;
      render();
      const el = document.querySelector('[data-filter="q"]');
      if (el) { el.focus(); el.setSelectionRange(pos, pos); }
      return;
    }
  });

  document.addEventListener("change", e => {
    const t = e.target;
    if (t.matches("[data-filter]") && t.getAttribute("data-filter") !== "q") {
      bankFilter[t.getAttribute("data-filter")] = t.value;
      render();
    }
  });

  window.addEventListener("hashchange", render);
  render();
})();
