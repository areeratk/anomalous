#### **Anomalous, Is it?**

## Exploring Influencers’ Remark Effects on the US Financial Market

This project explores whether influencers’ remarks affect the financial market.  With an estimated 70 billion dollars of investment lost in the Reddit WallStreetBets and GameStop incident, non-fundamental factors have gained more attention. Hedge fund managers, financial investment professionals, retail investors, and mutual fund managers, are among those who may seek these potentials to outperform the market an/or reduce investment risks.

Selected influencers’ remarks include Trump’s tweets, WallStreetBets Reddit, and Jerome Powell’s speeches.

Economic and financial keywords are extracted from their messages and counted by their posting dates from January 1, 2016, to April 2021. Market movements in relation to the keyword frequencies, sentiments, and changes in economic indicators on news release dates are explored. Interpretability and predictability of these relations are elucidated using machine learning methods.

Results suggest that the financial market maintain its efficiency. The methods may be modified for exploring non-fundamental effects on returns on investment portfolios to add weight of these effects to their fundamental investment metrics.



## Data

Labels: % change of daily stock prices of stock market using the prices from the ETF SPY to represent large-cap stocks, ETF MDY mid-cap stocks, and ETF IJR small-cap stocks.  The data are from Alpha Vantage via api called, and saved separately in `stock_ijr.csv`, `stock_mdy.csv`, and `stock_spy.csv` ; see `stocks.ipynb` for details.

Features: 

Fundamental factors include % change in monthly employment situations from U.S. Bureau of Labor Statistics, `empsit.csv`; and % change in monthly estimates of quarterly Real GDP from U.S. Bureau of Economic Analysis, `RGDP.csv`.

Non-fundamental factors include economic and financial keyword frequencies, positive sentiment count, negative sentiment count, sentiment count (positive - negative sentiment), and favorite count; collected in three separate sets from Trump Tweets, Wall Street Bets (WSB) Reddit, and Jerome Powell's Speeches.

Trump Tweets data prior to 01-08-2021 are available in `trump_01-08-2021.csv`, downloaded from Trump’s twitter archive, https://www.thetrumparchive.com/; and vertically joined with data on or after 01-08-2021 via an api call from the Gab website, https://gab.com/realdonaldtrump. After data cleaning; a data frame with columns "text", "date", and "favorite" data was saved in `trump_tweeters.csv` to be used for web display and machine learning analysis.  See `trump_tweets.ipynb`.

WSB Reddit data was from `api` calls in three batches. After data cleaning; data frames with columns "text", "date", and "favorite" data were saved in csv files. See `WSB_rd1.ipynb`, `WSB_rd2.ipynb`, and `WSB_rd3.ipynb` for details.  The three data frames were vertically joined and saved in `WSB_rd_count.csv` to be used for web display and machine learning analysis.  See `wsb_rd.ipynb`.    

Powell Speeches data were scraped using `BeautifulSoup` from 3 html files saved from https://www.federalreserve.gov/newsevents/speeches.htm.  After data cleaning; a data frame with columns "text", and "date" was saved in `powell_sp.csv` to be used for web display and machine learning analysis.  See `powell_speeches.ipynb`.

Natural language processing (NLP), using `Count Vectorizer`, transformed "text" in `trump_tweets.ipynb`, `wsb_rd.ipynb`, and `powell_speeches.ipynb` to quantitative counts in columns include economic and financial keyword frequencies, positive sentiment count, negative sentiment count, and sentiment count (positive - negative sentiment).  Count Vectorizer also built Economic and finance keywords from top 100 most used single or phrase words and adjusted by removing some common words and adding words from economic indicators.  Financial sentiment keywords were from Loughran and McDonald Sentiment Word Lists (https://sraf.nd.edu/textual-analysis/resources/).

Data for features are saved in various csv files as shown in the table below.

|                 | Count (keywords)       | Pos_Count (positive sentiment)  | Neg_Count (negative sentiment)  | Sent_Count (positive -negative sentiment) | Favorites             |
| --------------- | ---------------------- | ------------------------------- | ------------------------------- | ----------------------------------------- | --------------------- |
| Trump_Tweets    | trump_daydf_count.csv  | trump_sentbydayposdf_count.csv  | trump_sentbydaynegdf_count.csv  | trump_sentbydaydf_count.csv               | trump_favd_count.csv  |
| WSB_Reddit      | wsb_daydf_count.csv    | wsb_sentbydayposdf_count.csv    | wsb_sentbydaynegdf_count.csv    | wsb_sentbydaydf_count.csv                 | wsb_favd_count.csv    |
| Powell_Speeches | powell_daydf_count.csv | powell_sentbydayposdf_count.csv | powell_sentbydaynegdf_count.csv | powell_sentbydaydf_count.csv              | powell_favd_count.csv |



## Predictive Models

1. `RandomForestRegression` and `RidgeRegression` first explore direct relationships of the features and labels -- percentage changes of stock prices based on their capital sizes.  The models show no signal.

2. The labels then classify binary directions of positive or negative changes in daily stock prices.  `RandomForestClassifier` and `RidgeClassifier` explore and predict probabilities of the market movement directions.  Final models are saved in `.sav` files for building interactive predicting models.  See corresponding notebooks and `.sav` files below.

   |                | Large-Cap Models         | Mid-cap Models           | Small-cap Models         |
   | -------------- | ------------------------ | ------------------------ | ------------------------ |
   | Trump_Effects  | `trump_m1.ipynb`         | `trump_m2.ipynb`         | `trump_m3.ipynb`         |
   |                | `trump_lgcap_model.sav`  | `trump_mdcap_model.sav`  | `trump_smcap_model.sav`  |
   | WSB_Effects    | `wsb-rd_m1.ipynb`        | `wsb-rd_m2.ipynb`        | `wsb-rd_m3.ipynb`        |
   |                | `wsb_lgcap.model.sav`    | `wsb_mdcap.model.sav`    | `wsb_smcap.model.sav`    |
   | Powell_Effects | `powell_m1.ipynb`        | `powell_m2.ipynb`        | `powell_m3.ipynb`        |
   |                | `powell_lgcap_model.sav` | `powell_mdcap_model.sav` | `powell_lgcap_model.sav` |

   `RandomForestClassifier` performs slightly better in most models.  Accuracy scores are also quite close.  For quick probability estimates and visualization purposes, `RandomForest Classifier` performs all final models.  Readers, interested in model predictions, may consider `RidgeClassifier` to run some models as well. 

## Interpretability and Predictability



|                | Large-cap Model                                              | Mid-cap Model                                                | Small_cap Model                                              |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Trump_Effects  | `roc_auc_score` = 0.562                                      | `roc_auc_score` = 0.571                                      | `roc_auc_score` = 0.579                                      |
|                | There is a signaling lag in the features influencing these predictions.  Positive-negative sentiment and favorites are quite strong across the Trump_Effects models. | There is no signaling lag in the features influencing these predictions. Fundamental and nonfundamental features alike are considered. | Similar to the small_cap powell_effect model The signal seems to come solely from the positive-negative sentiment and favorites. |
| WSB_Effects    | `roc_auc_score` = 0.542                                      | `roc_auc_score` = 0.560                                      | `roc_auc_score` = 0.560                                      |
|                | There is a signaling lag in the features influencing these predictions. Classification report show | RandomForestClassifier  provides balance estimates of the binary prediction. | Similar results to the wsb mid-cap model.                    |
| Powell_Effects | `roc_auc_score` = 0.75                                       | `roc_auc_score` = 0.667                                      | `roc_auc_score` = 0.625                                      |
|                | There is a signaling lag in the features influencing these predictions.  Positive and negative sentiment are quite strong.  Fundamental factors have less effects. | There is no signaling lag in the features influencing these predictions. Fundamental and nonfundamental features alike are considered. | The signal seems to come solely from positive-negative sentiment after observing feature importance.  The roc_auc_score, however is inconsistent. |



## Data Visualization

Plotly reconstructs .sav files and all other generated in each model to display interactive line   graphs for data of the specific models.  Readers may zoom or create a block of time period of their interest to compare and explore the features data along side the stock data.  Readers may also explore interactive predicting models to indicate the probability of the direction of daily changes, including the models' ROC curve, PPS heatmap and and confusion matrix.  These interactive visualizations are available on the Analysis tab on the website explained below.  



## Webpages

The project webpages consist of three main pages:

- Home: Homepage provides an overview of the project, business objectives, summary, and approaches.
- Analysis: This tab consists of 4 pages, Trump Effects, WSB Effects, Powell Effects, and Full Model effects; including interactive graphs, short descriptive results and brief recommendations.
- NLP Data: This NLP data table tab consists of 3 pages, Trump Twitter Data (`trump_tweeters.csv`), WSB Reddit Data (`WSB_rd_count.csv`) , and Powell Speech Data (`powell_sp.csv`). wsb data are too big and partitioned to show only 125,000 entries. Material Design for Bootstrap was used for search and sort functionality of the data tables. 

Flask is deployed for framework of the webpage structure and JavaScript is deployed for functionality of webpage creation.

Heroku is deployed to host the website, Heroku URL: https://anomalous.herokuapp.com/.



## Conclusions

It might be good news that the models have low `roc_auc_scores` as it may indicate that the market is efficient and unlikely be tampered by influences. Given smaller amount of Powell Speeches in the models comparing to WSB Reddit and Trump Tweets, it is notable that the Powell's models perform best among the three influencers, though the small-cap model may need further investigation to find out whether it is overfitting since the results are inconsistent. Given new tools in data science, all sentiment counts maybe improved through deep learning; e.g., calculating weight of the impacts that an influencer has so that it may be used as a parameter in making predictions.  This project may be adapted to the firm level.

 

