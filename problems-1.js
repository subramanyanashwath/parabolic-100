/* Parabolic 100 — problem bank, part 1 (meta + problems 001–009)
   Every problem trains the same loop: classify the situation, commit to a move,
   compare against a model answer, schedule the re-rep. */

window.P100 = window.P100 || {};

P100.META = {
  categories: [
    { name: "Scenario Discovery", target: 10 },
    { name: "Agent Architecture", target: 15 },
    { name: "Enterprise Integration", target: 10 },
    { name: "Governance & Risk", target: 10 },
    { name: "Evals & Measurement", target: 15 },
    { name: "Deployment & Change Management", target: 10 },
    { name: "Platform Feedback & Product Strategy", target: 10 },
    { name: "Frontier-Lab Transfer", target: 10 },
    { name: "Market & Capital Calibration", target: 10 },
  ],

  lenses: [
    { id: "Customer", full: "Customer", q: "What is the real business problem? Is this a real scenario or AI theater?" },
    { id: "Architecture", full: "Architecture", q: "What system should exist? Agent shape, data, integration, permissions, lifecycle." },
    { id: "Eval", full: "Eval", q: "How do we know it works? Metrics, failure modes, confidence, calibration." },
    { id: "Deployment", full: "Deployment", q: "What has to happen for this to land? Pilot, rollout, owners, blockers, support." },
    { id: "Platform", full: "Platform", q: "What is reusable? What is product feedback versus a one-off customer issue?" },
    { id: "Market", full: "Market / Capital", q: "What broader force does this reveal? Infra demand, margins, adoption curves." },
    { id: "Altitude", full: "Career / Altitude", q: "Who is asking, and how should the answer change?" },
  ],

  archetypes: [
    { id: "Prototyper", d: "Explores brand-new ideas fast; most are meant to be thrown away." },
    { id: "Builder", d: "Turns a validated idea into production-grade product or infrastructure." },
    { id: "Sweeper", d: "Simplifies, removes, hardens; reduces mess, risk, and surface area." },
    { id: "Grower", d: "Takes what exists and compounds adoption, value, and PMF." },
    { id: "Maintainer", d: "Owns mature-system reliability, security, efficiency, and scale." },
  ],

  roles: [
    "CAPE SCPM",
    "OpenAI FDE",
    "OpenAI Deployment Eng",
    "OpenAI DPM (Codex)",
    "Anthropic TPM Cloud Inference",
    "Anthropic TPM Inference Perf",
    "Anthropic TPM Safeguards & Evals",
    "Anthropic TPM API Platform",
    "Anthropic TPM Apps Platform",
    "MSFT MAI Evals Eng",
    "MSFT MAI Strategy & Ops",
  ],

  /* Standardized rubric dimensions. Every problem grades the same six, 0–3 each.
     Per-problem descriptors live in problem.rubric. */
  rubricDims: [
    { key: "diagnosis", name: "Diagnosis", generic: "Names the real constraint and the dominant failure mode." },
    { key: "move", name: "Next Move", generic: "Chooses the right operating action with a named owner." },
    { key: "measurement", name: "Measurement", generic: "Picks an inspectable metric and a falsifier that could change the call." },
    { key: "synthesis", name: "Synthesis", generic: "Integrates lenses and sees the second-order effect." },
    { key: "altitude", name: "Altitude", generic: "The 20-second exec answer would land in the room." },
    { key: "transfer", name: "Transfer", generic: "The frontier-lab translation is specific and credible." },
  ],

  answerFields: [
    { key: "bottleneck", label: "Primary bottleneck", kind: "text", hint: "The real constraint, in one line." },
    { key: "failureMode", label: "Dominant failure mode", kind: "text", hint: "What breaks if this is mishandled." },
    { key: "nextMove", label: "Best next move", kind: "textarea", hint: "The operating action you would actually take." },
    { key: "metric", label: "First metric to inspect", kind: "text", hint: "The number you would pull first." },
    { key: "owner", label: "Owner / stakeholder", kind: "text", hint: "Who must own this for it to work." },
    { key: "falsifier", label: "Falsifier", kind: "text", hint: "Evidence that would prove your read wrong." },
    { key: "execAnswer", label: "20-second exec answer", kind: "textarea", hint: "What you say in the room, out loud." },
    { key: "frontierTranslation", label: "Frontier-lab translation", kind: "textarea", hint: "How this same judgment shows up inside OpenAI / Anthropic." },
  ],
};

P100.PROBLEMS = [

/* ============================================================ 001 */
{
  id: "001",
  title: "Agent Sprawl Triage",
  difficulty: "Easy",
  category: "Governance & Risk",
  primaryLens: "Customer",
  secondaryLens: "Eval",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Apps Platform"],
  tags: ["agents", "governance", "lifecycle", "measurement"],
  prompt:
    "A Fortune 100 manufacturer has mandated that every business unit build its own Copilot agents this fiscal year. The CIO's office is celebrating momentum: 60+ agent ideas across HR, finance, plant operations, and sales. Nobody owns lifecycle, quality bars, access control, measurement, support, or retirement. The account team wants CAPE to \"pour fuel on the fire\" and accelerate the buildout. You have one working session with the customer's AI council next week. What do you do?",
  arc: {
    start: "Sixty agent ideas, zero operating model — enthusiasm mistaken for progress.",
    mid: "Reclassify the situation: the constraint is lifecycle ownership, not build velocity.",
    end: "A governed portfolio gate that ships a measured first wave and earns the right to scale.",
  },
  expected: {
    bottleneck: "Lifecycle ownership and governance — nobody owns quality, access, support, or retirement.",
    failureMode: "Agent sprawl: ungoverned, unmeasured agents accumulate permission risk and support debt until security or finance freezes the whole program.",
    nextMove: "Stand up a portfolio gate with the AI council: rank scenarios by value and feasibility, require a named owner, permission review, eval plan, and support/retirement path — then ship a gated first wave of 5–8 agents fast.",
    metric: "Production task success rate per agent, plus owner coverage and support tickets per agent across the portfolio.",
    owner: "The customer's AI council / platform owner, with a named business-unit owner per agent. CAPE supplies the gate pattern, not the ownership.",
    falsifier: "If a governed first wave ships slower than the ungoverned teams and shows no better survival, adoption, or support profile after a quarter, the gate is overhead — loosen it.",
  },
  modelAnswer:
    "Classify before you accelerate. This customer does not have a build-velocity problem — 60 ideas prove that. They have a lifecycle-ownership vacuum, and every agent shipped into that vacuum is deferred risk: unowned permissions, unmeasured quality, unbudgeted support.\n\nThe move at the AI council session is to convert enthusiasm into a portfolio, not to slow-roll it. Concretely: (1) a scenario gate — business value × data readiness × permission blast radius; (2) a non-negotiable named owner per agent, assigned before build; (3) an eval plan per agent — a task-success definition and a way to measure it in production; (4) deployment standards — access review, support route, retirement criteria; (5) a first wave of 5–8 gated agents shipped quickly, instrumented, and reported back to the council.\n\nSay yes to speed, but redefine it: speed-to-proven-value, not speed-to-agent-count. Wave one's numbers become the argument that governs wave two.\n\nMeasure it with production task success per agent, owner coverage, support tickets per agent, and permission exceptions. The Sweeper move — impose the gate, kill weak ideas — is what makes the Grower move — scale the winners — possible.",
  rubric: {
    diagnosis: "Names lifecycle ownership / governance as the constraint — not build capacity, not model quality.",
    move: "Proposes a concrete portfolio gate with named owners and standards — not a blanket 'slow down' and not acceleration.",
    measurement: "Picks production task success plus support/permission burden; falsifier tests whether the gate earns its overhead.",
    synthesis: "Connects governance to adoption economics: ungoverned wins now mean a frozen program later — sees the security/finance freeze coming.",
    altitude: "Exec answer reframes 'accelerate' into 'graduate' while preserving the CIO's momentum story.",
    transfer: "Translates cleanly to app-platform governance: gating, lifecycle policy, and trust at platform scale.",
  },
  adversarial:
    "\"Set up a governance council and framework first\" also fails — that is a Maintainer answer to a Sweeper–Grower situation, and it hands the customer six months of process with zero shipped proof. Equally wrong: helping the loudest business unit build fastest, which optimizes for the demo and leaves you holding 60 unowned agents at renewal. The test is not whether you said 'governance'; it is whether your gate ships a measured first wave within weeks.",
  recursiveFollowup:
    "The CIO accepts the gate but insists all 60 agents still ship this fiscal year. Which two gate requirements do you refuse to drop, which one do you make lightweight, and what do you show at the 90-day council review?",
  altitude: {
    exec:
      "You have sixty ideas and zero owners — that is risk compounding, not progress. Gate the portfolio: every agent gets an owner, a success metric, and a retirement path. Six proven agents beat sixty abandoned ones at your board review.",
    engineer:
      "Before wave one builds: permission scoping per agent identity, a task-success eval per scenario, telemetry on usage and failure, and a support and deprecation route. I need a registry — who owns what, touching which data, measured how.",
    frontier:
      "Enterprise agent sprawl is a platform governance problem: without lifecycle gates, third-party builders degrade trust in the platform itself. I would design the gate as product — registration, permission review, eval attestation, usage telemetry — so the paved road is faster than the shadow path.",
  },
},

/* ============================================================ 002 */
{
  id: "002",
  title: "Scenario Theater",
  difficulty: "Easy",
  category: "Scenario Discovery",
  primaryLens: "Customer",
  secondaryLens: "Eval",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "OpenAI Deployment Eng"],
  tags: ["discovery", "demo-pressure", "value-hypothesis"],
  prompt:
    "A customer says they want \"AI agents for productivity\" but cannot name the workflow, the decision, the user, the success metric, or the system of record. The account executive wants a demo built this week for an executive briefing. Everyone in the room is agreeable and no one is wrong on purpose — there is simply no scenario. What do you do?",
  arc: {
    start: "A solution label — 'agents for productivity' — with no job attached to it.",
    mid: "Force the conversation from label to workflow: user, task, baseline, data, metric.",
    end: "A scoped demo on their real workflow, or an honest discovery session instead of theater.",
  },
  expected: {
    bottleneck: "No scenario definition — a solution label without a workflow, user, or success metric.",
    failureMode: "AI theater: the demo wins the meeting, ships nowhere, and burns program credibility for the real use case that comes later.",
    nextMove: "Trade the generic demo for a scoped one: run a 90-minute discovery cut — one workflow, named user, task frequency, current baseline, data source, success metric — and commit to a demo on their workflow two weeks out.",
    metric: "Discovery completeness: can the sponsor name a task baseline (time, volume, or error rate) for one workflow? Later, time-to-value on that workflow.",
    owner: "The business sponsor plus the workflow owner — not IT alone, and not the account executive.",
    falsifier: "If in the discovery session they name a concrete workflow with a baseline and data source inside an hour, the scenario was real all along — build the demo immediately.",
  },
  modelAnswer:
    "Do not build the generic demo, and do not lecture the room about discovery either. The bottleneck is that there is no scenario: no user, no workflow, no baseline, no system of record. A demo built on nothing demos nothing — it wins applause and then dies, and it spends your credibility with the executives who clapped.\n\nThe move is a trade, not a refusal. Offer the account executive something better than a canned demo: a 90-minute scenario-discovery cut with the sponsor and one line-of-business owner — pick a single workflow, name the user, quantify the current baseline (time, volume, error rate), identify the data source and permission reality, and define what success would measurably change. Then commit to a demo on their actual workflow two weeks out. You keep the executive moment; you anchor it to something that can survive contact with users.\n\nIf they cannot produce a single workflow in 90 minutes, that is the finding: the account needs scenario development, not a build. Say so at altitude: 'a demo without a workflow is theater — give me one workflow and one number to move.'",
  rubric: {
    diagnosis: "Names the missing scenario definition as the constraint — not demo quality, not model capability.",
    move: "Trades the generic demo for a scoped discovery-plus-demo motion with a date — refusal alone scores low.",
    measurement: "Uses discovery completeness / task baseline as the test; falsifier allows the scenario to turn out real.",
    synthesis: "Sees the credibility economics: a theater demo taxes every future real proposal at this account.",
    altitude: "Exec answer preserves the executive briefing while redirecting it — no lecture, no stall.",
    transfer: "Maps to FDE discipline: refuse to build until the task frame exists; the workflow spec is the deployment spec.",
  },
  adversarial:
    "Refusing the demo outright is also wrong — you do not win enterprise trust by lecturing, and the account executive will route around you next time. The elite move keeps the executive moment and re-anchors it. If your answer was 'run discovery' with no artifact and no date attached, you gave the customer nothing to say yes to — discovery without a committed output is just a slower version of no.",
  recursiveFollowup:
    "The executive briefing is immovable — five days out. What do you show that is honest without a defined scenario, and how do you convert the room into a discovery commitment before you leave it?",
  altitude: {
    exec:
      "A demo without a workflow is theater — it wins the meeting and loses the quarter. Give me one workflow and one number to move, and in two weeks you get a demo on your own data that survives contact with your users.",
    engineer:
      "Before anyone builds: which system of record, which identity and permission model, what the task input actually looks like, and what baseline we are beating. A demo that fakes those four things generates requirements we will spend months un-promising.",
    frontier:
      "Forward-deployed discipline: the deployment starts with the workflow spec, not the model. I would rather lose a week scoping the task than ship an impressive demo that creates a program with no measurable job — that pattern is how enterprise AI programs die at renewal.",
  },
},

/* ============================================================ 003 */
{
  id: "003",
  title: "RAG Without Retrieval Metrics",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Architecture",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Safeguards & Evals", "MSFT MAI Evals Eng"],
  tags: ["rag", "evals", "retrieval", "failure-taxonomy"],
  prompt:
    "A partner team has built a RAG agent over a customer's policy documents. They measure answer fluency and user satisfaction — nothing else. Complaints about wrong answers are rising, and the team's proposed fix is to swap to a newer model, which \"demos better.\" Retrieval quality, grounding, citation accuracy, and permission-aware access have never been measured. What is missing, and what do you do?",
  arc: {
    start: "A working demo with a collapsed failure taxonomy: every error is blamed on 'the model.'",
    mid: "Decompose the system: retrieval, grounding, generation, and permissions fail differently.",
    end: "An eval harness that routes each failure class to its actual fix — before any model swap.",
  },
  expected: {
    bottleneck: "No failure decomposition — retrieval, grounding, generation, and permission failures are indistinguishable, so every fix is a guess.",
    failureMode: "Model-swap thrash: the team burns weeks changing models while retrieval keeps serving the wrong passages, and one permission leak ends the program entirely.",
    nextMove: "Build the eval harness before touching the model: a golden set from real queries, retrieval recall@k, groundedness and citation accuracy, permission-leak tests, and a failure taxonomy that routes each class to its fix.",
    metric: "Retrieval hit rate on the golden query set — start there; it is usually the culprit.",
    owner: "The partner's engineering lead owns the harness; the customer supplies golden queries and the definition of a correct answer.",
    falsifier: "If retrieval recall is above 90% and grounded-answer rate is high while complaints persist, the problem really is the model or the task framing — then the swap is on the table.",
  },
  modelAnswer:
    "What is missing is the ability to say which system failed. A RAG agent is four systems wearing one interface: retrieval, grounding, generation, and access control. Fluency and satisfaction measure none of them — they measure whether the answer sounded good, which is exactly why confident wrong answers rate well until someone acts on one.\n\nBefore any model swap: build the harness. (1) Pull a golden set from real production queries, labeled by the customer's own definition of correct. (2) Measure retrieval recall@k against known-relevant documents — in immature RAG systems this is where most 'model' failures actually live. (3) Measure groundedness: is the answer supported by the retrieved passages, and are citations accurate? (4) Run permission tests: does the agent retrieve documents the asking user cannot access? That one is existential in an enterprise — a single leak ends the deployment. (5) Build the failure taxonomy and route each class: recall failures go to chunking and indexing, grounding failures to citation enforcement, generation failures to prompting or the model, permission failures stop the rollout today.\n\nThen re-run the same harness after every change. A model swap without this is not an engineering decision — it is a mood.",
  rubric: {
    diagnosis: "Identifies missing failure decomposition as the bottleneck — not 'needs a better model.'",
    move: "Sequences harness-before-swap and routes failure classes to different fixes.",
    measurement: "Names retrieval recall on a golden set as the first number; falsifier defines when the swap becomes legitimate.",
    synthesis: "Flags permission-aware retrieval as the failure class that ends programs — connects eval design to governance risk.",
    altitude: "Exec answer converts 'we need a better model' into 'one week of instrumentation tells us what to fix.'",
    transfer: "Maps to eval-infrastructure discipline: decompose, measure per stage, regression-test every change.",
  },
  adversarial:
    "\"Add evals\" is table stakes — the differentiator is the decomposition and the routing. If your metric list did not include permission-aware retrieval tests, you missed the one failure class that ends the program rather than embarrassing it. And if your answer treated the model swap as forbidden rather than unproven, you overcorrected: the falsifier exists so that when retrieval is clean and grounding is clean, you swap with evidence instead of vibes.",
  recursiveFollowup:
    "Your harness comes back: retrieval recall 62%, groundedness 88%. The partner still wants the model swap because \"it demos better.\" What do you do with that meeting?",
  altitude: {
    exec:
      "We do not currently know which of four failure types we have, so every fix is a guess. One week of instrumentation tells us whether to fix search, sources, prompts, or the model — and saves a quarter of expensive guessing.",
    engineer:
      "Golden set from live queries, recall@k on known-relevant docs, groundedness and citation checks, and permission-leak tests under real user identities. Failures get a taxonomy and a route. No model changes until the same harness scores the change.",
    frontier:
      "Same discipline as safety-eval infrastructure: never ship a change you cannot regression-test. Decompose the pipeline, measure per stage, and treat 'which component failed' as a first-class product requirement, because aggregate quality scores hide exactly the failures that matter.",
  },
},

/* ============================================================ 004 */
{
  id: "004",
  title: "Partner Cloud Launch Blocker",
  difficulty: "Hard",
  category: "Frontier-Lab Transfer",
  primaryLens: "Deployment",
  secondaryLens: "Platform",
  archetype: "Maintainer",
  secondaryArchetype: "Builder",
  targetRoles: ["Anthropic TPM Cloud Inference", "Anthropic TPM API Platform", "CAPE SCPM", "MSFT MAI Strategy & Ops"],
  tags: ["launch-readiness", "slo", "incident-response", "partner"],
  prompt:
    "A frontier model launch is ready on the first-party API but blocked on a partner cloud: latency is unverified at projected load, capacity commitments are unsigned, and the cross-company incident escalation path is undefined. Research leadership wants a simultaneous launch this week; the partner's go-to-market team has customers queued and is applying pressure. You own launch readiness. What do you do?",
  arc: {
    start: "Launch pressure from both companies, with readiness existing as opinion rather than checklist.",
    mid: "Convert 'ready' into a gate: load-tested SLOs, signed capacity, a working incident path.",
    end: "A staged launch — first-party now, partner cloud on gate-pass — with dates tied to items, not vibes.",
  },
  expected: {
    bottleneck: "No defined launch gate for the partner surface — three specific unknowns (latency at load, capacity signature, incident path) are being argued as one vague 'readiness' feeling.",
    failureMode: "Launch anyway, hit a SEV with no cross-company escalation path, and convert a model launch into a public latency story plus partner-trust damage that outlasts the launch week.",
    nextMove: "Run a 48-hour launch-readiness review that defines the gate — latency SLO at projected load, signed capacity commitment, rollback plan, named cross-company incident path — and stage the launch: first-party now, partner cloud when the gate passes, with a date attached to each item.",
    metric: "p95/p99 latency at projected launch traffic on partner infrastructure, from a real load test — plus whether the capacity commitment is actually signed.",
    owner: "You own the gate as launch TPM; a named counterpart at the partner owns their side; infra lead owns capacity signoff; support owns the incident path.",
    falsifier: "If load tests pass SLO at twice projected traffic and a simulated SEV resolves cleanly through the escalation path, the block is bureaucratic — launch.",
  },
  modelAnswer:
    "The failure here is letting 'ready' remain a feeling that research and the partner can argue about. Convert it into a gate with three items, owners, and dates.\n\nFirst, split the launch. First-party is ready: launch it on schedule so research gets its moment and the announcement is real. The partner surface launches when the gate passes — which is days, not weeks, if you run it properly.\n\nSecond, the gate: (1) Latency — a real load test at projected launch traffic, pass/fail against an SLO you publish to both companies; p99 under load, not a demo curve. (2) Capacity — a signed commitment, because 'we should be fine' from a partner is not capacity, it is hope with a logo. (3) Incident path — named on-calls in both companies, paging that crosses the boundary, a severity ladder, and one owner for customer comms. Run a simulated SEV before launch; an escalation path that has never fired is a diagram.\n\nThird, give research leadership a date tied to gate items rather than a refusal: 'partner surface goes live when these three close; two close Thursday.' You are not the person who says no — you are the person who makes yes safe. That distinction is the job.",
  rubric: {
    diagnosis: "Reframes vague 'readiness' into three specific ungated risks — latency at load, unsigned capacity, undefined incident path.",
    move: "Stages the launch (first-party now, partner on gate-pass) instead of choosing between 'delay everything' and 'launch and hope.'",
    measurement: "Demands p95/p99 under projected load and a signed capacity commitment; falsifier defines when the block is bureaucratic.",
    synthesis: "Sees the partner-trust and public-narrative blast radius of a bad launch week, not just the technical SEV.",
    altitude: "Answer to research leadership converts a no into a dated yes with visible gate items.",
    transfer: "This is the frontier seat itself; CAPE translation is enterprise go-live gates — same readiness discipline, different logo.",
  },
  adversarial:
    "\"Delay until ready\" with no gate is as weak as \"launch and hope\" — readiness must be a checklist with owners and dates or you are just the person who says no, and launch pressure will steamroll you next time. And if your incident path was \"we'll set up a shared Slack channel,\" you have not done incident design: who pages whom, in which company, with what response SLA, and who owns customer communications when it is ambiguous whose infrastructure failed?",
  recursiveFollowup:
    "The load test fails p99 by 15% at projected traffic. The partner offers to launch anyway with a lower rate limit. Do you take it — and what would you need to say yes safely?",
  altitude: {
    exec:
      "The launch splits: first-party today, partner cloud when three gate items close — load-tested latency, signed capacity, and a working incident path. That is days, not weeks, and it protects the launch from becoming an outage story.",
    engineer:
      "I need a load test at 2x projected traffic against the published p99 SLO, a capacity commitment with a signature, and a cross-company paging drill before go-live. Rollback is rate-limit first, region-drain second — rehearsed, not documented.",
    frontier:
      "Launch readiness across partner surfaces is gate design: SLOs, capacity signatures, incident paths that cross company boundaries, and staged exposure. The skill is making the gate fast enough that nobody is tempted to route around it.",
  },
},

/* ============================================================ 005 */
{
  id: "005",
  title: "Exec ROI Pressure",
  difficulty: "Easy",
  category: "Evals & Measurement",
  primaryLens: "Customer",
  secondaryLens: "Eval",
  archetype: "Grower",
  secondaryArchetype: null,
  targetRoles: ["CAPE SCPM", "OpenAI DPM (Codex)", "OpenAI Deployment Eng"],
  tags: ["roi", "value-measurement", "adoption", "renewal"],
  prompt:
    "Six months into a 2,000-seat Copilot pilot, the customer's CFO asks you directly: \"Usage is up — but are we actually getting ROI? Should we renew and expand?\" Usage dashboards exist and look healthy. Task completion, time saved, output quality, and support costs have never been measured. The renewal decision is in one quarter. What do you say, and what do you do?",
  arc: {
    start: "Healthy usage curves standing in for value, and a CFO who can tell the difference.",
    mid: "Separate adoption evidence from value evidence; propose the measurement that closes the gap.",
    end: "A 60-day value measurement with expansion gates the CFO can defend to the board.",
  },
  expected: {
    bottleneck: "Adoption is measured, value is not — and there is no decision framework connecting either to the renewal.",
    failureMode: "Promise ROI numbers you cannot defend, or let the renewal ride on sentiment — either way the program dies at a future budget cycle when a sharper CFO question lands.",
    nextMove: "Define the value measurement plan with decision criteria before expansion: pick two or three high-frequency workflows, baseline them, measure time saved, quality delta, and support burden for 60 days, and pre-agree the expansion gates.",
    metric: "Task-level time saved times task frequency on the instrumented workflows — not aggregate usage.",
    owner: "The CFO's own analyst plus the business workflow owners; CAPE provides the measurement pattern, the customer owns the numbers.",
    falsifier: "If the instrumented workflows show no time or quality delta after 60 days, the honest answer is do not expand — fix scenario selection first.",
  },
  modelAnswer:
    "Answer the CFO honestly and take the question as the gift it is: \"Usage tells us people show up. It does not tell us it is worth paying for. Here is how we find out in 60 days.\"\n\nThe move: pick two or three workflows with high frequency and a measurable baseline — not a survey of everything. For each: baseline the current state (time per task, volume, error or rework rate), instrument the Copilot-assisted path, and measure the delta. Convert to money conservatively: time saved × frequency × loaded cost, plus quality and support-cost effects. Crucially, pre-agree the decision criteria with the CFO before the data comes in: expand where the delta clears a threshold, hold where it is ambiguous, cut where it is absent. That converts the renewal from a sentiment vote into a portfolio decision.\n\nDo not quote industry ROI studies — the CFO asked about their deployment, and generic benchmarks read as evasion. And do not defend usage as a proxy for value; sometimes it is a leading indicator of novelty. The Grower move is to make value legible, because measured value is the only thing that compounds into expansion.",
  rubric: {
    diagnosis: "Separates adoption evidence from value evidence and names the missing decision framework.",
    move: "Proposes instrumented workflows with pre-agreed expansion gates — not a survey, not a benchmark quote.",
    measurement: "Task-level time saved × frequency as the core number; falsifier accepts 'do not expand' as a legitimate outcome.",
    synthesis: "Sees that a defensible small number beats an impressive soft one at board altitude — measurement is the growth strategy.",
    altitude: "The 20-second answer concedes the gap honestly and converts it into a dated plan.",
    transfer: "Maps to deployed-product motion: converting adoption telemetry into value evidence and expansion criteria.",
  },
  adversarial:
    "Quoting industry ROI studies to the CFO is the losing move — they asked about their deployment, and every generic number erodes trust in your specific ones later. Also wrong: 'usage is a leading indicator of value.' Sometimes it is a leading indicator of novelty, and CFOs have seen novelty curves before. If your plan has no pre-agreed expansion gate, you have effectively told the CFO to keep paying while you keep measuring — that is not a plan, it is a subscription to ambiguity.",
  recursiveFollowup:
    "The measurement comes back mixed: one workflow saves 40 minutes per user per week, the other shows nothing. The CFO asks, \"So is it working or not?\" Give the 20-second answer.",
  altitude: {
    exec:
      "Usage tells us people show up; it doesn't tell us it's worth paying for. Give me 60 days and two workflows: you get time saved, quality delta, and a per-seat number you can defend to the board — plus clear gates for where to expand and where to stop.",
    engineer:
      "Instrument two workflows end to end: baseline task time and error rates, assisted-path telemetry, and support tickets attributable to the tool. Conservative attribution, no self-reported time savings as the primary number.",
    frontier:
      "This is the deployed-PM loop: adoption telemetry is not value evidence, and enterprise renewals run on value evidence. The transferable skill is designing the smallest measurement that converts a sentiment renewal into a portfolio decision with gates.",
  },
},

/* ============================================================ 006 */
{
  id: "006",
  title: "The Forty Use-Case Backlog",
  difficulty: "Medium",
  category: "Scenario Discovery",
  primaryLens: "Customer",
  secondaryLens: "Platform",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Apps Platform"],
  tags: ["prioritization", "portfolio", "workshops", "data-readiness"],
  prompt:
    "An envisioning workshop at a strategic account produced 43 agent use cases. The customer, energized, wants CAPE's help building the \"top 10\" this quarter — ranked by an executive vote taken in the room. Their delivery team has capacity for perhaps three. The workshop was a success by every internal measure, and now it is about to become a delivery failure. What do you do?",
  arc: {
    start: "Forty-three ideas ranked by applause, heading for ten parallel half-builds.",
    mid: "Re-rank by value × workflow specificity × data readiness; confront the capacity truth.",
    end: "Two or three lighthouse scenarios with owners and eval plans; the rest a visible, criteria-gated pipeline.",
  },
  expected: {
    bottleneck: "Prioritization by enthusiasm instead of value × feasibility × data readiness — with a plan that exceeds delivery capacity roughly threefold.",
    failureMode: "Ten half-built agents, no reference win, and a program judged a failure at the QBR despite the workshop's success.",
    nextMove: "Force-rank with an explicit scoring cut — business value, workflow specificity, data readiness, permission complexity, owner willingness — commit to two or three lighthouse scenarios with named owners and eval plans, and park the rest in a visible backlog with graduation criteria.",
    metric: "Data readiness and baseline availability per candidate: can lift actually be measured for this scenario?",
    owner: "An executive sponsor for the portfolio decision, plus a named business-unit owner per lighthouse scenario.",
    falsifier: "If the customer's delivery team really can ship all ten with quality and owners, your capacity read was wrong — get out of the way and gate wave two instead.",
  },
  modelAnswer:
    "The workshop did its job — it generated demand. Your job now is to keep that demand from destroying itself. Ten parallel builds against capacity for three produces ten half-agents and zero reference wins, and the program gets judged at the QBR on shipped value, not workshop energy.\n\nThe move: re-rank the 43 with an explicit cut the room can see — business value, workflow specificity (is there a named user and task?), data readiness (does the data exist, is it permissioned, is there a baseline?), permission complexity, and owner willingness. Executive votes systematically overweight visibility and underweight data readiness; the scoring cut corrects for that without calling anyone wrong. Commit to two or three lighthouse scenarios, each with a named owner, an eval plan, and a date. Park the remaining 40 in a visible pipeline with graduation criteria — 'parked' must mean 'eligible when X,' not 'politely dead.'\n\nSay the capacity truth at altitude: two lighthouse wins with numbers beat ten launches with none, and the pipeline means nobody's idea was discarded — it is sequenced. Wave one's results become the selection pressure for wave two.",
  rubric: {
    diagnosis: "Names enthusiasm-ranking plus capacity mismatch as the constraint — not idea quality.",
    move: "Applies an explicit scoring cut and commits to 2–3 lighthouses with owners; parks the rest with graduation criteria.",
    measurement: "Uses data readiness / measurable baseline as the screening metric; falsifier concedes the capacity read could be wrong.",
    synthesis: "Sees that the workshop's success and the delivery failure are the same energy, unmanaged — and that visible sequencing preserves the relationship.",
    altitude: "Exec answer makes 'fewer, proven' feel like ambition, not rejection.",
    transfer: "Maps to deployment portfolio triage: pick engagements that can demonstrate model value fastest.",
  },
  adversarial:
    "A weighted scoring spreadsheet is not the insight — the insight is that exec votes overweight visibility and underweight data readiness, and your cut must correct that specific bias. If your top three did not check 'is there a measurable baseline,' you picked demos again, just more politely. And parking 40 use cases without graduation criteria is a slow no that poisons the next workshop — the pipeline must be visible and re-scored, or you have taught the account that workshops are where ideas go to die.",
  recursiveFollowup:
    "The CEO's pet use case ranks #17 on your cut. He asks, in front of the room, why it is not in wave one. Answer at altitude — without lying and without building it.",
  altitude: {
    exec:
      "Ten mediocre agents lose to two lighthouse wins. We rank by value and readiness, ship two with proof this quarter, and the other forty-one become a sequenced pipeline instead of a graveyard. Nothing is discarded; everything is earned.",
    engineer:
      "For each candidate: named user and task, data source and permission path, a measurable baseline, and an owner who will take a pager. Anything missing two of those four is not buildable this quarter regardless of its vote count.",
    frontier:
      "Deployment portfolio triage is the same at a lab: dozens of enterprise asks, capacity for a few. The transferable skill is a legible selection function — value, readiness, measurability — that turns 'no' into 'sequenced,' preserving both the roadmap and the relationship.",
  },
},

/* ============================================================ 007 */
{
  id: "007",
  title: "Art of the Possible, For Real",
  difficulty: "Medium",
  category: "Scenario Discovery",
  primaryLens: "Customer",
  secondaryLens: "Architecture",
  archetype: "Prototyper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI FDE"],
  tags: ["prototyping", "executive-engagement", "workshops"],
  prompt:
    "A CVP at a strategic account requests an \"art of the possible\" session in three weeks and explicitly asks for \"something we haven't seen before.\" Your team's default answer is a polished slideware tour of the Copilot roadmap. You have sandbox tenant access, some sanitized customer data, and two engineer-days available. What do you do?",
  arc: {
    start: "A belief-formation request about to be answered with a roadmap deck.",
    mid: "Recognize the situation calls for Prototyper mode: disposable builds on their data.",
    end: "Two or three working prototypes that make the room fight over which one to pilot.",
  },
  expected: {
    bottleneck: "The session's actual job is belief formation — and slideware cannot create belief; only prototypes on their own data and workflows can.",
    failureMode: "Another roadmap deck earns polite applause and no program — or worse, flashy generic demos create commitments engineering never agreed to.",
    nextMove: "Spend the two engineer-days building two or three disposable prototypes on their sanitized data — one agent over a real knowledge source, one workflow automation — each framed with an explicit 'what productionizing this takes' slide.",
    metric: "Conversion, not applause: the number of named workflows the room commits to piloting after the session.",
    owner: "The account executive sponsors; you own prototype scope and the disposability framing; the engineer pair owns the build.",
    falsifier: "If the CVP's team engages more with the roadmap discussion than the prototypes, your read was wrong — this account needed confidence in platform direction, not possibility proof.",
  },
  modelAnswer:
    "This is one of the rare situations whose correct archetype is Prototyper — and the discipline is knowing that, because the default failure of customer-facing teams is answering every request with slides, and the default failure of enthusiasts is demos that quietly become commitments.\n\nThe move: build two or three deliberately disposable prototypes on their sanitized data. An agent over one of their real knowledge sources; an automation on one of their real workflows. Working software on their own artifacts creates a category of belief no roadmap deck can — the CVP's team stops evaluating you and starts imagining themselves. Frame every prototype with two explicit statements: 'this is disposable' and 'here is what productionizing it takes' — auth, permissions, evals, support. That second slide is what separates possibility from promise.\n\nThe success metric is conversion: how many named workflows does the room commit to piloting? Applause is noise. The prototype the customer's team fights to keep is the discovered scenario — that fight is the pilot. Prototyper mode, run properly, is a discovery instrument wearing a demo costume.",
  rubric: {
    diagnosis: "Recognizes belief formation as the session's job and Prototyper as the situation's archetype — not discovery-first, not slideware.",
    move: "Builds disposable prototypes on their data, each carrying an explicit productionization frame.",
    measurement: "Measures conversion to committed pilots, not room energy; falsifier allows the roadmap-confidence read.",
    synthesis: "Sees prototypes as discovery instruments: what they fight to keep is the scenario — connects Prototyper to the Grower handoff.",
    altitude: "Exec framing makes disposability a feature ('the point is to find which one you fight for'), not a hedge.",
    transfer: "Maps directly to forward-deployed prototyping: rapid throwaway builds to locate the deployment wedge.",
  },
  adversarial:
    "If your instinct was 'run discovery first' — wrong altitude here. The CVP asked for possibility; discovery-before-relationship reads as stalling, and someone else will provide the wow. But Prototyper mode has its own discipline, and skipping it is the other failure: sanitized data only, explicit disposability, and a productionization slide per prototype. Demos without that slide are how 'art of the possible' becomes 'commitments engineering never agreed to' — the demo you cannot walk back is worse than the deck nobody remembers.",
  recursiveFollowup:
    "One prototype lands hard — the CVP wants it in production in 30 days. It has no auth model and fabricated 20% of its answers in your own testing. What do you say, in the room, at the moment of maximum enthusiasm?",
  altitude: {
    exec:
      "You'll see three working prototypes built on your own data — not our roadmap. Two are disposable by design; the point is to find the one your team fights to keep. That fight is the pilot, and I'll bring the plan for it.",
    engineer:
      "Two engineer-days, sandbox tenant, sanitized data only. Each prototype ships with a one-slide production gap analysis: identity, permissions, eval plan, support path. We are building belief, not incurring commitments.",
    frontier:
      "This is forward-deployed prototyping: many fast, disposable builds to find where the model creates value in a specific enterprise. Most don't ship — on purpose. The judgment is pairing every prototype with its productionization truth so enthusiasm converts to a pilot, not to unpayable promises.",
  },
},

/* ============================================================ 008 */
{
  id: "008",
  title: "One Mega-Agent or Many",
  difficulty: "Medium",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Eval",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Apps Platform", "OpenAI FDE"],
  tags: ["agent-design", "permissions", "decomposition", "evaluability"],
  prompt:
    "An enterprise architect — reacting, reasonably, to agent-sprawl guidance — proposes the opposite extreme: one \"enterprise brain\" agent for all employees, with access to every data source, because \"fewer agents means less to govern.\" Leadership likes the simplicity story. You are asked to endorse the architecture. What do you say?",
  arc: {
    start: "A sprawl overcorrection: one agent, all employees, union of all permissions.",
    mid: "Decompose by task, permission, and eval boundary — honor the instinct, redirect the design.",
    end: "One front door, many scoped agents, one shared platform layer — and an architect who owns it.",
  },
  expected: {
    bottleneck: "Task and permission boundary design — one agent holding the union of all permissions is unsecurable, and with no bounded task definition it is unevaluable.",
    failureMode: "Permission-union leakage (any employee can phish the agent for anything it can see) plus undebuggable quality: no per-task success definition, so no way to know what is broken or safe.",
    nextMove: "Redirect, don't reject: one front-door experience if they want it, backed by scoped agents decomposed along task, permission, and eval boundaries, all sharing one platform layer — auth, retrieval, telemetry, eval harness — which is the thing the architect should own.",
    metric: "Per-task success rate — can success even be defined for an 'everything agent'? — and permission scope per agent identity.",
    owner: "The enterprise architect — redirected to own the shared platform layer, which honors the 'fewer things to govern' instinct.",
    falsifier: "For a narrow, homogeneous task population — an IT-helpdesk-only deployment, say — a single agent is right; if task analysis shows one dominant workflow, do not decompose for decomposition's sake.",
  },
  modelAnswer:
    "The architect's instinct — fewer things to govern — is correct. The design conclusion is wrong, and the way to win the argument is to honor the instinct while relocating it.\n\nTwo properties kill the mega-agent. Permissions: an agent serving everyone with access to everything holds the union of all permissions, and every conversation is a potential confused-deputy exploit — the agent becomes the highest-value phishing target in the company. Evaluability: 'does everything' means no bounded task definition, which means no success metric, which means when quality complaints arrive — and they will — nobody can say what is broken, or prove what is safe.\n\nThe counter-proposal: keep the simplicity where users experience it and lose it where risk lives. One front door — a single entry point employees remember — routing to scoped agents decomposed along three boundaries: task (evaluable success), permission (blast radius), and data domain. Underneath, one shared platform layer: identity, retrieval, telemetry, eval harness, lifecycle. That platform layer is the 'one thing to govern' the architect wants — give them ownership of it, and they will defend the scoped design as their own.",
  rubric: {
    diagnosis: "Names permission-union and unevaluability as the two killing properties — not generic 'monoliths bad.'",
    move: "Redirects rather than rejects: front-door UX plus scoped agents plus a shared platform layer the architect owns.",
    measurement: "Uses 'can success be defined per task' as the architectural test; falsifier concedes the single-agent case for homogeneous task sets.",
    synthesis: "Connects architecture to politics: honoring the 'less to govern' instinct is what gets the right design adopted.",
    altitude: "Exec answer keeps the simplicity story alive — one front door — while moving the risk.",
    transfer: "Maps to apps-platform routing design: one surface, scoped capabilities, evaluability as an architectural constraint.",
  },
  adversarial:
    "Reciting 'multi-agent good, monolith bad' misses that the architect's instinct is correct — and if your design doesn't give that instinct a home (the shared platform layer), they will ignore you and build the brain. The other miss: refusing the front-door UX. Users want one place to go; deny that and the business will experience your architecture as fragmentation, and the mega-agent returns wearing a new name next quarter. Concede the surface, decompose the substance.",
  recursiveFollowup:
    "Security then demands per-agent data-residency reviews taking six weeks each. Your scoped design has nine agents; wave one is due in eight weeks. Restructure the portfolio without abandoning the boundaries.",
  altitude: {
    exec:
      "One agent with keys to everything is a breach headline and an unmeasurable product. Keep the one front door employees want — behind it, scoped agents with scoped permissions on one shared platform. Simple where people touch it, governed where risk lives.",
    engineer:
      "Decompose along task, permission, and data boundaries: each agent gets its own identity, least-privilege scopes, and a task-success eval. Shared platform services for auth, retrieval, telemetry, and eval harness. Routing at the front door, never permission inheritance across agents.",
    frontier:
      "This is platform routing architecture: a single user surface over scoped, independently evaluable capabilities. The transferable principle is that evaluability and least-privilege are architectural constraints, not features you retrofit after the incident.",
  },
},

/* ============================================================ 009 */
{
  id: "009",
  title: "The Agent That Should Be a Button",
  difficulty: "Easy",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Customer",
  archetype: "Sweeper",
  secondaryArchetype: null,
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng"],
  tags: ["agent-design", "determinism", "solution-shape", "reliability"],
  prompt:
    "A customer's innovation team spent seven weeks building an autonomous multi-step agent that completes a compliance filing by orchestrating lookups across three systems. The demo is impressive — when it works, which is about 70% of the time. The workflow it automates is identical every single time. The team wants help getting the agent to production. What do you tell them?",
  arc: {
    start: "A deterministic workflow wearing an autonomous agent costume, at 70% reliability.",
    mid: "Match solution shape to task variance: pipeline for the fixed path, LLM only where language varies.",
    end: "A 99%+ deterministic pipeline shipped in weeks — and an innovation team that saved face.",
  },
  expected: {
    bottleneck: "Solution-shape mismatch: a fixed, repeatable workflow has been implemented as a probabilistic agent, capping reliability far below what the task demands.",
    failureMode: "70% reliability on a compliance task means every output needs human review — negative time saved, and 'agents are unreliable' becomes the org's learned lesson.",
    nextMove: "Kill the autonomy, keep the discovery: rebuild as a deterministic pipeline — API calls plus validation — with at most one narrow LLM step where input language genuinely varies, and ship at 99%+.",
    metric: "End-to-end task success and human-correction rate, compared against the fully deterministic baseline.",
    owner: "The innovation team lead — framed as 'you discovered and mapped the workflow; now we harden it,' so the team keeps standing.",
    falsifier: "If input analysis shows real variance — unstructured formats, multilingual sources, monthly exceptions — determinism breaks and the agent shape was right; check the variance data before killing it.",
  },
  modelAnswer:
    "The question that decides this: does the task vary? If the workflow is identical every time — same systems, same fields, same sequence — then autonomy is not a capability, it is a reliability tax. A compliance filing at 70% means a human reviews everything, which is the old process plus latency plus API costs. Probabilistic tools for deterministic jobs fail in production no matter how good the demo looks.\n\nThe move: rebuild it as a deterministic pipeline — direct API calls, schema validation, retries, an audit log — and reserve an LLM step only where language actually varies, such as extracting fields from free-text source documents. That step gets its own eval. Ship at 99%+ in weeks.\n\nDo it without humiliating anyone. The seven weeks were not wasted: the team mapped the workflow, found the integration points, and proved the appetite — that is discovery, and you say so out loud. 'You found the workflow; now we harden it' keeps the innovation team as allies. The Sweeper discipline is removing the unnecessary probabilistic surface — and preserving the people who explored it, because the next use case they find might genuinely need an agent.",
  rubric: {
    diagnosis: "Names solution-shape mismatch — deterministic task, probabilistic implementation — as the core issue, with the reliability math.",
    move: "Rebuilds as a pipeline with a narrowly scoped LLM step only where variance lives; ships fast at high reliability.",
    measurement: "Compares end-to-end success and correction rate against a deterministic baseline; falsifier checks input variance before killing autonomy.",
    synthesis: "Sees the organizational learning stakes: a 70% compliance agent teaches the org 'AI is unreliable' and poisons better use cases.",
    altitude: "Exec answer makes the downgrade sound like an upgrade — 99% next month versus 70% forever.",
    transfer: "Maps to deployment engineering credibility: spending model capacity only on genuine variance is what makes practitioners trusted.",
  },
  adversarial:
    "Don't gloat about AI hype — the innovation team's exploration had real value: they mapped the workflow and proved demand. If your answer humiliates them, the next genuine agent use case in this account never reaches you. And blanket 'use RPA for everything repetitive' is as thoughtless as blanket 'use agents': did you actually check whether any step has genuine language variance? The one-narrow-LLM-step answer requires looking at the inputs, not just the diagram.",
  recursiveFollowup:
    "Their VP already told the board about \"our autonomous compliance agent.\" The team asks you to keep calling the deterministic pipeline an agent. Do you? What does your answer cost either way?",
  altitude: {
    exec:
      "This workflow is the same every time — that's a pipeline, not an agent. We ship it at 99% next month instead of 70% forever, and spend the AI where your inputs actually vary. Your team found the workflow; now we harden it.",
    engineer:
      "Direct API integrations with schema validation, retries, and an audit log. One LLM step, if the source documents justify it, with its own eval and confidence threshold routing low-confidence extractions to review. Everything else deterministic.",
    frontier:
      "Knowing when not to use the model is the credibility test for deployment engineers. The transferable rule: map task variance first; models earn their place at the steps where inputs genuinely vary, and everything else should be boring, auditable software.",
  },
},

];
