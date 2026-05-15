export type Skill = {
  slug: string;
  name: string;
  category: string;
  damageType: string;
  weaponRequirement: string;
  summary: string;
  scalingStats: string[];
  bestSupports: string[];
  recommendedBuilds: string[];
  strengths: string[];
  weaknesses: string[];
  levelingNotes: string[];
  endgameUse: string[];
  seoTitle?: string;
  seoDescription?: string;
  patchVersion?: string;
  lastUpdated?: string;
  relatedSkills?: string[];
  faq?: { question: string; answer: string }[];
  relatedBuilds?: string[];
  relatedBosses?: string[];
  contentNotes?: string;
};

const skillRelatedContent: Record<
  string,
  {
    relatedBuilds: string[];
    relatedBosses: string[];
  }
> = {
  "lightning-arrow": {
    relatedBuilds: ["lightning-ranger"],
    relatedBosses: ["count-geonor", "endgame-titan"],
  },
  "flame-wall": {
    relatedBuilds: ["infernal-witch"],
    relatedBosses: ["fire-warden", "chimera-abomination"],
  },
  "poisonous-concoction": {
    relatedBuilds: ["poison-assassin"],
    relatedBosses: ["chimera-abomination", "king-in-the-mists"],
  },
  earthshatter: {
    relatedBuilds: ["earthshatter-warrior"],
    relatedBosses: ["executioner", "endgame-titan"],
  },
  "ice-strike": {
    relatedBuilds: ["frost-monk"],
    relatedBosses: ["fire-warden", "king-in-the-mists"],
  },
  "explosive-grenade": {
    relatedBuilds: ["grenade-mercenary"],
    relatedBosses: ["executioner", "chimera-abomination"],
  },
  "tempest-bell": {
    relatedBuilds: ["frost-monk"],
    relatedBosses: ["king-in-the-mists"],
  },
  "ember-fusillade": {
    relatedBuilds: ["infernal-witch"],
    relatedBosses: ["fire-warden"],
  },
};

export const skills: Skill[] = ([
  {
    slug: "lightning-arrow",
    name: "Lightning Arrow",
    category: "Attack",
    damageType: "Lightning",
    weaponRequirement: "Bow",
    summary:
      "A fast bow attack that converts clear speed into lightning chains, shock uptime, and smooth mapping momentum.",
    scalingStats: [
      "Weapon elemental damage",
      "Attack speed",
      "Lightning damage",
      "Critical strike chance",
    ],
    bestSupports: ["Chain", "Elemental Damage", "Lightning Penetration", "Faster Attacks"],
    recommendedBuilds: ["Lightning Ranger Build", "Grenade Mercenary Build"],
    strengths: [
      "Excellent pack clear with chain or projectile support.",
      "Naturally applies shock for stronger follow-up damage.",
      "Feels strong early when bow upgrades are frequent.",
    ],
    weaknesses: [
      "Single-target damage needs support swaps or supplemental skills.",
      "Depends heavily on weapon upgrades.",
      "Mana sustain can be strained at high attack speed.",
    ],
    levelingNotes: [
      "Upgrade bows often and prioritize added lightning damage.",
      "Use pierce or chain-style supports for smoother campaign clear.",
      "Add defensive passives if ranged positioning feels unsafe.",
    ],
    endgameUse: [
      "Best as a mapping skill with dedicated single-target support elsewhere.",
      "Scale shock effect and critical multiplier once defenses are stable.",
      "Avoid map modifiers that heavily punish elemental ailments.",
    ],
    relatedSkills: ["chain-lightning", "spark", "ball-lightning"],
  },
  {
    slug: "flame-wall",
    name: "Flame Wall",
    category: "Spell",
    damageType: "Fire",
    weaponRequirement: "Any caster weapon",
    summary:
      "A fire spell that creates persistent burning zones and adds reliable damage while the player repositions.",
    scalingStats: ["Fire damage", "Spell damage", "Damage over time", "Cast speed"],
    bestSupports: ["Controlled Destruction", "Burning Damage", "Fire Penetration", "Increased Area"],
    recommendedBuilds: ["Infernal Witch Build", "Fire Warden counter setups"],
    strengths: [
      "Damage continues while dodging boss mechanics.",
      "Strong area denial for campaign packs.",
      "Pairs well with minions and projectile spells.",
    ],
    weaknesses: [
      "Mobile bosses may leave the damage zone quickly.",
      "Requires positioning knowledge for maximum uptime.",
      "Fire-resistant enemies need exposure or penetration.",
    ],
    levelingNotes: [
      "Use it to control chokepoints and boss arenas.",
      "Combine with minions early for safer progression.",
      "Prioritize fire damage and cast speed while leveling.",
    ],
    endgameUse: [
      "Useful for layered damage in fire caster builds.",
      "Scale exposure and fire penetration for bosses.",
      "Strong as a utility damage layer even when not the main skill.",
    ],
    relatedSkills: ["ember-fusillade", "firestorm", "incinerate"],
  },
  {
    slug: "poisonous-concoction",
    name: "Poisonous Concoction",
    category: "Attack",
    damageType: "Chaos",
    weaponRequirement: "Unarmed or flask-focused setup",
    summary:
      "A poison-focused projectile attack that ramps chaos damage over time and rewards aggressive movement.",
    scalingStats: ["Chaos damage", "Poison magnitude", "Attack speed", "Damage over time"],
    bestSupports: ["Deadly Poison", "Swift Affliction", "Multiple Projectiles", "Chaos Mastery"],
    recommendedBuilds: ["Poison Assassin Build"],
    strengths: [
      "High sustained boss damage once poison stacks build up.",
      "Flexible positioning compared with melee poison skills.",
      "Scales well through chaos and damage over time modifiers.",
    ],
    weaknesses: [
      "Ramp damage can feel slow against short-lived enemies.",
      "Needs flask or resource support to stay smooth.",
      "Chaos-resistant bosses require extra investment.",
    ],
    levelingNotes: [
      "Take poison and chaos nodes once the skill feels consistent.",
      "Use mobility to maintain damage while avoiding hits.",
      "Do not neglect life and evasion while chasing poison scaling.",
    ],
    endgameUse: [
      "Strong for bosses that allow repeated poison application.",
      "Add wither-style effects or chaos resistance reduction.",
      "Keep a clear-focused support setup for dense mapping.",
    ],
    relatedSkills: ["toxic-rain", "venom-gyre", "cobra-lash"],
  },
  {
    slug: "earthshatter",
    name: "Earthshatter",
    category: "Attack",
    damageType: "Physical",
    weaponRequirement: "Mace or two-handed melee weapon",
    summary:
      "A heavy slam skill that creates burst windows through ground spikes, warcry setup, and physical damage scaling.",
    scalingStats: ["Physical damage", "Melee damage", "Stun buildup", "Warcry effect"],
    bestSupports: ["Brutality", "Fist of War", "Melee Physical Damage", "Aftershock"],
    recommendedBuilds: ["Earthshatter Warrior Build"],
    strengths: [
      "Strong burst against bosses during safe punish windows.",
      "Simple gearing through physical weapon upgrades.",
      "Pairs naturally with armor-heavy defensive setups.",
    ],
    weaknesses: [
      "Animation commitment can be dangerous.",
      "Clear speed is slower than top projectile builds.",
      "Requires good boss timing to avoid wasted slams.",
    ],
    levelingNotes: [
      "Upgrade your weapon whenever damage falls behind.",
      "Use warcries before rares and bosses.",
      "Invest in life and armor early for safer melee progression.",
    ],
    endgameUse: [
      "Best for players comfortable reading boss windows.",
      "Scale physical mitigation alongside damage.",
      "Swap supports for single-target encounters when needed.",
    ],
    relatedSkills: ["ground-slam", "tectonic-slam", "earthquake"],
  },
  {
    slug: "ice-strike",
    name: "Ice Strike",
    category: "Attack",
    damageType: "Cold",
    weaponRequirement: "Quarterstaff or melee weapon",
    summary:
      "A quick cold melee strike that blends freeze control, fast attacks, and evasive pressure.",
    scalingStats: ["Cold damage", "Attack speed", "Freeze buildup", "Critical strike chance"],
    bestSupports: ["Cold Infusion", "Faster Attacks", "Hypothermia", "Elemental Focus"],
    recommendedBuilds: ["Frost Monk Build"],
    strengths: [
      "Freeze and chill add meaningful defensive control.",
      "Responsive attack flow supports active boss movement.",
      "Good balance of clear and single-target utility.",
    ],
    weaknesses: [
      "Cold-resistant enemies reduce control reliability.",
      "Melee range still requires careful positioning.",
      "Needs weapon upgrades to keep pace with endgame scaling.",
    ],
    levelingNotes: [
      "Use chill and freeze to create safer openings.",
      "Prioritize attack speed and cold damage as gear allows.",
      "Add defenses before entering harder campaign zones.",
    ],
    endgameUse: [
      "Strong in control-focused Monk setups.",
      "Scale cold exposure and freeze buildup for tougher enemies.",
      "Avoid relying on freeze alone against pinnacle bosses.",
    ],
  },
  {
    slug: "explosive-grenade",
    name: "Explosive Grenade",
    category: "Grenade",
    damageType: "Fire",
    weaponRequirement: "Crossbow",
    summary:
      "A tactical grenade skill that rewards setup timing, area coverage, and burst planning with crossbow builds.",
    scalingStats: ["Projectile damage", "Fire damage", "Cooldown recovery", "Area damage"],
    bestSupports: ["Multiple Grenades", "Fire Penetration", "Area Effect", "Cooldown Recovery"],
    recommendedBuilds: ["Grenade Mercenary Build"],
    strengths: [
      "High burst when grenades land during debuff windows.",
      "Excellent area control against packs and adds.",
      "Pairs well with armor break and other crossbow tools.",
    ],
    weaknesses: [
      "Cooldown management matters.",
      "Delayed damage can miss fast targets.",
      "Requires more setup than simple projectile attacks.",
    ],
    levelingNotes: [
      "Use reliable crossbow shots while grenade supports come online.",
      "Practice throwing ahead of moving enemies.",
      "Add defensive gear if animation timing feels risky.",
    ],
    endgameUse: [
      "Excellent for planned burst phases.",
      "Scale cooldown recovery and fire penetration.",
      "Keep a backup skill for enemies that move out of explosions.",
    ],
  },
  {
    slug: "tempest-bell",
    name: "Tempest Bell",
    category: "Combo",
    damageType: "Elemental",
    weaponRequirement: "Quarterstaff",
    summary:
      "A Monk combo skill that turns repeated strikes into a high-impact bell burst for bosses and tough rares.",
    scalingStats: ["Elemental damage", "Combo generation", "Attack speed", "Area damage"],
    bestSupports: ["Elemental Damage", "Area Effect", "Combo Finisher", "Concentrated Effect"],
    recommendedBuilds: ["Frost Monk Build"],
    strengths: [
      "Great burst payoff after setup.",
      "Works with multiple elemental Monk patterns.",
      "Strong against rares and bosses that allow setup time.",
    ],
    weaknesses: [
      "Requires combo rhythm and positional commitment.",
      "Weak if the boss moves away at the wrong time.",
      "Less convenient for very fast mapping.",
    ],
    levelingNotes: [
      "Use it on rares and bosses rather than every small pack.",
      "Learn the setup rhythm before adding complex supports.",
      "Pair with a faster clear skill while progressing.",
    ],
    endgameUse: [
      "Excellent burst layer for Monk bossing.",
      "Plan bell drops around mechanic downtime.",
      "Scale area or concentrated damage depending on encounter type.",
    ],
  },
  {
    slug: "ember-fusillade",
    name: "Ember Fusillade",
    category: "Spell",
    damageType: "Fire",
    weaponRequirement: "Any caster weapon",
    summary:
      "A fire projectile spell that builds pressure through repeated hits and pairs well with fire exposure setups.",
    scalingStats: ["Spell damage", "Fire damage", "Projectile damage", "Cast speed"],
    bestSupports: ["Multiple Projectiles", "Fire Penetration", "Controlled Destruction", "Arcane Tempo"],
    recommendedBuilds: ["Infernal Witch Build"],
    strengths: [
      "Reliable ranged damage for bosses and rares.",
      "Scales cleanly with common caster modifiers.",
      "Pairs well with Flame Wall and fire curses.",
    ],
    weaknesses: [
      "Projectile spread can reduce focused damage.",
      "Requires cast uptime to compete with damage over time skills.",
      "Needs penetration against fire-resistant enemies.",
    ],
    levelingNotes: [
      "Use it as a primary ranged spell once support links are available.",
      "Add cast speed for a smoother feel.",
      "Combine with fire exposure or curses for tougher enemies.",
    ],
    endgameUse: [
      "Works as a focused hit-based fire spell.",
      "Strong with projectile and fire penetration investment.",
      "Consider support swaps for mapping versus bossing.",
    ],
  },
  {
  slug: "frostbolt",
  name: "Frostbolt",
  category: "Spell",
  damageType: "Cold",
  weaponRequirement: "Wand or Staff",
  summary:
    "A cold projectile spell focused on chilling enemies and scaling projectile-based cold damage.",
  scalingStats: [
    "Cold Damage",
    "Spell Damage",
    "Projectile Damage",
    "Critical Strike Chance",
    "Cast Speed",
  ],
  bestSupports: [
    "Cold Penetration",
    "Hypothermia",
    "Controlled Destruction",
    "Faster Casting",
  ],
  recommendedBuilds: ["Cold Sorceress", "Crit Frost Mage"],
  strengths: [
    "Strong crowd control through chill and freeze",
    "Reliable ranged clear",
    "Scales well with critical strikes",
  ],
  weaknesses: [
    "Can struggle with mana sustain early",
    "Projectile speed can feel awkward without investment",
  ],
  levelingNotes: [
  "Prioritize cast speed and cold damage during leveling.",
  "Upgrade wands frequently to keep spell damage relevant.",
],

endgameUse: [
  "Commonly used in cold caster builds focused on freeze and critical scaling.",
  "Works best when paired with cold penetration, cast speed, and reliable defensive layers.",
],
},
{
  slug: "fireball",
  name: "Fireball",
  category: "Spell",
  damageType: "Fire",
  weaponRequirement: "Wand or Staff",
  summary:
    "A classic fire spell focused on explosive projectile damage and ignite scaling.",
  scalingStats: [
    "Fire Damage",
    "Spell Damage",
    "Projectile Damage",
    "Cast Speed",
    "Critical Strike Chance",
  ],
  bestSupports: [
    "Fire Penetration",
    "Controlled Destruction",
    "Faster Casting",
    "Ignite Proliferation",
  ],
  recommendedBuilds: [
    "Ignite Sorceress",
    "Crit Fire Mage",
  ],
  strengths: [
    "Strong ignite scaling",
    "Reliable ranged damage",
    "Good pack clear with explosions",
  ],
  weaknesses: [
    "Can feel weak without cast speed",
    "Boss damage depends heavily on scaling investment",
  ],
  levelingNotes: [
    "Prioritize cast speed and fire damage early.",
    "Upgrade wands frequently to maintain smooth progression.",
  ],
  endgameUse: [
    "Commonly used in ignite-focused caster builds.",
    "Performs best with penetration and critical scaling investment.",
  ],
},
{
  slug: "spark",
  name: "Spark",
  category: "Spell",
  damageType: "Lightning",
  weaponRequirement: "Wand or Staff",
  summary:
    "A lightning spell that fires unpredictable projectiles, strong for screen coverage and shock-based clear.",
  scalingStats: [
    "Lightning Damage",
    "Spell Damage",
    "Projectile Damage",
    "Cast Speed",
    "Critical Strike Chance",
  ],
  bestSupports: [
    "Lightning Penetration",
    "Faster Casting",
    "Controlled Destruction",
    "Increased Projectile Speed",
  ],
  recommendedBuilds: ["Lightning Sorceress", "Crit Spark Mage"],
  strengths: [
    "Excellent area coverage",
    "Good shock uptime",
    "Strong mapping potential in dense areas",
  ],
  weaknesses: [
    "Projectile behavior can feel inconsistent",
    "Boss damage depends on positioning and investment",
  ],
  levelingNotes: [
    "Prioritize cast speed and lightning damage early.",
    "Projectile speed helps Spark feel smoother during campaign progression.",
  ],
  endgameUse: [
    "Best used in lightning caster builds focused on screen coverage and shock scaling.",
    "Performs well in dense maps but may need support adjustments for bosses.",
  ],
},
{
  slug: "ice-nova",
  name: "Ice Nova",
  category: "Spell",
  damageType: "Cold",
  weaponRequirement: "Wand or Staff",
  summary:
    "A cold area spell that expands around the caster, useful for close-range clearing and freeze-based control.",
  scalingStats: [
    "Cold Damage",
    "Spell Damage",
    "Area Damage",
    "Cast Speed",
    "Critical Strike Chance",
  ],
  bestSupports: [
    "Cold Penetration",
    "Hypothermia",
    "Increased Area of Effect",
    "Faster Casting",
  ],
  recommendedBuilds: ["Cold Sorceress", "Freeze Control Caster"],
  strengths: [
    "Strong close-range pack clear",
    "Good freeze and chill control",
    "Works well in dense enemy situations",
  ],
  weaknesses: [
    "Requires safer positioning than long-range spells",
    "Can feel risky against bosses with dangerous melee mechanics",
  ],
  levelingNotes: [
    "Prioritize cold damage and cast speed early.",
    "Use defensive layers because the skill often plays closer to enemies.",
  ],
  endgameUse: [
    "Best used in cold caster setups focused on area control and freeze uptime.",
    "May need stronger single-target support for bosses and mobile rares.",
  ],
},
{
  slug: "chain-lightning",
  name: "Chain Lightning",
  category: "Spell",
  damageType: "Lightning",
  weaponRequirement: "Wand or Staff",
  summary:
    "A lightning spell that chains between enemies, offering strong clear speed and reliable shock application.",
  scalingStats: [
    "Lightning Damage",
    "Spell Damage",
    "Cast Speed",
    "Critical Strike Chance",
    "Chain Range",
  ],
  bestSupports: [
    "Lightning Penetration",
    "Faster Casting",
    "Controlled Destruction",
    "Added Lightning Damage",
  ],
  recommendedBuilds: [
    "Lightning Sorceress",
    "Shock Caster",
  ],
  strengths: [
    "Excellent pack clear",
    "Reliable shock uptime",
    "Smooth mapping flow",
  ],
  weaknesses: [
    "Single-target damage can fall off",
    "Heavy mana usage at high cast speed",
  ],
  levelingNotes: [
    "Prioritize cast speed and lightning damage early.",
    "Mana sustain becomes important once cast speed increases.",
  ],
  endgameUse: [
    "Performs well in dense maps with strong chain value.",
    "Often paired with dedicated single-target setups for bosses.",
  ],
},
{
  slug: "arc",
  name: "Arc",
  category: "Spell",
  damageType: "Lightning",
  weaponRequirement: "Wand or Staff",
  summary:
    "A lightning spell that chains between enemies, offering smooth pack clear and reliable shock application.",
  scalingStats: [
    "Lightning Damage",
    "Spell Damage",
    "Cast Speed",
    "Critical Strike Chance",
    "Shock Effect",
  ],
  bestSupports: [
    "Lightning Penetration",
    "Faster Casting",
    "Controlled Destruction",
    "Added Lightning Damage",
  ],
  recommendedBuilds: ["Lightning Sorceress", "Shock Caster"],
  strengths: [
    "Very smooth auto-targeting clear",
    "Reliable shock application",
    "Easy to use during leveling",
  ],
  weaknesses: [
    "Boss damage falls off without investment",
    "Mana sustain becomes difficult at high cast speed",
  ],
  levelingNotes: [
    "Arc feels strong early because chaining handles pack clear automatically.",
    "Upgrade caster weapons frequently to avoid damage plateaus during campaign progression.",
  ],
  endgameUse: [
    "Frequently used as a fast mapping skill because of its automatic chaining behavior.",
    "Many players supplement Arc with stronger dedicated single-target setups for pinnacle bosses.",
  ],
},
{
  slug: "ball-lightning",
  name: "Ball Lightning",
  category: "Spell",
  damageType: "Lightning",
  weaponRequirement: "Wand or Staff",
  summary:
    "A slow-moving lightning projectile spell that repeatedly hits enemies inside its area, making it strong for sustained damage and shock application.",
  scalingStats: [
    "Lightning Damage",
    "Spell Damage",
    "Area Damage",
    "Cast Speed",
    "Critical Strike Chance",
  ],
  bestSupports: [
    "Lightning Penetration",
    "Slower Projectiles",
    "Controlled Destruction",
    "Faster Casting",
  ],
  recommendedBuilds: [
    "Lightning Sorceress",
    "Shock Ball Lightning Caster",
  ],
  strengths: [
    "Strong sustained damage",
    "Reliable multi-hit shock application",
    "Excellent against stationary targets",
  ],
  weaknesses: [
    "Projectile speed can feel awkward",
    "Clear speed may feel slower than Arc or Spark",
  ],
  levelingNotes: [
    "Prioritize cast speed early so the skill feels less clunky.",
    "Projectile positioning matters more than with auto-targeting lightning skills.",
  ],
  endgameUse: [
    "Often used in boss-focused lightning caster builds because of repeated hits.",
    "Performs best when enemies stay inside the projectile for longer durations.",
  ],
},
{
  slug: "flame-wall",
  name: "Flame Wall",
  category: "Spell",
  damageType: "Fire",
  weaponRequirement: "Wand or Staff",
  summary:
    "A fire spell that creates a burning wall, dealing damage over time and enhancing projectiles passing through it.",
  scalingStats: [
    "Fire Damage",
    "Spell Damage",
    "Damage Over Time",
    "Area Damage",
    "Cast Speed",
  ],
  bestSupports: [
    "Burning Damage",
    "Fire Penetration",
    "Controlled Destruction",
    "Increased Area of Effect",
  ],
  recommendedBuilds: [
    "Ignite Sorceress",
    "Fire DOT Caster",
  ],
  strengths: [
    "Strong area denial",
    "Reliable burning damage",
    "Excellent synergy with projectile skills",
  ],
  weaknesses: [
    "Requires positioning awareness",
    "Damage ramps more slowly than burst spells",
  ],
  levelingNotes: [
    "Position the wall carefully during leveling to maximize burning uptime.",
    "Projectile-based setups often feel smoother when combined with Flame Wall early.",
  ],
  endgameUse: [
    "Frequently used in fire DOT and ignite-focused caster builds.",
    "Excels in sustained fights where enemies remain inside burning zones.",
  ],
},
{
  slug: "ice-spear",
  name: "Ice Spear",
  category: "Spell",
  damageType: "Cold",
  weaponRequirement: "Wand or Staff",
  summary:
    "A cold projectile spell focused on critical strikes, long-range damage, and freezing priority targets.",
  scalingStats: [
    "Cold Damage",
    "Spell Damage",
    "Projectile Damage",
    "Critical Strike Chance",
    "Cast Speed",
  ],
  bestSupports: [
    "Cold Penetration",
    "Controlled Destruction",
    "Increased Critical Damage",
    "Faster Casting",
  ],
  recommendedBuilds: [
    "Crit Frost Mage",
    "Cold Projectile Sorceress",
  ],
  strengths: [
    "Strong long-range boss damage",
    "High critical strike potential",
    "Reliable freeze application on priority targets",
  ],
  weaknesses: [
    "Clear speed can feel weaker than wide-area cold spells",
    "Requires accurate positioning and projectile alignment",
  ],
  levelingNotes: [
    "Prioritize cast speed and critical scaling gradually during leveling.",
    "The skill feels smoother once projectile speed and cast speed improve.",
  ],
  endgameUse: [
    "Frequently used in crit-focused cold caster builds for bossing.",
    "Performs best when positioned safely at range against dangerous encounters.",
  ],
},
{
  slug: "meteor",
  name: "Meteor",
  category: "Spell",
  damageType: "Fire",
  weaponRequirement: "Wand or Staff",
  summary:
    "A heavy fire spell that calls down delayed area damage, specializing in burst hits and large-scale explosions.",
  scalingStats: [
    "Fire Damage",
    "Spell Damage",
    "Area Damage",
    "Critical Strike Chance",
    "Cast Speed",
  ],
  bestSupports: [
    "Fire Penetration",
    "Controlled Destruction",
    "Increased Area of Effect",
    "Spell Echo",
  ],
  recommendedBuilds: [
    "Fire Burst Sorceress",
    "Crit Meteor Caster",
  ],
  strengths: [
    "Massive burst damage",
    "Strong area coverage",
    "Excellent against stationary enemies",
  ],
  weaknesses: [
    "Delayed impact can feel awkward",
    "Fast-moving enemies may avoid damage zones",
  ],
  levelingNotes: [
    "Prioritize cast speed early to reduce the skill’s clunky feeling.",
    "Meteor feels much stronger once area scaling and mana sustain improve.",
  ],
  endgameUse: [
    "Frequently used in high-burst fire caster builds for bossing and dense packs.",
    "Performs best when enemies remain inside predicted impact zones.",
  ],
},
{
  slug: "freezing-shards",
  name: "Freezing Shards",
  category: "Spell",
  damageType: "Cold",
  weaponRequirement: "Wand or Staff",
  summary:
    "A rapid cold projectile spell focused on repeated hits, freeze buildup, and aggressive close-to-mid range clearing.",
  scalingStats: [
    "Cold Damage",
    "Spell Damage",
    "Projectile Damage",
    "Cast Speed",
    "Critical Strike Chance",
  ],
  bestSupports: [
    "Cold Penetration",
    "Faster Casting",
    "Greater Multiple Projectiles",
    "Hypothermia",
  ],
  recommendedBuilds: [
    "Freeze Sorceress",
    "Cold Projectile Caster",
  ],
  strengths: [
    "Fast freeze buildup",
    "High hit frequency",
    "Strong clear in dense packs",
  ],
  weaknesses: [
    "Shorter effective range than many cold spells",
    "Can feel unsafe against aggressive enemies",
  ],
  levelingNotes: [
    "Cast speed dramatically improves the skill’s feel during leveling.",
    "Position aggressively enough to maximize hits, but avoid overcommitting into dangerous packs.",
  ],
  endgameUse: [
    "Performs well in freeze-focused cold builds with strong hit frequency scaling.",
    "Requires careful positioning in high-end encounters due to shorter effective range.",
  ],
},
{
  slug: "poison-arrow",
  name: "Poison Arrow",
  category: "Attack",
  damageType: "Chaos",
  weaponRequirement: "Bow",
  summary:
    "A chaos-based bow attack focused on poison buildup, damage over time, and safe ranged kiting gameplay.",
  scalingStats: [
    "Chaos Damage",
    "Damage Over Time",
    "Projectile Damage",
    "Attack Speed",
    "Poison Duration",
  ],
  bestSupports: [
    "Void Manipulation",
    "Vicious Projectiles",
    "Greater Multiple Projectiles",
    "Deadly Ailments",
  ],
  recommendedBuilds: [
    "Poison Ranger",
    "Chaos DOT Archer",
  ],
  strengths: [
    "Strong sustained poison damage",
    "Safe ranged playstyle",
    "Excellent for kiting dangerous enemies",
  ],
  weaknesses: [
    "Damage ramps slowly against tougher bosses",
    "Requires good positioning and movement",
  ],
  levelingNotes: [
    "Focus on attack speed and poison scaling early for smoother progression.",
    "Kiting enemies properly matters more than standing still for damage uptime.",
  ],
  endgameUse: [
    "Performs well in chaos DOT builds focused on sustained boss damage and safe mapping.",
    "Works best when paired with strong movement and defensive positioning.",
  ],
},
{
  slug: "earthshatter",
  name: "Earthshatter",
  category: "Attack",
  damageType: "Physical",
  weaponRequirement: "Mace or Two-Handed Weapon",
  summary:
    "A heavy melee slam skill that creates damaging spikes, rewarding timing, positioning, and burst-oriented melee gameplay.",
  scalingStats: [
    "Physical Damage",
    "Melee Damage",
    "Area Damage",
    "Attack Speed",
    "Stun Buildup",
  ],
  bestSupports: [
    "Brutality",
    "Melee Physical Damage",
    "Pulverise",
    "Fist of War",
  ],
  recommendedBuilds: [
    "Slam Warrior",
    "Physical Juggernaut",
  ],
  strengths: [
    "Massive burst damage",
    "Strong stagger and stun potential",
    "Excellent against grouped enemies",
  ],
  weaknesses: [
    "Slow attack animations can feel punishing",
    "Requires careful melee positioning",
  ],
  levelingNotes: [
    "Weapon upgrades are extremely important during leveling.",
    "Attack speed helps reduce the clunky feel of slower slam animations.",
  ],
  endgameUse: [
    "Performs best in heavy physical melee builds focused on burst slams and survivability.",
    "Requires strong defenses and encounter knowledge in high-end boss fights.",
  ],
},
{
  slug: "whirlwind",
  name: "Whirlwind",
  category: "Attack",
  damageType: "Physical",
  weaponRequirement: "Melee Weapon",
  summary:
    "A spinning melee attack focused on sustained movement, repeated hits, and fast pack clearing.",
  scalingStats: [
    "Physical Damage",
    "Melee Damage",
    "Attack Speed",
    "Area Damage",
    "Movement Speed",
  ],
  bestSupports: [
    "Brutality",
    "Melee Physical Damage",
    "Faster Attacks",
    "Increased Area of Effect",
  ],
  recommendedBuilds: [
    "Spin Warrior",
    "Physical Cyclone Fighter",
  ],
  strengths: [
    "Smooth moving melee gameplay",
    "Strong pack clear while staying mobile",
    "Good repeated-hit damage against grouped enemies",
  ],
  weaknesses: [
    "Can feel weak against bosses without strong scaling",
    "Requires solid defenses because it stays near enemies",
  ],
  levelingNotes: [
    "Prioritize weapon upgrades and attack speed during leveling.",
    "Movement speed and area coverage make the skill feel much smoother.",
  ],
  endgameUse: [
    "Best used in melee builds focused on mobile clearing and sustained physical damage.",
    "Needs strong defensive layers and single-target investment for tougher bosses.",
  ],
  relatedSkills: [
  "spark",
  "chain-lightning",
  "ball-lightning",
  ],
},
] satisfies Skill[]).map((skill) => ({
  ...skill,
  seoTitle: `${skill.name} Skill Guide - POE2 Supports and Builds`,
  seoDescription: `${skill.summary} Learn scaling stats, best supports, recommended builds, leveling notes, endgame use, FAQs, and related POE2 guides.`,
  patchVersion: "Early Access",
  lastUpdated: "2026-05-11",
  faq: [
    {
      question: `Is ${skill.name} good for leveling?`,
      answer:
        "Use the leveling notes as the main guide. The skill is easiest to recommend when its weapon requirement and support setup are available early enough for your character.",
    },
    {
      question: `What stats scale ${skill.name}?`,
      answer: `${skill.name} should prioritize ${skill.scalingStats
        .slice(0, 3)
        .join(", ")} first, then adjust based on survivability and encounter needs.`,
    },
    {
      question: `Which builds use ${skill.name}?`,
      answer:
        "Check the related builds section for current internal recommendations, and verify exact support interactions against the current patch before finalizing a character.",
    },
  ],
  relatedBuilds: skillRelatedContent[skill.slug]?.relatedBuilds ?? [],
  relatedBosses: skillRelatedContent[skill.slug]?.relatedBosses ?? [],
  contentNotes:
    "AI-assisted placeholder skill guide data. Verify support interactions, scaling behavior, and patch-specific mechanics with current in-game testing before final publication.",
}));

export function getSkillBySlug(slug: string) {
  return skills.find((skill) => skill.slug === slug);
}
