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

# Chapter 2: Related Concepts and Literatures

This chapter reviews the foundational concepts, model architectures, and prior research relevant to medium-horizon stock price forecasting using deep learning. It establishes the theoretical basis for the methodology described in Chapter 3.

## Definition of Related Terminology

### Time Series and Forecasting

A **time series** is a sequence of data points indexed in time order, where each observation is recorded at successive, equally spaced time intervals. In financial markets, time-series data includes daily stock prices, trading volumes, and index values. **Time-series forecasting** refers to the use of historical observations to predict future values [@shumway2025timeseries].

Forecasting horizons are commonly categorized as:

- **Short-horizon**: 1–5 trading days ahead.
- **Medium-horizon**: 5–30 trading days ahead.
- **Long-horizon**: Beyond 30 trading days.

This study focuses on medium-horizon forecasting with a 10-day output window.

### ARIMA and ARIMAX

**ARIMA** (Auto-Regressive Integrated Moving Average) is a classical statistical model for time-series forecasting that combines autoregression, differencing for stationarity, and moving average components. **ARIMAX** extends ARIMA by incorporating exogenous variables (e.g., macroeconomic indicators, market indices) as additional input features [@shumway2025timeseries].

While ARIMA-based models have been widely applied to Thai stock market forecasting [@wanida2021arimaxpolynomial; @kanpiwan2021comparisonarimaann], their linear nature limits their ability to capture the complex, nonlinear dynamics of equity markets.

### Recurrent Neural Networks (RNN)

**Recurrent Neural Networks** are a class of neural networks designed for sequential data, where connections between nodes form a directed cycle along a temporal sequence. RNNs maintain a hidden state that captures information from previous time steps, enabling them to model temporal dependencies [@Goodfellow-et-al-2016].

However, standard RNNs suffer from the **vanishing gradient problem**, which limits their ability to capture long-range dependencies in the input sequence.

### Long Short-Term Memory (LSTM)

**LSTM** [@hochreiter1997lstm] addresses the vanishing gradient problem by introducing a gating mechanism consisting of three gates (input, forget, and output) and a cell state. The cell state acts as a memory that can selectively retain or discard information over long sequences. The forget gate determines which information to discard from the previous cell state, the input gate controls which new information is stored, and the output gate regulates what information is passed to the next hidden state.

LSTM networks have been applied to Thai stock market forecasting with favorable results compared to traditional statistical methods [@thanakrit2023lstmgru].

### Gated Recurrent Unit (GRU)

The **GRU** [@chung2014empiricalevaluationgatedrecurrent] is a simplified variant of the LSTM that merges the cell state and hidden state into a single hidden state vector, using two gates (reset and update) instead of three. GRU achieves comparable performance to LSTM with lower computational cost, making it suitable for applications where training efficiency is a concern.

### Temporal Convolutional Network (TCN)

The **TCN** [@bai2018empiricalevaluationgenericconvolutional] applies causal, dilated convolutions to sequential data. Unlike RNN-based architectures, TCN processes the entire input sequence in parallel, which offers significant advantages in training speed. Key properties include:

- **Causal convolution**: The output at time $t$ depends only on inputs at time $t$ and earlier, preventing information leakage from future time steps.
- **Dilated convolution**: Exponentially increasing dilation factors enable the network to achieve a large receptive field while maintaining computational efficiency.
- **Residual connections**: Skip connections facilitate gradient flow and enable deeper architectures.

TCN has been applied to Thai stock market return prediction with deep learning and financial news data [@pakapol2024deeplearningthai].

### N-BEATS (Neural Basis Expansion Analysis for Time Series)

**N-BEATS** [@oreshkin2020nbeatsneuralbasisexpansion] is a stack-based deep learning architecture for time-series forecasting that uses backward and forward residual links. The model decomposes the forecast into interpretable basis functions through a hierarchical stack structure. Each block in a stack generates a partial forecast (forward) and a backcast (backward), where the backcast is subtracted from the input before passing to the next block. This architecture enables both interpretable and generic configurations.

![Architecture of N-BEATS model (source: Oreshkin et al., 2019)](../../202511_modeling/images/000_modelArchitecture/01_N-BEATS_Architecture.jpg){width=70%}

### N-HiTS (Neural Hierarchical Interpolation for Time Series)

**N-HiTS** [@challu2022nhitsneuralhierarchicalinterpolation] extends N-BEATS by incorporating two key innovations for improved long-horizon forecasting:

1. **Multi-rate data sampling**: The input signal is sampled at multiple temporal rates across different blocks, allowing each block to specialize in capturing patterns at different frequency scales (e.g., short-term fluctuations vs. long-term trends).
2. **Hierarchical interpolation**: Instead of generating full-length forecasts at each block, N-HiTS produces compressed forecast representations that are interpolated to the target horizon length. This significantly reduces the number of parameters and computational cost.

N-HiTS achieves competitive or superior accuracy compared to Transformer-based models while being substantially more efficient in terms of computation and memory usage. It is classified as a **PastCovariatesModel** in the Darts framework, accepting past covariates as additional input features.

![Architecture of N-HiTS model (source: Challu et al., 2022)](../../202511_modeling/images/000_modelArchitecture/02_N-HiTS_Architecture.png){width=70%}

### TiDE (Time-series Dense Encoder)

**TiDE** [@das2024longtermforecastingtidetimeseries] is an MLP-based encoder-decoder architecture designed for long-term time-series forecasting. The model combines the simplicity and speed of linear models with the ability to handle covariates and nonlinear dependencies. Key features include:

- **Dense encoder**: Maps historical observations and covariates into a latent representation.
- **Dense decoder**: Projects the latent representation to the forecast horizon.
- **Residual connections**: Improve gradient flow and enable deeper networks.

TiDE matches or outperforms prior Transformer-based approaches on popular long-term forecasting benchmarks while being 5–10× faster. It is classified as a **MixedCovariatesModel** in the Darts framework, supporting both past and future covariates.

![Architecture of TiDE model (source: Das et al., 2023)](../../202511_modeling/images/000_modelArchitecture/03_TiDE_architecture.png){width=70%}

### Temporal Fusion Transformer (TFT)

The **TFT** [@lim2020temporalfusiontransformersinterpretable] introduces an attention-based architecture that combines high-performance multi-horizon forecasting with interpretable insights into temporal dynamics. Key components include:

- **Variable selection networks**: Automatically identify the most relevant input features at each time step.
- **Gating layers**: Suppress unnecessary components, enabling robust performance across diverse data conditions.
- **Recurrent layers**: Capture local temporal patterns through LSTM-based processing.
- **Interpretable multi-head attention**: Learns long-term dependencies while providing attention weights that can be analyzed for interpretability.

TFT is classified as a **MixedCovariatesModel**, supporting past, future, and static covariates.

![Architecture of Temporal Fusion Transformer model (source: Lim et al., 2020)](../../202511_modeling/images/000_modelArchitecture/04_TFT_architecture.png){width=70%}

### Attention Mechanism and Self-Attention

The **attention mechanism** [@vaswani2023attentionneed] enables neural networks to focus on the most relevant parts of the input when generating each element of the output. **Self-attention** (or intra-attention) computes attention weights within a single sequence, capturing dependencies between all positions regardless of distance. The scaled dot-product attention is defined as:

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

where $Q$, $K$, and $V$ are the query, key, and value matrices, respectively, and $d_k$ is the dimensionality of the key vectors.

The **Transformer** architecture [@prince2023understanding] builds entirely on self-attention layers and has become the foundation for numerous state-of-the-art models in both natural language processing and time-series forecasting.

### Sentiment Analysis and Language Models

**Sentiment analysis** is the task of determining the emotional tone or opinion expressed in text. In financial applications, sentiment analysis is used to extract actionable signals from news articles, analyst reports, and social media.

**BERT** (Bidirectional Encoder Representations from Transformers) [@prince2023understanding] is a pre-trained language model that generates contextual word embeddings by attending to both left and right context simultaneously.

**paraphrase-multilingual-MiniLM-L12-v2** [@reimers-2019-sentence-bert] is a multilingual sentence transformer model based on MiniLM, fine-tuned for generating semantically meaningful sentence embeddings across 50+ languages including Thai. It is used in this study to generate content embeddings from Thai financial news articles. The model produces 384-dimensional vector representations of text, which are subsequently reduced to 12-dimensional features via PCA for use as past covariates in the forecasting model.

### Huber Loss Function

The **Huber Loss** is a robust loss function that combines the properties of MSE (Mean Squared Error) and MAE (Mean Absolute Error). It is defined as:

$$
L_\delta(y, \hat{y}) = \begin{cases}
\frac{1}{2}(y - \hat{y})^2 & \text{if } |y - \hat{y}| \leq \delta \\
\delta \cdot |y - \hat{y}| - \frac{1}{2}\delta^2 & \text{otherwise}
\end{cases}
$$

where $\delta$ (beta) controls the transition point between quadratic and linear behavior. A small $\delta$ value (e.g., $0.00001$) makes the loss function behave primarily as MAE, providing robustness to outliers. This study employed Huber Loss with $\delta = 0.00001$ as the training loss function for all models.

### Model Evaluation and Selection

**ML model selection** [@raschka2020modelevaluationmodelselection] refers to the systematic process of choosing the best-performing model from a set of candidates based on evaluation metrics and validation procedures. Common strategies include:

- **Cross-validation**: Repeated splitting of data into training and validation subsets to estimate generalization performance.
- **Rolling window validation**: A time-series-specific approach where the training window rolls forward in time, preserving the temporal ordering of data.
- **Grid search**: Exhaustive search over a predefined hyperparameter space.

This study combined rolling window cross-validation (4-fold) with grid search over multiple hyperparameters.

### Directional Accuracy Metrics

In addition to forecast error metrics (MAE, MSE, MAPE), stock price forecasting models can be evaluated using **directional accuracy metrics** that measure the model's ability to correctly predict the direction of price movement (up or down) [@gil2024evaluationdeeplearningmodels; @chaudhary2025advancedlstmstock]. These metrics are particularly relevant for trading applications, where the direction of price change is often more important than the magnitude of the forecast error. The key directional metrics include:

- **Accuracy**: The proportion of correctly predicted price movement directions out of all predictions.
- **Precision**: The proportion of true positive directional predictions (correctly predicted upward movements) among all positive predictions made by the model.
- **Recall**: The proportion of true positive directional predictions among all actual positive (upward) movements in the data.
- **F1-score**: The harmonic mean of Precision and Recall, providing a balanced measure that accounts for both false positives and false negatives.

These metrics complement traditional forecast error measures by capturing whether the model correctly identifies market trends, even when the predicted magnitude may differ from the actual price change.

## Related Concepts

### Challenges for Long-Horizon Forecasting

Forecasting stock prices beyond the immediate next day presents several challenges:

- **Volatility**: Stock prices exhibit high day-to-day variability, and prediction errors compound over longer horizons.
- **Regime changes**: Market conditions (bull, bear, sideways) can shift unpredictably, invalidating patterns learned from training data.
- **Computational complexity**: Longer forecast horizons require models that can capture both short-term fluctuations and long-term trends, often at significant computational cost.

N-HiTS [@challu2022nhitsneuralhierarchicalinterpolation] specifically addresses these challenges through its hierarchical interpolation and multi-rate data sampling techniques, enabling efficient multi-step forecasting without proportional increases in model complexity.

### Covariate Types in Time-Series Forecasting

Time-series forecasting models in the Darts framework distinguish between three types of covariates:

| Covariate Type | Description | Example |
|----------------|-------------|---------|
| **Past covariates** | Variables known only up to the current time step | Historical OHLV prices, SET index, news sentiment |
| **Future covariates** | Variables known in advance for the forecast horizon | Calendar features, scheduled events |
| **Static covariates** | Time-invariant attributes of the series | Sector classification, beta category |

Table: Types of covariates in time-series forecasting.

This study exclusively used **past covariates**, as the input features (stock prices, market index, and news data) are only available up to the point of prediction.

### Model Classification by Covariate Support

The Darts library classifies forecasting models by the types of covariates they accept:

| Model Category | Supported Covariates | Models |
|----------------|---------------------|--------|
| **PastCovariatesModel** | Past covariates only | N-BEATS, NHiTS, TCN |
| **DualCovariatesModel** | Past + future covariates | RNN (LSTM, GRU) |
| **MixedCovariatesModel** | Past + future + static covariates | TFT, TiDE |

Table: Model classification by covariate support in the Darts framework.

Since the study employed only past covariates, the PastCovariatesModel category (N-BEATS, NHiTS, TCN) was primarily used. TiDE, while classified as a MixedCovariatesModel, was also evaluated in the algorithm screening phase using past covariates only.

### Model Classification by Target Scope

Forecasting models can also be categorized by how they handle target variables:

| Category | Description |
|----------|-------------|
| **Univariate** | Single target variable (e.g., close price only) |
| **Univariate with covariates** | Single target variable with additional input features |
| **Multivariate** | Multiple target variables forecasted jointly |
| **Multivariate with covariates** | Multiple targets with additional input features |

Table: Model classification by target scope.

This study used a **univariate model with covariates**: the daily closing price was the sole target variable, while OHLV, SET index, and news features served as past covariates.

### Global vs. Local Models

| Model Type | Description | Use Case |
|------------|-------------|----------|
| **Local model** | One model trained per individual time series | When each series has unique dynamics |
| **Global model** | A single model trained on multiple time series simultaneously | When series share common patterns |

Table: Global vs. local model approaches.

In this study, a **local model** approach was adopted — a separate NHiTS model was trained for each individual stock ticker. This ensured that each model could capture the unique price dynamics of its respective stock.

## Related Literatures

### Thai Stock Market Forecasting Studies

Research on stock price forecasting in the Thai market has evolved from classical statistical models to deep learning approaches:

@wanida2021arimaxpolynomial developed hybrid ARIMAX-Polynomial models for forecasting AMATA and KBANK stock prices, incorporating macroeconomic indicators (business sentiment index, interest rates, inflation, financial indices) as exogenous variables. The study demonstrated that the hybrid approach could improve upon standalone ARIMAX predictions, as measured by RMSE.

@kanpiwan2021comparisonarimaann compared ARIMA, ANN, and hybrid ARIMA-ANN models for electronic sector stocks (SVI, DELTA, HANA) representing different beta values. The study found that hybrid models generally outperformed individual approaches, particularly for stocks with higher volatility.

@thanakrit2023lstmgru evaluated RNN, LSTM, and hybrid GRU-LSTM architectures for 30-day forward forecasting of selected SET50 stocks (ADVANC, BDMS, CPALL, MINT, SAWAD, DELTA). The hybrid GRU-LSTM model showed improved performance over standalone architectures for long-horizon prediction.

@pakapol2024deeplearningthai applied TCN to the top-10 market-capitalization stocks using a multi-stream approach: (1) historical stock prices with technical indicators, (2) financial statement data, and (3) financial news (processed via sentiment analysis and content embedding). The outputs of the three streams were averaged through a final perceptron layer. This study focused on next-day return prediction (short-term horizon) and measured performance using RMSE.

### International Benchmarks for Deep Learning Forecasting

@challu2022nhitsneuralhierarchicalinterpolation demonstrated that N-HiTS achieves significant improvements over N-BEATS and other baselines on standard long-horizon forecasting benchmarks (ETTh, ETTm, Weather, Traffic), with reductions in both prediction error and computational cost.

@das2024longtermforecastingtidetimeseries showed that TiDE, despite its simpler MLP-based architecture, matches or outperforms Transformer-based models (including TFT) on long-term forecasting tasks while being 5–10× faster to train and evaluate.

@gil2024evaluationdeeplearningmodels provided an evaluation framework for deep learning models in stock market trend prediction, emphasizing the importance of using both directional metrics (accuracy, precision, recall, F1) and regression metrics (MAE, RMSE) for comprehensive assessment.

### Deep Learning with Financial News

@oncharoen2018deeplearning proposed a deep learning framework using a risk-reward function (Sharpe ratio) for stock market prediction, demonstrating that CNN-based models can incorporate risk-adjusted performance into the training objective.

@pakapol2024deeplearningthai integrated financial news as a third input stream alongside price data and financial statements for Thai market prediction, using both sentiment and content embedding approaches — a methodology closely related to the present study's use of news covariates in Steps 5–6.

### CNN, RNN, and LSTM for Time-Series Applications

@gharehbaghi2023deeplearning provided a comprehensive treatment of deep learning architectures (CNN, RNN, LSTM) applied to time-series analysis, covering both theoretical foundations and practical applications in various domains including financial forecasting.

## Issues for Literature Review and Plan in This Study

### Issues Identified

Based on the review of existing literature, the following issues were identified:

1. **Limited application of SOTA architectures**: N-HiTS, TiDE, and TFT have not been systematically evaluated for Thai equity forecasting. Existing Thai market studies have focused on classical (ARIMA/ARIMAX) and early deep learning (LSTM/GRU/TCN) methods.

2. **Beta value inconsistency**: Prior studies often selected stocks by market capitalization alone, which may include low-beta stocks with limited price movement. This reduces the practical relevance of the forecasting results for active trading strategies.

3. **Medium-horizon gap**: Most Thai market studies focus on either next-day prediction (short-horizon) or 30-day forecasts (long-horizon). The 10-day (medium-horizon) window, which aligns with common portfolio rebalancing periods, remains underexplored.

4. **Limited integration of news data as covariates**: While @pakapol2024deeplearningthai incorporated financial news, the approach used a multi-stream averaging architecture. The effectiveness of directly integrating news features (sentiment scores and content embeddings via a multilingual sentence transformer) as **past covariates** within a single forecasting model has not been examined for the Thai market.

5. **Absence of portfolio simulation**: Prior studies evaluated model performance using prediction metrics only, without examining the practical impact of forecasting accuracy on investment outcomes through portfolio optimization or trading simulation.

### Plan to Address These Gaps

This study addresses the identified gaps through the following approach:

- **Model diversity**: Systematic screening of four deep learning architectures (TCN, N-BEATS, NHiTS, TiDE) under identical conditions, with NHiTS selected as the best-performing model.
- **Beta-stratified stock selection**: Stocks are selected to cover a range of beta values (low, medium, high, very high) using quartile-based classification of 2-year rolling beta, ensuring representativeness across volatility categories.
- **Medium-horizon focus**: A 10-day forecast horizon ($H = 10$) with a 30-day lookback window ($L = 30$) and multiplier $m = 3$ ($L = m \times H$), suitable for practical portfolio rebalancing.
- **Progressive covariate integration**: News features are integrated directly as past covariates in the NHiTS model using two methods: (1) scalar sentiment scores and (2) 12-dimensional content embeddings via paraphrase-multilingual-MiniLM-L12-v2 [@reimers-2019-sentence-bert] + PCA.
- **End-to-end evaluation**: Model performance is assessed not only through prediction and directional metrics but also through portfolio optimization simulation with transaction fees, providing a practical assessment of forecasting utility.

\newpage
