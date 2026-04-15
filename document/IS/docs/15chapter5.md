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

# Chapter 5: Summary and Discussion

## Summary of Findings

This study developed and evaluated deep learning models for medium-horizon (10-day) stock price forecasting in the Thai stock market, using data from eight SET100 constituents spanning four beta quartile categories. The research followed a structured six-step workflow, progressively integrating financial data and news covariates. The key findings are summarized below.

### Algorithm Selection

Four deep learning architectures — TCN, N-BEATS, NHiTS, and TiDE — were systematically screened across 876 experimental configurations. **NHiTS** [@challu2022nhitsneuralhierarchicalinterpolation] was selected as the proposed model based on:

- **Lowest mean MAE** (0.527) and **lowest mean MAPE** (1.78%) across all configurations.
- **Lowest performance variance** (Std MAE = 0.139), indicating robustness to hyperparameter choices.
- **6.4× faster training** than N-BEATS (40.8 s vs. 259.6 s on average), with comparable accuracy.
- **Superior performance at longer horizons** ($H \geq 5$), which was critical for the medium-horizon forecasting objective.

### Optimal Horizon Configuration

The horizon study identified $L = 30$, $H = 10$, $m = 3$ as the optimal configuration:

- $H = 10$ (two trading weeks) balanced forecast accuracy against horizon degradation.
- $m = 3$ provided a 30-day (approximately six trading weeks) lookback window, offering sufficient temporal context.
- NHiTS at this configuration achieved MAE = 0.431 and MAPE = 1.45% with a training time of 25.6 seconds.

### Covariate Integration

Progressive covariate addition produced the following average performance across the 8 selected tickers:

| Step | Configuration | Mean MAE | Mean MAPE (%) |
|:----:|---------------|:--------:|:-------------:|
| S4 | OHLV | 1.586 | 3.62 |
| S5 | OHLV + SET | 1.331 | 4.38 |
| S6m1 | OHLV + SET + Sentiment | 1.329 | 4.35 |
| S6m2 | OHLV + SET + Embedding | 1.294 | 4.32 |

Table: Summary of average model performance across covariate steps.

The impact of additional covariates was **ticker-dependent**. PTT benefited most from news covariates (MAE reduced by 46.4% with sentiment scores), while tickers such as KTC and PLANB showed degradation with certain covariate additions.

### News Integration

- **Sentiment scores (S6m1)** provided more concentrated improvement than content embeddings for specific tickers, particularly large-cap index constituents (e.g., PTT).
- **Content embeddings (S6m2)** via paraphrase-multilingual-MiniLM-L12-v2 [@reimers-2019-sentence-bert] were more stable across tickers but provided smaller marginal improvements.
- Across all 21 tickers, S6m1 achieved the lowest mean MSE (62.29) and MAE (2.62), while S6m2 performed nearly identically to the S5 baseline.

### Portfolio Optimization

The portfolio simulation across 13 strategies revealed:

- **Rolling 10-day S4 (OHLV only)** achieved the best result: +8.38% total return, Sharpe ratio of 0.399, outperforming the buy-and-hold baseline (−21.93%) by over 30 percentage points.
- All Rolling 10-day strategies generated **positive returns** despite a declining market, while all batch strategies produced losses.
- The buy-and-hold baseline ranked last (Sharpe = −1.306), confirming the value of active forecast-driven trading.

## Discussion

### Comparison with Prior Thai Market Studies

The results of this study can be contextualized against prior Thai stock market forecasting research:

| Study | Model | Horizon | Best Metric | This Study (NHiTS) |
|-------|-------|---------|-------------|---------------------|
| @wanida2021arimaxpolynomial | ARIMAX-Polynomial | Daily | RMSE (stock-specific) | Lower MAPE across 8 diverse tickers |
| @kanpiwan2021comparisonarimaann | ARIMA-ANN hybrid | Daily | MAPE, RMSE | Comparable MAPE with multi-ticker coverage |
| @thanakrit2023lstmgru | GRU-LSTM hybrid | 30-day | MAPE, RMSE | Similar horizon, with covariate integration |
| @pakapol2024deeplearningthai | TCN (multi-stream) | Next-day | RMSE | NHiTS outperformed TCN at all horizons |

Table: Comparison with prior Thai market forecasting studies.

Unlike previous studies that focused on a single model or limited stock selection, this study provided a **systematic benchmark** of four SOTA architectures across beta-diverse tickers. The finding that NHiTS outperformed TCN at all horizons extended the results of @pakapol2024deeplearningthai, who used TCN for next-day prediction. The medium-horizon focus ($H = 10$) addressed the gap between short-term (1-day) and long-term (30-day) forecasting explored in prior work.

### Why NHiTS Outperformed Alternatives

NHiTS's superior performance was attributable to its architectural design:

1. **Hierarchical interpolation** reduced the effective output dimensionality, enabling efficient multi-step forecasting without proportional parameter growth.
2. **Multi-rate data sampling** allowed different blocks to specialize in different temporal frequencies, capturing both short-term fluctuations and longer-term trends.
3. These properties made NHiTS particularly well-suited for the $H = 10$ medium-horizon setting, where models must balance fine-grained and coarse-grained temporal patterns.

In contrast, TCN's performance degraded rapidly beyond $H = 10$ (MAE from 0.610 to 1.397 at $H = 30$) due to its fixed receptive field. N-BEATS achieved competitive accuracy but at 6.4× the training cost. TiDE showed high variance across configurations (Std MAE = 0.542).

### Effect of Beta Category

The hypothesis that stocks with higher beta values would exhibit higher forecasting error was **partially supported**. Among the selected tickers:

- **Low beta** (SPALI, PTT): SPALI showed consistently low MAE (0.516–0.554), while PTT exhibited high initial error (MAE = 5.682 in S4) that improved dramatically with covariates (0.983 in S6).
- **Medium beta** (KTC, AOT): AOT maintained stable, moderate error. KTC degraded with SET covariate but improved with news.
- **High beta** (MINT, AMATA): Both showed moderate, stable errors across all steps.
- **Very high beta** (MTC, PLANB): PLANB had the lowest absolute MAE among all tickers (0.265 in S4), likely due to its lower price level, while MTC showed the expected higher error.

The relationship between beta and forecasting difficulty was confounded by **price level effects** (higher-priced stocks naturally produce higher absolute MAE) and **ticker-specific dynamics** (e.g., stock splits, structural changes). MAPE provided a more meaningful comparison across tickers with different price levels.

### Practical Significance of News Covariates

The news covariate results suggested that:

1. **Broker analyst sentiment scores** contained actionable signal for stocks that are heavily covered by analysts and sensitive to market-level news (e.g., PTT).
2. **Content embeddings** provided negligible incremental benefit over the S5 baseline when averaged across tickers, indicating that the 12-dimensional PCA reduction may have lost discriminative information.
3. In the portfolio simulation context, the **simpler S4 (OHLV only) model outperformed** models with news covariates, suggesting that additional covariates may introduce noise that degrades trading signal quality despite marginal improvements in point forecast accuracy.

## Benefits Obtained

1. **Empirical benchmark**: This study provided the first systematic comparison of NHiTS, N-BEATS, TCN, and TiDE for Thai stock market forecasting, establishing NHiTS as the most efficient and accurate architecture for medium-horizon prediction.

2. **Practical forecasting framework**: The six-step workflow (algorithm screening $\rightarrow$ horizon study $\rightarrow$ covariate integration $\rightarrow$ portfolio simulation) offered a replicable methodology for developing and deploying forecasting models in emerging markets.

3. **News integration insights**: The study demonstrated that broker analyst sentiment can improve forecasting for specific stocks, while also revealing the limitations of general-purpose content embeddings for financial forecasting.

4. **Portfolio strategy validation**: The Rolling 10-day strategy demonstrated that even during a declining market (SET index −21.93%), a forecast-driven active trading strategy could generate positive returns (+8.38%), providing practical value for investors and analysts.

5. **Beta-diverse analysis**: By selecting tickers across four beta quartile categories, the study provided insights into how model performance varies with stock volatility, offering guidance for model deployment across different risk profiles.

## Limitations of the Study

1. **Data period**: The study used historical data from January 2018 to January 2025. Market regime changes, structural breaks, and black swan events (e.g., COVID-19 pandemic in 2020) may affect the generalizability of the results to other periods.

2. **News source coverage**: Financial news was sourced exclusively from two broker houses — InnovestX (SCBX) and Finansia Syrus (FNS). This limited the breadth and diversity of news signals, potentially missing important information from other sources (social media, international news, regulatory announcements).

3. **Transaction fee assumption**: A fixed 0.1% transaction fee was applied per trade. In practice, fees vary by broker, account type, and trade size. The study did not account for bid-ask spread, market impact, or slippage.

4. **Single market**: The study was limited to the Stock Exchange of Thailand (SET). Results may not generalize to other markets with different microstructure, trading volumes, or information environments.

5. **Univariate target**: Only the daily closing price was forecasted. Multi-output forecasting (e.g., jointly predicting high, low, and close) or volatility forecasting was not explored.

6. **Limited sentiment granularity**: Sentiment scores were derived from broker analyst ground-truth labels (positive/neutral/negative). More granular sentiment analysis (e.g., aspect-level sentiment, intensity scores) was not performed.

7. **Portfolio simulation scope**: The simulation covered approximately 10 months (January–October 2025). A longer out-of-sample period encompassing different market regimes would provide a more robust assessment of portfolio strategy viability.

## Future Work

### Data Expansion

- **Extended data period**: Incorporating more recent data and extending the backtesting period would improve the robustness of portfolio simulation results and enable testing across multiple market cycles.
- **Additional news sources**: Integrating news from social media platforms (e.g., Twitter/X, Pantip), SET announcements, and international news services could improve news covariate coverage and signal quality.
- **Cross-market data**: Adding data from correlated regional markets (e.g., HKEX, SGX) as covariates could capture cross-border information spillovers relevant to Thai equities.

### Model Improvement

- **Attention mechanisms**: Incorporating explicit attention layers (e.g., TFT-style variable selection networks) into the NHiTS architecture could improve interpretability and enable the model to learn which covariates are most important at each time step.
- **Ensemble methods**: Combining predictions from multiple architectures (NHiTS, N-BEATS, TiDE) through ensemble averaging or stacking could reduce variance and improve robustness.
- **Advanced sentiment models**: Replacing the 3-class sentiment scores with fine-grained financial sentiment models or using larger-dimensional content embeddings (beyond 12-dim PCA) could preserve more discriminative information from news text.
- **Hyperparameter optimization**: Replacing grid search with Bayesian optimization (e.g., Optuna) would enable more efficient exploration of the hyperparameter space, potentially discovering superior configurations.

### Model Development

- **Multi-output forecasting**: Extending the model to jointly forecast multiple price targets (Open, High, Low, Close) could support more sophisticated trading strategies that account for intraday price ranges.
- **Probabilistic forecasting**: Replacing point forecasts with probabilistic outputs (e.g., quantile regression, prediction intervals) would enable risk-aware portfolio optimization and better position sizing.
- **Real-time deployment**: Developing a real-time forecasting pipeline with automated data ingestion, model retraining, and trading signal generation would bridge the gap between research and practical application.
- **Transfer learning**: Pre-training a global NHiTS model on multiple tickers and fine-tuning on individual stocks could improve performance for tickers with limited historical data.

\newpage
