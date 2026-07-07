/* Parabolic 100 — problem bank, part 8 (Enterprise Integration depth, 046–050) */

P100.PROBLEMS.push(

/* ============================================================ 046 */
{
  id: "046",
  title: "The Data Stays in Frankfurt",
  difficulty: "Hard",
  category: "Enterprise Integration",
  primaryLens: "Architecture",
  secondaryLens: "Platform",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform", "OpenAI Deployment Eng"],
  tags: ["residency", "sovereignty", "data-flows", "compliance"],
  prompt:
    "A German industrial customer's works council and legal team approve the agent program on one condition: 'all data stays in Frankfurt.' The team nods — the tenant is in the EU region. Then you map the actual flows: prompts hit a model endpoint load-balanced across EU and US, embeddings are computed by a service pinned to Dublin, telemetry streams to a US analytics stack, and support engineers in three countries can pull conversation logs for debugging. Nobody lied; nobody looked. What do you do?",
  arc: {
    start: "'Data stays in Frankfurt' — a sentence everyone signed and nobody translated into flows.",
    mid: "Inventory every flow an agent request touches; classify each against what the requirement actually demands.",
    end: "A flow-by-flow residency map legal can sign — and a precedent-safe template for the next sovereign ask.",
  },
  expected: {
    bottleneck: "The requirement was accepted as a slogan, not decomposed into flows: an agent request touches inference, embeddings, retrieval indexes, logs, telemetry, and human support access — each with its own geography — and 'the tenant is in EU' covers exactly one of them.",
    failureMode: "The program runs for a year on the slogan; an audit, a works-council question, or a breach notification forces the flow map into daylight, and the gap between what was promised and what was built reads as deception — killing not just this program but the company's credibility for every future sovereign deal.",
    nextMove: "Decompose before promising: inventory every data flow in the request path (prompt, inference, embedding, index, logs, telemetry, model-improvement usage, support access) with its actual geography and retention; take the map to legal and the works council to learn which flows the requirement really binds — residency law and works-council intent usually distinguish content from telemetry, and processing from storage; then close the true gaps (EU-pinned inference endpoints, regional log storage, support access gated to EU staff with break-glass exceptions) and paper the rest as documented, agreed flows.",
    metric: "Flows mapped and classified versus flows total — the honesty denominator; then gap count by severity (content leaving region beats metadata leaving region by an order of magnitude).",
    owner: "You own the flow inventory; legal and the works council own classifying which flows the commitment binds; platform engineering owns the pinning work; sales owns never again signing geography sentences without the map.",
    falsifier: "If the mapping shows the platform's EU-region guarantees genuinely cover all content flows — inference, embeddings, and logs all pinned, and only anonymized telemetry leaves — then the architecture was honest and the work is documentation plus a support-access policy, not re-engineering.",
  },
  modelAnswer:
    "The failure already happened: a legal commitment was accepted in natural language and never compiled into architecture. 'Data stays in Frankfurt' is a sentence; an agent request is a supply chain — prompt to gateway, gateway to inference endpoint, text to embedding service, vectors to an index, everything to logs, logs to telemetry, telemetry to dashboards, and any of it to a support engineer's screen in another country when something breaks. Each hop has a geography, and each geography is a separate promise you did or didn't keep.\n\nSo compile it. (1) The flow inventory: every path data takes for one agent request, with actual regions, retention periods, and who can access what from where — including the human flows, because 'support can pull logs from Manila' fails most residency intents regardless of where the disks sit. (2) Classify with the people who own the requirement: works councils and DPOs almost never mean 'no packet crosses a border' — they mean personal data content processed and stored in-region with access controls. Distinguish content (prompts, retrievals, logs) from operational metadata (latency counters, error rates), and processing from storage; the requirement usually binds the first hard and the second barely. This conversation transforms an impossible slogan into an engineerable spec — and doing it WITH legal converts them from auditor to co-author. (3) Close the real gaps in severity order: pin inference to EU endpoints (the platform likely offers this; nobody asked), regionalize log storage, gate support access to EU personnel with logged break-glass. (4) Paper the residuals explicitly — agreed, documented, signed.\n\nThen bank the asset: this flow map is a template. The next sovereign ask — and 021 taught that Riyadh follows Frankfurt — starts from the map, not from another nodded slogan.",
  rubric: {
    diagnosis: "Sees the slogan-to-architecture gap and enumerates the full flow supply chain including human support access.",
    move: "Inventory → classify with the requirement's owners → close gaps in severity order → paper residuals; legal converted to co-author.",
    measurement: "Flows-mapped coverage and severity-ranked gap count; falsifier allows the architecture to pass with documentation only.",
    synthesis: "Distinguishes content from metadata and processing from storage — the classification that makes sovereignty engineerable — and banks the template for precedent.",
    altitude: "The works council hears a flow map and controls, not reassurance — which is the only currency that body accepts.",
    transfer: "Residency decomposition is the enterprise-readiness core at every lab selling into Europe — and the exact anatomy of regional API offerings.",
  },
  adversarial:
    "The reassurance failure: 'the tenant is EU, we're fine' — the tenant is one flow of eight, and saying it to a works council that later finds Dublin embeddings converts an engineering gap into bad faith. The maximalist failure: promising true zero-egress — you'll re-architect for a year to satisfy a requirement nobody actually stated, and the falsifiable version ('content in-region, metadata documented') was signable in a month. The quiet miss: mapping the machine flows and skipping the human ones — support access is the flow auditors find first, because it's the one with names attached.",
  recursiveFollowup:
    "The map is signed. Six months later the platform launches a materially better model — US-region only for its first two quarters. Product wants it; the flow map forbids it; the customer's own engineers are asking for it. Design the decision — and what you tell the works council if the answer is yes-with-controls.",
  altitude: {
    exec:
      "We promised Frankfurt in a sentence and built it in eight flows — most comply, three don't, and here's the map with fixes ranked by severity. Legal helps decide what the promise actually binds; then we close the real gaps and paper the rest. The map itself becomes our template for every sovereign deal after this one.",
    engineer:
      "Trace one request end to end: gateway region, inference endpoint pinning, embedding service region, index storage, log sinks, telemetry pipeline, support-access geography. Classify each content vs metadata, processing vs storage. Fix order: inference pinning, log regionalization, support access gating with break-glass audit.",
    frontier:
      "Sovereign requirements are decomposition problems: the ask arrives as geography theater, the need is a per-flow classification of content, processing, and access. The transferable skill is compiling legal language into a flow map — the artifact labs' regional offerings exist to satisfy, and the one every enterprise deal in Europe eventually demands.",
  },
},

/* ============================================================ 047 */
{
  id: "047",
  title: "The System of Record Has No API",
  difficulty: "Medium",
  category: "Enterprise Integration",
  primaryLens: "Architecture",
  secondaryLens: "Customer",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "OpenAI Deployment Eng"],
  tags: ["legacy", "grounding", "integration", "middleware"],
  prompt:
    "The highest-value agent scenario at a manufacturing customer needs data from their 30-year-old ERP — a mainframe system with no API, a nightly batch export, three green-screen power users who know its secrets, and a modernization project that has been 'two years away' for eight years. The integration team proposes screen-scraping RPA as the bridge. The agent needs order status, inventory, and pricing — some queries tolerate day-old data, some don't. Design the grounding.",
  arc: {
    start: "The best scenario gated by the worst system — and a scraping proposal everyone half-believes.",
    mid: "Split queries by freshness need; match each class to the cheapest reliable bridge.",
    end: "A tiered grounding architecture that ships now, degrades honestly, and doesn't bet the agent on screen geometry.",
  },
  expected: {
    bottleneck: "The integration is being designed as one problem when the freshness requirement splits it: day-old-tolerant queries (most inventory and pricing lookups) can ride the existing nightly export, while real-time-critical ones (order status a customer is asking about now) need a live path — and one mechanism cannot serve both well.",
    failureMode: "Screen-scraping as the single bridge: it works in the demo, then breaks on every green-screen layout quirk, runs at three-seconds-a-field serial speed under load, and fails silently — the agent confidently serves data from a stalled scraper, and the field learns (013-style) that the agent lies.",
    nextMove: "Tier the grounding by freshness class: (1) batch tier — the nightly export lands in a queryable replica; most queries route here, with the data's as-of timestamp surfaced in every answer; (2) live tier — for the narrow real-time set, the least-fragile bridge available: a read-only DB view or MQ interface if the mainframe team can expose one (they often can; nobody asked), scraping only as the admitted-temporary last resort, instrumented for silent failure and scoped to few fields; (3) honesty tier — the agent states data age and degrades explicitly when a source is stale; and run the whole design as the modernization project's first consumer — the agent becomes the business case that finally funds the API.",
    metric: "Answer freshness truthfulness — does the served data's actual age match what the agent claims — plus live-path breakage rate; a scraper that breaks weekly disqualifies itself with its own data.",
    owner: "The integration team owns the replica and live bridge; the mainframe's power users become design consultants (their screen knowledge is the spec); you own the freshness classification with the business; the modernization program inherits the agent as its flagship consumer.",
    falsifier: "If query analysis shows the real-time class is empty or tiny — customers actually tolerate morning-fresh data for everything — then the nightly replica alone ships the scenario, the scraping debate evaporates, and the live tier waits for the modernization it was going to pressure anyway.",
  },
  modelAnswer:
    "Refuse the single-bridge frame first. 'How do we connect the agent to the mainframe' bundles two different problems: queries that tolerate yesterday's data and queries that don't. The nightly batch export — boring, existing, reliable — already solves the first class completely: land it in a queryable replica, route most traffic there, and print the as-of timestamp in every answer (013 taught what silent staleness costs; make age visible and it becomes a feature instead of a lie).\n\nThe second class deserves scrutiny before engineering: how many queries genuinely need this-minute data? Interview the workflows, not the stakeholders — 'real-time' in requirements meetings usually means 'fresh this morning' in practice. If a real live class survives, pick bridges in order of fragility: a read-only database view or an MQ interface from the mainframe team (these systems usually have more access paths than folklore admits — the three power users know them; make those users design consultants, not scraping victims), and screen-scraping RPA dead last, admitted-temporary, instrumented for silent failure, and scoped to the handful of fields that justify it. Scraping isn't evil; unacknowledged scraping is — a bridge that breaks on a layout change and keeps serving cached answers is how agents lose fields forever.\n\nThen the strategic move: this agent is the best business case the eight-years-stalled modernization has ever had. Design the grounding tiers so they migrate cleanly to the future API, present the agent's usage as the demand curve, and the integration debt you're bridging becomes the argument that finally retires itself.",
  rubric: {
    diagnosis: "Splits the problem by freshness class instead of debating bridges — and interrogates how real the real-time class is.",
    move: "Tiered grounding: replica for batch-tolerant, least-fragile live bridge for the rest, scraping last and instrumented; age surfaced in answers.",
    measurement: "Freshness truthfulness and live-path breakage as the ruling numbers; falsifier lets the replica alone carry the scenario.",
    synthesis: "Turns the power users into the spec and the agent into the modernization business case — the integration funds its own retirement.",
    altitude: "The customer hears 'ships now on the boring path, honest about age, pressure-tests the modernization' — not a scraping bet.",
    transfer: "Legacy grounding is FDE bread-and-butter: freshness tiering, bridge fragility ranking, and provenance-in-answer generalize to every pre-API enterprise.",
  },
  adversarial:
    "The modernist failure: 'wait for the API' — it's been two years away for eight years, and parking the highest-value scenario behind it kills the program's momentum for a promise with no date. The pragmatist failure: shipping the scraper as the whole answer because the demo worked — demos exercise one screen layout on a quiet afternoon; production exercises all of them under load, and the failure mode is silent wrong answers, not clean errors. And if your design didn't surface data age in the answers themselves, you've built 013's stale-index trap with a mainframe accent — the field will discover the staleness before you do.",
  recursiveFollowup:
    "The replica ships and works. Then finance notices the nightly export the agent relies on was built for a reporting tool being decommissioned next quarter — your boring, reliable path is scheduled for deletion, and the mainframe team quotes six months to rebuild it. The scraper suddenly looks load-bearing. Re-plan.",
  altitude: {
    exec:
      "Most of what the agent needs tolerates morning-fresh data — that path exists today and ships in weeks, with every answer labeled for age. The truly-live queries get the sturdiest bridge the mainframe team can expose, and scraping only as a scoped, monitored stopgap. Meanwhile the agent's demand becomes the business case your modernization has waited eight years for.",
    engineer:
      "Nightly export to a queryable replica with as-of timestamps in the answer payload; freshness classification per query type from workflow analysis; live tier via read-only view or MQ if exposable, RPA scraping only with per-field health checks and hard-fail on drift. Schema designed to swap to the future API without re-grounding.",
    frontier:
      "Grounding agents on pre-API systems is the default enterprise condition, not the exception. The transferable pattern: tier by freshness requirement, rank bridges by fragility, surface provenance and age in the product, and use the agent's demand curve to fund the integration's own replacement.",
  },
},

/* ============================================================ 048 */
{
  id: "048",
  title: "The Four-Second Answer",
  difficulty: "Medium",
  category: "Enterprise Integration",
  primaryLens: "Architecture",
  secondaryLens: "Eval",
  archetype: "Sweeper",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Inference Perf", "OpenAI Deployment Eng"],
  tags: ["latency", "budgets", "performance", "streaming"],
  prompt:
    "Field sellers are abandoning a customer's deal-support agent: 'it's too slow.' Median response is 11 seconds; the team's diagnosis is 'the model is slow' and their fix proposal is switching to a smaller, dumber model. Nobody has traced a request. When you finally do: 1.2s of auth token exchange, 2.8s of retrieval across three serial index calls, 0.9s waiting on a CRM tool call, 4.1s of model generation — unstreamed, so users see nothing until it all completes — plus assorted queueing. Fix the experience.",
  arc: {
    start: "'The model is slow' — an 11-second pipeline blamed on its most visible 4 seconds.",
    mid: "Trace the budget, attack the serial waits and the dead air, stream the first token early.",
    end: "Sub-2-second perceived latency — mostly without touching the model at all.",
  },
  expected: {
    bottleneck: "No latency budget exists — 11 seconds is one undifferentiated blob blamed on the model, when the trace shows most of it is integration plumbing (serial retrieval, auth overhead, unstreamed delivery) and the user experience problem is dead air, not total time.",
    failureMode: "Ship the smaller model: generation drops from 4.1s to 2.5s, total latency falls to 9-something, answers get measurably worse — and sellers keep abandoning, because 9 silent seconds and 11 silent seconds are the same experience; now the program has slow AND dumb.",
    nextMove: "Build the budget, then attack in effort-per-second order: (1) stream — first token on screen inside ~1.5s changes perceived latency more than any backend fix; show retrieval status while it works ('searching deal history…'); (2) parallelize the three serial index calls and the CRM call where dependencies allow — 3.7s becomes ~1.2s with no quality change; (3) cache the auth exchange (1.2s per request for a token that lives an hour is pure waste); (4) only then evaluate model options — speculative/smaller models for easy queries via routing (039's tiering), keeping the strong model where answers earn it; and set the budget as an SLO per stage so regressions surface as numbers, not vibes.",
    metric: "Time-to-first-token (perceived latency) as the headline, with the per-stage budget (auth / retrieval / tools / generation / delivery) as the diagnostic — total median is the vanity version of this number.",
    owner: "Platform engineering owns the trace and the per-stage SLOs; you own resetting the team's diagnosis before they spend quality on the wrong fix; the model choice question returns only after the plumbing numbers land.",
    falsifier: "If the trace had shown generation genuinely dominating — say 9 of 11 seconds on long-form outputs users need in full — then model-side fixes (routing, smaller models for drafts, output length discipline) legitimately lead; the budget decides, and this trace just didn't say that.",
  },
  modelAnswer:
    "The team is about to spend answer quality to buy the wrong seconds. The trace says the model is 4.1 of 11 seconds — barely a third — and the proposal is to shrink the only stage users actually came for, while auth spends 1.2s re-buying an hour-long token per request and three index calls that don't depend on each other run in single file. This is 038's lesson with milliseconds instead of dollars: undifferentiated totals get blamed on the most famous component.\n\nBut the deeper reframe is perceptual: sellers aren't abandoning 11 seconds of latency, they're abandoning 11 seconds of silence. An unstreamed response means the fastest possible backend still feels broken. So the first fix touches no infrastructure: stream tokens as generation starts, and narrate the wait before that ('searching deal history… found 12 documents'). Perceived latency is time-to-first-signal, and getting it under a second and a half transforms the experience while the total barely moves.\n\nThen the plumbing, cheapest first: parallelize the retrieval fan-out and the CRM call (3.7s → ~1.2s, zero quality cost), cache auth tokens (1.2s → ~0), and re-trace. You're now near 6 seconds total with first tokens at ~1.5s — before any model conversation. If generation still deserves attention, do it with 039's discipline: route easy queries to fast models behind an eval gate, keep the strong model for the answers that justify the program. And institutionalize the budget: per-stage SLOs, traced continuously, so the next regression arrives as 'retrieval p95 doubled Tuesday' instead of 'sellers say it's slow.'\n\nThe rule the team keeps: never buy latency with quality until the budget proves the plumbing is spent.",
  rubric: {
    diagnosis: "Rebuilds the latency budget from the trace and names the real bottlenecks — serial plumbing and dead air, not the model.",
    move: "Streaming and narration first, parallelization and auth caching next, eval-gated model routing last; per-stage SLOs installed.",
    measurement: "Time-to-first-token as the experience metric with the stage budget as diagnostics; falsifier respects a generation-dominated trace.",
    synthesis: "Separates perceived from total latency — the insight that fixes the abandonment without spending answer quality.",
    altitude: "The team hears 'we almost bought worse answers for seconds users wouldn't feel' — the budget becomes the standing referee.",
    transfer: "Latency anatomy — TTFT, serial fan-outs, streaming, tiered routing — is the inference-performance seat applied at app scale.",
  },
  adversarial:
    "The infra-purist failure: dismissing streaming as cosmetic and grinding on backend milliseconds — users experience first-signal time, and a 6-second silent pipeline still loses to a 8-second streaming one; the 'cosmetic' fix is the retention fix. The framework failure: 'rewrite the orchestration layer' — a quarter of migration to save what parallelizing three calls saves this sprint. And the surrender failure: accepting the smaller model because it's already proposed and momentum is real — quality spent on latency is the one trade users punish twice, once for slow history and once for wrong answers.",
  recursiveFollowup:
    "Streaming ships and abandonment drops — but now sellers complain the agent 'starts confidently then corrects itself,' because early tokens commit to answers retrieval hasn't finished informing. Time-to-first-token bought a new failure mode: premature certainty. Redesign the streaming strategy without giving back the latency win.",
  altitude: {
    exec:
      "Eleven seconds, and the model is only four of them — the rest is plumbing run in single file plus a screen that shows nothing until everything finishes. We stream first words inside two seconds, run the lookups in parallel, and stop re-authenticating every request. The model conversation comes last, if the numbers still ask for it — we don't buy speed with answer quality.",
    engineer:
      "Trace per stage: auth 1.2 (cache the token), retrieval 2.8 serial (parallel fan-out with a join), CRM 0.9 (overlap with retrieval), generation 4.1 (stream it), delivery buffered (kill the buffer). Per-stage p50/p95 SLOs with alerts. Routing experiment behind the eval gate only after plumbing lands.",
    frontier:
      "Latency budgets are the inference-perf discipline scaled down: TTFT versus total time, serial-to-parallel recovery, streaming as the perception lever, and routing as the last resort priced in quality. The transferable reflex — trace before trading — is the same one that stops the cheapest-model panic at datacenter scale.",
  },
},

/* ============================================================ 049 */
{
  id: "049",
  title: "The DLP Wall",
  difficulty: "Medium",
  category: "Enterprise Integration",
  primaryLens: "Deployment",
  secondaryLens: "Architecture",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform", "MSFT MAI Strategy & Ops"],
  tags: ["dlp", "egress", "security", "proxies"],
  prompt:
    "A financial customer's security team just discovered that agent traffic to model endpoints bypasses their DLP stack — the TLS-pinned SDK can't be inspected by their egress proxy, so prompts containing who-knows-what leave the network unexamined. Their proposed fix: force all model traffic through the inspection proxy, which breaks streaming, adds 800ms, and stores decrypted prompt payloads — including customer PII — in the DLP vendor's logs. Security says no inspection, no agents. Find the architecture.",
  arc: {
    start: "An immovable security requirement colliding with a proxy that breaks the product and creates new exposure.",
    mid: "Decompose what DLP actually needs — policy enforcement on content — from how it's habitually done — wire inspection.",
    end: "Enforcement at the gateway you already own: policy checks before egress, security's visibility restored, streaming intact.",
  },
  expected: {
    bottleneck: "The requirement and the mechanism are fused: security needs content policy enforcement and audit visibility on what leaves; the proxy is just their habitual mechanism — and for this traffic it's the wrong one, breaking the product while creating a second exposure (decrypted PII pooling in DLP vendor logs).",
    failureMode: "Fight the requirement and lose ('no agents' is a sentence security can enforce), or comply literally: 800ms plus broken streaming degrades the product below adoption threshold, and six months later the DLP log store — now the largest unencrypted-prompt archive in the company — becomes the incident everyone was trying to prevent.",
    nextMove: "Move enforcement from the wire to the gateway: the model gateway (039's artifact) already terminates every agent request in-network — put the DLP controls there, where content is structured and inspectable without breaking TLS: classifier-based content policy checks pre-egress (PII detection, data-class rules per workload), configurable actions (block, redact, allow-and-log), full audit trail security can query, and alerts wired into their existing SIEM. Security keeps policy authorship; the wire stays pinned; streaming survives; and the decrypted-payload archive never exists.",
    metric: "Policy coverage at the gateway versus the proxy baseline — every rule security enforces on email/web egress mapped to a gateway equivalent or an accepted gap — plus detection latency and the false-positive rate that determines whether redaction is usable.",
    owner: "Security owns the policies and the audit views (authorship is what they're actually defending); platform owns the gateway enforcement point; you own brokering the reframe — and getting security named as co-designer, not approver.",
    falsifier: "If the customer has no gateway and won't build one — agents call model endpoints directly from scattered apps — then the proxy demand is security correctly refusing an ungoverned architecture, and the answer is building the gateway first, not negotiating the inspection away.",
  },
  modelAnswer:
    "Take the requirement as legitimate and the mechanism as negotiable — in that order, out loud. Security's job here is real: unexamined prompts leaving a financial institution's network is exactly the shadow-flow their DLP program exists to prevent (014's lesson from the other side of the table). Arguing 'model traffic is special, exempt us' loses correctly. But their proposed mechanism imports assumptions from a pre-agent world: DLP-by-wire-inspection assumes opaque traffic you can only examine mid-flight. Agent traffic through a gateway is the opposite — structured, in-network, and inspectable *before* it becomes wire traffic at all.\n\nSo relocate the checkpoint. The model gateway terminates every agent request while it's still yours: run content policy there — PII and data-class detection on prompts and retrieved context, per-workload rules (the trading-desk agent has different red lines than IT helpdesk), actions of block, redact, or allow-with-audit. Security authors the policies in their language; the audit trail lands in their SIEM; their dashboards show more than wire inspection ever could, because gateway inspection sees decoded, attributed, per-user content instead of TLS metadata. And the killer argument for their own risk register: the proxy design pools decrypted prompts — PII included — in a DLP vendor's log store, creating the very archive a breach would monetize. Gateway enforcement inspects and discards; nothing pools.\n\nBroker it as co-design: security writes policies, sets the audit spec, and signs the gateway as an approved DLP enforcement point — a designation they'll reuse for every AI workload after this one. The product keeps streaming; the CISO gets better visibility than the wall would have given; and 'no inspection, no agents' resolves as 'better inspection, therefore agents.'",
  rubric: {
    diagnosis: "Separates the legitimate requirement (content policy + audit) from the habitual mechanism (wire inspection) and names the proxy's self-defeating exposure.",
    move: "Relocates enforcement to the gateway with security as policy author — block/redact/audit per workload, SIEM-wired.",
    measurement: "Rule-coverage mapping against the proxy baseline plus false-positive rates; falsifier concedes the proxy demand when no gateway exists.",
    synthesis: "Sees that gateway inspection gives security MORE than the wire could — the reframe that converts an opponent into a co-designer.",
    altitude: "The CISO hears risk arithmetic in their own terms: the wall creates a decrypted-PII archive; the gateway inspects and discards.",
    transfer: "Egress governance for model traffic is a live question at every enterprise and every lab's API business — trusted enforcement points are the emerging answer.",
  },
  adversarial:
    "The evangelist failure: leading with 'the proxy breaks our product' — security hears a vendor prioritizing UX over exfiltration and hardens; the winning order is requirement-affirmed, mechanism-upgraded, their-risk-reduced. The compliance-theater failure: accepting the proxy and quietly exempting streaming endpoints 'temporarily' — you've built the bypass 014 warns about, and its discovery costs every future security negotiation. The scope miss: policy-checking prompts but not retrieved context — retrieval is where the sensitive data actually enters the payload, and a gateway that only inspects what users type has audited the smaller half of the egress.",
  recursiveFollowup:
    "Gateway DLP ships. Month three: the false-positive rate on the trading desk's policies is 7% — legitimate queries redacted mid-sentence, traders furious, and security refuses to loosen rules 'calibrated to regulation.' The paved road is developing a pothole exactly where 014 predicts shadow usage begins. Fix the calibration loop without asking security to lower the bar.",
  altitude: {
    exec:
      "Security's requirement stands — nothing leaves uninspected. We're proposing a stronger checkpoint, not an exemption: every agent request already passes through our gateway in-network, where their policies can block, redact, and audit with full context — and nothing decrypted ever pools in a vendor's logs, which the proxy design would have created. They author the rules; we enforce them; streaming survives.",
    engineer:
      "Policy engine at the gateway: PII/data-class classifiers on prompts AND retrieved context pre-egress, per-workload rulesets, actions block/redact/log, audit events to their SIEM schema. Latency budget under 150ms for the checks. Coverage matrix mapping every proxy-era rule to its gateway equivalent, gaps explicitly signed.",
    frontier:
      "Model-traffic governance is converging on exactly this: enforcement at trusted gateways rather than wire inspection, security as policy author, audit as the product. The transferable move — honor the requirement, replace the mechanism, reduce their risk arithmetic — is how every 'security says no' becomes infrastructure.",
  },
},

/* ============================================================ 050 */
{
  id: "050",
  title: "Meet Them Where They Work",
  difficulty: "Easy",
  category: "Enterprise Integration",
  primaryLens: "Architecture",
  secondaryLens: "Customer",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Apps Platform", "OpenAI DPM (Codex)"],
  tags: ["surfaces", "adoption", "teams", "channels"],
  prompt:
    "A customer's platform team built a beautiful standalone web app for their new HR agent — clean design, dark mode, its own URL. Adoption after two months: 4% of employees, most one-time visitors. The same company's workforce lives in Teams and Outlook all day. The team now wants budget for an adoption campaign — posters, lunch-and-learns, a login raffle. You've seen the usage data: the agent is good; the destination is wrong. Make the call.",
  arc: {
    start: "A good agent at a URL nobody visits, and a campaign budget aimed at dragging users to it.",
    mid: "Flip the frame: take the agent to the flow of work instead of marketing the detour.",
    end: "The same agent in Teams and Outlook — adoption by placement, with the standalone app demoted to power-user home.",
  },
  expected: {
    bottleneck: "Surface mismatch: the agent asks users to leave their flow of work — a new URL, a new habit, a context switch — when the entire benefit of an assistant is being ambient in the tools where questions arise; no campaign spend overcomes a destination that shouldn't exist.",
    failureMode: "The campaign runs: a spike during raffle week, decay to 5% by the next quarter, and leadership concludes 'employees don't want AI' — the wrong lesson, permanently priced into the next program's budget, when the real lesson was 'employees don't want another tab.'",
    nextMove: "Move the agent into the flow of work: Teams bot for conversational queries (where HR questions already get asked — in chat), Outlook integration for the email-shaped moments, and keep the web app as the deep-session surface for power users and complex casework; measure adoption where work happens, and spend a sliver of the campaign budget announcing placement ('it's in your Teams now') rather than begging for a detour.",
    metric: "Weekly active users in-surface versus the standalone baseline — and time-to-first-use for a new employee, which placement collapses from 'whenever they remember the URL' to 'first time they ask HR anything in chat.'",
    owner: "The platform team redirects build effort from app polish to surface integration; you own the reframe that saves them face — the app wasn't wrong, its position in the hierarchy was; comms spends the residual budget announcing presence, not requesting pilgrimage.",
    falsifier: "If usage analysis shows the 4% are heavy, high-value users doing long structured sessions — casework, not quick questions — then the standalone app is the right surface for the actual demand, the addressable market was always smaller than 'all employees,' and the fix is expectation reset, not relocation.",
  },
  modelAnswer:
    "Diagnose with the oldest adoption law in enterprise software: tools that live inside the flow of work get used; destinations get visited — briefly, once. The agent is good; the 4% proves the product works for whoever reaches it. The architecture decision that matters was never model or retrieval — it was the URL, which taxes every single interaction with a context switch that chat-shaped HR questions ('how much parental leave do I get?') will never pay. A campaign can spike a destination; it cannot make one ambient. Raffle-week numbers decay; placement numbers compound.\n\nSo relocate instead of advertise. Teams bot first — HR questions are already asked in chat, so put the agent where the asking happens; the integration is days of work against the standalone app's months of polish. Outlook next for the email-shaped moments. And keep the web app honestly repositioned: it's the power-user surface for deep sessions, document-heavy casework, and history — the 4% who found it may be exactly its market. That framing also saves the team: they didn't build the wrong thing, they built the specialist surface first and called it the front door.\n\nSpend a tenth of the campaign budget on a placement announcement — 'ask HR anything, right in Teams' — which markets a habit users already have instead of requesting a new one. And bank the general rule for every agent after this one: the surface decision is an adoption decision, made at design time, and 'where does the question naturally arise?' beats 'where would our app look best?' every time it's asked.",
  rubric: {
    diagnosis: "Names surface mismatch and the flow-of-work law — the URL taxes every interaction, and campaigns can't fund a detour forever.",
    move: "Relocates to Teams/Outlook, repositions the app as power-user surface, redirects the budget to placement announcement.",
    measurement: "In-surface WAU and time-to-first-use as the placement dividend; falsifier lets the 4% be the real (smaller) market.",
    synthesis: "Sees the political save — specialist surface, not failed app — and extracts the reusable surface-decision rule for the whole portfolio.",
    altitude: "Leadership hears the near-miss reframed: 'employees don't want another tab' before it calcified as 'employees don't want AI.'",
    transfer: "Surface strategy is the apps-platform question everywhere: ambient beats destination, and channel placement is product architecture.",
  },
  adversarial:
    "The sunk-cost failure: running the campaign because it's budgeted and the team is proud — you'll buy a spike, watch the decay, and hand leadership the 'AI fatigue' narrative that taxes every future program. The demolition failure: killing the web app entirely — deep casework genuinely wants a full surface, and the 4% you'd orphan are the users with the strongest workflows; hierarchy, not execution. And the checkbox miss: shipping a Teams bot that's just a link to the web app — a doorway to the detour is still the detour, and users will make that discovery exactly once.",
  recursiveFollowup:
    "The Teams bot ships; adoption 8x's in a month. Now IT raises the 014 problem in reverse: employees are pasting sensitive HR matters into a chat surface that also hosts memes and vendors, and Teams retention policies conflict with HR-data rules. The surface that fixed adoption created a governance seam. Reconcile it without retreating to the URL.",
  altitude: {
    exec:
      "The agent works — four percent adoption is a placement problem, not a product one. We're moving it into Teams and Outlook, where the questions already happen, and keeping the app as the deep-work surface. The campaign budget shrinks to an announcement, and the metric to watch is time-to-first-use, which placement collapses to nearly zero.",
    engineer:
      "Teams bot on the existing agent API — same backend, chat-shaped session handling, SSO inherited from the tenant. Outlook add-in for reply-context queries. Web app remains for long sessions with history. Instrument per-surface WAU and first-use latency; the standalone URL redirects gently, not abruptly.",
    frontier:
      "Ambient-versus-destination is the surface strategy question every agent product answers, knowingly or not: distribution inside existing workflows beats standalone polish almost everywhere. The transferable rule — place the agent where the question arises — is platform strategy expressed as an adoption number.",
  },
},

);
