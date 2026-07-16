export type Boss = {
  slug: string;
  name: string;
  location: string;
  difficulty: "Normal" | "Hard" | "Endgame" | "Pinnacle";
  damageTypes: string[];
  weaknesses: string[];
  summary: string;
  phases: string[];
  keyMechanics: string[];
  recommendedBuilds: string[];
  rewards: string[];
  tips: string[];
  seoTitle?: string;
  seoDescription?: string;
  patchVersion?: string;
  lastUpdated?: string;
  faq?: { question: string; answer: string }[];
  relatedBuilds?: string[];
  relatedSkills?: string[];
  relatedBosses?: string[];
  relatedGuides?: { title: string; href: string }[];
  contentNotes?: string;
};

const bossRelatedContent: Record<
  string,
  {
    relatedBuilds: string[];
    relatedSkills: string[];
    relatedBosses: string[];
    relatedGuides: { title: string; href: string }[];
  }
> = {
  "count-geonor": {
    relatedBuilds: ["lightning-ranger", "earthshatter-warrior", "frost-monk"],
    relatedSkills: ["lightning-arrow", "earthshatter", "ice-strike"],
    relatedBosses: ["executioner", "fire-warden", "king-in-the-mists"],
    relatedGuides: [
      { title: "Lightning Arrow Guide", href: "/guides/skills/lightning-arrow" },
      { title: "Ice Spear Guide", href: "/guides/skills/ice-spear" },
      { title: "Frost Monk Guide", href: "/guides/builds/frost-monk" },
    ],
  },
  executioner: {
    relatedBuilds: ["lightning-ranger", "grenade-mercenary", "earthshatter-warrior"],
    relatedSkills: ["lightning-arrow", "explosive-grenade", "earthshatter"],
    relatedBosses: ["count-geonor", "endgame-titan", "chimera-abomination"],
    relatedGuides: [
      { title: "Lightning Arrow Guide", href: "/guides/skills/lightning-arrow" },
      { title: "Earthshatter Guide", href: "/guides/skills/earthshatter" },
      { title: "Lightning Ranger Guide", href: "/guides/builds/lightning-ranger" },
    ],
  },
  "fire-warden": {
    relatedBuilds: ["frost-monk", "infernal-witch", "lightning-ranger"],
    relatedSkills: ["ice-strike", "flame-wall", "ice-nova"],
    relatedBosses: ["count-geonor", "chimera-abomination", "king-in-the-mists"],
    relatedGuides: [
      { title: "Flame Wall Guide", href: "/guides/skills/flame-wall" },
      { title: "Ice Nova Guide", href: "/guides/skills/ice-nova" },
      { title: "Frost Monk Guide", href: "/guides/builds/frost-monk" },
    ],
  },
  "endgame-titan": {
    relatedBuilds: ["earthshatter-warrior", "poison-assassin", "grenade-mercenary"],
    relatedSkills: ["earthshatter", "poisonous-concoction", "explosive-grenade"],
    relatedBosses: ["executioner", "chimera-abomination", "count-geonor"],
    relatedGuides: [
      { title: "Earthshatter Guide", href: "/guides/skills/earthshatter" },
      { title: "Poison Arrow Guide", href: "/guides/skills/poison-arrow" },
      { title: "Lightning Arrow Guide", href: "/guides/skills/lightning-arrow" },
    ],
  },
  "chimera-abomination": {
    relatedBuilds: ["infernal-witch", "grenade-mercenary", "poison-assassin"],
    relatedSkills: ["flame-wall", "explosive-grenade", "poisonous-concoction"],
    relatedBosses: ["fire-warden", "endgame-titan", "king-in-the-mists"],
    relatedGuides: [
      { title: "Flame Wall Guide", href: "/guides/skills/flame-wall" },
      { title: "Poison Arrow Guide", href: "/guides/skills/poison-arrow" },
      { title: "Fireball Guide", href: "/guides/skills/fireball" },
    ],
  },
  "king-in-the-mists": {
    relatedBuilds: ["poison-assassin", "frost-monk", "infernal-witch"],
    relatedSkills: ["poisonous-concoction", "tempest-bell", "ice-strike"],
    relatedBosses: ["chimera-abomination", "count-geonor", "fire-warden"],
    relatedGuides: [
      { title: "Poison Arrow Guide", href: "/guides/skills/poison-arrow" },
      { title: "Ice Spear Guide", href: "/guides/skills/ice-spear" },
      { title: "Frost Monk Guide", href: "/guides/builds/frost-monk" },
    ],
  },
};

export const bosses: Boss[] = ([
  {
    slug: "count-geonor",
    name: "Count Geonor",
    location: "Ogham Manor",
    difficulty: "Hard",
    damageTypes: ["Physical", "Cold"],
    weaknesses: ["Fire damage", "Cold resistance", "Mobility"],
    summary:
      "A punishing early boss with fast melee chains, cold pressure, and arena control that teaches disciplined dodging.",
    phases: [
      "Human form focuses on sword combos, lunges, and close-range pressure.",
      "Wolf form adds faster movement, cold-infused attacks, and wider arena threats.",
      "Final pressure phase rewards patience and punishes panic rolling.",
    ],
    keyMechanics: [
      "Delayed melee swings catch early dodges.",
      "Cold hazards restrict safe movement paths.",
      "Transformation windows create short opportunities to recover or deal damage.",
    ],
    recommendedBuilds: [
      "Lightning Ranger Build",
      "Infernal Witch Build",
      "Earthshatter Warrior Build",
    ],
    rewards: [
      "Campaign progression",
      "Rare gear drops",
      "Early boss crafting currency",
    ],
    tips: [
      "Stay near mid-range so lunges are easier to read.",
      "Cap cold resistance before repeated attempts.",
      "Attack after completed combos rather than during windups.",
    ],
  },
  {
    slug: "executioner",
    name: "The Executioner",
    location: "The Gallows",
    difficulty: "Normal",
    damageTypes: ["Physical", "Bleed"],
    weaknesses: ["Evasion", "Stun recovery", "Ranged uptime"],
    summary:
      "A heavy-hitting melee boss built around axe slams, bleed pressure, and obvious but lethal attack windows.",
    phases: [
      "Opening phase uses slow cleaves and overhead chops.",
      "Below half health, slam patterns become faster and bleed uptime increases.",
      "Final phase adds tighter recovery windows between attacks.",
    ],
    keyMechanics: [
      "Large frontal cleaves punish standing still.",
      "Bleed effects make panic movement dangerous.",
      "Ground slams create clear punish windows after impact.",
    ],
    recommendedBuilds: [
      "Lightning Ranger Build",
      "Grenade Mercenary Build",
      "Frost Monk Build",
    ],
    rewards: ["Campaign loot", "Armor bases", "Weapon upgrade chances"],
    tips: [
      "Circle behind the boss after overhead attacks.",
      "Bring bleed removal or enough recovery to stabilize.",
      "Avoid attacking through axe windups.",
    ],
  },
  {
    slug: "fire-warden",
    name: "Fire Warden",
    location: "Ashen Keep",
    difficulty: "Hard",
    damageTypes: ["Fire", "Physical"],
    weaknesses: ["Cold damage", "Fire resistance", "High mobility"],
    summary:
      "A fire-based arena boss that layers burning ground, cone attacks, and add pressure to test positioning.",
    phases: [
      "Phase one alternates cone blasts and melee sweeps.",
      "Phase two adds burning ground patterns around the arena.",
      "Final phase summons adds while repeating empowered fire attacks.",
    ],
    keyMechanics: [
      "Burning ground limits safe standing zones.",
      "Cone telegraphs require lateral movement.",
      "Adds can trap low-mobility builds during fire patterns.",
    ],
    recommendedBuilds: [
      "Frost Monk Build",
      "Lightning Ranger Build",
      "Poison Assassin Build",
    ],
    rewards: ["Fire-themed rares", "Support gem drops", "Campaign unlocks"],
    tips: [
      "Raise fire resistance before the fight.",
      "Clear adds quickly before the arena becomes crowded.",
      "Save mobility skills for cone attacks and burning ground overlaps.",
    ],
  },
  {
    slug: "endgame-titan",
    name: "Endgame Titan",
    location: "Atlas Citadel",
    difficulty: "Endgame",
    damageTypes: ["Physical", "Lightning"],
    weaknesses: ["Armor", "Lightning resistance", "Sustained damage"],
    summary:
      "A late-game durability check with sweeping physical attacks, lightning detonations, and short burst windows.",
    phases: [
      "Initial phase tests spacing with wide cleaves and ground impact zones.",
      "Lightning phase creates delayed detonations that punish tunnel vision.",
      "Final phase combines both patterns with shorter recovery windows.",
    ],
    keyMechanics: [
      "Shock zones detonate after a delay.",
      "Sweeping attacks cover most of the boss front.",
      "Short stagger windows reward planned burst rotations.",
    ],
    recommendedBuilds: [
      "Earthshatter Warrior Build",
      "Poison Assassin Build",
      "Grenade Mercenary Build",
    ],
    rewards: ["Endgame rares", "Atlas progression", "High-tier currency"],
    tips: [
      "Do not stand in front unless a punish window is open.",
      "Prioritize lightning resistance and shock mitigation.",
      "Keep damage uptime steady instead of chasing risky burst windows.",
    ],
  },
  {
    slug: "chimera-abomination",
    name: "Chimera Abomination",
    location: "Vaal Laboratory",
    difficulty: "Endgame",
    damageTypes: ["Chaos", "Poison", "Physical"],
    weaknesses: ["Chaos resistance", "Cleanse effects", "Burst damage"],
    summary:
      "A chaotic endgame boss with poison pools, mutation attacks, and escalating damage over time pressure.",
    phases: [
      "Opening phase uses lunges, tail swipes, and poison projectiles.",
      "Mutation phase creates poison pools and faster combo strings.",
      "Enrage phase increases poison coverage and reduces safe space.",
    ],
    keyMechanics: [
      "Poison pools persist and can cut off escape routes.",
      "Tail attacks punish attacking from the rear for too long.",
      "Mutation casts are strong moments for ranged damage uptime.",
    ],
    recommendedBuilds: [
      "Infernal Witch Build",
      "Lightning Ranger Build",
      "Grenade Mercenary Build",
    ],
    rewards: ["Chaos gear", "Endgame crafting materials", "Rare jewels"],
    tips: [
      "Bring chaos resistance and poison recovery tools.",
      "Move poison pools to arena edges when possible.",
      "Burst during mutation casts, then reset your position.",
    ],
  },
  {
    slug: "king-in-the-mists",
    name: "King in the Mists",
    location: "Freythorn",
    difficulty: "Pinnacle",
    damageTypes: ["Chaos", "Cold", "Physical"],
    weaknesses: ["Chaos resistance", "Cold resistance", "Mechanic knowledge"],
    summary:
      "A pinnacle-style encounter that combines ritual mechanics, mist hazards, and high punishment for missed cues.",
    phases: [
      "Ritual phase introduces arena rules and targeted attacks.",
      "Mist phase reduces safe space and demands clean pathing.",
      "Final phase overlaps ritual attacks with faster mist pressure.",
    ],
    keyMechanics: [
      "Mist zones punish poor routing and delayed movement.",
      "Ritual cues must be handled before returning to damage.",
      "Mixed damage makes defensive balance more important than one resistance.",
    ],
    recommendedBuilds: [
      "Poison Assassin Build",
      "Frost Monk Build",
      "Infernal Witch Build",
    ],
    rewards: ["Pinnacle uniques", "High-value currency", "Endgame fragments"],
    tips: [
      "Learn arena cues before focusing on damage optimization.",
      "Keep both cold and chaos resistance high.",
      "Use builds with damage uptime while moving for safer progression.",
    ],
  },
] satisfies Boss[]).map((boss) => ({
  ...boss,
  summary: `${boss.summary} This page is written as a practical fight plan: read the arena, respect the most dangerous punish windows, and build around ${boss.damageTypes.join(
    " and ",
  )} mitigation before trying to optimize damage. ${boss.name} rewards clean movement more than greedy uptime, so the safest approach is to learn which attacks can be punished, which attacks must be avoided entirely, and when your build can reset without losing control of the arena.`,
  phases: [
    ...boss.phases,
    `Use the first thirty seconds to learn spacing rather than racing the health bar. Most deaths against ${boss.name} come from standing too close during an unread pattern, overcommitting after a small opening, or using a movement skill before the real danger appears.`,
    `The safest damage windows usually come after a completed combo, a committed slam, a projectile sequence, or a transition animation. If ${boss.name} is still turning, tracking, or charging an attack, treat the moment as unsafe even if the boss appears briefly stationary.`,
    `As the fight progresses, keep your route through the arena deliberate. Move toward open ground, avoid dragging hazards through the center, and leave yourself a clear escape path before spending cooldowns, flasks, or long cast animations.`,
    `For repeated attempts, judge progress by cleaner mechanics rather than only boss health. A run where you dodge the main lethal pattern three times in a row is usually closer to a kill than a run where high burst damage leaves you out of position.`,
  ],
  keyMechanics: [
    ...boss.keyMechanics,
    `${boss.name} should be approached from controlled mid-range unless your build is specifically designed to stand close. Mid-range gives enough room to identify frontal attacks while staying close enough to punish long recoveries.`,
    `The primary defensive check is ${boss.damageTypes.join(
      " and ",
    )} pressure. Upgrade resistances, recovery, guard uptime, armor, evasion, or ailment answers before adding more damage if deaths happen before the final phase.`,
    `Dangerous attacks are easiest to solve when you stop circling randomly. Pick a direction, watch the boss shoulders or cast animation, then dodge through the smallest safe lane instead of rolling repeatedly across the arena.`,
    `Builds with mobile damage have an advantage because they can keep pressure on ${boss.name} without planting during every opening. Bow skills, damage-over-time skills, grenades, slams with planned recovery, and cold control setups all work when played around the boss tempo.`,
    `Greedy burst is the main trap. Save your longest animation for stagger windows, transformation windows, add-clearing gaps, or moments immediately after a committed attack has missed.`,
    `If the arena starts to feel smaller, stop chasing the boss and fix positioning first. Resetting to open space often prevents a death more reliably than forcing one extra skill use.`,
  ],
  tips: [
    ...boss.tips,
    `Quick checklist: confirm your ${boss.damageTypes.join(
      " and ",
    )} defenses, keep a recovery flask available, enter the arena with a movement skill ready, and decide which single attack pattern you are going to punish before the pull begins.`,
    `Positioning rule: fight near open ground, not against walls or lingering hazards. Wall pressure makes even slow boss attacks harder to read because your dodge options collapse before you notice the next telegraph.`,
    `Common mistake: attacking during the windup because the boss looks vulnerable. Against ${boss.name}, the better habit is to wait for the attack to finish, count the recovery beat, then commit to one clean damage sequence.`,
    `Common mistake: treating every build the same. ${boss.recommendedBuilds.join(
      ", ",
    )}, and similar setups should adjust support gems, defensive flasks, and single-target skills around this encounter instead of using a pure mapping layout.`,
    `For ranged builds, move after each attack even when the boss is far away. Small sidesteps preserve distance and prevent the next lunge, projectile, or ground effect from starting on top of your character.`,
    `For melee builds, do not chase the boss through every movement pattern. Wait for an attack that leaves the boss committed, move to the side or rear, spend a short combo, then leave before the next tracking swing begins.`,
    `For damage-over-time builds, prioritize safe application windows. Refresh poisons, ignites, or lingering ground effects during recoveries, then spend the rest of the pattern moving rather than trying to face-tank for extra uptime.`,
    `If attempts stall, change one variable at a time: add a defensive support, raise the relevant resistance, shorten your damage sequence, or practice a single phase until the dangerous attack is no longer surprising.`,
  ],
  seoTitle: `${boss.name} Boss Guide - POE2 Mechanics and Tips`,
  seoDescription: `${boss.summary} Learn phases, weaknesses, damage types, rewards, recommended builds, FAQs, and practical POE2 fight tips.`,
  patchVersion: "Early Access",
  lastUpdated: "2026-07-16",
  faq: [
    {
      question: `Where do you find ${boss.name}?`,
      answer: `${boss.name} is listed in this guide at ${boss.location}. Use the location as the routing anchor, then prepare the fight before entering because boss attempts are usually easier when defenses, flask setup, and single-target supports are adjusted in town first.`,
    },
    {
      question: `What damage types does ${boss.name} use?`,
      answer: `${boss.name} is documented around ${boss.damageTypes.join(
        ", ",
      )} pressure. Those damage types should shape your defensive checklist: cap or raise the relevant resistances, improve recovery, and avoid lowering survivability just to add more damage before the encounter feels stable.`,
    },
    {
      question: `Which builds are recommended for ${boss.name}?`,
      answer: `${boss.recommendedBuilds.join(
        ", ",
      )}, and similar builds are good starting points because they can create damage windows while still respecting boss movement. The related build links on this page point toward setups that can be tuned for this fight instead of relying on generic mapping damage.`,
    },
    {
      question: `What is the safest strategy for ${boss.name}?`,
      answer: `Play the fight as a pattern test. Stay in controlled space, wait for ${boss.name} to finish a committed attack, spend one short damage sequence, and move again before the next telegraph. This rhythm is slower than pure burst, but it prevents most avoidable deaths.`,
    },
    {
      question: `Why am I dying repeatedly to ${boss.name}?`,
      answer: `Repeated deaths usually come from one of three problems: entering with weak ${boss.damageTypes.join(
        " or ",
      )} defenses, dodging before the real attack releases, or attacking through windups that should be treated as danger signals. Fix the defensive gap first, then shorten your punish windows until the fight feels readable.`,
    },
    {
      question: `When should I change skills or supports for ${boss.name}?`,
      answer: `Change skills or supports when the boss survives long enough that mapping links stop feeling useful. Add more single-target damage, safer range, ailment control, stun recovery, or mobility if the current setup clears packs well but cannot maintain safe uptime against ${boss.name}.`,
    },
  ],
  relatedBuilds: bossRelatedContent[boss.slug]?.relatedBuilds ?? [],
  relatedSkills: bossRelatedContent[boss.slug]?.relatedSkills ?? [],
  relatedBosses: bossRelatedContent[boss.slug]?.relatedBosses ?? [],
  relatedGuides: bossRelatedContent[boss.slug]?.relatedGuides ?? [],
  contentNotes:
    "AI-assisted placeholder boss guide data. Verify phase names, rewards, damage types, and patch-specific mechanics with current gameplay before final publication.",
}));

export function getBossBySlug(slug: string) {
  return bosses.find((boss) => boss.slug === slug);
}
