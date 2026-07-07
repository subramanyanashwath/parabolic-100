/* Parabolic 100 — problem bank, part 11 (Deployment & Change Management depth, 061–065) */

P100.PROBLEMS.push(

/* ============================================================ 061 */
{
  id: "061",
  title: "Champions Are Built, Not Found",
  difficulty: "Medium",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Customer",
  archetype: "Grower",
  secondaryArchetype: "Builder",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "MSFT MAI Strategy & Ops"],
  tags: ["champions", "adoption", "networks", "enablement"],
  prompt:
    "Your 20,000-seat rollout (019's insurer, rings passing) has a scaling problem nobody budgeted: the deployment team can't be everywhere, and adoption quality varies wildly by department — some teams transform their workflows, adjacent identical teams barely log in. Post-hoc analysis shows one variable explains most of it: whether the team happened to contain an enthusiastic early user who helped colleagues. Leadership's response: 'Great — find more champions.' Champions found this way are lucky accidents. Design the system that manufactures them.",
  arc: {
    start: "Adoption tracking the random distribution of accidental enthusiasts.",
    mid: "Convert luck into infrastructure: selection, mandate, enablement, and a feedback loop that pays champions back.",
    end: "A champion network with named coverage, real time budgets, and a signal channel the product team mines.",
  },
  expected: {
    bottleneck: "Champions are being treated as found objects — a personality trait some teams luckily contain — when the data shows they're the delivery mechanism for adoption; the missing system is selection, sanction (time and mandate), enablement, and reciprocity, without which 'find more champions' just re-describes the luck.",
    failureMode: "The volunteer-and-burn cycle: enthusiastic users get informally leaned on, do adoption labor on top of their day jobs, get no recognition or time budget, burn out or get promoted away (018's champion decay at network scale) — and the network dissolves within two quarters, taking its teams' adoption curves with it.",
    nextMove: "Build the network as infrastructure: (1) select deliberately — one champion per ~50 seats, chosen for workflow credibility not enthusiasm alone (the respected senior adjuster beats the excited intern), nominated by managers with a real time allocation (2-4 hrs/week, written into goals); (2) enable asymmetrically — champions get early features, direct access to the deployment team, training-the-trainer content, and a private channel where their questions get same-day answers; (3) make them the signal network — champion-reported friction is the highest-quality adoption telemetry that exists (055's behavioral tells, with names and context attached), routed into the product feedback loop (020) and the training backlog; (4) pay the role back — visible recognition, skills framing for their careers, and first access to what's next; reciprocity is what separates a network from a volunteer extraction scheme.",
    metric: "Coverage (seats within reach of a named, active champion) and the champion-effect delta — adoption metrics for covered vs uncovered teams, which the post-hoc analysis already proved exists; plus champion retention itself, the number that catches the burn cycle early.",
    owner: "Managers own nomination and the time budget (unfunded mandates die — the allocation is the test of leadership's seriousness); the deployment team owns enablement and the channel; champions own their teams' first-line questions; you own keeping the reciprocity real.",
    falsifier: "If covered-vs-uncovered deltas vanish once you control for team workload mix — the 'champion effect' was actually 'teams with lighter caseloads adopted more' — then champions were a proxy, not a mechanism, and the investment belongs in workflow fit (050's placement logic) rather than network building.",
  },
  modelAnswer:
    "The data already told you the mechanism: adoption spreads person-to-person through workflow credibility, not top-down through comms. 'Find more champions' hears that and re-orders luck. The design response is to build what luck was providing — and the blueprint has four load-bearing walls.\n\nSelection: credibility over enthusiasm. The champion who moves a claims team is the senior adjuster people already ask for help, not the newest hire who loves AI. One per ~50 seats, manager-nominated, and — this is the wall that holds the others — with real allocated time. Two to four hours a week, written into goals. The time budget is the seriousness test: leadership that won't fund it is asking for the volunteer-and-burn cycle, and you should say so with 018's arithmetic (champion attrition is adoption decay with a lag).\n\nEnablement: make champions genuinely powerful, not just labeled. Early access to features, train-the-trainer material they can localize, and a private channel where the deployment team answers same-day. The asymmetry is the point — a champion who gets answers in hours becomes the person worth asking, which is the whole mechanism.\n\nReciprocity and signal close the loop: champions are simultaneously your best distribution AND your best sensors — their friction reports arrive with workflow context no telemetry captures, feeding the product loop (020) and the training backlog. In exchange they get recognition that's visible (leadership shout-outs, badges that mean something internally) and career framing ('led AI adoption for 400 seats' is a promotion packet line). Networks run on exchange; extraction schemes run out.\n\nAnd measure the thing itself: coverage, covered-vs-uncovered adoption delta, and champion retention. The network is infrastructure now — it gets health metrics like any other system you depend on.",
  rubric: {
    diagnosis: "Reads the post-hoc finding as mechanism, and 'find more champions' as re-describing luck instead of building the system.",
    move: "Selection by credibility with funded time, asymmetric enablement, signal-channel integration, and explicit reciprocity.",
    measurement: "Coverage, champion-effect delta, and champion retention as network health; falsifier controls for the workload-mix confound honestly.",
    synthesis: "Sees champions as simultaneously distribution and sensors — and the time budget as the test of whether leadership means it.",
    altitude: "Leadership hears infrastructure with health metrics, not a plea for enthusiasm — and the funding ask arrives with 018's decay arithmetic.",
    transfer: "Champion-network design is the deployment-scale adoption mechanism everywhere — labs' developer-community and enterprise-enablement motions are this same system with different nouns.",
  },
  adversarial:
    "The luck-laundering failure: announcing a champion 'program' that's a mailing list and a monthly call — no time budget, no enablement asymmetry, no reciprocity; you've renamed the volunteers and kept the burn cycle. The enthusiasm trap: selecting for excitement over credibility — the AI-hobbyist champion demos features; the respected-practitioner champion changes workflows, and only one of those moves the delta. And the extraction miss: mining champions for signal without paying the role back — the network's best members are by definition your most employable users; treat the role as free labor and watch it select for people with the least career leverage, which inverts the credibility criterion.",
  recursiveFollowup:
    "The network works — covered teams outperform by 30%. Then annual planning: managers, seeing the numbers, want champions to formally own their teams' adoption targets. Champions revolt quietly: 'I signed up to help colleagues, not to carry a quota.' The network is about to become a management layer, which is how it dies. Draw the line — what champions owe, what they never owe, and who absorbs the targets.",
  altitude: {
    exec:
      "One variable predicts adoption across your rings: whether a team contains a credible peer who helps colleagues. We're manufacturing that variable — one funded champion per fifty seats, chosen for workflow credibility, enabled with early access and same-day support, and paid back in recognition and career capital. The two-hour weekly allocation is the ask; the covered-versus-uncovered delta is the return.",
    engineer:
      "Champion tooling: private channel with deployment-team SLA, early-ring feature flags, train-the-trainer kits that localize, and a friction-report path that lands in the product backlog with workflow context. Instrument coverage, per-team adoption deltas, and champion activity/retention as network health metrics.",
    frontier:
      "Every scaled deployment discovers the same law: adoption propagates through credible peers, not comms. The transferable design — selected, funded, enabled, reciprocated champion networks doubling as sensor grids — is how labs run developer communities and how enterprise programs escape the deployment team's own bandwidth ceiling.",
  },
},

/* ============================================================ 062 */
{
  id: "062",
  title: "The Training Nobody Remembers",
  difficulty: "Easy",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Customer",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "OpenAI DPM (Codex)"],
  tags: ["training", "enablement", "behavior-change", "workflow"],
  prompt:
    "A customer's rollout includes mandatory agent training: a 90-minute recorded webinar, a 40-slide deck, and a quiz. Completion rate: 96%. Three weeks later, usage telemetry shows most 'trained' users have never issued a query beyond the two examples from the webinar, and support keeps answering questions the training explicitly covered. The enablement team, proud of their completion dashboard, proposes a refresher webinar. Diagnose and fix.",
  arc: {
    start: "Ninety-six percent completion, near-zero behavior change — training measured by attendance.",
    mid: "Move the teaching to the moment of need: in-flow, example-shaped, and measured by what users do after.",
    end: "Training as product surface — and a dashboard that tracks capability adoption, not video completions.",
  },
  expected: {
    bottleneck: "The training is shaped like compliance, not like learning: a front-loaded lecture weeks before the moment of need, measured by completion — when tool skills are acquired in-flow, at the moment a user has a real task and a real gap; the 96% measures exposure to information, which transfers almost nothing to behavior.",
    failureMode: "The refresher webinar runs, completion hits 94%, behavior stays flat — and the program concludes users are 'resistant to change' (050's false lesson, training edition), while the actual gap — nobody knows what to ask the agent at the moment they could ask it — compounds into permanent shallow usage.",
    nextMove: "Relocate the teaching to the workflow: (1) in-product moments — starter prompts shaped to the user's role visible at the empty-state, 'try this' suggestions triggered by context (a dispatcher opening an exception sees the exception-analysis example); (2) example libraries over concept decks — real prompts from power users (061's champions are the supply chain), organized by task, copy-able in one click; (3) micro-format anything that must be pushed — 90 seconds on one capability at the moment a ring unlocks it, never 90 minutes on everything; (4) re-instrument success — capability adoption (distinct query types per user, feature-reach) and time-to-first-real-task replace completion rates; the enablement team keeps a dashboard, it just starts measuring learning instead of attendance.",
    metric: "Behavioral: distinct capability adoption per trained user and support-ticket rate on trained topics — the number that exposed the webinar and will validate its replacement; completion demoted to logistics.",
    owner: "The enablement team owns the pivot (frame it as an upgrade — their content, re-shaped and re-measured, not their failure); champions supply the example library; product owns the in-flow surfaces; you own the metric swap.",
    falsifier: "If telemetry shows trained users DID try varied queries and then retreated to the two examples, the problem isn't training at all — it's that the varied queries failed (quality, latency, or fit), and better teaching would just march more users into the same wall; check the retreat pattern before rebuilding enablement.",
  },
  modelAnswer:
    "The dashboard is measuring the wrong verb: 96% watched; nobody learned. Tool skills don't transfer from lectures — they transfer at the moment of need, when a user has a real task, a real gap, and a two-second window where an example would change what they do. A webinar three weeks before that moment is information without an address; the quiz confirms short-term recall of a thing that was never going to become behavior.\n\nMove the teaching into the flow. The empty query box is the highest-value training surface in the product: role-shaped starter prompts ('summarize this claim's timeline', 'draft the exception explanation') at exactly the moment of hesitation. Context triggers beat curricula: when a user opens an exception queue, the suggestion is the exception example — teaching indexed by task, not by feature list. And the example library is the real curriculum: actual prompts from actual power users, organized by role and task, one click to copy — 061's champion network is its natural supply chain and quality filter. What genuinely must be pushed gets micro-format discipline: ninety seconds, one capability, timed to when the ring unlocks it (019), never the everything-webinar.\n\nHandle the enablement team with 034's care — their completion dashboard is load-bearing pride: this is an upgrade, not an indictment. Their new dashboard is more impressive: capability adoption per user, time-to-first-real-task, ticket deflection on trained topics — learning measured as behavior. And keep the falsifier live before rebuilding anything: if users tried varied queries and retreated, training isn't the bottleneck — the product failed them at the second query, and that's a quality investigation (016), not an enablement one. Behavior telemetry tells you which story you're in; the webinar's completion rate never could.",
  rubric: {
    diagnosis: "Names the exposure-vs-behavior gap and the moment-of-need principle — completion measures logistics, not learning.",
    move: "In-flow surfaces, task-indexed example libraries fed by champions, micro-format pushes timed to unlocks, and the metric swap.",
    measurement: "Capability adoption and trained-topic ticket rates as the ruling numbers; falsifier separates teaching failure from product failure via the retreat pattern.",
    synthesis: "Connects champions (061) as the example supply chain and rings (019) as the timing spine — enablement as product, not event.",
    altitude: "The enablement team hears upgrade, not indictment — their dashboard gets better, which is what makes the pivot adoptable.",
    transfer: "In-flow enablement is how every AI product actually gets learned — labs' own onboarding surfaces (starter prompts, example galleries) are this exact design.",
  },
  adversarial:
    "The content failure: making the webinar better — tighter, funnier, shorter — is optimizing the wrong medium; a great lecture three weeks early still isn't there at the moment of need. The gamification failure: badges and leaderboards for completion — you've made the wrong metric more motivating. And the diagnosis skip: rebuilding enablement without checking the retreat pattern — if varied queries failed users, the shiny new in-flow examples will march them into the same wall with better UX, and the second retreat is permanent.",
  recursiveFollowup:
    "In-flow training ships; capability adoption doubles. Then legal flags the example library: several champion-contributed prompts include real customer names and deal details — the best teaching examples are the least shareable ones. Design the example pipeline that keeps the realism and loses the exposure (057's discipline, applied to training content).",
  altitude: {
    exec:
      "Ninety-six percent watched the training; telemetry says almost nobody's behavior changed — because tool skills are learned at the moment of use, not in webinars three weeks prior. We're moving the teaching into the product: role-shaped examples at the empty query box, a library of real prompts from your best users, and a dashboard that measures what people can do, not what they attended.",
    engineer:
      "Empty-state starter prompts keyed to role; context-triggered suggestions on high-value surfaces; example library with one-click insert, champion-sourced with a review pipeline; micro-lessons gated to ring unlocks. Instrument distinct-capability adoption, time-to-first-real-task, and ticket topics — completion tracking stays for compliance only.",
    frontier:
      "Enablement for AI tools is a product-surface problem: the empty prompt box is the classroom, examples are the curriculum, and behavior telemetry is the exam. The transferable rule — teach at the moment of need, measure the behavior change — is how every lab's own products onboard users, and why 'training' as an event keeps failing everywhere.",
  },
},

/* ============================================================ 063 */
{
  id: "063",
  title: "Who Answers the Agent's Phone?",
  difficulty: "Medium",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Eval",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "Anthropic TPM API Platform"],
  tags: ["support", "triage", "feedback-loops", "operations"],
  prompt:
    "Three months after a 8,000-seat agent deployment, the customer's IT helpdesk is drowning — and miserable. Their ticket system, built for 'password reset' and 'app won't launch,' now receives: 'the agent's answer was wrong,' 'it used to do this and now it doesn't,' 'it refused something reasonable,' and 'it was rude to a customer.' Level-1 agents close these as 'working as designed' (they can't reproduce them), users stop reporting (they just stop trusting — 013's decay), and the deployment team discovers quality issues from the QBR instead of the queue. Design the support model.",
  arc: {
    start: "AI-shaped complaints dying in an IT-shaped queue — and the quality signal dying with them.",
    mid: "Build the taxonomy and routing: bugs, quality, capability gaps, and refusals are four different tickets.",
    end: "A support model where every answer-quality ticket feeds the eval pipeline — support as the sensor, not the shield.",
  },
  expected: {
    bottleneck: "The support model assumes deterministic software: tickets are either reproducible bugs or user error, and 'the answer was wrong' fits neither — so the most valuable quality telemetry the deployment produces is being classified out of existence by a triage taxonomy that predates the product.",
    failureMode: "The 'working as designed' loop: quality complaints get closed unresolved, users learn reporting is pointless and defect silently (the 13% who complain are proxies for the 60% who just quit — 013's usage decay), the eval pipeline (016/017) starves of exactly the production failures it needs, and the deployment team flies blind until trust damage surfaces as a renewal problem.",
    nextMove: "Rebuild triage around an AI-native taxonomy: (1) four ticket classes with different routes — system bugs (classic IT path), answer quality ('wrong/outdated/incomplete' → the eval team's queue WITH conversation context attached), capability gaps ('it can't do X' → product backlog, 020's evidence pipeline), and behavior/refusal issues ('it wouldn't/was rude' → policy and prompt review); (2) capture at the moment — in-product feedback (thumbs-down with category picker) beats tickets filed hours later, and auto-attaches the trace L1 could never reproduce; (3) staff the seam — a small 'agent quality desk' (L1.5) that reads traces, not scripts: two or three people who can distinguish retrieval misses from model errors from policy blocks (003's decomposition as a job description); (4) close every loop visibly — quality tickets get outcomes ('fixed in this week's update') because reporting that visibly works is what keeps the sensor network alive.",
    metric: "Quality-ticket conversion: what fraction of answer-quality reports land in the eval pipeline with actionable traces (today: ~0%), and report-rate-per-active-user as the trust proxy — a healthy deployment WANTS complaints; silence is the alarm (055's behavioral tells, in support form).",
    owner: "The helpdesk lead co-designs the taxonomy (their queue, their relief — the reframe is 'we're taking the unanswerable tickets OFF you'); the eval owner (017) consumes the quality stream; product consumes capability gaps; you own the loop-closure discipline.",
    falsifier: "If trace review shows most 'wrong answer' tickets are actually expectation gaps — the agent answered correctly things users wished it did differently — then the fix is scope communication and training (062), not eval pipeline plumbing, and building the quality desk first would have staffed the wrong seam.",
  },
  modelAnswer:
    "Name what the helpdesk is accidentally destroying: production quality telemetry. 'The answer was wrong' isn't a support ticket that fails to reproduce — it's an eval case that arrived free, with a user attached, and the current taxonomy shreds it. Every deployment builds golden sets and drift monitors (016, 017) while their support queue — the richest source of real failures — closes them as 'working as designed.' The support model isn't adjacent to the eval pipeline; done right, it IS the front end of it.\n\nFour ticket classes, four routes. System bugs ride the classic path — IT is good at those. Answer quality routes to the eval side with the conversation trace attached — which requires capturing feedback in-product at the moment (thumbs-down, category, trace auto-attached), because a ticket filed two hours later has no trace and L1 can't conjure one. Capability gaps ('it can't do X') are product signal — 020's pattern pipeline, fed by support instead of account teams. Behavior and refusal complaints go to policy review, where 'it refused something reasonable' either updates the policy or updates the user's expectations — both are outcomes, unlike 'working as designed.'\n\nStaff the seam honestly: a small agent-quality desk of trace-readers, not script-followers — people who can tell a retrieval miss from a model error from a policy block. That's 003's failure decomposition turned into a job description, and it's two or three people, not a reorg; they exist to convert complaints into classified eval cases and to spot clusters (five 'wrong answer' tickets about the same policy doc is 013's stale index announcing itself).\n\nAnd protect the sensor network's will to report: close loops visibly. 'Your report — fixed in Tuesday's update' is what keeps users filing. The metric that matters is inverted from normal support instinct: report rate per active user should stay HEALTHY, because in probabilistic products, silence isn't satisfaction — it's 013's decay curve, pre-telemetry.",
  rubric: {
    diagnosis: "Sees quality complaints as eval cases being destroyed by a deterministic-software taxonomy — support as the starved sensor.",
    move: "Four-class taxonomy with distinct routes, in-product capture with traces, a trace-reading quality desk, and visible loop closure.",
    measurement: "Quality-ticket-to-eval conversion and report-rate-as-trust-proxy; falsifier redirects to expectation management if traces exonerate the answers.",
    synthesis: "Inverts the support instinct — complaints are wanted, silence is the alarm — and wires support into 016/017/020 as their front end.",
    altitude: "The helpdesk hears relief (unanswerable tickets removed), the eval team hears free production data, leadership hears trust telemetry.",
    transfer: "AI support-model design is an emerging discipline everywhere — labs' own user-feedback pipelines are this architecture: capture, classify, route to evals, close loops.",
  },
  adversarial:
    "The headcount failure: 'train L1 on AI' — a two-hour course doesn't make script-followers into trace-readers, and the taxonomy is still wrong underneath them; the seam needs different work, not harder work. The deflection failure: measuring success as fewer tickets — you'll get it, via the silent-defection route, and celebrate the sensor network dying. And the capture miss: building beautiful routing for tickets that still arrive traceless hours later — the in-product moment IS the design; without the trace auto-attach, the quality desk you staffed reads tea leaves.",
  recursiveFollowup:
    "The quality desk works — and becomes the problem: its two trace-readers are now the only people who understand production failures, they're fielding direct pings from executives ('can you check why it said this?'), and both just got recruiter mail. The seam you staffed is a bus-factor-two institution (027's single-point-of-honesty risk, in support form). Institutionalize what they know before they leave with it.",
  altitude: {
    exec:
      "Your helpdesk is closing our best quality data as 'working as designed' — users have started not-reporting, which reads as satisfaction and is actually silent defection. We're giving AI complaints their own lanes: wrong answers flow to the eval team with full context, capability requests to product, and every reporter hears what happened to their report. In this product category, a healthy complaint rate is the good sign.",
    engineer:
      "In-product feedback: thumbs-down with four-class picker, trace auto-attached, routed by class — quality to the eval queue, gaps to product backlog, behavior to policy review. Quality desk tooling: trace viewer with retrieval/model/policy decomposition flags. Loop closure: status-back notifications keyed to eval-pipeline outcomes. Dashboard: conversion rate and report-rate-per-MAU.",
    frontier:
      "Support for probabilistic products is eval infrastructure wearing a headset: complaints are labeled production failures, the taxonomy is the router, and visible loop closure keeps the sensors reporting. The transferable inversion — silence is the alarm, complaints are the asset — is how every serious deployment keeps its ground truth flowing.",
  },
},

/* ============================================================ 064 */
{
  id: "064",
  title: "Sunsetting the Beloved Bot",
  difficulty: "Medium",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Customer",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Apps Platform", "OpenAI DPM (Codex)"],
  tags: ["deprecation", "migration", "sunset", "trust"],
  prompt:
    "A customer must retire 'Ask Herbie' — a five-year-old rules-based chatbot for field engineers. It's obsolete (the new agent outperforms it on every eval), expensive (its maintainer retires this year, the rules engine is unsupported), and beloved: engineers trust it precisely because it's predictable, teams have wiki pages of exact Herbie phrasings, and two depots have built unofficial workflows on its CSV exports. The last 'simple migration' at this company (a CRM swap) is still spoken of bitterly, four years later. Design the sunset.",
  arc: {
    start: "An obsolete system that must die and a user base with four-year-old migration scars.",
    mid: "Migrate the dependencies, not just the users: phrasings, exports, and trust each need their own path.",
    end: "Herbie retired on schedule with its trust transferred, not torched — and the CSV workflows landed somewhere better.",
  },
  expected: {
    bottleneck: "The migration is being scoped as a tool swap when the real inventory is dependencies: memorized phrasings (muscle memory), CSV-export workflows (undocumented integrations), and — heaviest — trust built on predictability, which the new probabilistic agent cannot replicate in kind; each dependency migrates differently, and the CRM scar tissue means the org's default assumption is betrayal.",
    failureMode: "The cutover announcement lands ('Herbie retires June 30, use the new agent'), the two depots' workflows silently break, engineers discover their exact phrasings return different (better, but different) answers, the bitterness narrative gets its sequel — and the superior agent starts life with the one handicap evals can't fix: an installed base that wanted it to fail.",
    nextMove: "Run deprecation as a staged migration of dependencies (staged-exposure, reversed): (1) inventory what actually depends on Herbie — usage logs for query patterns, a depot-level hunt for the export workflows (there are more than two), the wiki phrasing pages as a spec; (2) build the bridges — a Herbie-phrasing compatibility layer (the new agent recognizes canonical Herbie queries and answers them with at least Herbie's reliability), first-class replacement for the CSV exports BEFORE cutover (the depots' workflows are requirements, not violations — 014's lesson), and side-by-side months where Herbie answers carry a 'the new agent also says…' preview; (3) sunset in rings — enthusiast depots first, scar-tissue depots last, each ring's experience marketed to the next; (4) retire with honors — a send-off that acknowledges five years of service, because ritual is trust-transfer machinery, and the CRM migration's real failure was contempt for what people were losing.",
    metric: "Dependency burn-down (phrasings covered, exports replaced, workflows landed) gates each ring — not calendar dates; post-cutover: task success for ex-Herbie queries specifically, and voluntary usage of the new agent by the bitter depots, the trust number.",
    owner: "The retiring maintainer becomes the migration's chief consultant (their knowledge of Herbie's quirks is the compatibility layer's spec — and hiring them into the sunset converts the last defender); depot leads own workflow landings; you own the ring gates and the falsifier below.",
    falsifier: "If usage analysis shows Herbie's actual query distribution is 30 canonical questions — the long tail already migrated organically — then the compatibility layer is a lookup table, the project is smaller than the fear, and the real work was only ever the CSV exports and the ritual.",
  },
  modelAnswer:
    "Respect what Herbie actually is: not a legacy system but a trust asset with three dependency classes attached — and the CRM scar means this org will read any cutover as the sequel to a betrayal. The eval superiority of the new agent is necessary and nearly irrelevant: predictability was Herbie's product, and engineers who've memorized exact phrasings aren't resisting progress, they're protecting a contract ('I ask exactly this, I get exactly that') the new agent doesn't sign.\n\nSo migrate dependencies, not users. Inventory first: query logs will show Herbie's real surface (expect a shockingly small canonical core), the wiki phrasing pages are literally a spec someone already wrote, and the CSV-export workflows — find them all; the two you know about are the two that surfaced (014's iceberg rule) — are unofficial integrations that the new platform should treat as requirements. Then the bridges: a compatibility layer where canonical Herbie phrasings return answers of at least Herbie reliability (a curated lookup path inside the new agent — probabilistic products can contain deterministic promises, 060's gates prove it); export parity shipped and verified BEFORE any cutover date is spoken aloud; and a side-by-side season where Herbie's answers carry the new agent's answer as a preview — trust transfers by observation, not announcement.\n\nSunset in rings, enthusiasts first, the bitter depots last and by then voluntarily — each ring's lived experience is the next ring's marketing (019 run backwards). Convert the retiring maintainer from last defender to chief consultant; their quirk knowledge is the spec, and their blessing is the endorsement the scar tissue listens to. And hold a real send-off. The CRM migration's unforgivable sin wasn't technical — it was contempt for what people lost. Ritual is how organizations metabolize loss; give Herbie a retirement party, and the new agent inherits the room's goodwill instead of its grief.",
  rubric: {
    diagnosis: "Inventories the real dependencies — phrasings, exports, trust-as-predictability — and reads the CRM scar as the operating context.",
    move: "Compatibility layer, export parity before cutover, side-by-side observation season, reversed rings, maintainer converted, ritual honored.",
    measurement: "Dependency burn-down as the ring gate and bitter-depot voluntary usage as the trust number; falsifier lets the small canonical core shrink the project.",
    synthesis: "Sees ritual as trust-transfer machinery and the maintainer as the spec — the political and technical migrations are one design.",
    altitude: "Leadership hears 'retired on schedule with trust intact' as the deliverable — dates gated on dependencies, not hope.",
    transfer: "Deprecation design is platform work everywhere — model version sunsets, API retirements, and feature kills all run this same dependency-first, ritual-aware playbook.",
  },
  adversarial:
    "The rip-the-bandaid failure: 'the new agent is better on every metric, announce the date' — correct on evals, blind to the contract; you've scheduled the CRM sequel and handed the new agent a hostile installed base. The eternal-parallel failure: running both forever to avoid the conflict — the maintainer retires regardless, Herbie rots unowned (056's orphan, beloved edition), and the org learns deprecations here never finish, which poisons every future sunset. And the compatibility trap: promising the layer covers 'everything Herbie did' — it covers the canonical core; overpromising parity converts the first uncovered edge case into 'they lied,' which is the CRM narrative verbatim.",
  recursiveFollowup:
    "Cutover succeeds — then three months later, usage analysis shows the compatibility layer serves 60% of all queries: engineers found the deterministic path and are living in it, avoiding the probabilistic agent entirely. You've accidentally shipped Herbie 2. Decide: is the lookup path a bridge to wean people off, or a permanent product feature the new agent should embrace — and what does the answer say about what users were telling you all along?",
  altitude: {
    exec:
      "Herbie has to retire — the maintainer leaves this year and the engine is unsupported. But Herbie's real product was predictability, and your engineers built workflows on it we're treating as requirements, not violations. Exports get replaced first, exact phrasings keep working through a compatibility layer, depots migrate in rings with the skeptics last — and Herbie gets a proper send-off, because how this retirement feels determines how the replacement is received.",
    engineer:
      "Query-log analysis for the canonical core; compatibility layer as a curated deterministic path with Herbie-reliability SLOs; CSV export parity shipped and depot-verified pre-cutover; side-by-side answer previews during the transition season; ring-gated sunset keyed to dependency burn-down, not dates. The maintainer's quirk list is sprint-one spec.",
    frontier:
      "Sunsets are trust migrations: inventory dependencies (including the undocumented ones), bridge the contracts users actually relied on, stage the exit in rings, and honor what's being lost. The transferable law from every model-version deprecation labs run — users don't resist better, they resist broken promises — is the entire design brief.",
  },
},

/* ============================================================ 065 */
{
  id: "065",
  title: "Stuck at Forty Percent",
  difficulty: "Medium",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Eval",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "OpenAI DPM (Codex)", "MSFT MAI Strategy & Ops"],
  tags: ["adoption", "plateau", "segmentation", "diagnosis"],
  prompt:
    "A year into a customer's agent deployment: adoption climbed steadily to 40% of licensed users, then flatlined for five months. Leadership has cycled through the standard moves — a comms refresh, an exec mandate memo, a lunch-and-learn series — and the line hasn't twitched. The renewal case assumed 70%. The deployment team argues about whether 40% is 'actually fine.' Before anyone buys another intervention: diagnose why THIS plateau exists, and design the response to what you find.",
  arc: {
    start: "Five flat months, three failed generic interventions, and a 70% renewal assumption.",
    mid: "Decompose the non-adopters: a plateau is several different populations wearing one number.",
    end: "Segment-matched responses — and an honest ceiling, if that's what the diagnosis returns.",
  },
  expected: {
    bottleneck: "The plateau is being treated as one problem with one lever, when 'the 60% who don't use it' is certainly several distinct populations — no-fit (the agent doesn't serve their workflow), tried-and-churned (it failed them specifically), never-activated (no moment of need ever arrived), and blocked (access, device, language, or workflow friction) — and every generic intervention averages across them, which is why nothing moves.",
    failureMode: "Another quarter of average interventions: comms reaches the no-fit segment (who correctly ignore it), mandates annoy the churned (who have reasons), the plateau holds — and at renewal, 40% vs 70% gets litigated with neither side knowing whether 40% is a failure of execution or the honest ceiling of current scope, which are opposite arguments.",
    nextMove: "Diagnose before intervening: (1) segment the 60% with telemetry — never-activated vs tried-and-churned (with churn timing: first session? second week?) vs active-but-shallow — and map against role/workflow data to find the no-fit population; (2) sample each segment with actual conversations (055's behavioral tells plus five user interviews per segment beat any survey); (3) match responses to findings — churned users need their specific failures fixed and a credible re-invitation (013's win-back, not a mandate), never-activated need in-flow moments (062/050), no-fit need scope honesty (subtract them from the denominator and tell leadership the real addressable base), blocked need their blockers removed; (4) re-baseline the renewal number on the addressable population — if 25% of licenses are no-fit roles, the honest ceiling is ~75% of 75%, and the renewal case should argue seats, not percentages.",
    metric: "Segment-level conversion — each intervention measured against its target segment only (the churn-recovery rate of re-invited users, activation rate of in-flow prompts), never the blended 40% — plus the addressable-base number that re-anchors the renewal conversation.",
    owner: "The deployment team owns the segmentation (it's a week of telemetry work they've skipped for three interventions); product owns churn-cause fixes; you own the addressable-base conversation with leadership, which is the political payload.",
    falsifier: "If segmentation shows the 60% is homogeneous — one dominant blocker across all of them (say, the agent isn't in their primary tool, 050's surface problem) — then the plateau IS one problem, the generic interventions just picked the wrong one, and a single targeted fix beats the segment machinery.",
  },
  modelAnswer:
    "Five months and three interventions bought one piece of data everyone's ignoring: the plateau doesn't respond to averages. That's diagnostic — it means 'the 60%' isn't a population, it's a coalition, and every blended intervention (comms, mandates, lunch-and-learns) delivers its message to segments it can't help. The move every plateau demands and rarely gets: decompose the non-adopters before buying another lever.\n\nTelemetry splits them in a week. Never-activated (licensed, never really tried — did the moment of need ever arrive in their tool? 050's question), tried-and-churned (when did they leave? first-session churn is onboarding or fit; third-week churn is a quality event — cross-reference 063's tickets), active-but-shallow (using it as autocomplete, never discovered the capabilities — 062's problem), and the segment nobody budgets for: no-fit — roles whose workflows the agent genuinely doesn't serve yet. Five interviews per segment converts the telemetry into causes.\n\nThen match responses like a doctor, not a marketer: churned users get their actual failure fixed and a specific re-invitation ('the thing that failed you is fixed — here's proof', 013's trust recovery; a mandate to return to a tool that burned you breeds contempt). Never-activated get in-flow moments, not more email. Shallow users get 062's example surfaces. And no-fit gets the intervention leadership least expects: subtraction. Take them out of the denominator publicly — 'the agent addresses 75% of licensed roles today; within that base we're at 53% and here's the segment plan' — because the renewal fight at '40% vs 70%' is unwinnable and dishonest in both directions, while 'here's the addressable base, here's the per-segment plan, here's the license count that should shrink or the scope investment that grows the base' is a conversation adults can close.\n\nThe discipline underneath: plateaus are never one number. They're the sum of different people not-using for different reasons, and the team that segments before spending wins a quarter on everyone still arguing about the average.",
  rubric: {
    diagnosis: "Reads intervention-resistance as evidence of heterogeneity and decomposes the non-adopters into causal segments.",
    move: "Telemetry segmentation plus per-segment interviews, matched responses per cause, and the addressable-base re-anchor for renewal.",
    measurement: "Segment-level conversion per intervention — never the blended rate; falsifier allows the homogeneous-blocker case where one fix beats the machinery.",
    synthesis: "Connects the segments to their owning problems (050 surfaces, 062 enablement, 013 win-backs, 063 tickets) — the plateau as an index into the whole playbook.",
    altitude: "Leadership trades an unwinnable percentage fight for an addressable-base decision: fix, shrink, or invest — all honest options.",
    transfer: "Plateau diagnosis is the growth-PM core skill — segment-decomposed adoption, matched interventions, and honest ceilings travel to every product with a flatline.",
  },
  adversarial:
    "The intervention-shopper's failure: buying a fourth lever (gamification! champions! — even 061's network) before segmenting — good mechanisms aimed at blended populations produce blended nothing, and each failure spends leadership's patience. The declare-victory failure: '40% is actually fine' without the addressable-base math — maybe it is; you don't know, and asserting it in the renewal meeting without the no-fit decomposition is a guess wearing confidence. And the subtraction dodge: doing the whole diagnosis but not telling leadership about the no-fit segment because shrinking the denominator feels like retreat — the 70% assumption will then fail in the renewal room instead of in the planning room, at maximum cost.",
  recursiveFollowup:
    "Segmentation lands: 22% no-fit, 18% never-activated, 12% churned (mostly week-one, mostly one workflow's quality issue — since fixed), 8% blocked by a device policy. The churned re-invitation works on a third of them. Then procurement reads your addressable-base memo and proposes cutting the no-fit licenses at renewal — which halves the deal size, and your champion (the CIO who bought 'transformation for everyone') hears retreat. Handle the room where honesty and the deal collide.",
  altitude: {
    exec:
      "Three interventions didn't move the line because 'the sixty percent' is four different groups: roles we don't serve yet, people who tried and got burned by one since-fixed issue, people who never had a reason to start, and people whose devices block them. Each gets its own fix — and the honest denominator changes the renewal math: within the roles we actually address, you're at 53% and climbing, and the no-fit segment is a scope decision, not a failure.",
    engineer:
      "Segment the license base: activation events, session recency/depth, churn timing, role mapping. Interview sample per segment. Instrument per-segment funnels so each intervention reads against its target only. Churn-cause cross-reference with the 063 ticket taxonomy; re-invitation campaign gated on the underlying fix shipping.",
    frontier:
      "Adoption plateaus decompose or they persist: never-activated, churned, shallow, blocked, and no-fit each have different physics, and blended interventions cancel across them. The transferable discipline — segment before spending, match mechanism to cause, and re-anchor targets on the addressable base — is growth engineering for any deployed product, agents included.",
  },
},

);
