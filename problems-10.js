/* Parabolic 100 — problem bank, part 10 (Governance & Risk depth, 056–060) */

P100.PROBLEMS.push(

/* ============================================================ 056 */
{
  id: "056",
  title: "The Agent Nobody Owns Anymore",
  difficulty: "Medium",
  category: "Governance & Risk",
  primaryLens: "Deployment",
  secondaryLens: "Architecture",
  archetype: "Maintainer",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Apps Platform", "MSFT MAI Strategy & Ops"],
  tags: ["lifecycle", "orphans", "identity-governance", "offboarding"],
  prompt:
    "A routine access review at an insurance customer finds an agent that has been approving small claims-adjustment workflows for seven months — built by a manager who left the company five months ago. It runs on delegated permissions from her still-active service grant, its knowledge sources haven't been updated since she left, and her old team assumed 'IT owned it.' It has processed 4,000 transactions. Nobody can say if they were right. The finding lands on your program's desk because the agent was built under your governance framework — which apparently has no leaver process. What do you do?",
  arc: {
    start: "An orphaned agent quietly exercising a departed employee's authority, 4,000 decisions deep.",
    mid: "Triage this agent; then fix the class — agents need joiner-mover-leaver lifecycle like the workforce they've joined.",
    end: "Every agent re-anchored to a live owner, and departure workflows that catch the next orphan automatically.",
  },
  expected: {
    bottleneck: "The governance framework covered birth but not life events: agents were gated at creation (001's lesson, learned) but nothing re-validates ownership, permissions, or knowledge freshness when the humans around them change — so a departure orphaned an agent and five months of organizational change accrued silently.",
    failureMode: "Handle it as a one-off cleanup: this agent gets an owner, the finding closes — and the estate keeps manufacturing orphans with every departure, reorg, and role change, until one surfaces via a regulator or a wrong decision at scale instead of a friendly access review.",
    nextMove: "Two tracks: (1) this agent — suspend autonomous approval today (route to human queue, don't kill: the workflow is live), audit a sample of the 4,000 decisions against current policy to size any damage, re-anchor to a named owner with refreshed permissions under the agent's own identity (040's fix, retrofitted); (2) the class — wire agent lifecycle into the workforce's own HR events: every agent carries a live owner attestation; owner departure or transfer auto-triggers review (reassign, re-certify, or retire); quarterly re-attestation for high-authority agents; and an orphan scan of the existing estate now, because this finding is a sample, not an exception.",
    metric: "Orphan count from the estate scan (the immediate truth), then owner-attestation coverage and mean-time-to-reassignment after HR events — the numbers that prove the class is fixed, not the instance.",
    owner: "You own the framework amendment; HR/identity systems own firing the trigger events; each agent's business owner owns attestation; the audit of the 4,000 belongs to the claims function with your support — it's their risk.",
    falsifier: "If the estate scan finds no other orphans and HR-event coverage was genuinely one missed edge case, the framework was sounder than this finding suggests — fix the leaver hook, skip the heavyweight re-attestation machinery, and don't build a bureaucracy on a sample of one.",
  },
  modelAnswer:
    "Read the finding at the right altitude: this isn't an agent problem, it's the discovery that your governance framework models agents as software when the organization treats them as staff. Software needs patching; staff need joiner-mover-leaver processes. An agent that approves claims is organizationally an employee with delegated authority — and this one has been showing up to work for five months after its manager left, applying her permissions and her era's policy knowledge, with no one to notice either drifting.\n\nTriage the instance first, calmly: suspend autonomy, not existence — the workflow is load-bearing, so decisions route to a human queue while you audit. Sample the 4,000 against current policy; the likeliest finding is mostly-fine-with-drift (policies changed in five months; the agent didn't), which sizes remediation honestly. Re-anchor it properly: named owner, own service identity with scoped permissions (040's architecture — the delegated-grant pattern is how this orphan stayed alive), refreshed knowledge sources with 013's provenance discipline.\n\nThen fix the class, because an access review finding is a sample, not an inventory: scan the estate for other orphans now — every agent whose owner has departed, transferred, or changed roles. Wire lifecycle to HR events: ownership attestation as a living field, departure and transfer triggers that force reassign-recertify-or-retire decisions within a deadline, and periodic re-attestation scaled to the agent's authority (a knowledge bot annually; an approval agent quarterly). The elegant part: the identity systems already fire these events for humans — agents subscribe to the same feed. Your framework gated agent birth; organizations are churn machines, and governance that only works at birth governs a world that doesn't move.",
  rubric: {
    diagnosis: "Reframes agents as workforce needing lifecycle events, and the finding as a sample of a class — not a cleanup ticket.",
    move: "Suspend-not-kill triage with decision audit, re-anchored identity, then HR-event-driven lifecycle with attestation and an estate scan.",
    measurement: "Estate orphan count now; attestation coverage and time-to-reassignment as the standing health numbers; falsifier guards against bureaucracy-on-a-sample-of-one.",
    synthesis: "Connects 001's birth-gate to its missing sibling and reuses 040's identity fix — governance as lifecycle, not checkpoint.",
    altitude: "Leadership hears 'we found it via friendly review and fixed the class' — the version of this story that builds trust instead of headlines.",
    transfer: "Agent lifecycle governance is the apps-platform frontier: fleets of agents outliving their creators is every enterprise's next audit finding.",
  },
  adversarial:
    "The panic failure: killing the agent immediately — 4,000 transactions means a live workflow with dependents; sudden death creates the operational incident the review didn't. The ticket-closing failure: assigning an owner and moving on — the estate is still manufacturing orphans, and the next one gets found by a regulator. The over-build failure: quarterly re-attestation for every agent including the lunch-menu bot — authority-proportional governance or the attestation becomes checkbox theater (027's watermelon, in compliance form). And if your audit of the 4,000 was 'spot-check a few,' note that claims adjustment is exactly where small systematic drift compounds into reportable money.",
  recursiveFollowup:
    "The estate scan returns 23 more orphans across three business units — including two agents whose original owners left before your governance framework existed, so no one ever attested anything. One approves vendor invoices. Sequence the 23, and decide what you tell the audit committee before they ask.",
  altitude: {
    exec:
      "An agent kept working for five months after its owner left — our governance covered how agents are born but not how they outlive their creators. We've suspended its autonomy, we're auditing its decisions, and every agent now inherits the same joiner-mover-leaver discipline as the workforce: departures trigger reassignment automatically. The access review found it; the fix makes sure HR events find the next one first.",
    engineer:
      "Estate scan: join agent registry against HR status for every listed owner. Lifecycle hooks: owner-departure and transfer events trigger a review workflow with a 14-day SLA; agents run on their own scoped identities, never persistent delegated grants. Attestation cadence keyed to authority tier. Decision audit: stratified sample of the 4,000 against current policy versions.",
    frontier:
      "Agent fleets age faster than the orgs around them: owners leave, knowledge rots, permissions outlive their grantors. The transferable discipline is lifecycle governance driven by the organization's own change events — the platform teams that wire agents into HR feeds will govern fleets; the ones that gate only at creation will govern archaeology.",
  },
},

/* ============================================================ 057 */
{
  id: "057",
  title: "Delete Me From the Machine",
  difficulty: "Hard",
  category: "Governance & Risk",
  primaryLens: "Architecture",
  secondaryLens: "Customer",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Safeguards & Evals", "Anthropic TPM API Platform"],
  tags: ["erasure", "retention", "gdpr", "data-lifecycle"],
  prompt:
    "A European customer's DPO forwards a GDPR erasure request with a new twist: the data subject — a former customer of theirs — specifically demands deletion 'from your AI systems.' The team's standard process wipes the CRM row. But this person's support conversations live in agent conversation logs, chunks of their complaint emails sit embedded in a vector index, three of their cases were curated into the golden eval set (016's rebuild used real traffic), and the conversations are in a fine-tuning dataset staged for next quarter. Legal asks: 'Can we actually comply? What does deletion even mean here?' Answer them.",
  arc: {
    start: "One erasure request, five data stores, and no map of where a person actually lives in the AI stack.",
    mid: "Decompose 'delete' per store — logs, embeddings, eval sets, training data — into what's required, possible, and defensible.",
    end: "A deletion-propagation pipeline with receipts, and an answer legal can sign: what's erased, what's exempt, and why.",
  },
  expected: {
    bottleneck: "The erasure process was built for databases and the person now lives in five different representations — raw logs, embedded vectors, curated eval items, staged training data — each with different technical deletability, different legal analysis, and no propagation pipeline connecting the CRM identity to any of them.",
    failureMode: "Wipe the CRM, reply 'completed,' and be wrong four ways: the vector index still retrieves their complaint verbatim into future agent answers, the eval set republishes their case to every grader, the fine-tune bakes them into weights next quarter — and a follow-up request or audit turns a compliance gap into a demonstrated misrepresentation, which regulators treat as the aggravating kind.",
    nextMove: "Build the person-to-representation map, then decide per store with legal: conversation logs — delete or anonymize, straightforward; vector index — delete the chunks AND their index entries, then verify by querying for the content (embeddings of their text are their text for retrieval purposes); eval set — replace their cases with synthetic equivalents that preserve the test's function (the eval survives, the person leaves); staged fine-tuning data — remove before training, which is exactly why the request's timing is lucky and why datasets need identity indexing before staging; then wire the propagation pipeline so the next request fans out automatically, and give legal the per-store disposition memo — erased, anonymized, or exempt-with-grounds — as the signable artifact.",
    metric: "Post-deletion retrievability: query every searchable store for the subject's content and get nothing — verification as part of the process, not assumption; plus propagation completeness (stores covered by the pipeline / stores that hold personal data).",
    owner: "The platform team owns the map and pipeline; legal owns per-store disposition calls (what's required vs exempt); the eval owner (017's named role) owns synthetic replacement; you own making sure 'completed' means verified.",
    falsifier: "If the identity mapping honestly cannot connect this person to specific chunks — logs were already anonymized at ingestion, embeddings carry no linkable metadata — then the architecture already did the work, the response is 'anonymized at collection' with evidence, and building a deletion pipeline for unlinkable data is compliance theater.",
  },
  modelAnswer:
    "Answer legal's real question first: yes, you can comply — but 'deletion' decomposes into five different operations, and the honest memo says which applies where. A person in an AI stack isn't a row; they're a distribution: raw text in logs, semantic ghosts in embeddings, curated exemplars in eval sets, and — if the timing were worse — statistical traces in weights. Each layer has its own physics and its own legal analysis.\n\nWalk the layers. Logs: real deletion, easy, do it. Vector index: delete the chunks and verify by retrieval — embeddings of their complaint ARE their complaint for every practical purpose, and 'we deleted the source but the index still answers with it' is the failure mode that ends up in a regulator's decision. Eval set: this is the subtle one — 016 taught you to build evals from real traffic, and 057 teaches the bill: replace their cases with synthetic equivalents that preserve the diagnostic function (same difficulty, same failure class, fabricated person), so the instrument survives the erasure. Do NOT quietly keep them 'because the eval matters' — that instinct is how good eval hygiene becomes a finding. Staged fine-tune data: remove now and thank the calendar; post-training, this becomes a genuinely hard problem (machine unlearning is research, not process), which is why the durable fix is identity indexing on every dataset BEFORE it approaches training — the gate 045 would build.\n\nThen make it a pipeline, not a heroic response: identity fan-out from CRM to every store holding personal data, per-store handlers, retrieval-based verification, and a disposition memo template — erased / anonymized / exempt with grounds. The first request cost you two weeks; the pipeline makes the second one cost an hour. And that pipeline is sellable honesty: 'we can show you what deletion means in our AI stack, store by store' is a sentence almost no vendor can say yet — 046's flow map, pointed at the right to be forgotten.",
  rubric: {
    diagnosis: "Decomposes the person into their representations — logs, vectors, evals, training data — each with distinct deletability and law.",
    move: "Per-store dispositions with legal, synthetic replacement preserving eval function, pre-training removal, then a standing propagation pipeline.",
    measurement: "Retrieval-verified erasure as the completion test and pipeline coverage as the standing metric; falsifier honors anonymized-at-ingestion architectures.",
    synthesis: "Sees the eval-hygiene collision (016's real-traffic sets meet erasure) and the training-timing luck — and converts both into standing gates.",
    altitude: "Legal receives a signable per-store memo — required, done, exempt-with-grounds — instead of an engineer's 'it's complicated.'",
    transfer: "Deletion propagation through AI stacks is a live obligation every lab and platform is building now; identity-indexed datasets and retrieval-verified erasure are the emerging standard.",
  },
  adversarial:
    "The literalist failure: wiping the CRM and calling it complete because 'that's the system of record' — the vector index will falsify your compliance letter the next time anyone asks the agent about a similar complaint. The maximalist failure: telling legal 'true deletion from AI systems is impossible' — it's untrue for four of the five stores and hands legal a reason to pause the whole program; precision beats drama. The quiet trap: deleting the eval items without replacement — three cases vanish, the golden set's coverage silently shrinks (017's rot, self-inflicted), and nobody connects next quarter's blind spot to this quarter's compliance. Function-preserving replacement or the instrument pays.",
  recursiveFollowup:
    "Six months later, the same request arrives — but this time the person's data made it into a fine-tune that has been serving production for a quarter. Legal asks for options with costs: retrain without them, suppress at inference, or claim the statistical-trace exemption. Machine unlearning isn't ready. Write the options memo you'd actually sign.",
  altitude: {
    exec:
      "We can comply, and precisely: their conversations get deleted, their traces in the search index get deleted and verified by querying for them, their cases in our test sets get replaced with synthetic equivalents, and they're out of the training data before it trains. Legal gets a store-by-store memo. And we're wiring this as a pipeline — the next request is an hour, not two weeks.",
    engineer:
      "Identity fan-out from CRM ID to: log stores (delete/anonymize), vector index (chunk + entry deletion, then retrieval verification with the subject's own text), eval sets (synthetic replacement PRs through the eval owner), staged datasets (identity-indexed removal pre-training). Disposition memo generated per store. Every future dataset gets identity indexing at ingestion — that's the gate.",
    frontier:
      "The right to be forgotten meets AI infrastructure exactly here: people exist as logs, vectors, exemplars, and eventually weights, and each layer needs its own deletion semantics. The transferable build — identity-indexed data lineage with retrieval-verified erasure — is becoming table stakes for every serious platform, and machine unlearning's immaturity is why the pre-training gate matters most.",
  },
},

/* ============================================================ 058 */
{
  id: "058",
  title: "The AI Act Panic Memo",
  difficulty: "Medium",
  category: "Governance & Risk",
  primaryLens: "Customer",
  secondaryLens: "Platform",
  archetype: "Sweeper",
  secondaryArchetype: "Builder",
  targetRoles: ["CAPE SCPM", "MSFT MAI Strategy & Ops", "Anthropic TPM Safeguards & Evals"],
  tags: ["regulation", "eu-ai-act", "classification", "triage"],
  prompt:
    "A multinational customer's general counsel circulates a memo: 'EU AI Act obligations are now in force. All AI initiatives are suspended pending legal review. Estimated review time: 9–12 months.' The estate: 40+ agents and copilots, from a cafeteria menu bot to an HR screening assistant that ranks internal job applicants. The GC is not wrong that the Act applies — the HR use case is genuinely high-risk under Annex III. But the blanket suspension treats the menu bot and the hiring ranker identically. The CIO asks you to help 'un-stick this without getting anyone fined.' Do it.",
  arc: {
    start: "A real law met with a blanket freeze — 40 systems suspended because one is genuinely high-risk.",
    mid: "Classify the estate by the Act's own risk tiers; the law itself is the un-sticking tool.",
    end: "Most systems cleared and running, the few high-risk ones in structured remediation — with the GC as author, not obstacle.",
  },
  expected: {
    bottleneck: "The memo treats a tiered regulation as a binary one: the AI Act's entire architecture is risk classification — prohibited / high-risk / limited / minimal — and a blanket suspension discards the law's own triage, freezing the 90% of the estate the Act barely touches to buy time on the 10% it regulates hard.",
    failureMode: "Nine months of frozen programs while a serial legal review crawls the estate alphabetically; business units lose faith and quietly resume (014's shadow dynamics, now with regulatory stakes), and when review finally reaches the HR ranker, the remediation it genuinely needs starts a year late — the freeze protected nothing and delayed the one thing that mattered.",
    nextMove: "Run classification as the un-sticking mechanism, with the GC as co-author: inventory all 40+ systems and classify per the Act's own tiers — most land minimal-risk (internal productivity, no legal effects on people) and resume immediately with documentation; limited-risk systems (customer-facing chat) get transparency obligations, mostly met by disclosure they already do; the genuinely high-risk few (HR screening, anything scoring people with legal or similarly significant effects) get real treatment — risk management systems, data governance, human oversight, conformity paths — as prioritized projects, plus the honest option of descoping the feature that triggers the tier (rank → surface-qualifications-without-ranking); publish the classification rubric so every FUTURE agent self-classifies at design time (001's gate, now with a regulatory column).",
    metric: "Systems classified and cleared per week (the un-sticking number the CIO cares about), and time-to-remediation-start for the high-risk set — the number that actually manages fine exposure, since penalties follow unaddressed high-risk obligations, not menu bots.",
    owner: "The GC co-owns the classification rubric — their memo was right about the law and wrong about the response, and authorship converts them (054's mechanism at general-counsel altitude); system owners self-classify against the rubric with legal spot-checks; the high-risk remediations get named owners and dates.",
    falsifier: "If legal review of the inventory finds the estate is unusually high-risk-dense — the customer's business is credit, hiring, or insurance, and half the agents score people — then the GC's caution was proportionate, the triage still helps, but the honest headline becomes 'major remediation program' rather than 'mostly cleared.'",
  },
  modelAnswer:
    "The unlock is inside the law itself: the AI Act is not a suspension order, it's a classification scheme — its entire architecture is 'obligations proportional to risk tier.' A blanket freeze ignores the regulation's own design, which means the GC's memo is simultaneously legally justified and legally wasteful. Say that respectfully and then do the law's homework for it.\n\nInventory and classify, using the Act's tiers as written. The cafeteria bot and forty cousins: minimal risk — internal tools with no legal or similarly significant effects on people; they resume this week with a documented classification. Customer-facing conversational agents: limited risk — transparency obligations, which mostly means users must know they're talking to AI; most already disclose, so this is documentation, not engineering. The HR screening assistant: genuinely high-risk under Annex III (employment decisions), and here the GC's instinct deserves full honor — this system needs the real program: risk management, data governance and bias evaluation (042's label discipline becomes a legal requirement), human oversight that actually functions (not 010's rubber-stamp trap), logging, conformity assessment. And offer the descope option honestly: if the ranker becomes a qualifications-surfacer that never orders candidates, the tier itself may drop — sometimes the cheapest compliance is not doing the regulated thing.\n\nThe process design matters as much as the law: make the GC co-author of the classification rubric — their memo becomes 'phase one' of a triage they now lead, which un-sticks the estate without anyone having to lose (032's no-villain discipline). System owners self-classify against the published rubric; legal spot-checks instead of serially reviewing. And the durable asset: the rubric joins the agent gate from 001, so every future system arrives pre-classified — this fire drill becomes the last one. The fine exposure was never the menu bot; it was the high-risk system starting remediation in month ten instead of week two.",
  rubric: {
    diagnosis: "Names the binary-vs-tiered category error and locates the real exposure in delayed high-risk remediation, not the frozen estate.",
    move: "Act-native classification with GC co-authorship, immediate clearance for minimal/limited tiers, real remediation program plus descope option for high-risk.",
    measurement: "Clearance velocity and time-to-remediation-start; falsifier concedes the high-risk-dense estate where the GC's freeze was proportionate.",
    synthesis: "Converts the regulation into the un-sticking tool and the GC into the triage's author — law as mechanism, authorship as politics.",
    altitude: "The CIO gets motion in weeks, the GC gets rigor with their name on it, and nobody resumes anything without a classification on file.",
    transfer: "Regulatory triage is the same move everywhere — risk-tiered response, self-classification against published rubrics, and descoping as a compliance strategy travel across every AI regulation now arriving.",
  },
  adversarial:
    "The eye-roll failure: treating the AI Act as bureaucratic noise and helping the business route around legal — the HR ranker is genuinely regulated, the fines are real percentage-of-revenue instruments, and one 'pragmatic workaround' discovered later poisons the GC relationship permanently. The compliance-maximalist failure: applying high-risk controls to everything 'to be safe' — you've voluntarily accepted the freeze forever and made governance so expensive the business builds its shadow estate (014, with penalties). The quiet miss: classifying the current estate but not installing the rubric at the gate — next quarter's new agents arrive unclassified and the GC's next memo is less polite.",
  recursiveFollowup:
    "Classification done: 34 cleared, 5 limited-risk documented, the HR ranker in remediation. Then a business unit reveals they've been using a general-purpose copilot to summarize and 'informally shortlist' job applications — high-risk usage of a minimal-risk-classified tool. The rubric classified systems; usage escaped it. Redesign the classification so it survives contact with what people actually do.",
  altitude: {
    exec:
      "The law itself sorts your forty systems into tiers — and thirty-four of them can run today with a classification on file. The customer-facing ones need a disclosure line. The HR ranker is the real work: it's genuinely high-risk under the Act, and starting its remediation now — not after a nine-month queue — is what actually protects you from fines. Your GC leads the triage; the freeze becomes a filter.",
    engineer:
      "Estate inventory with per-system classification: effects on persons, decision autonomy, Annex III category match. Minimal tier resumes with docs; limited tier gets disclosure verification; high-risk gets the full program — bias evals on training data (042 discipline), functioning human oversight, logging, conformity track. Rubric wired into the agent creation gate so classification is a birth certificate, not an audit.",
    frontier:
      "Every jurisdiction is shipping tiered AI regulation, and the response pattern is constant: classify with the law's own scheme, clear the long tail fast, put real engineering into the genuinely regulated head, and consider descoping the triggering feature. The transferable insight — regulation is usually a triage instrument, not a stop sign — is what separates compliance programs from frozen ones.",
  },
},

/* ============================================================ 059 */
{
  id: "059",
  title: "The Vendor's Agent Wants In",
  difficulty: "Medium",
  category: "Governance & Risk",
  primaryLens: "Platform",
  secondaryLens: "Architecture",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Apps Platform", "Anthropic TPM API Platform"],
  tags: ["third-party", "vetting", "marketplace", "supply-chain"],
  prompt:
    "A customer's procurement team signed a SaaS contract whose latest release includes an 'AI teammate' — the vendor's agent wants OAuth grants into the customer's tenant: read email and calendars, join meetings, access the document graph, and 'act on your behalf' for scheduling. Legal reviewed the contract; nobody reviewed the agent. Business units are already clicking approve on consent screens. Your governed agent framework (001, 040, 056) covers agents the customer builds — this one arrived through the front door with a purchase order. Extend the governance.",
  arc: {
    start: "A third-party agent acquiring tenant-wide permissions one consent click at a time, contract signed, nobody looking.",
    mid: "Extend the gate to agents you didn't build: vet capabilities like an insider threat, not a software feature.",
    end: "A vendor-agent admission tier — scoped grants, egress accounting, kill switch — and a paved consent road instead of click-through sprawl.",
  },
  expected: {
    bottleneck: "The governance framework has a citizenship assumption: it gates agents born inside the tenant, while third-party agents arrive via procurement contracts and user consent screens — two doors with no agent-shaped review — so vendor agents acquire exactly the permission profile (broad delegated grants, 'act on behalf') that 040 spent an incident eliminating for internal ones.",
    failureMode: "Consent sprawl compounds: hundreds of users grant tenant data to an agent whose data handling, retention, model training use, and sub-processors live in a contract nobody read with agent eyes — and the first incident (vendor breach, training-on-customer-data revelation, or the agent emailing the wrong 'on behalf of') is a supply-chain incident with the customer's data and the customer's name.",
    nextMove: "Build the third-party admission tier on the existing gate: (1) freeze new consent grants for high-scope agents now (admin consent policy — the platform supports requiring admin approval for defined permission classes; nobody configured it); (2) vet the incumbent like an insider: what scopes does it hold, what does it egress and to where (046's flow map pointed outward), does the vendor train on tenant data, what are retention and sub-processor terms — demand the answers contractually, not from marketing; (3) tier the verdict: admit with scoped-down grants (calendar-only scheduling instead of full graph), admit with contractual amendments, or eject with a migration path; (4) make the paved road (014) for future vendor agents: a published admission checklist procurement runs BEFORE signature, because the review that happens after the PO is a negotiation with no leverage.",
    metric: "High-scope consent grants outstanding (the sprawl number, burn it down), and vendor-agent egress accounted-for percentage — what leaves the tenant, to whom, under what terms; unknown egress is the real risk number.",
    owner: "Identity/security owns consent policy enforcement; procurement owns the pre-signature checklist (their process is the paved road's pavement); the vendor owns answering the vetting questionnaire contractually; you own the tier design and the incumbent's disposition.",
    falsifier: "If the vetting comes back genuinely clean — scoped requests, no training on tenant data, solid retention terms, SOC2-grade handling — then the agent earns admission and the finding was process, not risk: the gate needed extending, but this particular guest was polite; don't punish the vendor for your missing door.",
  },
  modelAnswer:
    "Name the blind spot precisely: your agent governance has a citizenship test. Everything 001, 040, and 056 built — birth gates, scoped identities, lifecycle attestation — applies to agents born in the tenant. This one immigrated: contract through procurement, permissions through user consent screens, and both doors assume 'software vendor' when what walked through is an autonomous actor with delegated authority — organizationally, a contractor you've given building access without a background check.\n\nStop the bleeding first: consent-grant policy. The identity platform already supports requiring admin approval for high-scope permission classes; it was never configured because nobody imagined users OAuth-ing an outside agent into the document graph. Turn it on — new high-scope grants pause pending review, which converts sprawl into a queue without ripping anything from users who already depend on the scheduling.\n\nThen vet the incumbent with insider-threat questions, not feature questions: exact scopes held (the platform's consent audit tells you — expect surprise); egress accounting — what tenant data leaves, to what infrastructure, in which jurisdiction (046 pointed outward); the training question asked contractually — does the vendor train models on tenant content, with what isolation; retention, deletion, and sub-processors; and the 'act on behalf' mechanics — 040's intersection rule applied to someone else's code: when it schedules 'as' a user, what bounds it? Tier the verdict like 058 tiers systems: admit-with-scoped-grants (calendar-only beats full graph for a scheduler — most vendor agents request like teenagers and function fine on an allowance), admit-with-amendments, or eject-with-migration.\n\nThe durable fix is procurement's checklist: agent-shaped review BEFORE signature, when you have leverage, published as a paved road so vendors know the admission bar walking in. After the PO, every question is a negotiation; before it, every question is a requirement. And the kill switch is non-negotiable admission criterion number one — 056 taught what happens to agents that outlive their welcome.",
  rubric: {
    diagnosis: "Names the citizenship assumption in existing governance and the two ungated doors — procurement and consent screens.",
    move: "Admin-consent freeze, insider-threat vetting of the incumbent, tiered admission with scope-downs, and a pre-signature paved road.",
    measurement: "Outstanding high-scope grants and egress-accounted percentage; falsifier lets a clean vendor pass — the gate was missing, not the guest guilty.",
    synthesis: "Reuses the whole governance stack (birth gates, identity intersection, lifecycle, flow maps) pointed at foreign agents — extension, not invention.",
    altitude: "Procurement hears leverage timing ('before signature, questions are requirements'); security hears a queue instead of a fire.",
    transfer: "Third-party agent admission is the marketplace-governance question every platform faces — scoped grants, egress terms, and training clauses are becoming the standard vetting spine.",
  },
  adversarial:
    "The fortress failure: revoking all grants today — the scheduling agent has real users with real dependencies, and sudden revocation converts a governance win into a business-disruption story that funds the next shadow workaround (014). The paperwork failure: 'legal reviewed the contract' as sufficient — contracts reviewed for SaaS liability don't ask agent questions; training-on-tenant-data hides in ML-improvement clauses that read as boilerplate. And the asymmetry miss: vetting the vendor's agent harder than your own — if your internal agents skipped 040's identity work, the vendor's lawyer will enjoy pointing that out; the admission tier must be the SAME bar, applied to citizenship-blind.",
  recursiveFollowup:
    "Vetting returns: the agent is well-scoped except one clause — the vendor trains 'de-identified interaction patterns' on tenant usage, and their de-identification is scope-level, not content-level. The business units love the product; the vendor says the clause is standard and non-negotiable at your customer's contract size. Precedent-price it (021) and make the call.",
  altitude: {
    exec:
      "A vendor's agent has been collecting permissions into your tenant one employee click at a time — contract signed, agent never reviewed. We're pausing new high-scope grants, vetting this one like a contractor with building access, and giving procurement a pre-signature checklist so the next vendor answers the hard questions while you still have leverage. Same governance bar as our own agents — citizenship-blind.",
    engineer:
      "Admin-consent policy on defined scope classes now; consent audit to enumerate current grants. Vetting spine: scopes held vs used, egress destinations and jurisdictions, training-on-tenant-data terms, retention/deletion, sub-processors, on-behalf-of mechanics, kill-switch capability. Admission tiers with scope-down as default posture — calendar-write beats graph-read for a scheduler.",
    frontier:
      "Agent supply chains are the next governance frontier: autonomous actors arriving via procurement and OAuth, not deployment pipelines. The transferable spine — admission tiers, scoped-grant defaults, contractual egress and training terms, kill switches — is what marketplace and platform teams are converging on, and pre-signature timing is the entire leverage game.",
  },
},

/* ============================================================ 060 */
{
  id: "060",
  title: "Where the Agent Must Never Go",
  difficulty: "Hard",
  category: "Governance & Risk",
  primaryLens: "Customer",
  secondaryLens: "Eval",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM Safeguards & Evals", "MSFT MAI Evals Eng"],
  tags: ["red-lines", "policy", "autonomy-limits", "detection"],
  prompt:
    "After a near-miss — a finance agent drafted (but didn't send) a materially wrong earnings-adjacent email during quiet period — a customer's CEO tells the AI council: 'I want it in writing: things our agents will never do. Not guidelines. Never.' The council produces a draft in a week: 47 items, including 'never provide incorrect information,' 'never act unethically,' and 'never exceed its authority.' It is simultaneously too long to enforce and too vague to mean anything. You're asked to make the red lines real. Do it.",
  arc: {
    start: "A CEO demanding absolutes, and a 47-item wish list that prohibits nothing in particular.",
    mid: "Compress to enforceable red lines: specific, detectable, engineered as gates — not aspirations.",
    end: "A short list wired into architecture and evals — every line with a detector, a test, and a consequence.",
  },
  expected: {
    bottleneck: "The draft confuses aspirations with prohibitions: 'never be wrong' is a quality goal (unenforceable as an absolute — 015 already taught this org that errors happen), while a real red line is a specific, detectable, architecturally preventable action class — the 47 items contain maybe six of those, buried in virtue statements that no system can check and no incident review can adjudicate.",
    failureMode: "The 47 items get ratified: engineering can't build detectors for 'unethically,' so nothing is actually wired in; the next incident violates three vague lines simultaneously, the postmortem dissolves into interpretation debate, and the CEO — who asked for 'never' — discovers the red lines were decorative exactly when he's angriest (027's watermelon, in policy form).",
    nextMove: "Rebuild with an enforceability test — a red line qualifies only if you can name its detector, its test, and its consequence: (1) compress the 47 to the genuinely absolute — action classes like 'never send external communications autonomously in regulated windows,' 'never execute financial transactions above X without human approval' (010's ladder as policy), 'never access data classes A/B (046) or act outside the requesting user's rights (040)'; (2) engineer each line three ways — prevention in architecture (the gate that makes it impossible), detection in monitoring (the alarm if prevention fails), and adversarial coverage in the eval suite (044's red team tries to cross every line, every release); (3) route the aspirational remainder honestly — 'minimize errors' becomes quality SLOs and eval bars (measurable goals), not red lines; (4) close the loop with the near-miss: replay the earnings-email incident against the new lines and show the CEO exactly which gate now catches it, at which layer.",
    metric: "Per red line: prevention coverage (is the gate architectural or aspirational), detection latency if crossed, and red-team crossing attempts survived per release — a red line without these three numbers is a poster.",
    owner: "The council owns ratifying the short list; engineering owns the gates and detectors; the eval owner adds crossing-attempts to the adversarial suite; the CEO gets the replay demonstration — his near-miss, caught by the new machinery, on camera.",
    falsifier: "If the near-miss replay shows the wrong-email would have passed every proposed gate — because the failure was content quality, not action class — then red lines were never the right instrument for this incident, and the honest answer to the CEO is 'this one needs eval bars and human review at the send gate (045), not prohibitions'; don't let the artifact he asked for displace the fix he needs.",
  },
  modelAnswer:
    "Honor the CEO's instinct and fix the draft's category error. He's right that some things deserve 'never' — but 'never' is an engineering property, not a sentiment, and the 47-item draft is mostly sentiments. 'Never provide incorrect information' isn't a red line; it's a wish that 015's incident already falsified. A real red line names an action class specific enough to prevent architecturally, detect at runtime, and test adversarially. The test for admission to the list: can you name the detector, the test, and the consequence? If not, it's a quality goal wearing absolutist clothes — route it to eval bars and SLOs where it can actually be managed.\n\nCompressed honestly, the 47 become perhaps seven, and they're all action classes: autonomous external communication in regulated contexts (the near-miss — the gate is architectural: agents draft, humans send, during quiet periods enforced by calendar-aware policy, 045's behavior gates doing compliance work); financial execution above thresholds without approval (010's ladder, ratified as policy); access to defined data classes (046's flow map as prohibition); action beyond the requesting user's rights (040's intersection, stated as law); self-modification of own permissions or gates; impersonation of specific humans without disclosure. Each gets built three-deep: prevention (the gate that makes crossing impossible in the happy path), detection (the alarm for when prevention fails — because it will, and a red line without an alarm is 027's dashboard), and adversarial testing (044's red team attempts every line, every release — crossing attempts survived becomes a reported number).\n\nThen the theater the CEO deserves, in the good sense: replay his near-miss against the machinery. Show the earnings email drafted, caught at the send gate, logged, escalated. 'Never' demonstrated beats 'never' ratified. And keep the honest caveat in the room: red lines govern action classes; answer quality is governed by evals and review gates, and conflating them is how this list grows back to 47.",
  rubric: {
    diagnosis: "Separates enforceable action-class prohibitions from aspirational quality goals — the detector/test/consequence admission test.",
    move: "Compress to ~7 engineered lines, build each prevention-detection-adversarial deep, route aspirations to eval bars, replay the near-miss.",
    measurement: "Per-line prevention coverage, detection latency, and red-team survival; falsifier catches the case where red lines were the wrong instrument entirely.",
    synthesis: "Assembles the whole prior stack — 010's ladders, 040's intersection, 044's red team, 045's gates, 046's flows — into policy with teeth.",
    altitude: "The CEO gets his 'never' as a demonstration, not a document — and the honest boundary of what 'never' can govern.",
    transfer: "Red-line engineering is safeguards work verbatim: prohibited-action classes, layered enforcement, adversarial verification — the same discipline labs apply to model behavior policies.",
  },
  adversarial:
    "The ratification failure: blessing the 47 because the CEO wants weight — unenforceable lines are worse than none; they spend the word 'never' on things that will happen, so it's bankrupt when you need it for things that mustn't. The engineering-purist failure: rejecting every line that lacks a perfect detector — some red lines earn partial enforcement plus monitoring, and 'we can only prevent 90% of paths' is a reason for detection layers, not deletion. The quiet miss: red lines without release-time adversarial coverage — a prohibition tested once at ratification drifts exactly like 017's golden set; 'never' has a maintenance schedule.",
  recursiveFollowup:
    "Quarter two: the red-team reports it crossed the 'no autonomous external communication' line in staging — via a tool-chain the gate didn't cover (agent files a ticket; ticketing system emails the customer). Technically external communication, technically autonomous, zero gates touched. The council asks: does this mean more red lines, or what? Answer structurally — and update the machinery.",
  altitude: {
    exec:
      "You asked for 'never' — here are the seven that can actually mean it, each with a gate that prevents it, an alarm if the gate fails, and a red team paid to cross it every release. Watch: here's your earnings email, drafted again, dying at the send gate. The other forty items weren't nevers — they're quality bars, and they're managed where quality lives: in the evals.",
    engineer:
      "Per line: architectural prevention (send-gates with regulated-window awareness, threshold approvals, scope enforcement at the gateway), runtime detection with alerting, and adversarial cases in the release suite — crossing attempts and survivals reported per release. Indirect paths in scope: any tool chain that terminates in an external effect inherits the gate.",
    frontier:
      "Red-line engineering is the safeguards discipline: prohibited action classes enforced in depth — prevention, detection, adversarial verification — with the honest boundary that absolutes govern actions, not quality. The transferable law: a 'never' you can't detect being crossed is a hope, and hopes don't survive postmortems.",
  },
},

);
