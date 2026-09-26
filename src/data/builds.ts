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
    relatedBosses: ["count-geonor", "executioner", "endgame-titan"],
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
    playstyle: "Mobile lightning bow",
    difficulty: "Beginner",
    summary:
      "A Ranger bow plan built around Lightning Arrow for packs, a deliberate setup for durable targets, and short attack windows that leave room to move. Progress through weapon, resource, and defensive upgrades before adding more skills.",
    strengths: [
      "Choose this build if you enjoy aiming from range and alternating attacks with movement. The main clearing skill can remain consistent while you learn how each encounter changes your positioning. You do not need to manage several competing damage skills just to establish the basic campaign routine.",
      "The setup has clear upgrade questions. When hits feel weak, examine the bow and relevant damage supports. When firing stops, examine mana use. When you lose an encounter while damage feels adequate, improve defenses or shorten your attack sequence. Those separate checks make a failed attempt more informative.",
      "Lightning Arrow's coverage suits grouped enemies. You can aim into an accessible part of a pack and move into space it clears, instead of walking directly through the group. A simple clearing routine also leaves attention available for dangerous rare enemies and incoming attacks.",
    ],
    weaknesses: [
      "Clearing a pack quickly does not prove the setup can kill an isolated boss comfortably. Coverage supports, a weak weapon, and interrupted attacks can all produce that mismatch. Expect to evaluate your single-target routine separately rather than assuming every mapping improvement also improves boss damage.",
      "This is an active bow playstyle, not a plan for standing still through attacks. Evasion helps against appropriate threats but cannot replace a life pool, resistances, recovery, or leaving ground hazards. If constant retreat prevents all damage, examine positioning and defenses before buying more attack speed.",
      "Adding a second skill creates another resource and timing cost. A placement skill that looks strong on a stationary target can contribute little when the boss immediately moves. Keep the routine simple enough to execute under pressure; optional utility should earn its place through actual encounters.",
    ],
    coreSkills: [
      "Lightning Arrow is the main attack. Use a bow that supports its damage and a compatible damage support you can sustain. Its arrow and beam components do not behave identically, so inspect the skill panel rather than copying a support list from a lightning spell character.",
      "Lightning Rod is the complementary option for durable enemies. Place rods near the area where the target is likely to remain, then use Lightning Arrow while you have a safe opening. The rods interact with chaining lightning beams. Start with a short placement sequence; spending the whole opening placing rods leaves no time to fire or evade.",
      "For Lightning Arrow supports, prioritize dependable hit damage first. Consider additional beam coverage when packs remain spread out, and a compatible penetration option when lightning resistance is the relevant obstacle. Read every cost and penalty. A support that reduces a damage component you rely on may make an impressive-looking arrangement worse.",
      "For the secondary skill, favor an arrangement you can place quickly and afford alongside your main attack. Do not spend scarce upgrades on several alternative boss tools before testing this pair. If the target moves out of the setup, resume safe direct attacks rather than repeatedly rebuilding the whole field in danger.",
      "Keep movement as part of the rotation. Dodge away from an incoming path, fire during the resulting opening, then reassess. An optional utility skill must fit between those decisions. Neither an extra button nor a larger tooltip number is worth repeatedly losing the opportunity to move.",
    ],
    recommendedGear: [
      "Bow: compare the damage your actual skill gains, not only an item's overall damage total. Physical damage can feed Lightning Arrow's conversion, and added lightning damage can also help. Keep accuracy and attack speed in view, and test a prospective upgrade with the same supports before deciding which modifier made the difference.",
      "Quiver and jewelry: use these slots to fix missing attributes, accuracy, resources, or useful attack damage without breaking resistance coverage. Spell damage is not a general improvement to a bow attack. A low-cost item that closes a real gap can be more useful than an expensive offensive item with requirements you cannot meet.",
      "Armour slots: establish life and elemental resistances, then improve evasion and other defensive layers appropriate to the character. Check the complete equipment set after each swap. Removing the only item covering a resistance or attribute requirement can make a damage upgrade a net loss during the next area.",
      "Boots and recovery: comfortable movement helps you leave telegraphs without abandoning the whole damage window. Keep recovery appropriate to the content and inspect mana over repeated attacks. Do not assume a flask that carries one short pack will sustain a long boss attempt with an additional placement skill.",
    ],
    levelingTips: [
      "Early progression: use the bow skill you can equip, then establish Lightning Arrow with a modest, sustainable support arrangement. Keep one main attack current before spreading upgrades across optional skills. If you cannot meet a gem requirement comfortably, continue with the working setup while fixing the specific attribute or equipment gap.",
      "As tougher enemies appear, add Lightning Rod only after the main attack feels dependable. Practice placement on a familiar durable target, then fire and move. Compare that sequence with simply using Lightning Arrow. Keep the extra skill when it produces useful damage without exhausting mana or causing avoidable hits.",
      "Before Count Geonor, check cold resistance alongside life and physical-hit protection. During sword exchanges, use short openings; during mist pressure, prioritize room to move. A successful preparation change should help you survive the same pattern more reliably, not merely increase the damage shown while standing in town.",
      "When progression stalls, repeat a familiar area and change one variable: bow, support, resource recovery, or a defensive slot. Note whether enemies need fewer clean attack sequences, whether mana lasts, and whether you finish with recovery remaining. This gives you a reason for the next upgrade instead of rebuilding the character after every death.",
    ],
    endgameNotes: [
      "Clear-speed plan: approach packs from visible ground, fire into the group, and move only after an escape lane opens. Return to dangerous survivors from a readable angle. If ordinary packs already fall comfortably, prioritize safety and sustained movement before adding more projectiles or coverage at the expense of damage.",
      "Bossing plan: wait for a committed attack to finish, place the secondary skill if the boss is likely to remain there, then fire a short sequence. Skip placement in a small opening. After the boss moves, choose between direct attacks and replacing the setup; chasing an old placement is not a reason to cross a dangerous area.",
      "Defensive plan: treat life, resistances, recovery, and positioning as one system. If you repeatedly lose health while firing, reduce the sequence length. If one hit ends the attempt, inspect defenses and the attack itself. Extra damage is useful only after you can reach and repeat your chosen opening.",
      "Common mistakes: copying spell supports onto an attack, assuming extra chains multiply damage on one target, placing too many rods while a boss prepares an attack, and buying attack speed that the mana supply cannot support. Another trap is measuring clear speed in an easy area while ignoring deaths and recovery use in the content you actually want to complete.",
    ],
    lastUpdated: "2026-09-26",
    faq: [
      {
        question: "Who should play Lightning Ranger?",
        answer: "Players who want a bow character with a simple clearing skill and active movement. Choose it for that combat rhythm, not a promise that it will outperform every alternative. You should be comfortable interrupting your own attacks when a boss starts a dangerous action.",
      },
      {
        question: "Do I need a particular unique item or ascendancy?",
        answer: "The progression routine here does not depend on a named unique or a single ascendancy. Establish the bow attack, resource use, and defenses first. When choosing an ascendancy, compare what it contributes to the attack and defensive plan you are actually using.",
      },
      {
        question: "What is the first upgrade when damage feels low?",
        answer: "Check whether attacks land and whether the bow provides useful damage to Lightning Arrow. Then inspect compatible supports. If attacks are frequently interrupted or mana runs out, those are uptime problems; buying another damage modifier may leave them unresolved.",
      },
      {
        question: "Can I use Lightning Arrow without Lightning Rod?",
        answer: "Yes. Establish the main attack first and use it alone when placement would be unsafe or the target will not stay nearby. The second skill is a practical option for durable targets, not a requirement to complete every attack sequence.",
      },
      {
        question: "Should boss supports be the same as clearing supports?",
        answer: "Not necessarily. Compare a hit-focused arrangement with your clearing arrangement on the same familiar encounter. Change one support, keep the weapon constant, and watch both resources and survival. Retain the version that performs better during real openings.",
      },
      {
        question: "How is this different from Poison Assassin?",
        answer: "This plan focuses on direct lightning bow damage and a possible placed-skill interaction. Poison Assassin emphasizes applying damage that continues while repositioning. Its poison-specific supports and passive priorities are not a ready-made conversion to this setup.",
      },
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
  seoDescription: build.slug === "lightning-ranger"
    ? "Build a practical Lightning Arrow Ranger: skill and support choices, bow upgrades, leveling, defenses, and a repeatable Lightning Rod boss routine."
    : `${build.summary} Includes skills, gear priorities, leveling tips, endgame notes, FAQs, and related POE2 guides.`,
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
