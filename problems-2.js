/* Parabolic 100 — problem bank, part 2 (problems 010–017) */

P100.PROBLEMS.push(

/* ============================================================ 010 */
{
  id: "010",
  title: "Write Access to the ERP",
  difficulty: "Hard",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Deployment",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM API Platform"],
  tags: ["tool-use", "permissions", "autonomy", "irreversible-actions"],
  prompt:
    "A procurement agent pilot succeeded in read-only mode: it drafts recommendations and users love it. The business now wants it to create purchase orders in SAP autonomously, up to $50,000, citing cycle-time gains. Security is nervous but has no concrete objection beyond \"write access.\" The business case is real. Design the path — or refuse it.",
  arc: {
    start: "A read-only success asking to cross the line into irreversible actions.",
    mid: "Reframe from 'write access: yes/no' to 'how autonomy is earned, bounded, and revoked.'",
    end: "A staged autonomy ladder with audit, reversal paths, and evidence-based rungs.",
  },
  expected: {
    bottleneck: "Irreversible-action design: write actions change the risk class entirely — the question is not whether but how autonomy is earned, bounded, audited, and revoked.",
    failureMode: "One bad purchase order becomes a finance/audit incident, and the response freezes all agent write-access enterprise-wide for a year — the whole portfolio pays for one rung skipped.",
    nextMove: "Build a staged autonomy ladder: draft-only with human approval in SAP, then auto-create below a small threshold with sampled review, then raise the threshold on evidence — under a scoped service identity, per-action audit logging, an exception approval flow, a kill switch, and a rehearsed PO-reversal runbook.",
    metric: "Draft acceptance rate — the percentage of agent-drafted POs humans approve unchanged. That number is the evidence that earns each rung.",
    owner: "The finance controller co-owns the autonomy ladder with security — not IT alone; finance signs off on reversibility, security on scope.",
    falsifier: "If draft acceptance holds above ~98% for a quarter and the reversal path works in drills, keeping it at draft-only is pure friction — advance the ladder.",
  },
  modelAnswer:
    "Neither yes nor no — the correct answer is a ladder. Write access is not a permission, it is a risk class, and risk classes are crossed with evidence, bounded blast radius, and a rehearsed way back.\n\nThe design: (1) Stage autonomy. Rung one: the agent drafts POs, a human approves inside SAP — this is already most of the cycle-time win, since drafting is the slow part. Rung two: auto-create below a small threshold ($1,000) with sampled human review and weekly reporting. Rung three: raise the threshold as evidence accumulates. Each rung is earned by the draft acceptance rate — the percentage of agent drafts approved unchanged. That is the number that converts 'trust' from a feeling into a metric. (2) Bound the blast radius: the agent acts under its own scoped service identity, limited to specific vendors, cost centers, and amounts — never a human's credentials. (3) Make every action auditable: per-action logs tying PO to inputs, and an audit trail better than the human process has today; say that sentence to finance, it matters. (4) Rehearse reversal: a PO-cancellation runbook, drilled, because finance signs off on reversibility, not on accuracy claims. (5) Keep a kill switch someone owns.\n\nSecurity's vague unease becomes a concrete design review; the business gets cycle time at every rung. Autonomy is earned the way a new hire earns it — and revoked the same day the numbers say so.",
  rubric: {
    diagnosis: "Reframes 'write access yes/no' into irreversible-action risk-class design — earning, bounding, revoking.",
    move: "Specifies a staged ladder with concrete rungs, scoped identity, audit, kill switch, and a rehearsed reversal path.",
    measurement: "Names draft acceptance rate as the autonomy-earning metric; falsifier commits to advancing when evidence says so.",
    synthesis: "Sees the portfolio blast radius: one bad PO freezes every agent's write access — designing this one well protects all of them.",
    altitude: "Exec answer lands the 'earns access like a new hire' frame with cycle-time gains at every rung.",
    transfer: "Maps to tool-use permissioning at labs: reversibility classes, staged autonomy, audit-first action design.",
  },
  adversarial:
    "\"Human in the loop\" as a permanent answer kills the ROI that justified the project — review-everything at scale is the old process with extra steps, and the business will eventually route around you. The design question is how autonomy is earned and revoked programmatically. If your answer had no reversal runbook, you designed for the happy path: finance does not sign off on accuracy claims, it signs off on reversibility. And if your ladder has no advancement clause, security will treat rung one as the destination — which is just 'no' wearing process clothing.",
  recursiveFollowup:
    "Three months in: acceptance is 99.2%, and the business wants the threshold raised to $500,000. Security asks what new risk class opens above $50,000. Name it, and design the rung that addresses it.",
  altitude: {
    exec:
      "The agent earns write access the way a new hire does: drafts first, small amounts next, autonomy last — with an audit trail better than the one humans have today. Cycle time improves at every rung; risk never jumps, it steps.",
    engineer:
      "Scoped service principal, allowlisted vendors and cost centers, hard amount ceilings, per-action structured audit logs, sampled-review queue, kill switch with a named owner, and a PO-reversal runbook we drill before rung two. Acceptance-rate dashboard drives rung advancement.",
    frontier:
      "This is tool-use safety engineering: classify actions by reversibility, gate autonomy on measured acceptance, bound blast radius with scoped identities, and rehearse the undo path. The same ladder pattern governs any agent that touches production systems — enterprise or lab.",
  },
},

/* ============================================================ 011 */
{
  id: "011",
  title: "Orchestration Hype Check",
  difficulty: "Medium",
  category: "Agent Architecture",
  primaryLens: "Architecture",
  secondaryLens: "Platform",
  archetype: "Sweeper",
  secondaryArchetype: "Builder",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Apps Platform"],
  tags: ["multi-agent", "complexity", "benchmarks", "partners"],
  prompt:
    "A systems integrator pitches your customer a twelve-agent \"orchestration mesh\" — planner, router, critic, retriever, and eight specialists — for invoice exception handling. The diagram is genuinely impressive. The customer is dazzled and asks CAPE to bless the architecture. Invoice exceptions at this company are a classify-and-resolve loop with a human queue for hard cases. What do you do?",
  arc: {
    start: "A twelve-agent diagram in love with itself, pointed at a queue-and-classify problem.",
    mid: "Demand the task decomposition; make every agent earn its node with a measured failure class.",
    end: "A minimal architecture that beats the mesh on the only benchmark that matters: resolution rate and cost.",
  },
  expected: {
    bottleneck: "Architecture complexity unjustified by task structure — exception handling decomposes into classify, resolve, and escalate; twelve agents is a diagram, not a derivation from the task.",
    failureMode: "An undebuggable mesh: cascading failures with no attribution, cost and latency blowup, SI lock-in — and when it breaks, nobody can say which agent failed, so evaluability goes to zero.",
    nextMove: "Demand the task decomposition first, then counter-propose the minimal architecture — a classifier, a resolver agent, a deterministic workflow engine, a human escalation queue — and hold the SI to a comparative benchmark where every added agent must fix a measured failure class.",
    metric: "End-to-end resolution rate and cost-per-exception versus the simple baseline — the mesh must beat it to justify itself.",
    owner: "The customer's architecture board decides; the SI is held to the benchmark rather than argued with.",
    falsifier: "If the simple architecture plateaus below target on a measured failure class that a dedicated agent role demonstrably fixes, add exactly that agent — the mesh earns nodes one at a time.",
  },
  modelAnswer:
    "Never argue with a diagram; make the task testify. Invoice exception handling decomposes into: classify the exception, resolve the resolvable, escalate the rest to humans. That is one classifier, one resolver with tools, one deterministic workflow engine, one queue. Every agent beyond that must name the measured failure class it exists to fix — 'planner' and 'critic' are roles from a conference talk, not from this company's invoices.\n\nThe move is procedural, because the customer is dazzled and you are not going to out-charisma the diagram. First, require the task decomposition: exception taxonomy from their actual data, volumes, resolution rates by class. Second, counter-propose the minimal architecture as the baseline. Third, set the benchmark: end-to-end resolution rate, cost per exception, latency, and — critically — failure attribution: when it breaks, can you say what broke? Let the SI's mesh compete against the baseline on those numbers. If the mesh wins on merit, you have learned something real; agents then get added to the simple system one at a time, each earning its node.\n\nHandle the SI with care — they are the customer's delivery capacity, and humiliating them costs you the account's execution arm. Make them the ones running the benchmark: 'prove it' is a gift you give them, publicly framed as rigor.",
  rubric: {
    diagnosis: "Derives the minimal architecture from the task structure and names the mesh's real costs: attribution, debuggability, lock-in.",
    move: "Uses a comparative benchmark rather than an opinion fight; every agent must earn its node against a measured failure class.",
    measurement: "Resolution rate and cost-per-exception versus baseline; falsifier permits adding exactly the agent a measured failure demands.",
    synthesis: "Sees the SI relationship as the customer's delivery capacity — wins the architecture without losing the executor.",
    altitude: "Exec answer punctures the diagram without mocking anyone: 'your invoices don't care how fancy the mesh is.'",
    transfer: "Maps to the labs' own agent-design doctrine: simplest thing that works; add structure only when evals demand it.",
  },
  adversarial:
    "Mocking the SI is a relationship error — they are the customer's delivery arm, and you will need them to build whatever wins. But note the symmetric failure: asserting 'two agents' without the decomposition is the same crime as asserting twelve — architecture by vibes, just cheaper. The tell of a real answer is a named failure taxonomy from their actual invoice data and an explicit rule for when a new agent earns a node. If your answer skipped the benchmark and went straight to the right architecture, you won the argument and lost the customer.",
  recursiveFollowup:
    "The SI runs the benchmark: the mesh wins by 4% resolution rate at six times the cost. Procurement asks for your recommendation in one paragraph. Write it.",
  altitude: {
    exec:
      "Twelve agents is a diagram, not a design. We'll run the two that do the work against the mesh on resolution rate and cost per invoice — your invoices don't care how fancy the architecture is, and neither should your budget. Agents get added when a measured failure demands one.",
    engineer:
      "Exception taxonomy from production data first. Baseline: classifier, tool-using resolver, workflow engine, human queue — each with per-stage metrics. Any proposed agent names the failure class it fixes and proves it in the harness. Failure attribution is a hard requirement: unexplainable breakage is disqualifying.",
    frontier:
      "The labs' hard-won doctrine: start with the simplest system that works and add structure only when evals force it. Orchestration complexity is a cost you pay, not a capability you gain — and unattributable failure is the most expensive property an agent system can have.",
  },
},

/* ============================================================ 012 */
{
  id: "012",
  title: "The Oversharing Time Bomb",
  difficulty: "Hard",
  category: "Enterprise Integration",
  primaryLens: "Architecture",
  secondaryLens: "Deployment",
  archetype: "Sweeper",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "Anthropic TPM Safeguards & Evals"],
  tags: ["permissions", "security", "rollout", "data-governance"],
  prompt:
    "Two weeks into a bank's Copilot rollout, employees discover it surfacing M&A documents and salary spreadsheets from overshared SharePoint sites — files they technically had access to all along, made findable for the first time. The CISO demands a full stop. The business sponsor wants to push on. Both are escalating to the CIO, and both are citing you. What is your recommendation?",
  arc: {
    start: "Retrieval made years of permission debt visible in one week, and two executives are at war.",
    mid: "Contain without killing: scope to clean sites, remediate ACLs in waves, define the re-entry gate.",
    end: "A ring-gated re-expansion where every ring passes a permission audit — and a CISO who co-owns it.",
  },
  expected: {
    bottleneck: "Permission hygiene debt surfaced by retrieval — the ACLs were wrong for years; Copilot made the latent breach surface visible. The model isn't leaking; the tenant is.",
    failureMode: "A binary fight: full stop kills the program's credibility and re-buries a live risk; continuing as-is turns a findability incident into an actual exposure incident in a regulated industry.",
    nextMove: "Contain-then-remediate: restrict Copilot's scope to a known-good site allowlist today, run oversharing reports and fix ACLs in prioritized waves, then re-expand ring by ring with a permission audit as the gate for each ring — with the CISO co-owning the gates.",
    metric: "Overshared-item count — items accessible beyond their intended audience — burned down per wave, plus sensitive-content hits per thousand queries inside the allowed scope.",
    owner: "The CISO co-owns re-expansion gates; data owners fix their sites' ACLs; you own the ring plan and the burn-down cadence.",
    falsifier: "If telemetry shows sensitive hits persisting inside the 'known-good' allowlist, the classification and labeling model itself is broken — stop expansion and fix sensitivity labeling before fixing site scope.",
  },
  modelAnswer:
    "First, say the true sentence that reframes the war: Copilot did not create this exposure — it revealed it. Those files were accessible for years; the only thing that changed is findability. That sentence matters because it converts 'Copilot incident' into 'permission debt we now must pay,' which is a project both executives can co-own instead of a fight one of them must lose.\n\nThe plan: (1) Contain today — restrict Copilot's retrieval scope to an allowlist of audited, known-good sites. Not a full stop: a full stop re-buries the risk, un-fixes nothing, and parks the program in 'pending security review,' where enterprise AI goes to die. (2) Remediate in waves — run oversharing reports, rank sites by sensitivity and access breadth, make data owners fix their own ACLs with a deadline, apply sensitivity labels as a second enforcement layer. (3) Re-expand ring by ring — each ring of sites re-enters Copilot scope only after passing a permission audit. The gate is the CISO's, jointly owned: their signature re-opens each ring, which converts them from blocker to gatekeeper. (4) Instrument — sensitive-hit telemetry inside allowed scope, as the check on whether labeling itself is broken.\n\nTo the CIO, the framing is one line: stopping entirely re-buries a live risk; continuing blindly detonates it; scoping and remediating retires it. The rollout resumes at the speed permissions are actually fixed — which was always the honest speed.",
  rubric: {
    diagnosis: "Names permission debt made visible — not model leakage — and says so early enough to reframe the executive fight.",
    move: "Contains via scope allowlist (not full stop), remediates ACLs in waves, and gates re-expansion on audits the CISO co-owns.",
    measurement: "Overshared-item burn-down and sensitive-hits-per-1k-queries; falsifier catches the deeper labeling failure.",
    synthesis: "Converts the CISO from blocker to gatekeeper and the incident into funded remediation — the political design is the architecture.",
    altitude: "The CIO line lands: 'stop re-buries it, blind continue detonates it, scoped remediation retires it.'",
    transfer: "Maps to permission-aware retrieval and tenant-trust engineering — the enterprise-readiness bar every lab product hits.",
  },
  adversarial:
    "Arguing 'the permissions were always broken — not our problem' is technically true and politically fatal: the customer experiences it as a Copilot incident, and the program wears it. Own the remediation motion. The symmetric failure: agreeing to a full stop with no re-entry criteria — 'paused pending security review' has no exit by default, and the program never restarts. The gate out must be defined the day of the pause, with the CISO's name on it. If your answer didn't include making data owners fix their own sites, you signed IT up to boil the ocean alone.",
  recursiveFollowup:
    "Legal asks whether any surfaced document was actually viewed by an unauthorized-in-practice user, and whether that is reportable. What telemetry answers that — and what do you do if it doesn't exist?",
  altitude: {
    exec:
      "Copilot didn't create this exposure — it revealed it. We contain today by scoping to clean sites, fix the underlying permissions in waves, and every re-expansion passes a security audit. Stopping entirely just re-buries a live risk you now know about.",
    engineer:
      "Retrieval allowlist at the tenant level today. Oversharing reports ranked by sensitivity × access breadth; ACL remediation waves with data-owner deadlines; sensitivity labels as a second enforcement layer; per-ring permission audit before scope re-entry. Telemetry on sensitive hits inside allowed scope.",
    frontier:
      "Permission-aware retrieval is a trust boundary, not a feature: the index must honor source ACLs, and deployment gates must assume enterprise permission debt exists everywhere. The transferable pattern is scoped exposure with audited re-expansion — findability amplifies whatever hygiene the tenant actually has.",
  },
},

/* ============================================================ 013 */
{
  id: "013",
  title: "Stale Index, Angry Users",
  difficulty: "Medium",
  category: "Enterprise Integration",
  primaryLens: "Architecture",
  secondaryLens: "Eval",
  archetype: "Maintainer",
  secondaryArchetype: "Builder",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM API Platform"],
  tags: ["connectors", "data-freshness", "slo", "trust"],
  prompt:
    "A field-service agent answers technicians' questions from product manuals ingested through a custom connector. Technicians report answers citing superseded manual versions — a safety issue in the field. The sync job \"runs nightly,\" but nobody monitors it, and usage has quietly fallen 30% over six weeks as techs go back to PDFs. The integration was marked 'done' months ago. What do you do?",
  arc: {
    start: "A connector treated as one-time setup, silently serving last year's manuals to field techs.",
    mid: "Reclassify the integration as production infrastructure: freshness SLO, monitoring, version provenance.",
    end: "A trusted pipeline with visible version labels — and a deliberate campaign to win the techs back.",
  },
  expected: {
    bottleneck: "Data freshness has no SLO, no monitoring, and no owner — the integration was treated as a setup task instead of an operated production system.",
    failureMode: "Silent staleness produces confident wrong answers with citations; field trust collapses — and the 30% usage decay is the eval nobody was reading.",
    nextMove: "Operate the connector as production infra: a freshness SLO, sync monitoring with alerting, index versioning that purges superseded docs, version metadata surfaced in every answer — and a deliberate trust-recovery loop with the technician community.",
    metric: "Index freshness lag — source-document timestamp versus indexed version — plus citation-version accuracy on a golden set.",
    owner: "A named operations owner for the connector on the customer side; you drive the SLO definition and the recovery plan.",
    falsifier: "If freshness is verified under 24 hours and techs still report stale answers, the real failure is retrieval ranking — old versions outranking new — and the fix is index dedup and version-aware ranking, not the sync job.",
  },
  modelAnswer:
    "Two failures here, and the technical one is the smaller. The system failure: an integration with no freshness SLO, no monitoring, and no owner — 'runs nightly' is not an SLO, it is a hope with a cron schedule. The trust failure: field technicians burned by confident wrong answers have already run their own eval and voted with the 30% usage decline. That decay curve was the monitoring, and nobody was reading it.\n\nThe fix, in order: (1) Reclassify the connector as production infrastructure — freshness SLO (say, under 24 hours from manual publication to index), sync monitoring with alerts, and a named operational owner. Systems without owners degrade to the reliability of whoever notices last. (2) Fix the index semantics — superseded versions must be purged or down-ranked, not accumulate alongside their replacements; run a golden set of version-sensitive queries as a regression harness. (3) Put provenance in the product — every answer shows its source version and date ('from Manual v12, updated May 3'), giving techs a one-glance trust check instead of a cross-checking ritual. (4) Win the field back deliberately — acknowledge the bad answers through their channels, show the fix, recruit the burned techs as the verification cohort. Trust decays faster than data, and it does not recover by silent repair.",
  rubric: {
    diagnosis: "Names the missing SLO/monitoring/ownership as the system failure and reads the usage decay as the true eval signal.",
    move: "Operates the connector as production infra and pairs the technical fix with a deliberate field-trust recovery motion.",
    measurement: "Freshness lag plus citation-version accuracy on a golden set; falsifier redirects to ranking/dedup if freshness is clean.",
    synthesis: "Sees that provenance-in-the-answer converts trust from a feeling into a UI affordance — architecture serving adoption.",
    altitude: "Exec answer makes the case in operational language: SLA, monitoring, version labels, then re-earn the field.",
    transfer: "Maps to retrieval-infrastructure reliability: freshness and provenance as first-class production properties of any deployed system.",
  },
  adversarial:
    "\"Fix the sync job\" is a ticket, not an answer. The judgment content is: the usage decay was a six-week-old alarm nobody read; provenance belongs in the answer UX, not in a runbook; and there must be a named operator or this recurs in a different connector next quarter. If your answer did not include winning back the technicians — the humans who got burned — you fixed the index and lost the deployment anyway: they are already back on PDFs, and no sync job un-teaches that habit.",
  recursiveFollowup:
    "The techs now cross-check every answer against the PDF — usage recovered, but the time savings are gone. What single product change re-earns the shortcut, and how do you know when it has?",
  altitude: {
    exec:
      "The agent has been quoting last year's manuals because nobody watches the pipe that feeds it. We give the data a freshness SLA, monitoring, and version labels on every answer — then we go re-earn the field's trust, because they've already voted with their usage.",
    engineer:
      "Freshness SLO under 24h with sync alerting; version-aware indexing that purges superseded docs; provenance metadata rendered in every answer; golden set of version-sensitive queries as the regression harness; a dashboard where freshness lag is visible to the account team, not just IT.",
    frontier:
      "Retrieval systems are production systems: freshness, provenance, and staleness alarms are core reliability properties, not nice-to-haves. The transferable read is that usage decay is an eval — enterprise users run continuous evaluation on your product and publish the results as adoption.",
  },
},

/* ============================================================ 014 */
{
  id: "014",
  title: "Shadow Agents",
  difficulty: "Medium",
  category: "Governance & Risk",
  primaryLens: "Customer",
  secondaryLens: "Platform",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Safeguards & Evals", "Anthropic TPM Apps Platform"],
  tags: ["shadow-it", "dlp", "adoption", "paved-road"],
  prompt:
    "A DLP audit at your customer finds 200+ employees pasting customer data into consumer AI tools, and three business units running duct-tape \"agents\" built on personal API keys and no-code tools. The CIO's draft response is a blanket block on all external AI endpoints, effective Friday. The CISO supports it. You're asked to review the plan before it ships. What do you say?",
  arc: {
    start: "Two hundred employees route around IT, and the draft answer is a bigger wall.",
    mid: "Read shadow usage as a demand signal; sequence containment for the regulated slice, paved road for the rest.",
    end: "Sanctioned paths absorbing demand, rogue builds migrated, and DLP as a measurement loop instead of a whack-a-mole.",
  },
  expected: {
    bottleneck: "Unmet demand with no paved road — shadow usage is a demand signal, and prohibition without an alternative drives it underground rather than away.",
    failureMode: "Block-only response: usage moves to personal devices where DLP can't see it, data exposure continues invisibly, and IT learns nothing about what employees actually need.",
    nextMove: "Sequence it: immediate targeted block on the genuinely regulated data flows, a paved road for the top shadow use cases — sanctioned Copilot/API gateway with logging — a dated amnesty-and-migration path for the three BU builds, and the broad block only once the road exists.",
    metric: "Shadow-usage rate from DLP detections after the paved road ships — the falsifiable claim is that it falls without enforcement escalation.",
    owner: "The CIO owns policy; you propose the paved-road catalog; the three BU builders become design partners rather than defendants.",
    falsifier: "If sanctioned alternatives reach capability parity and shadow usage persists anyway, the road isn't actually paved — auth friction or a capability gap you haven't found — instrument the gap before escalating enforcement.",
  },
  modelAnswer:
    "Start by reframing the finding: two hundred employees just told the CIO exactly what they need, at personal risk, for free. That is the most honest product research the company will ever get. A blanket block wastes the signal and doesn't even stop the leak — usage moves to phones and home laptops, where DLP is blind and the data keeps flowing.\n\nBut pure 'enable, don't block' loses the CISO, and deserves to: some of that pasted data is regulated, and 'paved road eventually' is not a compliance answer. So sequence it. (1) Today: a narrow, defensible block on the specifically regulated flows — named data classes, named destinations — which the CISO needs and the audit demands. (2) In parallel: ship the paved road for the top shadow use cases, ranked by the DLP data itself — sanctioned Copilot surfaces, an enterprise API gateway with logging and data terms. The bar: the sanctioned path must be genuinely easier than the shadow one, or it will lose on merit. (3) The three BU builds get amnesty and a dated migration — deputize the builders as design partners; they are your most motivated users and they know where the road needs to go. (4) The broad block lands only after the road exists, and DLP telemetry becomes your measurement loop: shadow usage falling without enforcement escalation is the proof the strategy is working.",
  rubric: {
    diagnosis: "Reads shadow usage as a demand signal and names the block's actual effect: displacement to invisible channels, not prevention.",
    move: "Sequences targeted containment for regulated flows, then paved road, then broad enforcement — with amnesty for the BU builds.",
    measurement: "DLP-detected shadow rate post-paved-road as the falsifiable number; falsifier hunts the friction gap before escalating.",
    synthesis: "Balances the CISO's legitimate compliance need against adoption physics — and converts rule-breakers into design partners.",
    altitude: "Exec answer reframes 200 violations as demand data without dismissing the risk.",
    transfer: "Maps to platform judgment at labs: unsanctioned usage patterns are roadmap input; the paved road must win on merit.",
  },
  adversarial:
    "Pure 'enable, don't block' fails the risk half of this problem — some of that data is regulated, and if your answer had no immediate containment for the regulated slice, the CISO is right to overrule you. The symmetric failure is treating the sequencing as optional politics: block-first-road-later means six months of invisible leakage through personal devices. And if you left the three BU builds as policy violations instead of recruiting the builders, you discarded the only people in the company with proven motivation and working prototypes of the demand.",
  recursiveFollowup:
    "Six weeks later: shadow usage is down 70%, but one migrated BU agent now generates 40% of all AI support tickets. Was the paved road a mistake? What does the ticket pattern actually tell you?",
  altitude: {
    exec:
      "Two hundred people just told you what they need — blocking them wastes the signal and moves the leak somewhere you can't see it. We block the regulated flows today, ship the sanctioned path for the top three uses, migrate the rogue builds, then enforce. Demand this strong is an asset.",
    engineer:
      "DLP rules scoped to regulated data classes and named destinations now; an API gateway with auth, logging, and rate limits as the sanctioned path; SSO-integrated Copilot surfaces for the chat use cases; migration runbooks for the three BU builds. Telemetry on both roads — shadow and paved — as the scoreboard.",
    frontier:
      "Every platform faces this: users route around friction toward capability. Unsanctioned usage is the highest-signal roadmap input there is, and enforcement without a paved road just makes demand invisible. The transferable discipline is sequencing containment, capability, and enforcement so the sanctioned path wins on merit.",
  },
},

/* ============================================================ 015 */
{
  id: "015",
  title: "The Wrong-Answer Incident",
  difficulty: "Hard",
  category: "Governance & Risk",
  primaryLens: "Deployment",
  secondaryLens: "Eval",
  archetype: "Maintainer",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Safeguards & Evals"],
  tags: ["incident-response", "hallucination", "high-stakes", "regression-evals"],
  prompt:
    "An HR benefits agent, live for eight weeks across 12,000 employees, told an employee they qualified for extended parental leave. They made family plans around it. The policy says otherwise. HR legal is now involved, the story is spreading internally, and the VP of HR asks you directly: \"Do we shut it off?\" What do you do?",
  arc: {
    start: "One confident wrong answer, one real family consequence, and an executive holding a kill switch.",
    mid: "Run it as a production incident: contain, remediate the person, root-cause, and audit for the pattern.",
    end: "A severity-classed incident playbook, a regression eval, and a scope decision made from audit data — not fear.",
  },
  expected: {
    bottleneck: "No incident-response capability for AI systems — no severity classes, no containment playbook, no answer-audit process, and no regression harness to keep this failure fixed.",
    failureMode: "Panic shutdown teaches the org that any error kills AI programs; minimize-and-continue means the next incident arrives with a paper trail of negligence. Both destroy the program — on different schedules.",
    nextMove: "Run it as a real incident: contain today by routing benefits-eligibility intents to a human queue, support legal in making the employee whole, root-cause the failure, audit a sample of past high-stakes answers to size the problem, add the case to a regression eval, and decide scope from that data.",
    metric: "Error rate on high-stakes intents from the retrospective answer audit — is this one bad answer or one of three hundred?",
    owner: "You (or the service owner) as incident commander; HR policy owner on content; legal on the employee remedy; comms if the audit shows a pattern.",
    falsifier: "If the retrospective audit shows material error rates across other high-stakes intents, shutting those intent classes down is right — the VP's instinct was correct and the burden of proof flips to the system.",
  },
  modelAnswer:
    "Answer the VP with a process, not a yes or no: \"We contain it today, make the employee whole, and decide scope from an audit — not from one anecdote in either direction.\"\n\nFour tracks, run simultaneously. (1) Contain: route benefits-eligibility intents to a human-answered queue today — scope reduction, not shutdown; the agent keeps handling low-stakes intents while high-stakes classes go human. (2) Remediate the person: that is legal and HR's call, but support it with full conversation logs, and push toward honoring reasonable reliance — how the company treats this employee is what 12,000 others will remember about the AI program. (3) Root-cause: was it a grounding gap, a stale policy document, or over-assertive phrasing on an ambiguous case? Each has a different fix, and the case becomes a permanent regression eval. (4) Size it: sample past high-stakes answers and audit them — the single most important unknown is whether this is one bad answer or one of three hundred, and until you know, neither shutdown nor continuation is defensible.\n\nThen build what was missing: severity classes for AI answer failures, a containment playbook per class, and an audit cadence. The precedent track matters most — this incident sets how the org handles every future AI error. Handled with process, it becomes institutional capability; handled with panic or denial, it caps every future deployment at pilot scale.",
  rubric: {
    diagnosis: "Names the missing incident capability — severity classes, playbook, audit — rather than litigating the single answer.",
    move: "Runs four tracks: containment by intent class, employee remedy, root cause with regression eval, and a sizing audit.",
    measurement: "Retrospective error rate on high-stakes intents as the decisive number; falsifier accepts shutdown if the audit says so.",
    synthesis: "Sees the precedent track — how the org learns to handle AI errors — as the thing that decides the program's ceiling.",
    altitude: "The VP answer converts a binary kill decision into a contained, dated, evidence-driven one.",
    transfer: "Maps to safeguards incident response: harm classes, containment, retrospective audits, regression evals.",
  },
  adversarial:
    "The trap is answering only the technical track — root-causing the grounding gap while the employee, the lawyers, and the precedent go unmanaged. This incident has four customers: the employee, legal, the org's future incident reflexes, and the system itself. The precedent track decides whether the program survives its second incident, which is already on its way. And if your answer didn't include auditing past answers, you don't know the size of what you're managing — 'we fixed the bug' is not an answer to 'how many other people did this happen to?'",
  recursiveFollowup:
    "The audit finds three more wrong eligibility answers out of 4,100 sampled. Legal wants proactive notification to all three employees; comms fears the internal headline. What is your recommendation, and what is the message?",
  altitude: {
    exec:
      "We treat it like any production incident: contain today by routing eligibility questions to humans, make the employee whole, find the root cause, and audit past answers to learn whether this is one error or a pattern. Shutting everything off is a decision we make from that audit — not from fear.",
    engineer:
      "Intent classifier gates high-stakes classes to a human queue today. Full trace on the failing conversation: retrieval set, source doc versions, prompt, output. The case enters the regression suite. Then a stratified sample of past high-stakes answers, human-audited, to establish the actual error rate.",
    frontier:
      "This is safeguards incident response: severity taxonomies for model harms, containment by capability class, retrospective audits to size incidents, and regression evals so failures stay fixed. The transferable insight is that incident handling is a capability you build before the incident — and the second one is always coming.",
  },
},

/* ============================================================ 016 */
{
  id: "016",
  title: "The 90% Demo",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Deployment",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Safeguards & Evals", "MSFT MAI Evals Eng"],
  tags: ["distribution-shift", "production-evals", "golden-sets", "monitoring"],
  prompt:
    "A contract-review agent scored 92% on its curated test set before launch. Three weeks into production, legal ops reports \"constant misses.\" A quick sample of live traffic suggests accuracy around 71%. The engineering team's position is that the model is fine and \"users are feeding it documents it was never meant for.\" Both sides are citing numbers. Who is right, and what do you do?",
  arc: {
    start: "A 92 and a 71 describing the same system, and a team blaming the users for the gap.",
    mid: "Rebuild the eval from production traffic, with the users defining 'correct.'",
    end: "Segment-level truth, fixes ranked by volume, and a weekly live audit so the number can't drift silently again.",
  },
  expected: {
    bottleneck: "Eval–production distribution gap: the curated set doesn't represent live traffic — document types, lengths, scan quality, user phrasing — so the 92 was real but answered a different question.",
    failureMode: "The team defends the 92 and blames users while trust erodes — or ships fixes validated against the stale set, overfitting the demo distribution even harder.",
    nextMove: "Rebuild the eval from production: sample live traffic, have legal ops label it — they own the definition of correct — build a failure taxonomy, quantify accuracy by segment, fix the worst high-volume segments first, and stand up a weekly sampled audit with drift alerts.",
    metric: "Live sampled task-success rate by segment — the only number that counts now; the curated 92 is history.",
    owner: "Engineering owns the harness; legal ops owns the labels and the definition of success — putting the complainers in charge of the ground truth.",
    falsifier: "If live sampling with legal-ops labels actually shows ~90% and complaints cluster in two vocal users, the gap is expectation management, not accuracy — an entirely different fix.",
  },
  modelAnswer:
    "Both numbers are real; they measure different worlds. The 92 was earned on the study guide; production is the exam. Three weeks of 'constant misses' from the people whose job is reading contracts is not user error — it is unsampled evaluation data, and 'users are feeding it the wrong documents' is not a defense; it is a segment definition wearing an excuse.\n\nThe rebuild: (1) Sample production traffic — a few hundred real cases, stratified across contract types, lengths, and formats. (2) Legal ops labels them. This is the decisive move, because accuracy disputes are usually definition disputes: engineering graded 'extracted the clause,' legal ops grades 'caught what a lawyer must catch.' Put the complainers in charge of ground truth and the argument dissolves into data. (3) Build the failure taxonomy and segment the results — you will likely find the drop concentrated: strong on standard agreements, collapsing on scanned amendments or non-standard paper. (4) Fix by volume-weighted segment, not by anecdote. (5) Make the live sampled audit weekly and permanent, with drift alerts — the curated set becomes a regression floor, never again the headline number.\n\nEven the 'wrong documents' claim gets honored properly: if a segment is truly out of scope, declare it in the product — route it, label it unsupported — because a silent 43% segment is a trust incinerator.",
  rubric: {
    diagnosis: "Names the distribution gap and refuses the user-blame frame — while extracting the segment signal hidden inside it.",
    move: "Rebuilds the eval from live traffic with legal ops as labelers, fixes by volume-weighted segment, installs a permanent audit.",
    measurement: "Live segment-level success as the ruling number; falsifier allows the expectation-management outcome.",
    synthesis: "Sees that accuracy disputes are definition disputes — ownership of ground truth is the political fix inside the technical one.",
    altitude: "Exec answer: study guide versus exam, re-baseline underway, weekly audit so drift can't hide again.",
    transfer: "Maps to offline–online eval discipline: production sampling, drift monitoring, and declared scope boundaries.",
  },
  adversarial:
    "\"Add production monitoring\" is the beige answer — necessary, insufficient. The sharp content: the curated 92 is evidence of overfitting to a demo distribution; 'users are wrong' is a labeled failure class, not a dismissal; and whoever owns the definition of correct owns the outcome — if engineering keeps grading its own homework, the next 92 will be as hollow as this one. If your answer fixed segments without declaring the genuinely unsupported ones in the product, you left a silent 43% segment running, and it is currently teaching legal ops to distrust everything.",
  recursiveFollowup:
    "Segmented results land: 88% on standard NDAs, 43% on scanned amendments — which are 30% of legal ops' volume. Product wants to silently drop scanned-document support. Decide, and defend it to legal ops.",
  altitude: {
    exec:
      "The 92 was measured on the study guide; production is the real exam. We're re-baselining on live cases with your legal team defining 'correct,' fixing the worst segments first, and installing a weekly audit so this number can never drift silently again.",
    engineer:
      "Stratified sample of production traffic, labeled by legal ops against their standard. Failure taxonomy, segment-level accuracy, volume-weighted fix priority. Curated set demoted to regression floor. Weekly sampled audit with drift alerting on segment mix and success rate.",
    frontier:
      "The offline–online gap is the central discipline of applied evals: curated sets go stale the moment real users arrive, ground truth belongs to the domain owner, and scope boundaries must be declared in the product rather than discovered in complaints.",
  },
},

/* ============================================================ 017 */
{
  id: "017",
  title: "Golden Set Rot",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Platform",
  archetype: "Maintainer",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Safeguards & Evals", "OpenAI DPM (Codex)", "MSFT MAI Evals Eng"],
  tags: ["eval-maintenance", "golden-sets", "coverage", "measurement-debt"],
  prompt:
    "An internal-helpdesk agent has been evaluated against the same 300-item golden set for eleven months, scoring a steady 87–90. Meanwhile CSAT has dropped 15 points in two quarters. A new laptop lineup, a VPN migration, and three policy changes have shipped — none are represented in the set. Engineering cites the 89 as proof the agent is fine. Who is right, and what do you do?",
  arc: {
    start: "A green dashboard and an unhappy user base, eleven months apart.",
    mid: "Audit coverage against live intent distribution; the instrument, not the agent, is the suspect.",
    end: "An owned, event-triggered eval lifecycle — and a score that means something again.",
  },
  expected: {
    bottleneck: "Eval-set staleness: the instrument no longer measures the job — stable scores against last year's questions coexisting with falling satisfaction is measurement debt, not product health.",
    failureMode: "The dashboard stays green while the product decays, and when the gap is finally exposed the org learns to distrust evals entirely — false confidence is worse than no measurement.",
    nextMove: "Install an eval lifecycle: audit set coverage against the live intent distribution, backfill from recent tickets and CSAT-loser conversations now, tie set refreshes to change events (new products, migrations, policy changes) rather than the calendar, add per-item staleness metadata, and name an eval owner with a refresh SLA.",
    metric: "Coverage: the percentage of current live intent volume represented in the golden set — likely under half by now.",
    owner: "A named eval owner with a refresh SLA — eval sets are products with lifecycles, not artifacts from launch week.",
    falsifier: "If the refreshed set still scores ~88 on the new-intent items, the agent genuinely is fine — and the CSAT decline lives elsewhere: latency, UX, expectations. The refresh is diagnostic either way.",
  },
  modelAnswer:
    "Both numbers are telling the truth. The 89 says the agent still answers last year's questions well; the CSAT says users are asking this year's. Eleven months of laptop lineups, a VPN migration, and policy changes mean the golden set has quietly stopped measuring the job — the instrument rotted, and a stable score against a stale set is measurement debt accruing silently.\n\nThe move: (1) Quantify coverage — map the current live intent distribution and compute what share of it the golden set represents. That single number converts the argument: engineering is defending the 89 in good faith, so give them the coverage figure, not an accusation. An 89 on 45% coverage reads very differently from an 89. (2) Backfill now — build items from recent tickets and the conversations behind CSAT detractors; grade the agent on the present. (3) Make refresh event-triggered, not calendar-triggered — every product launch, migration, and policy change files eval items as part of its own definition-of-done. Calendar refreshes are always either late or busywork. (4) Add staleness metadata per item and deprecate what no longer occurs. (5) Name an owner with a refresh SLA — unowned eval sets rot at exactly the rate the business changes.\n\nExpect the refreshed score to drop — say to 74 — and pre-frame it: that is not the agent getting worse; that is measurement catching up to reality. The 89 was the illusion.",
  rubric: {
    diagnosis: "Names instrument rot / measurement debt — both numbers true, different questions — rather than 'agent got worse.'",
    move: "Quantifies coverage, backfills from live tickets, and installs event-triggered refresh with a named owner.",
    measurement: "Coverage-of-live-intents as the ruling metric; falsifier lets the refreshed set exonerate the agent and redirect the CSAT hunt.",
    synthesis: "Sees the trust economics: false green destroys org faith in evals — and hands engineering the coverage number instead of an accusation.",
    altitude: "Exec answer pre-frames the score drop as measurement catching up, protecting the program through the correction.",
    transfer: "Maps to benchmark saturation and eval-infrastructure lifecycle — core safeguards-and-evals territory.",
  },
  adversarial:
    "Everyone says 'update the golden set.' The differentiators: coverage-versus-live-distribution as the metric — refresh means matching reality, not adding items; change-event triggers instead of calendar cadence, because the business changes on events; and the political move — engineering is defending the 89 in good faith, and the coverage number wins them over where an accusation entrenches them. If your answer didn't pre-frame the post-refresh score drop, you set up the next executive conversation to conclude the refresh broke the agent.",
  recursiveFollowup:
    "The refresh lands and the score drops to 74. Leadership asks, \"So the agent got worse?\" Explain measured-versus-revealed regression in three sentences, and defend the refresh without underselling the real quality gap it exposed.",
  altitude: {
    exec:
      "The test is eleven months old; the company it tests changed underneath it. Scores stayed green because we kept grading last year's questions. We're refreshing against live tickets, tying the set to every change event, and giving it an owner — then the number will mean something again. Expect it to drop; that's measurement catching up, not the agent breaking.",
    engineer:
      "Intent-distribution analysis over recent traffic; coverage report of set versus reality; backfill items from tickets and CSAT-detractor threads; per-item staleness and provenance metadata; deprecation pass; refresh hooks in the change-management pipeline so launches file eval items as part of done.",
    frontier:
      "Benchmark rot is a lab-core failure mode: saturated or stale evals produce confident green dashboards over degrading systems. The transferable discipline is treating eval sets as owned products with coverage metrics, event-triggered refreshes, and lifecycle metadata — measurement infrastructure decays at the rate of the world it measures.",
  },
}

);
