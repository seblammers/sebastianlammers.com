# Upgrade Checklist: Svelte 5 + SvelteKit 2 + Vite 6

> See `upgrade-to-latest-svelte-sveltekit-vite.md` for full rationale and details.
> Mark items `[x]` as they are completed. Each phase ends with a commit.

---

## Phase 0: Preparation

- [ ] Create git branch `upgrade/svelte5-sveltekit2`
- [ ] Verify current project builds (`npm install && npm run build`)
- [ ] Commit any uncommitted changes

---

## Phase 1: Package Updates & Config (Get It Building)

### 1a. Package changes

- [ ] Uninstall dead/removed packages: `@sveltejs/adapter-auto`, `@sveltejs/adapter-static`, `eslint-plugin-svelte3`, `svelte-mount`
- [ ] Install updated devDependencies:
  - [ ] `svelte@^5`
  - [ ] `@sveltejs/kit@^2`
  - [ ] `vite@^6`
  - [ ] `@sveltejs/adapter-netlify@^6`
  - [ ] `mdsvex@^0.12`
  - [ ] `svelte-preprocess@^6`
  - [ ] `prettier@^3`
  - [ ] `prettier-plugin-svelte@^3`
  - [ ] `eslint-plugin-svelte@^3`
  - [ ] `eslint-config-prettier@^9`
  - [ ] `sass@^1.99`
  - [ ] `svead@latest`
  - [ ] `svelte-hamburgers@^5`
  - [ ] `d3@^7.9`
- [ ] Install updated dependencies:
  - [ ] `rehype-slug@^6`
  - [ ] `rehype-autolink-headings@^7`
  - [ ] `@fontsource/ibm-plex-mono@^5`
  - [ ] `@fontsource/ibm-plex-sans@^5`
  - [ ] `@fontsource/ibm-plex-sans-condensed@^5`

### 1b. Config file updates

- [ ] `svelte.config.js` — fix adapter & preprocessor imports
- [ ] `.eslintrc.cjs` — replace `eslint-plugin-svelte3` with `eslint-plugin-svelte`
- [ ] `mdsvex.config.js` — verify/fix import for mdsvex 0.12
- [ ] `package.json` scripts — remove `--plugin-search-dir=.` from lint/format commands

### 1c. SvelteKit 1→2 hard breaks (no compat mode)

- [ ] `src/lib/assets/js/store.js` — `$app/env` → `$app/environment`
- [ ] `src/routes/+layout.js` — `throw error()` → `error()`
- [ ] Remove `sveltekit:prefetch` (5 occurrences):
  - [ ] `src/lib/components/Card.svelte`
  - [ ] `src/lib/components/Nav.svelte`
  - [ ] `src/routes/+page.svelte` (3 links)
- [ ] `src/lib/components/Nav.svelte` — replace `svelte-mount` with `onMount` + boolean

### 1d. Verify

- [ ] `npm install` succeeds
- [ ] `npm run build` succeeds
- [ ] `npm run dev` — smoke test in browser (home, posts, nav, mobile menu)
- [ ] **Commit:** `chore: upgrade to Svelte 5, SvelteKit 2, Vite 6`

---

## Phase 2: Migrate Component Syntax to Svelte 5

> Each batch: migrate → build → smoke test → commit.

### Batch A — Simple prop / slot components

- [ ] `src/lib/components/svg/Bluesky.svelte`
- [ ] `src/lib/components/svg/Mastodon.svelte`
- [ ] `src/lib/components/svg/HalftoneWave.svelte`
- [ ] `src/lib/components/svg/Shape.svelte`
- [ ] `src/lib/components/svg/ClipboardSVG.svelte`
- [ ] `src/lib/components/svg/IconStroke.svelte`
- [ ] `src/lib/components/Heading.svelte`
- [ ] `src/lib/components/ButtonSimple.svelte`
- [ ] `src/lib/components/ButtonBack.svelte`
- [ ] `src/lib/components/InlineLink.svelte`
- [ ] `src/lib/components/EmbedIFrame.svelte`
- [ ] `src/lib/components/Accordion.svelte`
- [ ] Build + smoke test
- [ ] **Commit:** `refactor: migrate simple components to Svelte 5 runes`

### Batch B — Event handler components

- [ ] `src/lib/components/posts/Toggle.svelte`
- [ ] `src/lib/components/posts/ColoursNightSkyShapeApp.svelte`
- [ ] `src/lib/components/Image.svelte`
- [ ] `src/lib/components/Switch.svelte`
- [ ] `src/lib/components/CodeFence.svelte`
- [ ] `src/lib/components/PatternShuffle.svelte`
- [ ] `src/lib/components/UnitSpan.svelte`
- [ ] `src/lib/components/Hamburger.svelte`
- [ ] `src/lib/components/GeneralObserver.svelte` (uses `createEventDispatcher`)
- [ ] `src/lib/components/Readotron.svelte` (uses `createEventDispatcher`)
- [ ] Build + smoke test
- [ ] **Commit:** `refactor: migrate event handler components to Svelte 5 runes`

### Batch C — Reactive / data-viz components

- [ ] `src/lib/components/posts/Scatter.svelte`
- [ ] `src/lib/components/posts/Bar.svelte`
- [ ] `src/lib/components/posts/DotPlot.svelte`
- [ ] `src/lib/components/posts/ListFlip.svelte`
- [ ] `src/lib/components/Footer.svelte`
- [ ] `src/lib/components/Circles.svelte`
- [ ] `src/lib/components/Nav.svelte`
- [ ] Build + smoke test
- [ ] **Commit:** `refactor: migrate reactive components to Svelte 5 runes`

### Batch D — Layout & route components

- [ ] `src/routes/+layout.svelte`
- [ ] `src/routes/+error.svelte`
- [ ] `src/routes/posts/_post-layout.svelte`
- [ ] `src/routes/sketches/_sketch-layout.svelte`
- [ ] `src/routes/_mdsvex.svelte`
- [ ] `src/routes/+page.svelte`
- [ ] `src/routes/posts/+page.svelte`
- [ ] `src/routes/sketches/+page.svelte`
- [ ] `src/routes/projects/+page.svelte`
- [ ] Any remaining `+page.svelte` files in sub-routes
- [ ] Build + smoke test
- [ ] **Commit:** `refactor: migrate layout and route components to Svelte 5 runes`

### Batch E — Store file (optional)

- [ ] `src/lib/assets/js/store.js` — decide: keep `writable` stores or convert to runes (`.svelte.js`)
- [ ] Build + smoke test
- [ ] **Commit:** `refactor: update store to Svelte 5 idioms` (if changed)

---

## Phase 3: Cleanup & Polish

- [ ] Check browser console for Svelte 3/4 compat warnings — fix any remaining
- [ ] Verify `@fontsource` v5 imports render fonts correctly
- [ ] Verify all markdown posts render correctly (mdsvex + inline Svelte components)
- [ ] Verify SCSS styles in all 10 components with `lang="scss"`
- [ ] Update `.prettierrc` if needed for Prettier 3
- [ ] `npm run build` — final clean build
- [ ] `npm run dev` — full manual smoke test (all routes)
- [ ] **Commit:** `chore: cleanup post-upgrade`
- [ ] Merge branch into main
- [ ] Deploy to Netlify and verify production

---

## Post-Upgrade (Future-Proofing)

- [ ] Add Renovate Bot config (`renovate.json`) for automated monthly dependency PRs
- [ ] Decide on Playwright test suite update (currently deprioritised)
