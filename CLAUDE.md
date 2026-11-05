# plsig

**pl**ease be **sig**nificant: free in-browser statistics and scientific graphing in the spirit of GraphPad Prism. Everything is in one file, `index.html`, with no build step. The only scripts it loads are jStat and the Plotly cartesian bundle, from jsDelivr with SRI hashes. Live at https://jieqianghe.github.io/plsig/ (GitHub Pages, served from `main`).

The project was called ministat until Nov 2026, when the repository was renamed. Sessions and the theme that the browser saved under the old `ministat:` localStorage keys are still read on load; keep that fallback.

## Workflow

- When a change is done: commit, push the working branch, open a PR into `main`, and merge it. This is the user's standing instruction (Nov 2026).
- If the working branch's PR has already been merged, restart the branch from `origin/main` before new work. Don't stack new commits on merged history.

## Interface: the user's choices

- No logo and no app name anywhere in the interface. The only place the name appears is the tab title, `plsig — please be significant`.
- The layout and controls follow the user's svguest project (6px radii, flat ribbon buttons). The colours are the Claude palette shared with ocrp, the user's choice from Nov 2026. Light mode: ivory paper `#faf9f5` / `#f0eee6`, ink `#141413`, terracotta accent `#c96442`. Dark mode: warm charcoal `#1f1e1d` / `#262624`, accent `#e08a6a`. The figure itself is always drawn on white paper, flat, with a hairline edge only; the user found a drop shadow looked embossed.
- Font: Arial everywhere, in the interface and in the figures (user's choice, Nov 2026). Chinese text falls back to PingFang SC / Microsoft YaHei.
- Figure style (user's choice, Nov 2026): outside tick marks on both axes, one per value tick and one per sample; no gridlines inside the plot; data points take their group's colour, and error bars / mean lines take a darker tone of it. The default colour theme is `claude`: Anthropic's brand orange `#d97757`, blue `#6a9bcc`, green `#788c5d` and warm grey `#b0aea5`, then tones of the same family. Classic Prism, Pastel and Vivid remain as options.
- Layout:
  - top: a ribbon of labeled groups (Sheet, File, Analysis, Graph, Size & export, View);
  - left: the data sheet, a full-bleed spreadsheet;
  - right: the figure, with the results below it.
- No status bar (removed Nov 2026). Theme and Help are icon buttons in the ribbon's View group at the far right; the tips and the "runs locally" note live in the Help dialog.
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
- The sheet behaves like Excel (user's request, Nov 2026): `sel` holds the active cell and the far corner of a range; a click selects a cell (typing replaces it), double-click or F2 edits inside it; drag / Shift selects blocks for copy, cut, paste, Delete and fill-down; right-click opens insert / delete for rows and columns; clicking the empty grid grows the sheet. The sheet owns ⌘/Ctrl+Z, because a cell input always holds focus. Results re-run by themselves after every edit (`scheduleRun`).

## Checking changes

- Run the page in Playwright's Chromium. jsDelivr is blocked in the sandbox, so route its requests to npm copies of `jstat@1.9.6` and `plotly.js-cartesian-dist-min@2.35.2`.
- Check every new statistic against SciPy or pingouin before shipping. Write the comparison into the commit message.
