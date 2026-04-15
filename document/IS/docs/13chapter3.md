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

# Chapter 3: Methodology

This chapter describes the research methodology employed in this study, including the scope, data, model architecture, training strategy, evaluation criteria, and simulation scenarios for investment.

## Scope

This study focuses on developing and evaluating deep learning models for medium-horizon stock price forecasting in the Stock Exchange of Thailand (SET). The scope of the study is defined as follows:

- **Study period**: Historical stock price data from January 1, 2018, to January 1, 2025 (approximately seven years of trading data).
- **Market coverage**: Stocks listed in the SET100 index, which represents the 100 largest and most liquid securities on the SET.
- **Stock selection criteria**: Stocks must satisfy the following conditions:
  - Continuous membership in the SET100 index for at least 100% of the past two years.
  - Regular coverage by at least one of the two selected securities research houses: InnovestX (SCBX) and Finansia Syrus (FNS).
  - Representation across multiple industry groups with high trading volume.
  - Coverage of a range of beta values (low, medium, high, and very high) based on the two-year rolling average beta relative to the SET index.
  - Consistency of 1-year rolling beta values within the interquartile range of the 2-year beta.
- **Selected algorithm**: NHiTS (Neural Hierarchical Interpolation for Time Series), selected through a systematic screening process in Steps 1–2 of the study workflow.
- **Forecast horizon**: 10-day ahead forecasting (output chunk length $H = 10$) with a 30-day lookback window (input chunk length $L = 30$), yielding a multiplier $m = 3$ under the formula $L = m \times H$.
- **Hyperparameters**: Batch size of 16, learning rate of $1 \times 10^{-4}$, 100 training epochs, Huber Loss with $\beta = 0.00001$.
- **Sentiment analysis scope**: Daily financial news reports from SCBX (InnovestX) and Finansia Syrus, processed as past covariates for the forecasting model.

## Population / Data

### Target Universe

The initial population comprised all stocks in the SET100 index. After applying the selection criteria described in the scope, the study retained a set of tickers representing diversity in beta value and industry group. Specifically, the stock selection analysis (`04a_stock_selection_analysis.ipynb`) identified **8 representative tickers** across four beta categories using quartile-based classification:

| Beta Category | Description | Number of Tickers |
|:---:|:---:|:---:|
| Very High | Top 25th percentile of 2-year beta | 2 |
| High | 50th–75th percentile | 2 |
| Medium | 25th–50th percentile | 2 |
| Low | Bottom 25th percentile | 2 |

Table: Beta categories and ticker distribution.

The selection criterion for representative tickers was proximity to the median model performance (MAE, MAPE, MSE) across Sections 4, 5, and 6 of the modeling pipeline, ensuring that the selected stocks are representative of general model behavior rather than outliers.

The full list of candidate tickers used in the multi-ticker modeling loop (Steps 3–6) included 21 stocks: SAWAD.BK, VGI.BK, BAM.BK, PTTGC.BK, MTC.BK, PLANB.BK, BANPU.BK, MINT.BK, AMATA.BK, SCC.BK, TOP.BK, KTC.BK, TRUE.BK, AP.BK, RATCH.BK, AOT.BK, SPALI.BK, ADVANC.BK, PTTEP.BK, TU.BK, and PTT.BK.

The final 8 tickers selected for portfolio optimization (Step 6) were: SPALI.BK, PTT.BK, KTC.BK, AOT.BK, MINT.BK, AMATA.BK, MTC.BK, and PLANB.BK.

### Data Sources

| Data Type | Source | Description |
|-----------|--------|-------------|
| Historical stock prices (OHLCV) | Yahoo Finance via `yfinance` API | Daily Open, High, Low, Close, and Volume for each ticker |
| Market index | Yahoo Finance (`^SET.BK`) | Daily close of the SET index, used as a past covariate |
| Financial news (sentiment) | InnovestX (SCBX), Finansia Syrus (FNS) | Daily broker analyst reports in PDF format |
| Beta values | SET100 constituent data | 2-year rolling beta calculated from historical returns |

Table: Data sources used in this study.

### Data Limitations

- **Stock splits**: Stocks that underwent splits during the study period required price adjustment to maintain continuity.
- **Beta calculation**: Beta values were computed as 2-year rolling averages; short-term instability in beta values may exist.
- **New IPO exclusion**: Stocks with insufficient trading history were excluded.
- **Trading fees**: A fixed transaction fee of 0.1% per trade was assumed for portfolio optimization simulations.

## Data Collection Method

### Historical Price Data

Historical daily stock price data (Open, High, Low, Close, Volume) was downloaded via the `yfinance` Python library for all candidate tickers and the SET index (`^SET.BK`). The data covered the period from January 1, 2018, to January 1, 2025. Missing values on non-trading days were forward-filled after resampling to a business-day frequency (`asfreq("B")`).

### News Data Extraction

Financial news content was extracted from daily analyst reports published by two Thai securities firms:

1. **InnovestX (SCBX)**: Daily market commentary PDFs were downloaded and text was extracted using PyMuPDF and PyTesseract for OCR-based extraction of scanned documents.
2. **Finansia Syrus (FNS)**: Similar daily research reports were processed using the same extraction pipeline.

The news data was combined from both sources, and articles were classified by main header keywords and associated tickers.

### News Sampling Methodology

A stratified random sampling approach was applied to select representative news articles:

- Articles were stratified by **main header (keyword topic)** and **sentiment score**.
- The **top 8 most frequent main header categories** were selected.
- News articles directly related to a specific ticker were excluded to avoid look-ahead bias.
- **Target sample size**: 10 news articles per day. In cases of insufficient samples within a stratum, all available samples from that stratum were retained.

### Sentiment Scoring

Sentiment labels were derived from broker analyst ground-truth assessments. Each article was assigned one of three sentiment labels:

| Label | Description |
|:-----:|-------------|
| Positive (+) | Favorable outlook or recommendation |
| Neutral (0) | No directional bias |
| Negative (−) | Unfavorable outlook or recommendation |

Table: Sentiment label categories.

The sentiment feature used in the model was `total_sum_normalized`, computed as the average sentiment score per article per day (sum of all category sentiments divided by the article count).

### Content Embedding

For the second news integration method, article content was encoded into dense vector representations:

1. Each article's text content was processed through a sentence transformer model (paraphrase-multilingual-MiniLM-L12-v2 [@reimers-2019-sentence-bert]).
2. The resulting 384-dimensional vectors were reduced to **12-dimensional representations** via Principal Component Analysis (PCA).
3. The 12-dim content embedding vectors (`content_1`, `content_2`, …, `content_12`) were aligned to the daily time index and used as past covariates, providing a richer distributional signal than a single scalar sentiment score.
4. On days without news, the last known embedding was propagated forward (forward-fill), and leading NaN values were back-filled.

## Model Architecture

### Proposed Model Architecture

The primary model employed in this study was **NHiTS** (Neural Hierarchical Interpolation for Time Series) [@challu2022nhitsneuralhierarchicalinterpolation]. NHiTS was selected based on its superior performance in the algorithm screening phase (Steps 1–2) and offers the following architectural advantages:

- **Hierarchical interpolation**: The model assembles predictions sequentially, emphasizing components with different frequencies and scales.
- **Multi-rate data sampling**: Input signals are decomposed at multiple temporal rates, enabling efficient capture of both short-term and long-term patterns.
- **Computational efficiency**: NHiTS achieves competitive accuracy with significantly lower computational cost compared to Transformer-based architectures.

The model was configured as follows:

| Parameter | Value |
|-----------|-------|
| Input chunk length ($L$) | 30 business days |
| Output chunk length ($H$) | 10 business days |
| Multiplier ($m$) | 3 ($L = m \times H$) |
| Loss function | Huber Loss ($\beta = 0.00001$) |
| Batch size | 16 |
| Learning rate | $1 \times 10^{-4}$ |
| Number of epochs | 100 |
| LR scheduler | ReduceLROnPlateau (monitor: train\_loss, factor: 0.5, patience: 5, min\_lr: $1 \times 10^{-5}$) |
| Early stopping | Monitor: val\_loss, min\_delta: $1 \times 10^{-4}$, patience: 15 |
| Random state | 42 |

Table: NHiTS model configuration.

The model received the **daily closing price** as the target series and **past covariates** that varied by experiment step:

| Step | Covariates |
|:----:|------------|
| 3 | Close + Open, High, Low, Volume (OHLV) |
| 4 | Close + OHLV + SET.BK index |
| 5 (Method 1) | Close + OHLV + SET.BK + sentiment score features |
| 5 (Method 2) | Close + OHLV + SET.BK + 12-dim content embedding |

Table: Covariate configurations by modeling step.

The model was implemented using the **Darts** library (`NHiTSModel`) with PyTorch Lightning as the training backend, and GPU acceleration was used where available.

### Baseline Models for Performance Comparison

During the algorithm screening phase (Steps 1–2), the following models were evaluated alongside NHiTS:

| Model | Category | Description |
|:------------------------------|:------------|:--------------------------------------------------------------|
| **TCN** (Temporal Convolutional Network) | Deep Learning | Causal convolutional architecture with dilated convolutions for sequential data |
| **N-BEATS** (Neural Basis Expansion Analysis) | Deep Learning | Stack-based architecture with backward and forward residual links [@oreshkin2020nbeatsneuralbasisexpansion] |
| **TiDE** (Time-series Dense Encoder) | Deep Learning | MLP-based encoder-decoder for long-term forecasting [@das2024longtermforecastingtidetimeseries] |

Table: Baseline models used in algorithm screening.

All four models (TCN, N-BEATS, NHiTS, TiDE) were trained under identical hyperparameter conditions and evaluated on the same single-ticker dataset (PTT.BK) during the screening phase.

## Strategy of Model Training

The study followed a six-step progressive workflow, each building upon the results of the previous step:

### Step 0: Ticker Selection

Candidate tickers were selected from the SET100 index based on beta category, financial figures, and industry representation. The screening process used data from the SET100 constituent lists and beta calculations from the `01prescreenSET100_byBeta.ipynb` and `02prescreenSET100_byFinancialFigure.ipynb` notebooks.

### Step 1: Algorithm Screening and Hyperparameter Tuning

The initial screening was conducted on a single reference ticker (PTT.BK) to identify the best-performing model architecture and hyperparameter configuration:

- **Models evaluated**: TCN, N-BEATS, NHiTS, TiDE.
- **Hyperparameter grid**:
  - Batch size: {8, 16}
  - Learning rate: {$1 \times 10^{-3}$, $1 \times 10^{-4}$}
  - Number of epochs: {50, 100, 150}
  - Loss function: Huber Loss with $\beta \in \{0.00001, 0.01, 0.5, 1\}$
- **Selection metric**: MAE (Mean Absolute Error) on the validation set.
- **Additional metrics**: MSE, MAPE for comprehensive evaluation.
- **Selected configuration**: NHiTS with batch size 16, learning rate $1 \times 10^{-4}$, 100 epochs, Huber Loss ($\beta = 0.00001$).

### Step 2: Horizon Study

Using the selected hyperparameters from Step 1, a systematic study was conducted to determine the optimal forecast horizon and lookback window:

- **Output horizon length** ($H$): {1, 5, 10, 20, 30} days.
- **Multiplier** ($m$): {1, 2, 3, 4}.
- **Input chunk length** ($L = m \times H$): ranged from 1 to 120 days.
- **Valid (L, H) pairs tested**: (1,1), (2,1), (3,1), (4,1), (5,5), (10,5), (15,5), (20,5), (10,10), (20,10), (30,10), (40,10), (20,20), (40,20), (60,20), (80,20), (30,30), (60,30), (90,30), (120,30).
- **Selected configuration**: $H = 10$, $m = 3$, $L = 30$.

Both modeling metrics and modeling time were compared to assess the trade-off between accuracy and computational cost.

### Step 3: Single-Ticker Proof of Concept with OHLV Covariates

The selected NHiTS model with optimal hyperparameters and horizon was first validated on PTT.BK using OHLV (Open, High, Low, Volume) as past covariates. This step served as a proof-of-concept before scaling to multi-ticker deployment.

### Step 4: Multi-Ticker Deployment with SET Index Covariate

The validated model was deployed across 21 candidate tickers in two sub-steps:

- **Step 4.1**: OHLV as covariates across all tickers.
- **Step 4.2**: OHLV + SET.BK index close as additional covariate.

This step evaluated whether adding a market-level signal (SET index) improved individual stock forecasting performance. Performance was assessed using both prediction error metrics (MAE, MSE, MAPE) and directional accuracy metrics (Accuracy, Precision, Recall, F1-score) to evaluate both forecast magnitude and trend prediction quality.

### Step 5: News Data Integration

News features were integrated as additional past covariates using two methods:

- **Method 1 (Sentiment score)**: The `total_sum_normalized` feature was computed as the daily average sentiment score across sampled news articles. The sentiment scores along with category features from the `SentandVol_byFeature.csv` dataset were merged with OHLV and SET.BK covariates.

- **Method 2 (Content embedding)**: A 12-dimensional content embedding vector was computed per day via PCA reduction of sentence transformer (paraphrase-multilingual-MiniLM-L12-v2 [@reimers-2019-sentence-bert]) vectors. The embedding features (`content_1` through `content_12`) from `sentiment_content_embedding_pca12.csv` were merged with OHLV and SET.BK covariates.

Both methods used forward-fill and back-fill strategies for dates without news data. The impact of news covariates was evaluated across all tickers using both prediction error and directional accuracy metrics, with outlier tickers (identified via IQR-based composite distance) excluded from the revised statistical summary to ensure robust performance assessment.

### Cross-Validation Strategy

All modeling steps employed a **4-fold rolling window cross-validation** scheme:

- The full training/validation dataset (70% of the complete series) was divided into 4 equal folds.
- Each fold contained approximately 457 business days ($457 \times 4 \approx 1{,}827$ total business days).
- Within each fold, data was split into 70% training, 20% validation, and 10% internal testing.
- The model was trained on the training subset, validated on the validation subset (for early stopping and best model selection), and evaluated on the internal test subset.
- The **Scaler** from the Darts library was used to normalize both the target series and covariates within each fold to prevent data leakage.
- Metrics were averaged across all 4 folds to produce the final cross-validation performance estimate.

### Fine-Tuning

After cross-validation, the best model from each step was fine-tuned using a 1-fold configuration on the full-period dataset (70% train + 20% validation), with the remaining 30% reserved as the final unseen test set.

### Training Infrastructure

- **Framework**: PyTorch via the Darts time-series library (`NHiTSModel`).
- **Training callbacks**:
  - `EarlyStopping`: monitoring `val_loss`, patience of 15 epochs, minimum delta of $1 \times 10^{-4}$.
  - `ModelCheckpoint`: saving the best model based on `val_loss`.
  - `ReduceLROnPlateau`: reducing learning rate by factor 0.5 when `train_loss` plateaus for 5 epochs, with a minimum learning rate of $1 \times 10^{-5}$.
- **Logging**: CSVLogger for per-epoch training and validation loss tracking.
- **GPU acceleration**: CUDA-enabled GPU was used when available.

## Evaluation of Model Performance

Model performance was assessed using two complementary groups of metrics:

### Prediction Performance Metrics

| Metric | Formula | Description |
|:-------|:-----------------------------------------------|:----------------------------------------------|
| MAE | $\frac{1}{n}\sum_{i=1}^{n}\|y_i - \hat{y}_i\|$ | Mean Absolute Error — average magnitude of prediction errors |
| MSE | $\frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$ | Mean Squared Error — penalizes larger errors |
| MAPE | $\frac{100}{n}\sum_{i=1}^{n}\left\|\frac{y_i - \hat{y}_i}{\max(\|y_i\|, \epsilon)}\right\|$ | Mean Absolute Percentage Error (with $\epsilon = 10^{-6}$ for numerical stability) |

Table: Prediction performance metrics.

```{=latex}
\needspace{12\baselineskip}
```

### Directional Metrics

| Metric | Description |
|:-----------|:----------------------------------------------------------------------|
| Accuracy | Proportion of correctly predicted price movement directions |
| Precision | Proportion of true positive directional predictions among all positive predictions |
| Recall | Proportion of true positive directional predictions among all actual positives |
| F1-score | Harmonic mean of Precision and Recall |

Table: Directional performance metrics.

MAE was used as the primary selection criterion during model screening and hyperparameter tuning (Steps 1–2). All metrics were computed on both the validation set (for model selection) and the test set (for final evaluation) across all cross-validation folds.

## Simulation on Scenario for Investment

### Portfolio Optimization (Step 6)

The final step of the study applied the trained NHiTS models to a simulated portfolio optimization and dynamic trading scenario. The simulation was designed to evaluate the practical applicability of the forecasting models for investment decision-making.

### Simulation Configuration

| Parameter | Value |
|-----------|-------|
| Initial capital | 1,000,000 THB |
| Risk-free rate | 1.8% annually (Thai 10-year government bond proxy) |
| Transaction fee | 0.1% of stock value per trade (buy or sell) |
| Simulation period | January 2, 2025 – October 21, 2025 |
| Forecast horizon | 10 trading days |
| Number of stocks | 8 (selected from Step 0 / `04a_stock_selection_analysis.ipynb`) |

Table: Portfolio simulation configuration.

### Trading Strategy

The simulation employed a **horizon-based dynamic trading strategy** with the following rules:

| Parameter | Value | Description |
|-----------|:-----:|-------------|
| Sell threshold | −3% | Predicted return below this triggers a sell signal |
| Buy threshold | +3% | Predicted return above this triggers a buy signal |
| Sell aggression | 1.0 | Fraction of shares to sell when signal is maximally negative |
| Buy aggression | 0.8 | Fraction of available cash to deploy when buying |
| Strong downward signal | −8% | Predicted return below this triggers selling all shares |
| Strong upward signal | +8% | Predicted return above this triggers maximum buy allocation |

Table: Horizon-based trading parameters.

Trading decisions were driven by the 10-day forecast horizon:

- If the forecast indicated a strong downward trend (predicted return < −8%), all shares of that ticker were sold.
- If the forecast indicated a moderate downward trend (predicted return < −3%), a proportional fraction of shares was sold.
- If the forecast indicated a strong upward trend (predicted return > +8%), the maximum fraction of available cash was allocated to purchase.
- If the forecast indicated a moderate upward trend (predicted return > +3%), a proportional allocation of cash was deployed.
- Cash allocation followed forecast conviction — tickers with the strongest predicted upside received proportionally more capital.

### Model Variants Tested

Four model variants were evaluated in the portfolio simulation:

| Variant | Covariates | Description |
|:-------:|------------|-------------|
| S4 | OHLV | Baseline price-volume features only |
| S5 | OHLV + SET.BK | Market index as additional covariate |
| S6m1 | OHLV + SET.BK + Sentiment | News sentiment score added |
| S6m2 | OHLV + SET.BK + Embedding | 12-dim content embedding added |

Table: Model variants used in portfolio simulation.

### Simulation Approaches

Three simulation approaches were conducted:

1. **Batch forecast (Part A)**: A single forecast was generated for the entire simulation horizon, and trades were executed based on the full forecast trajectory.
2. **Rolling forecast (Part B)**: The model re-forecasted every 5 or 10 trading days with updated market data, providing more granular trading signals.
3. **Baseline — Buy-and-hold**: An equal-weight portfolio was purchased on Day 1 and held to the end of the simulation period, serving as a benchmark.

### Performance Metrics for Simulation

- **Cumulative return**: Total portfolio return over the simulation period.
- **Sharpe ratio**: Excess return per unit of risk, calculated using the daily risk-free rate.
- **Maximum drawdown**: The largest peak-to-trough decline in portfolio value during the simulation.

No model retraining was performed during the simulation period; all models were loaded from the pre-trained checkpoints produced in Steps 3–5.

\newpage
