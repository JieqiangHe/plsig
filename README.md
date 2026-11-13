# plsig

*please be significant*

> I'd used GraphPad Prism and knew how great it was, but I couldn't afford it; besides, my day-to-day data exploration never gets that complicated, and at heart I've always loved lightweight tools, so I simply built my own with AI.

Statistics and scientific figures in one HTML file. Paste a table from Excel, pick a test, and get the results, a methods paragraph and a figure ready for a paper. It runs in your browser and works offline. Nothing is uploaded.

**Live: https://jieqianghe.github.io/plsig/**

## What it does

- **Tests:** t-tests, Mann–Whitney, Wilcoxon, one-way and two-way ANOVA with post-hoc tests, Kruskal–Wallis, repeated measures, correlation and regression, dose–response curves, survival, chi-square and Fisher's exact test. Every statistic was checked against SciPy, pingouin or statsmodels.
- **Data:** type or paste into a sheet that works like Excel. Put everything on one sheet and select the columns and rows to analyse; long tables (one row per measurement) and Prism-style replicate subcolumns work as they are.
- **Figures:** bar, dot, box and violin plots, grouped bars, curves. Click any text or bar on the figure to edit it. Export PNG or SVG at journal widths; the SVG pastes into [svguest](https://www.svguest.online) for finer editing.
- **Interface:** English or Chinese, light or dark; drag the panes to arrange them your way.

## The name

Everyone who has stared at a P value knows the wish. plsig can't grant it: it runs the test you chose and reports what the data say, significant or not.

## License

GPL-3.0. Built on [jStat](https://github.com/jstat/jstat) and [Plotly](https://plotly.com/javascript/); the journal colour palettes come from [ggsci](https://github.com/nanxstats/ggsci).
