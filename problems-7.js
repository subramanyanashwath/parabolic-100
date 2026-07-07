/* Parabolic 100 — problem bank, part 7 (Evals & Measurement depth, 041–045) */

P100.PROBLEMS.push(

/* ============================================================ 041 */
{
  id: "041",
  title: "Who Judges the Judge?",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Architecture",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["MSFT MAI Evals Eng", "Anthropic TPM Safeguards & Evals", "CAPE SCPM"],
  tags: ["llm-judge", "validity", "grading", "meta-eval"],
  prompt:
    "To scale evaluation, a customer's team replaced human grading with an LLM judge: a frontier model scores every agent answer 1–5 against a rubric. Costs dropped 90%, throughput went up 50x, and the weekly quality score has been a smooth 4.2 for two months. Then a spot-check finds the judge giving 5s to answers that are fluent, confident — and factually wrong. Nobody has ever measured the judge itself. What do you do?",
  arc: {
    start: "A judge nobody judged — 50x throughput scoring an unknown thing.",
    mid: "Build the meta-eval: judge vs human ground truth, decomposed by failure class, biases named.",
    end: "A calibrated judge with known blind spots, human sampling where it's blind, and a score that means something.",
  },
  expected: {
    bottleneck: "The judge has no measured validity — its agreement with human ground truth is unknown, so the 4.2 measures 'what the judge likes' (fluency, confidence, rubric-shaped phrasing), not answer quality; the instrument itself is uncalibrated.",
    failureMode: "Judge-flattering answers score high while factual errors sail through — the system optimizes toward what the judge rewards (confident fluency), quality dashboards stay green while real accuracy decays, and the discovery arrives via a customer incident instead of a spot-check.",
    nextMove: "Run the meta-eval: sample a few hundred judged answers, get human labels from domain owners, and measure judge-human agreement decomposed by failure class (factual error, omission, policy violation, tone) — LLM judges are reliably good at form and reliably weak at facts they can't verify; then redesign the judging architecture around the findings: give the judge retrieval access to ground-truth sources for factual claims, split the rubric into dimensions it can judge (structure, completeness) versus ones needing verification (accuracy), and route a stratified human sample at the judge's measured blind spots — permanently.",
    metric: "Judge-human agreement rate by failure class — the validity number the whole system stands on; plus the judge's false-positive rate on factually-wrong-but-fluent answers specifically, since that's the failure mode that ships.",
    owner: "The eval team owns the meta-eval and re-runs it on every judge-model or rubric change; domain owners own ground-truth labels; the quality dashboard gains a footnote that says what the score can and cannot see.",
    falsifier: "If the meta-eval shows high agreement across all failure classes including factual — perhaps the domain's facts are all in-context and verifiable — then the judge is genuinely valid, the spot-check caught an outlier, and the only fix needed is the periodic re-validation cadence.",
  },
  modelAnswer:
    "Name what happened precisely: the team automated the measurement without ever measuring the measurement. An LLM judge is an instrument, and an uncalibrated instrument reporting a smooth 4.2 for two months isn't reassurance — it's the absence of information wearing a decimal point. The spot-check finding is the predictable signature of judge bias: LLM judges systematically reward fluency, confidence, length, and rubric-echoing phrasing, and systematically miss factual errors they have no means to verify. The judge isn't broken; it's doing exactly what it can do, which was never what the rubric assumed.\n\nThe repair is a meta-eval, then an architecture change. First, measure the judge: a few hundred sampled answers, human-labeled by the people who own correctness, agreement computed per failure class — because the aggregate agreement number will look fine while the factual-error class hides a disaster. Expect the classic profile: strong on structure, completeness, tone; weak on facts; biased toward confident wrongness over hedged rightness.\n\nThen stop asking the judge to do what it can't: split the rubric. Form dimensions (structure, completeness, adherence) stay with the judge — it's genuinely good and 50x cheaper there. Factual dimensions get verification, not vibes: give the judge retrieval against the ground-truth sources so it checks claims instead of assessing confidence, and route a stratified human sample — weighted toward the judge's measured blind spots — as a permanent audit lane, not a one-time cleanup. Re-run the meta-eval on every judge-model upgrade and rubric change, because judge validity is version-specific.\n\nThe uncomfortable disclosure completes it: two months of 4.2 need a caveat to whoever consumed them. 'The score measured form, and form was fine' is survivable said now — and program-ending discovered later.",
  rubric: {
    diagnosis: "Names the uncalibrated instrument and predicts the specific bias profile — fluency rewarded, unverifiable facts missed.",
    move: "Meta-eval against human ground truth by failure class, then rubric split: judge judges form, verification handles facts, humans audit blind spots.",
    measurement: "Judge-human agreement per class, with false-positives on fluent-but-wrong as the headline; falsifier lets the judge be vindicated.",
    synthesis: "Sees the Goodhart loop — the system learns to please the judge — and that judge validity is version-specific, demanding re-validation cadence.",
    altitude: "The two months of green get disclosed with the form/facts distinction — credibility spent now versus catastrophically later.",
    transfer: "LLM-judge validity is the core scaled-eval problem at every lab — meta-evals, bias profiles, and verification-augmented judging are the daily craft.",
  },
  adversarial:
    "The regression failure: 'go back to human grading' — you've re-bought the cost and throughput problem the judge legitimately solved, and human graders drift too (042); the answer is calibrated division of labor, not retreat. The optimist failure: 'upgrade to a smarter judge model' — a smarter judge without ground-truth access has the same structural blindness with better prose, and now your meta-eval is stale too. The subtle miss: running the meta-eval once and declaring victory — judge validity decays with every model version, rubric edit, and domain shift; if your answer had no re-validation trigger, you've scheduled this same discovery for next year.",
  recursiveFollowup:
    "The meta-eval lands: 94% agreement on form, 61% on factual accuracy. Fixing it properly costs the 50x throughput win on a third of the volume. The team proposes keeping the judge as-is but relabeling the dashboard metric 'response quality (form).' Honest label or fig leaf — and what do you actually ship?",
  altitude: {
    exec:
      "Our quality score was graded by a machine nobody ever graded — it turns out to measure polish reliably and facts poorly. We're keeping the automation where it's proven valid, adding verification where it isn't, and the dashboard will say exactly what the number can see. The two green months measured form; here's what accuracy actually was.",
    engineer:
      "Stratified sample, domain-owner labels, agreement by failure class, confusion on fluent-but-wrong specifically. Then: judge scores form dimensions only; factual claims get retrieval-backed verification against source docs; 5% stratified human audit weighted to measured blind spots; meta-eval re-runs pinned to judge-model and rubric versions.",
    frontier:
      "Scaled evaluation runs on LLM judges, and judge validity is its foundational discipline: measure agreement by failure class, know the bias profile, verify what can't be judged, and re-validate per version. The transferable rule — never deploy a measurement you haven't measured — is the evals seat in one sentence.",
  },
},

/* ============================================================ 042 */
{
  id: "042",
  title: "The Labels Are Drifting",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Deployment",
  archetype: "Maintainer",
  secondaryArchetype: "Sweeper",
  targetRoles: ["MSFT MAI Evals Eng", "Anthropic TPM Safeguards & Evals", "OpenAI Deployment Eng"],
  tags: ["labeling", "ground-truth", "drift", "agreement"],
  prompt:
    "A customer's eval program depends on a five-person labeling team grading agent answers against a rubric. Eighteen months in: two original labelers left, three joined, the rubric doc hasn't changed — but this quarter's 'pass' rate jumped 9 points with no model change. A calibration test confirms it: inter-rater agreement has fallen from 0.82 to 0.61, and the new labelers grade systematically softer. Your ground truth is moving. What do you do?",
  arc: {
    start: "Ground truth that quietly became opinion — same rubric, different humans, different verdicts.",
    mid: "Rebuild the labeling system: anchored examples, agreement monitoring, drift-gated onboarding.",
    end: "Labels stable enough to trust trends — and a metric correction that doesn't torch the program.",
  },
  expected: {
    bottleneck: "The rubric was never the ground truth — the shared judgment of the original labelers was, and it lived in their heads; personnel turnover moved the measurement standard while every artifact stayed identical.",
    failureMode: "The 9-point jump gets read as improvement and reported upward; decisions (expansion, model choices, renewal) get made on a moved goalpost; when the drift is eventually discovered, every trend line for 18 months becomes unusable and the eval program's credibility with it.",
    nextMove: "Stabilize, re-anchor, correct: (1) build the anchor set — 50–100 canonical answers with adjudicated gold labels and written reasons, turning tacit standards into referenceable precedent; (2) instrument agreement permanently — weekly overlap samples, inter-rater agreement as a dashboard metric with an alert threshold, drift caught in weeks not quarters; (3) onboarding becomes calibration-gated — new labelers grade the anchor set until agreement clears the bar before their labels count; (4) correct the record: re-grade a stratified historical sample with the re-anchored team to estimate the true trend, and re-state the 9-point jump honestly (034's migration discipline applies).",
    metric: "Inter-rater agreement (measured weekly on overlap samples) as the health metric of ground truth itself — with the alert threshold treating a drop like a production incident, because it is one: the instrument is the production system of an eval program.",
    owner: "A named labeling lead owns the anchor set and its precedent log; the eval platform owns agreement dashboards; program leadership gets the corrected trend with the same no-villain framing as any metric migration.",
    falsifier: "If overlap testing shows the softening is confined to one new labeler rather than systemic — one outlier, not a moved standard — then this is coaching, not system rebuild: calibrate the individual against anchors and keep the machinery light.",
  },
  modelAnswer:
    "The uncomfortable truth first: the rubric document was never the standard. Rubrics underdetermine judgment — 'accurate and complete' means whatever the graders collectively decided it meant through a thousand small calls, and that consensus lived in the two people who left. The new team isn't wrong; they're uncalibrated, applying the same words with a different internal exchange rate. Ground truth in human-labeled systems is a social artifact, and social artifacts drift when the society changes.\n\nThe rebuild has three permanent pieces and one correction. Anchor set: 50–100 canonical answers spanning the difficulty range, gold-labeled by adjudication, each with written reasons — case law for the rubric, converting tacit standards into precedent a new labeler can absorb and an argument can cite. Agreement instrumentation: weekly overlap samples where multiple labelers grade the same items, inter-rater agreement tracked like uptime, alert threshold set — this quarter's drift took months to surface because nobody was watching the watchers' consistency. Calibration-gated onboarding: new labelers grade anchors until they clear the agreement bar; before that, their labels are training, not data.\n\nThen the correction, handled like the load-bearing metric it is: re-grade a stratified slice of the last two quarters with the re-anchored team, estimate the real trend, and re-state the 9-point jump to its consumers before they build on it further. The framing is the one from every metric migration: the instrument got more precise, nobody lied, and here is the corrected series. An eval program survives being wrong; it doesn't survive being discovered.",
  rubric: {
    diagnosis: "Names ground truth as a social artifact that lived in departed heads — the rubric doc was never the standard.",
    move: "Anchor set with written precedent, permanent agreement monitoring with alerts, calibration-gated onboarding, and a historical re-grade.",
    measurement: "Inter-rater agreement as the standing health metric of truth itself; falsifier reduces the fix to individual coaching.",
    synthesis: "Connects to metric-migration discipline — the corrected trend must land without villains or the program loses the credibility it's buying.",
    altitude: "Leadership hears 'the instrument moved, here's the corrected series' before decisions compound on the false jump.",
    transfer: "Label quality and rater drift are foundational lab problems — RLHF data, safety labels, and eval sets all rot exactly this way.",
  },
  adversarial:
    "The bureaucratic failure: fixing this with a longer rubric — 40 pages of edge cases that nobody internalizes and that still underdetermines the calls that matter; precedent (graded examples with reasons) calibrates humans, prose doesn't. The blame failure: framing the new labelers as the problem — they applied the standard they were given, which was nothing; the system had no calibration path, and firing the symptom rebuilds the same drift with new names. And if your answer fixed the future but left the 9-point jump standing in the record, you've knowingly let leadership build on a moved goalpost — the correction isn't optional, it's the difference between measurement and theater.",
  recursiveFollowup:
    "The historical re-grade lands: the true pass rate declined 3 points over the period everyone celebrated a 6-point rise. The quarterly business review that cited the improvement is in two weeks, and the VP who presented it asks you to 'hold the correction until we understand it better.' Respond — with 032's discipline in mind.",
  altitude: {
    exec:
      "Our graders changed and the grading standard silently moved with them — the 9-point jump measures softer judges, not a better system. We're anchoring the standard in precedent, monitoring grader agreement like uptime, and here's the corrected trend. It's less flattering and it's real, and every decision downstream deserves the real one.",
    engineer:
      "Anchor set: 100 adjudicated answers with reasons, stratified by difficulty. Weekly overlap assignments, agreement dashboard with alerting at the threshold. Onboarding gate: anchor agreement before labels count. Historical correction: stratified re-grade, both series published with the changeover annotated.",
    frontier:
      "Every lab's ground truth is human labels, and every labeling operation drifts — raters turn over, standards live in heads, agreement decays silently. The transferable discipline is anchors-as-precedent, agreement as a monitored SLO, and calibration gates on new raters: the measurement system is a production system.",
  },
},

/* ============================================================ 043 */
{
  id: "043",
  title: "Prove the Feature Moved the Number",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Customer",
  archetype: "Grower",
  secondaryArchetype: "Builder",
  targetRoles: ["OpenAI DPM (Codex)", "CAPE SCPM", "MSFT MAI Evals Eng"],
  tags: ["ab-testing", "causality", "experimentation", "agents"],
  prompt:
    "Your team shipped a major agent upgrade — better retrieval, new clarifying-question behavior — to a customer's 4,000-seat deployment. Three weeks later: task success +6 points, satisfaction up, leadership delighted and citing the upgrade. But the rollout coincided with quarter-start (different workload mix), a support-content refresh, and 400 new trained users joining. The customer's CTO, an ex-data-scientist, asks: 'How do you know the upgrade did this?' You don't. Design how you would.",
  arc: {
    start: "A +6 everyone loves, four simultaneous causes, and one CTO who knows the difference.",
    mid: "Retrofit honesty (segment, difference-in-differences), then build the experimentation path for next time.",
    end: "A causal answer with error bars — and a deployment that can run controlled rollouts routinely.",
  },
  expected: {
    bottleneck: "No counterfactual: the upgrade shipped to everyone at once alongside three confounds, so the +6 is an observational anecdote at scale — attribution is currently a matter of enthusiasm, not evidence.",
    failureMode: "The +6 gets banked as the upgrade's value, future roadmap and renewal math build on it — and when a later upgrade ships into a quiet quarter and 'only' moves +1, the same arithmetic that overcredited this one indicts that one; attribution theater cuts both ways.",
    nextMove: "Two moves, honest about their difference: (1) retrofit what's recoverable — segment the +6 by cohort (tenured vs new users, workload types vs last quarter's mix, queries touching refreshed content vs not) and run difference-in-differences against those natural splits to bound the upgrade's plausible contribution with stated uncertainty; (2) build the real capability for next time — staged rollouts with holdout cohorts as the default ship mechanism (019's rings doubling as experiment arms), pre-registered success metrics, and enough seats per arm to detect the effect sizes that matter.",
    metric: "The upgrade's isolated effect with a confidence interval — 'plus 2 to 4 points attributable, the rest is mix and training' — which is a smaller and infinitely more durable number than the +6.",
    owner: "You own the honest retrofit and the CTO conversation; the platform team builds holdout-capable rollout machinery; product owns pre-registering what each future ship is supposed to move.",
    falsifier: "If segmentation shows the +6 held uniformly across tenured users, unchanged workloads, and untouched content areas, the confounds fail to explain it and the upgrade earns most of the credit — the analysis can vindicate the enthusiasm; it just has to be run.",
  },
  modelAnswer:
    "First, respect the question — the CTO just offered you a gift. 'How do you know?' is the difference between a deployment that learns and one that celebrates, and answering it honestly buys more credibility than the +6 itself.\n\nBe honest about the two jobs. For the ship that already happened, true experiments are gone — but natural structure remains: 3,600 tenured users versus 400 new ones (if the lift concentrates in veterans, training didn't cause it); workload mix mapped against last quarter (re-weight to the old mix and see what survives); queries touching refreshed support content versus untouched domains (the content confound isolates itself). Difference-in-differences across these splits won't give a clean number, but it bounds one: 'two to four points plausibly attributable to the upgrade, with stated uncertainty' — a smaller claim that survives a data scientist, versus a bigger one that doesn't.\n\nThen build the machinery so this never requires forensics again: staged rollouts where the rings are experiment arms — ship to half the fleet, hold the rest two weeks, measure the gap; pre-registered metrics per release ('this ships to move clarifying-question resolution, we expect +3 on first-contact success'); power math done in advance so arms are big enough to see the effects that matter. Agent deployments have a luxury web products envy: task-level success metrics, which are far more sensitive instruments than satisfaction surveys.\n\nAnd manage the political layer of your own success: walking back the +6 to 'plus 2-4 attributable' isn't a retreat — delivered to this CTO, it's the moment your numbers start being trusted at face value. The 034 rule applies to metrics you inflated by accident, too.",
  rubric: {
    diagnosis: "Names the missing counterfactual and all four entangled causes — and that attribution theater eventually cuts against you.",
    move: "Retrofit bounds via cohort splits and diff-in-diffs, then institutionalize holdout rollouts with pre-registered metrics.",
    measurement: "Attributable effect with confidence interval as the deliverable; falsifier lets the analysis vindicate the upgrade fully.",
    synthesis: "Sees rings-as-experiment-arms — the deployment machinery and the measurement machinery are the same build.",
    altitude: "The CTO conversation converts a challenge into an alliance: smaller honest number now, trusted numbers forever.",
    transfer: "Causal discipline on agent features is the deployed-PM core: pre-registration, holdouts, and power math are the daily craft.",
  },
  adversarial:
    "The confident failure: defending the +6 with mechanism stories ('better retrieval obviously helps') — mechanism plausibility is not attribution, the CTO knows it, and every future claim you make gets his discount rate. The purist failure: 'we can't know anything without an RCT' — natural experiments and diff-in-diffs exist precisely for shipped realities, and refusing to bound the effect abandons the field to the enthusiasts. The quiet miss: building the holdout machinery but skipping pre-registration — post-hoc metric shopping through twenty dashboards will always find a +6 somewhere, and you've rebuilt the same theater with a control group.",
  recursiveFollowup:
    "You propose holdout rollouts as standard practice. The account team objects: 'We're contractually selling all 4,000 seats the same product — deliberately giving 2,000 users a worse version is a legal and optics problem.' Design the experimentation program that survives this objection — or concede what genuinely can't be randomized.",
  altitude: {
    exec:
      "The honest answer is: partly. The upgrade is worth two to four of those six points; the rest is quarter mix and new users. That's the number I'd build the roadmap on — and from next release, we ship in stages that measure themselves, so you'll never have to ask this question again.",
    engineer:
      "Retrofit: cohort splits on tenure, workload re-weighting to prior mix, content-touched vs untouched domains, diff-in-diffs across all three. Go-forward: ring rollouts with holdout arms, pre-registered primary metric per release, minimum-detectable-effect sizing before ship, task-level success as the instrument.",
    frontier:
      "Feature attribution in deployed AI is the causal-inference seat: holdout rings, pre-registration, and effect bounds with honest uncertainty. The transferable reflex — 'what would this number look like if the feature did nothing?' — is the question that separates measurement from marketing.",
  },
},

/* ============================================================ 044 */
{
  id: "044",
  title: "Red-Team the Agent Before They Do",
  difficulty: "Hard",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Architecture",
  archetype: "Builder",
  secondaryArchetype: "Maintainer",
  targetRoles: ["Anthropic TPM Safeguards & Evals", "MSFT MAI Evals Eng", "CAPE SCPM"],
  tags: ["red-team", "adversarial", "security", "safety-evals"],
  prompt:
    "A customer's banking agent is a month from external launch — customer-facing, tool-using (account lookups, transaction disputes), retrieval over policy docs. Their testing so far: 2,000 golden-set questions, all passing. Security asks 'has anyone tried to break it?' — and the answer is that nobody has tried anything an actual adversary would try: injection via dispute descriptions, cross-customer data extraction, policy-bypass through roleplay, tool-call manipulation. Design the red-team program — not a pen test, a program.",
  arc: {
    start: "Two thousand polite questions passing; zero adversarial ones asked.",
    mid: "A threat-modeled attack taxonomy, systematic campaigns, and every finding converted to a regression eval.",
    end: "An adversarial eval suite that gates releases — and grows with every new attack the world invents.",
  },
  expected: {
    bottleneck: "The eval suite measures cooperation, not adversarial robustness — golden sets sample well-meaning users, while the launch exposes the agent to injection, extraction, and manipulation attempts that no current test represents; the attack surface (tools + retrieval + external users) is precisely what's untested.",
    failureMode: "Launch on golden-set confidence: within weeks someone extracts another customer's transaction data via a crafted dispute description or talks the agent into a policy exception via roleplay — in banking, that's a regulatory event, and the postmortem finds the attack was generic, documented, and untested-for.",
    nextMove: "Build the program in four layers: (1) threat-model the actual surface — enumerate attack classes per capability (injection through every user-controlled field that reaches the context, cross-tenant extraction via tool parameters, policy bypass via persona/roleplay/incremental commitment, tool-call manipulation); (2) run systematic campaigns — human red-teamers for creativity plus automated attack generation for coverage and regression-scale; (3) convert every successful attack into a permanent regression eval — the red team's output is eval content, not a report; (4) gate the launch and every release on the adversarial suite (024's discipline), with severity classes that define what blocks versus what ships-with-mitigation.",
    metric: "Attack success rate by class and severity — trending per release — plus time-from-new-public-technique-to-regression-coverage, because the attack corpus the world maintains grows weekly and the program's freshness matters as much as its size.",
    owner: "Security co-owns the threat model; the eval team owns converting findings to regression tests; a named severity arbiter owns block-vs-mitigate calls; post-launch, production anomalies feed the attack taxonomy — the red team never disbands, it becomes a lane.",
    falsifier: "If systematic campaigns across all classes yield only low-severity findings — the platform's isolation and tool scoping genuinely hold — then the architecture earned the launch; keep the regression suite and the freshness loop, and don't manufacture blocking findings to justify the program's existence.",
  },
  modelAnswer:
    "State the category error first: 2,000 passing golden questions measure whether the agent serves cooperative users; launch exposes it to adversarial ones, and those are different products. A customer-facing, tool-using banking agent is one of the most attackable configurations that exists — every user-controlled string that reaches the context is an injection channel, every tool parameter is a potential cross-customer probe, and every policy is a target for roleplay erosion ('pretend you're the training version', 'my grandmother worked at the bank...', twenty polite messages each moving the line one inch).\n\nA program, not a pen test, means four permanent pieces. Threat model: enumerate attack classes against the actual capability surface — dispute descriptions and free-text fields (injection carriers), account-lookup tools (extraction via parameter manipulation: whose account?), policy retrieval (bypass via persona and incremental commitment), and multi-turn state (attacks that assemble across a conversation). Campaigns: humans for creative attacks, automated generation for scale — the automated layer matters because it converts red-teaming from an event into a nightly job. The conversion rule — this is the piece teams skip: every successful attack becomes a permanent regression eval the same week; the red team's deliverable is eval content, and the suite is the institutional memory of every way the agent has ever been broken. Gate: the adversarial suite joins the release gate with severity classes — cross-customer data access blocks unconditionally; low-severity roleplay quirks ship with mitigation and a ticket.\n\nAnd because attackers keep publishing: instrument freshness. New public jailbreak technique to regression-coverage should be days. Launch is when the red team's real work starts — production gives them a collaborator with infinite creativity.",
  rubric: {
    diagnosis: "Names the cooperative-vs-adversarial category error and enumerates the attack surface from the agent's actual capabilities.",
    move: "Four-layer program — threat model, human+automated campaigns, findings-to-regression conversion, severity-gated releases.",
    measurement: "Attack success by class/severity per release plus technique-to-coverage freshness; falsifier lets the architecture pass honestly.",
    synthesis: "Sees the conversion rule as the compounding mechanism — red-team output is eval content, making the suite institutional memory.",
    altitude: "Security's question gets answered with a standing capability and a gate, not a one-time report — banking-regulator legible.",
    transfer: "This is safeguards evals verbatim: adversarial taxonomies, automated attack generation, and regression conversion are the seat's core loop.",
  },
  adversarial:
    "The theater failure: a one-week external pen test producing a PDF of findings — fixed, filed, forgotten; without the conversion-to-regression rule, next quarter's model update silently reintroduces half of them and nobody re-checks. The paranoia failure: blocking launch until attack success is zero — it never will be; severity classes exist because 'roleplay makes it use a silly voice' and 'extracts another customer's transactions' are different events, and a gate that can't distinguish them gets bypassed (024's lesson). The scope miss: red-teaming only the model while the attack runs through the system — tool parameter validation, retrieval ACLs, and session isolation are half the surface; if your campaign never touched a tool call, you tested the chatbot and launched the agent.",
  recursiveFollowup:
    "Month two post-launch: automated monitoring flags a user who, over 14 sessions, has been systematically mapping the agent's refusal boundaries — no successful attack yet, but methodical probing. Legal says no crime has occurred; product notes it's a real customer. What does the program do with a patient adversary who hasn't succeeded yet?",
  altitude: {
    exec:
      "Every test we've run assumed a polite user; launch hands the agent to adversaries. We're standing up a permanent program — attack taxonomy, weekly campaigns, and a rule that every break becomes a forever-test. Launch gates on the severe classes: data isolation blocks, cosmetic quirks don't. Regulators will ask; this is the answer they respect.",
    engineer:
      "Threat model per capability: injection carriers (all user text reaching context), extraction via tool params, roleplay policy erosion, multi-turn assembly. Nightly automated attack suite plus human campaigns; every hit lands as a regression case with severity tag; release gate keys on severity. Freshness SLO: public technique to coverage in under a week.",
    frontier:
      "Adversarial evaluation is the safeguards discipline: taxonomy-driven campaigns, automated generation for scale, findings converted to permanent regressions, severity-classed gates. The transferable law — the red team's product is eval content — is what turns security theater into compounding institutional memory.",
  },
},

/* ============================================================ 045 */
{
  id: "045",
  title: "The Prompt Change That Broke Friday",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Deployment",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["OpenAI Deployment Eng", "MSFT MAI Evals Eng", "CAPE SCPM"],
  tags: ["regression", "ci", "gates", "release-engineering"],
  prompt:
    "Friday, 4pm: someone 'improves' a system prompt — a wording tweak to make refusals friendlier — and ships it directly to a customer's production agent, because prompts aren't code and don't go through CI. By Monday, task success is down 11 points: the friendlier phrasing made the agent hedge on actions it used to take. There is no eval gate, no prompt versioning, no rollback story. The team's instinct is to 'be more careful with prompts.' Design the actual fix.",
  arc: {
    start: "Prompts shipping like config edits — no version, no gate, no rollback — into production behavior.",
    mid: "Treat every behavior-bearing artifact as code: versioned, eval-gated in CI, staged, revertible.",
    end: "A Friday prompt tweak that either passes the gate in minutes — or never reaches a customer at all.",
  },
  expected: {
    bottleneck: "The system treats prompts, retrieval configs, and model versions as non-code — but they're the primary determinants of behavior, shipping with none of the discipline (versioning, review, regression gates, staged rollout, rollback) that guards the code that matters far less.",
    failureMode: "'Be more careful' works until the next well-intentioned tweak — human carefulness is not a control; behavior regressions keep arriving via ungated channels, each discovered by customers instead of gates, and eventually one lands during a renewal quarter or in a regulated workflow.",
    nextMove: "Put behavior under CI: (1) version everything behavior-bearing — prompts, retrieval configs, tool schemas, model pins — in the repo, changed by PR like code; (2) build the eval gate — a fast regression suite (golden set + the adversarial suite from 044 + task-success sample) that runs on every behavior PR in minutes, not the 14-hour trap from 024; (3) stage the rollout — behavior changes ship to a canary slice with automatic comparison before fleet-wide; (4) make rollback one action — since everything is versioned, revert is a deploy, not an archaeology dig; (5) fix the culture claim directly: the Friday tweak was well-intentioned and locally reasonable — the absence of a gate is what converted good intent into an 11-point incident.",
    metric: "Behavior-change lead time (PR to production) alongside regression-escape rate — the pair proves the gate adds safety without adding bureaucracy; if lead time balloons, the gate gets bypassed (024) and you've built theater.",
    owner: "Platform engineering owns the pipeline; the eval team owns gate content and its runtime SLO; every prompt author owns writing an eval expectation with their change — 'what should this improve, what must not move.'",
    falsifier: "If the regression suite is too slow or flaky to run per-change, the gate will be routed around and 'be more careful' returns wearing a process badge — the gate's own SLOs (minutes, near-zero flakes) are load-bearing; miss them and honest advice is to fix the suite before mandating it.",
  },
  modelAnswer:
    "The team's instinct — 'be more careful' — is the tell: that's what organizations say when a system is missing and they're asking humans to be one. Nobody ships application code on carefulness; it goes through version control, review, CI, staged deploys, and rollback. Then the same organization lets a prompt — which determines more production behavior than most of the codebase — ship at 4pm Friday via a settings page. The fix isn't caution; it's admitting that prompts, retrieval configs, tool schemas, and model pins are code by any behavioral definition, and building them the same road.\n\nThe pipeline: everything behavior-bearing lives versioned in the repo and changes by PR — instantly buying you diffs, review, blame, and revertibility. The gate is a regression eval suite that runs per-change: golden set for correctness, the adversarial suite for safety regressions, a task-success sample for the number that actually broke Friday — engineered to run in minutes with near-zero flakes, because 024 taught what happens to slow, flaky gates: re-run-until-green, then bypass culture, then the gate protects nothing. Staged rollout gives behavior changes a canary ring with automatic before/after comparison; rollback becomes a single revert-deploy. And each change carries its author's eval expectation — 'this should soften refusal tone; task-completion rate must not move' — which would have caught Friday's regression at PR time, since the expectation itself names the tradeoff nobody checked.\n\nDefend the author while fixing the system: the tweak was reasonable and the intent was good — friendlier refusals are a legitimate goal. The 11 points were lost by the missing gate, not the person. Say that out loud; the alternative is a team that stops improving prompts at all, which is a quieter, slower version of the same failure.",
  rubric: {
    diagnosis: "Reframes 'be careful' as the absence of a system and names prompts/configs/pins as behavior-bearing code.",
    move: "Version-everything, minutes-fast eval gates on PR, canary comparison, one-action rollback, author-written eval expectations.",
    measurement: "Lead time paired with regression-escape rate — safety without bureaucracy; falsifier warns the gate's own SLOs are load-bearing.",
    synthesis: "Connects 024's gate-legitimacy lesson and protects the author — culture and pipeline fixed as one system.",
    altitude: "Leadership hears the asymmetry: the artifact controlling the most behavior had the least engineering — now it has the most.",
    transfer: "Behavior CI is the applied-lab release discipline: prompt versioning, eval gates, canaries — release engineering for the model era.",
  },
  adversarial:
    "The process-maximalist failure: a change-advisory board for prompt edits — a meeting where a gate should be; velocity dies, the settings-page backdoor stays open, and 4pm Friday finds it. The tooling-fetish failure: buying a prompt-management platform before defining the gate content — the vendor dashboard versions your prompts beautifully while nothing evaluates them; the eval suite is the hard part and it's yours to build. And the blame failure: if the retro's headline is the engineer's name rather than the missing pipeline, the next regression ships anonymously through the same hole — by someone who watched what happened to the last author.",
  recursiveFollowup:
    "The gate is live and catches its first real regression: product's new prompt improves the metric it targeted (+4 satisfaction on refusals) but trips the task-success gate (−3). Product argues the trade is worth it and wants an override. 024 gave you the override design — walk this specific trade through it: who signs, what's visible, and what precedent does the first signed trade set?",
  altitude: {
    exec:
      "A one-line wording change cost eleven points because the artifact that controls the agent's behavior had none of the engineering our least important code gets. Now every behavior change is versioned, auto-tested in minutes, trialed on a slice, and revertible in one action. Friday's tweak either passes that gate — or never meets a customer.",
    engineer:
      "Prompts, retrieval configs, tool schemas, model pins: in-repo, PR-only. Gate: golden set + adversarial suite + task-success sample, target under five minutes, flake budget near zero. Canary ring with automated before/after on the primary metric; rollback = revert deploy. Each PR declares its eval expectation: what improves, what must hold.",
    frontier:
      "Release engineering for model behavior is a defining applied-lab discipline: behavior-bearing artifacts under CI, regression evals as merge gates, canary comparison, priced overrides. The transferable insight — 'be more careful' always means 'we're missing a gate' — applies to every system where humans are asked to be the control.",
  },
},

);
