---
title: "" 
author: ""
date: ""
header-includes:
    - \input{../config/header.tex}
---

```{=latex}
% --- Header table (font: 16pt) ---
\noindent
\begin{tabular}{@{}p{4cm}p{11cm}}
\textbf{Mr.Yuttapong Mahasittiwat} & Developing Deep Learning Models for Medium-Horizon Stock Price Forecasting in the Thai Market Using Financial Data and News \\[0.3cm]
\textbf{Project Advisor} & Asst. Prof. Suronapee Phoomvuthisarn, Ph.D.
\end{tabular}

\noindent\hrulefill

\begin{center}
\textbf{\large Abstract}
\end{center}
```

<!-- Body text (font: 16pt default from header.tex) -->

\hspace*{1.5cm} This study developed and evaluated deep learning models for medium-horizon (10-day) stock price forecasting in the Stock Exchange of Thailand (SET). Eight representative tickers from the SET100 index were selected across four beta quartile categories (low, medium, high, very high), using historical price data from January 2018 to January 2025.

The research followed a structured six-step workflow: (1) algorithm screening and hyperparameter tuning across 876 experimental configurations of four architectures (TCN, N-BEATS, NHiTS, TiDE); (2) horizon study to determine optimal input and output chunk lengths; (3–5) progressive covariate integration from OHLV features, SET index, to financial news data (broker analyst sentiment scores and 12-dimensional content embeddings from paraphrase-multilingual-MiniLM-L12-v2); and (6) portfolio optimization simulation with transaction fees.

**NHiTS** (Neural Hierarchical Interpolation for Time Series) was selected as the best-performing model, achieving the lowest mean MAE (0.527) and mean MAPE (1.78%) across all configurations while training 6.4 times faster than N-BEATS. The optimal configuration was identified as input chunk length $L = 30$, output chunk length $H = 10$, and multiplier $m = 3$. News covariates improved forecasting for specific tickers — notably PTT, where sentiment scores reduced MAE by 46.4% — though the impact was not uniform across all stocks.

Portfolio simulation demonstrated that the Rolling 10-day strategy using OHLV covariates achieved a total return of +8.38% (annualized +10.19%, Sharpe ratio 0.399), compared to the buy-and-hold baseline of −21.93% (Sharpe ratio −1.306). All Rolling 10-day strategies generated positive returns despite a declining market, confirming the practical value of NHiTS-based forecasting for active portfolio management in the Thai equity market.

```{=latex}
\vspace{\baselineskip}

% --- Keywords (font: 16pt) ---
\noindent\textbf{Keywords:} stock price forecasting, deep learning, NHiTS, time series, Stock Exchange of Thailand, news sentiment analysis

\vfill

% --- Footer table (font: 16pt) ---
\noindent
\begin{tabular}{@{}p{3cm}p{4cm}p{1cm}p{6cm}@{}}
\textbf{Major} & Statistics and Data Science & \textbf{Student} & Mr. Yuttapong Mahasittiwat \\[0.3cm]
\textbf{Academic Year} & 2025 & \textbf{Advisor} &  Asst. Prof. Suronapee Phoomvuthisarn, Ph.D.
\end{tabular}

\newpage
```
