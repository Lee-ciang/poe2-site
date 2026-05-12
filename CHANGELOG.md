# Changelog

---

# 2026-05-12

## Added

### Skill Systems
- AI-assisted skill guide generation
- Structured skill database
- Markdown skill guide generation
- Skill SEO metadata generation

### Skill Clusters
Added Lightning Cluster:
- Arc
- Spark
- Chain Lightning
- Ball Lightning

Added Cold Cluster:
- Frostbolt
- Ice Nova
- Ice Spear
- Freezing Shards

Added Fire Cluster:
- Fireball
- Flame Wall
- Meteor

Added Melee Cluster:
- Earthshatter
- Whirlwind

Added Chaos Archetype:
- Poison Arrow

### Internal Linking
- relatedSkills system
- Related Links rendering
- Skill-to-skill linking
- Cluster internal SEO linking

### Skill Hub Improvements
- Grouped skill categories
- Lightning section
- Cold section
- Fire section
- Melee section
- Chaos section

### Category Pages
Created:
- /skills/category/lightning
- /skills/category/cold
- /skills/category/fire
- /skills/category/melee
- /skills/category/chaos

---

## Fixed

### Related Links
- Fixed empty Related Links rendering
- Fixed markdown relatedSkills parsing
- Fixed missing internal links

### Next.js Routing
- Fixed dynamic route conflict
- Reorganized category route structure

### Skill Page UX
- Improved section formatting
- Improved title/content separation
- Improved skill cluster organization

---

## Architecture Changes

### SEO Structure
Implemented:
- Hub → Category → Detail structure
- Internal topic graph
- Archetype clustering
- Structured topical authority system

### Current Main Routes

Skill Hub:
- /skills

Skill Categories:
- /skills/category/[type]

Skill Guides:
- /guides/skills/[slug]