/* Parabolic 100 — problem bank, part 4 (Wave 1 gap-killers, 026–030)
   Internal-execution classes: cross-team dependencies, program health,
   metric design, stakeholder conflict. See docs/COVERAGE.md §3. */

P100.PROBLEMS.push(

/* ============================================================ 026 */
{
  id: "026",
  title: "The Dependency You Don't Own",
  difficulty: "Hard",
  category: "Deployment & Change Management",
  primaryLens: "Deployment",
  secondaryLens: "Altitude",
  archetype: "Builder",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform", "MSFT MAI Strategy & Ops", "OpenAI Deployment Eng"],
  tags: ["cross-team", "dependencies", "influence", "escalation"],
  prompt:
    "Your customer go-live in six weeks depends on another team shipping an API change they agreed to 'target Q2' in a meeting three months ago. Their PM now says it's 'likely next sprint, maybe two' — for the third time. You have no authority over them, your exec already told the customer the date, and the other team's manager reports into a different org. What do you do?",
  arc: {
    start: "A launch date resting on a verbal 'target Q2' and three sprints of maybe.",
    mid: "Convert goodwill into a designed commitment — owner, date, slip signal, escalation trigger.",
    end: "Either a commitment you can plan against, or an early honest re-plan — never a surprise slip.",
  },
  expected: {
    bottleneck: "No designed commitment — the dependency is held together by a verbal 'target,' with no owner, no slip signal, and no agreed escalation trigger.",
    failureMode: "The slip surfaces two weeks before go-live, the customer date breaks publicly, and the escalation happens at maximum heat with nothing written to point at — burning both the customer and the cross-org relationship.",
    nextMove: "Design the commitment now: a written ask with the customer date and cost-of-slip attached, a named owner on their side, a specific date, a weekly slip signal, and a pre-agreed escalation trigger ('if not code-complete by X, our managers meet') — plus a parallel plan B (workaround, descope, or honest date move) priced and ready.",
    metric: "Days of schedule buffer between their committed date and your go-live — and whether the slip signal has fired, not whether the vibe is good.",
    owner: "You own the commitment structure and plan B; their named engineer/PM owns the delivery; the escalation trigger names both managers before anyone is angry.",
    falsifier: "If, given a written ask with the customer cost attached, they commit cleanly and hit the first slip-signal checkpoint, the dependency was never the risk — your visibility was; keep the checkpoint and stand down the escalation machinery.",
  },
  modelAnswer:
    "Stop managing the dependency by hope and start managing it by design. Three 'maybe next sprint' answers is not a schedule — it is the absence of one, and the absence is your fault to fix, not theirs: nobody ever wrote down who owes what by when, with what alarm when it slips.\n\nThe move has four parts. (1) Make the ask real: a written request carrying the context they've never seen — the customer name, the announced date, the cost of a slip in dollars and trust. Teams deprioritize abstractions; they rarely deprioritize a named customer with an exec-visible date. (2) Design the commitment: a named owner (a person, not a team), a specific date, a weekly slip signal (a checkpoint artifact, not a status vibe), and a pre-agreed escalation trigger — 'if not code-complete by the 15th, our managers meet on the 16th.' Agreeing on the trigger while everyone is calm is what makes escalation a process instead of a betrayal. (3) Build plan B in parallel, priced: workaround, descope, or an honest date move — and tell your exec now that plan B exists, because executives forgive re-plans and never forgive surprises. (4) If the trigger fires, escalate warmly and precisely: the written commitment, the slip, the customer cost, the decision needed — influence without authority is mostly evidence plus a paper trail plus no drama.\n\nWhat you never do: pad secretly, vent about the other team to your exec, or escalate on feelings. The relationship survives this launch and has to fund the next ten.",
  rubric: {
    diagnosis: "Names the missing commitment structure — not 'the other team is slow' — as the actual failure.",
    move: "Designs the commitment (owner, date, slip signal, pre-agreed trigger) and builds a priced plan B in parallel.",
    measurement: "Tracks buffer-days and checkpoint artifacts, not status vibes; falsifier lets the team exonerate itself.",
    synthesis: "Sees that pre-agreeing the escalation trigger converts escalation from betrayal into process — preserving the cross-org relationship.",
    altitude: "Tells the exec about plan B before it's needed — re-plans are forgivable, surprises are not.",
    transfer: "Maps to lab TPM work exactly: research, infra, and product teams coordinate by designed commitments, not authority.",
  },
  adversarial:
    "The two tempting failures are opposites. 'Escalate now' with nothing written means your escalation is a complaint — managers hear team friction, not a decision. 'Keep nudging and pad the schedule secretly' feels diplomatic but trades one slip for systemic distrust when the padding is discovered, and it teaches the org your dates are soft. Also weak: treating plan B as disloyalty to plan A — a priced fallback is what lets you negotiate calmly, and its absence is why you're currently negotiating scared.",
  recursiveFollowup:
    "The trigger fires. In the managers' meeting, their director says the API change is now blocked on a third team's security review with no date. You are two escalation hops from anyone who can decide. What's the next move — and what do you tell the customer this week?",
  altitude: {
    exec:
      "The dependency is real but unmanaged — today it's a verbal 'target Q2.' By Friday it will be a written commitment with an owner, a weekly slip signal, and an escalation trigger we agreed to in advance. Plan B is priced and ready. You will not be surprised: worst case, you get a re-plan with three weeks' notice, not a slip with three days'.",
    engineer:
      "I need one named owner, a code-complete date you actually believe, and a two-line weekly checkpoint — artifact or blocker, not a status adjective. In exchange: I carry the customer context, absorb the escalation if it comes, and you never hear about this in a surprise exec thread.",
    frontier:
      "Cross-team delivery at a lab is commitment design: research, capacity, and product teams don't share a manager, so coordination lives in explicit owner-date-signal-trigger contracts. The transferable skill is making escalation a pre-agreed process — and treating the paper trail as infrastructure, not politics.",
  },
},

/* ============================================================ 027 */
{
  id: "027",
  title: "Watermelon Program",
  difficulty: "Hard",
  category: "Frontier-Lab Transfer",
  primaryLens: "Deployment",
  secondaryLens: "Eval",
  archetype: "Sweeper",
  secondaryArchetype: "Maintainer",
  targetRoles: ["Anthropic TPM Cloud Inference", "MSFT MAI Strategy & Ops", "CAPE SCPM"],
  tags: ["program-health", "status", "incentives", "reporting"],
  prompt:
    "You inherit a model-launch readiness program: twelve workstreams, all green for six consecutive weeks. In your first ten days you learn the load-test environment has been down for a month, two capacity commitments are unsigned, and the security review hasn't started — while every dashboard stays green and every standup sounds fine. The launch is in nine weeks and leadership believes it. What do you do?",
  arc: {
    start: "Green outside, red inside — a program whose reporting system optimizes for calm.",
    mid: "Re-instrument status around artifacts and make red safe to say — without shooting anyone.",
    end: "A believable dashboard, a re-planned launch, and messengers who got thanked, not buried.",
  },
  expected: {
    bottleneck: "The status system itself: green is defined by assertion, not artifacts, and the incentives punish whoever says red first — so the program is optimizing reports instead of readiness.",
    failureMode: "The truth surfaces at launch-minus-two-weeks as a cascade, leadership learns the dashboards were fiction, and every future green from this program — and from you — is discounted to zero.",
    nextMove: "Re-instrument before re-planning: redefine green per workstream as verifiable artifacts (passing load test, signed commitment, review started), run a one-week amnesty re-baseline where红 is explicitly rewarded, then take the true picture and a recovery plan to leadership as one package — new instrument, honest state, credible date.",
    metric: "Artifact-verified readiness per workstream — the count of greens backed by evidence versus assertion — plus time-to-surface for new risks after the reset.",
    owner: "You own the instrument and the leadership message; workstream leads own their artifact lists; leadership owns reacting to the first honest red in a way that doesn't recreate the watermelon.",
    falsifier: "If artifact-verification shows most workstreams genuinely are green and the three you found are the exceptions, the program was healthy with local failures — fix the three, keep the instrument, and skip the dramatic reset.",
  },
  modelAnswer:
    "Diagnose the system before the workstreams: twelve greens hiding three reds for six weeks is not twelve coincidences — it is a reporting system doing exactly what its incentives ask. Somewhere upstream, saying red became expensive, so the program bought calm with fiction. Your predecessor probably didn't lie; they built a machine where nobody had to.\n\nSequence matters. (1) Re-instrument first: redefine green per workstream as an artifact, not an adjective — a passing load test, a signature, a started review, a named blocker. 'Green' becomes something you can click. (2) Amnesty re-baseline: one week, every lead re-reports against the artifact definitions, and the explicit rule is that this week's reds are free — celebrated, even. You need the truth more than you need accountability for the old fiction, and you need the org to watch the first red-sayer get thanked. (3) One package to leadership: never walk in with 'the program is secretly red' alone — walk in with the new instrument, the honest baseline, and a recovery plan with a credible date. Leadership can absorb 'it's worse than reported, here's the real plan'; they cannot absorb ambient doubt. (4) Keep the instrument: weekly artifact checks, and watch time-to-surface on new risks — the health metric of the *reporting system*, which is the thing you actually inherited broken.\n\nThe test of the fix is six months out: someone says red early, in public, and nothing bad happens to them.",
  rubric: {
    diagnosis: "Blames the reporting system's incentives, not twelve individually dishonest leads — and says so before re-planning.",
    move: "Sequences instrument → amnesty re-baseline → one-package leadership message → permanent artifact checks.",
    measurement: "Artifact-verified greens and time-to-surface as the metrics; falsifier allows the program to be mostly healthy.",
    synthesis: "Sees that rewarding the first red publicly is the actual mechanism — culture change delivered through one visible transaction.",
    altitude: "Leadership hears instrument + truth + recovery plan as one move, protecting both the launch and your credibility.",
    transfer: "This is lab launch-program hygiene: readiness defined by artifacts, and safety-to-report treated as infrastructure.",
  },
  adversarial:
    "The heroic failure: personally auditing all twelve workstreams and reporting the 'real truth' upward — you become the program's single point of honesty, the system stays broken, and the leads learn to hide things from you specifically. The cowardly failure: quietly fixing the three reds and preserving the green narrative — you've now co-signed the fiction, and the next inherited red is yours. And if your answer punished whoever built the watermelon, notice you just made the next messenger more expensive.",
  recursiveFollowup:
    "The amnesty week surfaces a fourth red: a workstream lead knew capacity was unsigned and said green anyway because their VP 'didn't want noise before the launch review.' The incentive problem is above your pay grade. What do you do with that — and what do you tell the lead?",
  altitude: {
    exec:
      "The program's dashboards were measuring confidence, not readiness. I've redefined green as clickable evidence, re-baselined with a one-week amnesty, and here is the honest state plus the recovery plan and a date I believe. The instrument fix matters more than this launch: it's what makes my next green worth something.",
    engineer:
      "Per workstream: the artifact that proves green — passing run, signed doc, started review — and a named blocker if you can't produce it. This week's reds are free. From next week, status is a link, not a sentence.",
    frontier:
      "Program health at a lab is an eval problem: status is a measurement system, and it Goodharts like any other. The transferable pattern is artifact-defined state, amnesty re-baselines after inheriting fiction, and treating time-to-surface — how fast bad news travels — as the program's true health metric.",
  },
},

/* ============================================================ 028 */
{
  id: "028",
  title: "Define Success for the Agent Platform",
  difficulty: "Medium",
  category: "Evals & Measurement",
  primaryLens: "Eval",
  secondaryLens: "Customer",
  archetype: "Builder",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "OpenAI DPM (Codex)", "MSFT MAI Evals Eng"],
  tags: ["metrics", "north-star", "goodhart", "kpis"],
  prompt:
    "A customer's new AI platform team asks you to help define success metrics for their internal agent platform before their board review. Their draft: number of agents built, number of employees with access, and weekly active users. Leadership likes the draft because all three numbers only go up. You have one working session to fix it. What do you propose?",
  arc: {
    start: "Three metrics that measure motion — all guaranteed to go up, none able to say no.",
    mid: "Anchor on completed value: task success, time returned, and the health constraints around them.",
    end: "A metric tree the board can falsify — and that would actually kill a failing program.",
  },
  expected: {
    bottleneck: "The draft measures activity, not value — agents built and WAU can all rise while nothing useful happens, so the metric set cannot detect failure, which is the one job of a metric set.",
    failureMode: "Goodhart at platform scale: teams manufacture agents and logins to feed the dashboard, the board funds two more quarters of theater, and when value is finally asked for, the honest answer costs the whole program.",
    nextMove: "Rebuild as a small tree: one north star measuring completed value (successful task completions, or hours returned to employees per week), two or three drivers (adoption of the top workflows, task success rate, time-to-first-value), and two guardrails (support burden, permission incidents) — each with an owner, a target, and the explicit test 'could this number tell us to stop?'",
    metric: "Verified task completions per week — completions that pass a quality bar, not sessions — as the north star candidate.",
    owner: "The platform team owns instrumenting it; business-unit owners own per-workflow targets; the board gets the tree with thresholds, not a dashboard of up-and-to-the-right.",
    falsifier: "If instrumenting completed value is genuinely infeasible this quarter, WAU is acceptable as a temporary proxy — but only stated as a proxy, with the replacement date on the board slide itself.",
  },
  modelAnswer:
    "Open with the test their draft fails: a metric set's job is to be able to say no. Agents built, seats granted, and weekly actives share one property — they rise whether or not the platform creates value. Metrics that can only say yes aren't measurement; they're marketing with axes.\n\nThe rebuild is a small tree, not a bigger dashboard. North star: completed value — verified task completions per week, or hours returned to employees — something that moves only when an agent actually did a job someone needed. Drivers underneath, chosen because the team can act on them: task success rate on the top five workflows, adoption within those workflows (not platform-wide logins), and time-to-first-value for a new team. Guardrails that catch the cheap ways to fake the north star: support tickets per agent, permission incidents, cost per completion. Every metric gets an owner and a threshold, and every threshold carries the sentence leadership must pre-agree to: 'if this is below X by Q3, we cut scope.' That sentence is the whole design — a board that pre-commits to what failure looks like is a board that can fund you through a slow quarter.\n\nConcede what's true in their draft: early on, adoption is a legitimate leading indicator. So stage it — WAU as an explicitly labeled proxy with an expiry date, replaced by completed value once instrumentation lands. Proxies are fine; unlabeled proxies are how platforms die at their third board review.",
  rubric: {
    diagnosis: "Names the real defect — the draft cannot say no — rather than just calling the metrics 'vanity.'",
    move: "Builds a tree (north star, actionable drivers, anti-gaming guardrails) with owners and pre-agreed stop thresholds.",
    measurement: "North star is verified completed value; falsifier permits a labeled, expiring proxy when instrumentation lags.",
    synthesis: "Sees Goodhart pressure in advance — guardrails chosen specifically to catch the cheap ways the north star gets faked.",
    altitude: "The board framing lands: pre-committed failure thresholds are what make good-faith funding survivable.",
    transfer: "This is eval design applied to a business: the metric tree is a product eval suite, proxies and all.",
  },
  adversarial:
    "Sneering at 'vanity metrics' and proposing a 14-metric balanced scorecard is the equal-and-opposite failure — nobody owns fourteen numbers, and a board can't falsify a wall. The differentiator is the stop-condition: if no metric in your set could ever trigger 'cut scope,' you built the same theater with better vocabulary. And if you refused WAU entirely, you missed that early-stage platforms legitimately need leading indicators — the sin was never the proxy, it was the missing label and expiry date.",
  recursiveFollowup:
    "Two quarters in: verified completions are flat, but hours-returned per completion doubled — fewer, much bigger tasks. The board asks whether the platform is working. Which number was wrong, the metric or the target — and what do you change?",
  altitude: {
    exec:
      "Your three numbers can only go up, which means they can't warn you. I'm proposing one north star — verified hours returned to your people — three drivers you can manage weekly, two guardrails that catch gaming, and pre-agreed thresholds where we'd cut scope. A dashboard that can say no is the only one worth funding.",
    engineer:
      "Instrument completed tasks with a quality check, not sessions: completion event + verification signal per workflow, cost and tickets per completion, permission incidents. Adoption stays as a labeled proxy until that pipeline lands — expiry date on the slide.",
    frontier:
      "Metric design is eval design: a north star is a benchmark, drivers are its diagnostic slices, guardrails are the anti-gaming checks, and unlabeled proxies are benchmark contamination. The transferable skill is building measurement that can fail — at a lab, a metric that can't say no doesn't ship.",
  },
},

/* ============================================================ 029 */
{
  id: "029",
  title: "The Sponsor Goes Quiet",
  difficulty: "Medium",
  category: "Scenario Discovery",
  primaryLens: "Customer",
  secondaryLens: "Altitude",
  archetype: "Grower",
  secondaryArchetype: "Sweeper",
  targetRoles: ["CAPE SCPM", "OpenAI FDE"],
  tags: ["sponsorship", "stakeholders", "renewal-risk", "expansion"],
  prompt:
    "Your executive sponsor — the CVP who championed the agent program, opened doors, and personally presented it to her board — has gone quiet. Three cancelled syncs in six weeks, delegated attendance to a director who takes notes and commits to nothing, and your emails get two-line replies. The program itself is on track. Nobody has said anything is wrong. What do you do?",
  arc: {
    start: "A healthy program losing its political engine, silently.",
    mid: "Diagnose the silence — her world changed, the program's story stopped serving her, or both.",
    end: "Either the sponsor re-engaged around her new problem, or a successor sponsor built before you needed one.",
  },
  expected: {
    bottleneck: "Sponsorship decay with an unknown cause — silence is data, but not yet diagnosis: her priorities moved, the program stopped serving her story, she's under pressure you can't see, or she's leaving.",
    failureMode: "You keep reporting program health to an empty chair until a reorg, budget cycle, or renewal arrives — and discover that on-track programs without sponsors lose to off-track programs with them.",
    nextMove: "Diagnose before acting: use the delegate as a source not a substitute, check the surround (org changes, earnings pressure, her calendar's new center of gravity), then request one 25-minute conversation framed around her agenda — 'what does this program need to do for you now?' — while quietly building a second sponsor thread as insurance, not replacement.",
    metric: "Sponsor-value alignment: can you state, in her words, what the program currently does for her goals? If you can't, that's the metric at zero — meeting frequency is just its shadow.",
    owner: "You own the diagnosis and the re-anchoring; the delegate becomes an ally with a defined role; the successor-sponsor thread is yours until it must not be.",
    falsifier: "If the 25 minutes reveals genuine sponsorship — 'I'm slammed, I still back this, here's my delegate's mandate' — then the silence was bandwidth, not decay: formalize the delegate's authority and stop manufacturing a crisis.",
  },
  modelAnswer:
    "Read the silence as data about her, not about you. Sponsors don't drift because programs are off track — they drift because their world moved: a reorg brewing, a priority shift, board pressure, an exit. The program being 'on track' is exactly why this is dangerous: nothing looks wrong, so nothing gets fixed, until the moment sponsorship is needed — budget, renewal, an incident — and the chair is empty.\n\nSequence: (1) Diagnose quietly. The delegate is your best source — not 'why is she skipping' but 'what's consuming her quarter?' Check the surround: org announcements, earnings language, where her name appears now. (2) Re-anchor, don't re-report. Ask for 25 minutes with an agenda about her, not the program: 'Priorities have clearly shifted — what does this program need to do for you now?' Then rebuild the program's story around the answer. Sponsors don't fund progress; they fund progress on *their* problem, and her problem may have changed while your slides didn't. (3) Build succession insurance in parallel: the director who's been attending is either a note-taker or your next champion — give them something ownable and visible. Multi-threading isn't disloyalty; single-threaded sponsorship is how enterprise programs die of one person's calendar. (4) If the diagnosis says she's leaving, accelerate: get the program's wins into institutional artifacts — QBR decks, budget lines, named successors — before the goodbye email.\n\nWhat you don't do: escalate around her, guilt her with attendance stats, or keep sending the same status mail into the void. Silence answered with volume becomes noise.",
  rubric: {
    diagnosis: "Treats silence as a symptom with multiple causes and diagnoses before acting — her world, not your program.",
    move: "Re-anchors the program to her current agenda and builds successor sponsorship in parallel, insurance not replacement.",
    measurement: "Sponsor-value alignment stated in her words as the real metric; falsifier allows 'busy but committed.'",
    synthesis: "Sees that on-track-ness is the camouflage — political health and program health are independent axes, and both are yours.",
    altitude: "The 25-minute ask is framed around her problem — no guilt, no status dump, one question that re-opens the door.",
    transfer: "Maps to FDE account management and lab-side enterprise work: champion decay is the top silent killer of deployments.",
  },
  adversarial:
    "The needy failure: more updates, longer decks, 'just checking in' — you become another demand on the calendar that's already squeezing you out. The oblivious failure: 'the program speaks for itself' — programs don't speak at budget time, sponsors do. And the cynical failure: jumping straight to a replacement sponsor without the diagnosis — if she's quiet because of a reorg *you* haven't heard about, the new thread you pulled may sit on the losing side of it. Diagnose first; the silence has a specific cause and your move depends entirely on which one.",
  recursiveFollowup:
    "The 25 minutes happens: she's supportive but reveals she's moving orgs in eight weeks, and her successor 'has different views on AI spend.' You have eight weeks of warm handover and one skeptical incoming exec. Design the transition.",
  altitude: {
    exec:
      "To her: 'Your priorities have clearly evolved — I want 25 minutes to re-point this program at whatever matters most to you now, and to propose how your director could own the operating rhythm so it costs you nothing until decisions need you.'",
    engineer:
      "Internally: sponsorship is a tracked dependency like any other — log the decay signals (cancelled syncs, delegation, reply length), diagnose the cause, and treat single-threading as a severity-one risk even while every technical metric is green.",
    frontier:
      "Enterprise deployments die politically more often than technically. The transferable discipline is treating sponsorship as instrumented infrastructure — alignment restated in the sponsor's current words each quarter, succession built before it's needed, and silence handled as a signal, never as an insult.",
  },
},

/* ============================================================ 030 */
{
  id: "030",
  title: "The Overpromise Repair",
  difficulty: "Hard",
  category: "Governance & Risk",
  primaryLens: "Customer",
  secondaryLens: "Altitude",
  archetype: "Sweeper",
  secondaryArchetype: "Grower",
  targetRoles: ["CAPE SCPM", "Anthropic TPM API Platform"],
  tags: ["expectations", "repair", "sales-alignment", "trust"],
  prompt:
    "You discover — from the customer's own project plan — that your account executive promised them multi-tenant agent deployment 'generally available by end of quarter.' It's a private-preview feature with no GA date, and you know the product team won't commit to one. The customer has built their rollout plan and an executive announcement around it. The AE asks you to 'keep it vague for now.' What do you do?",
  arc: {
    start: "A promise you didn't make, discovered inside the customer's committed plans.",
    mid: "Correct fast, in person, with alternatives priced — and fix the machine that made the promise.",
    end: "A re-planned rollout on real dates, a customer who trusts you more, and an AE who's still an ally.",
  },
  expected: {
    bottleneck: "A false commitment already load-bearing in the customer's plans — every day it stands, their announcement, budget, and your credibility compound against a date that doesn't exist.",
    failureMode: "'Keep it vague' until the quarter ends: the customer discovers the truth by slipping publicly, attributes the deceit to your company rather than one AE, and every future roadmap statement from you is discounted — the account's trust capital is spent on one feature.",
    nextMove: "Correct within days, not weeks: align internally first (AE and your manager, one hour, one message), then tell the customer directly with the real status, a priced set of alternatives (preview access with support, phased single-tenant start, revised timeline), and an owner for the corrected plan — and separately, fix the source: roadmap commitments get a written confirmation path so this can't recur.",
    metric: "Days between your discovery and the customer hearing the truth from you — the only number that determines whether this reads as integrity or cover-up.",
    owner: "You deliver the correction with the AE in the room (their promise, your plan); your manager is briefed before, not after; product owns what's actually committable in writing.",
    falsifier: "If the product team, asked directly with the customer's commitment attached, actually will commit to a GA date inside the quarter, the promise was reckless but not false — convert it to a written commitment and skip the repair theater.",
  },
  modelAnswer:
    "The promise is already made — your choice is only who corrects it, when, and at what cost. Every week of 'vague' converts an AE's overreach into your company's deceit, because the customer will eventually learn the truth, and the only variable is whether they learn it from you early or from a slip publicly.\n\nSequence: (1) Verify first — ask product, with the customer's commitment attached, whether a GA date is genuinely committable. Occasionally the reckless promise is accidentally keepable; then you convert it to writing and this becomes a different, smaller problem. (2) Align internally in 48 hours: the AE, you, your manager, one agreed message. Give the AE the dignified path — they join the correction call, framed as 'we have updated information,' not a confession. You need them as an ally on this account for years; humiliation buys you one clean quarter and a saboteur. (3) Correct in person, with alternatives priced: real status, what IS available (private preview with named support, a single-tenant phase one that preserves their announcement's spirit), and a re-planned rollout with dates you'd sign. Executives can re-plan around honest bad news; they cannot re-plan around fog. (4) Fix the machine: the reason this happened is structural — roadmap claims had no confirmation path. Propose one: anything forward-looking in a customer plan gets written product sign-off. That turns this incident into the reason it can't recur, which is the only version of this story that ends well for everyone — including the AE.\n\nSay the quiet part to yourself: 'keep it vague' is the AE asking you to co-sign the promise. Declining isn't betrayal; it's the only move that protects them too.",
  rubric: {
    diagnosis: "Sees the promise as already load-bearing and time as the enemy — the cost compounds daily, and 'vague' equals co-signing.",
    move: "Verifies committability first, aligns internally fast, corrects in person with priced alternatives, then fixes the structural source.",
    measurement: "Discovery-to-disclosure days as the ruling metric; falsifier checks whether the promise is accidentally keepable.",
    synthesis: "Preserves the AE as a long-term ally via the dignified path — repairs the relationship system, not just the fact.",
    altitude: "The customer exec gets honest bad news plus a signable re-plan — fog is the only unforgivable deliverable.",
    transfer: "Maps to lab-side enterprise work directly: field teams overpromise everywhere; written commitment paths are the fix.",
  },
  adversarial:
    "The righteous failure: correcting the customer immediately without internal alignment — you're accurate, alone, and now in a credibility war with your own AE, which the customer can see and which costs more trust than the original lie. The loyal failure: honoring 'keep it vague' — you've converted someone else's overreach into your integrity problem, and the discount applies to you personally at renewal. And if your answer skipped the structural fix, you've scheduled this exact meeting again next quarter with a different feature.",
  recursiveFollowup:
    "The correction call goes well — but the customer's CIO asks, directly: 'Was this a miscommunication or did your team knowingly oversell?' The AE is in the room. Answer the question — honestly, without destroying them, in under twenty seconds.",
  altitude: {
    exec:
      "To the customer: 'Our earlier timeline was wrong, and I'd rather correct it now than let your announcement depend on it. Here's what's real: preview access with named support today, phase one on single-tenant next month, and a GA-dependent phase two we'll commit to in writing when product does. I re-planned your rollout against dates I'd sign.'",
    engineer:
      "Internally: forward-looking claims in customer plans require written product confirmation from now on — a one-line process that converts roadmap enthusiasm into checkable commitments before it reaches a customer's board deck.",
    frontier:
      "Every lab's enterprise motion hits this: field promises outrunning platform reality. The transferable pattern is speed-to-correction as the trust metric, dignified paths for the overpromiser, and a written commitment gate as the structural fix — repair the machine, not just the message.",
  },
},

);
