/* Parabolic 100 — problem bank, part 6 (Agent Architecture depth, 036–040) */

P100.PROBLEMS.push(

/* ============================================================ 036 */
{
  id: "036",
  title: "The Agent That Remembers Too Much",
  difficulty: "Medium",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Customer",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Apps Platform"],
  tags: ["memory", "state", "privacy", "personalization"],
  prompt:
    "A customer's product team wants their support agent to 'remember everything' — every past conversation, preference, and complaint, across sessions, forever — because a demo of persistent memory wowed their VP. Their architect asks you to review the design: one vector store per customer, every conversation appended, retrieved wholesale into context each session. Legal hasn't seen it. What's your review?",
  arc: {
    start: "'Remember everything' — a feature request that is actually four different memory types and a liability.",
    mid: "Decompose memory by job: working, episodic, semantic, and preferences — each with its own store, TTL, and consent story.",
    end: "An agent that remembers what serves the user, forgets on schedule, and can prove both.",
  },
  expected: {
    bottleneck: "Memory treated as one undifferentiated pile — 'remember everything' conflates working context, episodic history, distilled facts, and preferences, which have different retrieval needs, retention rules, and legal exposure.",
    failureMode: "Context stuffed with stale, contradictory history degrades answer quality as usage grows (the agent gets worse with loyalty); meanwhile an unbounded conversation archive becomes a subject-access-request and retention-policy nightmare the first time legal or a regulator looks.",
    nextMove: "Redesign memory by job: working memory (this session, ephemeral), episodic (past interactions, summarized not raw, TTL-bounded), semantic (distilled durable facts — account tier, product owned — schema'd and editable), and preferences (explicit, user-visible, user-deletable). Retrieval is selective per query, not wholesale; retention has per-type TTLs; and the user can see and correct what's remembered. Bring legal in before build, not after.",
    metric: "Answer quality as a function of account age — the number that catches memory rot: if 12-month customers get worse answers than 1-month customers, the memory design is failing at its own job.",
    owner: "The architect owns the typed-memory design; legal co-owns retention and consent before a line ships; product owns the user-facing memory view — visibility is a feature, not a compliance chore.",
    falsifier: "If usage analysis shows sessions are genuinely independent — support contacts rarely reference history and personalization lifts nothing — then even typed memory is overbuild: ship working memory plus a thin semantic record and skip the episodic machinery entirely.",
  },
  modelAnswer:
    "Start the review with the reframe: 'remember everything' is not a memory design — it's the absence of one. Human assistants don't transcribe every conversation; they distill. Four different jobs are hiding in the request, and the design treats them as one pile: working memory (what this session needs), episodic memory (what happened before), semantic memory (durable facts about the customer), and preferences (how they want to be treated). Each has different retrieval, retention, and consent physics.\n\nThe technical failure of the pile design arrives with success: append-everything means a loyal customer's context fills with stale and contradictory history — the complaint from two years ago, the preference they changed, three resolved issues retrieved because they're semantically similar to today's question. The agent literally gets worse the longer someone stays a customer, which is personalization inverted. The fix is distillation and selectivity: summarize episodes at session close, promote stable facts into a schema'd semantic store, retrieve narrowly per query, and put TTLs on everything episodic.\n\nThe legal failure arrives with attention: an unbounded verbatim archive of customer conversations is a retention-policy violation waiting for its first audit and a subject-access request that returns megabytes. Typed memory converts this from crisis to feature — per-type retention rules, and a user-visible 'what I remember about you' view with editing. That view isn't compliance overhead; it's the trust surface that makes personalization acceptable at all.\n\nTell the VP the demo was right about the value and wrong about the mechanism: the magic they saw was relevance, not volume — and relevance is engineered by forgetting well.",
  rubric: {
    diagnosis: "Decomposes 'remember everything' into typed memory jobs and names both failure tracks — quality rot and legal exposure.",
    move: "Typed stores with distillation, selective retrieval, per-type TTLs, user-visible memory, and legal in before build.",
    measurement: "Answer quality vs account age as the rot detector; falsifier allows the sessions-are-independent verdict that deletes the feature.",
    synthesis: "Sees that forgetting is the load-bearing mechanism — relevance, not volume, produced the demo magic — and that the memory view is a trust feature.",
    altitude: "The VP keeps the wow while the mechanism changes underneath; nobody has to un-promise the demo.",
    transfer: "Maps to assistant memory design at the labs — typed memory, distillation, and user-legible state are the current frontier of agent products.",
  },
  adversarial:
    "The compliance-brained failure: leading the review with GDPR — accurate, and the fastest way to make the product team route around you; the quality-rot argument is what they'll actually feel, so lead with it and let legal arrive as the second punch. The engineer-brained failure: debating vector store choice and embedding models — the design is wrong one level up, and better retrieval over an undifferentiated pile just retrieves the wrong things faster. And if your answer kept all four memory types 'to be safe,' check the falsifier: memory systems are maintenance surfaces, and unneeded episodic machinery is how this team spends next year debugging summaries nobody reads.",
  recursiveFollowup:
    "Six months post-launch: the memory view ships and support tickets spike — users are disturbed by how much the semantic store inferred ('single parent, price-sensitive, complains on Mondays'). All of it is accurate and none of it was stated. Inference-derived memory is legal but creepy. Where's the line, and who draws it?",
  altitude: {
    exec:
      "The demo's magic was relevance, not total recall — and relevance comes from remembering the right things and forgetting on purpose. We're building four memory types with different lifespans, a user-visible memory page, and legal at the table now. Same wow, none of the 2 a.m. retention-audit calls.",
    engineer:
      "Session state ephemeral; episodes summarized at close with TTLs; durable facts promoted into a versioned schema, not free text; retrieval scoped per query-type instead of wholesale context stuffing. Memory-view API from day one — read and delete are product features, not admin scripts.",
    frontier:
      "Agent memory is the live design problem at every lab: typed stores, distillation over accumulation, and user-legible state. The transferable principle is that forgetting is an engineered capability — memory systems are judged by what they surface per token of context, not by what they hoard.",
  },
},

/* ============================================================ 037 */
{
  id: "037",
  title: "Fine-Tune It, They Said",
  difficulty: "Medium",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Eval",
  archetype: "Sweeper",
  secondaryArchetype: "Builder",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "MSFT MAI Evals Eng"],
  tags: ["fine-tuning", "context-engineering", "rag", "adaptation"],
  prompt:
    "A customer's data science team has budgeted a quarter to fine-tune a model on 50,000 historical support tickets, convinced this will 'teach the model our business.' The actual complaints from the pilot: the agent doesn't know current product names, cites outdated policies, and doesn't follow the escalation script. A director has already announced the fine-tuning initiative internally. What do you tell them?",
  arc: {
    start: "A quarter budgeted for fine-tuning, aimed at three problems fine-tuning doesn't fix.",
    mid: "Route each failure to its actual mechanism: retrieval for facts, prompting for behavior, tuning for form.",
    end: "Fixes shipping in weeks via context engineering — and fine-tuning re-scoped to the one job it does well.",
  },
  expected: {
    bottleneck: "Adaptation-mechanism mismatch: the three named failures are knowledge freshness (retrieval's job), procedure adherence (prompting/context's job), and neither is what fine-tuning changes — tuning shifts style, format, and distribution, not facts or rules that change monthly.",
    failureMode: "A quarter and the training budget produce a model that writes in the company's tone while still citing last year's policies — because the policies moved after the training cut — and the director's announced initiative becomes an expensive way to learn what a week of evals would have shown.",
    nextMove: "Decompose the complaints and route each: current product names and policies → retrieval over governed, versioned sources (freshness is an index property, not a weights property); escalation script adherence → explicit procedure in context with output checks; THEN evaluate whether residual failures — tone, format consistency, taxonomy — justify tuning, using a week-long eval bake-off (RAG + engineered context vs fine-tune on a held-out set) before the quarter is spent. Re-scope the announced initiative as 'phase two, if evals demand it' rather than killing it publicly.",
    metric: "Per-failure-class scores on a held-out eval: freshness accuracy, procedure adherence, and format consistency measured separately — the decomposition that shows which mechanism owns which gap.",
    owner: "The DS team runs the bake-off (they keep the initiative, re-aimed); you own the failure decomposition; the director gets a reframe that preserves the announcement.",
    falsifier: "If the bake-off shows engineered context still failing on domain language — the model genuinely can't parse their ticket taxonomy or jargon — that residual is fine-tuning's legitimate job: tune on form, keep facts in retrieval, and the quarter is justified for that slice.",
  },
  modelAnswer:
    "The question to put on the whiteboard: which of these failures lives in the weights? Walk the three complaints. Product names wrong — the products changed after any conceivable training cut; facts that change monthly can never live in weights, only in an index that updates when reality does. Outdated policies — same physics, worse blast radius; a fine-tuned model confidently citing the policy that was true at training time is a compliance incident with excellent grammar. Escalation script ignored — that's procedure, and procedure belongs in context where it can be read, versioned, audited, and changed Tuesday; baking this quarter's script into weights means retraining every time the process changes.\n\nSo the honest routing: retrieval over governed sources for facts, engineered context for behavior — both shippable in weeks, both fixing the actual complaints. Fine-tuning's real jobs are elsewhere: tone, output format, domain jargon comprehension, taxonomy-consistent classification — style and structure, not facts and rules. Some of that may genuinely matter here, which is why the move isn't 'cancel the initiative' but 'make it earn its slice': a one-week bake-off on a held-out set, per-failure-class scoring, and tuning proceeds only on the classes where context engineering plateaus.\n\nHandle the director like 009's innovation team: the announcement survives as 'phase two, driven by eval results' — a program that got more rigorous, not cancelled. And the deeper gift to this team is the habit: mechanism follows failure class, decided by evals, never by which technique sounds most like real machine learning.",
  rubric: {
    diagnosis: "Routes each complaint to its mechanism — freshness→retrieval, procedure→context, form→tuning — via 'does it live in the weights?'",
    move: "Ships the context/retrieval fixes now and converts the tuning initiative into an eval-gated phase two instead of a public kill.",
    measurement: "Per-failure-class held-out scores as the decision instrument; falsifier gives tuning its legitimate slice on domain form.",
    synthesis: "Sees the political layer — the announced initiative — and preserves it re-aimed; rigor lands as upgrade, not rebuke.",
    altitude: "The director's story improves: 'we fix knowledge in weeks and tune only what evals prove needs tuning.'",
    transfer: "The adaptation-mechanism decision is core FDE/applied-lab judgment — and the eval-bake-off habit is the transferable artifact.",
  },
  adversarial:
    "The fashionable failure runs both directions: 'fine-tuning is always wrong, just do RAG' is as thoughtless as the original plan — jargon-dense domains and strict output taxonomies are real tuning territory, and blanket dismissal costs you the cases where it wins. The deferential failure: letting the quarter proceed because the director announced it — you've watched 50,000 stale tickets get baked into weights that will cite dead policies with confidence. And if your bake-off design didn't hold the eval set out from BOTH the tuning data and the retrieval corpus, you've built the contaminated benchmark from problem 017 and the winner is fiction.",
  recursiveFollowup:
    "The bake-off returns: context engineering wins on freshness and procedure, tuning wins clearly on taxonomy-consistent ticket classification — but the DS team now wants to tune on customer conversations that include PII, arguing 'it's our data.' Training-data governance wasn't in anyone's plan. What gate do you build?",
  altitude: {
    exec:
      "Two of the three problems fix in weeks without training anything — current knowledge comes from retrieval, script-following from instructions the model reads. Fine-tuning becomes phase two, aimed only at what a one-week eval proves it wins: your team's initiative gets more rigorous and faster to value, not cancelled.",
    engineer:
      "Versioned retrieval over the policy and product sources with freshness SLOs; escalation procedure as structured context with output validation; then a held-out bake-off scored per failure class. If tuning earns its slice, it tunes on form and taxonomy — facts stay in the index where they can be updated.",
    frontier:
      "Adaptation-mechanism selection is a daily lab decision: weights for capability and form, context for knowledge and procedure, evals as the referee. The transferable rule — nothing that changes monthly belongs in weights — kills half of enterprise fine-tuning requests, and the bake-off habit handles the rest honestly.",
  },
},

/* ============================================================ 038 */
{
  id: "038",
  title: "The Token Bill Arrives",
  difficulty: "Medium",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Market",
  archetype: "Sweeper",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "Anthropic TPM Inference Perf"],
  tags: ["cost", "latency", "budgets", "inference-economics"],
  prompt:
    "A customer's agent pilot succeeded and scaled — and the monthly inference bill just crossed $180k, up 6x in a quarter, triggering a CFO review of the whole program. The team's proposed fix is 'switch everything to the cheapest model.' Nobody can say where the tokens actually go: which workflows, which steps, what's retrieval bloat versus reasoning versus retries. Latency complaints are rising too. What do you do?",
  arc: {
    start: "A 6x bill, a CFO review, and zero visibility into where a single token goes.",
    mid: "Instrument cost per task, find the real spenders — usually context bloat and retries, not model choice.",
    end: "Cost per task cut by engineering, a tiered routing policy, and a bill the CFO can see the value behind.",
  },
  expected: {
    bottleneck: "No cost observability at task granularity — the bill is one number, so the only lever anyone can see is model price, when the spend almost certainly concentrates in context bloat, retry loops, and a few pathological workflows.",
    failureMode: "Blanket-downgrade to the cheapest model: quality drops on the workflows that justified the program, task success falls, users retry more — and the bill barely moves because the tokens were never mostly about model choice; now the CFO review has a quality crisis attached.",
    nextMove: "Instrument before optimizing: per-task, per-step token accounting (input vs output, retrieval payload vs instructions vs history, retries) for one week; then cut in order of what the data shows — typically dedupe and trim retrieval context, cap history windows, cache repeated system payloads, kill silent retry loops — and only then design model tiering: route by task class with an eval gate proving the cheaper tier holds success rate. Present the CFO cost-per-completed-task, not the bill.",
    metric: "Cost per successfully completed task, by workflow — the unit number that separates 'expensive because valuable' from 'expensive because leaky,' and the only frame in which a CFO conversation goes well.",
    owner: "Platform engineering owns the token accounting and trims; you own the CFO reframe and the tiering policy's eval gate; workflow owners see their own unit costs — visibility drives most of the fix.",
    falsifier: "If accounting shows tokens genuinely dominated by necessary reasoning on high-value tasks — lean contexts, few retries — then the bill is the price of the value, the fix is the CFO framing plus committed-use pricing, and engineering heroics would just degrade a working system.",
  },
  modelAnswer:
    "Refuse to optimize blind. A 6x bill with no task-level accounting isn't a cost problem yet — it's a visibility problem wearing one, and 'switch to the cheapest model' is what teams propose when the bill is one undifferentiated number. Model price is the most visible lever and usually the third most important one.\n\nWeek one: instrumentation. Per task and per step — input versus output tokens, and inside input: retrieval payload, instructions, conversation history, retries. Enterprise agent spend almost always concentrates in a familiar rogues' gallery: wholesale retrieval stuffing (031-lines of context for a one-line answer), unbounded history windows growing with session length, retry loops nobody logged, and one or two workflows with pathological fan-out. Expect the distribution to be brutally uneven — a handful of workflows owning most of the bill.\n\nThen cut in evidence order: trim and dedupe retrieval (biggest, cheapest win — and it usually improves latency and quality together, since the model stops wading through noise), cap histories with summarization, cache stable payloads, fix retries at the source. Only after the leaks are fixed does model tiering make sense: classify tasks by difficulty, route the mechanical tiers to smaller models — with an eval gate per class proving success rate holds. Tiering is a routing policy with evidence, not a panic downgrade.\n\nFor the CFO, change the unit: $180k is meaningless; cost per completed task by workflow is a business number. Some workflows will be expensive and worth it, some cheap and worthless — that conversation allocates instead of amputates. The latency complaints get solved by the same knife: most of those tokens weren't just expensive, they were slow.",
  rubric: {
    diagnosis: "Names missing task-level cost observability as the real bottleneck and predicts where tokens concentrate — context, history, retries.",
    move: "Instrument → cut leaks in evidence order → eval-gated model tiering last; blanket downgrade explicitly rejected.",
    measurement: "Cost per completed task by workflow as the ruling unit; falsifier allows 'expensive because valuable' with a pricing fix.",
    synthesis: "Sees cost, latency, and quality as one knife — trimmed context improves all three; the CFO reframe converts review into allocation.",
    altitude: "The CFO hears unit economics and a plan, not a defense of a big number.",
    transfer: "This is inference-economics judgment — the serving-cost anatomy (context, caching, routing, batching) that inference-perf and deployment seats live in.",
  },
  adversarial:
    "The panic failure: shipping the cheapest-model switch this week to show the CFO responsiveness — you've spent quality you can't easily rebuy, and when the bill barely moves (because the tokens were context, not model), you've proven the program can't manage itself. The engineering-pride failure: treating committed-use discounts and caching-tier pricing as 'not real optimization' — at these volumes, commercial levers move the bill as much as code does, and ignoring them leaves easy money on the table. And if your tiering had no per-class eval gate, you've rebuilt the blanket downgrade with extra steps — routing without evidence is just downgrading slowly.",
  recursiveFollowup:
    "Accounting lands: 40% of all spend is one workflow — an agent that re-reads a 200-page policy corpus per query because 'retrieval kept missing things' and someone widened it to whole-document stuffing. It's also the program's highest-value workflow and its owner is the program's loudest champion. Fix it without losing them.",
  altitude: {
    exec:
      "The bill is one number, so today every fix looks like 'buy cheaper.' Give me two weeks: you'll see cost per completed task by workflow, the three leaks we're closing — most of the spend is packaging, not intelligence — and a routing policy where cheaper models take only the work they provably handle. Then we decide what's expensive-but-worth-it, together.",
    engineer:
      "Token telemetry per task and step: input/output split, retrieval payload size, history length, retry counts. Fix order: retrieval dedupe and reranking, history caps with rolling summaries, prompt caching on stable payloads, retry sources. Tiering last, per task class, behind a held-out success-rate gate.",
    frontier:
      "Serving economics in miniature: where tokens go, what caching and routing recover, and cost-per-outcome as the unit that matters. The transferable read — most inference bills are context-shaped, not model-shaped — is the same diagnosis inference-perf teams run at datacenter scale.",
  },
},

/* ============================================================ 039 */
{
  id: "039",
  title: "One Model to Rule Them All",
  difficulty: "Medium",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Platform",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM API Platform", "MSFT MAI Strategy & Ops"],
  tags: ["model-selection", "routing", "vendor", "portfolio"],
  prompt:
    "A customer's architecture board wants to standardize on a single frontier model for all 14 agent workloads — 'one vendor, one bill, one set of quirks to learn.' Their engineers quietly disagree: the coding assistant wants one lab's model, the document workflows run fine on something far cheaper, and two workloads have data-residency constraints the chosen vendor can't meet. You're asked to endorse the standard. What do you say?",
  arc: {
    start: "A monoculture mandate colliding with 14 workloads' actual requirements.",
    mid: "Reframe: standardize the platform layer, portfolio the models — routed by task class, gated by evals.",
    end: "One gateway, one eval harness, a small governed model portfolio — and no workload held hostage by a mandate.",
  },
  expected: {
    bottleneck: "The board is standardizing at the wrong layer: the real costs they want to kill (integration sprawl, N vendor quirks, ungoverned usage) live in the access and evaluation layer — not in the model choice — and one model cannot simultaneously satisfy 14 workloads' quality, cost, and residency constraints.",
    failureMode: "The monoculture ships: the two residency-constrained workloads go shadow or die, the cheap workloads overpay 10x for capability they don't use, the coding team routes around the standard with personal keys — and when the chosen vendor stumbles (pricing change, capability regression, outage), all 14 workloads share the incident.",
    nextMove: "Redirect the standardization one layer down: one model gateway (single auth, logging, cost accounting, policy enforcement), one eval harness (per-workload success metrics), and a governed portfolio of 2–4 models — each admitted by benchmark evidence on real workloads, routed by task class, with residency handled by placement rules. The board gets 'one bill, one set of controls'; the workloads get fit; switching costs stay engineered-low.",
    metric: "Per-workload eval scores against cost — the portfolio admission test: a model enters or exits the approved set based on measured fit, not vendor relationship; plus concentration risk (share of workloads on any single model) as the board-level number.",
    owner: "The platform team owns the gateway and harness; the architecture board owns portfolio admission criteria — redirected from picking the winner to governing the contest; workload owners pick from the approved set with eval evidence.",
    falsifier: "If eval runs show one model genuinely winning across all 14 workloads at acceptable cost — and residency is solvable via that vendor's regional offerings — then the monoculture is evidence-backed, not lazy: take it, keep the gateway anyway, and re-run the contest twice a year because this market doesn't sit still.",
  },
  modelAnswer:
    "Honor the instinct, relocate the standard — the 008 move at the model layer. What the board actually wants is one bill, one security review, one set of controls, no integration sprawl. Every one of those lives in the access layer, not the model: standardize a gateway (single authentication, unified logging and cost accounting, policy enforcement, one procurement surface) and a shared eval harness, and the board gets everything it asked for while the model behind each workload stays a routing decision.\n\nThen govern models as a portfolio, because the workload facts demand it: coding assistance genuinely differs across frontier models; document summarization at 10x lower cost is free money; the residency-constrained workloads have a hard constraint no preference can override. A portfolio of two to four models — each admitted by eval evidence on the customer's actual workloads, not benchmarks from marketing decks — routed by task class, covers the spread. The board's new job is better than its old one: instead of picking a winner once (and owning the political cost of being wrong), it sets admission criteria and reviews the contest twice a year. In this market, any standard chosen today is a bet that this week's leaderboard holds for three years; nobody rational takes that bet — you build cheap switching instead.\n\nConcentration risk becomes a board-level number: share of workloads on any single model, watched like any other single-point-of-failure. And the falsifier stays live — if the evals crown one model across all 14 workloads, take the monoculture with pride; you'll have the only version of it that's evidence rather than procurement fatigue.",
  rubric: {
    diagnosis: "Locates the board's real needs in the access layer and names why one model can't satisfy 14 workloads' constraints.",
    move: "Gateway + eval harness as the standard; 2–4 model portfolio admitted by evidence, routed by class, residency by placement.",
    measurement: "Per-workload eval-vs-cost as admission test and concentration risk as the board metric; falsifier permits an evidence-backed monoculture.",
    synthesis: "Converts the board from winner-picker to contest-governor — the political upgrade that makes the right architecture adoptable.",
    altitude: "The board hears 'one bill, one set of controls' preserved — their ask, relocated, not rejected.",
    transfer: "Model routing and portfolio governance is live platform strategy at every lab and enterprise — including the multi-model reality inside Microsoft's own stack.",
  },
  adversarial:
    "The connoisseur failure: arguing model quality nuances with the board — you'll lose to 'we can't manage five vendors,' which is a real cost your critique never priced; the gateway answer wins because it takes their cost seriously. The libertarian failure: 'let every team pick freely' — that's the ungoverned sprawl the board is correctly trying to kill, and it rebuilds 001's agent chaos one layer down. And if your portfolio had no admission evals or exit criteria, you haven't governed anything — you've made the monoculture argument true by demonstrating the alternative is vibes.",
  recursiveFollowup:
    "Eight months in, the gateway works — and the chosen budget model's vendor announces end-of-life for the version two workloads depend on, with 90 days' notice. The eval harness shows the successor version regresses one workload badly. Run the response — and say what this incident proves about the original decision.",
  altitude: {
    exec:
      "Standardize where your costs actually live: one gateway, one bill, one security review, one eval standard — and behind it, a short approved list of models each workload earns by evidence. You get every control you asked for, plus the freedom to never be hostage to one vendor's pricing call. The alternative isn't simpler; it's just fragile with fewer line items.",
    engineer:
      "Gateway with unified auth, logging, per-task cost telemetry, and placement rules for residency. Admission evals per workload class on our harness, quarterly re-runs, documented exit path per model. Routing config is data, not code — a workload switches models by evidence, in a config change.",
    frontier:
      "Model portfolio governance is the platform question everywhere right now: admission by eval, routing by task class, concentration risk as a first-class metric, switching cost engineered low because leaderboards don't sit still. The transferable skill is standardizing the harness, never the winner.",
  },
},

/* ============================================================ 040 */
{
  id: "040",
  title: "Who Is the Agent, Exactly?",
  difficulty: "Hard",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Deployment",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "Anthropic TPM Apps Platform", "MSFT MAI Evals Eng"],
  tags: ["identity", "on-behalf-of", "authorization", "audit"],
  prompt:
    "Security review, two weeks before a customer's agent platform go-live, asks one question nobody can answer: when the HR agent queries the payroll API, whose identity is it using? Investigation reveals the answer is 'a service account with read access to everything, for all users' — because delegated auth was 'too complicated for the pilot.' Twelve agents share this pattern. The go-live date is public. What do you do?",
  arc: {
    start: "Twelve agents, one god-mode service account, and a public go-live in fourteen days.",
    mid: "Design the identity model — agent identity plus on-behalf-of user context — and triage which agents can ship on which pattern.",
    end: "A staged go-live where every data access is attributable, bounded by the asking user's rights, and auditable.",
  },
  expected: {
    bottleneck: "No identity architecture: the shared service account means every agent access is unattributable (audit sees 'the account did it'), unbounded (any user can extract anything the account reads — the confused-deputy problem at platform scale), and unrevokable per-user or per-agent.",
    failureMode: "Ship as-is and any employee who asks cleverly enough can read any payroll record through the HR agent while the audit log attributes it to a bot account — a breach-by-design that surfaces at the first access review or the first curious employee, whichever comes first, and retroactively poisons every go-live metric.",
    nextMove: "Design the two-part identity now: each agent gets its own scoped identity (least-privilege per agent, not shared), and user-facing agents run on-behalf-of — the effective permission is the intersection of agent scope and asking user's rights, with both identities in every audit record. Then triage the twelve for the date: agents reading only broadly-public data can ship on scoped service identities; agents touching personal or restricted data (HR, payroll, finance) ship only with OBO — or ship read-limited/human-gated until OBO lands. The go-live becomes a staged ring (019), not a binary.",
    metric: "Percentage of agent data accesses attributable to a named user AND bounded by that user's own permissions — the audit-readiness number; it must be 100% for restricted-data agents before they ship.",
    owner: "The platform team owns the identity model; security co-owns the triage tiers and signs each ring; you own the re-staged go-live narrative — 'phased by data sensitivity' reads as discipline, not slippage.",
    falsifier: "If the identity provider genuinely supports OBO token exchange for these APIs and the integration is days not weeks — sometimes 'too complicated' meant 'nobody read the docs' — then the triage collapses: ship the real pattern for everyone and the crisis was a sprint, not an architecture gap.",
  },
  modelAnswer:
    "Name the severity honestly first: this isn't a hardening gap, it's the confused-deputy problem deployed at platform scale. An agent with god-mode credentials serving all users means every user potentially wields the agent's full permissions — the HR agent doesn't leak payroll because it's badly prompted; it leaks because prompt injection or plain persistence lets any asking employee borrow the service account's eyes. And the audit trail, the thing that catches such abuse, sees only 'the bot read it.' Unattributable plus unbounded is the definition of unshippable for restricted data.\n\nThe architecture is standard and the pilot skipped it: two identities per action. The agent's own identity — scoped per agent, least-privilege, so the sprawl of twelve agents doesn't share one blast radius — and the user's identity flowing through on-behalf-of, so the effective access is the intersection: agent's scope ∩ asking user's rights. Both identities land in every audit record. A user asking the HR agent about someone else's salary gets exactly what they'd get asking the payroll system directly: denied, and logged as themselves.\n\nThe date is the political problem and triage is the answer: classify the twelve by data sensitivity. Public-ish data agents (docs search, IT helpdesk knowledge) ship on-date with scoped-not-shared service identities — honest interim. Restricted-data agents ship only with OBO, or ship castrated (read-limited, human-approval-gated) until it lands. Announce it as what it is: a security-staged rollout, rings by sensitivity — 019's pattern wearing an identity badge. Two weeks is enough for the first ring and probably for OBO on two or three critical agents if the identity provider cooperates; it is not enough for twelve, and saying so now costs less than any alternative.",
  rubric: {
    diagnosis: "Names the confused deputy at scale — unattributable, unbounded, per-user-unrevokable — not 'auth debt to clean up later.'",
    move: "Two-identity architecture (scoped agent identity + OBO intersection) and sensitivity-triaged rings against the immovable date.",
    measurement: "Attributable-and-bounded access percentage as the ship gate; falsifier checks whether OBO was ever actually hard.",
    synthesis: "Sees the audit record as the load-bearing artifact — identity design is what makes every other governance promise checkable.",
    altitude: "The go-live narrative flips from slip to discipline: 'phased by data sensitivity' is a stronger public story than the original date.",
    transfer: "Agent identity and OBO chains are the live enterprise-readiness question at every lab and platform — this is the design interview verbatim.",
  },
  adversarial:
    "The pragmatist failure: 'add better prompt guardrails and ship' — instructing the agent not to leak is not an access control; injection and persistence defeat it, and security review will (correctly) laugh. The purist failure: full OBO for all twelve or nothing — you've turned a triage into a slip, and the public date dies for agents that read the cafeteria menu. The subtle miss: per-agent scoped identities without user context — better blast radius, still unattributable per user, still the deputy; if your answer stopped there for the HR agent, the payroll question remains open. Intersection or it doesn't ship.",
  recursiveFollowup:
    "OBO lands for the HR agent — and immediately breaks its most-loved feature: managers asking 'summarize my team's recent tickets,' because the tickets are permissioned to individuals, not managers. The permission model is correct and the product is now worse. Product wants an exception path. Design it — or refuse it — in a way that survives the next security review.",
  altitude: {
    exec:
      "Today, every agent acts as one all-seeing account — untraceable to any person and able to hand any user anything it can see. We're giving each agent its own bounded identity and making user-facing agents act as the asking user. Go-live proceeds in rings by data sensitivity: the safe agents on the date you announced, the payroll-touching ones the moment they're provably attributable. That story is stronger than the original one.",
    engineer:
      "Per-agent service principals, least-privilege scopes, no sharing. User-facing flows get OBO token exchange; effective access = agent scope ∩ user rights; both identities in every access log. Ring one ships on scoped identities for public-data agents; restricted-data agents are gated on the OBO integration and a passed access-review test per API.",
    frontier:
      "Agent identity is where enterprise agent platforms live or die: the confused deputy, on-behalf-of chains, and audit attribution are the design questions labs' platform teams and MAI's enterprise surfaces answer daily. The transferable rule — every autonomous action carries two identities and their intersection — generalizes to every tool-using agent anywhere.",
  },
},

);
