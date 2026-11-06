# plsig

**pl**ease be **sig**nificant: free in-browser statistics and scientific graphing in the spirit of GraphPad Prism. Everything is in one file, `index.html`, with no build step. The only scripts it loads are jStat and the Plotly cartesian bundle, from jsDelivr with SRI hashes. Live at https://jieqianghe.github.io/plsig/ (GitHub Pages, served from `main`).

The project was called ministat until Nov 2026, when the repository was renamed. Sessions and the theme that the browser saved under the old `ministat:` localStorage keys are still read on load; keep that fallback.

## Workflow

- When a change is done: commit, push the working branch, open a PR into `main`, and merge it. This is the user's standing instruction (Nov 2026).
- If the working branch's PR has already been merged, restart the branch from `origin/main` before new work. Don't stack new commits on merged history.

## Interface: the user's choices

- No logo and no app name anywhere in the interface. The only place the name appears is the tab title, `plsig — please be significant`.
- The layout and controls follow the user's svguest project (6px radii). Every ribbon control reads as a button: a soft fill (`--seg-bg`, like the segments), darker on hover (user's request, Nov 2026; they had been flat and looked like plain text). The colours are the Claude palette shared with ocrp, the user's choice from Nov 2026. Light mode: ivory paper `#faf9f5` / `#f0eee6`, ink `#141413`, terracotta accent `#c96442`. Dark mode: warm charcoal `#1f1e1d` / `#262624`, accent `#e08a6a`. The figure itself is always drawn on white paper, flat, with a hairline edge only; the user found a drop shadow looked embossed.
- Font: Arial everywhere, in the interface and in the figures (user's choice, Nov 2026). Chinese text falls back to PingFang SC / Microsoft YaHei.
- Figure style (user's choice, Nov 2026): outside tick marks on both axes, one per value tick and one per sample; no gridlines inside the plot; data points take their group's colour, and error bars / mean lines take a darker tone of it. The default colour theme is `claude`: Anthropic's brand orange `#d97757`, blue `#6a9bcc`, green `#788c5d` and warm grey `#b0aea5`, then tones of the same family. The only other theme is Classic Prism (the user dropped Pastel and Vibrant, Nov 2026); a saved session that used one of those opens in Claude. To add a theme, add one entry (with a `name`) to `THEMES`: the Graph group's colour menu is built from it.
- Layout:
  - top: a ribbon of labeled groups (Sheet, File, Analysis, Graph, Size & export, View);
  - left: sheet tabs (`#tabs`), then the data sheet, a full-bleed spreadsheet;
  - right: the figure, with the results below it.
- No status bar (removed Nov 2026). Theme, Help and a GitHub link (the repository) are icon buttons in the ribbon's View group at the far right; the tips and the "runs locally" note live in the Help dialog.
- Ribbon buttons are equal width and symmetric. Short options are segmented controls; the real `<select>` behind each stays hidden and holds the value.
- Compact ribbon (user's request, Nov 2026): every control is 24px high, captions are small uppercase labels, and ribbon fields are soft fills that only show an outline on hover / focus. Chart type is a segment of small chart glyphs (`SEG_ICONS` / `segContent`); the colour theme is a menu button showing the theme's swatch, and its list shows each theme's whole palette. The Sheet group puts undo / redo / clear on one row of icons and +Row / +Col below. Results re-run on every edit, so Run is a small button beside the test.
- Everything in the ribbon is a button (user's choice, Nov 2026). The test, post-hoc and Dunn choices are flat menu buttons (`select.as-menu`): they open a grouped list in `#menuPop` with a hint per item (`data-hint`), and the hidden `<select>` holds the value. Welch's correction is an on / off button over a hidden checkbox. Axis titles are not in the ribbon: you click one on the figure to rename it, and the hidden `xLabel` / `yLabel` inputs store the result. The editor is our own `<input>` laid over the title (`openTitleEditor`), not Plotly's `edits.axisTitleText`, which lost the text in the user's browser (Nov 2026); it ignores Enter during IME composition. An empty title is drawn as a faint placeholder on screen (`placeholderAxes`) and left out of PNG / SVG exports. A faint line under the figure says so (`#plotHint`). W / H / Dot are buttons too (`SIZE_BTNS`): each opens a stepper (− / +) with presets in `#menuPop`, and a hidden number input holds the value. W / H blank = automatic: `sizeFor(spec)` picks a size from the number of bars, label length and legend, and shows it in muted text; a chosen value overrides it, Reset goes back to automatic.
- Significance segment: *** / P = / Off. Off hides every figure mark tagged `name: "sig"` (letters, stars, brackets, the XY stats box); the results stay.
- Legends (grouped, contingency) sit in their own band at the foot of the figure (`bottomLegend`), under the x title. Axes use `automargin`, so rotated tick labels push the title down. Natural width is about 1130px.
- The user rejected a four-card quadrant layout, a three-pane canvas layout, and a Prism-style tabs layout.
- The ribbon must fit at 1280px wide.

## Code map (inside `index.html`)

- `Stats`: pure statistics functions with no DOM access.
- `ANALYSES[test](groups, problems)`: each returns `{ verdict, report, plot }`. `cells` (One-way ANOVA across grouped cells) treats every row-title × column cell as a group, reuses `ANALYSES.anova`, and draws clusters with letters per bar; cells may be empty (a Control row with one column), as in clustered paper figures. The report model drives both the on-screen tables and the copied TSV.
- `drawPlot(spec)`: dispatches on `spec.mode`. Column plots use `two` / `letters` / `control` / `each` / `none`; the other modes are `xy`, `counts` and `grouped`.
- Data model:
  - `grid`: an array of columns, each `{ name, cells }`;
  - `titles`: the row titles, which name the row-factor levels for two-way ANOVA and the outcomes of contingency tables.

  Both are kept in undo, in localStorage and in `.jgz` files.
- Sheet tabs (Nov 2026): `sheets` holds one entry per tab, `{ name, grid, titles, settings }`; the active one lives in the usual globals and the ribbon, and `showSheet` / `stashSheet` swap them (each tab keeps its own undo stacks). localStorage and `.jgz` v5 store `sheets` + `cur` next to the old top-level `grid` / `titles` / `settings`, so older files and older code still read. Open appends a file's sheets as new tabs (a blank current tab is replaced). A column with `off: true` is excluded from the analysis (right-click → Exclude / Include): it stays on the sheet, greyed and struck through, and `collectGroups` drops it.
- The sheet behaves like Excel (user's request, Nov 2026): `sel` holds the active cell and the far corner of a range; a click selects a cell (typing replaces it), double-click or F2 edits inside it; drag / Shift selects blocks for copy, cut, paste, Delete and fill-down; right-click opens insert / delete for rows and columns; clicking the empty grid grows the sheet. The sheet owns ⌘/Ctrl+Z, because a cell input always holds focus. Results re-run by themselves after every edit (`scheduleRun`).
- Under the sheet is a paste bar (user's request, Nov 2026), not a textarea: click it (or Paste in the ribbon) and press ⌘/Ctrl+V, and the clipboard replaces the sheet as one undo step. A visually hidden `#pasteCatch` textarea takes the focus so the paste event fires in every browser. `importClipboard` reads tab-separated text (Excel, Sheets, Word) first, then the first HTML `<table>` (web pages), then `parseDelimited`, which also splits space-separated text from PDFs. Dropping a .csv / .txt file on the bar works too.

## Checking changes

- Run the page in Playwright's Chromium. jsDelivr is blocked in the sandbox, so route its requests to npm copies of `jstat@1.9.6` and `plotly.js-cartesian-dist-min@2.35.2`.
- Check every new statistic against SciPy or pingouin before shipping. Write the comparison into the commit message.
