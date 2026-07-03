# The Coverage Map

Parabolic 100 makes a coverage claim, the same one Blind 75 makes for coding screens: **these 100 worked examples span ~80% of the situations encountered (a) day-to-day in an enterprise AI deployment seat and (b) in interview loops for frontier-lab deployment roles** — FDE, deployment engineering, and TPM/DPM across inference, safeguards, API, and apps platforms.

That claim is engineering, not marketing. This document is the instrument behind it: the enumerated surface area, the current bank audited against it, the authoring backlog derived from the gaps, and the telemetry that keeps the claim honest over time.

Rules this document enforces:

1. **Every problem earns its slot** as the cheapest representative of a recurring situation class. No problem enters the canon because it is merely interesting.
2. **Authoring order = weight × gap.** The next problem written is always the highest-stakes uncovered class, not the easiest one to write.
3. **The claim is measured, not asserted.** Field reps double as coverage tests (see §5). If live material stops mapping to the canon, the canon — not reality — is wrong.
4. **Judgment sits on a technical floor.** Every judgment problem assumes mechanisms — inference economics, retrieval, post-training, silicon supply. The technical spine (§7) makes that floor explicit and trained rather than assumed.

---

## 1. The surface area — 24 situation classes

Weights: **H** = weekly-or-every-loop, **M** = monthly-or-most-loops, **L** = occasional. Columns: CAPE-style deployment seat (day job), FDE / Deployment Eng loops, TPM loops, DPM & strategy loops.

### A. Customer-facing — the field

| # | Situation class | Seat | FDE | TPM | DPM/Strat | Tested as |
|---|---|---|---|---|---|---|
| 1 | Scenario discovery & qualification | H | H | L | M | case, screen |
| 2 | Use-case portfolio triage | H | M | M | M | case |
| 3 | Prototype & demo judgment | M | H | L | M | case, behavioral |
| 4 | System & agent architecture | H | H | M | L | design, case |
| 5 | Autonomy, permissions & tool access | M | H | M | L | design |
| 6 | Enterprise data & integration | H | H | L | L | design, case |
| 7 | Eval design & measurement | H | H | H | M | design, case |
| 8 | Value evidence & ROI | H | M | L | H | case, exec-comm |
| 9 | Governance & lifecycle | H | M | M | L | case |
| 10 | AI incident response | M | M | H | L | case, behavioral |
| 11 | Pilot-to-production & rollout | H | M | H | M | design, behavioral |
| 12 | Trust & adoption recovery | M | M | L | L | case, behavioral |

### B. Internal execution — the org

| # | Situation class | Seat | FDE | TPM | DPM/Strat | Tested as |
|---|---|---|---|---|---|---|
| 13 | Cross-team dependencies & influence without authority | M | L | **H** | M | behavioral, case |
| 14 | Program health & status truth | M | L | **H** | L | behavioral, case |
| 15 | Launch coordination & readiness | M | M | **H** | M | design, case |
| 16 | Allocation under scarcity | L | L | **H** | M | case |
| 17 | Metric & goal design | M | M | **H** | H | design, exec-comm |
| 18 | Stakeholder conflict & expectation repair | H | M | **H** | M | behavioral, case |

### C. Product & market — the business

| # | Situation class | Seat | FDE | TPM | DPM/Strat | Tested as |
|---|---|---|---|---|---|---|
| 19 | Field-to-product feedback | H | M | M | H | case, behavioral |
| 20 | Platform & ecosystem strategy | M | L | M | H | case, exec-comm |
| 21 | Build / buy / partner | L | L | M | H | case |
| 22 | Market & capital calibration | M | L | L | H | case, exec-comm |

### D. Meta — the room

| # | Situation class | Seat | FDE | TPM | DPM/Strat | Tested as |
|---|---|---|---|---|---|---|
| 23 | Executive communication & altitude | H | M | H | H | exec-comm (every loop's final round) |
| 24 | Forecasting & calibration discipline | M | L | L | M | case; also the Gnomon ledger itself |

**Formats.** `case` = live scenario ("what do you do?"); `design` = build the plan/system/eval on a whiteboard; `behavioral` = "tell me about a time" — each pattern should anchor to a real story (story bank stays private; the format mapping is public); `exec-comm` = brief a hostile or distracted executive. Target distribution across the 100: roughly 55% case, 20% design, 15% behavioral-anchor, 10% exec-comm.

---

## 2. Audit — the current 25 against the map

| # | Class | Covered by | Verdict |
|---|---|---|---|
| 1 | Discovery & qualification | 002 | **Partial** — one canonical rep; needs altitude + segment variants |
| 2 | Portfolio triage | 006 | **Partial** |
| 3 | Prototype & demo judgment | 007 | **Partial** |
| 4 | Architecture | 008, 009, 011 | **Good start** — shape-matching covered; state, cost, model-selection absent |
| 5 | Autonomy & permissions | 010 | **Partial** |
| 6 | Data & integration | 003, 012, 013 | **Good start** — identity/tenancy and latency absent |
| 7 | Eval design & measurement | 003, 016, 017, 024 | **Strong** — deepest class in the bank |
| 8 | Value evidence & ROI | 005 | **Partial** |
| 9 | Governance & lifecycle | 001, 014 | **Good start** |
| 10 | Incident response | 015 (012 adjacent) | **Partial** — one harm class; security + public variants absent |
| 11 | Rollout & change mgmt | 018, 019 | **Good start** |
| 12 | Trust recovery | 013, 016 (secondary) | **Partial** — never primary |
| 13 | Cross-team dependencies | — | **GAP — zero coverage** |
| 14 | Program health & status truth | — | **GAP — zero coverage** |
| 15 | Launch coordination | 004, 024 | **Partial** — partner/external only; internal multi-team launch absent |
| 16 | Allocation under scarcity | 023 | **Partial** — compute only; people/roadmap/budget variants absent |
| 17 | Metric & goal design | — (embedded in others) | **GAP — no dedicated problem** |
| 18 | Stakeholder conflict | 021, 012 (secondary) | **GAP-adjacent — never primary** |
| 19 | Field-to-product feedback | 020, 022 | **Good start** |
| 20 | Platform strategy | 021, 022 | **Partial** |
| 21 | Build / buy / partner | — | **GAP — zero coverage** |
| 22 | Market calibration | 025 | **Partial** — 1 of a planned 10 |
| 23 | Exec communication | distributed (altitude field on all 25; 005, 025 primary-ish) | **Partial** — needs 2–3 dedicated reps |
| 24 | Forecasting discipline | 025 + Gnomon mechanics | **Partial** — needs dated-prediction reps |

**Headline:** the bank is strong where the first 25 were pointed — customer-facing technical judgment (classes 1–12, especially evals) — and near-zero on internal execution (13, 14, 17, 18, 21), which is the axis TPM loops weight most heavily. This was the correct build order (the field classes are the daily-reps surface), and it is now the correct authoring priority.

---

## 3. The backlog — 75 remaining, derived from gaps

Category targets stay fixed (they are the app's spine); situation classes map into them. Remaining per category: Scenario Discovery **7**, Agent Architecture **11**, Enterprise Integration **8**, Governance & Risk **7**, Evals & Measurement **11**, Deployment & Change Mgmt **8**, Platform Feedback & Product Strategy **7**, Frontier-Lab Transfer **7**, Market & Capital **9**.

**65 slots are directed below; 10 are reserved** for gaps discovered by telemetry (§5). Titles are working stubs.

### Wave 1 — the gap killers (author first, ~priority order)

| Stub | Class | Category |
|---|---|---|
| The Dependency You Don't Own | 13 | Deployment & Change Mgmt |
| Watermelon Program (green outside, red inside) | 14 | Frontier-Lab Transfer |
| Define Success for the Agent Platform | 17 | Evals & Measurement |
| The Sponsor Goes Quiet | 18 | Scenario Discovery |
| The Overpromise Repair | 18 | Governance & Risk |
| Three Teams, One Launch Date | 15 | Frontier-Lab Transfer |
| Build, Buy, or Partner the Eval Tooling | 21 | Platform Feedback |
| The Vanity Metric Everyone Loves | 17 | Evals & Measurement |
| Escalate or Absorb | 13 | Deployment & Change Mgmt |
| Two Execs, One Truth (conflicting status demands) | 14, 18 | Governance & Risk |

### Wave 2 — deepen the strong classes

- **Agent Architecture (11):** memory & state design; context engineering vs fine-tuning; cost/latency budgets as architecture; model selection & routing; on-behalf-of auth chains; multi-agent handoff contracts; agent observability; failure isolation; offline/degraded modes; sync-vs-async task shapes; the build-vs-configure line.
- **Evals & Measurement (11 − 2 metric-design):** LLM-as-judge validity; human label quality & drift; A/B tests for agent features; red-team evals; regression gates in CI; sampling strategies for audit; eval-cost budgeting; benchmark contamination; long-horizon task evals.
- **Enterprise Integration (8):** tenant isolation & data residency; identity propagation end-to-end; connector freshness SLOs at scale; hybrid/sovereign deployment asks; latency budgets across systems; legacy-system grounding; M365-vs-custom surface choice; egress & DLP interplay.
- **Scenario Discovery (7 − 1 sponsor):** discovery at exec altitude; segment pattern reads; competitive-displacement asks; "our data isn't ready" objection; regulated-industry discovery; the pilot-sized-wrong ask.
- **Governance & Risk (7 − 2 above):** agent identity lifecycle; retention & audit trails; EU AI Act response; third-party agent vetting; red-line definitions.
- **Deployment & Change Mgmt (8 − 2 above):** champion networks by design; training that sticks; support model design; deprecation & migration; adoption plateau diagnosis; the re-org mid-rollout.
- **Platform Feedback & Product Strategy (7 − 2 above):** the feature that cannibalizes services; pricing/packaging feedback; partner-ecosystem conflicts; roadmap communication under NDA; when to say the product is wrong for them.
- **Frontier-Lab Transfer (7 − 2 above):** capacity incident command; researcher-facing interface design; eval-infra migration; enterprise escalation at the lab; model-behavior regression triage.
- **Market & Capital (9):** vendor lock-in pricing reads; the open-weights question from a CIO; inference-cost trajectory bets (dated, Gnomon-graded); agent-market consolidation read; capex-to-token pass-through; "should we build our own model"; two more dated-prediction reps; one post-mortem-a-real-forecast rep.

### Distribution check

Wave 1 + Wave 2 directed slots ≈ 65; reserve = 10, released only against §5 telemetry. Every authored problem must tag: category, 1–3 patterns, situation class, format. If a problem cannot name its situation class, it does not enter the canon.

---

## 4. Pattern-taxonomy pressure test

The 18 patterns were extracted from the first 25 problems (classes 1–12 heavy). The execution classes (13–18) will pressure-test whether the taxonomy spans the full surface. Expected outcome: most execution situations resolve into existing patterns (Ownership Forcing, Evidence Shaping, Gate Design, Precedent Pricing, Altitude Switching cover a lot of TPM life) — but 2–3 new patterns are plausibly missing, candidates being **Status Truth** (making program state legible against incentives to blur it) and **Commitment Design** (structuring who-promises-what-by-when across teams). Rule stands: a new pattern enters the taxonomy only when three problems need it and no existing pattern fits.

---

## 5. Coverage telemetry — how "80%" stays honest

Blind 75's coverage claim was validated by a decade of crowd reports. This bank gets the same validation from live traffic:

1. **Every field rep tags a situation class** (or `unmapped`) alongside its patterns.
2. **Coverage hit** = the material maps to a class with ≥1 canonical problem and a pattern that fits. **Coverage miss** = no class fits, no pattern fits, or the class exists but the canon has nothing like this variant. Misses append to the gap log with the source material.
3. **Interview post-mortems are mandatory telemetry.** Every real question from a real loop is logged as a field rep within 24h. These are the highest-value coverage tests the system will ever receive.
4. **The monthly scan reports coverage hit rate.** Below 80% over a rolling window → an authoring sprint pulls from the gap log before anything else is written, using the 10 reserved slots first.
5. **Drift review, quarterly:** classes whose live frequency diverges from their weights get reweighted; the backlog reorders accordingly. The map is an instrument, and instruments rot — this document is subject to its own problem 017.

---

## 6. Definition of done for the claim

The 100 may be declared coverage-complete when, simultaneously:

- every situation class has ≥2 canonical problems (≥1 for L/L/L/L-weighted classes),
- every pattern has ≥3 training problems spanning ≥2 categories,
- the format mix is within 10 points of target,
- every technical-spine cluster (§7) has ≥5 briefs live, and every Frontier-Lab Transfer and Market & Capital problem carries concept tags,
- and the trailing-quarter field-rep coverage hit rate is ≥80%, with interview post-mortems included in the sample.

Until all four hold, the number on the tin is aspiration, not measurement — and the app should say so.

---

## 7. The technical spine — knowledge under the judgment

The 24 situation classes cover *what to do*. Frontier loops also test *whether you understand the machine* — FDE and deployment-engineering loops include direct technical screens, inference TPM assumes serving economics, safeguards TPM assumes post-training failure modes, and every capacity or market judgment in this bank silently presumes you know why memory bandwidth, not FLOPs, is usually the binding constraint. The 80% claim fails for those loops without a technical floor. This section makes the floor explicit.

**This is not a second app and not a second hundred.** The canon stays 100 judgment worked examples. The technical spine is a supporting layer — the NeetCode analogy holds exactly: the roadmap is problems; underneath it sit the concept explainers you drill before the problems make sense. Two integration mechanisms:

1. **Concept tags on judgment problems.** Problems declare the mechanisms they presume (023 Inference Capacity Crunch → `inference-economics`, `batching-utilization`, `hbm-supply`; 003 → `rag`, `retrieval-metrics`; 025 → `capex-cycles`, `token-economics`). The rep page surfaces the tags; a weak brief score on a tagged concept schedules the brief before the problem.
2. **Briefs — the knowledge rep type.** A 5-minute rep for a concept rather than a situation: *explain the mechanism at two altitudes (engineer, exec) → name the load-bearing number → state what breaks if it moves 10× → give the deployment so-what.* Same engine as everything else: study/blind modes, self-grade against a worked explainer, spaced repetition, one trace. Target: **≥5 briefs per cluster, ~45 at v1.**

### The six clusters

| Cluster | Concepts (brief-level units) | Load-bearing question |
|---|---|---|
| **Silicon & memory** | accelerator landscape; HBM & memory bandwidth as the constraint; advanced packaging (CoWoS); custom silicon (hyperscaler + lab ASICs); inference-first chips | Why is the constraint memory movement, not compute — and who captures margin when that's true? |
| **Compute & power** | datacenter buildout economics; power as the gating input; gigawatt campuses & stranded energy; networking (scale-up vs scale-out); capex cycles & depreciation fights | What actually gates new capacity coming online, and on what lag? |
| **Model layer** | pretraining scaling; post-training (SFT, RLHF, RLVR); finetuning vs RAG vs context engineering as a decision; reward hacking & Goodharting; benchmarks & contamination; RL environments / era of experience | When does more training beat better retrieval beat better prompting — and how do you know a reward is being gamed? |
| **Inference & serving** | prefill vs decode; KV cache; batching & utilization; quantization & distillation; latency–throughput–cost triangle; inference clouds; token supply & demand | Where does a token's cost come from, and which lever moves it without moving quality? |
| **Application layer** | RAG system anatomy; agents & tool use; context engineering; coding AI & the software-creation shift; evals in production | What does the model boundary look like from the application's side, and where do apps actually break? |
| **Economics & market** | unit economics of genAI; consumer vs enterprise adoption curves; services-as-software; margin structure & capex pass-through; **bottleneck migration** — where the binding constraint sits over time | Who in the stack bears the risk, who captures the surplus, and where is the bottleneck moving next? |

Note the closing loop: *bottleneck migration* is Bottleneck Reclassification — pattern #1 — applied at industry scale. The spine gives the **what**; the taxonomy gives the **how to act on it**. Same discipline, two altitudes.

### Curriculum-to-intake mapping

External curricula are not a second app either — they are **scheduled field-rep feed**. Worked mapping for the current genAI-economics course:

| Week | Material | Clusters touched | Rep it generates |
|---|---|---|---|
| 1 | Economics of Generative AI; State of Consumer AI | Economics & market | Field rep: calibrated read + one dated claim to the Gnomon ledger |
| 2 | GPU economy (Altimeter, Groq) | Silicon & memory | Brief drill (custom silicon) + field rep: who-bears-the-risk on the ASIC thesis |
| 3 | AI factories at gigawatt scale (Crusoe) | Compute & power | Brief drill (power gating) + dated claim on capacity timelines |
| 4 | Databricks — enterprise AI, service-as-software | Economics; Application | Field rep: platform-strategy class; concept tag `services-as-software` |
| 5 | OpenAI infra + token supply/demand | Inference & serving | Briefs (token economics, utilization) + field rep vs problem 023's frame |
| 6 | Enterprise internal knowledge; LLM year in review; era of experience | Model layer; Application | Briefs (post-training, RL environments) + field rep: discovery class |
| 7 | Baseten — inference cloud | Inference & serving | Brief (latency–throughput–cost) + build/buy/partner field rep |
| 8 | Vercel — coding AI, software 2.0 | Application layer | Field rep: DPM-Codex-flavored platform read + dated claim |

Protocol: each week's material produces **at least one field rep and one Gnomon claim**; concepts encountered without a matching brief append to the brief backlog the same way unmapped situations append to the gap log (§5). The syllabus ends; the protocol doesn't — podcasts, earnings calls, and papers enter the same pipe.

### What this changes elsewhere

- **Schema:** problems gain optional `concepts: []`; a new `briefs` bank (`briefs.js`) with its own worked-explainer format; the trace and scheduler treat briefs as first-class reps.
- **Scan:** the monthly battery adds a technical-floor spot check — 2–3 cold briefs, graded blind.
- **Backlog discipline:** Wave 2's Agent Architecture / Enterprise Integration / Frontier-Lab / Market stubs (§3) must carry concept tags at authoring time; the ~45 v1 briefs are authored in cluster order of interview weight: inference & serving → model layer → silicon & memory → economics → application → compute & power.
