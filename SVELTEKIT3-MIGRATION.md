# SvelteKit 3 Migration Plan

> Based on https://svelte.dev/blog/sveltekit-3-is-here and https://svelte.dev/docs/kit/migrating-to-sveltekit-3

## Current State

| Dependency | Current | Required |
|---|---|---|
| Node | v22.23.3 | ≥ v22.17 ✅ |
| SvelteKit | ^2.56.0 | 3.x |
| Svelte | ^5.55.0 | ≥ 5.57.1 |
| Vite | ^6.0.0 | ≥ 8.0.12 |
| @sveltejs/vite-plugin-svelte | ^6.0.0 | 7.x |
| TypeScript | not installed | ≥ 6 (optional, JS project) |
| adapter-netlify | ^6.0.0 | needs SK3-compatible version |

---

## Migration Steps

### Phase 1: Auto-Migrate (let the tool do the heavy lifting)

Run the official migration command first — it handles many changes automatically:

```bash
npx sv migrate sveltekit-3 --tasks all --confirm
```

Review the generated TODO list and verify the changes before moving on.

---

### Phase 2: Manual Changes (what the tool may not cover)

#### 2.1 — Configuration: `svelte.config.js` → `vite.config.js`

`svelte.config.js` is **no longer supported**. All config must move into the `sveltekit()` Vite plugin.

**Current `svelte.config.js`** has:
- `adapter: adapter()` (adapter-netlify)
- `extensions: ['.svelte', ...mdsvex extensions]`
- `preprocess: [globalComponents, mdsvex, vitePreprocess()]`

**New `vite.config.js`** should look like:

```js
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-netlify';
import { mdsvex, extensions } from './mdsvex.config.js';
import { mdsvexGlobalComponents } from './src/lib/assets/js/mdsvex-global-components.js';

const globalComponents = mdsvexGlobalComponents({
  dir: `#lib/components`,
  list: [
    ['CodeFence', 'CodeFence.svelte'],
    ['Blockquote', 'Blockquote.svelte'],
    ['Accordion', 'Accordion.svelte'],
  ],
  extensions,
});

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      extensions: ['.svelte', ...extensions],
      preprocess: [globalComponents, mdsvex],  // vitePreprocess is built-in now
    }),
  ],
});
```

Then **delete `svelte.config.js`**.

> ⚠️ **mdsvex compatibility**: `mdsvex` and the custom `mdsvexGlobalComponents` helper reference `$lib` internally — this needs updating too (see 2.2). Verify mdsvex works with Vite 8 / vite-plugin-svelte v7.

---

#### 2.2 — `$lib` → `#lib` (44 files affected)

SvelteKit 3 replaces the magic `$lib` alias with Node subpath imports (`#lib`). Imports also require file extensions.

**Add to `package.json`:**
```json
{
  "imports": {
    "#lib": "./src/lib/index.js",
    "#lib/*": "./src/lib/*"
  }
}
```

**Find & replace across codebase:**
- `$lib/` → `#lib/` in all `.svelte`, `.js`, `.ts`, `.md`, `.svx` files
- Add file extensions to bare imports (e.g. `#lib/foo` → `#lib/foo.js`)

**Files to update** (44 files across `src/`):
- `src/lib/components/*.svelte` (9 files)
- `src/lib/assets/js/*.js` (2 files)
- `src/routes/**/*.svelte` (15+ files)
- `src/routes/**/*.md` (18+ markdown/mdsvex files)

> ⚠️ **mdsvex gotcha**: The `mdsvexGlobalComponents` helper uses `$lib/components` as a `dir` path — must become `#lib/components`. Also check if mdsvex layout files resolve `$lib` imports correctly after the rename.

---

#### 2.3 — `$app/environment` → `$app/env` (2 files)

| File | Import |
|---|---|
| `src/lib/components/Datawrapper.svelte` | `import { browser } from '$app/environment'` |
| `src/lib/assets/js/store.js` | `import { browser } from '$app/environment'` |

Change to:
```js
import { browser } from '$app/env';
```

---

#### 2.4 — `$app/state` usage (9 files) — No change needed ✅

Already using `$app/state` (not the deprecated `$app/stores`). No action required.

---

#### 2.5 — No service worker — No change needed ✅

No `service-worker.js` found, so the `$service-worker` module removal doesn't affect us.

---

#### 2.6 — No hooks — No change needed ✅

No `hooks.server.ts` found. Nothing to update for error handling changes.

---

### Phase 3: Dependency Updates

```bash
npm install @sveltejs/kit@3 svelte@latest vite@8 @sveltejs/vite-plugin-svelte@7 @sveltejs/adapter-netlify@latest
```

**Check compatibility of:**
- [ ] `mdsvex` (^0.12.0) — may need update or replacement for Vite 8
- [ ] `svelte-preprocess` (^6.0.0) — likely no longer needed (vitePreprocess is built-in in SK3)
- [ ] `svelte-hamburgers` (^5.0.0) — check Svelte 5 / SK3 compat
- [ ] `svead` (^0.0.15) — check SK3 compat
- [ ] `d3` (^7.9.0) — framework-agnostic, should be fine

---

### Phase 4: Validate & Test

1. `npm run dev` — verify dev server starts
2. Check all routes load correctly (especially mdsvex blog posts and sketches)
3. `npm run build` — verify production build
4. `npm run preview` — test production build locally
5. Test Netlify deployment

---

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| **mdsvex + Vite 8** | High — core content depends on it | Test early; check mdsvex GitHub for Vite 8 support |
| **mdsvexGlobalComponents** | Medium — custom preprocessor | May need adaptation for new config shape |
| **$lib→#lib in .md files** | Medium — 18+ markdown files with component imports | Systematic find/replace + manual verification |
| **svelte-preprocess removal** | Low — vitePreprocess is built-in | Just remove from deps |
| **adapter-netlify** | Low — likely just a version bump | Check latest adapter version |

---

## Recommended Approach

1. **Create a migration branch** (`feat/sveltekit-3`)
2. Run `npx sv migrate sveltekit-3 --tasks all --confirm` first
3. Complete manual steps from Phase 2
4. Update dependencies (Phase 3)
5. Validate (Phase 4)
6. Deploy to Netlify preview and verify

> **Estimated effort**: ~1-2 hours, assuming mdsvex works with Vite 8 out of the box. If mdsvex needs a workaround, add extra time for debugging.
