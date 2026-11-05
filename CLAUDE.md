# plsig

**pl**ease be **sig**nificant: free in-browser statistics and scientific graphing in the spirit of GraphPad Prism. Everything is in one file, `index.html`, with no build step. The only scripts it loads are jStat and the Plotly cartesian bundle, from jsDelivr with SRI hashes. Live at https://jieqianghe.github.io/plsig/ (GitHub Pages, served from `main`).

The project was called ministat until Nov 2026, when the repository was renamed. Sessions and the theme that the browser saved under the old `ministat:` localStorage keys are still read on load; keep that fallback.

## Workflow

- When a change is done: commit, push the working branch, open a PR into `main`, and merge it. This is the user's standing instruction (Nov 2026).
- If the working branch's PR has already been merged, restart the branch from `origin/main` before new work. Don't stack new commits on merged history.

## Interface: the user's choices

- No logo and no app name anywhere in the interface. The only place the name appears is the tab title, `plsig — please be significant`.
- The layout and controls follow the user's svguest project (6px radii, flat ribbon buttons). The colours are the Claude palette shared with ocrp, the user's choice from Nov 2026. Light mode: ivory paper `#faf9f5` / `#f0eee6`, ink `#141413`, terracotta accent `#c96442`. Dark mode: warm charcoal `#1f1e1d` / `#262624`, accent `#e08a6a`. The figure itself is always drawn on white paper.
- Layout:
  - top: a ribbon of labeled groups (Sheet, File, Analysis, Graph, Size & export);
  - left: the data sheet, a full-bleed spreadsheet;
  - right: the figure, with the results below it;
  - bottom: a status bar.
- Ribbon buttons are equal width and symmetric. Short options are segmented controls; the real `<select>` behind each stays hidden and holds the value.
- The user rejected a four-card quadrant layout, a three-pane canvas layout, and a Prism-style tabs layout.
- The ribbon must fit at 1280px wide.

## Code map (inside `index.html`)

- `Stats`: pure statistics functions with no DOM access.
- `ANALYSES[test](groups, problems)`: each returns `{ verdict, report, plot }`. The report model drives both the on-screen tables and the copied TSV.
- `drawPlot(spec)`: dispatches on `spec.mode`. Column plots use `two` / `letters` / `control` / `each` / `none`; the other modes are `xy`, `counts` and `grouped`.
- Data model:
  - `grid`: an array of columns, each `{ name, cells }`;
  - `titles`: the row titles, which name the row-factor levels for two-way ANOVA and the outcomes of contingency tables.

  Both are kept in undo, in localStorage and in `.jgz` files.

## Checking changes

- Run the page in Playwright's Chromium. jsDelivr is blocked in the sandbox, so route its requests to npm copies of `jstat@1.9.6` and `plotly.js-cartesian-dist-min@2.35.2`.
- Check every new statistic against SciPy or pingouin before shipping. Write the comparison into the commit message.
