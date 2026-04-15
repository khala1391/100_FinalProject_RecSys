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

```{=latex}
% === Front matter: TOC, LOF, LOT ===
\startfrontmatterpages

% Add abstract entries to TOC (from separate Part 3 document)
\addtocontents{toc}{\protect\contentsline{chapter}{บทคัดย่อ}{i}{}}
\addtocontents{toc}{\protect\contentsline{chapter}{Abstract}{ii}{}}

\tableofcontents
\newpage
\listoffigures
\newpage
\listoftables
\newpage

% === Main matter: chapters (arabic, bottom-right) ===
\startmainpages
```

# Chapter 1: Introduction

## Rationale for the Study

Stock price forecasting has long been a subject of academic and practical interest, owing to its significance for investment decision-making, risk management, and financial planning. In the Stock Exchange of Thailand (SET), research on stock price forecasting has primarily relied on classical statistical time-series models and hybrid approaches. While these methods have captured certain patterns in stock price movements, they often exhibit limitations in their ability to model the nonlinear and highly dynamic nature of equity markets, particularly for medium- to long-horizon forecasts.

### Previous Studies

Research on stock price forecasting in the Thai market has progressed through several methodological phases. Early studies employed classical statistical approaches such as ARIMA and ARIMAX combined with polynomial regression or artificial neural networks (ANNs). These models typically relied on exogenous macroeconomic factors (e.g., financial indices, interest rates, inflation) and focused on specific stocks, sectors, or limited beta categories, which reduced their generalizability.

More recent studies (2023–2024) applied recurrent neural networks (RNN), Long Short-Term Memory (LSTM), hybrid GRU-LSTM architectures, and Temporal Convolutional Networks (TCN) to forecast stock prices for Thai equities. These models improved accuracy compared with traditional methods but remained limited in scope. For instance, selecting the top-10 market-capitalization stocks may include low-beta stocks, which have lower volatility and reduced potential for above-market returns.



```{=latex}
\begin{landscape}
```

| Year | Stock / Sector | Models Used | Input Variables | Forecast Horizon | Metrics | Reference |
|------|----------------|-------------|-----------------|------------------|---------|:---------:|
| 2021 | AMATA, KBANK | ARIMAX, Polynomial, ARIMAX-Polynomial | Historical stock price + macroeconomic indicators (business sentiment index, interest rate, inflation rate, loan rate, financial index) | Daily closing price | RMSE | [@wanida2021arimaxpolynomial] |
| 2021 | Electronic sector (SVI, DELTA, HANA: different beta values) | ARIMA, ANN, ARIMA-ANN | Historical stock price | Daily closing price | MAPE, RMSE | [@kanpiwan2021comparisonarimaann] |
| 2023 | Selected SET50 (ADVANC, BDMS, CPALL, MINT, SAWAD, DELTA) | RNN, LSTM, GRU-LSTM | Historical stock price | 30-day forward forecast | MAPE, RMSE | [@thanakrit2023lstmgru] |
| 2024 | Top-10 market cap (ADVANC, BDMS, CPALL, MINT, SAWAD, DELTA) | TCN | (1) Historical stock price + technical indicators, (2) Financial statement data, (3) Financial news (sentiment or embedding); all fed into TCN, outputs averaged into final perceptron | Next-day return prediction (short-term) | RMSE | [@pakapol2024deeplearningthai] |

Table: Summary of related literature on Thai stock market forecasting.

```{=latex}
\end{landscape}
```

### Limited Use of State-of-the-Art Deep Learning Models

Despite significant advances in global time-series forecasting, few studies have applied state-of-the-art deep learning architectures to the Thai stock market. Models such as:

- **TFT** (Temporal Fusion Transformer, 2020) [@lim2020temporalfusiontransformersinterpretable] — designed for multivariate and multi-horizon forecasting with interpretability.
- **N-HiTS** (Neural Hierarchical Interpolation for Time Series, 2022) [@challu2022nhitsneuralhierarchicalinterpolation] — specialized for long-horizon forecasting with strong efficiency through hierarchical interpolation and multi-rate data sampling.
- **TiDE** (Time-series Dense Encoder, 2023) [@das2024longtermforecastingtidetimeseries] — a scalable MLP-based encoder-decoder that matches or outperforms Transformer-based models while being 5–10× faster.

These architectures have shown significant promise in international benchmarks but remain underexplored for Thai equities. This gap highlights an opportunity to benchmark these models against traditional and earlier deep learning methods, particularly when incorporating financial news as an exogenous data source.

## Objectives of the Study

1. To develop and evaluate deep learning models for **medium-horizon (10-day) stock price forecasting** in the Thai stock market.
2. To integrate **financial data** (historical price, volume, and market index) with **financial news** (sentiment scores and content embeddings) for improved predictive performance.
3. To compare the performance of **state-of-the-art deep learning models** (N-HiTS, N-BEATS, TiDE, TCN) against each other across multiple evaluation dimensions.
4. To assess predictive performance using both **directional accuracy metrics** (Accuracy, Precision, Recall, F1-score) and **forecast error metrics** (MAE, MSE, MAPE).
5. To identify which model configuration and covariate combination is most suitable for **medium-horizon forecasting** in the Thai market context, and to evaluate its applicability in a simulated portfolio optimization scenario.

## Hypothesis

- Stocks with higher beta values are expected to exhibit higher RMSE, as their greater volatility makes accurate price forecasting more difficult.

## Scope of the Study

- **Market coverage**: Stock Exchange of Thailand — SET100 constituents.
- **Stock selection criteria**:
  - Must have been in the SET100 index for at least **100% of the past two years**.
  - Regularly covered by well-known securities research houses: InnovestX (SCBX) and Finansia Syrus (FNS).
  - Must represent **highly traded stocks** in their industry group or sector.
  - Selection across **multiple industry groups** to ensure sector diversity.
  - Must cover a **range of beta values** (low, medium, high, very high) based on the average 2-year beta value.
    - 1-year rolling beta values for the past five years should be consistent within the interquartile range (IQR) of the 2-year beta.
  - Final selection: **8 representative tickers** across four beta quartile categories, selected based on proximity to median model performance metrics (MAE, MAPE, MSE) to ensure representativeness.
- **Historical data coverage**: January 1, 2018, to January 1, 2025 (approximately seven years), providing sufficient data for robust modeling across different market conditions.
  - 70% of data used for training and validation (4-fold rolling window cross-validation).
  - 30% of data reserved for final unseen evaluation.
- **Forecast horizon**: 10 trading days (medium-horizon), with an input lookback window of 30 trading days.

## Methodology of the Study

The study followed a structured six-step research workflow:

1. **Data Collection**
   - **Primary data**: Historical stock prices (Open, High, Low, Close, Volume) downloaded via the `yfinance` Python library.
   - **Market index**: SET index (`^SET.BK`) used as a market-level covariate.
   - **Secondary data**: Financial news and market sentiment reports extracted from daily analyst reports published by InnovestX (SCBX) and Finansia Syrus (FNS), processed via PyMuPDF and PyTesseract.

2. **Data Preprocessing**
   - Cleaning and normalization of stock prices (business-day resampling, forward-fill of missing values).
   - Text preprocessing for financial news (PDF extraction, topic classification by main header keywords).
   - Sentiment scoring using broker analyst ground-truth labels (positive, neutral, negative).
   - Content embedding via paraphrase-multilingual-MiniLM-L12-v2 [@reimers-2019-sentence-bert] sentence transformer, reduced to 12-dimensional vectors using PCA.
   - Beta value calculation based on 2-year rolling returns against the SET index.

3. **Model Development**
   - **Proposed model**: NHiTS [@challu2022nhitsneuralhierarchicalinterpolation] — selected through systematic algorithm screening.
   - **Comparison models**: TCN [@bai2018empiricalevaluationgenericconvolutional], N-BEATS [@oreshkin2020nbeatsneuralbasisexpansion], TiDE [@das2024longtermforecastingtidetimeseries].
   - All models implemented using the **Darts** time-series library [@JMLR:v23:21-1177] with PyTorch Lightning backend.

4. **Model Training and Validation**
   - 4-fold rolling window cross-validation (70:20:10 train–validation–test split within each fold).
   - Hyperparameter tuning via grid search over batch size, learning rate, epochs, and Huber Loss beta values.
   - Horizon study varying input/output chunk lengths and multiplier ($L = m \times H$).
   - Progressive covariate integration: Close only $\rightarrow$ OHLV $\rightarrow$ OHLV + SET $\rightarrow$ OHLV + SET + News.

5. **Evaluation**
   - **Directional metrics**: Accuracy, Precision, Recall, F1-score — measuring direction of price movement prediction [@gil2024evaluationdeeplearningmodels; @chaudhary2025advancedlstmstock].
   - **Prediction performance metrics**: MAE, MSE, MAPE — evaluating magnitude of prediction errors.
   - Comparison of model performance across beta categories and covariate configurations.

6. **Portfolio Simulation**
   - Dynamic trading strategy based on 10-day forecast horizon with buy/sell thresholds.
   - Portfolio optimization with transaction fees (0.1% per trade).
   - Benchmark comparison against SET index buy-and-hold and equal-weight portfolios.

## Contribution of the Study

- Provides an **empirical benchmark** for the application of state-of-the-art deep learning models (NHiTS, N-BEATS, TCN, TiDE) in the Thai stock market context.
- Offers insights into the **effectiveness of combining financial news with historical market data** for medium-horizon forecasting, using both sentiment scores and content embeddings.
- Supports **investors and analysts** with improved forecasting tools and a framework for systematic model selection.
- Contributes to the **academic literature** by extending research on Thai equity forecasting beyond classical models and early deep learning methods.
- Demonstrates potential use cases for **multi-sector, beta-diverse stock forecasting** and portfolio optimization in emerging markets.


```{=latex}
\begin{landscape}
\needspace{15\baselineskip}
```

## Time Frame of the Study

| Task | Oct 2025 | Nov 2025 | Dec 2025 | Jan 2026 | Feb 2026 | Mar 2026 | Apr 2026 |
|------------------------|:------:|:------:|:------:|:------:|:------:|:------:|:--------:|
| Define problem & identify stocks | X | | | | | | |
| Study theory & related concepts | X | X | | | | | |
| Data collection / Model setup | | X | | | | | |
| Develop model | | | X | X | | | |
| Draft independent study report | | | | X | X | | |
| Result analysis & conclusion | | | | | X | X | |
| Finalize independent study report | | | | | | | X |

Table: Working schedule.

```{=latex}
\end{landscape}
```

\newpage
