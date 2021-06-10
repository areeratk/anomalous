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





## Interpretability and Predictability





## Data Visualization





## Webpages

The project webpages consist of three main pages:

- Home: Homepage provides an overview of the project, business objectives, summary, and approaches.
- Analysis: This tab consists of 4 pages, Trump Effects, WSB Effects, Powell Effects, and Full Model effects; including interactive graphs, short descriptive results and brief recommendations.
- NLP Data: This NLP data table tab consists of 3 pages, Trump Twitter Data (`trump_tweeters.csv`), WSB Reddit Data (`WSB_rd_count.csv`) , and Powell Speech Data (`powell_sp.csv`). wsb data are too big and partitioned to show only 125,000 entries. Material Design for Bootstrap was used for search and sort functionality of the data tables. 

Flask is deployed for framework of the webpage structure and JavaScript is deployed for functionality of webpage creation.

Heroku is deployed to host the website, Heroku URL: https://anomalous.herokuapp.com/.

## Conclusions





 