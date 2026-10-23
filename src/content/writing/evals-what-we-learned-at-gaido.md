---
title: "Evals: what we learned building AI agents at Gaido"
description: How evals built from our agents' real mistakes cut review from 40 minutes to 4 per case — and the uncomfortable discovery that most of them were grading the report against itself.
date: 2026-10-23
kind: essay
tags: [evals, agents, product]
---

## One wrong number

Raksha took on health-insurance claims that had been rejected or underpaid. A customer would upload everything they had: the policy, the hospital bills, the discharge summary and the insurer's settlement letter. Our agents read it all, worked out what went wrong, and wrote a case report: why the claim was cut, which policy clauses and regulations were on the customer's side, how much they could realistically recover, and what to do next.

That report was the product. It went to the customer, and often on to the insurer's grievance desk or the Insurance Ombudsman. So before any report went out, one of us read it end to end. That took about **40 minutes a case**.

The reason was simple. One report said *"Pharmacy bill was ₹14,200"*. It read perfectly. The tone was right, the argument was sound. But ₹14,200 did not exist anywhere in the documents the customer had uploaded. The agent had made it up.

A claims officer who spots one invented number stops trusting the other twenty. The customer's whole case goes with it. In our business, a fluent report with one wrong fact was worse than no report.

This piece is about how we got from *a human reads everything* to *a human reads only what our checks flag*, and review time fell from 40 minutes to about 4. It is mostly about evals. Not as a research topic, but as the thing that decided whether we could scale at all.

## What an eval is, in plain words

An eval is a test you run on what the AI produced, the same way every time, that answers one narrow question with a pass or a fail.

Not *"is this report good?"* That question has no stable answer. Instead: *"Does every rupee amount in this report exist in the customer's documents?"* That one does.

The eval that mattered most for us was exactly that. We called it **source grounding**. It works like this:

1. Code scans the report and collects every rupee amount, every citation and every duration ("delayed by 45 days").
2. It checks the agent's tool log: did it actually open the documents it cites?
3. Each amount is tagged either *extracted* (read from a document) or *computed* (worked out by the agent). Extracted amounts must be found in the source text. Computed ones are checked elsewhere.
4. The score is rules passed over rules checked, plus a one-line conclusion a reviewer can read in seconds.

Three real-shaped examples:

| Report says | What the check does | Result |
| --- | --- | --- |
| "Room rent deducted: ₹12,500" | Finds 12,500 in the settlement letter | Pass |
| "Estimated recovery (computed): ₹42,300" | Skips it: labelled as computed | Pass |
| "Pharmacy bill was ₹14,200" | Cannot find 14,200 in any upload | Fail |

One missing number out of twenty fails the whole check. That sounds harsh. It is deliberate: the cost of one invented fact is the customer's credibility, so the bar is zero.

## Start with how it actually fails

The tempting first eval is a second model reading the report and scoring it out of ten. It tells you very little. A report can be well written, confident and wrong, and a general judge will often reward exactly that.

So we did error analysis first: read a lot of real reports, write down every mistake a reviewer caught, and group them. A few patterns came back again and again:

- **Invented or corrupted facts.** A bill amount that is in no document. Court judgments pulled in from outside to support an argument, with case details that were garbled.
- **Impossible money.** The customer was short ₹40,000, but the report said ₹48,000 was recoverable. You cannot recover more than you lost.
- **A fair deduction treated as unfair.** A mandatory ₹5,000 co-pay is in the policy. It is fair. The agent still counted it as money to fight for.
- **The report disagreeing with itself.** The deduction table added up to ₹32,000; the summary at the top said ₹40,000.
- **Wrong dates, wrong maths.** Waiting periods counted from the wrong start date, especially for ported policies (more on this below).
- **The right law in the wrong case.** Strong arguments, like the moratorium clause or causal nexus, cited where the facts did not support them. A claims officer sees that and discounts the rest.

When we finally counted, the surprise was where the problems actually were. Made-up numbers were the scariest, but they were not the most common. The most common failure was quieter: the report made five reasonable-sounding arguments and missed the one that decided the case.

<figure class="bars" aria-label="Share of reviewer-flagged problems by type">
  <figcaption><strong>More than half of failures: missing the argument that decides the case</strong><span>Share of reviewer-flagged problems by type, approximate, across about 15 real cases (July 2026)</span></figcaption>
  <div class="bar is-accent"><span class="label">Missed the argument that decides the case</span><span class="track"><span class="fill" style="width:91.7%"></span></span><span class="value">~55%</span></div>
  <div class="bar"><span class="label">Missed contradictions across documents</span><span class="track"><span class="fill" style="width:33.3%"></span></span><span class="value">~20%</span></div>
  <div class="bar"><span class="label">Left out a document, policy or rider</span><span class="track"><span class="fill" style="width:16.7%"></span></span><span class="value">~10%</span></div>
  <div class="bar"><span class="label">Invented or miscalculated numbers</span><span class="track"><span class="fill" style="width:16.7%"></span></span><span class="value">~10%</span></div>
  <div class="bar"><span class="label">Wrong tone (over-aggressive)</span><span class="track"><span class="fill" style="width:8.3%"></span></span><span class="value">~5%</span></div>
</figure>

That changes what you test. A grounding check would pass a report that cites the moratorium perfectly while the real winning argument, say the insurer's own pre-authorisation contradicting its final settlement, never appears.

None of these is "low quality" in the general sense. Each is a specific, nameable failure. That is the point: **once a failure has a name, you can write a test for it.**

## Turning each failure into a check

We ended up with nine evaluators, each guarding against one family of mistakes. The rule of thumb: **use code wherever the answer can be computed, and a model only where it needs judgement.** Code doesn't drift, costs nothing to run and explains itself.

### Does the money add up?

*Arithmetic reconciliation* is the clearest example of a check that is pure code. It builds a worksheet with two columns that never mix:

- **Ground truth ceilings**, taken only from the documents (or from a human-verified label): the gross bill, what the insurer paid, the total deductions, the policy's sub-limits, the sum insured left.
- **What the AI claimed**, collected from every place the report states a recovery: the headline figure, the assessment total, the sum of the deduction table, the payout estimate and the prose.

Then it asks plain questions. Is the recovery at least zero and below every ceiling? Does no line claim back more than was deducted? Do fair deductions show ₹0 recoverable? Is conservative ≤ most likely ≤ optimistic? Do all five places agree to within ₹1?

A worked example. The bill was ₹1,00,000 and the insurer paid ₹60,000, so the customer is ₹40,000 out of pocket. A ₹4,000 co-pay is fair, which leaves a contestable pool of ₹36,000. A good report says ₹36,000 everywhere. A bad one says ₹48,000 (more than the customer lost), or ₹36,000 in the table and ₹40,000 in the summary. The check names the exact ceiling breached and the exact rupee gap, so the reviewer doesn't have to redo the maths.

### Did it count the days right?

*Timeline arithmetic* exists because of one kind of case we saw often, and could usually win. Take a customer who first bought a policy on 1 Jan 2021, ported it to a new insurer on 1 Jan 2024, and was admitted to hospital on 1 Jul 2024. The new insurer rejects the claim under a 24-month waiting period, counting six months from the port date.

But porting carries continuity. Counted from the original 2021 start, she had 42 months (1,277 days) of cover. The waiting period was long over. That is the whole case.

If our agent made the insurer's mistake, it would argue the wrong thing. So the check runs in steps: is a timeline relevant to this rejection at all? Are the dates present in the documents? Recompute the elapsed time independently. Apply the porting rules. Confirm each date is grounded in a document.

### Is this argument allowed here?

*Clause applicability* catches the agent being too clever. Some arguments are powerful, but only in the right case. The check first classifies the rejection (non-disclosure, pre-existing disease, waiting period, other), then allows an argument only where the facts permit it:

- The moratorium argument only for non-disclosure rejections.
- Causal nexus only when the rejection cites a pre-existing condition and the illness treated is unrelated.
- Portability continuity only on ported policies.
- A pre-existing-disease waiver rider only if the rider is actually active.

An argument that does not apply is not neutral. It tells the reader you are throwing everything at the wall.

### The rest of the suite

| Evaluator | The question it answers |
| --- | --- |
| Source grounding | Is every fact and number traceable to a document? |
| Arithmetic reconciliation | Is the recovery possible, within limits and consistent everywhere? |
| Timeline arithmetic | Are waiting periods and dates computed from the right start? |
| Internal consistency | Do the summary, body, numbers and next steps agree? |
| Clause applicability | Is each legal or policy argument valid for this case? |
| Schedule extraction | Were sub-limits, room rent, co-pay and riders found and cited, with any neutralising rider early in the report? |
| Cross-document contradiction | When documents disagree on a date, diagnosis or amount, does the report flag it, citing both? |
| Argument ordering | Are all expected counter-arguments covered, with the strongest first? |
| Writing quality | Does each point run claim, sourced fact, clause, conclusion, without generic regulatory filler? |

Not every check is about deep accuracy. Some are plain sanity checks, and that is fine: a cheap check that never misses is worth more than a clever one that sometimes does.

## Only review what fails

The checks were not the breakthrough on their own. The breakthrough was changing who looks at what.

We put the evaluators together into a gate we called **reportQC**, a report quality and grounding gate that every case report passes through before anyone sees it. A report that passes every check goes out. A report that fails goes to a human, with the failing check and its one-line reason at the top: *"Recovery ₹48,000 exceeds net out-of-pocket ₹40,000 by ₹8,000."*

That changes the reviewer's job. Before, it was *read the whole report and find what's wrong*. After, it was *here is the one thing that's wrong; fix it or overrule the check*. Average human time per case went from about 40 minutes to about 4.

<figure class="diagram">
<svg viewBox="0 0 760 302" role="img" aria-label="Humans only see reports that fail a check" font-size="13">
  <defs><marker id="qc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-arrowhead"/></marker></defs>
  <text x="24" y="34" font-size="15" font-weight="600" class="d-ink">Humans only see reports that fail a check</text>
  <g class="d-line" fill="none" stroke-width="1.25">
    <path d="M184 110H210" marker-end="url(#qc-arrow)"/>
    <path d="M370 110H393" marker-end="url(#qc-arrow)"/>
    <path d="M517 110H553" marker-end="url(#qc-arrow)"/>
    <path d="M455 148V226" marker-end="url(#qc-arrow)"/>
    <path d="M560 252H633V136" marker-end="url(#qc-arrow)"/>
    <path d="M350 252H290V136" stroke-dasharray="4 4" marker-end="url(#qc-arrow)"/>
  </g>
  <rect x="24" y="84" width="160" height="52" rx="8" class="d-box"/>
  <text x="104" y="107" text-anchor="middle" font-weight="600" class="d-ink">Agents draft report</text>
  <text x="104" y="124" text-anchor="middle" font-size="11.5" class="d-quiet">reads every document</text>
  <rect x="210" y="84" width="160" height="52" rx="8" class="d-box d-accent"/>
  <text x="290" y="107" text-anchor="middle" font-weight="600" class="d-ink">reportQC gate</text>
  <text x="290" y="124" text-anchor="middle" font-size="11.5" class="d-quiet">9 evaluators run</text>
  <polygon points="393,110 455,72 517,110 455,148" class="d-box"/>
  <text x="455" y="114" text-anchor="middle" class="d-ink">All pass?</text>
  <rect x="553" y="84" width="160" height="52" rx="8" class="d-box"/>
  <text x="633" y="107" text-anchor="middle" font-weight="600" class="d-ink">Report goes out</text>
  <text x="633" y="124" text-anchor="middle" font-size="11.5" class="d-quiet">to the customer</text>
  <rect x="350" y="226" width="210" height="52" rx="8" class="d-box"/>
  <text x="455" y="249" text-anchor="middle" font-weight="600" class="d-ink">Human reviews one issue</text>
  <text x="455" y="266" text-anchor="middle" font-size="11.5" class="d-quiet">failing check shown first</text>
  <text x="535" y="102" text-anchor="middle" font-size="11.5" class="d-quiet">yes</text>
  <text x="465" y="174" font-size="11.5" class="d-quiet">no</text>
  <text x="643" y="212" font-size="11.5" class="d-quiet">fix or overrule</text>
  <text x="280" y="212" text-anchor="end" font-size="11.5" class="d-quiet">new failure becomes</text>
  <text x="280" y="228" text-anchor="end" font-size="11.5" class="d-quiet">a new check</text>
</svg>
</figure>

Passing reports go straight out. Failing ones reach a person with the reason attached, and every new kind of failure a reviewer catches becomes a new check.

### What the gate looked like in practice

The live version was more than a list of checks. A report was shown as a draft while an inspector agent went to work in a sandbox. It downloaded the customer's original uploads, ran the checks, and searched the web for every act, regulator circular and policy clause the report cited. Then it marked the report *Certified* or *Needs review*.

Three things we learned the hard way:

- **A model inspector misses what code catches.** The failure an LLM inspector missed most often was a rupee figure that appeared in no document. So that one became a deterministic gate in front of it.
- **"We didn't check" is not "it's fine".** An inspector that skipped its web search, or a citation as vague as "the Insurance Act", turned into false alarms that blocked good reports. We started recording where every defect came from (the report, or the inspector) and every defect had to quote the exact words in the report it objected to. A check the inspector could not complete showed as unverified, never as green and never as a block.
- **Don't let the checker quietly fix the work.** At first the inspector patched the report itself. We stopped that. Fixes became suggestions a person previews, then applies or dismisses. If the grader edits what it grades, you no longer know what you are measuring.

## The uncomfortable part: we were grading the report against itself

In October 2026 I sat down and audited our own evals as if someone else had built them. The line I wrote at the top: **the checks themselves are not the bottleneck. Truth is.**

### Most checks measured agreement, not correctness

Look again at arithmetic reconciliation. It checks the recovery against the bill total, the amount paid and the deductions. But where did those numbers come from? From our own pipeline reading the documents. If the pipeline misread the bill total, every ceiling moved with it, and the report passed. A report could pass every check while being built on a misread bill.

Most of the suite had the same blind spot. Internal consistency, cross-surface agreement, ordering: all of them asked *does the report agree with itself?* Almost none asked *is the report right?*

### We measured what was easy, not what mattered

When I lined the checks up against the stages of the pipeline, the coverage was upside down. Prose quality was the best-measured thing we had. Reading the documents correctly, computing the recovery, and the real outcome (did the customer actually get paid?) were barely measured. Prose is easy to check without labels. What matters needs labels, and we had almost none: a handful of eval cases, none with verified answers.

### The graders had bugs too

Evals are code, and code has bugs. A few we found:

- A structure check passed if the report contained the words *claim*, *bill*, *policy* and *next step* anywhere. That is true of every report we ever generated.
- When the judge model crashed, the result was recorded as a pass.
- The judge only saw the first 4,000 characters of the report, so it never read the recommendations at the end.
- Different judges scored on 1–5 and on 0–100, and the numbers were mixed together.

### A comparison rigged without anyone meaning to

We also compared our reports with a competitor's, using a model as the judge. Ours was always shown as "Report A", and we never swapped the order. The judge came from the same model family that wrote our reports. Every one of those biases points somewhere, and together they make the result unreadable.

### A good score can hide the worst error

One report scored 0.94 on grounding: almost every fact traced to a document. It also contained an Ombudsman deadline the agent had invented, and a timeline argument built on a date nobody had verified. An average score made a fabricated legal deadline look comparable to a slightly unclear sentence. After that we split errors into **critical**, which block a report no matter what, and everything else, which goes on a reviewer's checklist.

### Fixing the prompt stopped working

Our most common piece of reviewer feedback was the agent citing the moratorium clause where it did not apply. The rule against it was already in the prompts in at least four places, in capitals, with warning symbols and the word NEVER. It made no difference. Our prompts had grown so large that adding rule number N+1 no longer changed behaviour.

The answer we moved to was the opposite: **deletion beats instruction.** Instead of telling the model not to use an argument, code decided which rules it could even see for this type of rejection. The clause-applicability check then confirmed it.

### Nobody was running it

The simplest finding was the most embarrassing. We had built a human-review loop for labelling eval cases, and it was never used. The suite did not run automatically. So when the underlying model changed over August and September, nothing told us whether reports got better or worse. Meanwhile real truth sat unused in the database: customers correcting our reports, and actual recovered amounts on closed claims.

## Getting to the truth

If the problem is truth, the fix is not more checks. It is a small amount of real ground truth, used carefully.

### Labels come from the documents, not from the report

The obvious way to build a gold set is to show an expert our report and ask them to correct it. That is the wrong way. The expert anchors on what the report says and fixes the edges. So we wrote the rule down: **labels come from the documents, not from the pipeline output.** The expert reads the policy, the bills and the letters cold, and writes down what the right answer is before seeing ours.

It is slow. We estimated 20 to 30 minutes of expert time per case, with two people agreeing on each one. Our plan was a gold set of 30 to 40 cases. That sounds tiny next to a model benchmark. For a product like ours, 40 cases where you truly know the answer beat 4,000 where you don't.

### Calibrate the judge before you trust it

A model judge is a measuring instrument, and you would not trust a thermometer you have never checked. Before a judge's verdict counts, we planned to:

- ask it narrow yes-or-no questions instead of scores out of 100;
- measure how often it agrees with humans on cases we have labelled, separately for passes and for fails;
- swap the order whenever it compares two things;
- use a judge from a different model family to the one doing the work.

Real outcomes, like what the insurer eventually paid, are used to calibrate, not as pass or fail. A claim can be lost for reasons that have nothing to do with the quality of the report.

### Two things only evals could have shown us

**Our agent was reading half-blind.** Our reports were noticeably worse than a general coding agent given the same PDFs. When we dug in, the reason was structural: our agent mostly saw summaries and paraphrases of the documents, not the documents. On one cataract case, the insurer had rejected the claim as *senile* cataract while the hospital records described something else. The old pipeline never mentioned the word "senile" and never cited the exclusion clause that decided the case, even though the policy wording was sitting in its prompt. Once it could read the actual pages, it raised both. You do not find that by reading the prompt. You find it by comparing outputs on real cases.

**Our caution was costing customers money.** We quote customers a likely recovery range before they pay. An eval of those estimates showed that across 39 judged cases, the model never once rated its confidence as high, so almost every customer saw a range starting at ₹0. The cause was one line in the prompt, *err low*, which mixed up how sure it was about a deduction with how careful it should be about money. Our first fix overshot the other way. The lesson we wrote down: **settle it with labels, not with more prompt edits.**

### Lock every fix

The rule we ended with: no change to a prompt or the pipeline merges without a before-and-after scorecard attached. A bug a reviewer finds becomes a case in the set, so it gets fixed once and stays fixed.

## What I would do from day one next time

1. **Log every human correction from the first customer.** What was wrong, where, and how the reviewer spotted it. This log is your error analysis, your eval set and your roadmap.
2. **Name failures before you measure them.** Read 50 real outputs and group the mistakes. Write a check only for a failure that has a name.
3. **Use code wherever the answer can be computed.** Numbers, dates, limits and "is this in the document" are code. Save model judges for real judgement, and calibrate them first.
4. **Get ten cases of true ground truth, labelled from the source documents.** Ten real labels beat a hundred checks that compare the output to itself.
5. **Separate critical from cosmetic.** One invented deadline should block a report on its own, not be averaged away.
6. **Make "did not check" visible.** A skipped or crashed check is not a pass.
7. **Run it on every change, automatically.** An eval nobody runs is documentation.
8. **Pick a metric the business feels.** Ours was human minutes per case: it captured quality, cost and scale in one number.

## Evals are the product spec

The biggest shift for me was realising that evals are not a testing task you hand to engineering at the end. They are the most precise statement of what the product is supposed to do.

A PRD can say *"the report should be accurate and persuasive."* An eval has to say which amounts must appear in which documents, which arguments are allowed for which kind of rejection, and when a recovery figure is simply impossible. Writing those checks forced us to decide what *good* meant, case by case, more sharply than any document we wrote. Every time we could not write a check, it was because we had not really understood the job yet.

It also changed the economics. The checks are what let a person spend 4 minutes on a case instead of 40. That is the difference between a service that needs more people for every new customer and a product that does not.

And the uncomfortable part taught me the rest. A wall of green checks feels like quality. But if every check compares the report to itself, you are only measuring how consistent your mistakes are. The question an eval has to answer is the one the customer is quietly asking, and the one the claims officer asks when they pick up the report: **can I trust this?** You only know that by going back to the documents and, eventually, to what actually happened.

Gaido AI wound down in September 2026. The company is gone; these lessons are the part I carry forward. If I were starting an AI product tomorrow, the first thing I'd build, before the agent gets clever, is the log of every mistake it makes, and a way to know which of its answers are true.
