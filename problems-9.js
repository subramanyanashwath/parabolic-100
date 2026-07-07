/* Parabolic 100 — problem bank, part 9 (Scenario Discovery depth, 051–055) */

P100.PROBLEMS.push(

/* ============================================================ 051 */
{
  id: "051",
  title: "The CEO Wants an AI Strategy",
  difficulty: "Medium",
  category: "Scenario Discovery",
  primaryLens: "Altitude",
  secondaryLens: "Customer",
  archetype: "Grower",
  secondaryArchetype: "Prototyper",
  targetRoles: ["CAPE SCPM", "MSFT MAI Strategy & Ops", "OpenAI FDE"],
  tags: ["exec-discovery", "strategy", "sponsorship", "framing"],
  prompt:
    "Forty-five minutes with a $6B distributor's CEO, arranged by your account exec with one brief: 'He wants to talk AI strategy.' The CEO has read the headlines, his board has asked twice, two competitors have announced AI initiatives, and his CIO's last attempt at this meeting was a 60-slide platform deck he stopped on slide 4. You are not going to survey his workflows in 45 minutes. What is this meeting actually for, and how do you run it?",
  arc: {
    start: "Forty-five minutes, a board-pressured CEO, and a dead deck as the cautionary tale.",
    mid: "Discover at his altitude: the business's economics and fears, not workflows — and leave with one owned commitment.",
    end: "A CEO who said concrete things he'll stand behind, and a mandate that survives the meeting.",
  },
  expected: {
    bottleneck: "Altitude mismatch is the standing failure: discovery methods built for workflow owners (map tasks, find baselines) don't fit a CEO, whose real questions are competitive position, board narrative, and where his P&L is exposed — the CIO's deck died because it answered a question the CEO wasn't asking.",
    failureMode: "Treat it as a big workflow-discovery session or a platform pitch: the CEO disengages politely, the account gets remembered as 'we did the AI meeting,' and the mandate that only a CEO can grant — priority, air cover, a named owner — never gets issued.",
    nextMove: "Run it as executive discovery with a three-question spine: where does the business make and lose money in ways that frustrate him (his language, his P&L); what has he already seen that impressed or worried him (calibrates the board pressure and the competitor envy); and what would he want true in 18 months that isn't true now. Bring exactly one proof-shaped artifact — a 5-minute concrete example from his industry, not a deck — and close on one commitment: a named executive owner and a 30-day working session with that owner's team. The CEO's job in the AI program is to issue the mandate; the meeting succeeds if he issues it.",
    metric: "The commitment, not the vibe: did the meeting end with a named owner and a dated next step the CEO himself stated? Everything else — enthusiasm, follow-up decks requested — is applause (007's lesson at the top of the house).",
    owner: "The CEO owns the mandate and the naming; you own the three questions and the discipline to not pitch; the account exec owns scheduling the 30-day session before the meeting's warmth decays.",
    falsifier: "If his answers reveal a genuine, specific initiative already underway — a real owner, real budget, stalled on something concrete — then discovery is over and the meeting becomes an unblocking session; forcing the strategy conversation past that point wastes the rarest access you'll get.",
  },
  modelAnswer:
    "Name what a CEO meeting is for: not discovery of workflows — discovery of the mandate. A CEO cannot tell you which claims process to automate, and asking him wastes his one superpower: he can name what the business fears, where the margin lives, and who owns what happens next. The CIO's deck died because it was supply-shaped — 'here's what the platform does' — into a demand-shaped room: 'here's what my board is asking.'\n\nRun three questions and shut up between them. First: 'Where does the business make or lose money in ways that frustrate you?' — his P&L in his words; somewhere in the answer is every scenario the program will ever need, expressed at the altitude that funds it. Second: 'What have you seen — from competitors, your board, anywhere — that impressed or worried you?' — this surfaces the real brief behind 'AI strategy,' which is usually competitive anxiety plus board optics (053's envy dynamic, one level up), and lets you calibrate against what the announcements actually were versus what they appeared to be. Third: 'Eighteen months out, what do you want true that isn't?' — the sentence that becomes the program's north star, in words he'll recognize as his own when it's quoted back at the QBR.\n\nBring one artifact: a five-minute, concrete, his-industry example — a distributor using agents on order exceptions, with a number attached. Not a deck; a proof that specificity exists. Then close on the only deliverable that matters: 'Who should own this? Can we have thirty days and a working session with their team?' A CEO's currencies are priority and names. If you leave with a name and a date in his voice, the meeting worked; if you leave with 'great conversation, send materials,' it didn't — and knowing the difference in the room is the skill this rep trains.",
  rubric: {
    diagnosis: "Names the altitude mismatch and redefines the meeting's product as mandate, not workflow discovery.",
    move: "Three-question spine at his altitude, one concrete industry artifact, hard close on a named owner and dated session.",
    measurement: "The commitment-in-his-voice test separates mandate from applause; falsifier pivots to unblocking when a real initiative exists.",
    synthesis: "Reads 'AI strategy' as board pressure plus competitor anxiety and works that demand instead of pitching supply.",
    altitude: "The entire rep is the altitude skill — the same discovery discipline as 002, re-instrumented for a CEO's currencies.",
    transfer: "Executive discovery is the FDE/strategy-seat entry skill: labs win enterprise programs in exactly these 45-minute rooms.",
  },
  adversarial:
    "The vendor failure: pitching — any variant of 'let me show you our platform' converts the rarest meeting in the account into the CIO's slide 4. The false-humility failure: pure listening with no artifact and no close — CEOs calibrate on specificity; leaving without asking for the owner wastes the mandate that only this room can grant. And the transcription failure: treating his three answers as the scenario list — CEO language needs the 30-day working session to become buildable scenarios; skipping that step builds 002's theater with executive sponsorship attached.",
  recursiveFollowup:
    "He engages — then ends with: 'Our CIO tried this and it went nowhere. Why would you succeed where my own team failed?' The CIO's staff will read the meeting notes. Answer honestly, win the mandate, and leave the CIO politically alive — in three sentences.",
  altitude: {
    exec:
      "To the CEO: 'You don't need an AI strategy deck — you need one part of the business measurably better in a quarter, owned by someone you trust. Tell me where the money frustrates you, and give me thirty days with that team; the strategy document writes itself from the first thing that works.'",
    engineer:
      "Pre-brief the account team: no platform slides in the room. Prep one industry-specific proof with a real number, the three-question spine, and a follow-up plan that books the working session within a week — mandate decays fast, and the 30-day session is where scenarios actually get discovered.",
    frontier:
      "Executive discovery is demand-shaped: P&L anxieties, competitive pressure, and mandate issuance — not capability tours. The transferable close — a named owner and a dated session, in the executive's own voice — is how lab enterprise teams convert access into programs instead of applause.",
  },
},

/* ============================================================ 052 */
{
  id: "052",
  title: "Our Data Isn't Ready",
  difficulty: "Easy",
  category: "Scenario Discovery",
  primaryLens: "Customer",
  secondaryLens: "Architecture",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "OpenAI Deployment Eng"],
  tags: ["data-readiness", "objections", "sequencing", "stalls"],
  prompt:
    "A retail customer's CDO has paused the agent program indefinitely: 'Our data isn't ready. We need to finish the data lake migration and governance cleanup first — probably 18 months.' The statement is half true: their data estate is genuinely messy. It's also the third consecutive year this argument has deferred every AI initiative, and the migration's end date has moved twice. The business sponsors are deflating. What do you do?",
  arc: {
    start: "A true statement — messy data — doing untrue work: pausing everything, indefinitely.",
    mid: "Reclassify: readiness is per-scenario, not global; find the scenarios whose data is ready today.",
    end: "Two shipped scenarios on clean-enough data, and an agent program that funds the cleanup instead of waiting for it.",
  },
  expected: {
    bottleneck: "A global answer to a per-scenario question: 'the data' isn't one thing — every scenario needs a specific slice at a specific quality, and treating readiness as an estate-wide gate makes the messiest table in the warehouse veto the cleanest workflow in the company.",
    failureMode: "The pause holds: 18 months becomes 30 (data programs' end dates always recede), competitors bank two years of deployment learning, the deflated sponsors reassign their budgets — and when the lake is finally 'ready,' there's no program left to use it and no evidence it was ever the blocker.",
    nextMove: "Reframe readiness as a per-scenario audit, run jointly with the CDO's team: for each candidate scenario, name the actual data slice required, its current quality, and the gap — then ship the two or three scenarios whose slices are ready now (there are always some: product catalogs, policy docs, order status), and route the agent program's demand signal into the migration's priority queue so the cleanup sequences around proven value instead of abstract completeness. The CDO becomes the enabler with a scoreboard, not the gate.",
    metric: "Scenarios shippable on current data — the number the global 'not ready' claim never computed; per shipped scenario, quality-caused failure rate, which tests whether 'ready enough' actually was.",
    owner: "The CDO co-owns the audit (their expertise, redirected from veto to triage); business sponsors own the first scenarios; the migration program inherits a demand-ranked backlog from agent needs.",
    falsifier: "If the joint audit honestly shows every candidate scenario blocked on the same broken foundation — identity resolution so bad no customer-facing answer is safe — then the CDO was right, the program's first deliverable is scoped remediation of that one foundation, and you should say so as plainly as you'd have said the opposite.",
  },
  modelAnswer:
    "Grant the premise; attack the quantifier. The data estate is messy — and 'the data isn't ready' is a sentence about an estate, while agents ship against slices. The product catalog that customer service quotes all day, the policy documents HR already trusts, the order-status table that runs the business — some slices are clean today because the business already depends on them. A global readiness gate lets the worst table veto the best workflow, which is exactly how a true observation becomes a three-year stall.\n\nSo convert the veto into an audit, and make the CDO its author, not its target. Together, per candidate scenario: which specific data does it touch, what quality does the workflow actually require (a catalog agent tolerates imperfect descriptions; a compliance agent doesn't), and what's the measured gap. Expect the classic result: a third of scenarios ready now, a third needing scoped fixes measured in weeks, a third genuinely gated on the migration. Ship the first third immediately — visible value inside a quarter, sponsors re-inflated, and quality-failure telemetry that tests 'ready enough' with data instead of debate.\n\nThen the reframe that wins the CDO permanently: the agent program is the best thing that ever happened to the migration. Eighteen-month data programs die of abstraction — cleanup justified by 'quality' loses to every quarterly priority. An agent program generates a ranked demand signal: these tables, this quality bar, because this workflow ships when they're fixed. The migration stops competing with AI for budget and starts being funded by its results. The CDO trades a veto nobody thanks them for, for a scoreboard everybody sees.",
  rubric: {
    diagnosis: "Splits estate-level readiness from scenario-level readiness — the quantifier error that turns truth into a stall.",
    move: "Joint per-scenario audit with the CDO as author; ship the ready third now; route agent demand into the migration's priority queue.",
    measurement: "Scenarios-shippable-now plus quality-caused failure telemetry; falsifier lets the audit vindicate the CDO fully.",
    synthesis: "Sees the political trade — veto for scoreboard — and that the agent program rescues the migration's fundability, not the reverse.",
    altitude: "Sponsors hear a quarter, not eighteen months; the CDO hears partnership, not bypass.",
    transfer: "The data-readiness stall is the most common enterprise AI blocker; per-slice audits and demand-ranked cleanup are the standing FDE counter.",
  },
  adversarial:
    "The bulldozer failure: treating the CDO as an obstacle and rallying sponsors to override — you may win the quarter and you've made an enemy of the person whose team controls every pipeline you'll ever need; the audit-as-partnership exists because the bypass doesn't survive contact. The credulous failure: accepting the 18-month gate politely and 'staying close' — that's the same stall wearing patience. And the cowboy failure: shipping on slices you audited alone — the first data-quality incident becomes the CDO's told-you-so, and the program dies of one bad answer that a joint audit would have caught.",
  recursiveFollowup:
    "The audit works, two scenarios ship — then the catalog agent serves a discontinued product to 40 customers because the 'clean' slice had a sync gap nobody knew about. The CDO, graciously, doesn't say told-you-so — but the pause argument is back with evidence. Respond without abandoning the per-slice doctrine.",
  altitude: {
    exec:
      "The data being messy is true; the pause doesn't follow. Readiness is per-scenario — and the audit with your data team found three workflows whose data is clean today because your business already runs on it. We ship those this quarter, and the agent results give the migration what it's never had: a demand-ranked priority list and a funding argument.",
    engineer:
      "Per scenario: enumerate the exact tables and docs touched, define the quality bar the workflow needs (not a global standard), measure the gap, tag ship-now / weeks-fix / migration-gated. Instrument shipped scenarios for quality-attributed failures — that telemetry is both our safety check and the CDO's cleanup roadmap.",
    frontier:
      "'Data isn't ready' is the universal enterprise stall, and the counter is always the same decomposition: readiness is a property of scenario-slice pairs, not estates. The transferable move is making the data owner author the audit — converting the gatekeeper's expertise into triage, and the AI program into the data program's best funding argument.",
  },
},

/* ============================================================ 053 */
{
  id: "053",
  title: "Whatever They Have, We Want It",
  difficulty: "Medium",
  category: "Scenario Discovery",
  primaryLens: "Customer",
  secondaryLens: "Market",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Apps Platform"],
  tags: ["competitive", "envy", "demos", "qualification"],
  prompt:
    "Your customer's COO opens the QBR with a phone video: their chief competitor's CEO on a conference stage, demoing an 'AI copilot' that appears to run their entire supply chain from chat — reroute shipments, negotiate with carriers, predict stockouts. 'They're eighteen months ahead of us. I want this. What do I need to sign?' You recognize the demo style: heavily produced, suspiciously fluent, zero operational telemetry shown. What do you do with this meeting?",
  arc: {
    start: "Competitor envy at COO altitude, powered by a conference demo nobody can verify.",
    mid: "Decompose the video: what was likely real, what was theater — and what need it activated in him.",
    end: "The envy converted into mandate for scenarios that are real — without ever having to call the competitor liars.",
  },
  expected: {
    bottleneck: "The ask is a proxy: 'I want that demo' bundles an unverifiable artifact (conference demos are the industry's least reliable evidence — 007's disposability rule, violated publicly) with a real and useful signal — a COO suddenly willing to fund supply-chain AI; the job is separating the energy from the artifact.",
    failureMode: "Match the demo: commit to rebuilding the video, spend two quarters chasing its most theatrical capability (autonomous carrier negotiation), ship something at 70% that handles real freight — or puncture the demo instead ('that's fake') and watch the COO hear excuses from the vendor that's behind.",
    nextMove: "Honor the energy, decompose the artifact: break the video into its component capabilities with the COO's team (stockout prediction, reroute recommendation, carrier negotiation), classify each as proven-in-market / plausible-with-humans-approving / theater-until-evidenced — using their own ops constraints as the razor — then aim the activated budget at the two capabilities that are real and highest-value for THEIR network, with a 90-day proof on their data. Track the competitor with a dated Gnomon claim: if the demo was real, operational evidence (case studies, hiring patterns, carrier complaints) will surface within two quarters.",
    metric: "Time-to-first-operational-proof on the customer's own freight data — the number that beats the video, because a real reroute recommendation on their lanes outweighs any conference stage; plus the resolution of the competitor claim by its date.",
    owner: "The COO owns the mandate his envy just created; his supply-chain leads own the capability triage (their constraints do the debunking, not you); you own the 90-day proof and the calibrated competitor read.",
    falsifier: "If channel checks and the capability triage suggest the competitor's system is substantially real — carriers confirm API integrations, job postings show a scaled team — then the eighteen-month gap is genuine, the answer changes from 'calm down' to 'move faster with focus,' and the same decomposition tells you which capability to close first.",
  },
  modelAnswer:
    "First law of the room: never fight the energy. A COO who walks in wanting to sign is the rarest asset in enterprise AI, and both obvious responses squander him — matching the demo commits you to rebuilding theater; puncturing it makes you the vendor explaining why the competition's magic is fake, which he will hear as losing. The move is judo: keep the mandate, redirect the target.\n\nSo decompose the video with his own people. Break it into capabilities: stockout prediction (proven category — ML on inventory data works and has for years), reroute recommendation (real with humans approving — agents draft, planners commit), autonomous carrier negotiation (theater until evidenced — no carrier's systems accept that today, which his freight team knows better than you do). That's the elegance: his supply-chain leads do the debunking with their own operational constraints — 'C.H. Robinson doesn't have an API for that' lands from his people in a way it never could from you. The conference demo gets respected as direction and dissolved as evidence, and nobody called anyone a liar.\n\nThen aim the money: the two real capabilities, scoped to his highest-pain lanes, 90 days to operational proof on his data. A stockout prediction his planners act on beats the competitor's video in the only arena that matters — his P&L. And handle the eighteen-months claim like a professional: log it as a dated, falsifiable read. If the competitor's system is real, evidence surfaces — carrier integration chatter, case studies, ops hires — within two quarters. Commit to bringing that resolution to the next QBR. 'We'll know by March, and here's what we'll have shipped by then either way' is what calibration sounds like at COO altitude — and it converts envy into the program's launch energy instead of its specification.",
  rubric: {
    diagnosis: "Separates the activated demand (real, valuable) from the demo artifact (unverifiable) instead of fighting either.",
    move: "Capability triage run by the customer's own ops team, budget aimed at the proven slices, 90-day proof on their data.",
    measurement: "Operational proof on their lanes as the demo-beater; the competitor claim logged as a dated, resolvable read.",
    synthesis: "Sees that the customer's own constraints are the credible debunkers — and that envy is fuel to redirect, never to extinguish.",
    altitude: "The COO keeps his urgency and his dignity: 'move fast on what's real' instead of 'you fell for a video.'",
    transfer: "Competitive-demo pressure is constant at labs and platforms alike; capability triage plus dated claims is the calibrated response.",
  },
  adversarial:
    "The matcher's failure: 'we can build that' — you've specified your program against a marketing artifact and inherited its most theatrical feature as your acceptance criterion; two quarters later the COO compares your honest 80% to his memory of their fake 100%. The debunker's failure: leading with the telemetry critique — technically right, politically fatal, and it teaches the COO to get his AI ambitions validated somewhere else. The subtle miss: skipping the dated competitor read — 'ignore the demo' leaves his board anxiety unmanaged, and unmanaged anxiety re-buys the same meeting next quarter with a different video.",
  recursiveFollowup:
    "Day 60 of the proof: stockout prediction is working — and the competitor announces a customer case study with named carriers, confirming their system is substantially real. Your Gnomon claim resolves against you. The COO forwards it with one line: 'So they weren't lying.' Respond — with the proof half-shipped and your credibility now the asset in question.",
  altitude: {
    exec:
      "Your instinct is right and the budget is right — the video is the wrong spec. We broke it into five capabilities with your team: two are real and worth everything, one needs humans in the loop, two don't exist yet anywhere. Ninety days gets the real ones running on your lanes. And the eighteen-month claim: we'll know by March — I'll bring evidence, not opinions, to the next QBR.",
    engineer:
      "Capability decomposition with the ops team as judges: data requirements, integration reality (carrier APIs, TMS hooks), and autonomy level per capability. Proof scoped to two lanes with historical backtests before live recommendations. Competitor tracking: carrier integration signals, hiring, case studies — logged with a resolution date.",
    frontier:
      "Competitive demos are the industry's dominant distortion field, and the counter is capability triage: decompose the artifact, let domain constraints do the debunking, aim the activated budget at the proven subset, and put a date on the competitive read. The transferable skill is converting envy into mandate without ever arguing with a video.",
  },
},

/* ============================================================ 054 */
{
  id: "054",
  title: "Discovery Where Everything Is Forbidden",
  difficulty: "Hard",
  category: "Scenario Discovery",
  primaryLens: "Customer",
  secondaryLens: "Deployment",
  archetype: "Grower",
  secondaryArchetype: "Builder",
  targetRoles: ["CAPE SCPM", "OpenAI FDE", "Anthropic TPM Safeguards & Evals"],
  tags: ["regulated", "compliance", "sequencing", "healthcare"],
  prompt:
    "A hospital network wants agents 'everywhere — clinical documentation, prior authorization, patient communication, scheduling.' Their compliance officer attends every discovery session and has vetoed each proposed scenario in turn: HIPAA, state privacy law, malpractice exposure, the works. The executives are frustrated with compliance; compliance is exhausted by 'move fast' executives; and after six workshops the program has zero approved scenarios. Both sides now expect you to take their side. What do you do?",
  arc: {
    start: "Six workshops, zero scenarios, and two camps recruiting you against each other.",
    mid: "Re-sort every scenario by regulatory exposure — and let compliance co-author the ladder instead of guarding the gate.",
    end: "A risk-tiered scenario sequence shipping from the safe end, with compliance's signature making it durable.",
  },
  expected: {
    bottleneck: "Scenario selection is running on business value alone while approval runs on regulatory exposure — two orthogonal rankings; every workshop pitched the highest-value scenarios, which in healthcare are reliably the highest-exposure ones, guaranteeing the veto loop.",
    failureMode: "The camps harden: executives escalate to 'overrule compliance' (winning a battle that loses the program at the first incident) or the program dies of veto fatigue — and the org learns 'AI can't work in healthcare,' the falsest and most expensive lesson available.",
    nextMove: "Re-sort the scenario portfolio on two axes — business value AND regulatory exposure — with compliance co-authoring the exposure scores: PHI touched or not, clinical judgment involved or not, patient-facing or internal, human review natural or absent. Ship from the low-exposure/high-value quadrant first (scheduling optimization, prior-auth paperwork assembly with human submission, internal knowledge for admin staff), and structure the sequence as an exposure ladder each rung's evidence unlocks the next — with compliance defining in advance what evidence earns each rung (staged-exposure discipline applied to regulatory risk).",
    metric: "Approved-and-shipped scenarios per quarter — the number six workshops never produced — plus incident-free operating time at each rung, which is the currency that buys the next one.",
    owner: "Compliance co-owns the exposure scoring and rung criteria — signature, not veto; executives own choosing among approved-tier scenarios by value; you own keeping the ladder honest in both directions.",
    falsifier: "If compliance vetoes even the lowest-exposure tier — internal, no-PHI, human-reviewed scenarios — then the problem was never risk ranking: it's institutional (a compliance office with no incentive to ever approve, or a mandate fight above your altitude), and the honest move is naming that to the executive sponsor rather than running a seventh workshop.",
  },
  modelAnswer:
    "Refuse the recruitment first: taking either side ends the program. Executives who overrule compliance win exactly until the first incident, which in a hospital is a reportable event with a general counsel attached; compliance that vetoes forever is safe until the board asks why competitors have working programs. Both camps are doing their jobs; the process is what's broken — it keeps pitching scenarios ranked by value into a gate ranked by exposure.\n\nSo change the sort. Build the portfolio on two axes, and make compliance co-author the exposure axis — their expertise, converted from veto power into scoring criteria: does the scenario touch PHI; does it involve clinical judgment; is it patient-facing; is there a natural human checkpoint. Suddenly the map shows what six workshops hid: a populated low-exposure/high-value quadrant. Scheduling and capacity optimization — operational data, no clinical judgment. Prior-auth paperwork assembly — agents compile, humans submit; the checkpoint is native to the workflow. Internal policy knowledge for administrative staff — 015's lessons pre-applied, no patients in the loop. None of these was ever pitched, because none was anyone's favorite demo.\n\nThen make the sequence a ladder, not a list: each rung's operating evidence — incident-free time, audit trails, accuracy telemetry — unlocks consideration of the next, and compliance defines the evidence bar for each rung in advance. That last clause is the mechanism: pre-committed criteria convert compliance from a gate that can always say no into a co-designer whose own standards are being satisfied (024's gate-legitimacy lesson, wearing a lab coat). Executives get motion this quarter; compliance gets a program that generates the safety evidence it always wished it had; and clinical documentation — everyone's favorite, highest-exposure scenario — arrives in year two on a foundation of receipts instead of in workshop seven on a foundation of frustration.",
  rubric: {
    diagnosis: "Names the orthogonal-rankings failure — value-sorted pitches into an exposure-sorted gate — rather than blaming either camp.",
    move: "Two-axis re-sort with compliance co-authoring exposure; ship the safe-and-valuable quadrant; ladder with pre-committed rung criteria.",
    measurement: "Shipped scenarios per quarter and incident-free rung time as the unlock currency; falsifier detects the institutionally-broken case.",
    synthesis: "Converts compliance from veto to signature via pre-committed evidence bars — gate legitimacy engineering in regulated clothing.",
    altitude: "Both camps hear victory: executives get motion, compliance gets authorship — and neither had to lose for the program to start.",
    transfer: "Regulated-industry sequencing is a lab enterprise staple — exposure ladders and pre-committed unlock criteria travel to finance, government, and safeguards work directly.",
  },
  adversarial:
    "The champion's failure: helping executives build the case to overrule compliance — even succeeding plants the incident that ends agents in this network for five years, with your name in the retro. The capitulation failure: accepting the vetoes and downgrading to 'AI education workshops' — the program dies politely and the org learns the false lesson anyway. The subtle miss: building the exposure ladder yourself and presenting it to compliance for approval — authorship is the mechanism; criteria handed to compliance get vetoed like everything else, criteria authored by compliance get defended like their own, because they are.",
  recursiveFollowup:
    "Rung one ships and runs clean for a quarter. Then a scheduling-optimization suggestion contributes to a staffing gap during a code event — no patient harm, but clinically adjacent in a way nobody's exposure scoring anticipated. Compliance wants two rungs back; executives note the model 'worked as designed.' Re-score the ladder — and say what the scoring system itself just learned.",
  altitude: {
    exec:
      "Nobody has to lose this. We re-sorted every scenario by value and regulatory exposure with compliance scoring the risk axis — there's a full quadrant of high-value, low-exposure work nobody pitched because it wasn't glamorous. We ship that now, and each quarter of clean operation unlocks the next rung by criteria compliance wrote in advance. Documentation AI arrives on evidence, not on frustration.",
    engineer:
      "Exposure scoring rubric: PHI touched, clinical judgment involved, patient-facing, human checkpoint native. Rung one builds: scheduling optimizer on operational data, prior-auth assembler with human submission, admin knowledge agent with 015-grade intent gating. Full audit trails from day one — the telemetry IS the unlock currency for rung two.",
    frontier:
      "Regulated discovery is sequencing design: two-axis portfolios, exposure ladders, and unlock criteria pre-committed by the very function that guards the gate. The transferable insight — authorship converts gatekeepers into co-designers — is the same mechanism that makes safety gates legitimate inside labs, applied to the customer's own regulators.",
  },
},

/* ============================================================ 055 */
{
  id: "055",
  title: "The Pilot That Can't Teach Anything",
  difficulty: "Medium",
  category: "Scenario Discovery",
  primaryLens: "Deployment",
  secondaryLens: "Eval",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "OpenAI Deployment Eng", "OpenAI DPM (Codex)"],
  tags: ["pilot-design", "measurement", "sampling", "instruments"],
  prompt:
    "A logistics customer wants to pilot a dispatcher-assist agent and has designed it themselves: eight hand-picked power users from the innovation team, four weeks, success defined as 'positive feedback.' Their last three software pilots — all designed this way — 'succeeded' and then failed at rollout. Procurement, burned, now requires pilots before any purchase; the team treats them as a box to check. Redesign this pilot so it can actually teach something.",
  arc: {
    start: "Eight fans, four weeks, and 'positive feedback' — a pilot designed to succeed, not to learn.",
    mid: "Rebuild it as an instrument: representative users, baseline measures, pre-registered kill criteria.",
    end: "A pilot whose result — either way — is a decision, and a rollout forecast someone can bank.",
  },
  expected: {
    bottleneck: "The pilot is designed as a ritual, not an instrument: hand-picked enthusiasts measure enthusiasm, 'positive feedback' can't fail, and four weeks with no baseline can't estimate the only quantities that matter — will typical dispatchers adopt it, and what does it change in their numbers.",
    failureMode: "Pilot four 'succeeds' like the last three: the innovation team loves it, procurement checks the box, rollout hits 400 ordinary dispatchers who never asked for it — adoption stalls at 15%, the gap gets blamed on change management (018's purgatory, manufactured on schedule), and pilots as an institution lose whatever credibility they had left.",
    nextMove: "Redesign for inference: (1) sample for representativeness — stratify across shifts, depots, tenure, and (critically) include skeptics; enthusiasts forecast nothing; (2) measure against baseline — two weeks of pre-pilot dispatcher metrics (calls handled, exception resolution time, error rates) so the pilot detects deltas, not vibes; (3) pre-register the decision rule — 'roll out if task time improves ≥X% among mid-tenure users AND weekly retention holds ≥Y%; kill or redesign otherwise' — signed by the sponsor before day one; (4) size and length honestly — enough users and weeks (novelty decays around week three) for the deltas to be readable; (5) instrument voluntariness — offered-but-declined and tried-but-abandoned are the rollout forecast (018's lesson, measured in advance).",
    metric: "The pre-registered deltas among representative users — with week-over-week retention as the novelty filter; 'positive feedback' demoted to color commentary.",
    owner: "The sponsor signs the decision rule before launch (the signature is what makes the kill criteria real); operations nominates the stratified sample; you own the baseline instrumentation and the discipline when week-two numbers disappoint.",
    falsifier: "If the workflow genuinely can't be baselined — metrics don't exist and can't be cheaply instrumented — then an honest pilot measures adoption behavior alone (retention, voluntary return, abandonment) and says so, which still beats feedback theater; but claim only what the instrument can see.",
  },
  modelAnswer:
    "Name what the last three pilots actually were: demos with calendars. Eight hand-picked enthusiasts generate enthusiasm — that's what they're selected for — and 'positive feedback' is a success criterion that has never once failed in the history of enterprise software. The pilots didn't mislead anyone maliciously; they were instruments designed to measure the wrong population on an axis that can't go down. Procurement's box-checking is the rational response to instruments nobody could trust.\n\nRebuild it as measurement (028's discipline, applied to a pilot): the question a pilot answers is 'what happens when ordinary dispatchers get this' — so sample ordinary dispatchers. Stratify across shifts, depots, and tenure; include at least two vocal skeptics, because a skeptic converted is the strongest rollout signal that exists and a skeptic confirmed is the cheapest disaster prevention. Baseline for two weeks before the tool arrives — exception resolution time, calls handled, error rates — so the pilot reads deltas instead of adjectives. Pre-register the decision rule and get the sponsor's signature on it before day one: rollout thresholds, kill criteria, and the redesign trigger; the signature converts 'kill criteria' from a slide into a commitment someone must actively betray (043's pre-registration, at pilot scale). Run it past the novelty cliff — week three is where sugar-high usage decays and real adoption shows — and watch the behavioral tells over the survey answers: voluntary return rate, offered-but-declined, tried-and-abandoned. Those three numbers ARE the rollout forecast.\n\nThe cultural payload matters more than this pilot: a pilot that can fail is the only kind that can succeed meaningfully — and the first time a pre-registered kill criterion actually kills something, procurement's checkbox becomes trust again.",
  rubric: {
    diagnosis: "Names the ritual-vs-instrument distinction and why enthusiast samples and unfailable criteria forecast nothing.",
    move: "Stratified sampling with skeptics, pre-pilot baselines, sponsor-signed pre-registered decision rules, novelty-resistant duration.",
    measurement: "Pre-registered deltas plus behavioral adoption tells (retention, declined, abandoned) as the rollout forecast; falsifier scopes honest claims when baselines can't exist.",
    synthesis: "Connects the pilot to 018's purgatory and 043's pre-registration — pilot design IS the rollout's causal instrument, built early.",
    altitude: "Procurement and the sponsor hear the institutional fix: a pilot that can fail is what makes 'pilot passed' mean something again.",
    transfer: "Pilot design as experiment design is the deployment seat's core craft — sampling, baselines, and pre-registration travel everywhere.",
  },
  adversarial:
    "The rigor-theater failure: demanding a full RCT with control depots for a four-week tool trial — the customer needed an honest pilot, not a dissertation, and over-engineering hands the box-checkers their excuse to skip measurement entirely. The kindness failure: keeping the innovation team as the sample 'plus a few others' — the enthusiast signal swamps the representative one at n=12, and you've rebuilt the demo with better paperwork. The quiet miss: pre-registering thresholds without the sponsor's signature — unsigned kill criteria die at the first disappointing week, exactly when they were supposed to work.",
  recursiveFollowup:
    "Week five: mid-tenure dispatchers show +9% resolution speed — clearing the rollout threshold — but both skeptics abandoned the tool in week two with the same complaint: 'it interrupts my flow during peak load.' The pre-registered rule says ship. The abandonment pattern says the rule missed something. Ship, hold, or amend the rule — and defend what pre-registration means if rules can be amended by outcomes.",
  altitude: {
    exec:
      "Your last three pilots succeeded and the rollouts failed — because the pilots measured fans on a scale that can't go down. This one samples real dispatchers including two skeptics, baselines their numbers first, and we both sign the pass/kill thresholds before it starts. In six weeks you'll have a rollout forecast you can bank — or a kill decision that just saved you the rollout.",
    engineer:
      "Two-week baseline capture on dispatch metrics; stratified sample across shift/depot/tenure, n sized for the minimum delta that matters; voluntary-use telemetry (return rate, declines, abandonment) as first-class signals; six-week run to outlast novelty; thresholds and kill criteria in the pilot doc, sponsor-signed, before day one.",
    frontier:
      "Pilots are experiments wearing business clothes: representative sampling, baselines, pre-registration, and behavioral endpoints. The transferable law — a pilot that cannot fail cannot inform — is the same one that governs evals, A/B tests, and every instrument this discipline builds.",
  },
},

);
