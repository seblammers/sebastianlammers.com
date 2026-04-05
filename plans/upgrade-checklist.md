# Upgrade Checklist: Svelte 5 + SvelteKit 2 + Vite 6

> See `upgrade-to-latest-svelte-sveltekit-vite.md` for full rationale and details.
> Mark items `[x]` as they are completed. Each phase ends with a commit.

---

## Phase 0: Preparation

- [x] Create git branch `upgrade/svelte5-sveltekit2` _(using `feat/upgrade-all-the-things`)_
- [x] Verify current project builds (`npm install && npm run build`)
- [x] Commit any uncommitted changes

---

## Phase 1: Package Updates & Config (Get It Building)

### 1a. Package changes

- [x] Uninstall dead/removed packages: `@sveltejs/adapter-auto`, `@sveltejs/adapter-static`, `eslint-plugin-svelte3`, `svelte-mount`
- [x] Install updated devDependencies:
  - [x] `svelte@^5`
  - [x] `@sveltejs/kit@^2`
  - [x] `vite@^6` + pinned `@sveltejs/vite-plugin-svelte@^6` _(v7 requires Vite 8)_
  - [x] `@sveltejs/adapter-netlify@^6`
  - [x] `mdsvex@^0.12`
  - [x] `svelte-preprocess@^6` _(removed — replaced by `vitePreprocess`)_
  - [x] `prettier@^3`
  - [x] `prettier-plugin-svelte@^3`
  - [x] `eslint-plugin-svelte@^3`
  - [x] `eslint-config-prettier@^9`
  - [x] `sass@^1.99`
  - [x] `svead@latest`
  - [x] `svelte-hamburgers@^5`
  - [x] `d3@^7.9`
- [x] Install updated dependencies:
  - [x] `rehype-slug@^6`
  - [x] `rehype-autolink-headings@^7`
  - [x] `@fontsource/ibm-plex-mono@^5`
  - [x] `@fontsource/ibm-plex-sans@^5`
  - [x] `@fontsource/ibm-plex-sans-condensed@^5`

### 1b. Config file updates

- [x] `svelte.config.js` — switched to `vitePreprocess()` from `@sveltejs/vite-plugin-svelte`; fixed mdsvex preprocessor order
- [x] `.eslintrc.cjs` — replaced `eslint-plugin-svelte3` with `eslint-plugin-svelte`
- [x] `mdsvex.config.js` — fixed named import from `mdsvex`; made layout paths absolute with `path.resolve`
- [x] `package.json` scripts — removed `--plugin-search-dir=.` from lint/format commands

### 1c. SvelteKit 1→2 hard breaks (no compat mode)

- [x] `src/lib/assets/js/store.js` — `$app/env` → `$app/environment`
- [x] `src/routes/+layout.js` — `throw error()` → `error()`
- [x] Remove `sveltekit:prefetch` (5 occurrences):
  - [x] `src/lib/components/Card.svelte`
  - [x] `src/lib/components/Nav.svelte`
  - [x] `src/routes/+page.svelte` (3 links)
- [x] `src/lib/components/Nav.svelte` — replace `svelte-mount` with `onMount` + boolean

> **Additional fixes applied during Phase 1:**
>
> - `mdsvex.config.js`: switched from default import to named import (`compileMdsvex`); made layout paths absolute
> - `svelte.config.js`: replaced `svelte-preprocess` with `vitePreprocess` (no `<style global>` usage; avoids globalStyle transformer bug on `.md` files)
> - `src/routes/posts/data-in-js-00/+page.md`: escaped `<script>`, `<style>`, `{this}` in inline code with HTML entities (Svelte 5 stricter parser)
> - `src/lib/components/Contact.svelte`: fixed self-closing `<textarea />`
> - All 8 `svead` `Head` usages: updated to new `seo_config` object API

### 1d. Verify

- [x] `npm install` succeeds
- [x] `npm run build` succeeds
- [x] `npm run dev` — smoke test: `/`, `/posts`, `/contact` all return HTTP 200
- [x] **Commit:** `chore: upgrade to Svelte 5, SvelteKit 2, Vite 6`

---

## Phase 2: Migrate Component Syntax to Svelte 5

> Each batch: migrate → build → smoke test → commit.

### Batch A — Simple prop / slot components

- [x] `src/lib/components/svg/Bluesky.svelte`
- [x] `src/lib/components/svg/Mastodon.svelte`
- [x] `src/lib/components/svg/HalftoneWave.svelte`
- [x] `src/lib/components/svg/Shape.svelte`
- [x] `src/lib/components/svg/ClipboardSVG.svelte`
- [x] `src/lib/components/svg/IconStroke.svelte`
- [x] `src/lib/components/Heading.svelte`
- [x] `src/lib/components/ButtonSimple.svelte`
- [x] `src/lib/components/ButtonBack.svelte`
- [x] `src/lib/components/InlineLink.svelte`
- [x] `src/lib/components/EmbedIFrame.svelte`
- [x] `src/lib/components/Accordion.svelte`
- [x] Build + smoke test — `/`, `/posts`, `/contact`, `/about`, `/posts/data-in-js-00` all 200
- [x] **Commit:** `refactor: migrate simple components to Svelte 5 runes`

### Batch B — Event handler components

- [x] `src/lib/components/posts/Toggle.svelte`
- [x] `src/lib/components/posts/ColoursNightSkyShapeApp.svelte`
- [x] `src/lib/components/Image.svelte`
- [x] `src/lib/components/Switch.svelte`
- [x] `src/lib/components/CodeFence.svelte`
- [x] `src/lib/components/PatternShuffle.svelte`
- [x] `src/lib/components/UnitSpan.svelte`
- [x] `src/lib/components/Hamburger.svelte`
- [x] `src/lib/components/GeneralObserver.svelte`
- [x] `src/lib/components/Readotron.svelte`
- [x] Build + smoke test — all 8 routes 200
- [x] **Commit:** `refactor: migrate event handler components to Svelte 5 runes`

### Batch C — Reactive / data-viz components

- [x] `src/lib/components/posts/Scatter.svelte`
- [x] `src/lib/components/posts/Bar.svelte`
- [x] `src/lib/components/posts/DotPlot.svelte`
- [x] `src/lib/components/posts/ListFlip.svelte`
- [x] `src/lib/components/Footer.svelte`
- [x] `src/lib/components/Circles.svelte`
- [x] `src/lib/components/Nav.svelte`
- [x] Build + smoke test — all 10 routes 200
- [x] **Commit:** `refactor: migrate reactive components to Svelte 5 runes`

### Batch D — Layout & route components

- [x] `src/routes/+layout.svelte`
- [x] `src/routes/+error.svelte`
- [x] `src/routes/posts/_post-layout.svelte`
- [x] `src/routes/sketches/_sketch-layout.svelte`
- [x] `src/routes/_mdsvex.svelte`
- [x] `src/routes/+page.svelte` _(no changes needed)_
- [x] `src/routes/posts/+page.svelte`
- [x] `src/routes/sketches/+page.svelte`
- [x] `src/routes/projects/+page.svelte`
- [x] `src/routes/posts/categories/[category]/+page.svelte`
- [x] `src/routes/sketches/categories/[category]/+page.svelte`
- [x] `src/routes/contact/+page.svelte`, `contact/success`, `links` _(no changes needed)_
- [x] Build + smoke test — all 13 routes 200
- [x] **Commit:** `refactor: migrate layout and route components to Svelte 5 runes`

### Batch E — Store file (optional)

- [x] `src/lib/assets/js/store.js` — kept as-is; `writable` stores work unchanged in Svelte 5; `$app/env` fix already applied in Phase 1; `isMenuOpen`/`currentPage` are dead exports (only used by unused `Hamburger.svelte`)

---

## Phase 3: Cleanup & Polish

- [x] Build warnings: zero compiler/Svelte warnings remain
- [x] `Image.svelte`: fixed expanded `<img>` → `<button>` wrapper; moved `onclick` to `<a>` tag
- [x] `Bar.svelte`: `svelte-ignore a11y_no_noninteractive_tabindex` for intentional SVG keyboard a11y
- [x] `.prettierrc` — added `prettier-plugin-svelte` plugin + svelte overrides (Prettier 3 no longer auto-discovers plugins)
- [x] `npm run lint` — 0 errors, 4 warnings (all `{@html}` on trusted content, working as intended)
  - Fixed: `eslint-plugin-svelte@3` → `^2.46.1` (v3 is ESLint 9 only)
  - Fixed: `.eslintrc.cjs` rules for `_`-prefix vars, `no-at-html-tags: warn`, `valid-compile: ignoreWarnings`
  - Fixed: `CodeFence`, `Toggle`, `Switch`, `Footer`, `Readotron`, `Scatter`, `Subfooter`, `Patterns`, `utils.js`, `+layout.js`, `_post-layout.svelte`
- [x] `npm run build` — final clean build (zero warnings)
- [ ] `npm run dev` — full manual browser smoke test (all routes, fonts, SCSS, markdown posts)
- [ ] **Commit:** `chore: cleanup post-upgrade`
- [ ] Merge branch into main
- [ ] Deploy to Netlify and verify production

---

## Post-Upgrade (Future-Proofing)

- [x] Added `renovate.json` — monthly schedule, Svelte ecosystem grouped, major releases require approval
- [ ] Decide on Playwright test suite update (currently deprioritised)
