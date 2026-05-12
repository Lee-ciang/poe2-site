export type Build = {
  slug: string;
  title: string;
  className: string;
  tier: string;
  playstyle: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  strengths: string[];
  weaknesses: string[];
  coreSkills: string[];
  recommendedGear: string[];
  levelingTips: string[];
  endgameNotes: string[];
  seoTitle?: string;
  seoDescription?: string;
  patchVersion?: string;
  lastUpdated?: string;
  faq?: { question: string; answer: string }[];
  relatedSkills?: string[];
  relatedBosses?: string[];
  contentNotes?: string;
};

const buildRelatedContent: Record<
  string,
  {
    relatedSkills: string[];
    relatedBosses: string[];
  }
> = {
  "lightning-ranger": {
    relatedSkills: ["lightning-arrow"],
    relatedBosses: ["count-geonor", "endgame-titan"],
  },
  "infernal-witch": {
    relatedSkills: ["flame-wall", "ember-fusillade"],
    relatedBosses: ["fire-warden", "chimera-abomination"],
  },
  "poison-assassin": {
    relatedSkills: ["poisonous-concoction"],
    relatedBosses: ["chimera-abomination", "king-in-the-mists"],
  },
  "earthshatter-warrior": {
    relatedSkills: ["earthshatter"],
    relatedBosses: ["executioner", "endgame-titan"],
  },
  "frost-monk": {
    relatedSkills: ["ice-strike", "tempest-bell"],
    relatedBosses: ["fire-warden", "king-in-the-mists"],
  },
  "grenade-mercenary": {
    relatedSkills: ["explosive-grenade"],
    relatedBosses: ["executioner", "endgame-titan"],
  },
};

export const builds: Build[] = ([
  {
    slug: "lightning-ranger",
    title: "Lightning Ranger Build",
    className: "Ranger",
    tier: "S Tier",
    playstyle: "Fast ranged mapper",
    difficulty: "Beginner",
    summary:
      "A high-speed bow build focused on lightning damage, shock uptime, and smooth clear for campaign and early endgame mapping.",
    strengths: [
      "Excellent clear speed with chaining lightning skills.",
      "Strong mobility makes dangerous encounters easier to reposition around.",
      "Scales well with attack speed, elemental damage, and critical strikes.",
    ],
    weaknesses: [
      "Can feel fragile before defensive gear comes online.",
      "Single-target damage depends on keeping uptime during boss movement.",
      "Mana sustain may need early support from gear or passive choices.",
    ],
    coreSkills: [
      "Lightning Arrow",
      "Escape Shot",
      "Stormcaller Arrow",
      "Wind Dancer",
    ],
    recommendedGear: [
      "High physical or elemental DPS bow",
      "Quiver with attack speed and added lightning damage",
      "Evasion armor with life and resistances",
      "Rings with mana sustain and elemental damage",
    ],
    levelingTips: [
      "Prioritize bow damage and movement speed while leveling.",
      "Upgrade your weapon often; bow DPS carries the campaign.",
      "Use defensive support gems if bosses start forcing repeated deaths.",
    ],
    endgameNotes: [
      "Add ailment effect and critical multiplier once defenses feel stable.",
      "Keep resistances capped before pushing higher-tier maps.",
      "Swap supports for tougher bosses when clear speed is less important.",
    ],
  },
  {
    slug: "infernal-witch",
    title: "Infernal Witch Build",
    className: "Witch",
    tier: "S Tier",
    playstyle: "Fire spell caster",
    difficulty: "Intermediate",
    summary:
      "A fire-focused Witch setup using burning damage, area control, and minion pressure to handle packs and bosses safely.",
    strengths: [
      "Great area coverage for campaign zones and dense maps.",
      "Damage continues while repositioning around boss mechanics.",
      "Can layer minions and fire spells for safer encounters.",
    ],
    weaknesses: [
      "Cast timing matters against mobile bosses.",
      "Needs investment to feel tanky in late endgame.",
      "Fire-resistant enemies can slow progression without penetration.",
    ],
    coreSkills: ["Flame Wall", "Ember Fusillade", "Raging Spirits", "Flammability"],
    recommendedGear: [
      "Spell wand or staff with fire damage",
      "Energy shield armor with life and resistances",
      "Amulet with spell levels or fire modifiers",
      "Jewelry with cast speed and mana regeneration",
    ],
    levelingTips: [
      "Use minions early to reduce pressure while casting.",
      "Path toward fire damage and cast speed before late defensive wheels.",
      "Keep a movement skill ready for bosses with arena-wide attacks.",
    ],
    endgameNotes: [
      "Invest in exposure, curse effect, and fire penetration.",
      "Balance energy shield recovery with life and resist caps.",
      "Use boss-specific supports when ignite uptime is inconsistent.",
    ],
  },
  {
    slug: "poison-assassin",
    title: "Poison Assassin Build",
    className: "Shadow",
    tier: "S Tier",
    playstyle: "Mobile damage over time",
    difficulty: "Advanced",
    summary:
      "A quick melee or projectile poison build that stacks damage over time, avoids retaliation, and excels at sustained boss pressure.",
    strengths: [
      "Very high sustained damage once poison stacks ramp.",
      "Strong mobility supports aggressive boss positioning.",
      "Excellent scaling from chaos damage and damage over time multipliers.",
    ],
    weaknesses: [
      "Ramp-up damage can feel weaker on short-lived enemies.",
      "Requires cleaner positioning than many ranged builds.",
      "Gear pressure is higher because offense and defense both matter.",
    ],
    coreSkills: ["Poisonous Concoction", "Viper Strike", "Plague Bearer", "Dash"],
    recommendedGear: [
      "Fast weapon or flask setup with chaos scaling",
      "Evasion pieces with life and suppression-style defenses",
      "Chaos damage rings",
      "Belt with flask sustain and resistances",
    ],
    levelingTips: [
      "Use whichever poison skill has the smoothest early support links.",
      "Take life and evasion nodes before pushing too deep into damage.",
      "Refresh weapons frequently if using attack-based poison skills.",
    ],
    endgameNotes: [
      "Scale poison duration only after damage and defenses are stable.",
      "Add chaos penetration or wither-style effects for pinnacle bosses.",
      "Avoid overcommitting during ramp windows in lethal encounters.",
    ],
  },
  {
    slug: "earthshatter-warrior",
    title: "Earthshatter Warrior Build",
    className: "Warrior",
    tier: "A Tier",
    playstyle: "Heavy melee bruiser",
    difficulty: "Beginner",
    summary:
      "A sturdy slam build that uses heavy weapons, armor, and controlled burst windows to break packs and punish bosses.",
    strengths: [
      "Durable campaign progression with armor and life investment.",
      "Satisfying burst damage against stationary enemies.",
      "Simple gearing priorities make upgrades easy to evaluate.",
    ],
    weaknesses: [
      "Slower clear than top ranged builds.",
      "Animation commitment can punish greedy attacks.",
      "Needs accuracy and weapon upgrades to stay smooth.",
    ],
    coreSkills: ["Earthshatter", "Leap Slam", "Seismic Cry", "Molten Shell"],
    recommendedGear: [
      "Two-handed mace with high physical damage",
      "Armor bases with life and resistances",
      "Gloves with attack speed",
      "Boots with movement speed and stun recovery",
    ],
    levelingTips: [
      "Upgrade your weapon whenever damage starts falling behind.",
      "Use warcries before rares and bosses for stronger burst.",
      "Do not skip movement speed boots; melee needs positioning.",
    ],
    endgameNotes: [
      "Push armor, maximum life, and physical mitigation before damage luxury.",
      "Learn boss windows so slam animations land safely.",
      "Consider swapping clear supports for heavier single-target supports.",
    ],
  },
  {
    slug: "frost-monk",
    title: "Frost Monk Build",
    className: "Monk",
    tier: "A Tier",
    playstyle: "Control melee hybrid",
    difficulty: "Intermediate",
    summary:
      "A cold-based Monk build using freeze control, quick strikes, and evasive movement to lock down packs and pressure bosses.",
    strengths: [
      "Freeze and chill provide strong defensive control.",
      "Quick attacks make the build feel responsive.",
      "Good balance of clear, safety, and boss utility.",
    ],
    weaknesses: [
      "Cold-resistant bosses can reduce control reliability.",
      "Requires active movement and good timing.",
      "Weapon upgrades still matter despite elemental scaling.",
    ],
    coreSkills: ["Glacial Cascade", "Ice Strike", "Tempest Bell", "Blink"],
    recommendedGear: [
      "Quarterstaff with elemental or physical damage",
      "Evasion and energy shield hybrid armor",
      "Cold damage jewelry",
      "Boots with movement speed and ailment avoidance",
    ],
    levelingTips: [
      "Lean into chill and freeze effects for safer campaign fights.",
      "Pick up defensive passives when entering harder acts.",
      "Keep your weapon current to avoid long rare fights.",
    ],
    endgameNotes: [
      "Scale cold exposure, freeze buildup, and critical chance.",
      "Use control windows to burst bosses rather than face-tanking.",
      "Add ailment avoidance before pushing dangerous map modifiers.",
    ],
  },
  {
    slug: "grenade-mercenary",
    title: "Grenade Mercenary Build",
    className: "Mercenary",
    tier: "A Tier",
    playstyle: "Explosive tactical ranged",
    difficulty: "Advanced",
    summary:
      "A crossbow build built around grenade combos, armor break, and deliberate burst setups for players who like tactical ranged combat.",
    strengths: [
      "Excellent burst when grenades and debuffs line up.",
      "Flexible damage profiles through ammunition and support choices.",
      "Strong control tools for dangerous rares and bosses.",
    ],
    weaknesses: [
      "Combo timing is less forgiving than simple attack builds.",
      "Cooldown and reload management can interrupt flow.",
      "Positioning mistakes are punished in close arenas.",
    ],
    coreSkills: [
      "Explosive Grenade",
      "Gas Grenade",
      "Fragmentation Rounds",
      "Flash Grenade",
    ],
    recommendedGear: [
      "Crossbow with high damage and reload quality",
      "Armor/evasion gear with life and resistances",
      "Belt with flask sustain",
      "Gloves with projectile or attack modifiers",
    ],
    levelingTips: [
      "Use reliable crossbow shots while grenade tools come online.",
      "Practice applying debuffs before spending burst cooldowns.",
      "Favor defensive gear if you are learning boss attack patterns.",
    ],
    endgameNotes: [
      "Optimize cooldown recovery and damage windows for bosses.",
      "Keep a clear-focused setup and a single-target setup available.",
      "Avoid map modifiers that heavily punish projectile or cooldown builds.",
    ],
  },
] satisfies Build[]).map((build) => ({
  ...build,
  seoTitle: `${build.title} Guide - POE2 ${build.className} Build`,
  seoDescription: `${build.summary} Includes skills, gear priorities, leveling tips, endgame notes, FAQs, and related POE2 guides.`,
  patchVersion: "Early Access",
  lastUpdated: "2026-05-11",
  faq: [
    {
      question: `Is ${build.title} beginner friendly?`,
      answer: `${build.title} is rated ${build.difficulty}. Use that rating with the weaknesses section to decide how much gear and fight knowledge you need before committing.`,
    },
    {
      question: `What should I upgrade first for ${build.title}?`,
      answer:
        "Prioritize the upgrades that solve your current blocker: weapon or damage scaling if kills feel slow, and life, resistances, or recovery if deaths are the issue.",
    },
    {
      question: `Can ${build.title} handle endgame content?`,
      answer:
        "The build is designed with endgame notes in mind, but final performance depends on current patch balance, defensive caps, and encounter-specific support swaps.",
    },
  ],
  relatedSkills: buildRelatedContent[build.slug]?.relatedSkills ?? [],
  relatedBosses: buildRelatedContent[build.slug]?.relatedBosses ?? [],
  contentNotes:
    "AI-assisted placeholder guide data. Validate patch-specific mechanics, support choices, and item recommendations against current in-game testing before publishing as final.",
}));

export function getBuildBySlug(slug: string) {
  return builds.find((build) => build.slug === slug);
}
