---
title: "Amazon shouldn't block shopping agents. It should build them a front door."
description: Agents are coming whether Amazon likes it or not. The real question is on whose terms, and what a front door for other agents, and a great agent of its own, would look like.
date: 2026-10-23
kind: essay
tags: [agents, commerce, product]
summary:
  - "Amazon is fighting AI shopping agents in court and with blocks, but the first appeals ruling sided with the customer who sent the agent."
  - "Blocking won't hold: customers, industry standards and the law are all moving toward agents."
  - "Better: a front door. Agents identify themselves, earn tiers of trust, use a real agent checkout, and the customer approves the exact order."
  - "Build the best agent of its own, starting with weekly essentials, and give sellers agents that answer, price and negotiate within their rules."
---

## The fight, in one year

In March 2026 a federal judge ordered Perplexity to stop its Comet browser agent from shopping on Amazon. Amazon had argued that an AI agent logging into customers' accounts and placing orders was unauthorised access to its systems. Five months later, the Ninth Circuit lifted the order. Its reasoning was simple: it was the customer's own browser visiting Amazon, not Perplexity. The agent just did what the customer asked.

In between, Amazon added a rule to its agreement with sellers that any agent using its services must clearly identify itself as automated, and in September it blocked Meta's shopping assistant too. Its position, in its own words: third-party agents should "operate openly and respect service provider decisions" about whether to take part.

Most commentary frames this as a yes-or-no question. Should Amazon let AI agents shop on its site? I think that is the wrong question. Agents are coming whether Amazon likes it or not. The real question is **on whose terms**.

## What's actually being fought over

This is not really a fight about bots. It's a fight about who owns the moment a customer decides what to buy.

Today that moment happens on Amazon's pages. You search, you scroll past sponsored listings, you see "customers also bought", you compare a few options, you click. Every one of those steps is something Amazon designed and earns from. In 2025 Amazon's advertising business brought in more than $68 billion, and most of it still comes from sponsored product listings on its own marketplace.

An agent collapses all of that into one sentence: *"Reorder the dishwasher tablets, the cheapest pack with good reviews."* The agent doesn't see the banner, doesn't browse the carousel, and doesn't impulse-buy the thing next to the thing. It reads the page the way a script reads a page, picks, and pays.

So three things are at stake at once:

- **The ad business.** An agent that never looks at a sponsored listing makes sponsored listings worth less.
- **The customer relationship.** If you talk to your agent and not to Amazon, Amazon becomes a warehouse with an API, and the agent owns the customer.
- **Trust and liability.** When an agent logs into your account and buys the wrong thing, or gets tricked into buying something, whose problem is it?

## Amazon's case, taken seriously

It's easy to read Amazon's position as a company protecting its ad revenue. That's part of it. But there are real product reasons too, and a PM in Amazon's seat would have to answer every one of them.

- **Security.** When Amazon blocked Meta's Muse agent, it said the agent didn't identify itself and appeared to capture and store customer credentials (Meta disputes this). An agent holding your Amazon password is a new and very attractive target.
- **Fraud and abuse.** Bots that look like customers are already Amazon's oldest problem: scalpers, fake reviews, price scrapers. An anonymous agent is indistinguishable from all of them.
- **Liability.** If an agent misreads a size, orders forty of something, or follows a malicious instruction hidden on a product page, the customer will blame Amazon, not the agent.
- **The experience Amazon is accountable for.** Delivery promises, returns and A-to-Z guarantees assume Amazon knows who is buying and why. An agent in the middle breaks that chain.
- **The economics.** Amazon spent decades and billions building the discovery layer. Letting someone else's agent use the store for free while skipping everything that pays for it is not a deal any business would accept by default.

And Amazon is not against agents. It is building its own: Rufus, its shopping assistant, and Buy for Me, which goes the other direction and lets Amazon's agent buy from other brands' websites. Amazon wants to be the agent, not the warehouse behind someone else's.

### What Amazon actually loses, and what it gains

I worked through this as a product case recently: should Amazon let an agent shop end to end, from the first request to payment and delivery? Walking the customer journey (search, browse, add to cart, order, return) makes the trade-offs concrete. Amazon loses three things:

- **The upsell.** Ask an agent for tissue paper and you get tissue paper. You don't get the "frequently bought together" basket that a human scrolls past and sometimes adds.
- **Ad impressions.** Brands pay for a human seeing a sponsored listing. They won't pay for an agent reading one.
- **Returns, if the agent guesses wrong.** If the agent's choice doesn't match what the customer actually wanted, returns go up and the experience gets worse, even though nothing technically went wrong.

But it gains something just as valuable: **wallet share on everything people buy again and again.** An agent that knows a household runs through a pack of detergent every three weeks can refill it before anyone notices it's low. That order never gets the chance to go to a competitor or a quick-commerce app. Today Amazon competes for that purchase every single time. With a good agent, it simply keeps it.

## The agents' case

The argument on the other side is short and hard to beat: **the customer chose the agent.**

A browser is software that acts for you. So is a password manager, a price tracker, a screen reader. An AI agent is the same idea with more autonomy. When I tell my agent to buy something with my account, it is me buying it. That is roughly what the Ninth Circuit said: on the record so far, it is Amazon's users, not Perplexity, who are accessing the site.

There's also an awkward fact for Amazon. Its own Buy for Me agent shops on other retailers' websites, and some small retailers said they had started receiving orders through it without ever opting in. It is hard to argue that every site should get to decide whether agents can shop there, while running an agent that shops on sites that never decided.

And the customers are already there. Every big AI assistant is adding shopping. If the assistant someone uses every day can't buy from Amazon, that is a worse experience of Amazon, and over time a reason to shop somewhere the agent works.

## Why blocking won't hold

Amazon can win individual fights. It cannot win the trend, for three reasons.

1. **The law is drifting toward the user.** The Ninth Circuit's reasoning, that the user is the one acting, is narrow and the case isn't over. But it is the first appellate signal, and it points one way.
2. **Blocking is an arms race against your own customers.** Agents can run inside a real browser, on the customer's own machine, logged in as the customer. Every wall Amazon builds also adds friction for real people, and the agents get better at looking like real people.
3. **The rest of the industry is building the front door.** OpenAI and Stripe published an open protocol for agents to check out with merchants. Google proposed one for agents to carry a signed mandate from the user. Visa and Mastercard are building ways for a merchant to verify an agent before it pays. Cloudflare proposed a standard for agents to sign every request so a site can tell a trusted agent from a scraper. The plumbing for *known, accountable* agents is being built right now, with or without Amazon.

The pattern is familiar. Platforms that fight the way their customers want to use them tend to lose. The ones that win set the terms: publish the API, write the rules, take a cut.

There is also the cost of being late. This looks like a behaviour shift on the scale of desktop to mobile: people already book cabs by asking a voice assistant, without opening the app, when the stakes are low. Shifts like that reward whoever builds the habit first. Amazon has lived the other side of this. In India it arrived late to quick commerce and has been catching up to apps that taught people to expect groceries in ten minutes. Missing the move to agents would be the same mistake at a bigger scale.

## What I'd build as the Amazon PM

If I owned this problem at Amazon, I would stop asking "block or allow?" and build a front door for agents, on Amazon's terms. Most of it comes from things I have had to design for my own agents: an AI chief of staff that can send email on my behalf, and a system of agents that spend real money on ad tests. The same rules apply when the agent is spending a customer's money on Amazon.

**1. Agents must say who they are.** No anonymous agents at checkout. An agent identifies itself and signs its requests, the way Cloudflare and Visa are proposing. Amazon already asks this of agents in its agreement with sellers. Extend it to every agent that shops. Unidentified automation gets the scraper treatment; identified agents get the front door.

**2. Tiers of trust, not one switch.** Anyone identified can *read*: search, prices, reviews, delivery dates. Only verified agents can *act*, and only with a mandate from the customer. That keeps the cheap, useful part open and puts the controls where the money moves.

**3. A real agent checkout, not screen-scraping.** Give agents a structured way to build a cart and place an order. It is safer for everyone than an agent clicking through pages built for humans, and it means Amazon decides what an agent can and can't do.

**4. The customer approves the exact order.** Before anything is charged, the customer sees the actual item, quantity, price and delivery date, from Amazon, not the agent's summary of it, and taps yes. For routine orders, the customer can set standing rules instead: reorders below a set amount, only from these categories, at most once a week.

**5. Limits and a clear line on mistakes.** Spending caps per agent, easy revocation from the customer's account page, and a simple rule for who pays when an agent gets it wrong. If the order matched what the customer approved, it's the customer's order. If the agent acted outside its mandate, it's on the agent provider.

**6. A business model for agent traffic.** Agents skip the ads, so price the traffic directly. Options include a referral fee paid by the agent platform, paid placement inside the structured results agents receive (clearly labelled), or Prime perks that only work through verified agents. Amazon doesn't have to give up the economics of discovery. It moves them to a new surface.

**7. Keep the relationship.** Every order still sends Amazon's receipt, tracking and returns. The customer still knows it was Amazon that delivered, and still has Amazon's guarantee. That is the part of the relationship worth protecting, not the scroll past the banner ads.

<figure class="diagram">
<svg viewBox="0 0 760 304" role="img" aria-label="Nothing is charged until the customer approves the exact order" font-size="13">
  <defs><marker id="ag-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-arrowhead"/></marker></defs>
  <text x="24" y="34" font-size="15" font-weight="600" class="d-ink">Nothing is charged until the customer approves the exact order</text>
  <g class="d-line" fill="none" stroke-width="1.25">
    <path d="M174 112H196" marker-end="url(#ag-arrow)"/>
    <path d="M346 112H375" marker-end="url(#ag-arrow)"/>
    <path d="M499 112H536" marker-end="url(#ag-arrow)"/>
    <path d="M621 138V224" marker-end="url(#ag-arrow)"/>
    <path d="M437 150V224" marker-end="url(#ag-arrow)"/>
  </g>
  <rect x="24" y="86" width="150" height="52" rx="8" class="d-box"/>
  <text x="99" y="109" text-anchor="middle" font-weight="600" class="d-ink">Agent identifies</text>
  <text x="99" y="126" text-anchor="middle" font-size="11.5" class="d-quiet">signed, verified</text>
  <rect x="196" y="86" width="150" height="52" rx="8" class="d-box"/>
  <text x="271" y="109" text-anchor="middle" font-weight="600" class="d-ink">Builds the cart</text>
  <text x="271" y="126" text-anchor="middle" font-size="11.5" class="d-quiet">via agent checkout</text>
  <polygon points="375,112 437,74 499,112 437,150" class="d-box"/>
  <text x="437" y="110" text-anchor="middle" class="d-ink">Customer</text>
  <text x="437" y="126" text-anchor="middle" class="d-ink">approves?</text>
  <rect x="536" y="86" width="170" height="52" rx="8" class="d-box d-accent"/>
  <text x="621" y="109" text-anchor="middle" font-weight="600" class="d-ink">Order placed</text>
  <text x="621" y="126" text-anchor="middle" font-size="11.5" class="d-quiet">within the agent's limits</text>
  <rect x="536" y="224" width="170" height="52" rx="8" class="d-box"/>
  <text x="621" y="247" text-anchor="middle" font-weight="600" class="d-ink">Amazon's receipt</text>
  <text x="621" y="264" text-anchor="middle" font-size="11.5" class="d-quiet">tracking, returns, guarantee</text>
  <rect x="362" y="224" width="150" height="52" rx="8" class="d-box"/>
  <text x="437" y="247" text-anchor="middle" font-weight="600" class="d-ink">Nothing charged</text>
  <text x="437" y="264" text-anchor="middle" font-size="11.5" class="d-quiet">agent can revise</text>
  <text x="375" y="64" text-anchor="middle" font-size="11.5" class="d-quiet">sees Amazon's exact order</text>
  <text x="517" y="104" text-anchor="middle" font-size="11.5" class="d-quiet">yes</text>
  <text x="447" y="178" font-size="11.5" class="d-quiet">no</text>
</svg>
</figure>

The agent does the work; Amazon shows the customer the real order; only a yes moves money. Amazon keeps the receipt, the delivery promise and the guarantee. Here is what that could look like for the customer. *(These are concept designs to make the ideas concrete, not Amazon products, and they deliberately use no Amazon branding.)*

<div class="mockups">

<figure class="mock">
  <div class="phone">
    <div class="ph-status"><span>9:41</span><span class="ph-dots">● ● ●</span></div>
    <div class="ph-head"><span class="ph-avatar alt">A</span><div><strong>Approve this order?</strong><small>Requested by your assistant · <span class="ok">verified agent</span></small></div></div>
    <div class="ph-body">
      <div class="order">
        <div class="order-row"><span class="thumb"></span><div><strong>27" 4K monitor, USB-C</strong><small>Qty 1 · sold and shipped by the store</small></div></div>
        <dl>
          <div><dt>Price</dt><dd>₹24,990</dd></div>
          <div><dt>Delivery</dt><dd>Sat, 26 Oct</dd></div>
          <div><dt>Pay with</dt><dd>Card ending 4417</dd></div>
          <div><dt>Returns</dt><dd>10 days, store guarantee</dd></div>
        </dl>
      </div>
      <p class="note">This is the exact order, shown by the store, not the agent's summary. Nothing is charged until you approve.</p>
      <p class="warn">Above your agent's ₹5,000 limit, so it needs your OK.</p>
    </div>
    <div class="ph-actions"><span class="btn-ph primary">Approve</span><span class="btn-ph">Decline</span></div>
  </div>
  <figcaption><strong>Approve the exact order.</strong> Another company's agent built the cart. The store shows the real order, and only a yes moves money.</figcaption>
</figure>

<figure class="mock">
  <div class="phone">
    <div class="ph-status"><span>9:41</span><span class="ph-dots">● ● ●</span></div>
    <div class="ph-head plain"><div><strong>Agents with access</strong><small>Who can shop for you, and how much</small></div></div>
    <div class="ph-body">
      <ul class="agents">
        <li>
          <div class="ag-top"><strong>My assistant</strong><span class="pill ok">Can order</span></div>
          <small>Search · build carts · order with approval</small>
          <div class="meter"><span style="width:38%"></span></div>
          <small>₹1,900 of ₹5,000 this week</small>
          <span class="link">Change limits · Revoke</span>
        </li>
        <li>
          <div class="ag-top"><strong>Price tracker</strong><span class="pill">Read only</span></div>
          <small>Prices and delivery dates only</small>
          <span class="link">Revoke</span>
        </li>
        <li class="blocked">
          <div class="ag-top"><strong>Unidentified automation</strong><span class="pill bad">Blocked</span></div>
          <small>Didn't say who it is, so it can't sign in or buy</small>
        </li>
      </ul>
    </div>
  </div>
  <figcaption><strong>The customer stays in control.</strong> Known agents get tiers of trust and limits; unknown automation gets nothing. One place to see and revoke it all.</figcaption>
</figure>

</div>

### And build the best agent of its own

A front door for other agents only works if Amazon's own agent is the one customers would pick anyway. In the case, I argued for building it, and for being specific about where it starts.

**Not every purchase deserves the same autonomy.** I think of three levels:

1. **Co-pilot:** answers questions while the customer shops.
2. **Assistant:** searches, narrows the options and says *"here's what you need, take a quick look."*
3. **Full auto:** places the order without the customer looking at all.

Which level fits depends on two things: how often people buy the item, and how costly it is to get wrong.

<figure class="quad-fig">
  <figcaption><strong>Let the agent buy on its own only where purchases are frequent and cheap to get wrong</strong><span>How much autonomy Amazon's agent gets, by category</span></figcaption>
  <div class="quad">
    <div class="q-y">Cost of a wrong pick ↑</div>
    <div class="q-grid">
      <div class="q"><strong>Assistant</strong><span>Laptops, TVs, monitors</span><small>Compares and advises; the customer buys. Measured by conversion.</small></div>
      <div class="q q-empty"></div>
      <div class="q"><strong>Not yet</strong><span>Odd one-offs, e.g. car lubricant</span><small>Too rare to be worth automating.</small></div>
      <div class="q q-accent"><strong>Full auto</strong><span>Groceries, fresh food, essentials</span><small>A dynamic cart that refills before you run out. Measured by orders per customer per month.</small></div>
    </div>
    <div class="q-x">How often people buy it →</div>
  </div>
</figure>

- **Frequent, low-value: groceries, fresh food, household essentials.** This is where full auto earns its keep. The agent keeps a *dynamic cart* that learns a household's week, a vegetarian family in Bengaluru, say, and builds the next order: *"You're probably running low on these. Keep them in this week's order?"* Instead of scrolling, the customer just texts: *"Next time, add 3 kg of maida."*
- **Rare, high-value: laptops, TVs, monitors.** Being wrong is expensive, so the agent is an assistant, not a buyer. It compares specs, finds the best deal, checks other stores, and helps the customer decide. A human still presses buy.
- **Rare, low-value: the odd car lubricant.** Not worth automating yet.

**Where it lives.** In the Amazon app, as a plain chat, the pattern people already know from ChatGPT, Claude and Gemini. Not WhatsApp, which adds friction and pays a platform toll to Meta. Later, let people bring their preferences and memory from the assistants they already use.

**How people first try it.** Not at search, where intent is broad and an interruption just causes drop-off. The best moments are later in the journey:

- **While browsing:** someone looking at dosa batter gets *"Making dinner? Want me to put together the rest?"*
- **Right after checkout:** *"That took you 3 minutes. Next time, let me handle it."* This is the strongest moment: the customer has just felt the effort the agent would save.

<div class="mockups">

<figure class="mock">
  <div class="phone">
    <div class="ph-status"><span>9:41</span><span class="ph-dots">● ● ●</span></div>
    <div class="ph-head"><span class="ph-avatar">✦</span><div><strong>Shopping assistant</strong><small>Weekly essentials</small></div></div>
    <div class="ph-body">
      <div class="bubble agent">Your weekly order is ready. You're probably running low on these. Keep them in?</div>
      <ul class="cart">
        <li><span class="tick on"></span><span class="it">Toor dal<small>1 kg · usual brand</small></span><span class="pr">₹165</span></li>
        <li><span class="tick on"></span><span class="it">Detergent<small>2 L · runs out around Fri</small></span><span class="pr">₹399</span></li>
        <li><span class="tick on"></span><span class="it">Milk<small>1 L × 7</small></span><span class="pr">₹476</span></li>
        <li><span class="tick on"></span><span class="it">Maida <em class="tag">you asked</em><small>3 kg</small></span><span class="pr">₹180</span></li>
      </ul>
      <div class="bubble me">Swap the detergent for the liquid one</div>
      <div class="bubble agent">Done. Total is now ₹1,231. Arrives tomorrow, 7–9 am.</div>
    </div>
    <div class="ph-actions"><span class="btn-ph primary">Place order · ₹1,231</span><span class="btn-ph">Edit</span></div>
  </div>
  <figcaption><strong>The weekly cart.</strong> For frequent, low-value items the agent does the work and the customer confirms with one tap, or just texts a change.</figcaption>
</figure>

<figure class="mock">
  <div class="phone">
    <div class="ph-status"><span>9:41</span><span class="ph-dots">● ● ●</span></div>
    <div class="ph-body center">
      <div class="done">✓</div>
      <strong class="big">Order placed</strong>
      <small>Arrives tomorrow · 6 items</small>
      <div class="nudge">
        <strong>That took you 3 min 12 s.</strong>
        <span>Next time, let your assistant reorder staples like these. You'll see the cart before anything is charged.</span>
        <div class="nudge-actions"><span class="btn-ph primary">Turn on weekly refill</span><span class="btn-ph ghost">Not now</span></div>
      </div>
    </div>
  </div>
  <figcaption><strong>Ask right after checkout.</strong> The best moment to offer the agent is when the customer has just felt the effort it would save, not at search.</figcaption>
</figure>

</div>

**How to measure it.**

| | First 3 months | First year |
| --- | --- | --- |
| Focus | Grocery and essentials replenishment | Add high-value categories, broader catalogue |
| How autonomous | Dynamic cart, semi- to fully automatic | Full auto for staples; assistant for big purchases |
| Primary metric | Orders per customer per month | Orders per customer at scale, plus share of wallet |
| Guardrail | Return rate on agent orders | Ad revenue and upsell given up |

The first metric tests the core bet: that removing friction makes people buy more often. The return rate tells you whether the agent actually understands what people want. For big-ticket items, the measure that matters is conversion: did the assistant help someone go from browsing to buying?

## The other side: agents for sellers

So far this has been about the buyer's agent. But more than half of what's sold on Amazon comes from independent sellers, and they will want agents too. Amazon has already started: in 2024 it launched Seller Assistant, first codenamed Project Amelia, to help sellers with listings, inventory and account problems, with plans for it to take action on their behalf.

When buyers arrive through agents, a seller's job changes in four ways.

**1. Be readable by agents.** An agent doesn't see your banner image or your clever title. It reads the data: exact specs, real stock, a true delivery date, the return policy. A listing that leaves out the battery capacity simply loses to one that includes it. Being complete and accurate becomes the new search ranking, and a seller's agent can keep every listing that way.

**2. Answer buyer agents directly.** *"Does this charger support 65 W? Will it arrive by Friday in Pune?"* A seller's agent can answer every question instantly from the listing and the warehouse, day or night, instead of the buyer's agent guessing or moving on.

**3. Negotiate where it makes sense.** Amazon's prices for one-off purchases should stay fixed; nobody wants to haggle over toothpaste. But some orders are worth a conversation: a household's agent committing to two packs a month for a year, or an office ordering forty chairs. A seller's agent can accept those within rules the seller sets, like a subscription discount that negotiates itself, and never reveal the seller's lowest price.

**4. Run the shop.** Restock before a sell-out, adjust prices within a range, flag listings that agents keep returning to but not buying from, and read return reasons from agent orders, which are an unusually clear signal of where a listing misled someone.

There's one catch that makes this harder for Amazon than for anyone else. Amazon runs the market and also sells in it. If buyer agents and seller agents are going to negotiate inside Amazon, the rules they negotiate under, and the way offers are ranked, have to be visibly neutral between Amazon's own products and everyone else's. A front door only works if every seller trusts it as much as every buyer does.

Negotiation matters far more on second-hand marketplaces, where both sides are people and every price is up for discussion. [I wrote about that separately](/writing/when-both-sides-send-an-agent/).

<div class="mockups">

<figure class="mock">
  <div class="phone">
    <div class="ph-status"><span>9:41</span><span class="ph-dots">● ● ●</span></div>
    <div class="ph-head plain"><div><strong>Requests from buyer agents</strong><small>Handled by your seller assistant</small></div></div>
    <div class="ph-body">
      <ul class="agents">
        <li>
          <div class="ag-top"><strong>Detergent 2 L, 2 per month</strong><span class="pill ok">Accepted</span></div>
          <small>12-month commitment · ₹349 each (8% off)</small>
          <small>Within your subscription rules</small>
        </li>
        <li>
          <div class="ag-top"><strong>Office chair × 40</strong><span class="pill">Countered</span></div>
          <small>Asked ₹3,100 each · below your floor</small>
          <small>Agent offered ₹3,250 with free delivery</small>
          <span class="link">Review before it's final</span>
        </li>
        <li class="blocked">
          <div class="ag-top"><strong>Unverified agent</strong><span class="pill bad">Ignored</span></div>
          <small>Asked for your lowest price</small>
        </li>
      </ul>
      <p class="note">Your floor prices are never shared with buyers or their agents.</p>
    </div>
  </div>
  <figcaption><strong>Offers that negotiate themselves.</strong> Repeat and bulk orders get handled within the seller's rules; anything outside them waits for the seller.</figcaption>
</figure>

<figure class="mock">
  <div class="phone">
    <div class="ph-status"><span>9:41</span><span class="ph-dots">● ● ●</span></div>
    <div class="ph-head plain"><div><strong>How agents see this listing</strong><small>65 W USB-C charger</small></div></div>
    <div class="ph-body">
      <div class="order">
        <div class="ag-top"><strong>Agent-ready</strong><span class="pill">7 of 10</span></div>
        <div class="meter"><span style="width:70%"></span></div>
        <dl>
          <div><dt>Specs</dt><dd>Complete</dd></div>
          <div><dt>Stock</dt><dd>Live</dd></div>
          <div><dt>Delivery date</dt><dd>By pin code</dd></div>
        </dl>
      </div>
      <p class="warn">Missing: cable length, laptop compatibility list, warranty terms. Buyer agents asked about these 214 times this week.</p>
      <p class="note">Fill these in and buyer agents can answer their owners without guessing.</p>
    </div>
    <div class="ph-actions"><span class="btn-ph primary">Fill in with assistant</span></div>
  </div>
  <figcaption><strong>Readable by agents.</strong> Agents choose on data, not banners, so the seller's assistant shows what agents keep asking for and helps fill it in.</figcaption>
</figure>

</div>

## It's not just Amazon

Every business with a login is making the same decision this autumn, and the answers already look like the tiers above.

| Company | What it decided |
| --- | --- |
| JPMorgan Chase | Outside agents can't log in with a customer's banking credentials to move money or pay bills; read-only access, like a balance, is allowed |
| Charles Schwab | Blocking unauthorised agents that try to move client money |
| Delta | No third-party agent bookings without a partnership |
| Yelp | Non-human traffic only through its paid data licence |
| Shopify | Gives compatible assistants a direct checkout connection for its merchants |

The split is telling. The businesses that block are protecting a relationship and a revenue stream. The one that opened a front door, Shopify, sells software to merchants, and wins when they sell more, however the customer arrives.

The smart position is in between: **read freely, act only when known, accountable and approved.** That is the same rule I'd use for any agent touching money, mine included.

## The front door wins

Amazon's instinct to protect the store is right. Its tactic is wrong. A wall keeps agents out for a while; a front door decides how they come in.

If I were Amazon, I would want the default for every AI assistant to be: *when in doubt, buy from Amazon, because it's the one place where checkout just works, the customer stays in control, and Amazon still stands behind the order.* That is a better position than the one Amazon has today, not a worse one. It turns every agent into a sales channel instead of a threat.

Quick commerce won on delivery speed. Agentic commerce will win on something else: **plugging into the customer's mental to-do list**, so they never run out of the things they buy every week. Whoever gets there first keeps those orders for good, and Amazon is better placed than anyone to be that company, if it chooses to be the front door rather than the wall.

The companies that get this right will not be the ones with the best agent. They will be the ones that decide, early and clearly, how other people's agents get to do business with them.

## Sources

- [Amazon wins court order to block Perplexity's AI shopping agent](https://www.cnbc.com/2026/03/10/amazon-wins-court-order-to-block-perplexitys-ai-shopping-agent.html), CNBC, March 2026
- [Perplexity has successfully overturned Amazon's injunction on its AI shopping bot](https://www.engadget.com/2230471/perplexity-has-successfully-overturned-amazon-injunction-on-its-ai-shopping-bot/), Engadget, 4 August 2026
- [Ninth Circuit holds human user, not developer of AI agent, responsible for websites accessed](https://www.americanbar.org/groups/litigation/resources/newsletters/privacy-data-security/ninth-circuit-holds-human-user-not-developer-ai-agent-responsible-websites-accessed/), American Bar Association
- [Amazon shows Meta's Muse AI shopping agent the door](https://www.theregister.com/ai-and-ml/2026/09/21/amazon-shows-metas-muse-ai-shopping-agent-the-door/5297777), The Register, 21 September 2026
- [Amazon and JPMorgan are restricting AI agents for shopping and banking](https://winbuzzer.com/2026/10/20/website-blocks-limit-ai-agents-shopping-and-banking-xcxwbn/), WinBuzzer, 20 October 2026
- [Amazon's new AI agent rules shake up sellers](https://ppc.land/amazons-new-ai-agent-rules-shake-up-sellers-before-march-4-deadline/), PPC Land, on the Agent Policy effective March 2026
- [Amazon's annual ad revenue passes $68B](https://www.marketingdive.com/news/amazon-annual-ad-revenue-passes-68b-boosted-by-full-funnel-strategy/811569/), Marketing Dive
- [Brands are upset that Buy for Me is featuring their products without permission](https://www.modernretail.co/technology/brands-are-upset-that-buy-for-me-is-featuring-their-products-on-amazon-without-permission/), Modern Retail, January 2026
- [Amazon CEO expects to find ways to partner with third-party AI shopping agents](https://www.modernretail.co/technology/amazon-ceo-expects-to-find-ways-to-partner-with-third-party-ai-shopping-agents-in-the-future/), Modern Retail
- [Amazon unveils Project Amelia, an AI assistant for sellers](https://www.maginative.com/article/amazon-unveils-project-amelia-an-ai-assistant-for-sellers/), Maginative, September 2024
- [Stripe and OpenAI: Instant Checkout and the Agentic Commerce Protocol](https://stripe.com/newsroom/news/stripe-openai-instant-checkout), Stripe
