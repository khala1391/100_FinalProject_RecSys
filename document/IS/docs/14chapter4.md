---
title: ""
documentclass: book
classoption: oneside
bibliography: ../config/bibliography.bib
csl: ../style/apa.csl
link-citations: true
header-includes:
    - \input{../config/header.tex}
---

# Chapter 4: Research Results

This chapter presents the results of the study, organized according to the six-step modeling workflow described in Chapter 3. Results are reported sequentially: algorithm and hyperparameter screening (Steps 1–2), covariate integration across multiple tickers (Steps 3–5), and portfolio optimization simulation (Step 6).

## Exploratory Data Analysis of Stock Time Series Characteristics

Before presenting the model comparison results, this section examines the underlying characteristics of the 21 SET100 stock time series used in this study. Understanding the data properties — trend structure, volatility behavior, return distributions, and temporal dependencies — provides essential context for interpreting why certain model architectures outperform others on financial time series data.

### Price Trend and Non-Stationarity

The closing prices of all 21 stocks over the study period (January 2018 to January 2025) exhibited non-stationary behavior with distinct multi-scale trends. Short-term moving averages (20-day) frequently crossed long-term moving averages (200-day), indicating alternating regimes of uptrend, downtrend, and consolidation.

The Augmented Dickey-Fuller (ADF) test confirmed that raw price levels were non-stationary for all 21 tickers ($p > 0.05$), while daily returns were stationary ($p < 0.01$ for all). This I(1) property is a fundamental characteristic of financial time series that validates the use of windowed input chunks in the NHiTS architecture, where the model learns from local price sequences rather than requiring global stationarity.

![Closing prices with MA20/MA200 for all 21 tickers](../../202510_SET100/images/eda/eda_01_price_trends_all.png){width=95%}

### Volatility Analysis

Annualized volatility across the 21 tickers ranged widely, reflecting the diversity of the selected stock universe. Rolling volatility analysis (20-day and 60-day windows) revealed prominent **volatility clustering**: periods of high volatility tended to persist and were followed by gradual reversion to lower volatility. This phenomenon was particularly pronounced during external shock periods (e.g., the COVID-19 market crash in Q1 2020).

The Ljung-Box test on squared returns confirmed statistically significant autocorrelation at lags 10 and 20 for all 21 stocks ($p < 0.01$), providing formal evidence of volatility clustering. This heteroscedastic behavior creates nonlinear temporal dependencies that linear time series models (ARIMA, exponential smoothing) cannot adequately capture.

When grouped by beta quartile, Very High beta stocks ($\beta > 1.174$) exhibited the highest annualized volatility, while Low beta stocks ($\beta < 0.773$) showed the most stable volatility profiles. This relationship between systematic risk (beta) and realized volatility is consistent with CAPM theory and justifies the beta-stratified sampling approach used in ticker selection.

![Rolling annualized volatility (20d/60d) for selected 8 tickers](../../202510_SET100/images/eda/eda_02_rolling_volatility.png){width=95%}

![Annualized volatility distribution by beta quartile](../../202510_SET100/images/eda/eda_02b_volatility_by_beta.png){width=75%}

### Return Distribution Characteristics

Daily return distributions for all 21 tickers deviated substantially from the normal distribution. The Jarque-Bera test rejected normality ($p < 0.01$) for all stocks, with two key characteristics:

1. **Excess kurtosis** (leptokurtosis): All stocks exhibited excess kurtosis well above zero, indicating heavier tails than the normal distribution. This implies that extreme price movements (both positive and negative) occur more frequently than predicted by Gaussian models.

2. **Negative skewness**: The majority of stocks displayed negative skew, indicating asymmetric return distributions with a longer left tail. This asymmetry reflects the well-documented phenomenon that stock prices tend to fall faster than they rise.

These non-Gaussian properties have direct implications for model selection: the use of Huber Loss with $\beta = 10^{-5}$ (effectively approximating MAE) in the NHiTS configuration provides robustness against outlier returns, while the deep nonlinear layers can model the complex distributional structure that linear models assume away.

![Daily return histograms with KDE and normal overlay for all 21 tickers](../../202510_SET100/images/eda/eda_03_return_histogram.png){width=95%}

![QQ-plots for selected 8 tickers showing deviation from normality](../../202510_SET100/images/eda/eda_04_qq_plots.png){width=90%}

### Autocorrelation Structure

Analysis of the autocorrelation function (ACF) and partial autocorrelation function (PACF) revealed a characteristic pattern common to financial time series:

- **Returns** showed weak or insignificant linear autocorrelation at most lags, consistent with the weak-form efficient market hypothesis.
- **Squared returns** (a proxy for conditional variance) exhibited strong and persistent autocorrelation extending to 20+ lags, confirming the presence of ARCH/GARCH-type volatility dynamics.

This distinction is critical: it indicates that while the linear predictability of returns is limited, **nonlinear dependencies** exist in the data. NHiTS, with its deep fully-connected blocks and multi-layer nonlinear transformations, is architecturally capable of capturing these nonlinear patterns — a capability that simpler architectures like TiDE lack.

![ACF and PACF of returns and squared returns for selected 8 tickers](../../202510_SET100/images/eda/eda_06_acf_pacf.png){width=95%}

### Multi-Scale Temporal Patterns

Resampling returns at daily, weekly, and monthly frequencies revealed scale-dependent behavior:

- **Daily returns**: High noise-to-signal ratio with standard deviation averaging approximately 2% across the 21 stocks.
- **Weekly returns**: Lower noise with clearer directional patterns emerging.
- **Monthly returns**: Smoothest signal with reduced kurtosis, revealing underlying trend components.

This multi-scale structure directly motivates the NHiTS architecture's core innovation: **multi-rate signal sampling** via MaxPool downsampling with different kernel sizes across blocks. Each block in the NHiTS stack operates at a different temporal resolution, allowing the model to simultaneously capture daily noise patterns and longer-term trend signals. In contrast, TCN processes data at a single resolution (determined by kernel size), and TiDE uses a flat encoder-decoder structure without explicit multi-scale decomposition.

STL decomposition applied to weekly-aggregated price data confirmed the presence of trend, seasonal, and residual components across all stocks. The FFT periodogram analysis detected multiple dominant frequency peaks, indicating that SET100 stocks contain mixed-frequency components — a property that the expressiveness stacks in NHiTS are specifically designed to decompose.

### Cross-Stock Correlation Structure

The pairwise return correlation matrix across all 21 stocks showed moderate positive correlations (typically 0.1–0.5), with hierarchical clustering revealing distinct groups that partially aligned with the beta quartile classification. Stocks within the same beta category tended to cluster together, suggesting shared exposure to common market factors.

Notably, the moderate and heterogeneous correlation structure implies that a single model configuration cannot be optimal for all stocks simultaneously. NHiTS's efficiency advantage (mean training time of 40.8 seconds compared to 259.6 seconds for N-BEATS) makes it practical to retrain separate models per ticker, enabling stock-specific optimization without prohibitive computational cost.

![Cross-stock return correlation heatmap](../../202510_SET100/images/eda/eda_07_correlation_heatmap.png){width=85%}

## Performance of the Proposed Model

### Algorithm Screening (Step 1)

Four deep learning architectures — TCN, N-BEATS, NHiTS, and TiDE — were compared on PTT.BK with OHLV covariates over 876 experimental configurations varying output horizon ($H \in \{1,5,10,20,30\}$), input–output multiplier ($m \in \{1,2,3,4\}$), epochs ($\{50,100,150\}$), and Huber Loss beta ($\{10^{-5}, 0.01, 0.5, 1.0\}$). After removing outlier configurations with MAPE > 30%, 870 valid runs remained. TCN was limited to 156 configurations because it requires the input chunk length to exceed the kernel size ($L > 3$) and $L > H$.


| Model | Mean MAE | Std MAE | Min MAE | Mean MAPE (%) | Min MAPE (%) | Config Count |
|-------|----------|---------|---------|---------------|-------------|:------------:|
| **NHiTS** | **0.527** | **0.139** | **0.285** | **1.78** | **0.97** | 240 |
| N-BEATS | 0.582 | 0.197 | 0.283 | 1.96 | 0.96 | 240 |
| TiDE | 0.766 | 0.542 | 0.366 | 2.59 | 1.25 | 234 |
| TCN | 0.987 | 0.468 | 0.361 | 3.31 | 1.22 | 156 |

Table: Overall algorithm comparison — mean and best test metrics across all configurations (PTT.BK, OHLV covariates, $h_{eval} = 78$ trading days).

NHiTS achieved the lowest mean MAE (0.527) and mean MAPE (1.78%) across all configurations. While N-BEATS achieved the single best MAE (0.283 vs. 0.285 for NHiTS), this difference was negligible. NHiTS demonstrated consistently lower variance (Std MAE = 0.139) compared to TiDE (0.542) and TCN (0.468), indicating more robust performance across diverse hyperparameter settings.

### Best Configuration per Algorithm

When selecting the single best configuration per model (lowest test MAE at $h_{eval} = 78$), the results were as follows:

| Model | Best $L$ | Best $H$ | Epochs | Loss Function | Test MAE | Test MSE | Test MAPE (%) | Train Time (s) |
|-------|:--------:|:--------:|:------:|---------------|:--------:|:--------:|:-------------:|:--------------:|
| **N-BEATS** | 2 | 1 | 50 | Huber $\beta=0.5$ | **0.283** | 0.133 | 0.96 | 224.3 |
| **NHiTS** | 1 | 1 | 50 | Huber $\beta=0.5$ | **0.285** | 0.131 | 0.97 | 40.6 |
| TCN | 4 | 1 | 150 | Huber $\beta=0.5$ | 0.361 | 0.202 | 1.22 | 153.8 |
| TiDE | 1 | 1 | 50 | Huber $\beta=0.5$ | 0.366 | 0.197 | 1.25 | 31.8 |

Table: Best single configuration per algorithm.

N-BEATS and NHiTS achieved nearly identical accuracy at $H=1$, but NHiTS trained in 40.6 seconds — approximately **5.5× faster** than N-BEATS (224.3 s). This training efficiency advantage was a key factor in selecting NHiTS as the proposed model.

### Training Time Analysis

Training duration varied substantially across algorithms:

| Model | Mean Train (s) | Std (s) | Min (s) | Max (s) | Mean Predict (s) |
|-------|:--------------:|:-------:|:-------:|:-------:|:-----------------:|
| N-BEATS | 259.6 | 160.4 | 102.8 | 1,767.6 | 1.951 |
| TCN | 43.8 | 35.2 | 8.3 | 159.2 | 0.273 |
| NHiTS | 40.8 | 25.5 | 11.2 | 102.0 | 0.511 |
| TiDE | 38.6 | 28.3 | 11.5 | 139.9 | 0.392 |

Table: Training and prediction time by algorithm.

N-BEATS was approximately **6.4× slower** than NHiTS on average. When considering the best-configuration subset, NHiTS achieved a mean MAE of 0.454 and mean MAPE of 1.54% with a mean training time of 37.6 seconds, compared to N-BEATS at MAE 0.485 and MAPE 1.64% with 239.7 seconds. NHiTS thus offered superior accuracy *and* efficiency.

### Loss Function Impact

The impact of the Huber Loss beta parameter varied across algorithms:

| Model | $\beta = 10^{-5}$ | $\beta = 0.01$ | $\beta = 0.5$ | $\beta = 1.0$ |
|-------|:------------------:|:--------------:|:-------------:|:-------------:|
| NHiTS | **0.499** | 0.555 | 0.536 | 0.520 |
| N-BEATS | 0.600 | **0.551** | 0.588 | 0.587 |
| TCN | 1.369 | **0.844** | 0.863 | 0.871 |
| TiDE | **0.561** | 0.650 | 0.919 | 0.919 |

Table: Mean test MAE by model and Huber Loss beta (lower is better).

NHiTS performed best with $\beta = 10^{-5}$ (MAE 0.499), effectively making the loss function behave as MAE. N-BEATS and TCN favored $\beta = 0.01$. TiDE showed sensitivity to $\beta$, with $\beta \geq 0.5$ degrading performance substantially.

### Effect of Epochs

| Model | 50 Epochs | 100 Epochs | 150 Epochs |
|-------|:---------:|:----------:|:----------:|
| NHiTS | **0.527** | 0.528 | 0.528 |
| N-BEATS | 0.584 | **0.580** | **0.580** |
| TCN | 1.019 | 0.973 | **0.969** |
| TiDE | **0.757** | 0.771 | 0.771 |

Table: Mean test MAE by model and epoch count.

Epoch count had minimal impact on NHiTS and N-BEATS, both of which plateaued by 50 epochs due to early stopping (patience = 15). TCN showed slight improvement with more epochs. TiDE performed marginally better at 50 epochs.

### Algorithm Selection Justification

NHiTS was selected as the proposed model based on the following considerations:

1. **Lowest mean MAE and MAPE** across all configurations.
2. **Lowest variance** in performance metrics, indicating robustness to hyperparameter choices.
3. **6.4× faster training** than the next most accurate model (N-BEATS).
4. **Competitive single-best accuracy**: Only 0.7% behind N-BEATS at $H=1$ (MAE 0.285 vs. 0.283).
5. **Superior long-horizon performance**: NHiTS outperformed all models at $H \geq 5$.

## Performance Improvement Using the Attention Mechanism

Among the four screened algorithms, TFT (Temporal Fusion Transformer) was the only architecture incorporating a full attention mechanism. TFT was not included in the screening grid due to its classification as a MixedCovariatesModel in the Darts framework, which requires both past and future covariates for optimal performance. The study's design exclusively used past covariates, making TFT unsuitable for a direct comparison under identical conditions.

However, the N-HiTS architecture incorporates an implicit form of attention through its **multi-rate data sampling** and **hierarchical interpolation** mechanisms [@challu2022nhitsneuralhierarchicalinterpolation]. By allowing different blocks to focus on different temporal frequency scales, N-HiTS achieves a similar effect to attention — selectively emphasizing relevant patterns at different time scales — without the computational overhead of explicit self-attention layers.

The results demonstrated that NHiTS outperformed TiDE (which also supports mixed covariates) at all horizons, suggesting that the hierarchical interpolation mechanism provides sufficient representational power for the forecasting task without requiring explicit attention.

<!-- TODO: If attention-specific experiments are added, include comparative results here -->

## Performance Improvement Using Multiple Days of Historical Data

### Horizon Study (Step 2)

The horizon study examined the interaction between output chunk length ($H$), input–output multiplier ($m$), and their effect on forecast quality. The input chunk length was calculated as $L = m \times H$, yielding 20 valid $(L, H)$ pairs across the parameter grid.

### Performance by Output Horizon Length

Table 4.2 presents the mean MAE of the best configuration per model at each horizon length, evaluated at $h_{eval} = 78$ trading days.

| Model | $H=1$ | $H=5$ | $H=10$ | $H=20$ | $H=30$ |
|-------|:-----:|:-----:|:------:|:------:|:------:|
| **NHiTS** | 0.323 | **0.403** | **0.444** | **0.538** | **0.563** |
| N-BEATS | **0.305** | 0.422 | 0.470 | 0.598 | 0.631 |
| TiDE | 1.276 | 0.487 | 0.483 | 0.616 | 0.651 |
| TCN | 0.361 | 0.428 | 0.610 | 0.968 | 1.397 |

Table: Mean test MAE by model and output horizon length (best-configuration subset).

N-BEATS was marginally better at $H=1$ (MAE 0.305), but NHiTS dominated at all longer horizons ($H \geq 5$). TCN showed rapid performance degradation beyond $H=10$, with MAE increasing from 0.610 to 1.397 at $H=30$. TiDE exhibited an anomalous spike at $H=1$ (MAE 1.276), likely due to instability in short-horizon configurations.

### Performance by Multiplier

The input–output multiplier $m$ determined the lookback window relative to the forecast horizon:

| Model | $m=1$ | $m=2$ | $m=3$ | $m=4$ |
|-------|:-----:|:-----:|:-----:|:-----:|
| NHiTS | **0.408** | 0.533 | 0.555 | 0.583 |
| N-BEATS | **0.478** | 0.533 | 0.644 | 0.677 |
| TCN | — | **0.838** | 0.881 | 0.830 |
| TiDE | **0.698** | 0.692 | 1.600 | 0.810 |

Table: Mean test MAE by model and multiplier (at $h_{eval} = 78$).

Lower multipliers generally yielded lower MAE for NHiTS and N-BEATS. However, $m=1$ provides minimal lookback context (e.g., $L=10$ at $H=10$), which may be insufficient for capturing longer-term patterns. The selected configuration of $m=3$ with $H=10$ ($L=30$, approximately six trading weeks) offered a practical balance between context and computational efficiency.

### Horizon × Multiplier Interaction

The heatmap analysis of the horizon × multiplier interaction (averaged across all models) revealed:

| $m$ \ $H$ | 1 | 5 | 10 | 20 | 30 |
|:----------:|:-----:|:-----:|:-----:|:-----:|:-----:|
| **1** | **0.362** | 0.545 | 0.557 | 0.552 | 0.632 |
| **2** | 0.397 | 0.608 | 0.551 | 0.785 | 0.917 |
| **3** | 1.108 | 0.545 | 0.768 | 0.851 | 0.915 |
| **4** | 0.547 | 0.532 | 0.737 | 0.767 | 0.989 |

Table: Mean test MAE by horizon × multiplier (all models, all configurations).

The combination $H=10$, $m=3$ yielded a mean MAE of 0.768 across all models. For NHiTS specifically at $H=10$, $m=3$, the best configuration achieved a MAE of **0.431** with a training time of only 25.6 seconds.

### Selected Configuration

Based on the horizon study, the configuration $L=30$, $H=10$, $m=3$ was selected for the following reasons:

1. $H=10$ provided a practical medium-horizon forecast window (two trading weeks), balancing single-step accuracy ($H=1$) against the increasing error at longer horizons ($H \geq 20$).
2. $m=3$ provided sufficient lookback context (30 days ≈ 6 trading weeks) for the model to capture both short-term and medium-term patterns.
3. NHiTS at this configuration (MAE = 0.431, MAPE = 1.45%) trained in 25.6 seconds, approximately **5× faster** than N-BEATS (128.6 s) at the same $(H, m)$ setting.

![Performance by algorithm across horizons](../../202511_modeling/images/02d/2_1_performance_by_algorithm_test_mae.png){width=95%}

![Heatmap of horizon × multiplier interaction (MAE)](../../202511_modeling/images/02d/5_1_heatmap_horizon_x_multiplier_test_mae.png){width=85%}

![Training time distribution by model](../../202511_modeling/images/02d/10a_1_time_distribution_by_model.png){width=95%}

![Performance vs. training time trade-off](../../202511_modeling/images/02d/11a_1_perf_vs_time_scatter_test_mae.png){width=85%}

## Performance of the Improved Model When Applied to Company Stock Data

### Stock Selection (Step 0)

From the initial pool of 30 SET100 candidates with sufficient data, 21 tickers produced valid modeling results across all covariate configurations (S4, S5, S6). These tickers were classified into four beta quartile categories based on the 2-year rolling beta:

| Category | Beta Range | Count |
|----------|-----------|:-----:|
| Low | $< 0.773$ | 8 |
| Medium | $0.773–1.009$ | 7–8 |
| High | $1.009–1.174$ | 7–8 |
| Very High | $> 1.174$ | 8 |

Table: Beta quartile classification boundaries.

Eight representative tickers (two per category) were selected based on the **composite distance from median** model performance across S4, S5, and S6 metrics (MAE, MAPE, MSE). Tickers closest to the median performance within each beta category were chosen to ensure representativeness.

| Symbol | Beta (2Y) | Category | S4 MAE | S5 MAE | S6 MAE |
|--------|:---------:|----------|:------:|:------:|:------:|
| SPALI | 0.773 | Low | 0.516 | 0.554 | 0.543 |
| PTT | 0.516 | Low | 5.682 | 1.624 | 0.983 |
| KTC | 0.951 | Medium | 1.315 | 2.700 | 2.512 |
| AOT | 0.832 | Medium | 1.351 | 1.520 | 1.499 |
| MINT | 1.059 | High | 0.918 | 0.917 | 0.931 |
| AMATA | 1.030 | High | 1.009 | 1.198 | 1.256 |
| MTC | 1.434 | Very High | 1.627 | 1.833 | 1.861 |
| PLANB | 1.199 | Very High | 0.265 | 0.297 | 0.329 |

Table: Selected 8 representative tickers with performance across covariate steps (S6 = average of S6m1 and S6m2).

AMATA exhibited the smallest composite distance from the median (0.046), making it the most representative ticker. PTT had the largest composite distance among the selected tickers (0.266), primarily due to its notably higher MAE in the S4 configuration (5.682), which improved substantially with additional covariates (S5: 1.624, S6: 0.983).

### Step 3: NHiTS with OHLV Covariates (S4)

The selected NHiTS model with the fixed hyperparameters ($L=30$, $H=10$, batch size = 16, learning rate = $10^{-4}$, epochs = 100, Huber Loss $\beta = 10^{-5}$) was trained on each of the 21 candidate tickers using OHLV (Open, High, Low, Volume) as past covariates.

| Ticker | Beta | Category | MSE | MAE | MAPE (%) |
|--------|:----:|----------|:----:|:---:|:--------:|
| TU | 0.550 | Low | 0.186 | 0.326 | 2.56 |
| PLANB | 1.199 | Very High | 0.120 | 0.265 | 3.38 |
| AP | 0.926 | Medium | 0.158 | 0.312 | 3.48 |
| SPALI | 0.773 | Low | 0.442 | 0.516 | 3.02 |
| BANPU | 1.174 | High | 0.253 | 0.403 | 6.13 |
| TRUE | 0.934 | Medium | 0.588 | 0.557 | 6.85 |
| MINT | 1.059 | High | 1.476 | 0.918 | 3.27 |
| AMATA | 1.030 | High | 1.700 | 1.009 | 4.44 |
| AOT | 0.832 | Medium | 3.635 | 1.351 | 2.18 |
| KTC | 0.951 | Medium | 2.795 | 1.315 | 2.96 |
| MTC | 1.434 | Very High | 4.355 | 1.627 | 4.03 |
| TOP | 1.007 | High | 5.679 | 1.749 | 4.24 |
| BAM | 1.520 | Very High | 3.897 | 1.684 | 23.22 |
| PTTEP | 0.551 | Low | 46.571 | 5.575 | 4.44 |
| PTT | 0.516 | Low | 4.586 | 5.682 | 5.68 |
| PTTGC | 1.484 | Very High | 8.692 | 2.251 | 7.79 |
| RATCH | 0.853 | Medium | 17.190 | 3.406 | 12.42 |
| ADVANC | 0.611 | Low | 4.433 | 6.866 | 63.16 |
| SAWAD | 1.659 | Very High | 34.638 | 11.758 | 11.76 |
| SCC | 1.011 | High | 862.478 | 20.024 | 9.30 |
| VGI | 1.652 | Very High | 7.135 | 2.207 | 111.30 |

Table: Step 3 (S4) — NHiTS performance with OHLV covariates across 21 tickers (final test on 30% unseen data).

Performance varied substantially across tickers. The lowest MAPE was achieved by AOT (2.18%) and TU (2.56%), while VGI (111.30%) and ADVANC (63.16%) exhibited extremely high MAPE values. These anomalous MAPE values were attributable to stock prices near zero or structural price level changes during the test period.

### Step 4: Adding SET Index Covariate (S5)

Adding the SET index as an additional past covariate produced mixed results across tickers:

| Ticker | S4 MAE | S5 MAE | Change | S4 MAPE (%) | S5 MAPE (%) | Change |
|--------|:------:|:------:|:------:|:-----------:|:-----------:|:------:|
| SPALI | 0.516 | 0.554 | +7.4% | 3.02 | 3.32 | +9.9% |
| PTT | 5.682 | 1.624 | −71.4% | 5.68 | 6.11 | +7.6% |
| KTC | 1.315 | 2.700 | +105.3% | 2.96 | 6.29 | +112.5% |
| AOT | 1.351 | 1.520 | +12.5% | 2.18 | 2.43 | +11.5% |
| MINT | 0.918 | 0.917 | −0.1% | 3.27 | 3.19 | −2.4% |
| AMATA | 1.009 | 1.198 | +18.7% | 4.44 | 5.28 | +18.9% |
| MTC | 1.627 | 1.833 | +12.7% | 4.03 | 4.52 | +12.2% |
| PLANB | 0.265 | 0.297 | +12.1% | 3.38 | 3.73 | +10.4% |

Table: Comparison of S4 (OHLV) and S5 (OHLV + SET) performance for selected 8 tickers.

The addition of the SET index improved performance for PTT (MAE reduced by 71.4%) and MINT (marginal improvement). However, for most tickers, including KTC (MAE increased by 105.3%), adding the market index introduced additional noise without improving prediction accuracy. This suggested that the SET index covariate is most beneficial for stocks with high market correlation (e.g., PTT as a large-cap index constituent).

## Summary of Model Performance Improvements

Table 4.3 consolidates the average performance of the selected 8 tickers across all steps.

| Step | Configuration | Mean MAE | Mean MAPE (%) | Mean MSE |
|:----:|---------------|:--------:|:-------------:|:--------:|
| S4 | OHLV | 1.586 | 3.62 | 2.39 |
| S5 | OHLV + SET | 1.331 | 4.38 | 3.58 |
| S6m1 | OHLV + SET + Sentiment | 1.329 | 4.35 | 3.50 |
| S6m2 | OHLV + SET + Embedding | 1.294 | 4.32 | 3.45 |

Table: Summary of average model performance across 8 selected tickers by covariate step.

The results indicated that model performance was sensitive to the specific ticker and covariate combination. While the overall mean MAE improved from S4 to S6, the improvement pattern was not uniform. PTT showed dramatic improvement with additional covariates (MAE: 5.682 $\rightarrow$ 1.624 $\rightarrow$ 0.983), while KTC degraded (MAE: 1.315 $\rightarrow$ 2.700 $\rightarrow$ 2.512).

## Why NHiTS Outperforms Other Models on Financial Time Series

This section synthesizes the EDA findings with the model comparison results to explain, from both a data-driven and architectural perspective, why NHiTS achieved superior performance in this study.

### Linking Data Characteristics to Model Architecture

The EDA revealed seven key characteristics of the SET100 financial time series data, each of which maps to a specific architectural feature of NHiTS:

| Data Characteristic | NHiTS Architectural Feature | Advantage over Alternatives |
|---|---|---|
| Multi-scale trends (daily noise $\rightarrow$ monthly trends) | Multi-rate signal sampling via MaxPool downsampling in each block | TCN uses single-rate; TiDE lacks hierarchical decomposition |
| Volatility clustering (heteroscedasticity) | Hierarchical interpolation + residual learning across stacks | Progressive refinement adapts to changing volatility regimes |
| Non-Gaussian returns (fat tails, negative skew) | Huber Loss ($\beta=10^{-5}$) + deep nonlinear layers | Robust to outliers; N-BEATS with same loss has higher variance |
| Nonlinear dependencies in volatility | Deep fully-connected blocks with ReLU activations | Captures nonlinear patterns that linear models miss entirely |
| Mixed-frequency seasonal components | Expressiveness stacks with different MaxPool kernel sizes | N-BEATS uses identical block structure without frequency separation |
| Non-stationary price levels | Input chunk windowing + multi-rate downsampling | Learns from local windows; downsampling extracts trend from non-stationary input |
| Diverse stock profiles (beta 0.27–1.66) | Lightweight architecture (40s training vs 260s for N-BEATS) | Practical to retrain per ticker for stock-specific optimization |

Table: Mapping of empirical data characteristics to NHiTS architectural features.

### Multi-Rate Decomposition as the Core Advantage

The central reason for NHiTS's superiority lies in its **hierarchical interpolation mechanism** combined with **multi-rate signal sampling**. The EDA demonstrated that SET100 stock returns contain information at multiple temporal scales: high-frequency noise at the daily level, directional patterns at the weekly level, and trend/regime information at the monthly level.

NHiTS addresses this by assigning different blocks to process the input at different downsampling rates. The first stack may use a large MaxPool kernel (e.g., 8×) to capture low-frequency trends, while the last stack uses a small kernel (e.g., 2×) to model high-frequency residuals. The hierarchical interpolation then reconstructs the forecast by combining these multi-scale components.

In contrast:

- **N-BEATS** uses a similar block-residual architecture but without explicit multi-rate downsampling. All blocks process the input at the same temporal resolution, relying on the residual connections alone to decompose the signal. This explains why N-BEATS achieves comparable single-best accuracy (MAE 0.283 vs. 0.285) but higher average error (0.582 vs. 0.527) and higher variance across configurations.

- **TCN** applies dilated causal convolutions at a fixed kernel size, which can capture long-range dependencies but does not explicitly decompose the signal into different frequency bands. The EDA's multi-scale analysis shows that this single-rate approach misses important interactions between frequency components, contributing to TCN's rapid degradation at longer horizons ($H \geq 20$).

- **TiDE** uses a linear encoder-decoder with time-dependent dense layers. While computationally efficient, the flat architecture lacks the hierarchical structure needed to separately model different temporal scales, resulting in sensitivity to the input multiplier and Huber Loss beta parameter.

### Robustness Through Architecture-Data Alignment

The consistency of NHiTS's performance across the 240 experimental configurations (lowest variance in MAE: Std = 0.139 compared to 0.197 for N-BEATS, 0.542 for TiDE, and 0.468 for TCN) is a direct consequence of its architecture being well-aligned with the data characteristics:

1. **The multi-rate downsampling provides implicit regularization**: By forcing different blocks to operate at different resolutions, the architecture prevents overfitting to high-frequency noise while maintaining sensitivity to meaningful lower-frequency patterns.

2. **Hierarchical interpolation acts as an ensemble**: Each stack's output is interpolated to the target resolution and summed, functioning similarly to an ensemble of frequency-specific forecasters. This ensemble effect reduces variance, explaining NHiTS's consistently lower standard deviation across hyperparameter configurations.

3. **Efficient parameter utilization**: NHiTS achieves comparable accuracy to N-BEATS with significantly fewer effective parameters per frequency band, as the MaxPool downsampling reduces the dimensionality of each block's input. This efficiency translates to the observed 6.4× training speed advantage and reduced overfitting risk.

### Implications for the Thai Financial Market Context

The SET100 stocks in this study represent a relatively less liquid market compared to major global indices (S&P 500, FTSE 100), with the following implications:

- **Higher noise-to-signal ratio**: The EDA showed that daily return distributions have heavier tails and higher kurtosis compared to typical values for major index constituents. NHiTS's multi-rate downsampling effectively filters this noise at the block level.

- **Regime sensitivity**: The Thai market experienced multiple regime changes during the study period (COVID-19 crash, recovery, geopolitical tensions). NHiTS's residual stacking allows different blocks to specialize in different market regimes, contributing to its robust cross-horizon performance.

- **Moderate liquidity**: Some SET100 stocks have lower trading volumes, leading to occasional price gaps. The hierarchical interpolation mechanism smooths over these gaps at lower-frequency blocks while preserving valid high-frequency signals at higher-resolution blocks.

These market-specific properties further explain why the architecture-data alignment is particularly strong for the SET100 context, supporting this study's finding that NHiTS is the most suitable model for Thai stock price forecasting among the four architectures evaluated.

## Model Performance When Using News Text Data

### Step 5: News Covariate Integration

News features were integrated using two methods applied to the 21 candidate tickers:

**Method 1 — Sentiment Score (S6m1)**: Daily average sentiment scores (positive/neutral/negative from broker analyst reports) were added as past covariates alongside OHLV and SET.

**Method 2 — Content Embedding (S6m2)**: 12-dimensional content embedding vectors derived from paraphrase-multilingual-MiniLM-L12-v2 [@reimers-2019-sentence-bert] sentence transformer with PCA reduction were added as past covariates alongside OHLV and SET.

### Performance Comparison for Selected 8 Tickers

| Ticker | S5 MAE | S6m1 MAE | $\Delta$ m1 | S6m2 MAE | $\Delta$ m2 |
|--------|:------:|:--------:|:-----------:|:--------:|:-----------:|
| SPALI | 0.554 | 0.538 | −2.9% | 0.548 | −1.1% |
| PTT | 1.624 | 0.871 | −46.4% | 1.096 | −32.5% |
| KTC | 2.700 | 2.310 | −14.4% | 2.713 | +0.5% |
| AOT | 1.520 | 1.475 | −3.0% | 1.523 | +0.2% |
| MINT | 0.917 | 0.944 | +2.9% | 0.917 | 0.0% |
| AMATA | 1.198 | 1.325 | +10.6% | 1.187 | −0.9% |
| MTC | 1.833 | 1.900 | +3.7% | 1.822 | −0.6% |
| PLANB | 0.297 | 0.358 | +20.5% | 0.300 | +1.0% |

Table: News covariate impact on model performance — S6m1 (sentiment) and S6m2 (embedding) vs. S5 baseline.

### Key Findings

1. **PTT benefited most from news covariates**: Sentiment (S6m1) reduced MAE by 46.4% and content embedding (S6m2) by 32.5% compared to S5. This suggested that PTT, as a major SET index constituent, is highly sensitive to market-level news signals.

2. **KTC showed moderate improvement with sentiment**: S6m1 reduced MAE by 14.4%, but S6m2 had negligible effect (+0.5%).

3. **PLANB degraded with sentiment**: S6m1 increased MAE by 20.5%, possibly because PLANB's price dynamics are driven by factors not captured in general market news.

4. **Content embedding (S6m2) was more stable** than sentiment (S6m1): Across the 8 tickers, S6m2 produced smaller changes from S5 (range: −32.5% to +1.0%) compared to S6m1 (range: −46.4% to +20.5%).

5. **News covariates did not uniformly improve performance**: For tickers where the base model (S5) already performed well (e.g., MINT, SPALI), news features provided minimal additional benefit.

### Full Results Across 21 Tickers

Across all 21 tickers, the average performance for each news method was:

| Method | Mean MSE | Mean MAE | Mean MAPE (%) |
|--------|:--------:|:--------:|:-------------:|
| S5 (Baseline) | 65.54 | 2.82 | 10.03 |
| S6m1 (Sentiment) | 62.29 | 2.62 | 7.93 |
| S6m2 (Embedding) | 65.48 | 2.82 | 10.02 |

Table: Average performance of news covariate methods across 21 tickers (final test set).

S6m1 (sentiment) produced the lowest mean MSE (62.29) and mean MAE (2.62). S6m2 (embedding) performed nearly identically to the S5 baseline. This suggested that sentiment scores, being domain-specific signals from broker analysts, contained more directly actionable information for stock price forecasting than the general-purpose content embeddings.

### Directional Accuracy Analysis

In addition to forecast error metrics, the models were evaluated on their ability to predict the direction of price movement. Three outlier tickers (PTTGC, SCC, VGI) were excluded from the revised analysis using an IQR-based composite distance method, resulting in 17 tickers for the directional accuracy assessment.

| Covariate | Accuracy | Precision | Recall | F1-score |
|:----------|:--------:|:---------:|:------:|:--------:|
| OHLV | 47.99% | 67.48% | 46.16% | 54.31% |
| **OHLV + SET** | **51.27%** | **68.91%** | **52.58%** | **59.30%** |
| OHLV + SET + Sentiment | 49.12% | 66.88% | 50.45% | 57.31% |
| OHLV + SET + Embedding | 48.85% | 66.60% | 50.02% | 56.89% |

Table: Directional accuracy metrics by covariate configuration (revised, 17 tickers).

The OHLV + SET (OHLV\_SETBK) configuration achieved the highest directional accuracy (51.27%) and F1-score (59.30%), indicating that the addition of the SET market index improved the model's ability to predict price movement direction. Notably, news covariates (sentiment and embedding) did not improve directional accuracy over the OHLV + SET baseline, despite their marginal improvement on forecast error metrics for certain tickers.

This result complemented the forecast error analysis: while OHLV alone produced the lowest magnitude errors (MAE = 1.29, MAPE = 3.92%), the OHLV + SET configuration was superior for directional prediction. The finding suggested a trade-off between minimizing forecast magnitude error and maximizing directional accuracy, with the optimal covariate configuration depending on the specific application (e.g., point forecast accuracy vs. trading signal generation).

## Portfolio Optimization Results

### Strategy Configuration (Step 6)

Portfolio simulation was conducted using the 8 selected tickers with the following parameters:

| Parameter | Value |
|-----------|-------|
| Initial capital | 1,000,000 THB |
| Simulation period | 2025-01-02 to 2025-10-21 |
| Risk-free rate | 1.8% annual |
| Transaction fee | 0.1% per trade (buy and sell) |
| Buy threshold | +3% predicted return |
| Sell threshold | −3% predicted return |
| Strong buy signal | +8% predicted return |
| Strong sell signal | −8% predicted return |
| Sell aggression | 1.0 (sell 100% of held shares) |
| Buy aggression | 0.8 (use 80% of available cash) |

Table: Portfolio simulation parameters.

Two forecast modes were tested:

- **Batch forecast**: A single 10-day ahead forecast generated at the start of each horizon window.
- **Rolling forecast**: Updated forecasts generated every 5 or 10 trading days with a sliding window.

### Part A: Batch Forecast Results

| Strategy | Final Value (THB) | Total Return | Ann. Return | Sharpe | Max DD | Fees (THB) |
|----------|:-----------------:|:----------:|:---------:|:------:|:------:|:----------:|
| S4 (OHLV) | 852,457 | −14.75% | −17.51% | −0.603 | −31.21% | 2,589 |
| S5 (+ SET) | 725,100 | −27.49% | −32.13% | −1.246 | −41.72% | 2,557 |
| S6m1 (+ Sentiment) | 834,071 | −16.59% | −19.65% | −0.460 | −42.43% | 3,789 |
| S6m2 (+ Embedding) | 723,336 | −27.67% | −32.33% | −1.243 | −42.07% | 2,618 |
| **Baseline Buy-and-Hold** | **780,680** | **−21.93%** | **−25.81%** | **−1.306** | **−31.28%** | **999** |

Table: Batch forecast portfolio performance.

All batch forecast strategies produced negative returns, reflecting the challenging market conditions during the simulation period (the SET index declined significantly). However, S4 (−14.75%) and S6m1 (−16.59%) outperformed the buy-and-hold baseline (−21.93%), demonstrating that even imperfect forecasts can add value through active position management.

### Part B: Rolling Forecast Results

| Strategy | Final Value (THB) | Total Return | Ann. Return | Sharpe | Max DD | Fees (THB) |
|----------|:-----------------:|:----------:|:---------:|:------:|:------:|:----------:|
| Rolling 10d S4 | **1,083,802** | **+8.38%** | **+10.19%** | **0.399** | −27.31% | 7,067 |
| Rolling 10d S5 | 1,065,154 | +6.52% | +7.91% | 0.342 | −24.74% | 5,528 |
| Rolling 10d S6m1 | 1,016,050 | +1.61% | +1.94% | 0.187 | −31.50% | 5,944 |
| Rolling 10d S6m2 | 1,066,221 | +6.62% | +8.04% | 0.346 | −24.14% | 5,548 |
| Rolling 5d S4 | 926,642 | −7.34% | −8.78% | −0.210 | −30.39% | 3,126 |
| Rolling 5d S5 | 921,321 | −7.87% | −9.41% | −0.329 | −28.05% | 3,273 |
| Rolling 5d S6m1 | 1,011,343 | +1.13% | +1.37% | 0.134 | −27.34% | 4,166 |
| Rolling 5d S6m2 | 930,871 | −6.91% | −8.27% | −0.275 | −27.79% | 3,347 |

Table: Rolling forecast portfolio performance.

The **Rolling 10-day S4** strategy achieved the best overall performance: a positive return of +8.38% (annualized +10.19%) with a Sharpe ratio of 0.399, outperforming the buy-and-hold baseline by over 30 percentage points. All Rolling 10-day strategies generated positive returns, while Rolling 5-day strategies generally underperformed, suggesting that the 10-day forecast horizon was better suited to the portfolio trading framework.

### Forecast Accuracy by Strategy

| Strategy | Avg MAE | Avg MAPE (%) | Avg MSE |
|----------|:-------:|:-----------:|:-------:|
| Rolling 10d S4 | **1.484** | **5.65** | **7.664** |
| Rolling 10d S6m1 | 1.525 | 5.74 | **7.342** |
| Rolling 10d S5 | 1.782 | 6.59 | 8.563 |
| Rolling 10d S6m2 | 1.783 | 6.60 | 8.575 |
| Batch S6m1 | 2.219 | 7.93 | 15.610 |
| Batch S4 | 2.266 | 8.30 | 17.382 |

Table: Forecast accuracy during portfolio simulation (selected strategies).

Rolling forecast strategies achieved substantially lower prediction errors than batch strategies: Rolling 10d S4 (MAE 1.484) versus Batch S4 (MAE 2.266), representing a 34.5% reduction. The rolling approach enabled the model to incorporate the most recent price data into each forecast update, improving accuracy.

### Overall Strategy Ranking

Table 4.4 presents all 13 strategies ranked by Sharpe ratio.

| Rank | Strategy | Total Return (%) | Sharpe | Max DD (%) |
|:----:|----------|:----------------:|:------:|:----------:|
| 1 | Rolling 10d S4 | +8.38 | 0.399 | −27.31 |
| 2 | Rolling 10d S6m2 | +6.62 | 0.346 | −24.14 |
| 3 | Rolling 10d S5 | +6.52 | 0.342 | −24.74 |
| 4 | Rolling 10d S6m1 | +1.61 | 0.187 | −31.50 |
| 5 | Rolling 5d S6m1 | +1.13 | 0.134 | −27.34 |
| 6 | Rolling 5d S4 | −7.34 | −0.210 | −30.39 |
| 7 | Rolling 5d S6m2 | −6.91 | −0.275 | −27.79 |
| 8 | Rolling 5d S5 | −7.87 | −0.329 | −28.05 |
| 9 | Batch S6m1 | −16.59 | −0.460 | −42.43 |
| 10 | Batch S4 | −14.75 | −0.603 | −31.21 |
| 11 | Batch S6m2 | −27.67 | −1.243 | −42.07 |
| 12 | Batch S5 | −27.49 | −1.246 | −41.72 |
| 13 | Baseline Buy-and-Hold | −21.93 | −1.306 | −31.28 |

Table: All portfolio strategies ranked by Sharpe ratio.

### Key Portfolio Findings

1. **Rolling forecast outperformed batch forecast**: All Rolling 10-day strategies achieved positive Sharpe ratios, while all batch strategies had negative Sharpe ratios.

2. **Simpler covariates performed best in portfolio context**: The S4 (OHLV only) configuration achieved the highest Sharpe ratio (0.399) in the Rolling 10-day setting, despite S6m1 having lower MSE. This suggested that additional covariates may introduce noise that, while not substantially affecting point forecast accuracy, impacts trading signal quality.

3. **All strategies beat the baseline**: Every strategy except the bottom two (Batch S5 and Batch S6m2) outperformed the buy-and-hold baseline (Sharpe −1.306).

4. **Transaction fees were manageable**: The most active strategy (Rolling 10d S4) incurred 7,067 THB in fees against an 83,802 THB profit, representing a fee-to-profit ratio of 8.4%.

5. **Rolling 10-day was optimal**: The 10-day rolling window aligned with the model's trained forecast horizon ($H=10$), validating the horizon study's selection of $H=10$ as the output chunk length.

\newpage
