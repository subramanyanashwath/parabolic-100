/* Parabolic 100 — problem bank, part 5 (Wave 1 gap-killers, 031–035) */

P100.PROBLEMS.push(

/* ============================================================ 031 */
{
  id: "031",
  title: "Three Teams, One Launch Date",
  difficulty: "Hard",
  category: "Frontier-Lab Transfer",
  primaryLens: "Deployment",
  secondaryLens: "Platform",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["Anthropic TPM Cloud Inference", "MSFT MAI Strategy & Ops", "OpenAI Deployment Eng", "CAPE SCPM"],
  tags: ["launch", "coordination", "critical-path", "cross-team"],
  prompt:
    "A model-adjacent product launch needs three teams to land simultaneously: serving infra (capacity + latency), safety (eval sign-off), and product (the surface itself). Each team has its own roadmap, its own definition of 'ready,' and its own manager. Marketing has already picked the date. You're named launch owner — with no authority over any of the three. Design how this actually converges.",
  arc: {
    start: "One date, three teams, three definitions of ready, zero shared plan.",
    mid: "One integrated critical path with named handoffs, a shared readiness definition, and slip signals per dependency.",
    end: "Convergence by design: a launch that lands, or a re-plan everyone saw coming three weeks out.",
  },
  expected: {
    bottleneck: "No integrated critical path — three team-local plans with implicit handoffs; nobody owns the seams, and the seams are where launches die.",
    failureMode: "Each team hits its own milestones while the integration points slip silently; the miss is discovered in launch week, and the postmortem finds no single decision that failed — only three correct plans that never composed.",
    nextMove: "Build the one plan that doesn't exist: an integrated critical path across all three teams with explicit handoff artifacts (capacity signed → eval run on prod config → surface frozen), a single published readiness definition per team, weekly slip signals on the handoffs specifically, and a pre-agreed re-plan trigger tied to buffer burn-down — then get all three managers to bless it once, in the same room.",
    metric: "Buffer remaining on the critical path — days between the projected convergence date and the announced date — tracked weekly and published; when it hits zero, the re-plan trigger fires automatically.",
    owner: "You own the integrated plan, the seams, and the trigger; each team owns its artifacts; the three managers co-own the readiness definitions they signed.",
    falsifier: "If mapping the plan shows the three workstreams barely interact — clean interfaces, no shared resources — then heavyweight coordination is overhead: run a lightweight sync and spend your effort on the one seam that's real.",
  },
  modelAnswer:
    "The trap in multi-team launches is that everyone plans their own work and nobody plans the composition. Three teams can each be perfectly on-track against team-local plans and still miss, because 'ready' was never defined at the seams: safety can't run final evals until serving pins the prod config; product can't freeze the surface until safety's constraints land; serving can't size capacity until product forecasts traffic. The launch lives in those sentences, and today they exist in nobody's plan.\n\nSo build the missing artifact. (1) Map the integrated critical path — not three Gantt charts stapled together, but the dependency chain across teams, with each handoff named as an artifact: signed capacity commitment, eval report on the actual launch config, frozen surface spec. (2) Publish one readiness definition per team, blessed by all three managers in the same meeting — the point isn't the document, it's the shared witnessing; ambiguity about 'ready' is where teams will otherwise retreat when pressure arrives. (3) Instrument the seams, not the tasks: your weekly signal is buffer burn-down on the critical path and handoff-artifact status. Teams self-report their internals; you personally verify the handoffs. (4) Pre-agree the re-plan trigger: when buffer hits zero, the date conversation happens automatically — no one has to be the villain who 'called it,' because the trigger did. Marketing's date survives if the plan says it survives; otherwise leadership gets three weeks of warning instead of three days.\n\nYour authority is the plan itself: launch owner without org power governs through artifacts everyone signed and signals everyone sees.",
  rubric: {
    diagnosis: "Locates the risk at the seams — handoffs and composition — not in any single team's execution.",
    move: "Builds the integrated critical path with artifact-defined handoffs, co-signed readiness, and an automatic re-plan trigger.",
    measurement: "Buffer burn-down on the critical path as the single published number; falsifier permits lightweight mode when seams are few.",
    synthesis: "Sees that the trigger's automation is what depersonalizes the date conversation — process absorbs the political cost.",
    altitude: "The managers' one-room blessing is the real mechanism; the launch owner's authority is the signed plan, not the title.",
    transfer: "This is the frontier launch-TPM job verbatim — research, safety, and product converging on artifacts, not vibes.",
  },
  adversarial:
    "The busy failure: becoming a status aggregator — collecting three teams' greens weekly and forwarding them upward, which is exactly how the seams stay invisible (027's watermelon, assembled from honest parts). The heavy failure: imposing a unified program office with daily standups across all three teams — you'll get compliance theater and resentment, and the managers will route around you. Coordinate the seams, leave the teams their internals. And if marketing's date was never tested against the mapped critical path, you accepted someone else's fiction as your constraint — the first output of the plan is whether the date was ever real.",
  recursiveFollowup:
    "Week four: safety's eval capacity is consumed by an unrelated incident, burning your buffer to two days. Serving and product are on track. The re-plan trigger will fire Friday. Marketing proposes launching without the final eval pass 'since the interim results looked fine.' Run the meeting.",
  altitude: {
    exec:
      "Three teams, one date, and until this week no single plan connecting them. Now there is one: readiness defined per team and co-signed, handoffs tracked as artifacts, and a buffer number published weekly. If buffer hits zero the re-plan conversation triggers automatically — you'll never get a launch-week surprise, only early options.",
    engineer:
      "I track the seams, you keep your internals: I need the handoff artifacts — pinned prod config to safety by the 12th, capacity signature by the 19th, frozen surface by the 26th — and a two-line weekly on anything threatening them. Internal re-sequencing is yours; the interface dates are ours.",
    frontier:
      "Lab launches converge exactly this way: research, safety, and serving under different leaders, composed by a TPM whose authority is an integrated critical path everyone signed. The transferable core is artifact-defined handoffs and an automatic re-plan trigger — coordination as infrastructure, not charisma.",
  },
},

/* ============================================================ 032 */
{
  id: "032",
  title: "Two Execs, One Truth",
  difficulty: "Hard",
  category: "Governance & Risk",
  primaryLens: "Altitude",
  secondaryLens: "Deployment",
  archetype: "Sweeper",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "MSFT MAI Strategy & Ops", "Anthropic TPM API Platform"],
  tags: ["status", "stakeholders", "politics", "reporting"],
  prompt:
    "Your program reports into two executives with opposite appetites: the business CVP wants momentum ('don't bring me problems, bring me progress') and the CISO wants risk surfaced early and in writing. The same weekly status now gets edited into two versions — one green-leaning, one red-leaning. This week a real risk emerged: a data-residency gap that could delay the EU rollout a quarter. Both will eventually compare notes. What do you do?",
  arc: {
    start: "Two audiences, two edited truths, and a real risk that won't stay editable.",
    mid: "Collapse to one dataset with two framings — altitude changes the lens, never the facts.",
    end: "Both execs holding the same truth, the risk co-owned, and your reporting trusted by construction.",
  },
  expected: {
    bottleneck: "The reporting fork itself: two fact-sets for two audiences is a debt that compounds until they compare notes — and the residency risk is the note they'll compare.",
    failureMode: "Each exec eventually discovers the other's version; both conclude your status is authored for the reader, and from then on every report you send gets independently re-verified — you've become the watermelon (027) with extra steps.",
    nextMove: "Collapse to one canonical status — one fact-set, one risk register — with audience-specific framing layered on top: the CVP gets 'risk X, mitigation, decision needed to protect momentum,' the CISO gets 'risk X, exposure, containment.' Deliver the residency gap to both this week, in the same 48 hours, with the same numbers — and where their appetites genuinely conflict, surface that conflict to them as the decision, rather than absorbing it into your edits.",
    metric: "One register, zero forked facts: can any sentence in either exec's version be falsified by the other's? That count must be zero — framing may differ; numbers, risks, and dates may not.",
    owner: "You own the canonical register and both framings; the two execs co-own the residency decision — their conflict is theirs to resolve, not yours to launder.",
    falsifier: "If the 'opposite appetites' turn out to be about detail level, not facts — the CVP wants one page, the CISO wants ten — then this was a formatting problem, not an integrity one: one register with two zoom levels, and no deeper fix needed.",
  },
  modelAnswer:
    "Name the situation honestly first: you're not managing two communication styles, you're maintaining two versions of reality, and version control on the truth always fails — the merge conflict just picks its own moment. The residency risk is that moment, because a quarter-long delay cannot be simultaneously green and red once budgets move.\n\nThe fix is the altitude-switching discipline this whole gym trains: one fact-set, many framings. (1) Build the canonical register — every risk, number, and date lives in exactly one place; both weekly reports become views over it. Framing legitimately differs: the CVP's view leads with trajectory and the decision needed; the CISO's leads with exposure and containment. What never differs is the underlying row. The test is mechanical: no sentence in either version falsifiable by the other. (2) Ship the residency gap to both within the same 48 hours — sequencing matters less than the window; a week's gap between tellings reads as a leak when they compare. Same numbers, same date, framed for each: to the CVP, 'this risk threatens the EU date; here are two mitigations and the decision that protects Q4'; to the CISO, 'here's the exposure, the interim containment, and the audit trail.' (3) Where their appetites actually collide — speed versus assurance on the mitigation path — put the collision on the table as their decision. Absorbing exec conflict into your report edits is how the fork happened; the repair is routing conflict up instead of smoothing it sideways.\n\nThe payoff compounds: the first time both execs watch each other receive the same bad news, your reporting stops being checked and starts being cited.",
  rubric: {
    diagnosis: "Names the fork as truth-debt with a guaranteed merge conflict — not a stakeholder-style problem.",
    move: "Installs one canonical register with audience views, delivers the risk to both inside one window, routes the real conflict upward.",
    measurement: "The zero-forked-facts test — cross-falsifiability between versions — as the standing check; falsifier allows the zoom-level case.",
    synthesis: "Sees that absorbing exec conflict into edits is what created the fork — repair means surfacing conflict as their decision.",
    altitude: "Both framings demonstrate the discipline: same facts, CVP hears momentum-protecting decisions, CISO hears exposure and containment.",
    transfer: "Multi-stakeholder truth management is lab-TPM daily life — research, safety, and commercial leadership reading one register.",
  },
  adversarial:
    "The blunt failure: one identical memo to both — technically honest, practically lazy; the CVP drowns in exposure detail, the CISO smells spin in trajectory language, and both engage less. Framing per audience is legitimate craft; forked facts are the sin — collapsing that distinction just trades one failure for another. The sequencing failure: telling the CISO first 'because risk' and letting the CVP hear it secondhand three days later — the window, not the order, is what protects you. And if you resolved the speed-versus-assurance conflict yourself inside the mitigation plan, you just re-created the fork one level deeper.",
  recursiveFollowup:
    "The CVP, alone with you after the briefing: 'Next time, bring me things like this before you formalize them with security — I can make problems disappear when they're still informal.' It's half mentorship, half pressure to re-fork. Respond in the room.",
  altitude: {
    exec:
      "You'll both get the same facts within the same two days, framed for what each of you owns — trajectory and decisions for one, exposure and containment for the other. Where speed and assurance genuinely trade off, that lands on your shared table, not inside my edits. You should be able to swap reports and find nothing that disagrees.",
    engineer:
      "One risk register as the source of truth; both weekly views generated from it. Rule: framing varies, rows don't. Any fact appearing in one view and contradicted by the other is a build-breaking bug in our reporting.",
    frontier:
      "Labs run this exact geometry — safety leadership and commercial leadership reading the same program. The transferable discipline is one canonical dataset with audience-shaped views, conflict routed up as decisions, and cross-falsifiability as the integrity test on your own reporting.",
  },
},

/* ============================================================ 033 */
{
  id: "033",
  title: "Escalate or Absorb",
  difficulty: "Medium",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Altitude",
  archetype: "Maintainer",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "MSFT MAI Strategy & Ops", "OpenAI Deployment Eng"],
  tags: ["escalation", "judgment", "cross-team", "capital"],
  prompt:
    "In one week, three things slipped: the identity team delayed your SSO integration by two weeks (annoying, absorbable), a partner team quietly reassigned the engineer who owned your connector (unowned work, no date), and legal paused your data-processing addendum pending a policy rewrite (blocks the EU pilot entirely). Your manager has told you before: 'you escalate too much.' Which of these goes up, which do you absorb, and how do you decide — in general, not just this week?",
  arc: {
    start: "Three slips, one reputation for crying wolf, and no explicit rule for what goes up.",
    mid: "Build the escalation function: irreversibility × blast radius × your-authority-to-fix, not annoyance.",
    end: "One clean escalation that lands, two absorbed slips with tripwires — and a rule your manager endorses.",
  },
  expected: {
    bottleneck: "No explicit escalation function — 'too much' and 'too little' are both symptoms of deciding by irritation instead of by irreversibility, blast radius, and whether anyone below the escalation point can actually fix it.",
    failureMode: "Escalate all three and confirm the cry-wolf reputation — your one real blocker arrives pre-discounted; or absorb all three and the legal pause silently kills the EU pilot, surfacing at the QBR as 'why didn't you raise this?'",
    nextMove: "Apply the function: SSO slip — absorb with a tripwire (two weeks becomes escalation-worthy at four); connector orphaning — don't escalate the slip, escalate the ownership vacuum sideways first (ask the partner manager for a named owner, with a date to escalate if none appears); legal pause — escalate now, cleanly: it's irreversible calendar loss on a committed pilot, and nobody below your VP can trade policy timeline against pilot commitment. Then publish the rule you used, so 'escalate too much' becomes 'escalates predictably.'",
    metric: "Escalation precision: of the things you raised in a quarter, how many did leadership agree needed them (hit rate), and of the things you absorbed, how many later blew up (miss rate). Precision and recall on your own judgment.",
    owner: "You own the function and the tripwires; your manager gets the rule explicitly — turning a reputation problem into a shared standard; the VP gets exactly one escalation this week, packaged with the decision it needs.",
    falsifier: "If your manager rejects even the legal escalation as 'too much,' the problem isn't your calibration — it's the escalation channel itself, and that's a different conversation about what they want to be surprised by.",
  },
  modelAnswer:
    "'You escalate too much' is rarely about volume — it's about predictability. Escalations feel excessive when nobody can tell what will trigger them; the same count feels reasonable when it follows a visible rule. So the real deliverable this week isn't three correct decisions — it's the function that produces them.\n\nThe function: escalate when (irreversible calendar or trust is being lost) × (the blast radius crosses team boundaries) × (nobody at your level or below has the authority to fix it). All three conditions, not any one. Apply it: the SSO slip fails on every axis — absorbable, reversible, fixable by re-sequencing; absorb it, but set a tripwire (at four weeks it starts eating the pilot buffer and re-enters the function). The orphaned connector fails the third test in an interesting way: there IS someone below the escalation point who can fix it — the partner team's manager, who may not even know the reassignment orphaned you. Go sideways before up: request a named owner by Friday, and the escalation only exists if that ask dies. The legal pause passes all three: the EU pilot's calendar burns irreversibly, the blast radius includes a customer commitment, and trading policy-rewrite timeline against pilot dates is genuinely a VP-level decision. Escalate it now, packaged as a decision — 'accept the delay, negotiate an interim addendum, or descope EU from phase one' — never as a complaint.\n\nThen the meta-move: show your manager the rule itself. The cry-wolf reputation dissolves when your escalations become predictable — and the quarterly precision/recall check (how many raises did leadership validate; how many absorbs blew up) turns your judgment into something you can calibrate instead of defend.",
  rubric: {
    diagnosis: "Reframes 'too much' as unpredictability, and names the missing function — irreversibility × blast radius × authority-to-fix.",
    move: "Routes each slip correctly (absorb+tripwire, go-sideways-first, escalate-as-decision) and publishes the rule itself.",
    measurement: "Precision/recall on own escalation judgment as a tracked quarterly metric; falsifier catches the broken-channel case.",
    synthesis: "The sideways move on the connector shows the third test's power — most 'escalations' are just asks that never got made at the right level.",
    altitude: "The VP receives one escalation, framed as three options and a decision — volume discipline is what makes it land.",
    transfer: "Escalation design is core lab-TPM craft: predictable triggers, decisions-not-complaints, and tripwires on absorbed risk.",
  },
  adversarial:
    "The people-pleasing failure: absorbing all three to repair your reputation — you've optimized for your manager's comfort over the EU pilot's survival, and the QBR question 'when did you know?' has only bad answers. The mechanical failure: treating the function as arithmetic and escalating the connector because 'unowned work scores high' — you skipped the cheaper sideways move and spent VP attention on something a peer-level ask would have fixed by Friday. And if your answer never told your manager the rule, you fixed this week and kept the reputation: the function only changes your standing if it's visible.",
  recursiveFollowup:
    "Your VP resolves the legal escalation your way — interim addendum, pilot proceeds. Two weeks later legal's policy rewrite lands and contradicts the interim terms; legal implies your escalation 'created the exposure.' Defend the original decision without burning legal — and say what, if anything, your function should learn.",
  altitude: {
    exec:
      "One thing needs you this week: legal's pause burns the EU pilot calendar irreversibly, and the trade between policy timeline and customer commitment is yours to make — here are the three options. The other two slips I'm absorbing with tripwires, and here's the rule I use so my escalations stay predictable.",
    engineer:
      "SSO: re-sequenced, revisit at four weeks. Connector: I need a named owner from your side by Friday — that's the ask, not an escalation, unless it goes unanswered. Both tracked with tripwires, neither needs management yet.",
    frontier:
      "Escalation is an allocation problem: leadership attention is scarce capacity, and the transferable skill is a published trigger function — irreversibility, blast radius, authority-to-fix — plus precision/recall tracking on your own calls. Predictable escalators get believed; that's the entire game.",
  },
},

/* ============================================================ 034 */
{
  id: "034",
  title: "The Vanity Metric Everyone Loves",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Altitude",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "MSFT MAI Evals Eng", "OpenAI DPM (Codex)"],
  tags: ["metrics", "goodhart", "reporting", "unwinding"],
  prompt:
    "Eighteen months ago someone picked 'total agent interactions per month' as the program's headline metric. It's now in the CIO's board deck, two directors' performance goals, and the vendor renewal justification — and it's up 340%. You know roughly a third of interactions are retries and misfires, another chunk is one team's scheduled automation pinging an agent hourly, and task success is flat. Nobody is lying; everyone is invested. Unwind it.",
  arc: {
    start: "A metric that grew load-bearing before anyone checked what it measures.",
    mid: "Decompose it publicly, migrate the audiences one by one, and give every investor in the old number a better one.",
    end: "A truthful headline metric — landed without a single 'we were wrong' headline.",
  },
  expected: {
    bottleneck: "The metric is institutionally load-bearing — board decks, performance goals, renewal math — so the problem is a migration, not a correction: truth has to arrive without detonating the people holding the old number.",
    failureMode: "Announce 'our headline metric is broken' and watch it read as 'the program was theater': the CIO looks misled at board level, the directors' goals invert overnight, and the renewal case collapses — the messenger and the program die together, and the successor metric inherits zero trust.",
    nextMove: "Decompose before you dethrone: publish the same number split into engaged interactions, retries/misfires, and scheduled automation — additive, nothing hidden, no accusation; introduce 'verified task completions' alongside as a companion metric; run both for two quarters while migrating each audience (board deck, goals, renewal) to the new headline at its natural refresh point; then retire the old number as 'graduated,' not 'wrong.'",
    metric: "Verified task completions as the successor — and during migration, the ratio of engaged-to-total interactions, which quantifies exactly how much the old number flattered without calling anyone a liar.",
    owner: "You own the decomposition and the migration calendar; the CIO gets a private pre-brief before anything public; the directors get their goals re-based at review season with the story already socialized.",
    falsifier: "If decomposition shows engaged interactions actually track task success closely — the retries and automation are noise on a real signal — then the metric was crude but honest: keep it, add the success companion, and skip the migration drama.",
  },
  modelAnswer:
    "The hard part isn't the measurement — you already know the truth. The hard part is that three constituencies have built on the old number in good faith, and truth delivered as an explosion will be paid for by the program, not by the metric. So treat this as a migration with a deprecation path, exactly like retiring a load-bearing API.\n\n(1) Decompose, don't denounce: republish the same 340% as its honest parts — engaged interactions, retries and misfires, scheduled automation. Additive, verifiable, accusation-free; the number didn't shrink, it grew resolution. Everyone sees the flattery quantified without anyone being called a liar. (2) Introduce the successor beside it, not instead of it: verified task completions runs as a companion for two quarters, building its own track record before it carries any weight. (3) Migrate audiences at their natural refresh points — the CIO gets a private pre-brief ('the number is getting more precise; here's the slide before your board sees it'), the directors' goals re-base at review season onto metrics they can actually drive, the renewal case gets rebuilt on completions where it's honestly stronger anyway if the program works. (4) Retire the old metric as 'graduated' — v1 measurement that served its era. Institutions accept evolution; they punish confession.\n\nAnd the quiet obligation underneath: if verified completions come back flat while you migrate, you haven't just fixed a metric — you've discovered the program question. The migration buys you the standing to ask it without the messenger dying first.",
  rubric: {
    diagnosis: "Sees a migration problem with invested constituencies, not a measurement problem — and maps who holds the load.",
    move: "Decompose additively → run the successor in parallel → migrate per audience at natural refresh → retire as 'graduated.'",
    measurement: "Verified completions as successor; engaged-to-total ratio as the flattery quantifier; falsifier lets the old metric survive.",
    synthesis: "Understands the API-deprecation analogy: parallel running and per-consumer migration is how load-bearing things change safely.",
    altitude: "The CIO pre-brief is the keystone move — board-level surprise is the one unforgivable outcome.",
    transfer: "This is benchmark migration at a lab: retiring a saturated metric everyone reports without invalidating past claims built on it.",
  },
  adversarial:
    "The crusader failure: the dramatic reveal — accurate, righteous, and maximally destructive; you've converted three allies into three people who need you to be wrong. The coward failure: quietly adding the good metric while the bad one keeps headlining — two years later the board still runs on fiction and now you knew. The subtle miss: migrating the CIO and directors but forgetting the renewal justification — the vendor negotiation is where the old number does its most expensive lying, and it's on a contract clock, not a review cycle. Sequence all three audiences or the unmigrated one re-anchors the rest.",
  recursiveFollowup:
    "Mid-migration, verified completions come back genuinely flat — the program's value case is now open. The CIO, holding your pre-brief, asks: 'So was the 340% ever real?' Answer at board altitude — truthful, in three sentences, without killing the program you might still save.",
  altitude: {
    exec:
      "The headline number is getting more precise, not smaller: here's the same growth split into engaged use, retries, and automation, and here's the completions metric that will headline from Q3. You'll have this before the board does, every step. The renewal case moves onto completions — where it's stronger, because it's real.",
    engineer:
      "Instrument the decomposition first: session de-duplication, retry detection, automation tagging. Completions pipeline runs in parallel for two quarters with weekly reconciliation against the old rollup — we migrate dashboards consumer by consumer, old metric read-only after Q3.",
    frontier:
      "Every lab retires saturated benchmarks the same way: decompose, run the successor in parallel, migrate consumers at their refresh points, never invalidate past claims wholesale. The transferable skill is deprecating a load-bearing measurement without a trust crater — Goodhart cleanup as change management.",
  },
},

/* ============================================================ 035 */
{
  id: "035",
  title: "Build, Buy, or Partner the Eval Tooling",
  difficulty: "Medium",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Platform",
  secondaryLens: "Eval",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "MSFT MAI Evals Eng", "Anthropic TPM API Platform"],
  tags: ["build-buy-partner", "evals", "vendor", "differentiation"],
  prompt:
    "Your customer's platform team needs agent eval tooling — golden-set management, regression runs, production sampling, dashboards. Three factions: engineering wants to build ('our workflows are special'), procurement wants the eval-platform vendor whose CEO just golfed with their CIO ('it's a solved problem'), and the SI partner offers to build-and-operate it inside their existing contract. You're asked for the framework, not just the answer. What do you give them?",
  arc: {
    start: "Three factions with three defaults — special, solved, and outsourced — and no shared decision function.",
    mid: "Split the stack by differentiation and change-rate; decide per layer, not wholesale; price the exits.",
    end: "A layered decision the factions co-own — buy the rails, own the judgment, rent nothing you can't leave.",
  },
  expected: {
    bottleneck: "The decision is being made wholesale when the stack decomposes: eval infrastructure (runners, dashboards, storage) is commodity; eval content (golden sets, success definitions, failure taxonomies) is the customer's accumulated judgment — one build/buy answer for both layers is wrong for at least one of them.",
    failureMode: "Wholesale-build: eighteen months rebuilding commodity runners while no evals actually run; wholesale-buy: the judgment layer gets shaped by a vendor's schema and the company's hardest-won knowledge lives in someone else's product; wholesale-partner: the SI operates the org's definition of quality, and every future change is a change order.",
    nextMove: "Give them the two-axis function — differentiation (does this layer encode our judgment?) × change-rate (how often must we touch it?) — then apply it: buy the infrastructure layer (commodity, low differentiation) with hard exit criteria (data export, no proprietary golden-set format); build the content layer in-house because golden sets and success definitions ARE the institutional learning the Satya-loop argument says never to outsource; scope the partner to migration and operations runbooks, never to owning eval content; and set a 12-month re-evaluation tripwire since this market is moving fast.",
    metric: "For the buy layer: time-to-first-regression-run and data-egress completeness in a two-week proof; for the build layer: golden-set coverage of live intent distribution — the number that proves the judgment layer is actually accumulating.",
    owner: "Platform engineering owns eval content permanently; procurement owns the vendor contract with the exit clauses as non-negotiables; the SI gets operations under the customer's definitions; one named eval owner arbitrates the boundary.",
    falsifier: "If the two-week proof shows the vendor's content model genuinely fits — their taxonomy maps to the customer's workflows with trivial translation — then the differentiation argument weakens and buying deeper is honest; the framework must be allowed to reach that answer.",
  },
  modelAnswer:
    "Refuse the wholesale question first: 'should we build or buy eval tooling' bundles two layers with opposite answers. Underneath, the stack splits cleanly — infrastructure (runners, schedulers, dashboards, storage: commodity, converging fast, zero competitive information) and content (golden sets, success definitions, failure taxonomies: the compressed record of every hard lesson this company has learned about its own workflows). The framework is two axes: does the layer encode our judgment, and how often must we change it? Low-judgment layers you buy; high-judgment, high-change layers you own — because whoever writes your success definitions owns your quality bar, and that's not a dependency you rent.\n\nApplied: buy the rails — with two contract non-negotiables that procurement will actually enjoy enforcing: full data export in open formats, and golden sets stored in a schema you could walk away with. Build the content — engineering's 'our workflows are special' instinct is wrong about the runners and exactly right about this; it's also the learning loop the whole AI program is supposed to compound, and outsourcing it is selling the hill-climbing machine. Scope the partner to what partners are for: migration, integration, operations runbooks — operating the plant, never authoring the recipes. And time-box everything: this vendor market is churning fast enough that today's buy deserves a 12-month re-look tripwire.\n\nThe factions each get a real win — engineering owns what matters, procurement signs the deal, the SI keeps billable scope — which is what makes the framework adoptable rather than merely correct. Run the two-week proof before signing: if the vendor's content model fits better than the differentiation story predicts, believe the proof over the framework.",
  rubric: {
    diagnosis: "Splits the stack — commodity infrastructure vs judgment-encoding content — instead of answering wholesale.",
    move: "Buy-with-exits, build-the-judgment, partner-scoped-to-operations, plus the re-evaluation tripwire; each faction gets a real win.",
    measurement: "Proof-based: time-to-first-regression-run and egress completeness for the buy; live-intent coverage for the build; falsifier lets evidence beat the framework.",
    synthesis: "Connects eval content to the learning-loop argument — golden sets are institutional memory, the one layer you never outsource.",
    altitude: "The framework is delivered as a decision function the customer owns, not a recommendation they received — which is what was asked.",
    transfer: "Labs and enterprises run this identically: evals infra commoditizes, eval content differentiates; MAI evals-eng and API-platform seats live on this boundary.",
  },
  adversarial:
    "The engineer-brained failure: winning the build argument for the whole stack because the content argument is genuinely strong — and then spending 18 months on scheduler plumbing while zero evals run and the vendor's product improves monthly. The procurement-brained failure: 'it's a solved problem' — the rails are; the judgment isn't, and the golf-course vendor's real product is making that distinction invisible. The partnership failure is quieter: letting the SI 'just get it working' with their own golden sets as a starter — starter sets become the taxonomy, and eighteen months later the company's definition of quality is a change-order away. If your answer had no exit criteria priced into the buy, you didn't make a decision — you made a commitment.",
  recursiveFollowup:
    "Nine months in: the vendor announces a golden-set 'AI-authoring' feature that auto-generates eval content from production traces — directly invading the layer you kept in-house, and it's good. Engineering feels vindicated about distrust; procurement wants to consolidate. Re-run your framework — what changed, what didn't?",
  altitude: {
    exec:
      "Split the decision: buy the commodity rails with contractual exits, own the layer that encodes your judgment — golden sets and success definitions are your accumulated learning, and whoever writes those owns your quality bar. The partner operates, never authors. Twelve-month re-look, because this market is moving.",
    engineer:
      "Vendor proof in two weeks: stand up one real regression suite, then verify full egress — sets, results, configs — in open formats. Meanwhile our golden sets live in our repo in our schema regardless of what runs them. The runner is replaceable; the content is us.",
    frontier:
      "The build/buy line at every lab and platform team falls exactly here: infrastructure commoditizes, judgment differentiates. The transferable move is decomposing by differentiation × change-rate, pricing exits into anything bought, and never renting the layer where your institution's learning accumulates.",
  },
},

);
