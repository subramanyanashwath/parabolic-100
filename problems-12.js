/* Parabolic 100 — problem bank, part 12 (Platform Feedback & Product Strategy depth, 066–070) */

P100.PROBLEMS.push(

/* ============================================================ 066 */
{
  id: "066",
  title: "The Feature That Eats the Services Business",
  difficulty: "Hard",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Platform",
  secondaryLens: "Market",
  archetype: "Builder",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Apps Platform", "MSFT MAI Strategy & Ops"],
  tags: ["cannibalization", "ecosystem", "partners", "automation"],
  prompt:
    "The platform team you feed signal to is about to ship 'agent setup autopilot' — automated data connection, permission scoping, and eval scaffolding that collapses a six-week partner engagement into an afternoon wizard. Your SI partners heard about it at a preview and are furious: implementation services around agent setup are 40% of their AI practice revenue, and they drive most of your enterprise deals. One partner exec says the quiet part: 'You're asking us to sell the thing that fires us.' Product asks for your read before launch. Give it.",
  arc: {
    start: "A genuinely good feature aimed at the revenue of the ecosystem that sells your platform.",
    mid: "Separate whose margin dies from whose problem gets solved — then build the partners a road up the stack.",
    end: "Autopilot ships, partners migrate to higher-value work with launch-day enablement, and the channel survives its own automation.",
  },
  expected: {
    bottleneck: "Two truths colliding without a transition design: automation of commodity setup work is inevitable and customer-good (whoever ships it wins the platform race), while partners are simultaneously the platform's distribution channel — the missing piece isn't a decision between them, it's the migration path that lets the channel survive the automation of its bottom layer.",
    failureMode: "Ship without the path: partners feel ambushed, quietly steer deals toward platforms that 'respect the ecosystem' (their switching costs are lower than yours), enterprise pipeline softens two quarters later with no traceable cause — or, capitulating, product delays the feature, a competitor ships it, and you've protected the channel's margins by donating the market.",
    nextMove: "Recommend shipping WITH a partner transition built as deliberately as the feature: (1) name the truth in the room — setup services were always a wasting asset; automation timing was the only variable, and partners' real durable value was never wizard-work but judgment (scenario selection, governance design, change management — the things this bank trains); (2) build the road up the stack — launch-day partner enablement for the new high-ground (autopilot makes MORE deployments happen, each needing discovery, governance, evals, adoption work — 022's honest-coverage discipline says size that expansion honestly); (3) give partners mechanical advantages in the new motion — autopilot's outputs hand off into partner-led workstreams, partner-attach incentives on autopilot-initiated deployments, co-sell credit preserved; (4) sequence the reveal — partners hear the transition plan WITH the feature announcement, not after; the ambush is the wound, not the automation.",
    metric: "Partner-attach rate on autopilot-initiated deployments (does the channel participate in the new motion, or route around it) and partner AI-practice revenue mix shift over four quarters — setup shrinking while governance/adoption grows is the transition working; total partner revenue collapsing is the channel dying.",
    owner: "Product owns shipping; partner org owns the enablement and incentive redesign, launch-synchronized; you own the honest sizing of the up-stack opportunity and the partner-exec conversations where the wasting-asset truth gets said with respect.",
    falsifier: "If the up-stack sizing comes back thin — the judgment work is real but 5x smaller than the setup revenue it replaces — then the transition story is partially hollow, honesty demands saying so, and the recommendation shifts: still ship (the market forces it), but with partner economics rebuilt around attach incentives and margin-sharing, not around a growth story that doesn't add up.",
  },
  modelAnswer:
    "Start with who bears which risk, because the fury is conflating them: customers bear the risk of manual, slow, error-prone setup — the feature solves that, and a competitor will if you don't. Partners bear the risk of automation eating their commodity layer — real, but that risk existed the day setup became repeatable enough to wizard; this launch is the timing, not the cause. Setup services were a wasting asset, and everyone's strategy deck quietly knew it. The platform's actual exposure is different: partners are distribution, and distribution that feels betrayed doesn't argue — it re-weights, quietly, toward whoever respects it (the pipeline softens in two quarters and no dashboard says why).\n\nSo the read to product: ship it — and treat the partner transition as a launch feature with the same engineering seriousness as the wizard. The road up the stack is real if you build it: autopilot collapses setup, which means MORE deployments start, and every one needs what automation can't do — scenario selection (051/052), governance design (001/060), eval programs (016/017), adoption work (061/065). That's the partners' new practice, and launch-day enablement for it (playbooks, certification, the 022 honest-coverage map of what's genuinely theirs) is what converts 'you fired us' into 'you promoted us.' Give the motion mechanical teeth: autopilot's outputs hand off into partner-led workstreams by design, attach incentives on autopilot-initiated deployments, co-sell credit intact.\n\nAnd sequence like it matters, because it's most of the game: partners hear the transition WITH the announcement — an ambush plus a good plan still reads as an ambush. Size the up-stack honestly before promising it (the falsifier is live: if judgment-work revenue can't replace setup revenue, say so and rebuild the economics with attach and margin-share instead of a growth fairy tale). The one-line version for the partner exec who said the quiet part: 'The wizard was always coming — from us or from someone who owes you nothing. From us, it arrives with your next practice attached.'",
  rubric: {
    diagnosis: "Separates customer risk from partner risk from platform risk, and names setup services as a wasting asset with only timing in question.",
    move: "Ship with a launch-synchronized transition: up-stack enablement, mechanical attach advantages, and the reveal sequenced with the announcement.",
    measurement: "Partner-attach on autopilot deployments and revenue-mix shift as the transition telemetry; falsifier forces honest sizing of the up-stack story.",
    synthesis: "Sees distribution as the real exposure and the ambush as the wound — ecosystem trust engineering, not feature triage.",
    altitude: "The partner-exec line lands the whole strategy in one sentence: the wizard was coming; from us it arrives with your next practice attached.",
    transfer: "Platform-vs-ecosystem cannibalization is a standing lab question — every capability labs ship eats someone's services layer, and transition design is the difference between channel and churn.",
  },
  adversarial:
    "The Darwinist failure: 'partners who can't move up the stack deserve it' — economically defensible, strategically illiterate; you need the channel's deal flow during exactly the quarters the transition takes, and contempt leaks into rooms you're not in. The protectionist failure: delaying or degrading the feature to preserve partner margins — you've taxed every customer to subsidize a wasting asset, and the competitor who ships it inherits your market AND eventually your partners. The sequencing miss: announcing the feature and following with the transition plan 'soon' — the two-week gap is where the betrayal narrative sets, and no enablement program un-writes it.",
  recursiveFollowup:
    "Launch works; attach incentives hold most partners. But the largest SI responds differently: they build their own setup autopilot on your APIs, undercut your feature with it, and bundle it free inside their engagements — automating themselves before you could, and commoditizing YOUR wizard. Ecosystem judo. Is this a violation to fight or exactly the behavior the transition was supposed to produce? Decide, and price the precedent (059's clause meets 021's math).",
  altitude: {
    exec:
      "Ship it — the alternative is a competitor shipping it without owing our partners anything. But the launch has two features: the wizard, and the partner road up the stack — enablement for the judgment work automation creates more of, attach incentives so the channel participates in the new motion, and they hear all of it the same hour they hear the announcement. The ambush would cost more than the automation.",
    engineer:
      "Autopilot outputs designed as handoff artifacts: governance checklist, eval scaffold, and adoption plan stubs that open partner-led workstreams. Attach tracking on autopilot-initiated deployments; co-sell credit flows unchanged. Partner enablement kit versioned with the feature itself — same release train, same launch gate.",
    frontier:
      "Every platform automates its ecosystem's bottom layer eventually — the strategic craft is transition design: name the wasting asset honestly, build the up-stack road before launch, give the channel mechanical advantages in the new motion, and never let the reveal lag the release. Channels forgive automation; they don't forgive ambushes.",
  },
},

/* ============================================================ 067 */
{
  id: "067",
  title: "The Pricing Signal Nobody Sends",
  difficulty: "Medium",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Platform",
  secondaryLens: "Market",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform", "OpenAI DPM (Codex)"],
  tags: ["pricing", "packaging", "field-signal", "deal-loss"],
  prompt:
    "Fourth deal this quarter dying the same death: enterprise customers love the agent platform's per-seat pricing for copilots, but their highest-value use cases are autonomous agents — 20 background agents serving 8,000 employees maps to '20 seats,' which prices transformation at the cost of a team lunch, so the pricing team bolts on 'platform fees' that customers experience as arbitrary, and deals stall in procurement. Each account team has quietly discounted its way through or lost. Nobody has told product that the pricing model — not the price — is the problem, because 'pricing feedback' is culturally read as 'sales wants it cheaper.' Send the signal so it lands.",
  arc: {
    start: "A structural pricing mismatch dying in four separate discount negotiations.",
    mid: "Assemble the pattern with deal evidence — the model misfits the workload, and cheaper wouldn't fix it.",
    end: "A pricing-architecture brief product can act on — with the field's evidence and none of the discount smell.",
  },
  expected: {
    bottleneck: "The feedback channel has a credibility filter: pricing signal from the field is auto-classified as discount lobbying, so the actual finding — per-seat architecture can't express autonomous-agent value, a structural mismatch no discount fixes — never arrives at the people who own pricing architecture; meanwhile each account team 'solves' it locally, hiding the pattern (020's evidence-stripping, with a pricing-specific immune response on top).",
    failureMode: "Four more quarters of the same: deals stall or close on one-off discounts that train customers to negotiate and finance to distrust the field; competitors with consumption or outcome pricing take the autonomous-agent segment; and when pricing finally changes, it's a panic response to churn data instead of a designed response to field signal — two years late, at maximum cost.",
    nextMove: "Build the signal so it can't be read as discount lobbying: (1) frame it as architecture, not level — the brief's first line: 'we are not asking for lower prices; several of these customers would pay MORE under a model that maps to their value' (and prove it: deals where customers proposed higher-total-cost consumption structures and were refused); (2) assemble the pattern with 020's arithmetic — deals affected, revenue stalled, discount depth used as workaround, procurement objections verbatim; (3) characterize the workload shift — the seat-to-agent ratio trend across the book is the market datum product lacks: seats measure humans, and the value is moving to non-humans; (4) propose the problem shape, not the price sheet — 'autonomous agent workloads need a unit that scales with work done (tasks, runs, outcomes), and here are three customers who'd design-partner it' (021's decomposition, aimed at your own product); (5) route it to pricing's actual owner with the field-signal credibility you've built — this is the channel's hardest test precisely because pricing is where its credibility is weakest.",
    metric: "The seat-to-agent ratio trend and stalled-revenue-at-structure — plus the killer exhibit: dollars customers offered under other structures that the current model couldn't accept; leaving money on the table is the only pricing evidence that's immune to the discount-lobbying read.",
    owner: "You own the brief and its framing discipline; account teams supply deal forensics (their quiet workarounds become the evidence); product/pricing owns the response; the three design-partner customers own making the new unit real.",
    falsifier: "If deal forensics show the stalls are actually price-level after all — customers balked at totals, not structure, and the 'would pay more' exhibits don't exist — then the field's instinct was the ordinary kind, the brief you almost sent would have spent channel credibility on discount lobbying wearing architecture language, and the honest signal is a smaller one about segment willingness-to-pay.",
  },
  modelAnswer:
    "The interesting failure here isn't pricing — it's that the organization has an immune system against its own pricing telemetry. 'Pricing feedback equals sales wants it cheaper' is usually a good prior, which is exactly why structural signal dies: the one case where the field is reporting architecture gets classified with the hundred cases where it's reporting discomfort. Your job is to build a brief the immune system can't reject.\n\nThe inoculation is the first line: this is not a request for lower prices — and the proof is the strongest exhibit you have: customers who offered MORE money under structures the model couldn't accept. A customer proposing a consumption deal at 1.4x the per-seat total, refused because the system can't book it, is evidence no one can read as discounting. Find those moments in the four deals; they exist, because procurement stalls on 'arbitrary platform fees' are usually customers asking for a legible unit, not a smaller number.\n\nThen the pattern, with 020's discipline: four deals, stalled revenue, discount depth used as duct tape, procurement language verbatim ('what is this fee for?'). And the market datum product genuinely lacks: the seat-to-agent ratio across your book, trending. Per-seat pricing was built when value tracked humans-with-licenses; the workload is migrating to agents-doing-tasks, and 20 agents serving 8,000 people at '20 seats' isn't underpriced — it's unpriced, a category error the price level can't fix.\n\nPropose the problem shape and stop there: value units that scale with work (tasks, runs, resolved outcomes), three named design partners, and the explicit non-goal of writing the rate card — pricing owns the solution; the field owns the evidence that the current shape leaves money on the table in both directions. That's the brief pricing can act on. The discount version of this conversation was always available and always ignored; the money-refused version has never been sent — which is why it works.",
  rubric: {
    diagnosis: "Names the credibility filter as the real blocker and the structural (unit) mismatch beneath the price-level noise.",
    move: "Inoculated brief: would-pay-more exhibits first, deal-pattern arithmetic, workload-shift datum, problem-shape proposal with design partners.",
    measurement: "Money-refused-at-structure as the immune-proof evidence, plus seat-to-agent trend; falsifier honestly downgrades to a willingness-to-pay note.",
    synthesis: "Sees the four quiet discounts as the pattern-hiding mechanism and pricing as the field channel's hardest credibility test.",
    altitude: "Pricing hears market architecture from the field — not sales discomfort — because the framing was engineered for exactly that reading.",
    transfer: "Pricing-model feedback is the API-platform TPM's live problem — seat/consumption/outcome tension on agent workloads is the industry's open pricing question.",
  },
  adversarial:
    "The lobbying failure: sending the pattern with discount data as the lead — accurate, and instantly classified; the brief dies in the immune system and takes your channel credibility with it (020's false-alarm cost, prepaid). The rate-card failure: proposing the new pricing yourself, in detail — you've turned market signal into a turf invasion, and pricing will litigate your spreadsheet instead of the finding. The forensics skip: writing the brief from account-team vibes without the deal evidence — the first 'show me a customer who'd pay more' you can't answer converts the whole structural argument back into discomfort with extra steps.",
  recursiveFollowup:
    "Pricing agrees and pilots task-based pricing with your three design partners. Two quarters in: one partner's costs under the new model are 3x their old per-seat spend — because the model finally prices what they actually use — and they're escalating that your brief 'got their pricing raised.' The signal worked; the messenger is now the villain. Handle the account, and decide what you owed them at recruitment time.",
  altitude: {
    exec:
      "We're leaving money on the table in both directions: customers stall on fees they can't explain to procurement, and other customers have offered MORE under structures we can't book. The model prices humans; the value has moved to agents doing work. Four deals, the evidence, and three customers ready to co-design the unit — this is market signal, not a discount request, and the exhibits prove it.",
    engineer:
      "Deal forensics: stall points, discount depth, procurement objections verbatim, and any customer-proposed alternative structures with totals. Instrument the seat-to-agent ratio across active deployments — that trend line is the brief's spine. Design-partner scope: task/run/outcome metering feasibility on existing telemetry (038's accounting becomes the billing meter).",
    frontier:
      "Agent workloads are breaking seat pricing across the industry, and the labs' own consumption models are the other half of the experiment. The transferable craft is sending pricing signal that survives the discount filter: lead with money refused, carry deal arithmetic, propose units not rates — structure feedback is market intelligence, and it has to be dressed as such to live.",
  },
},

/* ============================================================ 068 */
{
  id: "068",
  title: "Two Partners, One Deal",
  difficulty: "Medium",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Platform",
  secondaryLens: "Altitude",
  archetype: "Sweeper",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "MSFT MAI Strategy & Ops", "Anthropic TPM Apps Platform"],
  tags: ["partners", "conflict", "rules-of-engagement", "ecosystem"],
  prompt:
    "A flagship enterprise deal is mid-flight when it turns into a partner war: the global SI who 'owns' the account relationship discovers that a boutique AI consultancy — brought in by the customer's CTO for their agent expertise — has been positioned to lead the deployment. The SI escalates to your leadership citing their partnership tier and pipeline contribution; the boutique escalates through the CTO, who says the quiet part: 'The big firm will staff it with juniors and a slide factory. I want the people who've done this.' Both partners threaten to walk from the platform. The customer is watching how you referee. Design the resolution — and the system so this stops being an escalation.",
  arc: {
    start: "Two partners escalating through different doors, a customer grading the referee, and no rules anyone agreed to.",
    mid: "Resolve this deal on the customer's outcome; then write the rules of engagement that were always missing.",
    end: "A teamed deal with named lanes — and published conflict rules that turn the next collision into a lookup, not a war.",
  },
  expected: {
    bottleneck: "There are no rules of engagement — partner conflict is being resolved by escalation volume and tier politics because nothing was pre-committed: no deal-registration norms, no capability-fit criteria, no teaming templates — so every collision is decided ad hoc, which means decided by whoever escalates loudest (023's allocation-by-escalation, wearing partner badges), while the customer's actual preference is treated as one voice among the lobbying.",
    failureMode: "Leadership backs the big SI on tier math: the CTO — who told you exactly what he wanted — learns the platform overrides customers for channel politics, the deployment gets the slide factory, struggles (which becomes YOUR platform's reference failure, 016-style), the boutique takes its scarce expertise to a competitor's ecosystem, and every future deal's partners learn that escalation, not fit, wins.",
    nextMove: "Two tracks, explicitly separated: (1) this deal — the customer's outcome decides: the CTO stated the requirement (senior agent expertise, delivery over decks), so structure a teamed engagement with named lanes — boutique leads deployment architecture and delivery, SI leads program management, change enablement (061/062 scale work), and integration where their account depth is real; both keep revenue, neither gets the whole, the customer gets the staffing they asked for, and the lanes are in the SOW, not a handshake; (2) the system — publish rules of engagement so the next conflict is a lookup: deal registration with timestamps, capability-fit criteria per workstream type (certified evidence, not tier), customer-preference weight made explicit, teaming templates as the default resolution, and an escalation path that prices itself (023's council pattern — conflicts get rulings, rulings get recorded, records become precedent).",
    metric: "This deal: delivery quality and customer confidence (the CTO's grade is the one that compounds); the system: partner-conflict escalations reaching leadership per quarter — trending toward zero as published rules absorb them — and boutique-tier retention, the canary for whether fit ever actually beats tier.",
    owner: "You referee this deal against the customer-outcome principle and own drafting the rules; partner leadership ratifies and enforces them (rules they didn't author, they won't defend — 054's mechanism); both partners own their lanes contractually; the customer's stated requirement gets standing, in writing.",
    falsifier: "If diligence shows the CTO's read is wrong — the boutique is two founders and a deck who can't staff the deployment either, and the SI's AI practice has real senior delivery evidence — then the customer's preference was based on a capability myth, the right move is showing the CTO the evidence rather than executing his mistake, and the teaming structure inverts: SI leads delivery, boutique advises.",
  },
  modelAnswer:
    "First, name what kind of failure this is: not a hard call, a missing system. Two partners are escalating through different doors because no rules exist — no registration norms, no fit criteria, no teaming default — so the conflict is being auctioned by escalation volume, and both bidders know it. Resolve the deal on principle, then build the system so the principle stops needing you personally.\n\nThe deal: the customer's outcome is the tiebreaker, and the customer told you the answer. The CTO's sentence — juniors and a slide factory versus people who've done this — is a requirement statement, not lobbying; a platform that overrides its customer's staffing judgment to service channel politics is optimizing the org chart over the deployment (008's sin, in ecosystem form), and the failed deployment will wear YOUR logo in every future reference call. But 'boutique wins' is the shallow read: the deal has lanes, and the SI's depth is real in some of them. Team it: boutique leads agent architecture and delivery (the scarce expertise the CTO bought), SI leads program management, integration, and the change-management scale work their bench genuinely fits (061's networks need bodies). Named lanes in the SOW; both revenue lines survive; the customer gets what they asked for with more capacity than either partner alone. Run the falsifier first — verify the boutique can actually staff what the CTO believes they can; executing a customer's capability myth is its own betrayal.\n\nThe system: publish rules of engagement this quarter, while the wound is fresh enough to motivate ratification — deal registration with timestamps, capability-fit evidence per workstream (certifications and delivery references, not tier), explicit customer-preference weight, teaming as the default resolution shape, and recorded rulings that become precedent (023's council, pointed at the channel). The metric of success is boring on purpose: conflicts stop reaching leadership because the rules answer them first. Referees who are needed for every call haven't built a game — they've built a bottleneck with a whistle.",
  rubric: {
    diagnosis: "Names the missing rules-of-engagement as the real failure and escalation-volume as the current allocator — this deal is a symptom.",
    move: "Teamed lanes decided by customer outcome (falsifier-checked), then published registration/fit/teaming rules with recorded precedent.",
    measurement: "CTO-graded delivery now; escalations-reaching-leadership trending to zero as the system metric; boutique retention as the fit-beats-tier canary.",
    synthesis: "Sees the customer watching the referee — the deployment's success is the platform's reference asset, worth more than either partner's threat.",
    altitude: "Both partner execs hear lanes and survival; the CTO hears his requirement honored; leadership hears the escalations ending.",
    transfer: "Ecosystem conflict design is standing platform work — registration, fit criteria, and teaming defaults are how every mature channel stops auctioning deals to the loudest tier.",
  },
  adversarial:
    "The tier-math failure: backing the global SI because pipeline contribution is real and the boutique is small — you've taught the ecosystem that escalation and size beat fit, shown the customer their stated requirement is decorative, and staked your platform's flagship reference on the staffing model the CTO explicitly rejected. The customer-literalist failure: handing the boutique the whole deal because the CTO likes them — unverified capability myth, no scale bench for the rollout phases, and an SI relationship (with its 40 other deals) burned for lanes it could have kept. The system skip: resolving this deal brilliantly and writing no rules — you've become the permanent referee, which means every future conflict escalates to you by design, and 023 already taught you what allocation-by-escalation does to trust.",
  recursiveFollowup:
    "The teamed deal works; the rules publish. Next quarter, the global SI registers every AI-adjacent opportunity in their account base the day the rules go live — 200 registrations, most without any active work — weaponizing your timestamp system to lock out boutiques ecosystem-wide. The letter of your rules, the opposite of their intent. Patch the system (registration needs teeth — activity requirements? expiry?) and decide what this gaming attempt tells you about the SI relationship itself.",
  altitude: {
    exec:
      "The customer told us the requirement: senior agent expertise, not a slide factory. So the deal gets lanes — the boutique leads delivery, the SI leads program and scale work they're genuinely built for, both in the SOW. And this stops reaching your desk: we're publishing rules of engagement — registration, capability evidence, customer weight, teaming as default — so the next collision is a lookup, not a war.",
    engineer:
      "SOW with named workstream lanes and interface points between partners; capability verification before lane assignment (delivery references, certified staff on the actual roster). Rules infrastructure: registration system with activity requirements and expiry, fit-evidence criteria per workstream class, ruling log that accumulates as precedent.",
    frontier:
      "Partner ecosystems allocate by escalation until someone installs rules — registration, evidenced fit, teaming defaults, recorded precedent. The transferable read: the customer's outcome is the only tiebreaker that compounds (references outlive tier politics), and a referee whose rulings don't become rules has built themselves a permanent job and the ecosystem a permanent auction.",
  },
},

/* ============================================================ 069 */
{
  id: "069",
  title: "The Roadmap You Can't Show",
  difficulty: "Medium",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Altitude",
  secondaryLens: "Platform",
  archetype: "Maintainer",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform", "OpenAI DPM (Codex)"],
  tags: ["roadmap", "nda", "communication", "commitments"],
  prompt:
    "A strategic customer's architecture board is making a two-year platform bet and demands 'the real roadmap' before committing: specific capabilities with quarters attached. You know the roadmap — and you know it's fiction past 90 days (priorities re-sort monthly in this market, and 030 taught this account what a broken promise costs). Your account exec's answer is to show the internal slide 'under NDA, informally.' The customer's architects are sophisticated: vague vision decks insult them, and they'll design their integration around whatever you show. Thread it.",
  arc: {
    start: "A customer that needs certainty, a roadmap that can't honestly provide it, and an AE about to leak fiction.",
    mid: "Replace date-promises with direction-plus-contract: firm principles, staged visibility, and change notification.",
    end: "An architecture board designing against commitments you'll actually keep — and trusting you more for the honesty.",
  },
  expected: {
    bottleneck: "The customer is asking for the wrong instrument: they need decision-grade certainty for a two-year bet, and a feature-date roadmap — any roadmap, from any vendor in this market — cannot honestly supply it; the real deliverables are architectural invariants (what won't change), directional weights (where investment concentrates), and a change-notification contract (how they'll never be surprised), which together answer the board's actual question better than the fiction would.",
    failureMode: "The NDA slide leaks its way into their integration design: two quarters later the roadmap re-sorts (it always does), their architecture is coupled to a cancelled feature, and 'you showed us this under NDA' converts a routine re-plan into a betrayal narrative (030's arithmetic at architecture-board scale) — or, refusing everything, the vague-vision insult sends a two-year bet to the competitor whose AE showed THEIR fiction.",
    nextMove: "Decompose what the board actually needs to de-risk their bet, then serve each honestly: (1) invariants — the commitments that ARE durable (API stability guarantees, deprecation policy with notice windows, data residency directions, backward-compatibility posture): these are signable and they're what integration architecture actually couples to; (2) directional weights, not features — 'agent orchestration and governance are top-3 investment areas for the next 6-8 quarters' is true, useful, and survives re-sorts that kill individual features; (3) staged visibility with skin — quarterly architecture syncs under NDA where near-term (90-day) plans get real specificity, plus design-partner status on the capabilities they care most about (they see early because they shape it — 020's channel, reversed); (4) the change contract — committed notice periods for breaking changes and deprecations, in the agreement: 'you will never be surprised' is the promise that substitutes for 'nothing will change,' because it's the one you can keep.",
    metric: "Surprise count — roadmap changes that hit this customer without contractual notice (target: zero) — and their integration's coupling profile: designed against invariants and stable interfaces versus speculative features; the second is checkable in their architecture reviews and predicts whether the relationship survives the first re-sort.",
    owner: "You own the reframe and the quarterly sync cadence; product owns declaring which invariants are actually signable (don't invent guarantees — 030); legal owns the notice-period contract language; the AE owns selling the honesty as the differentiator it genuinely is in a market of leaked fictions.",
    falsifier: "If the board rejects the package and insists on feature-date commitments as a gate — and a competitor provides them — then this account values comfortable fiction over durable contract, the bet was going to end in 030's repair meeting regardless of vendor, and losing it to the competitor's future broken promises is, unpleasantly, the cheaper outcome; say that internally with 021's walk-away discipline.",
  },
  modelAnswer:
    "Name the instrument mismatch first: the board is asking for feature-dates because that's the only roadmap format they've ever been offered — but their actual need is de-risking a two-year architecture bet, and in this market, feature-date roadmaps past 90 days are fiction with formatting. Showing the internal slide 'informally' doesn't transfer information; it transfers liability — sophisticated architects will couple their integration to whatever they see (that's what architects do with roadmaps), and the market will re-sort your priorities before their first milestone. 030 already taught this account the price of a promise that outran reality; the NDA version is that mistake with a paper trail.\n\nServe the need instead, in four instruments that are all true. Invariants: what won't change — API stability windows, deprecation notice policy, compatibility posture, residency direction. This is what integration architecture should couple to anyway, and it's signable. Directional weights: where the investment concentrates ('agent governance and orchestration are top-three areas for 6-8 quarters') — survives every re-sort that kills individual features, and tells the board which bets ride WITH your gravity. Staged visibility: quarterly architecture syncs where the 90-day window gets real specificity (that part of the roadmap is honest), plus design-partner status on their two most-coupled capabilities — they see earliest what they help shape, which converts roadmap anxiety into roadmap influence. And the change contract: committed notice periods for anything breaking, in the agreement. 'Nothing will change' is a lie; 'you will never be surprised' is an SLO.\n\nThen arm the AE with the actual sales insight: in a market where every competitor is leaking fiction under NDA, the vendor whose commitments are engineered to be keepable is the differentiated one — and architecture boards, unlike procurement, are staffed with people who've been burned by roadmaps before. The falsifier stays live: a board that insists on the fiction as a gate is pre-purchasing 030's repair meeting from someone; better the competitor's calendar than yours.",
  rubric: {
    diagnosis: "Names the instrument mismatch — certainty needed, feature-dates can't supply it — and the NDA slide as liability transfer, not information transfer.",
    move: "Invariants + directional weights + staged 90-day visibility with design-partner influence + contractual change notice: four honest instruments replacing one fiction.",
    measurement: "Zero-surprise SLO and the integration's coupling profile; falsifier applies walk-away discipline when fiction is the entry price.",
    synthesis: "Sees that 'never surprised' substitutes for 'never changes' — the keepable promise engineered to serve the unkeepable one's purpose.",
    altitude: "Architects get invariants and influence (their language), the AE gets a differentiator, the board gets a bet they can actually de-risk.",
    transfer: "Roadmap communication under uncertainty is the platform TPM's weekly craft — labs' deprecation policies and stability guarantees are exactly this architecture.",
  },
  adversarial:
    "The leak failure: the NDA slide — every feature on it becomes a coupling point and every re-sort becomes a betrayal; you've optimized this quarter's close against next year's 030. The fortress failure: 'we don't share roadmaps' delivered as policy — true, insulting, and it loses to the competitor's fiction; the board's need was legitimate even if their requested instrument wasn't. The invariant-inflation miss: declaring guarantees product hasn't actually committed to (stability windows you made up in the room) — you've replaced feature fiction with contract fiction, which is strictly worse because it's signed.",
  recursiveFollowup:
    "The package lands; they sign. Three quarters in, the market forces exactly the re-sort you feared — and one change, while inside its contractual notice window, guts a capability their integration leaned on directionally ('agent orchestration' stayed top-3, but the specific orchestration primitive they built against is deprecated). Notice was given; surprise happened anyway. The board invokes the spirit-versus-letter distinction you taught them. Run the meeting — and decide what the change contract owes beyond its own text.",
  altitude: {
    exec:
      "I won't show you a slide that will be fiction by Q3 — and anyone who will is transferring their re-planning risk to your architecture. Here's what I can sign: the interfaces that won't break and the notice you'll get before anything does, where our investment concentrates for eight quarters, real specificity every ninety days, and design-partner influence on the two capabilities you're coupling to. You'll never be surprised — that's the promise I can keep.",
    engineer:
      "Give the architects the coupling guidance directly: design against the stability-guaranteed interfaces and the deprecation-notice contract, treat directional areas as gravity (not API), and route speculative dependencies through the quarterly sync where 90-day plans are real. Their integration review should be checkable against invariants only.",
    frontier:
      "Communicating direction under re-sort conditions is platform craft: invariants, weighted directions, short-window specificity, and contractual notice — the four honest instruments. The transferable law: promise change-management, never changelessness; 'no surprises' is an SLO, 'no changes' is next year's apology.",
  },
},

/* ============================================================ 070 */
{
  id: "070",
  title: "The Product Is Wrong for Them",
  difficulty: "Easy",
  category: "Platform Feedback & Product Strategy",
  primaryLens: "Customer",
  secondaryLens: "Platform",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Apps Platform"],
  tags: ["disqualification", "fit", "honesty", "long-game"],
  prompt:
    "A mid-size legal firm — referred by your happiest customer — wants agents for contract drafting: fully autonomous first drafts of bespoke M&A agreements, filed under deadline pressure, with 'no lawyer time wasted reviewing.' Their managing partner has budget approved and wants to sign this quarter. Everything you know says no: the work is high-stakes and low-volume, the firm has no eval capacity (no one to check outputs systematically), bespoke M&A drafting is exactly where current agents are weakest, and 'no review' violates every deployment rule this bank has taught (010, 044, 060). The AE is at quota. Say the thing.",
  arc: {
    start: "Approved budget, a warm referral, an eager AE — and a use case designed to fail publicly.",
    mid: "Disqualify the use case, not the customer: name why, in their risk language, and find the adjacent fit.",
    end: "A smaller, right deal now — and a firm that trusts your yes because they watched you say no.",
  },
  expected: {
    bottleneck: "The proposed use case fails every fit test simultaneously — high-stakes outputs, no review capacity, weakest model territory, autonomy where 010's ladder would demand its opposite — and the missing organizational muscle is disqualification: the ability to say 'not this, not yet' to approved budget without losing the relationship or the honest smaller deal hiding underneath.",
    failureMode: "Take the deal as specified: the firm ships unreviewed bespoke M&A drafts, the first material error surfaces in a filed document (015's incident with malpractice attached), the story travels the legal community with your platform's name in it, the happy customer who referred them wears it too — and the AE's quota quarter costs three accounts and a market segment.",
    nextMove: "Disqualify the use case in their risk language, then redirect to the adjacent fit: (1) say it at their altitude — 'autonomous bespoke drafting without review is where this technology fails today, and in your business a failure is a malpractice event; I won't sell you that' (the sentence IS the trust asset); (2) decompose what they actually want (ask→need): the partner's need is associate-hours recovered, not autonomy — and the fit exists one rung down: research and precedent retrieval, clause-library drafting for standardized instruments (NDAs, engagement letters), first-pass diligence summarization — all with lawyer review as designed workflow, not overhead (010's draft-rung, permanently); (3) size the honest deal — smaller now, expandable on evidence (the 055 pilot with kill criteria the firm's skeptics help write); (4) tell the AE the real math — the disqualified deal was never revenue, it was a churn event with a signing bonus; the smaller deal plus the referral engine of being the vendor who said no is the actual quota play.",
    metric: "The redirected deal's task success under review (proving the fit), associate-hours recovered (the partner's true metric, named out loud), and — the long game — referral behavior from this firm: vendors who disqualify honestly become the ones legal communities recommend, and that's measurable in pipeline source data within a year.",
    owner: "You own the no and the redirect; the AE owns re-scoping (with your cover for the quarter conversation); the firm's skeptical senior associate — there's always one — gets recruited as the pilot's reviewer-designer (054's mechanism: the guardian becomes the co-author).",
    falsifier: "If discovery reveals the firm actually runs high-volume standardized work (hundreds of similar agreements yearly, a de facto clause library, an associate who already checks everything) — then the 'bespoke, no-review' framing was the managing partner's shorthand, not the workflow reality, and the real use case is closer to fit than the pitch suggested; disqualify the framing, not the firm.",
  },
  modelAnswer:
    "This is the easiest hard call in the bank: everything you know says the use case fails — and the discipline being tested is whether you can say so with budget on the table. Walk the tests: high-stakes outputs (filed M&A documents) with zero review capacity violates the one rule every incident in this bank teaches (015's audit, 010's ladder, 060's red lines — all of them exist because of exactly this configuration); bespoke drafting is the technology's weak territory today; and 'no lawyer time wasted reviewing' isn't a requirement, it's a misunderstanding of what the technology is — stated by someone whose liability insurance has opinions.\n\nSay it in their language, which is risk: 'Autonomous bespoke drafting without review is where this fails today, and in your business a failure isn't a bug — it's a malpractice event with your name on the filing. I won't sell you that.' That sentence costs a quarter's commission and buys something the AE can't see yet: in referral-driven markets (and legal is the referral-driven market), the vendor who visibly declined bad revenue becomes the safe recommendation — the disqualification IS the marketing.\n\nThen do the ask→need work, because the partner's actual need is legitimate: associate-hours are expensive and much of what burns them is NOT bespoke judgment. Research and precedent retrieval, clause-library work on standardized instruments, first-pass diligence summaries — real fit, high volume, and all designed with review as workflow (the draft-rung of 010's ladder as a permanent home, which for legal work it should be). Size it honestly, pilot it with 055's discipline — and recruit the firm's most skeptical senior associate to design the review protocol; in a firm, the skeptic converted is the adoption engine (061). The deal is smaller this quarter. It's also real: the version that closes big and detonates was never revenue — it was churn with a signing bonus, plus a story that travels to every firm the referrer knows. The falsifier matters too: verify the 'bespoke' framing before finalizing the no — managing partners pitch in shorthand, and sometimes the workflow underneath is standardized enough to change the answer.",
  rubric: {
    diagnosis: "Runs the fit tests explicitly — stakes, review capacity, model territory, autonomy — and names disqualification as the missing muscle.",
    move: "The no delivered in risk language, ask→need redirect to review-designed adjacent fit, honest sizing, skeptic recruited as reviewer.",
    measurement: "Task success under review and associate-hours recovered now; referral-source pipeline as the long-game proof; falsifier checks the 'bespoke' framing before the no is final.",
    synthesis: "Sees the referral economics — in trust-network markets, the visible no is the marketing — and the AE's 'lost' deal as prepaid churn.",
    altitude: "The managing partner hears malpractice arithmetic, not technology limitations; the AE hears the real quota math with cover attached.",
    transfer: "Disqualification is core FDE/platform judgment — labs decline misfit deployments constantly, because the failure wears the platform's name, not the customer's.",
  },
  adversarial:
    "The quota failure: taking the deal 'with caveats in the SOW' — caveats don't attend the malpractice hearing; the platform's name does, and the referrer's trust goes with it. The purity failure: a flat no with no redirect — the partner's underlying need was real and budgeted, and walking away entirely hands an adjacent-fit deal to a competitor who'll also take the toxic part. The soft-no miss: 'maybe next year when the technology matures' — vague deferral reads as sandbagging, teaches nothing, and leaves the partner to buy the bad use case from someone else this quarter; the honest no names WHY, which is what makes it portable to their next decision.",
  recursiveFollowup:
    "You say the no; the partner respects it; the clause-library pilot signs. Six weeks later the partner forwards you a competitor's proposal — full autonomous drafting, 'legal-grade AI, no review required,' referencing your objections as 'legacy-vendor caution.' The firm's younger partners are excited. You were the responsible vendor; now you look like the slow one. Defend the position without trashing the competitor — and decide whether to put your objections in writing for the file.",
  altitude: {
    exec:
      "I won't sell you autonomous M&A drafting without review — that's where this technology fails today, and in your business that failure is a malpractice filing, not a bug ticket. What I will sell you: the work burning your associates' hours that agents do reliably — research, precedent, standardized instruments — with review designed in. Smaller deal, real one. When I say yes to the next thing, you'll know what my yes is worth.",
    engineer:
      "Fit assessment as a checklist: output stakes, review capacity, task volume/standardization, model-territory strength, required autonomy level vs 010's ladder. The redirect scopes to retrieval and clause-library drafting with mandatory review workflow, 055-grade pilot with the skeptical associate designing acceptance criteria.",
    frontier:
      "Disqualification discipline is what separates platforms from vendors: misfit deployments fail wearing your name, and in referral markets the visible no compounds into pipeline. The transferable checklist — stakes, review capacity, model territory, autonomy fit — is the same one labs run before every enterprise engagement they decline.",
  },
},

);
