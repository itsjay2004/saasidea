// ────────────────────────────────────────────────────────────────────────────
// Launch directory dataset — powers /launch-directories.
//
// A curated, hand-maintained list of places to launch a SaaS / startup. Kept as
// a typed data file (not a DB table) on purpose: it's an editorial list, so
// version control + full server-render (best SEO) beats a migration + query.
// Mirrors the faq-data.ts convention.
//
// `locked: true` rows are the gated half — surfaced in the ItemList JSON-LD
// (crawlable) and shown blurred behind an unlock CTA; a free account reveals
// them all. DR figures are approximate third-party estimates, shown as "est.".
// ────────────────────────────────────────────────────────────────────────────

export type LaunchCategory =
  | 'Launch platforms'
  | 'Communities'
  | 'SaaS & software'
  | 'AI tool directories'
  | 'Startup directories'
  | 'Review platforms'
  | 'Press & media'
  | 'Funding & accelerators'
  | 'Design showcases'

export type LaunchCost = 'Free' | 'Freemium' | 'Paid'
export type LaunchTraffic = 'Low' | 'Medium' | 'High' | 'Very High'

export interface LaunchDirectory {
  /** Display name. */
  name: string
  /** Destination — where a founder actually submits. */
  url: string
  category: LaunchCategory
  /** Approximate domain rating (0–100), third-party estimate. */
  dr: number
  /** Whether the backlink you earn is dofollow (passes SEO equity). */
  dofollow: boolean
  cost: LaunchCost
  traffic: LaunchTraffic
  /** One-line: what it is / why it matters. */
  description: string
  /** Our insider submission tip — the editorial value-add. */
  tip: string
  /** Gated behind account / purchase (rendered but blurred). */
  locked?: boolean
}

// Grouped by category, recognizable/high-authority first. The free (unlocked)
// entries lead each group; the rest form the "there's a lot more" upsell.
export const LAUNCH_DIRECTORIES: LaunchDirectory[] = [
  // ── Launch platforms ──────────────────────────────────────────────────────
  { name: 'Product Hunt', url: 'https://www.producthunt.com/', category: 'Launch platforms', dr: 91, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'The default launch stage for new products — a top spot means real traffic and signups.', tip: 'Launch 12:01am PST, line up 15–20 genuine supporters beforehand, and reply to every comment in the first 3 hours.' },
  { name: 'BetaList', url: 'https://betalist.com/', category: 'Launch platforms', dr: 74, dofollow: true, cost: 'Freemium', traffic: 'High', description: 'Showcases pre-launch startups to an audience of early adopters hunting for the new thing.', tip: 'Submit while still in beta with a waitlist live — the free queue is slow, so apply 4–6 weeks ahead.' },
  { name: 'Peerlist Launchpad', url: 'https://peerlist.io/launchpad', category: 'Launch platforms', dr: 68, dofollow: true, cost: 'Free', traffic: 'Medium', description: 'Weekly launch competition on a fast-growing professional network for builders.', tip: 'Launches run as a weekly leaderboard — submit Monday to maximise your time at the top.' },
  { name: 'Uneed', url: 'https://www.uneed.best/', category: 'Launch platforms', dr: 58, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'A friendlier, lower-competition Product Hunt alternative with a daily featured slot.', tip: 'The free slot works, but a paid "Pro" spot guarantees a dofollow link and homepage feature.' },
  { name: 'Fazier', url: 'https://fazier.com/', category: 'Launch platforms', dr: 55, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Modern launch board with embeddable badges for social proof and a dofollow backlink.', tip: 'Grab the "Featured on Fazier" badge for your landing page — the embed itself is a dofollow link back.' },
  { name: 'DevHunt', url: 'https://devhunt.org/', category: 'Launch platforms', dr: 60, dofollow: true, cost: 'Free', traffic: 'Medium', description: 'Product Hunt for developer tools, run by and for the dev-tooling community.', tip: 'Only submit genuinely dev-facing products — lead with the API/CLI; this crowd smells marketing instantly.', locked: true },
  { name: 'Microlaunch', url: 'https://microlaunch.net/', category: 'Launch platforms', dr: 52, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Indie-focused launch platform built for small makers shipping small products.', tip: 'Low competition means you can top the daily leaderboard with modest effort — pair with a same-day PH launch.', locked: true },
  { name: 'Openhunts', url: 'https://www.openhunts.com/', category: 'Launch platforms', dr: 63, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Open launch directory with dofollow listings and a growing maker audience.', tip: 'Newer board, so listings still rank fast — submit early to ride the domain\'s growth.', locked: true },
  { name: 'Aura', url: 'https://www.aura.build/', category: 'Launch platforms', dr: 71, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Launch + landing-page tool whose directory carries strong domain authority.', tip: 'The dofollow badge on a DR-70+ domain is the real prize here — embed it even if referral clicks are modest.', locked: true },
  { name: 'EarlyHunt', url: 'https://www.earlyhunt.com/', category: 'Launch platforms', dr: 57, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'Early-adopter launch board for pre- and just-launched products.', tip: 'Batch this with the other quick dofollow boards on your launch-week backlink run.', locked: true },
  { name: 'TinyLaunch', url: 'https://www.tinylaunch.com/', category: 'Launch platforms', dr: 48, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'One product launched per day — win the day and you own the homepage for 24h.', tip: 'Because only one launches daily, timing beats votes. Book a quiet weekday.', locked: true },
  { name: 'PeerPush', url: 'https://peerpush.net/', category: 'Launch platforms', dr: 45, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'Maker-to-maker launch and cross-promotion network with dofollow listings.', tip: 'Its real value is cross-promotion — swap shout-outs with other makers launching the same week.', locked: true },
  { name: 'Hot100', url: 'https://hot100.io/', category: 'Launch platforms', dr: 52, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Free launch leaderboard ranking trending new products.', tip: 'Free and dofollow — a no-brainer add to the launch-day submission batch.', locked: true },
  { name: 'BetaPage', url: 'https://betapage.co/', category: 'Launch platforms', dr: 60, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Discovery platform for new startups and products aimed at early adopters.', tip: 'Upgrade for the featured slot only if launching same-week; the free listing still gives the backlink.', locked: true },
  { name: 'Launching Next', url: 'https://www.launchingnext.com/', category: 'Launch platforms', dr: 52, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Directory of new and upcoming startups — a quick, evergreen dofollow listing.', tip: 'Fast to submit and dofollow — knock it out in your batch of easy-backlink directories.', locked: true },
  { name: 'The Startup Pitch', url: 'https://thestartuppitch.com/', category: 'Launch platforms', dr: 50, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Free self-serve platform to publish your startup pitch and story.', tip: 'Write it as a real pitch, not a listing — a good story here gets shared beyond the directory.', locked: true },

  // ── Communities ───────────────────────────────────────────────────────────
  { name: 'Hacker News (Show HN)', url: 'https://news.ycombinator.com/show', category: 'Communities', dr: 90, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'A front-page "Show HN" sends a firehose of technical, high-intent traffic your way.', tip: 'Title = plain description, no hype. Post 8–10am ET on a weekday and answer every comment like an engineer.' },
  { name: 'Reddit — r/SaaS', url: 'https://www.reddit.com/r/SaaS/', category: 'Communities', dr: 91, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Where SaaS founders and buyers swap tools, tactics, and honest feedback.', tip: 'Give value for weeks first. When you post, frame it as "I built this to fix X," never a launch announcement.' },
  { name: 'Indie Hackers', url: 'https://www.indiehackers.com/', category: 'Communities', dr: 78, dofollow: true, cost: 'Free', traffic: 'High', description: 'The home of bootstrapped founders — great for sharing your build story and getting feedback.', tip: 'Milestone posts ("$1k MRR", "first 100 users") outperform launches. Tell the story, drop the link at the end.' },
  { name: 'Reddit — r/SideProject', url: 'https://www.reddit.com/r/SideProject/', category: 'Communities', dr: 91, dofollow: false, cost: 'Free', traffic: 'High', description: 'The friendliest subreddit for showing off a project and getting early users.', tip: 'This crowd forgives rough edges but rewards a clear demo — lead with a 30-second Loom or GIF.' },
  { name: 'Dev.to', url: 'https://dev.to/', category: 'Communities', dr: 90, dofollow: false, cost: 'Free', traffic: 'High', description: 'Huge developer publishing community — a good "how I built it" post ranks for months.', tip: 'Write a genuine build/tech post, not an ad. Set canonical_url to your own blog to keep the SEO juice.', locked: true },
  { name: 'Lobsters', url: 'https://lobste.rs/', category: 'Communities', dr: 72, dofollow: false, cost: 'Free', traffic: 'Medium', description: 'Invite-only, high-quality tech community — small but sharp, engaged readers.', tip: 'You need an invite to post. Tag correctly and only share genuinely technical content or you\'ll get flagged.', locked: true },
  { name: 'Quora', url: 'https://www.quora.com/', category: 'Communities', dr: 93, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Answer "best tool for X" questions where your product is a genuine fit for evergreen traffic.', tip: 'Answer 5–10 relevant questions helpfully with your tool as one option — never copy-paste the same pitch.', locked: true },
  { name: 'Designer News', url: 'https://www.designernews.co/', category: 'Communities', dr: 80, dofollow: false, cost: 'Free', traffic: 'Medium', description: 'Community for designers — ideal for design-, UI-, or creative-tooling products.', tip: 'Only a fit for design-led products. Lead with the visuals; this crowd judges on craft.', locked: true },
  { name: 'GrowthHackers', url: 'https://community.growthhackers.com/', category: 'Communities', dr: 70, dofollow: false, cost: 'Free', traffic: 'Medium', description: 'Marketing and growth community that upvotes actionable, data-backed posts.', tip: 'Share a real growth experiment with numbers, not a launch — the community rewards tactics over promotion.', locked: true },
  { name: 'WIP', url: 'https://wip.co/', category: 'Communities', dr: 55, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'A maker community built around public to-do lists and building in public.', tip: 'Use it before launch — build in public here for weeks so you have a warm audience on ship day.', locked: true },
  { name: 'Makerlog', url: 'https://getmakerlog.com/', category: 'Communities', dr: 54, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Ship-logging community where makers post daily progress and cheer each other on.', tip: 'Log tasks consistently for a few weeks first — visible momentum earns you a launch-day crowd.', locked: true },
  { name: 'Reddit — r/Entrepreneur', url: 'https://www.reddit.com/r/Entrepreneur/', category: 'Communities', dr: 91, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Massive general founder community — broad reach, but strict on self-promotion.', tip: 'Post in the weekly "Share Your Startup" thread, not the main feed, or you\'ll be removed.', locked: true },
  { name: 'Slashdot', url: 'https://slashdot.org/', category: 'Communities', dr: 90, dofollow: false, cost: 'Free', traffic: 'Medium', description: 'Veteran tech-news community with a large, skeptical, technical readership.', tip: 'Only "news for nerds" gets through — pitch a genuinely technical or newsworthy angle to the editors.', locked: true },

  // ── SaaS & software ───────────────────────────────────────────────────────
  { name: 'AlternativeTo', url: 'https://alternativeto.net/', category: 'SaaS & software', dr: 88, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Massive "alternatives to X" site — being listed under a big incumbent is evergreen traffic.', tip: 'Add yourself as an alternative to 2–3 incumbents, then ask a few users to "like" it so it ranks.' },
  { name: 'SaaSHub', url: 'https://www.saashub.com/', category: 'SaaS & software', dr: 72, dofollow: true, cost: 'Freemium', traffic: 'High', description: 'Software marketplace and alternatives directory with strong, durable SEO.', tip: 'List as an alternative to a well-known competitor — those "X alternatives" pages rank and send steady traffic.' },
  { name: 'Slant', url: 'https://www.slant.co/', category: 'SaaS & software', dr: 80, dofollow: true, cost: 'Free', traffic: 'Medium', description: 'Crowdsourced "what is the best X?" recommendations that rank well on Google.', tip: 'Find the "best tools for ___" question you answer and add your product with a real pros list.' },
  { name: 'StackShare', url: 'https://stackshare.io/', category: 'SaaS & software', dr: 82, dofollow: false, cost: 'Freemium', traffic: 'High', description: 'Where teams share their tech stacks — great exposure for dev-tools and infra products.', tip: 'Add your own tool to your public stack first; it seeds the listing with real usage context.', locked: true },
  { name: 'Sourceforge', url: 'https://sourceforge.net/', category: 'SaaS & software', dr: 92, dofollow: true, cost: 'Freemium', traffic: 'Very High', description: 'Old-guard software directory with enormous authority and a dofollow business listing.', tip: 'The free business listing gets you a high-DR dofollow link fast — fill it out even if clicks are low.', locked: true },
  { name: 'Softpedia', url: 'https://www.softpedia.com/', category: 'SaaS & software', dr: 88, dofollow: true, cost: 'Freemium', traffic: 'High', description: 'Long-established software catalogue with a high-authority dofollow listing.', tip: 'Submit via their "add product" form; approval is slow but the DR-88 dofollow link is worth the wait.', locked: true },
  { name: 'SaaSworthy', url: 'https://www.saasworthy.com/', category: 'SaaS & software', dr: 70, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'SaaS discovery and comparison platform with category leaderboards.', tip: 'Claim your listing and fill every field — completeness alone pushes you up the rankings for free.', locked: true },
  { name: 'SpotSaaS', url: 'https://www.spotsaas.com/', category: 'SaaS & software', dr: 50, dofollow: true, cost: 'Free', traffic: 'Low', description: 'SaaS comparison directory with category pages and free listings.', tip: 'Free dofollow listing — quick win; add it to your batch of low-effort backlink submissions.', locked: true },
  { name: 'Toolfio', url: 'https://toolfio.com/', category: 'SaaS & software', dr: 59, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'Curated tools directory with dofollow listings for makers and SaaS.', tip: 'Newer directory — listings still index quickly, so submit while its authority is climbing.', locked: true },
  { name: 'Feedough', url: 'https://www.feedough.com/', category: 'SaaS & software', dr: 55, dofollow: true, cost: 'Free', traffic: 'Medium', description: 'Startup and business content site with a tools directory.', tip: 'Pitch a guest article over a plain listing — the in-content dofollow link is worth far more.', locked: true },

  // ── AI tool directories ───────────────────────────────────────────────────
  { name: "There's An AI For That", url: 'https://theresanaiforthat.com/', category: 'AI tool directories', dr: 78, dofollow: false, cost: 'Freemium', traffic: 'Very High', description: 'The largest AI-tools directory — a must-submit if your product has any AI angle.', tip: 'The free queue is long; a paid submission lists you in days. Nail the one-line "what it does" — that\'s all people read.' },
  { name: 'Futurepedia', url: 'https://www.futurepedia.io/', category: 'AI tool directories', dr: 72, dofollow: false, cost: 'Freemium', traffic: 'High', description: 'High-traffic AI tools directory with strong category and search discovery.', tip: 'Pick the single most accurate category — mis-categorising buries you where buyers never look.' },
  { name: 'Toolify', url: 'https://www.toolify.ai/', category: 'AI tool directories', dr: 70, dofollow: true, cost: 'Freemium', traffic: 'High', description: 'Large AI directory with a dofollow link on paid listings and solid organic traffic.', tip: 'Free listing is nofollow; the paid tier gives dofollow + placement. Worth it for AI products chasing SEO.' },
  { name: 'Future Tools', url: 'https://www.futuretools.io/', category: 'AI tool directories', dr: 68, dofollow: false, cost: 'Freemium', traffic: 'High', description: "Matt Wolfe's hand-curated AI directory with a large, engaged newsletter behind it.", tip: 'Curation is manual and selective — submit only a genuinely useful, polished tool or it won\'t make the cut.', locked: true },
  { name: 'TopAI.tools', url: 'https://topai.tools/', category: 'AI tool directories', dr: 55, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Fast-growing AI directory with generous free listings and a dofollow option.', tip: 'Submit early — newer directories rank their listings fast while still building out categories.', locked: true },
  { name: 'AI Scout', url: 'https://aiscout.net/', category: 'AI tool directories', dr: 50, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Searchable AI tools index with tags and use-case filtering.', tip: 'Tag aggressively but accurately — its traffic comes from long-tail use-case searches.', locked: true },
  { name: 'OpenTools', url: 'https://opentools.ai/', category: 'AI tool directories', dr: 52, dofollow: true, cost: 'Free', traffic: 'Medium', description: 'Community-driven AI tool directory with free dofollow listings.', tip: 'Free and dofollow — a no-brainer submit for any AI product; just don\'t expect huge referral volume.', locked: true },
  { name: 'Insidr AI', url: 'https://www.insidr.ai/ai-tools/', category: 'AI tool directories', dr: 55, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'AI directory paired with a content site and newsletter for extra reach.', tip: 'Ask about a bundled newsletter mention when you submit — the list is where the real clicks come from.', locked: true },
  { name: 'aitools.fyi', url: 'https://aitools.fyi/', category: 'AI tool directories', dr: 55, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Growing AI tools directory with search and category discovery.', tip: 'Keep your one-liner keyword-rich — it\'s what the on-site search matches against.', locked: true },
  { name: 'Easy With AI', url: 'https://easywithai.com/', category: 'AI tool directories', dr: 58, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Curated AI directory with editorial write-ups and a newsletter.', tip: 'The featured write-up carries a dofollow link and a newsletter mention — the paid slot pays off for AI products.', locked: true },
  { name: 'Supertools', url: 'https://supertools.therundown.ai/', category: 'AI tool directories', dr: 60, dofollow: false, cost: 'Free', traffic: 'Medium', description: 'Curated AI tools list tied to a huge AI newsletter audience.', tip: 'Getting listed here can mean a newsletter mention to a large list — pitch the novel use-case, not features.', locked: true },

  // ── Startup directories ───────────────────────────────────────────────────
  { name: 'Crunchbase', url: 'https://www.crunchbase.com/', category: 'Startup directories', dr: 91, dofollow: false, cost: 'Freemium', traffic: 'Very High', description: 'The reference database for companies — investors, journalists, and partners check it.', tip: 'Create a complete profile even pre-funding; a filled-out page adds instant legitimacy in due diligence.' },
  { name: 'Startup Stash', url: 'https://startupstash.com/', category: 'Startup directories', dr: 73, dofollow: true, cost: 'Freemium', traffic: 'High', description: 'Curated directory of startup tools and resources with strong evergreen traffic.', tip: 'Free submissions take months; the paid fast-track is reasonable and gets a lasting dofollow link.' },
  { name: 'StartupBlink', url: 'https://www.startupblink.com/', category: 'Startup directories', dr: 68, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Global startup ecosystem map and directory used by founders and researchers.', tip: 'Register your startup to appear on your city\'s map — a nice dofollow link plus local visibility.' },
  { name: 'Startup Ranking', url: 'https://www.startupranking.com/', category: 'Startup directories', dr: 70, dofollow: true, cost: 'Free', traffic: 'Medium', description: 'Ranks startups worldwide by web and social signals; free dofollow profile.', tip: 'Add their badge to your site to verify the listing — it unlocks the dofollow link back to you.' },
  { name: 'SideProjectors', url: 'https://www.sideprojectors.com/', category: 'Startup directories', dr: 55, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Marketplace + directory for side projects — list to show, sell, or find collaborators.', tip: 'Great for projects you might later sell — the listing doubles as a soft "for sale" signal.', locked: true },
  { name: 'Startup Buffer', url: 'https://startupbuffer.com/', category: 'Startup directories', dr: 55, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'Startup discovery directory with a straightforward submission flow.', tip: 'Low-effort dofollow link — batch it with Launching Next and similar in one session.', locked: true },
  { name: 'Startups.fyi', url: 'https://startups.fyi/', category: 'Startup directories', dr: 45, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'Curated directory of new startups and the tools behind them.', tip: 'Submit with a crisp one-liner; curated directories reject vague "all-in-one platform" pitches.', locked: true },
  { name: 'Startup Inspire', url: 'https://www.startupinspire.com/', category: 'Startup directories', dr: 55, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'Gallery-style directory of startups for inspiration and discovery.', tip: 'A clean screenshot matters most here — it\'s browsed visually, so lead with your best UI shot.', locked: true },
  { name: 'Startup Tracker', url: 'https://startuptracker.io/', category: 'Startup directories', dr: 48, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Directory tracking new and funded startups with free profiles.', tip: 'Quick free listing — add it to your launch-week backlink batch and move on.', locked: true },
  { name: 'Awesome Indie', url: 'https://awesomeindie.com/', category: 'Startup directories', dr: 50, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Directory of indie-made products and resources for bootstrappers.', tip: 'A good fit signal for the indie audience — pair the listing with an Indie Hackers post.', locked: true },
  { name: '10words', url: 'https://10words.io/', category: 'Startup directories', dr: 55, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Directory that describes each product in exactly ten words — forces a sharp pitch.', tip: 'Spend real effort on the ten words; the constraint makes a great tagline you can reuse everywhere.', locked: true },
  { name: 'StartupLister', url: 'https://www.startuplister.com/', category: 'Startup directories', dr: 42, dofollow: true, cost: 'Paid', traffic: 'Low', description: 'Done-for-you service that submits your startup to dozens of directories.', tip: 'Only worth it to save time — you can hit the high-value directories yourself for free with this list.', locked: true },

  // ── Review platforms ──────────────────────────────────────────────────────
  { name: 'G2', url: 'https://www.g2.com/', category: 'Review platforms', dr: 90, dofollow: false, cost: 'Freemium', traffic: 'Very High', description: 'The B2B software review giant — category pages rank #1 and drive high-intent buyers.', tip: 'Claim your profile free, then run a short review drive; even 5 reviews unlocks category visibility.' },
  { name: 'Capterra', url: 'https://www.capterra.com/', category: 'Review platforms', dr: 89, dofollow: false, cost: 'Freemium', traffic: 'Very High', description: 'Gartner-owned software marketplace with massive buyer traffic and category listings.', tip: 'Free listing gets you found; only pay-per-click once you know your numbers. Reviews are the real lever.' },
  { name: 'Trustpilot', url: 'https://www.trustpilot.com/', category: 'Review platforms', dr: 93, dofollow: false, cost: 'Freemium', traffic: 'Very High', description: 'Consumer-trust review platform whose widgets and stars lift conversion and brand SERPs.', tip: 'Automate a review invite after a positive moment (successful onboarding) — steady stars beat a one-time push.' },
  { name: 'GetApp', url: 'https://www.getapp.com/', category: 'Review platforms', dr: 88, dofollow: false, cost: 'Freemium', traffic: 'High', description: 'Gartner-network directory — one profile can syndicate across Capterra + Software Advice.', tip: 'Because it shares Gartner\'s network, a single reviews push can lift you on three sites at once.', locked: true },
  { name: 'Software Advice', url: 'https://www.softwareadvice.com/', category: 'Review platforms', dr: 85, dofollow: false, cost: 'Freemium', traffic: 'High', description: 'Gartner-network advisory site connecting buyers with software recommendations.', tip: 'Same Gartner backend as Capterra/GetApp — claim all three together and consolidate your reviews.', locked: true },
  { name: 'TrustRadius', url: 'https://www.trustradius.com/', category: 'Review platforms', dr: 82, dofollow: false, cost: 'Freemium', traffic: 'High', description: 'In-depth B2B reviews trusted by enterprise buyers doing serious evaluation.', tip: 'Reviews here are long-form — send it to your most articulate power users, not your whole list.', locked: true },
  { name: 'Gartner Peer Insights', url: 'https://www.gartner.com/reviews/', category: 'Review platforms', dr: 88, dofollow: false, cost: 'Freemium', traffic: 'High', description: 'Enterprise review platform carrying real weight with corporate buyers.', tip: 'Reviews are vetted and slow, but a handful of verified enterprise reviews is gold for B2B credibility.', locked: true },
  { name: 'Product Hunt Reviews', url: 'https://www.producthunt.com/', category: 'Review platforms', dr: 91, dofollow: false, cost: 'Free', traffic: 'High', description: 'Reviews on your PH page keep it alive and discoverable long after launch day.', tip: 'Ask launch-day supporters to leave a review, not just an upvote — reviews keep the page ranking for your brand.', locked: true },

  // ── Press & media ─────────────────────────────────────────────────────────
  { name: 'Medium', url: 'https://medium.com/', category: 'Press & media', dr: 95, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Publish your launch/build story on a DR-95 domain and tap relevant publications.', tip: 'Submit to a niche Medium publication in your space — their followers get your post, multiplying reach.' },
  { name: 'Hackernoon', url: 'https://hackernoon.com/', category: 'Press & media', dr: 82, dofollow: false, cost: 'Freemium', traffic: 'High', description: 'Tech publishing platform reaching a large developer/founder readership.', tip: 'Pitch a genuinely useful "how/why" story, not a press release — editors reject thinly veiled ads.' },
  { name: 'Failory', url: 'https://www.failory.com/', category: 'Press & media', dr: 72, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Startup publication known for founder interviews and post-mortems.', tip: 'Pitch an honest founder-story interview — the dofollow link plus the story beats any plain listing.' },
  { name: 'EU-Startups', url: 'https://www.eu-startups.com/', category: 'Press & media', dr: 72, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Leading European startup news site with a directory and paid feature options.', tip: 'If you\'re EU-based, the "Startup of the Week" submission is cheap, credible PR — pitch a regional angle.', locked: true },
  { name: 'KillerStartups', url: 'https://www.killerstartups.com/', category: 'Press & media', dr: 68, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Long-running startup review site offering write-ups and dofollow features.', tip: 'The paid review reads like editorial and gives a dofollow link — decent launch-week credibility boost.', locked: true },
  { name: 'Springwise', url: 'https://www.springwise.com/', category: 'Press & media', dr: 78, dofollow: false, cost: 'Free', traffic: 'Medium', description: 'Innovation-spotting publication that covers novel, world-first ideas.', tip: 'Only pitch a genuinely novel angle — they cover innovation, not yet-another SaaS. Lead with the "first" claim.', locked: true },
  { name: 'All Top Startups', url: 'https://alltopstartups.com/', category: 'Press & media', dr: 62, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'Startup blog + directory covering tools, tactics, and new launches.', tip: 'Pitch a guest post over a plain listing — the in-content dofollow link is worth far more.', locked: true },
  { name: 'TechCrunch', url: 'https://techcrunch.com/', category: 'Press & media', dr: 93, dofollow: false, cost: 'Paid', traffic: 'Very High', description: 'The biggest startup-news outlet — a mention is aspirational PR, not a quick submit.', tip: 'No submission form works; you need a real news hook (funding, big launch) and a warm reporter intro.', locked: true },
  { name: 'VentureBeat', url: 'https://venturebeat.com/', category: 'Press & media', dr: 90, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Major tech-news outlet covering AI, enterprise, and startups.', tip: 'Pitch a data-driven trend story you can comment on — reporters want an angle, not a product.', locked: true },
  { name: 'The Next Web', url: 'https://thenextweb.com/', category: 'Press & media', dr: 90, dofollow: false, cost: 'Freemium', traffic: 'Very High', description: 'International tech publication with a startup program and coverage.', tip: 'Their "TNW Programs" is the realistic route for smaller startups — the newsroom rarely covers cold pitches.', locked: true },
  { name: 'Entrepreneur', url: 'https://www.entrepreneur.com/', category: 'Press & media', dr: 92, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Large business publication with contributor articles and founder features.', tip: 'The realistic path is a contributor network or HARO quote — cold newsroom pitches almost never land.', locked: true },
  { name: 'Betabound', url: 'https://www.betabound.com/', category: 'Press & media', dr: 62, dofollow: true, cost: 'Free', traffic: 'Medium', description: 'Beta-tester community that connects pre-launch products with eager testers.', tip: 'List your beta to recruit testers who actually give feedback — schedule it weeks before public launch.', locked: true },

  // ── Funding & accelerators ────────────────────────────────────────────────
  { name: 'Wellfound (AngelList)', url: 'https://wellfound.com/', category: 'Funding & accelerators', dr: 90, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Startup + talent marketplace — a profile helps with hiring, investors, and discovery.', tip: 'Even solo, post a "founding engineer/first hire" role — it keeps your profile active and surfaced.' },
  { name: 'Y Combinator (Launch YC)', url: 'https://www.ycombinator.com/launches', category: 'Funding & accelerators', dr: 90, dofollow: false, cost: 'Free', traffic: 'Very High', description: "YC's launch board and Startup Directory — huge authority and founder eyeballs.", tip: 'Launch YC is for YC companies, but the Startup Directory and Startup School are open — join for the profile and network.' },
  { name: 'F6S', url: 'https://www.f6s.com/', category: 'Funding & accelerators', dr: 80, dofollow: false, cost: 'Free', traffic: 'High', description: 'Founder network for accelerators, grants, and startup programs.', tip: 'Use it less for traffic, more for applications — many accelerators and grants run intake through F6S.' },
  { name: 'Gust', url: 'https://gust.com/', category: 'Funding & accelerators', dr: 76, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Platform connecting startups with angel investors and accelerator programs.', tip: 'Build the profile to look investor-ready even if you\'re bootstrapping — it doubles as a dofollow link.', locked: true },
  { name: 'StartupXplore', url: 'https://startupxplore.com/', category: 'Funding & accelerators', dr: 60, dofollow: true, cost: 'Free', traffic: 'Low', description: 'European startup and investor community with company profiles.', tip: 'Strongest for EU startups seeking investor visibility — complete the funding fields to get surfaced.', locked: true },
  { name: 'Kickstarter', url: 'https://www.kickstarter.com/', category: 'Funding & accelerators', dr: 92, dofollow: false, cost: 'Free', traffic: 'Very High', description: 'Crowdfunding giant — best for hardware or community-funded launches.', tip: 'Only for products people pre-pay for; a strong video and the first 48 hours make or break the campaign.', locked: true },
  { name: 'Indiegogo', url: 'https://www.indiegogo.com/', category: 'Funding & accelerators', dr: 90, dofollow: false, cost: 'Free', traffic: 'High', description: 'Flexible crowdfunding platform for products and creative projects.', tip: 'More flexible funding rules than Kickstarter — good if you can\'t hit an all-or-nothing goal.', locked: true },
  { name: 'SeedTable', url: 'https://www.seedtable.com/', category: 'Funding & accelerators', dr: 60, dofollow: true, cost: 'Freemium', traffic: 'Low', description: 'European startup newsletter and directory tracking notable companies.', tip: 'Getting into a SeedTable roundup means a mention to an investor-heavy newsletter — pitch the growth angle.', locked: true },

  // ── Design showcases ──────────────────────────────────────────────────────
  { name: 'Land-book', url: 'https://land-book.com/', category: 'Design showcases', dr: 78, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Landing-page gallery designers browse for inspiration — great if your site looks sharp.', tip: 'Only submit a genuinely polished landing page; a feature here sends design-savvy founder traffic.' },
  { name: 'Awwwards', url: 'https://www.awwwards.com/', category: 'Design showcases', dr: 90, dofollow: true, cost: 'Freemium', traffic: 'High', description: 'Prestigious web-design awards — a nomination is a strong credibility and backlink signal.', tip: 'Submissions are paid and judged hard; only enter if your site\'s design and interaction are truly top-tier.', locked: true },
  { name: 'One Page Love', url: 'https://onepagelove.com/', category: 'Design showcases', dr: 78, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Gallery dedicated to beautiful single-page websites and landing pages.', tip: 'Perfect for one-page SaaS sites — a free submission can earn a dofollow feature if the design impresses.', locked: true },
  { name: 'Httpster', url: 'https://httpster.net/', category: 'Design showcases', dr: 72, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Curated gallery of trend-setting website designs.', tip: 'Editorially curated — submit only distinctive, on-trend designs; generic templates get skipped.', locked: true },
  { name: 'CSS Design Awards', url: 'https://www.cssdesignawards.com/', category: 'Design showcases', dr: 80, dofollow: true, cost: 'Freemium', traffic: 'Medium', description: 'Web-design awards site recognising standout UI and creativity.', tip: 'A paid entry that, if it wins, gives a high-DR dofollow badge — reserve it for your most polished work.', locked: true },
  { name: 'Webflow Showcase', url: 'https://webflow.com/made-in-webflow', category: 'Design showcases', dr: 85, dofollow: false, cost: 'Free', traffic: 'Medium', description: 'Gallery of sites built in Webflow — free exposure if your site runs on it.', tip: 'Only relevant if you built on Webflow; publish to the showcase and tag it well for discovery.', locked: true },
  { name: 'SaaS Landing Page', url: 'https://saaslandingpage.com/', category: 'Design showcases', dr: 60, dofollow: true, cost: 'Free', traffic: 'Low', description: 'Gallery of SaaS landing pages used for design inspiration and teardown.', tip: 'A perfect-fit directory for SaaS specifically — a clean page earns a relevant dofollow link.', locked: true },
  { name: 'Dribbble', url: 'https://dribbble.com/', category: 'Design showcases', dr: 92, dofollow: false, cost: 'Freemium', traffic: 'Very High', description: 'Huge designer community — post product shots to reach designers and design-led founders.', tip: 'Post your UI as a shot with a link in the description; it works as soft exposure, not a direct-traffic play.', locked: true },
]

// ── Derived helpers ─────────────────────────────────────────────────────────

export const LAUNCH_CATEGORIES: LaunchCategory[] = [
  'Launch platforms',
  'Communities',
  'SaaS & software',
  'AI tool directories',
  'Startup directories',
  'Review platforms',
  'Press & media',
  'Funding & accelerators',
  'Design showcases',
]

export const freeDirectories = LAUNCH_DIRECTORIES.filter((d) => !d.locked)
export const lockedDirectories = LAUNCH_DIRECTORIES.filter((d) => d.locked)

/** A directory counts as "high traffic" for the traffic filter. */
export function isHighTraffic(d: LaunchDirectory): boolean {
  return d.traffic === 'High' || d.traffic === 'Very High'
}

/** Aggregate stats surfaced in the hero / stats bar. */
export const LAUNCH_STATS = {
  total: LAUNCH_DIRECTORIES.length,
  free: freeDirectories.length,
  locked: lockedDirectories.length,
  dofollow: LAUNCH_DIRECTORIES.filter((d) => d.dofollow).length,
  categories: LAUNCH_CATEGORIES.length,
  highDr: LAUNCH_DIRECTORIES.filter((d) => d.dr >= 80).length,
}

export function categoryCounts(): { category: LaunchCategory; count: number; free: number }[] {
  return LAUNCH_CATEGORIES.map((category) => {
    const inCat = LAUNCH_DIRECTORIES.filter((d) => d.category === category)
    return {
      category,
      count: inCat.length,
      free: inCat.filter((d) => !d.locked).length,
    }
  })
}
