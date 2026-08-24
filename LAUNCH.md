# ArchLint launch copy

These drafts are intentionally problem-first. Replace or shorten details to match the community before posting.

## Show HN

### Title

Show HN: ArchLint – A linter that stops coding agents from breaking your architecture

### Post

CLAUDE.md and AGENTS.md are instructions, not enforcement.

I kept seeing coding agents introduce dependencies or bypass architectural boundaries that were explicitly documented. The code often worked, but the architecture slowly drifted.

So I tried treating architecture decisions like lint rules.

ArchLint checks the Git diff, not the coding agent. That means it works with Claude Code, Codex, Cursor, other agents, and human-written code.

The current open-source release supports:

- forbidden dependencies
- import boundaries
- protected paths
- GitHub Actions

Deterministic checks run entirely locally. There is no account, dashboard, or API key.

```bash
npx archlint-ai init
npx archlint-ai check
```

GitHub: https://github.com/errrt/archlint

The main thing I want to learn is which architecture rule people need next.

## Reddit

### Title

Claude kept ignoring my architecture decisions, so I turned them into lint rules

### Post

I use coding agents for changes across multiple files, and I kept hitting the same problem: the implementation worked, but it bypassed a boundary or introduced a dependency the project had explicitly ruled out.

Documentation helped, but it did not enforce anything. I built a small OSS CLI that checks the resulting Git diff against `.archlint.yml`.

For example, it can prevent UI components from importing the database layer, block Firebase in a Supabase project, or warn when authentication files change.

It runs locally and in GitHub Actions:

```bash
npx archlint-ai init
npx archlint-ai check
```

Repository: https://github.com/errrt/archlint

It is intentionally small right now. I would especially value concrete examples of rules you wish your coding agent could not break.

## X

CLAUDE.md and AGENTS.md are instructions, not enforcement.

I built ArchLint: an OSS CLI that checks Git diffs and blocks coding agents when they violate your architecture rules.

- forbidden dependencies
- import boundaries
- protected paths
- GitHub Actions
- deterministic checks run locally

`npx archlint-ai init`

https://github.com/errrt/archlint
