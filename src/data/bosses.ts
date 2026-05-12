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
  contentNotes?: string;
};

const bossRelatedContent: Record<
  string,
  {
    relatedBuilds: string[];
    relatedSkills: string[];
  }
> = {
  "count-geonor": {
    relatedBuilds: ["lightning-ranger", "earthshatter-warrior"],
    relatedSkills: ["lightning-arrow", "earthshatter"],
  },
  executioner: {
    relatedBuilds: ["lightning-ranger", "grenade-mercenary"],
    relatedSkills: ["lightning-arrow", "explosive-grenade"],
  },
  "fire-warden": {
    relatedBuilds: ["frost-monk", "infernal-witch"],
    relatedSkills: ["ice-strike", "flame-wall"],
  },
  "endgame-titan": {
    relatedBuilds: ["earthshatter-warrior", "poison-assassin"],
    relatedSkills: ["earthshatter", "poisonous-concoction"],
  },
  "chimera-abomination": {
    relatedBuilds: ["infernal-witch", "grenade-mercenary"],
    relatedSkills: ["flame-wall", "explosive-grenade"],
  },
  "king-in-the-mists": {
    relatedBuilds: ["poison-assassin", "frost-monk"],
    relatedSkills: ["poisonous-concoction", "tempest-bell"],
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
  seoTitle: `${boss.name} Boss Guide - POE2 Mechanics and Tips`,
  seoDescription: `${boss.summary} Learn phases, weaknesses, damage types, rewards, recommended builds, FAQs, and practical POE2 fight tips.`,
  patchVersion: "Early Access",
  lastUpdated: "2026-05-11",
  faq: [
    {
      question: `Where do you find ${boss.name}?`,
      answer: `${boss.name} is listed in this guide at ${boss.location}. Confirm exact campaign or endgame access after major patch changes.`,
    },
    {
      question: `What damage types does ${boss.name} use?`,
      answer: `${boss.name} is currently documented with ${boss.damageTypes.join(
        ", ",
      )} damage pressure. Build defenses around those types first.`,
    },
    {
      question: `Which builds are recommended for ${boss.name}?`,
      answer:
        "Use builds that can maintain damage while respecting the key mechanics. The related builds section links examples that fit the current placeholder strategy notes.",
    },
  ],
  relatedBuilds: bossRelatedContent[boss.slug]?.relatedBuilds ?? [],
  relatedSkills: bossRelatedContent[boss.slug]?.relatedSkills ?? [],
  contentNotes:
    "AI-assisted placeholder boss guide data. Verify phase names, rewards, damage types, and patch-specific mechanics with current gameplay before final publication.",
}));

export function getBossBySlug(slug: string) {
  return bosses.find((boss) => boss.slug === slug);
}
