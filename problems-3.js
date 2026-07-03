/* Parabolic 100 — problem bank, part 3 (problems 018–025) */

P100.PROBLEMS.push(

/* ============================================================ 018 */
{
  id: "018",
  title: "Pilot Purgatory",
  difficulty: "Medium",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Customer",
  archetype: "Grower",
  secondaryArchetype: "Builder",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "OpenAI DPM (Codex)"],
  tags: ["pilot-to-production", "change-management", "ownership", "renewal"],
  prompt:
    "A sales-ops agent pilot hit every target seven months ago: 4.2/5 satisfaction, ~30 minutes saved per user per day, 50 enthusiastic users. It still has 50 users. The champion who drove it got promoted into another org. IT lists it as \"in evaluation.\" Renewal is in four months. Nobody is against it — it is simply parked. Why is this stuck, and what do you do?",
  arc: {
    start: "A successful pilot aging quietly into a renewal risk — blocked by nothing, owned by no one.",
    mid: "Diagnose the vacuum: success created no decision, and decisions need owners with budgets.",
    end: "A forced expand-or-kill decision in front of the exec whose P&L captures the value.",
  },
  expected: {
    bottleneck: "No scale owner and no forcing function — the pilot's success never created a decision, and the person who would have forced one got promoted away.",
    failureMode: "Renewal arrives carrying a 'successful pilot' and no deployment: churn, or a zombie renewal at pilot scale — while 30 minutes a day across 4,000 sellers sits unclaimed.",
    nextMove: "Manufacture the decision: quantify the unclaimed value (pilot delta × target population), identify the economic owner — the CRO org, since it is seller time — put a 30-day ring-based scale plan with training, support, and telemetry gates in front of them, and force an explicit expand-or-kill call before renewal.",
    metric: "Value-at-scale projection: minutes saved × sellers × working days × loaded cost — the number that makes an executive own a decision.",
    owner: "A new economic owner with budget authority — the CRO or sales-ops VP whose P&L captures the seller time. The ownership vacuum is the actual blocker.",
    falsifier: "If, shown the value math, no executive will own the rollout, the pilot's success never touched a business priority — that is a scenario-selection lesson, and the clean move is to kill it, not to keep nursing it.",
  },
  modelAnswer:
    "Diagnose precisely: this is not resistance, budget, or technology. The pilot succeeded and then nothing forced a decision. Pilots do not scale themselves — scaling is a decision, decisions need owners, and the owner left. Seven months of 'in evaluation' is what an ownership vacuum looks like on a status report.\n\nThe move is to manufacture the decision. (1) Do the value math: 30 minutes/day × 4,000 sellers ≈ 2,000 seller-hours per working day, unclaimed for seven months. Conservative dollarization of that number is your entire argument. (2) Find the economic owner — not IT: it is seller time, so it is the CRO org's P&L. The pitch to that executive is one slide: proven per-seller delta, value at scale, cost of another parked quarter. (3) Arrive with the plan, not just the number: 30-day ring-based rollout, training and support model, telemetry gates, pilot users recruited as reference sellers — make yes cheap to say. (4) Put an explicit expand-or-kill decision on an executive calendar before renewal, and mean the kill option: it is what makes the analysis credible rather than vendor advocacy.\n\nRe-championing matters but follows ownership: champions communicate the decision; the P&L owner makes it. Get the owner, and the rest is a rollout plan you already know how to run.",
  rubric: {
    diagnosis: "Names the ownership vacuum and missing forcing function — not 'change management' in the abstract, not resistance.",
    move: "Manufactures an expand-or-kill decision with the economic owner, arriving with value math and a ready ring plan.",
    measurement: "Value-at-scale projection as the decision-forcing number; falsifier lets 'no owner will claim it' condemn the scenario itself.",
    synthesis: "Sees that a credible kill option is what converts advocacy into analysis — and that champions follow owners, not the reverse.",
    altitude: "The CRO pitch is one slide and one ask: scale on this plan, or stop paying.",
    transfer: "Maps to the deployed-product growth loop: pilots convert on forced decisions with economic owners, or they decay.",
  },
  adversarial:
    "Diagnosing 'change management' generically misses the mechanism: success without a decision-forcing function decays — nothing was mismanaged; nothing was decided. Relaunching enthusiasm at the same 50 users is motion without progress; the blocked resource is an owner, not energy. And if your plan had no kill option, executives will smell advocacy and defer again — the credible willingness to kill it is precisely what makes 'scale it' believable. Naming 'IT' as the owner repeats the original mistake: IT does not own seller time.",
  recursiveFollowup:
    "The CRO says yes — but wants all 4,000 sellers live in 30 days, 'rip the band-aid.' Your support model handled 50. Take the yes as offered, or shape it? What do you say in that meeting?",
  altitude: {
    exec:
      "Your pilot proved 30 minutes a day per seller. Across 4,000 sellers that's two thousand selling hours a day, parked for seven months because nobody owns the yes. I need one decision before renewal: scale it on this 30-day plan, or kill it and stop paying. Both are better than parked.",
    engineer:
      "Before scale: telemetry that survives 4,000 users, an onboarding flow that isn't white-glove, a support path with deflection content from pilot tickets, and usage instrumentation per ring so the gates are data, not sentiment.",
    frontier:
      "Pilot-to-production is the enterprise AI story: adoption decays without a forced scale decision, and the decision-maker is whoever's P&L captures the value. The transferable motion is value quantification plus a ready rollout plan plus a genuine kill option — that triplet is what converts pilots.",
  },
},

/* ============================================================ 019 */
{
  id: "019",
  title: "The 20,000-Seat Ring Plan",
  difficulty: "Hard",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Eval",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng"],
  tags: ["rollout", "rings", "gates", "works-council", "support-scaling"],
  prompt:
    "After a lighthouse win, a global insurer commits Copilot plus three agents to 20,000 employees across 14 countries. The CIO wants \"everyone live in Q1.\" EU works-council consultations haven't started, the helpdesk is 40 people, telemetry exists only for the lighthouse group, and training is a deck. You're asked for the deployment plan. Design it.",
  arc: {
    start: "A big-bang mandate with four unsolved dependencies and one immovable quarter.",
    mid: "Rings with pass/fail gates; the works-council clock starts today; support scales on deflection, not headcount.",
    end: "R0–R2 live in Q1 with evidence at each gate, and a credible full-fleet date the CIO can defend.",
  },
  expected: {
    bottleneck: "Rollout architecture: 'everyone in Q1' has no feedback loop and no legal runway — the EU works-council consultation is the longest pole and hasn't started.",
    failureMode: "Big-bang: the 40-person helpdesk drowns in week one, a works-council violation stalls the EU indefinitely, and 20,000 bad first days permanently cap adoption — you get one first impression per employee.",
    nextMove: "Ring the rollout with gates: R0 IT and champions (~500), R1 a friendly business unit (~2,500), R2 regional waves — each ring passes explicit gates (tickets per 1,000 users, activation, task success, sentiment) before the next opens; works-council engagement starts today in parallel; support scales via deflection content mined from each ring's tickets; Q1 means R0–R2 live plus a credible fleet date.",
    metric: "Support tickets per 1,000 users per ring — the capacity gate — alongside activation and weekly-active usage per ring.",
    owner: "You own the ring gates; regional deployment leads own their waves; counsel owns the works-council track; the helpdesk lead owns the deflection pipeline.",
    falsifier: "If R1 passes its gates with wide margins — low tickets, high activation — collapse the remaining rings and accelerate; a plan that can only slow down is bureaucracy, not engineering.",
  },
  modelAnswer:
    "Reframe the CIO's ask before designing anything: 'everyone live in Q1' is not the goal — 'everyone adopted, nobody's first day ruined' is; the calendar is negotiable, first impressions are not. You get exactly one first day per employee, and a big-bang spends all 20,000 of them on your least-prepared week.\n\nThe plan: (1) Rings with teeth. R0: IT plus champions, ~500 — instrument everything, harvest every ticket. R1: one friendly business unit, ~2,500 — the dress rehearsal. R2+: regional waves. Each ring opens only when the previous one passes published gates: tickets per 1,000 users under threshold, activation above it, task success and sentiment holding. Gates cut both ways — R1 passing with margin collapses the later rings and accelerates; that clause is what sells gating to a CIO who heard 'slow.' (2) Start the works-council clock today. Consultation timelines in Germany and France are the longest pole in this plan; EU rings schedule after engagement starts, not after it concludes. This track, not enthusiasm, decides whether Q1 means anything in Europe. (3) Scale support by deflection, not headcount: R0/R1 tickets become self-serve content and champion playbooks before the big rings land; 40 agents survive 20,000 users only if the common questions never reach them. (4) Telemetry from day one, per ring — the gates are data or they are theater.\n\nTo the CIO: Q1 delivers R0–R2 live, gates passed, and a fleet-completion date with evidence behind it — which is a better board slide than a big bang and a support meltdown.",
  rubric: {
    diagnosis: "Identifies the missing feedback loop and names the works-council runway as the longest pole — not generic 'too fast.'",
    move: "Rings with published pass/fail gates, parallel legal track starting now, and support scaled via deflection content.",
    measurement: "Tickets per 1,000 users as the capacity gate plus activation per ring; falsifier commits to accelerating on strong margins.",
    synthesis: "Sees first impressions as a non-renewable resource and gate-acceleration as the political price of gating at all.",
    altitude: "CIO answer trades 'everyone in Q1' for 'evidence in Q1, fleet date you can defend' without reading as slow.",
    transfer: "Maps to canary/staged-GA launch discipline: exposure rings, promotion gates, and support capacity as a launch constraint.",
  },
  adversarial:
    "A textbook ring diagram without the works-council path fails this specific problem — the EU legal runway starts today or Q1 is fiction in six countries, and no amount of ring elegance fixes that. Second miss: scaling support by requesting headcount; the mechanism that survives contact is deflection content mined from earlier rings. Third: gates with no acceleration clause — if your plan can only slow down, the CIO hears bureaucracy and is right. And champions were budgeted zero minutes in most answers: R0 exists to mint them.",
  recursiveFollowup:
    "R1 data: activation 68%, tickets well under gate, but one country's works council demands agent-decision transparency reports your telemetry can't yet produce. Ship the other 13 countries or hold the ring? Defend it.",
  altitude: {
    exec:
      "Everyone gets Copilot; nobody gets a bad first day. Rings with pass/fail gates get us fleet-wide on evidence — and the EU consultation clock starts today, which is the thing that actually protects your Q1. If ring one passes with margin, we collapse the schedule and go faster.",
    engineer:
      "Per-ring telemetry: activation, WAU, task success, tickets per thousand. Gate thresholds published before R0. Deflection pipeline: top ticket clusters become self-serve content within a week. Ring promotion is a data review, not a meeting vibe. Rollback per ring: license freeze, not uninstall.",
    frontier:
      "This is staged-exposure launch engineering: rings as canaries, promotion on published gates, support capacity as a first-class launch constraint, and legal/regulatory runway as the critical path. The transferable skill is designing gates that can accelerate — evidence should move schedules in both directions.",
  },
},

/* ============================================================ 020 */
{
  id: "020",
  title: "One-Off or Platform Gap?",
  difficulty: "Medium",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Platform",
  secondaryLens: "Customer",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform", "OpenAI DPM (Codex)"],
  tags: ["product-feedback", "pattern-recognition", "field-signal", "workarounds"],
  prompt:
    "In five weeks, three different enterprise customers hit versions of the same wall: agents can't operate across tenant boundaries for their subsidiary structures. Each account team filed a separate feature request; engineering triaged each as an edge case and closed them. You're the only person who has seen all three. What do you do?",
  arc: {
    start: "Three 'edge cases' that are one pattern, invisible to everyone but you.",
    mid: "Change the shape of the evidence: from three anecdotes to one quantified market signal.",
    end: "A platform-gap brief with named design partners — and one sanctioned interim workaround instead of three hacks.",
  },
  expected: {
    bottleneck: "Field-signal aggregation: the feedback channel strips evidence — product sees three isolated anecdotes, and nobody owns pattern detection across accounts.",
    failureMode: "The gap persists, three account teams build three divergent hacky workarounds that become support debt, and the platform never learns — or you overcorrect and pitch a niche need as strategy.",
    nextMove: "Build the pattern case: one consolidated platform-gap brief — workload shape, customers and pipeline affected, revenue at risk, workaround cost, proposed capability shape (not a spec) — delivered to product as a market signal with named design partners; meanwhile converge the field on one sanctioned interim workaround.",
    metric: "Breadth × severity: accounts affected (including pipeline checked via CRM) × workaround cost per account — the arithmetic that distinguishes pattern from anecdote.",
    owner: "You as the field-signal owner; a product PM counterpart who receives patterns rather than tickets; the three accounts as named design partners.",
    falsifier: "If a broader field query and telemetry check shows it really is just these three — similar unusual org structures — it is an edge case, and saying so preserves the credibility of your next pattern claim.",
  },
  modelAnswer:
    "Engineering triaged correctly given what it could see: three separate tickets, each rare. The failure is structural — the feedback channel strips evidence, and nobody owns cross-account pattern detection. You do, as of five weeks ago.\n\nThe move is to change the shape of the evidence. (1) Verify the pattern before amplifying it: query the field community and whatever telemetry exists — is it three accounts or thirty? Check pipeline for the same subsidiary structures. If it is genuinely three, say so and stand down; spent credibility on a false pattern taxes every future brief. (2) If it holds, write the platform-gap brief: the workload shape in common (multi-entity enterprises needing agents across tenant boundaries), accounts and revenue affected including pipeline, what workarounds cost per account, competitive exposure, and a proposed capability shape — the problem contour, not a spec; product owns the solution. (3) Attach named design partners: three enterprises volunteering to co-develop converts a complaint into an opportunity. (4) Meanwhile, converge the field on one sanctioned interim workaround — three divergent hacks are three future support liabilities and three migration projects when the real capability ships.\n\nThis is the highest-leverage motion in the platform-adjacent job: one person turning field noise into roadmap signal, with arithmetic instead of adjectives.",
  rubric: {
    diagnosis: "Names the structural failure — evidence-stripping feedback channels, unowned pattern detection — not 'engineering was wrong.'",
    move: "Verifies first, then ships a quantified gap brief with design partners and converges the field on one interim workaround.",
    measurement: "Breadth × severity arithmetic including pipeline; falsifier genuinely allows the edge-case verdict.",
    synthesis: "Sees both failure directions — pattern-blindness and pattern-mania — and treats credibility as the channel's capital.",
    altitude: "Exec framing lands the reframe: not three edge cases, but the platform telling us where enterprises are headed.",
    transfer: "This is the API-platform TPM loop itself: deployment friction converted into roadmap with evidence.",
  },
  adversarial:
    "Filing a louder, angrier feature request is not the job — the job is changing the evidence's shape: from 'customer wants X' to 'N customers, $Y at risk, workaround costs Z, workload looks like W.' If you skipped the verification step, you risk the worse failure: a pattern claim that telemetry refutes destroys the channel you were trying to build — product remembers false alarms. And leaving the three accounts on three divergent hacks means that even if the capability ships, you own three bespoke migrations and the support debt in between.",
  recursiveFollowup:
    "Product agrees it's real — and roadmaps it three quarters out. The largest of the three customers threatens to build off-platform now. Design the bridge that keeps them without distorting the roadmap.",
  altitude: {
    exec:
      "Three strategic customers hit the same wall in five weeks — that's not three edge cases, that's the platform telling us where multi-entity enterprises are headed. Here's the revenue at risk, the workaround cost, and three design partners ready to build with us.",
    engineer:
      "One consolidated brief: common workload shape, boundary conditions, what each workaround does and costs, telemetry queries to size the population. One sanctioned interim pattern for the field, documented, with a migration note for when the real capability lands.",
    frontier:
      "Platform TPM core loop: the field sees the future before telemetry does, but only quantified patterns move roadmaps. The transferable skill is evidence-shaping — breadth × severity × pipeline — plus the discipline to verify before amplifying, because the channel's credibility is the asset.",
  },
},

/* ============================================================ 021 */
{
  id: "021",
  title: "The $40M Feature Demand",
  difficulty: "Hard",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Platform",
  secondaryLens: "Altitude",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform"],
  tags: ["roadmap-pressure", "negotiation", "precedent", "need-decomposition"],
  prompt:
    "Your largest account — $40M ARR, renewal in five months — demands on-premises inference for one workload class as a renewal condition. The sales VP wants a signed roadmap commitment letter this week. Engineering estimates 18 months and calls it strategy distortion. The CVP asks for your recommendation. What is it?",
  arc: {
    start: "A renewal hostage situation dressed as a feature request, with a letter waiting for a signature.",
    mid: "Decompose the ask into the need; price the precedent; build alternatives worth negotiating with.",
    end: "A decision memo with options, a walk-away line — and probably a 90-day pilot instead of an 18-month letter.",
  },
  expected: {
    bottleneck: "Strategic-fit evaluation under account pressure: the ask (on-prem) is probably a proxy for a need (isolation, residency, board optics) that has cheaper satisfactions — and nobody has decomposed it.",
    failureMode: "Sign the letter: roadmap distorted for one account and every large customer learns renewals move roadmaps — or refuse flatly and churn the biggest logo. Both are failures of decomposition, not of nerve.",
    nextMove: "Decompose ask into need (residency? latency? compliance optics?), build two or three alternatives with engineering costs — dedicated capacity, VPC-style isolation, contractual data guarantees — check CRM for how many other accounts would invoke the same commitment, and hand the CVP a decision memo: options, precedent cost, churn probability, walk-away line. Negotiate a 90-day pilot of an alternative instead of a letter.",
    metric: "Precedent cost: the count of other accounts (booked and pipeline) that would invoke the same commitment once it exists — the number that reframes a one-customer decision.",
    owner: "The CVP decides; you own the decision memo; engineering prices the alternatives; sales runs the negotiation carrying the new options.",
    falsifier: "If decomposition shows the need is real, regulatory, and spreading across the segment — sovereign requirements, say — then it is not hostage-taking but early market signal, and the roadmap should move; the account just found it first.",
  },
  modelAnswer:
    "The question as posed — sign or refuse — is the trap. Both answers accept the customer's framing that the ask and the need are the same thing. Your job is to break that equation before the CVP has to decide anything.\n\n(1) Decompose the demand. 'On-premises inference' is an implementation. The need underneath is usually data isolation, latency, regulatory residency, or board-level optics — each satisfiable years cheaper: dedicated capacity, VPC-style single-tenant isolation, contractual data-handling guarantees, a compliance package with auditor access. Have the conversation that finds out which; nobody has had it yet, because sales negotiates asks, not needs. (2) Price the precedent. Query the CRM: how many booked and pipeline accounts would invoke the same commitment the day it exists? A $40M account's special term that forty other accounts will demand is not a $40M decision. That number goes in the memo. (3) Build the walk-away line. What is the churn probability actually — and what does serving this workload class cost versus losing it? A CVP without a walk-away position is negotiating with hope. (4) Recommend the trade: a 90-day pilot of the isolation alternative against their real workload, instead of an 18-month letter. It gives their sponsor something to take to their board this quarter — which is usually what the demand was actually about.\n\nIf decomposition reveals the need is real and spreading — sovereignty requirements moving through the segment — then the roadmap should move, and this account is your design partner, not your hostage-taker. The memo must be able to reach that conclusion honestly.",
  rubric: {
    diagnosis: "Refuses the sign-or-refuse frame; names ask-versus-need decomposition and unpriced precedent as the real work.",
    move: "Builds costed alternatives, negotiates a piloted trade instead of a letter, and arms the CVP with a decision memo including a walk-away line.",
    measurement: "Precedent cost via CRM as the ruling number; falsifier lets the demand turn out to be genuine market signal.",
    synthesis: "Sees the demand may be board optics in infrastructure clothing — and that the memo must honestly allow 'the roadmap should move.'",
    altitude: "CVP answer is options-and-recommendation, not advocacy: decompose, price, trade, with the walk-away stated.",
    transfer: "Maps to the lab-enterprise tension exactly: on-prem/VPC demands versus platform integrity, resolved by need decomposition.",
  },
  adversarial:
    "\"Never let one customer drive the roadmap\" is a poster, not an answer — at $40M, the honest analysis might be that the segment is speaking through this account, and your memo must be able to say so. The opposite indulgence: treating the sales VP's letter as unserious; renewal pressure is real and five months is short. If your answer had no walk-away line, the CVP has no negotiating position; if it never checked whether other accounts share the need, you cannot distinguish hostage-taking from market signal — and those have opposite correct responses.",
  recursiveFollowup:
    "Decomposition lands: 70% board optics, 30% genuine latency. Sales insists the deal language must contain the words 'on-premises' somewhere. Draft the commitment sentence you could actually sign — and the one you couldn't.",
  altitude: {
    exec:
      "Before we trade the roadmap for a renewal: the ask is on-prem, but the need might be isolation we can pilot in 90 days. Here are three alternatives with costs, the precedent price of the letter — forty accounts would invoke it — and my recommendation, including where we walk.",
    engineer:
      "Cost out dedicated-capacity and single-tenant isolation options against their workload class: latency profile, residency guarantees, audit surface. What we need from them: the actual requirement doc behind 'on-prem,' not the procurement language.",
    frontier:
      "Labs face this weekly: enterprise demands for deployment models that cut against platform strategy. The transferable discipline is ask-versus-need decomposition, precedent pricing across the book, and trading pilots for letters — while staying honest that some demands are the market arriving early.",
  },
},

/* ============================================================ 022 */
{
  id: "022",
  title: "Extensibility Cliff",
  difficulty: "Medium",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Platform",
  secondaryLens: "Architecture",
  archetype: "Builder",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Apps Platform", "OpenAI DPM (Codex)"],
  tags: ["extensibility", "pro-code", "retention", "honest-mapping"],
  prompt:
    "Your most sophisticated customer has outgrown declarative agent configuration — they need custom orchestration, external tool calls, and complex state. Their engineering team has decided to abandon the platform and build directly on raw model APIs. The account team is panicking. The platform's pro-code tier exists, but the customer never seriously evaluated it — partly because nobody positioned it. What do you do?",
  arc: {
    start: "An advanced customer at the exact ledge where the platform's ladder wasn't legible.",
    mid: "An honest capability-mapping workshop: their must-haves versus the pro-code tier's reality.",
    end: "A hybrid architecture keeping governance on-platform — and their gaps feeding the roadmap as design-partner signal.",
  },
  expected: {
    bottleneck: "Extensibility-path legibility: the ladder from low-code to pro-code wasn't visible at the moment they hit the ceiling — the customer is deciding against a tier they've never actually evaluated.",
    failureMode: "They build raw and lose platform identity, governance, and telemetry — enterprise IT loses visibility, and the platform loses its most roadmap-defining customer. Or you oversell the pro-code tier, they discover the gaps in month two, and the burned trust ends the relationship anyway.",
    nextMove: "Run an honest capability-mapping workshop: their must-have requirements against what the pro-code tier genuinely supports today — including what it doesn't; design the hybrid (platform for identity, governance, UX surface; custom orchestration where truly needed); route their gaps to product as design-partner signal; and if some workloads genuinely belong on raw APIs, say so out loud.",
    metric: "Requirement coverage: the percentage of their must-haves the pro-code path genuinely meets today — the honest number, not the sales number.",
    owner: "Their engineering lead plus your platform architect run the mapping; a product PM owns the gap channel.",
    falsifier: "If the coverage map shows under half their must-haves supported, pushing the platform is the wrong call — bless the raw build with governance guardrails and sign them as design partners for the next platform generation.",
  },
  modelAnswer:
    "First, reframe the panic: this customer isn't leaving because the platform failed — they graduated past the easy tier, and nobody showed them the next rung at the moment they reached for it. Advanced customers hitting ceilings is what platform success looks like; losing them silently at the ceiling is the failure.\n\nThe move: (1) An honest capability-mapping workshop — their engineering lead and your platform architect, requirements against pro-code reality. Honest is the operative word: sophisticated teams detect overselling in one sprint, and the trust cost of a hollow 'yes it can' exceeds the workload cost of a true 'it can't yet.' Produce the coverage number: what percentage of their must-haves the pro-code tier genuinely meets today. (2) Design the hybrid, because all-or-nothing is a false choice: identity, governance, tenant telemetry, and the user-facing surface stay on-platform; custom orchestration runs where it must. Keeping 70% on-platform beats losing 100% — and keeps enterprise IT's visibility intact, which their own CISO will thank you for. (3) Convert their gaps into design-partner signal: the requirements of your most advanced customer are the platform's roadmap arriving early, and formalizing that channel is more valuable than this quarter's workload placement. (4) If the coverage number is genuinely low, bless the raw build — with governance guardrails — and stay close. The relationship outlives the architecture decision; being the vendor who told the truth is a durable position.",
  rubric: {
    diagnosis: "Names the legibility failure — deciding against an unevaluated tier — and reads graduation, not defection.",
    move: "Honest coverage mapping, hybrid architecture keeping governance on-platform, and a formal gap-to-roadmap channel.",
    measurement: "The genuine requirement-coverage percentage as the ruling number; falsifier blesses the raw build below threshold.",
    synthesis: "Sees that advanced-customer gaps are the roadmap arriving early, and that truth-telling is the retention strategy.",
    altitude: "Exec answer converts 'we're losing them' into 'they outgrew the easy tier; here's the next rung and what we keep.'",
    transfer: "This is the apps-platform strategy question itself: platform gravity is defined by what advanced customers do at the ceiling.",
  },
  adversarial:
    "Fighting to keep 100% of the workload on-platform is how you lose 100% of it — sophisticated teams smell overselling instantly, and the cost lands on the relationship, not just the workload. The counter-error: waving them to raw APIs without pricing what they lose — identity, DLP, tenant governance, support, and their own IT's visibility; 'freedom' has an ops bill they haven't scoped. If your answer didn't produce the honest coverage number, both errors stay available. And their departure-shaped feedback is the platform's most valuable roadmap input — leaving it uncaptured is the silent third failure.",
  recursiveFollowup:
    "Their eng lead says: \"Your SDK promises custom tools, but auth for external actions is undocumented and support tickets sit for weeks. The gap isn't capability — it's platform operations.\" Rewrite your product feedback accordingly. What changes?",
  altitude: {
    exec:
      "They're not leaving because the platform failed — they outgrew the easy tier and nobody showed them the next rung. We map their needs against the pro-code path honestly, keep identity and governance on-platform, and turn their gaps into our roadmap. If some workloads belong on raw APIs, we say so — and keep the customer.",
    engineer:
      "Requirements-to-capability matrix: orchestration, external tool auth, state management, eval hooks — supported / partial / absent, with dates only where product commits. Hybrid reference architecture: platform identity and governance wrapping custom orchestration. No aspirational rows.",
    frontier:
      "Apps-platform gravity is decided at the extensibility cliff: whether advanced builders can graduate tiers without leaving. The transferable judgment is honest capability mapping over retention theater — the most sophisticated customer's gap list is the next platform generation's spec.",
  },
},

/* ============================================================ 023 */
{
  id: "023",
  title: "Inference Capacity Crunch",
  difficulty: "Hard",
  category: "Frontier-Lab Transfer",
  primaryLens: "Platform",
  secondaryLens: "Market",
  archetype: "Maintainer",
  secondaryArchetype: "Sweeper",
  targetRoles: ["Anthropic TPM Cloud Inference", "Anthropic TPM Inference Perf", "CAPE SCPM"],
  tags: ["capacity", "allocation", "slo", "scarcity", "sales-alignment"],
  prompt:
    "A new model release triples API demand in ten days. GPU capacity is constrained for at least a quarter. Enterprise customers with contractual capacity are hitting rate limits, self-serve is degrading, sales is still signing deals with capacity promises, and exceptions are being granted to whoever escalates loudest. You own capacity allocation. Stabilize it.",
  arc: {
    start: "Scarcity being allocated by escalation volume, while sales sells capacity that doesn't exist.",
    mid: "Publish an allocation framework: tiers, degradation order, a sell-stop, honest customer dates.",
    end: "Promises kept in priority order, demand shaped, and a weekly capacity council instead of a hallway auction.",
  },
  expected: {
    bottleneck: "No allocation policy under scarcity — first-come and loudest-voice allocation is breaking contractual promises in random order, and the sales pipeline is adding demand against capacity that doesn't exist.",
    failureMode: "Ad-hoc exceptions compound: contractual SLA breaches surface, strategic customers churn to competitors' capacity, every exception becomes precedent, and internal workloads get starved or protected by politics rather than policy.",
    nextMove: "Publish an explicit allocation framework: tiers by commitment (contractual SLA > committed spend > self-serve) with a published degradation order; stop selling unallocated capacity — the hardest conversation, have it first; give customers honest dates and shaped alternatives (batch, off-peak, caching, smaller-model routing); and run a weekly capacity council with one named owner so exceptions become rulings, not precedents.",
    metric: "SLA attainment for contractual tiers, plus rate-limit rejections by customer tier — are we breaking promises, and to whom, in what order?",
    owner: "You own the framework and the council; sales leadership owns enforcing the sell-stop; infra owns the supply roadmap and its dates.",
    falsifier: "If demand-shaping — batching, caching, routing to smaller models — recovers 20%+ effective capacity within two weeks, the crunch was partly an efficiency problem, and the sell-stop can lift earlier than the supply date implies.",
  },
  modelAnswer:
    "Name the actual state first: capacity is being allocated by escalation volume, which means the company is breaking its promises in random order. Under scarcity, allocation is a product decision with a policy, or it is a daily auction that burns trust on both sides of the API.\n\nThe framework: (1) Tier by commitment — contractual SLAs first, committed-spend second, self-serve third — with a published degradation order, so what happens under pressure is a documented behavior, not a surprise. Internal and research workloads get an explicit allocation too; otherwise that fight happens in hallways and the loudest lab wins. (2) Stop the bleeding at the source: sales must stop selling unallocated capacity, today. It is the hardest conversation in this scenario and the test of whether you actually own allocation — every new promise is written against customers you already can't serve. (3) Tell customers the truth with dates: enterprises can plan around honest scarcity; they cannot plan around surprise 429s. Pair every constraint with a shaped alternative — batch and off-peak windows, caching, smaller-model routing for tolerant workloads. Demand-shaping is real capacity: if it recovers 20%, the sell-stop lifts early. (4) Governance: a weekly capacity council, one named owner, exception decisions recorded with reasons — so a ruling is a precedent by design rather than by leak.\n\nScarcity handled with a legible policy builds more enterprise trust than abundance ever does; scarcity handled by exception destroys it at both ends.",
  rubric: {
    diagnosis: "Names allocation-by-escalation as promise-breaking in random order, and the sales pipeline as compounding the deficit.",
    move: "Publishes tiers and degradation order, executes the sell-stop, shapes demand, and installs a council with one owner.",
    measurement: "SLA attainment and rejections by tier; falsifier lets efficiency gains shorten the commercial freeze.",
    synthesis: "Sees trust economics on both sides — customers and internal teams — and that published policy converts exceptions into rulings.",
    altitude: "Exec answer lands the core reframe: customers forgive scarcity with dates; they don't forgive surprise.",
    transfer: "This is the cloud-inference TPM seat; CAPE translation is any constrained-allocation program run against enterprise promises.",
  },
  adversarial:
    "Answering only with demand-shaping tech — batching, caching, routing — ducks the political core: someone must tell sales to stop selling, and tell a named customer they rank behind another. If your framework isn't published, it isn't a framework; it's a queue of exceptions you'll re-litigate weekly. If internal/research workloads got no explicit allocation, you left the fiercest allocation fight to hallway politics. And a framework without a single named owner is a committee — under scarcity, committees are how loudest-voice allocation returns wearing a process costume.",
  recursiveFollowup:
    "A $30M prospect demands guaranteed capacity to sign — capacity that would consume an existing customer's contractual headroom. The sales VP escalates to your council. Write the two-sentence ruling and the principle it sets.",
  altitude: {
    exec:
      "Right now we're breaking promises in random order. This framework decides who gets capacity, publishes what degrades first, and stops selling what we don't have — customers forgive scarcity with dates; they don't forgive surprise. Shaping demand buys back capacity while supply catches up.",
    engineer:
      "Tiered rate limiting keyed to contract class; published degradation ladder; batch and off-peak lanes; cache and small-model routing for tolerant workloads; per-tier SLA attainment and rejection dashboards; weekly council with recorded exception rulings.",
    frontier:
      "Capacity allocation under scarcity is core inference-TPM work: commitment-tiered policy, published degradation, sales alignment, and demand-shaping as recovered supply. The transferable principle: legible scarcity builds more trust than opaque abundance — and every unwritten exception is a precedent you didn't choose.",
  },
},

/* ============================================================ 024 */
{
  id: "024",
  title: "Safeguards Eval Gate",
  difficulty: "Medium",
  category: "Frontier-Lab Transfer",
  primaryLens: "Eval",
  secondaryLens: "Platform",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["Anthropic TPM Safeguards & Evals", "CAPE SCPM"],
  tags: ["safety-evals", "gates", "flakiness", "developer-experience"],
  prompt:
    "The model-ship gate includes a safety eval suite: fourteen hours to run, ~8% flake rate. Last quarter there were two near-misses — teams shipping on stale results or re-running until green. Researchers now openly argue the suite should be advisory-only. Safeguards insists it stays mandatory. You own the eval infrastructure, and both sides think you're on their side. What do you do?",
  arc: {
    start: "A values fight — velocity versus safety — that is actually an infrastructure problem in disguise.",
    mid: "Make the gate fast and trustworthy; make overrides signed and visible; separate the infra fix from the policy fight.",
    end: "A gate teams don't route around — and a real escalation path for the day the gate says no and it matters.",
  },
  expected: {
    bottleneck: "Gate reliability and latency: fourteen flaky hours make compliance expensive, so pressure to bypass is rational — the fight is framed as values but the binding constraint is infrastructure.",
    failureMode: "Advisory-only prices tail risk at zero — the one launch that needed blocking ships. Mandatory-but-flaky breeds re-run-until-green culture, which means the gate already doesn't work and everyone is pretending. Both roads end in a gate that protects nothing.",
    nextMove: "Treat the gate as a product with SLOs: quarantine flaky evals so they can't block (and fix them on a dated track), parallelize and cache toward a sub-2-hour runtime, define result-staleness policy, tier the gating — fast smoke suite on every candidate, full suite on release candidates — and make overrides possible but costly: a signed risk acceptance, visible to leadership, counted.",
    metric: "Gate flake rate and override/bypass count per quarter — the honesty metrics of any gate: if people route around it, it isn't working, whatever the policy says.",
    owner: "You own gate infrastructure SLOs; safeguards owns the bar (what is tested and what blocks); a named executive owns override authority.",
    falsifier: "If after the reliability fixes teams still bypass, the dispute is genuinely about the bar, not the tooling — that is a policy negotiation between safeguards and research leadership, and continuing to 'fix infrastructure' would waste your credibility on the wrong problem.",
  },
  modelAnswer:
    "Refuse both sides' framing first. This is not velocity versus safety — not yet. A gate that takes fourteen flaky hours is already being bypassed via re-run-until-green, which means the mandatory gate is currently advisory with extra steps and worse data. Nobody is defending safety by defending this implementation.\n\nThe move: (1) Make the gate deserve its authority. Quarantine flaky evals immediately — a test that fails 8% of the time on noise cannot be allowed to block, and every false red teaches teams to distrust true reds; quarantined evals get a dated fix-or-delete track. Parallelize and cache toward a sub-2-hour full suite. Publish the gate's own SLOs and its reliability dashboard — flake rate, runtime, and override count, in the open. (2) Tier it: a fast smoke suite on every candidate, the full suite on release candidates — most of the fourteen-hour pain is paid where it buys nothing. (3) Design the override instead of pretending there won't be one: a signed risk acceptance from a named executive, visible, counted, reviewed quarterly. Overrides you can see are governance; overrides you can't are culture rot. (4) Then — only then — if teams still push to bypass a fast, reliable gate, take the real policy fight to safeguards and research leadership, because at that point it is genuinely about the bar, and that negotiation is above your pay grade to settle by tooling.\n\nGate legitimacy is earned through gate quality. The infrastructure fix doesn't dodge the values question — it reveals whether there ever was one.",
  rubric: {
    diagnosis: "Sees through the values framing to the infrastructure constraint — and names re-run-until-green as a bypass already in progress.",
    move: "Quarantines flakes, tiers the gating, cuts runtime with SLOs, and designs signed visible overrides rather than denying the emergency case.",
    measurement: "Flake rate and override count as the gate's honesty metrics; falsifier hands the residual fight to policy owners.",
    synthesis: "Understands false reds destroy true reds — reliability is what makes strictness enforceable; legitimacy is earned, not declared.",
    altitude: "Exec answer defuses the standoff: nobody is arguing about safety; they're arguing about fourteen flaky hours.",
    transfer: "CAPE translation: any compliance gate customers route around — change boards, security review — fast paved paths or bypass culture.",
  },
  adversarial:
    "Siding cleanly with either camp fails. 'Safety is non-negotiable' ignores that a flaky gate already isn't protecting anything — re-running until green is a bypass wearing a compliance badge. 'Make it advisory' prices tail risk at zero and will look obvious in the postmortem. The subtle miss: designing no override path at all — emergencies are when unbendable gates get broken, and a gate that has ever been broken quietly is dead. Overrides must be possible, costly, signed, and visible. If your answer fixed the infra but left override authority unnamed, the next 2 a.m. launch decides it ad hoc.",
  recursiveFollowup:
    "You ship it: 90-minute runtime, 1% flakes. A launch-critical eval now shows a real 2-point regression on a deception metric; release is tomorrow; the model owner claims measurement noise. Walk the escalation path you designed — who decides, on what evidence, by when?",
  altitude: {
    exec:
      "Nobody here is actually arguing about safety — they're arguing about fourteen flaky hours. We make the gate fast and trustworthy, make overrides signed and visible, and then if someone still wants to skip it, that's a real conversation about risk, not about tooling.",
    engineer:
      "Flake quarantine with a fix-or-delete SLA; parallelized suite with result caching keyed to model diff class; smoke tier on every candidate, full tier on RCs; staleness policy on results; override workflow requiring a signed risk acceptance; public dashboard: runtime, flake rate, overrides.",
    frontier:
      "Safety-eval infrastructure is legitimacy engineering: gates hold only when compliance is cheap and bypass is visible. The transferable pattern — quarantine flakes, tier the checks, publish the gate's own reliability, price the override — applies to every gate anyone is tempted to route around.",
  },
},

/* ============================================================ 025 */
{
  id: "025",
  title: "Reading the CapEx Tape",
  difficulty: "Medium",
  category: "Market & Capital Calibration",
  primaryLens: "Market",
  secondaryLens: "Customer",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Cloud Inference"],
  tags: ["capex", "market-calibration", "bubble", "falsifiers"],
  prompt:
    "At a QBR, your customer's CFO — who reads earnings calls — asks: \"Hyperscalers are guiding to $400B+ of combined AI capex. If this is a bubble, are we overpaying for compute that's about to get cheap? Should we pause the agent program and wait it out?\" The room goes quiet. Answer the question.",
  arc: {
    start: "A numerate CFO conflating the infrastructure capital cycle with their application decision.",
    mid: "Separate who bears bubble risk from who captures overbuild surplus; anchor to their measured ROI.",
    end: "Keep deploying what measures well, avoid price-structure lock-in, and put dated falsifiers on the calendar.",
  },
  expected: {
    bottleneck: "Conflation of the infrastructure capital cycle with application-layer value — their decision (deploy agents against measured workflows) is nearly independent of whether hyperscaler capex overshoots.",
    failureMode: "Dismiss the question and lose credibility with a numerate CFO — or over-agree, pause the program, and hand competitors two quarters of compounding adoption learning that no price drop buys back.",
    nextMove: "Give the calibrated read: overbuild risk lands on capital providers, while buyers capture the surplus as falling unit costs — so keep deploying where ROI is measured, avoid lock-in that assumes today's price structure, and put dated falsifiable markers (token price trend, utilization disclosures, capex-to-revenue ratios) on the QBR calendar.",
    metric: "Their own cost-per-task and measured task ROI trend — deployment decisions keyed to their numbers, with unit inference costs as the market check.",
    owner: "The CFO owns the capital stance; you own keeping the agent portfolio keyed to measured ROI and bringing the markers each quarter.",
    falsifier: "If inference prices rise for two consecutive quarters — scarcity persisting — or their measured task ROI degrades, the cheap-compute thesis is wrong: re-cost the business cases and re-rank the portfolio.",
  },
  modelAnswer:
    "Take the question seriously — it is the right question asked at the wrong layer. The honest answer has three parts.\n\nFirst, separate the bets. $400B of capex is a bet by capital providers on future compute demand. If it overshoots, the losses land on hyperscaler margins and their investors — while overcapacity competes inference prices down. The telecom overbuild is the analog: carriers bled; everyone who used cheap bandwidth won for two decades. If this is a bubble, your CFO's position is on the winning side of it: a buyer of an input that overbuilding makes cheaper.\n\nSecond, anchor to their numbers. The program's justification was never 'AI is the future' — it is the measured ROI of specific workflows. That math already clears at today's prices; cheaper compute only improves it. Pausing doesn't avoid bubble risk — they carry almost none — it donates two quarters of adoption learning to competitors, and organizational capability compounds in a way price drops never refund.\n\nThird, make it falsifiable, because that is what credibility with a CFO is made of: unit inference prices (should trend down; two rising quarters breaks the thesis), hyperscaler capex-to-revenue and utilization disclosures, and their own cost-per-task trend. Bring them to every QBR. The one genuine caution: avoid lock-in that assumes today's price structure — long committed contracts at current rates, or architectures welded to one vendor's pricing — because the surplus only accrues to buyers who stay flexible enough to capture it.",
  rubric: {
    diagnosis: "Separates the infrastructure capital cycle from the application-layer decision — names who actually bears bubble risk.",
    move: "Keeps the ROI-measured deployments running, flags lock-in as the real exposure, and installs quarterly falsifiable markers.",
    measurement: "Their own cost-per-task and ROI trend as the anchor, with unit price and utilization as market checks; falsifier is dated and specific.",
    synthesis: "Deploys the telecom-overbuild analog correctly — overbuild subsidizes buyers — and prices the pause in forgone compounding, not dollars.",
    altitude: "The CFO answer is direct, numerate, and changes decisions: deploy pace, contract structure, lock-in posture.",
    transfer: "Same tape read from the supply side is lab capacity planning; calibrated market reads are the Gnomon muscle itself.",
  },
  adversarial:
    "Both easy answers fail a numerate CFO: 'AI is the future' is content-free, and 'yes, frothy, be prudent' without decision consequences is punditry. The differentiator is separating who bears the risk (capital providers) from who captures the surplus (buyers), then attaching dated falsifiers. If your answer changed no decision — deploy pace, contract length, lock-in posture — you didn't answer an executive, you performed balance. And if you skipped the lock-in caution, you missed the one way the customer actually can lose the overbuild bet: signing long contracts at pre-glut prices.",
  recursiveFollowup:
    "Two quarters later: inference prices fell 40%, and the customer's measured ROI is flat — cheaper inputs, same value. What does that combination tell you about where their bottleneck actually is, and what do you change?",
  altitude: {
    exec:
      "If it's a bubble, it pops in hyperscaler margins — not in your P&L. Overbuild makes your input cheaper, like the telecom glut made bandwidth cheap. Keep funding the agents with measured ROI, avoid long contracts at today's prices, and I'll bring three falsifiable markers to every QBR so we'd know if I'm wrong.",
    engineer:
      "Portfolio implication: architect for price flexibility — model-agnostic routing, no long unit-rate commitments, cost-per-task telemetry per workflow so falling unit prices show up in our numbers and re-rank the backlog automatically.",
    frontier:
      "Reading capital cycles is the same skill labs use for capacity planning, from the supply side: separate infrastructure bets from application value, define falsifiers before taking a position, and treat organizational learning as the compounding asset a pause can't repurchase.",
  },
}

);
