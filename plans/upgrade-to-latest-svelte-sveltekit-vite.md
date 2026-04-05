# Upgrade Plan: Svelte 5 + SvelteKit 2 + Vite 6

> Created: 2026-04-05
> Updated: 2026-04-05
> Status: Ready to execute

---

## 1. Current State

| Package                     | Current | Latest Stable                     |
| --------------------------- | ------- | --------------------------------- |
| `svelte`                    | ^3.55.0 | 5.55.1                            |
| `@sveltejs/kit`             | ^1.0.0  | 2.56.1                            |
| `vite`                      | ^4.0.0  | 8.0.3                             |
| `@sveltejs/adapter-netlify` | ^1.0.0  | 6.0.4                             |
| `@sveltejs/adapter-auto`    | next    | (to remove)                       |
| `@sveltejs/adapter-static`  | ^1.0.5  | (to remove)                       |
| `mdsvex`                    | ^0.10.6 | 0.12.7                            |
| `svelte-preprocess`         | ^4.10.7 | 6.0.3                             |
| `prettier`                  | ^2.5.1  | 3.5.1                             |
| `prettier-plugin-svelte`    | ^2.5.0  | 3.5.1                             |
| `eslint`                    | ^8.12.0 | 9.x (staying on 8)                |
| `eslint-plugin-svelte3`     | ^4.0.0  | ❌ Dead                           |
| `eslint-config-prettier`    | ^8.3.0  | ^9.x (staying on ESLint 8 compat) |
| `sass`                      | ^1.56.2 | 1.99.0                            |
| `svead`                     | ^0.0.4  | 0.0.15                            |
| `svelte-hamburgers`         | ^4.0.1  | 5.0.0                             |
| `svelte-mount`              | ^1.0.2  | 3.0.2                             |
| `d3`                        | ^7.7.0  | 7.9.0                             |
| `@playwright/test`          | ^1.21.0 | 1.x latest (deprioritised)        |
| `rehype-slug`               | ^5.1.0  | 6.0.0                             |
| `rehype-autolink-headings`  | ^6.1.1  | 7.1.0                             |
| `@fontsource/*`             | ^4.x    | 5.x                               |

**Package manager:** npm (has `package-lock.json`)
**Node version:** v22.14.0

---

## 2. Target Version Matrix

The recommended combination prioritises **proven stability** over bleeding-edge. SvelteKit 2 (latest) supports Vite 5, 6, 7-beta, and 8 — but Vite 6 is the most battle-tested pairing with Svelte 5. Vite 8 is extremely new (8.0.3, released recently), so we avoid it for now.

| Package                     | Target Version | Reason                                               |
| --------------------------- | -------------- | ---------------------------------------------------- |
| `svelte`                    | **^5.55.0**    | Latest stable                                        |
| `@sveltejs/kit`             | **^2.56.0**    | Latest stable, supports Svelte 5 + Vite 6            |
| `vite`                      | **^6.0.0**     | Most stable pairing with SvelteKit 2                 |
| `@sveltejs/adapter-netlify` | **^6.0.0**     | Requires @sveltejs/kit ^2.31.0                       |
| `mdsvex`                    | **^0.12.0**    | Supports Svelte 5                                    |
| `svelte-preprocess`         | **^6.0.0**     | Supports Svelte 5 (needed for SCSS in 10 components) |
| `prettier`                  | **^3.0.0**     | Required by prettier-plugin-svelte 3                 |
| `prettier-plugin-svelte`    | **^3.5.0**     | Supports Svelte 5, requires Prettier 3               |
| `eslint-plugin-svelte`      | **^3.0.0**     | Replaces dead `eslint-plugin-svelte3`                |
| `sass`                      | **^1.99.0**    | Minor update, no breaking changes                    |
| `svead`                     | **^0.0.15**    | Supports Svelte 5                                    |
| `svelte-hamburgers`         | **^5.0.0**     | Requires Svelte 5                                    |
| `svelte-mount`              | **^3.0.0**     | Requires Svelte 5                                    |
| `d3`                        | **^7.9.0**     | Minor bump, no breaking changes                      |
| `@fontsource/*`             | **^5.0.0**     | File path changes                                    |
| `rehype-slug`               | **^6.0.0**     | ESM-only, should work                                |
| `rehype-autolink-headings`  | **^7.0.0**     | ESM-only, should work                                |

### Packages to Remove

| Package                    | Reason                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `@sveltejs/adapter-auto`   | Not needed — using adapter-netlify                                                          |
| `@sveltejs/adapter-static` | Not needed — using adapter-netlify                                                          |
| `eslint-plugin-svelte3`    | Dead, replaced by `eslint-plugin-svelte`                                                    |
| `svelte-mount`             | Only used for `$mounted` store in Nav.svelte; trivially replaced with `onMount` + a boolean |

---

## 3. Codebase Migration Scope

### 3.1 Svelte 3 → 5 Syntax Changes (61 `.svelte` files)

Svelte 5 has a **backward compatibility mode** that can run most Svelte 3/4 syntax. This means we can upgrade packages first, confirm the build works with compat mode, then migrate component syntax incrementally.

#### Patterns found that will need migration:

| Pattern                                | Count               | Svelte 5 Replacement                             |
| -------------------------------------- | ------------------- | ------------------------------------------------ |
| `export let prop`                      | ~20+ files          | `let { prop } = $props()`                        |
| `$:` reactive statements               | ~15+ files          | `$derived()` / `$effect()`                       |
| `<slot />`                             | ~15 files           | `{@render children()}`                           |
| `on:click` / `on:keydown`              | ~10+ files          | `onclick` / `onkeydown`                          |
| `$app/stores` (`$page`, `$navigating`) | 6 files             | `$app/state` (`page`, `navigating`)              |
| `createEventDispatcher`                | 2 files             | Callback props                                   |
| `transition:fade\|local`               | 2 instances         | `transition:fade` (local is default in Svelte 5) |
| `$app/env` (in `store.js`)             | 1 file              | `$app/environment`                               |
| Svelte stores (`writable`)             | 1 file (`store.js`) | Still works, optionally migrate to runes         |

#### SCSS usage (10 components with `lang="scss"`)

Svelte 5 still supports preprocessors via `svelte-preprocess` (v6). No change needed for SCSS to work, just update the package.

### 3.2 SvelteKit 1 → 2 Breaking Changes

Key changes that affect this codebase:

1. **`$app/stores` → `$app/state`** — 6 files use `$page` / `$navigating`
2. **`$app/env` → `$app/environment`** — `store.js` uses `browser` from `$app/env`
3. **`throw error()` → `error()`** — `+layout.js` uses `throw error(500, err)`
4. **`sveltekit:prefetch` → removed** — SvelteKit 2 does hover preloading by default; use `data-sveltekit-preload-data` if explicit control is needed. Found in 5 places: `Card.svelte`, `Nav.svelte`, `+page.svelte` (3 links)
5. **`vite.config.js` format** — Current config is fine, no changes needed
6. **`svelte.config.js`** — Adapter and preprocessor imports need updating

### 3.3 Config File Changes

#### `svelte.config.js`

- Update `svelte-preprocess` import (v6 has named export changes)
- Remove `@sveltejs/adapter-auto`, use only `adapter-netlify`

#### `vite.config.js`

- Current config is minimal and should work as-is

#### `.eslintrc.cjs`

- Rewrite for `eslint-plugin-svelte` (replaces dead `svelte3` plugin)
- Keep ESLint 8 + `.eslintrc.cjs` format (no flat config migration)

#### `mdsvex.config.js`

- Update mdsvex import (v0.12 may have API changes)
- Update rehype plugin versions

#### `package.json` scripts

- Remove `--plugin-search-dir=.` from prettier/lint commands (deprecated in Prettier 3)

---

## 4. Phased Execution Plan

### Phase 0: Preparation (Pre-Flight)

- [ ] Create a new git branch: `upgrade/svelte5-sveltekit2`
- [ ] Ensure the project currently builds (run `npm install && npm run build`)
- [ ] Commit any uncommitted changes

### Phase 1: Package Updates (Get It Building)

**Goal:** Update all packages, fix config files, confirm the build runs using Svelte 5's compat mode (old syntax still works).

1. **Update `package.json`** with new version ranges (see target matrix above)
2. **Remove dead packages:** `@sveltejs/adapter-auto`, `@sveltejs/adapter-static`, `eslint-plugin-svelte3`
3. **Add new packages:** `eslint-plugin-svelte`
4. **Update config files:**
   - `svelte.config.js` — fix imports
   - `.eslintrc.cjs` → `eslint.config.js` — migrate to new plugin
   - `mdsvex.config.js` — fix import if needed
   - `package.json` scripts — remove deprecated prettier flags
5. **Fix `$app/env` → `$app/environment`** in `store.js` (hard break, no compat)
6. **Fix `throw error()` → `error()`** in `+layout.js` (hard break, no compat)
7. **Remove `sveltekit:prefetch`** from all 5 occurrences in `Card.svelte`, `Nav.svelte`, `+page.svelte` (SvelteKit 2 preloads on hover by default)
8. **Replace `svelte-mount`** in `Nav.svelte` — replace `import { mounted } from 'svelte-mount'` + `$mounted` with a simple `let isMounted = false; onMount(() => { isMounted = true; })` pattern
9. **Run `npm install`**
10. **Run `npm run build`** — fix any remaining errors
11. **Run `npm run dev`** — smoke test in browser
12. **Commit:** `chore: upgrade to Svelte 5, SvelteKit 2, Vite 6`

### Phase 2: Migrate Component Syntax to Svelte 5 Runes

**Goal:** Replace all Svelte 3/4 patterns with Svelte 5 idioms. Work file-by-file, test after each batch.

**Order of migration** (safest to most complex):

#### Batch A — Simple prop components (low risk)

SVG components and simple presentational components:

- `svg/Bluesky.svelte`, `svg/Mastodon.svelte`, `svg/HalftoneWave.svelte`, `svg/Shape.svelte`, `svg/ClipboardSVG.svelte`, `svg/IconStroke.svelte`
- `Heading.svelte`, `ButtonSimple.svelte`, `ButtonBack.svelte`, `InlineLink.svelte`
- `EmbedIFrame.svelte`, `Accordion.svelte`

Changes: `export let` → `$props()`, `<slot />` → `{@render children()}`

#### Batch B — Event handler components

- `posts/Toggle.svelte`, `posts/ColoursNightSkyShapeApp.svelte`
- `Image.svelte`, `Switch.svelte`, `CodeFence.svelte`, `PatternShuffle.svelte`
- `UnitSpan.svelte`, `Hamburger.svelte`

Changes: `on:click` → `onclick`, `export let` → `$props()`, `createEventDispatcher` → callback props

#### Batch C — Reactive / data components

- `posts/Scatter.svelte`, `posts/Bar.svelte`, `posts/DotPlot.svelte`, `posts/ListFlip.svelte`
- `Footer.svelte`, `Circles.svelte`, `Nav.svelte`

Changes: `$:` → `$derived()` / `$effect()`, `$app/stores` → `$app/state`, `bind:` stays the same

#### Batch D — Layout & route components

- `+layout.svelte` — `$page` store → `page` from `$app/state`, `<slot />` → `{@render children()}`
- `+error.svelte` — `$page` → `page`
- `_post-layout.svelte`, `_sketch-layout.svelte`, `_mdsvex.svelte`
- `+page.svelte` files in routes

Changes: Store migration, slot migration, reactive statement migration

#### Batch E — Store file (`store.js`)

- Migrate `writable` stores → can keep as-is (stores still work in Svelte 5)
- Or convert to `$state` runes in `.svelte.js` files (optional, nice-to-have)

**After each batch:**

- [ ] Run `npm run build`
- [ ] Smoke test in browser
- [ ] Commit

### Phase 3: Cleanup & Polish

- [ ] Remove any Svelte 3/4 compat warnings from console
- [ ] Verify `@fontsource` v5 imports (path structure changed: e.g. `@fontsource/ibm-plex-sans/300.css` should still work)
- [ ] Run full Playwright test suite
- [ ] Update `.prettierrc` if needed
- [ ] Final build + deploy test to Netlify

---

## 5. Risk Assessment

| Risk                                                   | Likelihood | Impact | Mitigation                                                                                                          |
| ------------------------------------------------------ | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| mdsvex + Svelte 5 compat issues                        | Medium     | High   | mdsvex 0.12 explicitly supports Svelte 5; but `.md` content uses Svelte component syntax that might need adjustment |
| `svelte-hamburgers` v5 API changes                     | Low        | Low    | Small component, easy to adapt                                                                                      |
| `svelte-mount` v3 API changes                          | Low        | Low    | Check import/usage changes                                                                                          |
| SCSS preprocessing breaks                              | Low        | Medium | `svelte-preprocess` v6 supports Svelte 5; verify 10 SCSS components                                                 |
| `mdsvex-global-components.js` custom helper breaks     | Medium     | High   | This is a custom preprocessor; may need updating for mdsvex 0.12 API                                                |
| `rehype-slug` / `rehype-autolink-headings` ESM changes | Low        | Low    | Already ESM project                                                                                                 |
| `transition:fade\|local` syntax                        | Low        | Low    | `\|local` is default in Svelte 5, just remove the modifier                                                          |
| Markdown posts with inline Svelte components           | Medium     | Medium | Test all posts manually — mdsvex renders Svelte inside markdown                                                     |
| Netlify adapter build                                  | Low        | Medium | Adapter v6 is well-tested with SvelteKit 2                                                                          |

---

## 6. Estimated Effort

| Phase                                   | Effort         |
| --------------------------------------- | -------------- |
| Phase 0: Prep                           | 15 min         |
| Phase 1: Package updates + config       | 1–2 hours      |
| Phase 2: Component migration (61 files) | 3–5 hours      |
| Phase 3: Cleanup & testing              | 1–2 hours      |
| **Total**                               | **~5–9 hours** |

The majority of the 61 components are small and repetitive (SVG icons, simple wrappers). The complex work is in the layout files, Nav, Footer, and data-viz components.

---

## 7. Future-Proofing: Keeping Packages Updated

### Recommended Practices

#### 1. **Renovate Bot** (Best for solo / small team)

Add a `renovate.json` to the repo and enable [Renovate](https://github.com/renovatebot/renovate) on GitHub. It auto-creates PRs for dependency updates on a schedule.

```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["config:recommended", "schedule:monthly", ":separateMajorReleases"],
	"packageRules": [
		{
			"matchPackagePatterns": ["svelte", "@sveltejs/*"],
			"groupName": "Svelte ecosystem"
		},
		{
			"matchUpdateTypes": ["major"],
			"dependencyDashboardApproval": true
		}
	]
}
```

- Groups Svelte-related updates together
- Auto-merges patch/minor, requires approval for major
- Monthly schedule prevents noise

#### 2. **Dependabot** (GitHub native, simpler)

Add `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: '/'
    schedule:
      interval: monthly
    groups:
      svelte:
        patterns: ['svelte', '@sveltejs/*']
      linting:
        patterns: ['eslint*', 'prettier*']
```

Simpler than Renovate, built into GitHub, but less configurable.

#### 3. **Manual quarterly check** (if you prefer control)

Run these commands periodically:

```bash
# See what's outdated
npm outdated

# Interactive update tool
npx npm-check-updates -i

# Check for security issues
npm audit
```

#### 4. **Pin major, float minor/patch**

Use version ranges like `^5.0.0` (not `5.55.1`) in `package.json`. This lets `npm install` get patches automatically while preventing surprise major bumps.

#### 5. **Lock file hygiene**

- Always commit `package-lock.json`
- Periodically run `npm audit fix`
- When you return after a long break: `rm -rf node_modules package-lock.json && npm install` for a clean slate

### My Recommendation

**Use Renovate Bot** — it's free, works unattended, and creates clean PRs you can merge on your schedule. For a personal site you check infrequently, the monthly schedule + auto-merge for patches is perfect.

---

## 8. Decisions (Resolved)

| Question               | Decision                                                              |
| ---------------------- | --------------------------------------------------------------------- |
| ESLint v9 flat config? | **No** — stay on ESLint 8, keep `.eslintrc.cjs`                       |
| Playwright test suite? | **Deprioritised** — skip updating, can revisit later                  |
| Keep `svelte-mount`?   | **Remove it** — replace with a simple `onMount` boolean in Nav.svelte |
| Vite 6 or 8?           | **Vite 6** — proven stable pairing                                    |
| Netlify build config?  | **No special config** — standard setup                                |

---

## 9. Commands Cheat Sheet (for execution)

```bash
# Phase 1: Update packages
npm uninstall @sveltejs/adapter-auto @sveltejs/adapter-static eslint-plugin-svelte3 svelte-mount
npm install -D svelte@^5 @sveltejs/kit@^2 vite@^6 \
  @sveltejs/adapter-netlify@^6 \
  mdsvex@^0.12 svelte-preprocess@^6 \
  prettier@^3 prettier-plugin-svelte@^3 \
  eslint-plugin-svelte@^3 eslint-config-prettier@^9 \
  sass@^1.99 svead@latest \
  svelte-hamburgers@^5 \
  d3@^7.9

npm install rehype-slug@^6 rehype-autolink-headings@^7 \
  @fontsource/ibm-plex-mono@^5 \
  @fontsource/ibm-plex-sans@^5 \
  @fontsource/ibm-plex-sans-condensed@^5

# Verify
npm run build
npm run dev
```
