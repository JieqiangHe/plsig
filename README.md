# plsig

*please be significant*

> I'd used GraphPad Prism and knew how great it was, but I couldn't afford it; besides, my day-to-day data exploration never gets that complicated, and at heart I've always loved lightweight tools, so I simply built my own with AI.

Free statistics and scientific graphing in the browser. Paste a table from Excel, pick a test, and get the results, a methods paragraph and a publication-ready figure. Nothing is uploaded: everything runs on your machine, and the page keeps working offline once it has been opened.

**Live:** https://jieqianghe.github.io/plsig/

The interface is in English or Chinese (中 / EN). Figures always stay in English, ready for papers.

## Analyses

| Data | Tests |
| --- | --- |
| One column | Descriptive statistics (CV, geometric mean, skewness, kurtosis) with Shapiro–Wilk normality; one-sample t-test and one-sample Wilcoxon against a hypothetical value |
| Two groups | Unpaired t-test (Student's or Welch's), Mann–Whitney U, paired t-test, Wilcoxon signed-rank |
| Three or more groups | One-way ANOVA with Tukey, Holm, Bonferroni or Dunnett post-hoc tests; Kruskal–Wallis with Dunn's test |
| Repeated measures (rows = subjects) | Repeated-measures ANOVA with Geisser–Greenhouse correction; Friedman with Dunn's test |
| Grouped (row titles × columns) | Two-way ANOVA (Type III sums of squares, so unbalanced designs work) with post-hoc comparisons; one-way ANOVA across every cell, with letters on each bar |
| XY | Pearson and Spearman correlation; linear regression with a 95% confidence band |
| Dose–response | Four-parameter logistic fit, EC50 / IC50 with standard errors |
| Survival | Kaplan–Meier curves, log-rank test |
| Contingency (counts) | Chi-square (Yates for 2×2), Fisher's exact test, relative risk, odds ratio |

Every statistic was checked against SciPy or pingouin. The Grubbs test flags possible outliers, but nothing is removed unless you exclude a value or a column yourself. A transform (% of the first column, log10, ln, average of replicates) can be applied before any analysis. Results re-run after every edit and come with a "Statistical analysis" paragraph ready to paste into a paper.

## Figures

- Bar, scatter dot, box and violin plots with mean ± SD, SEM or 95% CI; XY scatter with fit; grouped bars; dose–response and survival curves; stacked contingency bars.
- Significance as asterisks, P values, brackets or compact letters. You can choose which comparisons appear.
- Click any text on the figure to rename it or make it bold, italic or a different size or colour. Click a bar to recolour it. Right-click selected bars to compare them in a new sheet.
- Style options: font size, dot size, bar width, hollow or hidden points, box or open axes, colour / hatched / grey fills, log axis, axis range, reference line, shaded band, broken y axis. Journal presets for Nature, Cell, Science and PNAS. Your favourite style can be saved as the default.
- Colour themes: Claude, Classic Prism, and NPG, AAAS, NEJM, Lancet, JAMA, JCO and D3 from [ggsci](https://github.com/nanxstats/ggsci).
- Export PNG (300 / 600 dpi) or SVG at journal column widths, or put every sheet into one panel figure lettered A, B, C. Copy to the clipboard as PNG or SVG. The SVG pastes into [svguest](https://www.svguest.online) for finer editing.

## Working with data

- The sheet behaves like Excel: select ranges; copy, cut and paste; fill down; insert, delete and drag columns; undo and redo.
- Paste from Excel, Google Sheets, Word, web pages or PDFs. Open .xlsx, .csv and .txt files; each worksheet becomes a tab.
- Several sheets at once, each with its own data, test and figure settings.
- Save a session as a `.jgz` file, or share it as a link that carries the data in the address itself.
- Examples gallery: one ready-made data set for each kind of test.

## Running it

`index.html` is the whole app: there is no build step and no server. Open it in a browser, or serve the folder with any static file server. `sw.js` makes it work offline. The only scripts it loads are [jStat](https://github.com/jstat/jstat) and the [Plotly](https://plotly.com/javascript/) cartesian bundle, both pinned and integrity-checked from jsDelivr.

## 中文简介

plsig 是一个免费的浏览器端统计与科研作图工具，思路接近 GraphPad Prism。从 Excel 粘贴数据，选择检验方法，就能得到结果表格、可直接放进论文的方法段落和投稿级图表。数据不会上传，所有计算都在本地完成。支持 t 检验、非参数检验、单因素 / 重复测量 / 双因素方差分析及事后检验、相关与回归、剂量反应曲线 (EC50)、生存分析和列联表。可以直接点击图上的文字和柱子进行编辑，提供期刊预设和多面板导出。界面可切换中文。

## License

GPL-3.0. The ggsci palettes are GPL ≥ 3.
