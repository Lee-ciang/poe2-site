# AI Guide Generation Workflow

The POE2 site can generate Markdown guide drafts with the OpenAI API. AI generation is intended to create a strong first draft, not final publish-ready content.

## Setup

1. Copy `.env.local.example` to `.env.local`.
2. Add your API key:

```bash
OPENAI_API_KEY=your_key_here
```

Optional:

```bash
OPENAI_MODEL=gpt-4.1-mini
OPENAI_MAX_OUTPUT_TOKENS=1200
```

## Generate AI Content

Use the normal generator with `--ai`:

```bash
npm run generate-guide build frost-sorc "Frost Sorceress Build Guide" --ai
```

Or use the AI-specific script:

```bash
npm run generate-guide:ai build frost-sorc "Frost Sorceress Build Guide"
```

The script creates a Markdown file under:

- `build` -> `src/content/guides/builds`
- `boss` -> `src/content/guides/bosses`
- `skill` -> `src/content/guides/skills`

The generator will not overwrite an existing file.

## Cost Control

Use `gpt-4.1-mini` for first-pass guide drafts. It is the default model because SEO drafts need clear structure, practical advice, and good editing discipline more than maximum reasoning power.

Higher-cost models are usually unnecessary for initial POE2 content production. Generate one page first, review the quality, adjust the prompt or template if needed, and only then scale to more pages.

The generator also uses `OPENAI_MAX_OUTPUT_TOKENS=1200` by default to avoid accidentally large responses. Lower this value in `.env.local` when you want shorter drafts:

```bash
OPENAI_MAX_OUTPUT_TOKENS=800
```

The script prints the model name, rough prompt token estimate, and output token limit before generation so cost-related settings are visible before a request is sent.

## Review Content

Every AI-generated page starts as `contentStatus: draft`. Before publishing:

1. Confirm the guide matches current POE2 patch behavior.
2. Replace vague advice with tested, specific player guidance.
3. Remove any invented mechanics, support interactions, rewards, or exact numbers.
4. Add useful related guide links in frontmatter.
5. Update `contentStatus` to `needs-review`.
6. After human review and verification, update `contentStatus` to `verified`.

## Avoid Hallucinated Information

Do not publish AI output that includes:

- Exact DPS, drop rates, or scaling formulas without verification.
- Boss phase names or rewards that have not been checked.
- Patch claims that are not tied to current patch notes or testing.
- Skill support interactions that have not been validated.
- Generic recommendations without a gameplay reason.

When uncertain, keep the page in `needs-review` and add a note in `Content Notes`.

## Recommended Human Review Flow

1. Generate draft.
2. Read the guide as a player and mark anything vague or suspicious.
3. Compare against current game behavior, patch notes, and internal structured data.
4. Add practical examples, tradeoffs, and internal links.
5. Run `npm run lint` and `npm run build`.
6. Mark as `verified` only when the page is useful, current, and defensible.
