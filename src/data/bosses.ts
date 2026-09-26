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
    relatedBuilds: ["lightning-ranger", "grenade-mercenary", "earthshatter-warrior", "poison-assassin"],
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

// Only this encounter bypasses the shared expansion below.
const countGeonorEncounter: Pick<
  Boss,
  "summary" | "weaknesses" | "phases" | "keyMechanics" | "recommendedBuilds" |
  "rewards" | "tips" | "faq" | "seoDescription" | "lastUpdated"
> = {
  summary:
    "Count Geonor closes the Ogham Manor campaign encounter with sword pressure, a wolf transformation, and cold hazards. Prepare for a fight that changes rhythm: readable melee openings give way to mist, incoming charges, and less room to focus only on damage.",
  weaknesses: [
    "Cold resistance",
    "Life and physical-hit protection",
    "Recovery and movement speed",
  ],
  phases: [
    "Opening encounter: read the sword before committing. Geonor can alternate between human and wolf actions before the later transformation, so do not treat every change of shape as the end of a phase. Watch the direction of the next attack and keep enough room beside you to move off its line.",
    "Sword sequences: a brief pause between swings is not the same as a completed combo. Stop attacking when he starts preparing another strike. Once the sequence has finished, use a short attack or cast, then look at his posture again. Increase the length of that opening only after you can repeat it without trading hits.",
    "Transformed encounter: the larger wolf brings cold pressure and faster repositioning. A landing or charge can change where your next safe shot comes from. Follow the arena, not just the health bar; when the space ahead becomes hazardous, abandon the intended attack and move to a clearer angle.",
    "Mist sequence: smaller enemies compete for your attention while Geonor threatens charges from outside clear view. Listen for his voice cues, clear enough enemies to retain movement space, and watch for the incoming attack. Treat this as a survival sequence rather than chasing the boss into obscured ground.",
  ],
  keyMechanics: [
    "Sword lunge and frontal pressure: step away from the line he is facing when the attack commits. Retreating straight backward can leave you in the same corridor. A lateral move into open ground is a better starting response than holding the attack button and hoping distance alone will protect you.",
    "Slams and landing attacks: leave the marked or threatened area rather than rolling in place. An animation can finish while a ground effect remains dangerous. Before punishing the landing, look at your character's feet and your exit path; a safe destination matters more than the dodge animation itself.",
    "Cold breath and ground pressure: move out of the threatened lane and stop trying to finish a long damage sequence. Do not circle blindly through a cold effect to reach his back. Recover your position first, then decide whether there is still time to attack before the next action.",
    "Mist charges: voice lines are useful warning cues, but avoid relying on a memorized second count. Keep the next charge in mind while clearing the smaller enemies. Repeated panic rolls can leave you committed when you actually need to change direction; use deliberate movement and respond to the incoming threat.",
    "Cold and physical damage require different answers. Cold resistance helps with cold hits, but it does not make sword attacks harmless. Likewise, evasion or armour alone should not be treated as permission to stand in ground hazards. Keep life and recovery in the plan alongside the relevant resistance.",
  ],
  recommendedBuilds: [
    "Lightning Ranger: use short bow sequences after the sword or wolf attack has resolved. Lightning Arrow can help with grouped smaller enemies, but stop clearing long enough to read a mist charge. Place any optional damage setup only when the arena gives you time to finish it.",
    "Earthshatter Warrior and other deliberate melee setups: wait for Geonor to finish a committed action before stepping in. Begin with one attack rather than a complete damage sequence. If he moves away, let the missed opportunity go instead of following through a cold hazard to recover it.",
    "Frost Monk and other close-range control setups: treat chill or freeze as help when it occurs, not a guaranteed opening. Maintain a plan for the next attack even when the boss appears controlled. Avoid committing a long combo on the assumption that the control will outlast your animation.",
    "Poison or persistent-damage setups: apply damage when the boss is accessible, then prioritize survival during movement-heavy patterns. Do not stand in danger to refresh an effect early. A ground-based damage zone only helps while Geonor remains in it, so be willing to reposition it after he moves.",
  ],
  rewards: [
    "Campaign progression beyond the Ogham Manor encounter.",
    "Encounter loot varies; do not plan a build around a guaranteed named drop from this fight.",
  ],
  tips: [
    "Before entering, inspect cold resistance, life, recovery, and movement speed. If one equipment swap creates an attribute or resistance gap elsewhere, repair that gap first. Carry a skill arrangement you can sustain through more than the opening sword exchanges.",
    "For a first clear, choose one recovery window to practice. Avoid adding several utility actions to it at once. If a single bow shot or melee attack is consistently safe, try another action on a later attempt; if you are hit, return to the shorter sequence.",
    "After taking a hit, stop trying to recover lost damage immediately. Move into visible open space, use recovery when needed, and rejoin the fight after the next committed attack. Staying in front of Geonor while watching your life bar can turn one mistake into a second hit.",
    "If mist repeatedly ends the attempt, practice prioritizing the charge over the smaller enemies. Remove enemies that block your movement, but do not chase the last survivor across the safe area. Keep enough attention on Geonor's cues to interrupt your own attack sequence.",
    "If you survive but run out of recovery, identify which part of the encounter causes repeated chip damage. Losing resources to sword exchanges calls for shorter openings; struggling with cold pressure calls for both resistance and better pathing. Buying damage alone may leave the same failure unchanged.",
  ],
  lastUpdated: "2026-09-26",
  seoDescription:
    "Prepare for Count Geonor in Ogham Manor: sword openings, wolf and mist pressure, cold defenses, and practical ranged or melee responses.",
  faq: [
    {
      question: "Where is this Count Geonor encounter?",
      answer: "This guide covers the campaign fight in Ogham Manor. Use the campaign arena as the context for the strategy rather than assuming a later encounter variant has identical damage or timing.",
    },
    {
      question: "Should I change my build to fire damage?",
      answer: "Not simply because cold is prominent in the fight. Start by making your current skill dependable and protecting your character from incoming damage. Changing your entire damage plan can cost more than correcting positioning, resistance, or a weak weapon.",
    },
    {
      question: "What should I do during the mist?",
      answer: "Keep space to move, remove nearby enemies that threaten to surround you, and listen for the boss's cues. Be ready to stop attacking and avoid a charge. Do not follow him into poor visibility just to maintain damage.",
    },
    {
      question: "Is maximum range safest for a bow character?",
      answer: "Not automatically. You still need to see the approach and have a clear path beside you. Choose a distance where you can read Geonor and land a short sequence without being pushed against an edge or into a hazard.",
    },
    {
      question: "When can a slow melee build attack?",
      answer: "Start after a committed sequence or landing has finished and the ground is safe. Use a short punish, then reassess. Missing an opening is better than chasing him into the next cold pattern while locked in a long animation.",
    },
    {
      question: "How does this differ from practicing The Executioner?",
      answer: "The habit of waiting for a committed attack still transfers, but Geonor adds changing forms, cold pressure, and mist distractions. Keep the disciplined timing while learning those separate responses rather than reusing one dodge rhythm for the entire fight.",
    },
  ],
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
      "Learn how to beat The Executioner in POE2 by recognizing his committed attacks, keeping a clear dodge route, and using recovery windows for damage. This Executioner boss guide focuses on positioning and short, repeatable attack sequences.",
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
      "For a Poison Assassin setup, apply poison after a committed attack finishes, then reposition while it deals damage. Do not extend an attack sequence just to refresh poison during the next windup; use the related Poison Assassin Build guide to plan application and defenses.",
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
  lastUpdated: boss.slug === "executioner" ? "2026-09-18" : "2026-07-16",
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
  ...(boss.slug === "count-geonor" ? countGeonorEncounter : {}),
}));

export function getBossBySlug(slug: string) {
  return bosses.find((boss) => boss.slug === slug);
}
