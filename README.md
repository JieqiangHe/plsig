# plsig

**pl**ease be **sig**nificant — 求显著. Every bench scientist has whispered it at a p-value.

> I'd used GraphPad Prism and knew how great it was, but I couldn't afford it; besides, my day-to-day data exploration never gets that complicated, and at heart I've always loved lightweight tools, so I simply built my own with AI.

Free, in-browser statistics and scientific graphing. Paste data from Excel, pick a test, and get a report and a publication-ready figure. Nothing is uploaded; everything runs locally.

**Live:** https://jieqianghe.github.io/ministat/

## What it does

| Data | Analyses |
| --- | --- |
| Columns | Descriptive statistics (incl. CV, geometric mean, skewness, kurtosis) with Shapiro–Wilk normality; one-sample t-test and Wilcoxon signed-rank against a hypothetical value |
| Two groups | Unpaired t-test (Student's / Welch's), Mann–Whitney U, paired t-test, Wilcoxon matched-pairs signed-rank |
| Three or more groups | One-way ANOVA with Tukey, Holm, Bonferroni or Dunnett post-hoc tests; Kruskal–Wallis with Dunn's test |
| Repeated measures (rows = subjects) | Repeated-measures one-way ANOVA with Geisser–Greenhouse correction and post-hoc tests; Friedman test with Dunn's test |
| Grouped (row titles × columns) | Two-way ANOVA (Type III sums of squares, so unbalanced designs work; additive model when there are no replicates) with Tukey, Holm, Bonferroni or Dunnett comparisons of the columns within each row title |
| XY (column A = X, B = Y) | Pearson and Spearman correlation; simple linear regression with confidence intervals and a 95% confidence band |
| Contingency (counts; rows named by the row titles) | Chi-square (with Yates' correction for 2×2), Fisher's exact test, relative risk and odds ratio |

Graphs: bar, scatter dot plot, box & whisker and violin plots with mean ± SD / SEM / 95% CI, significance asterisks or P values, compact letter displays, before–after lines for matched data, XY scatter with fitted line, grouped bars / dot / box / violin plots for two-way designs, and stacked contingency bars. Export as PNG (≈ 300 dpi) or SVG.

