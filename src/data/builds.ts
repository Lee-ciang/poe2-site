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
    relatedSkills: [],
    relatedBosses: ["executioner", "count-geonor"],
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
    className: "Ranger",
    tier: "Poison specialist",
    playstyle: "Mobile damage over time",
    difficulty: "Advanced",
    summary:
      "This POE2 Poison Assassin build uses ranged poison application and deliberate movement to maintain damage between attack windows. Plan a Ranger around poison-capable bow skills, reliable defenses, and a repeatable boss routine.",
    strengths: [
      "Play this build when you enjoy applying damage, repositioning, and watching the enemy rather than holding an attack through every mechanic. Poison can keep dealing damage while you move, provided its duration has not expired. That gives you time to cross an arena or avoid a telegraph without treating every moment away from attacking as wasted time.",
      "Ranged application lets you start a fight with room to retreat. Against packs, approach from an open edge and keep enemies in front of you. Against a single target, choose an angle that leaves an exit after the shot. The advantage comes from maintaining a safe attack rhythm, not from assuming poison makes your character durable.",
      "The build offers clear ways to diagnose weak damage: look at application reliability, the damage that contributes to poison, poison magnitude, and the number of active poisons your setup actually permits. Improve the weakest part first. Buying an expensive damage item before solving missed applications or resource starvation can leave the build feeling almost unchanged.",
    ],
    weaknesses: [
      "Short-lived enemies can die before a longer poison pays off. A setup built only for sustained boss damage may feel slow when clearing scattered packs. Judge mapping by how quickly you can apply damage and move on, and judge bossing by damage maintained during real mechanics. Those are different tests and may favor different supports.",
      "Movement is an active defense, so cramped arenas and enemies arriving from several directions demand attention. Evasion does not replace life, resistances, recovery, or learning dangerous attacks. If you repeatedly die before poison finishes its work, the next upgrade should protect your character rather than add another offensive modifier.",
      "Additional poison capacity is useful only when you can fill it and keep it active. Do not assume every hit adds unlimited stacks. Long duration also has little value when a target dies quickly or becomes unavailable. Spending passives on theoretical maximum damage can weaken a character that rarely gets the required uninterrupted attack time.",
    ],
    coreSkills: [
      "Poisonburst Arrow: the poison-focused bow option around which to establish your application routine.",
      "Gas Arrow: an alternative area-coverage option; build around its poison behavior rather than mixing in a separate explosion plan unintentionally.",
      "Despair: optional chaos-resistance utility when you meet its requirements and can afford the extra cast in your rotation.",
    ],
    recommendedGear: [
      "Start with a bow whose damage supports the poison skill you are using. Compare the skill's own damage details before and after an upgrade instead of shopping by total elemental weapon damage. Accuracy and a comfortable attack animation matter when your application relies on a hit. An impressive weapon tooltip is not enough if attacks regularly fail to apply poison.",
      "Use armor and jewelry to maintain life and resistances, then improve evasion and recovery as part of the same defensive plan. Movement speed on boots helps you reach a safe position before the next attack. Avoid replacing a dependable defensive item with an offensive one unless you can cover the resistance or attribute gap elsewhere.",
      "For damage upgrades, distinguish the physical or chaos damage feeding the poison from modifiers that explicitly affect poison magnitude or duration. Poison deals chaos damage over time, but that does not make every chaos modifier equally useful for every skill. Chaos penetration is not a general poison upgrade: penetration applies to hits. Read the affected damage component before spending currency.",
      "Keep your mana recovery and flask setup comfortable through a whole boss attempt, not just one pack. Test a support change against a durable enemy while watching resource use. If repeated attacks exhaust mana, reduce unnecessary skill use or improve sustain before adding more attack speed. Reliable access to your main attack is part of your damage plan.",
    ],
    levelingTips: [
      "Begin with the bow attack you can equip and sustain, then move into your poison setup as its gems and requirements become available. Keep one main damage skill well supported rather than spreading limited upgrades across several competing attacks. You do not need a complete endgame rotation to learn the basic rhythm of applying damage and moving.",
      "Select support gems by function. First make application dependable; then consider poison magnitude or a suitable damage modifier. Add duration when it helps poison persist through movement, and coverage when packs require too many separate shots. Check compatibility in the skill panel and read each penalty: a support that improves one part of the skill can weaken another.",
      "Replace gear when campaign progress exposes a specific weakness. Slow kills with comfortable survival suggest reviewing the bow, gem level, and supports. Sudden deaths call for life, resistances, and safer positioning. Change one piece or support at a time, then repeat a familiar encounter so you can tell whether the adjustment actually helped.",
      "Practice bosses with a short routine: wait for a committed attack to finish, apply poison from a safe angle, then move before the next windup. Start with a brief attack window rather than trying to maintain every possible stack. Expand the window only after you can repeat it without being hit. This habit remains useful when damage and enemy pressure increase.",
    ],
    endgameNotes: [
      "For bossing, prioritize damage you can sustain while responding to mechanics. Apply your main skill during recovery windows and refresh before poisons expire when it is safe. Use Despair only when the casting commitment fits the opening. Skipping a utility cast is preferable to losing the attempt while trying to complete an elaborate sequence.",
      "For mapping, test whether coverage or application speed matters more than extra duration. Do not stay beside a poisoned pack simply to watch it die, but do not run blindly into the next group either. Clear an escape lane, move into known space, and return to dangerous survivors from an angle where you can see their attacks.",
      "Avoid confusing poison application with poison consumption. Acidic Concoction consumes poison and cannot serve as the poison applicator; it replaced the older Poisonous Concoction skill. A consumption setup needs a separate application plan and changes your rhythm. Keep the bow routine simple before adding a payoff skill that removes the damage you intended to leave ticking.",
      "Common mistakes include buying hit penetration for poison damage, assuming more attacks always mean more active poisons, and copying support names without reading their restrictions. Another trap is sacrificing every defensive slot to chase a damage estimate. Assess progress using repeatable kills, flask use, and survival, not an untested tier label or a promised damage number.",
    ],
    lastUpdated: "2026-09-18",
    faq: [
      {
        question: "Is Poison Assassin a class or an ascendancy requirement?",
        answer: "Poison Assassin is the name of this mobile poison playstyle guide. The setup described here starts from Ranger and bow skills; it does not require selecting an ascendancy named Assassin. Choose your ascendancy for the poison, utility, and defensive tools you intend to use, rather than treating the guide title as a character-creation option.",
      },
      {
        question: "What should I improve first if poison damage feels low?",
        answer: "Confirm that your main skill applies poison reliably, then inspect the damage feeding that poison and your poison magnitude. Check whether you can maintain the active poisons your setup allows. More duration will not solve an application problem, and faster attacks will not compensate for running out of mana halfway through the fight.",
      },
      {
        question: "Which support gems should I prioritize?",
        answer: "Choose compatible supports that solve a specific problem: dependable application, stronger poison, useful duration, or pack coverage. Compare the skill details after each change and test against the same enemy. Keep a boss arrangement focused on sustained damage and a clearing arrangement focused on practical coverage; do not assume one combination is best for both.",
      },
      {
        question: "Can I level with this POE2 poison build?",
        answer: "Yes, build toward the ranged poison routine while using skills available at your level. Keep your bow, defenses, and main supports current before investing in optional utility. If the transition feels weaker than your previous attack, identify whether gem access, application, accuracy, or mana is the limiting factor before committing more resources.",
      },
      {
        question: "How should I approach The Executioner with poison?",
        answer: "Use short application windows after a committed attack finishes, then reposition with an escape route in mind. Existing poison can work while you move, but it does not make a dangerous windup safe to attack through. Learn the dodge timing first and add more attacks only when you can repeat the opening cleanly.",
      },
      {
        question: "Should I switch to Lightning Arrow for faster clearing?",
        answer: "Compare the playstyles before spending on a conversion. Lightning Arrow emphasizes a different damage plan, so your poison supports and passive choices are not automatically a good match. First try improving coverage and sustain on the poison setup. Switch when you prefer the alternative playstyle and can support its gear and passive requirements.",
      },
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
  lastUpdated: build.lastUpdated ?? "2026-05-11",
  faq: build.faq ?? [
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
