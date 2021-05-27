import os
import json
import pandas as pd
import numpy as np
import pickle

from pandas.core.indexes.period import PeriodIndex

from sklearn.linear_model import LogisticRegression



from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


#################################################
# Database Setup
#################################################
wsb_lmkt_x = pd.read_csv(os.path.join("Data","wsb_lmkt_x.csv"))
wsb_lmkt_x.set_index("Date", inplace=True)

filename = 'wsb_lgcap_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

trump_tweeters = pd.read_csv(os.path.join("Data","trump_tweeters.csv"))

wsb_reddit0 = pd.read_csv(os.path.join("static","data","WSB_rd_count_0.csv"))
wsb_reddit1 = pd.read_csv(os.path.join("static","data","WSB_rd_count_1.csv"))
# wsb_reddit2 = pd.read_csv(os.path.join("static","data","WSB_rd_count_2.csv"))
# wsb_reddit3 = pd.read_csv(os.path.join("static","data","WSB_rd_count_3.csv"))
# wsb_reddit4 = pd.read_csv(os.path.join("static","data","WSB_rd_count_4.csv"))
# wsb_reddit5 = pd.read_csv(os.path.join("static","data","WSB_rd_count_5.csv"))

frames = [wsb_reddit0,wsb_reddit1]#,wsb_reddit2,wsb_reddit3,wsb_reddit4,wsb_reddit5]
wsb_reddit=pd.concat(frames)
del wsb_reddit0
del wsb_reddit1
# del wsb_reddit2
# del wsb_reddit3
# del wsb_reddit4
# del wsb_reddit5
import gc
gc.collect()


wsb_reddit = wsb_reddit.loc[(wsb_reddit['text'].notnull()) & (wsb_reddit['text'].str.len() > 10) ]
wsb_reddit =wsb_reddit.head(125000)

powell_speeches = pd.read_csv(os.path.join("Data","powell_sp.csv"))
powell_speeches = powell_speeches.loc[:, ["date", "text"]]


# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/data.sqlite"
# db = SQLAlchemy(app)

# reflect an existing database into a new model
# Base = automap_base()
# reflect the tables
# Base.prepare(db.engine, reflect=True)
# Base.prepare(db.engine, reflect=True)
# print("Echo out keyes")
# print(Base.classes.keys())
# # Save references to each table
# Tweets = Base.classes.tweets
# Retweets = Base.classes.retweets
# Phrases  = Base.classes.phrases
# Word_Counts = Base.classes.word_counts
# Sentiment = Base.classes.sentiment    
# print(Nmbr_Events)
# print(db.session.query(Nmbr_Events.STATE).all())

@app.route("/")
def index():
    print("This should print in the console")
    """Return the homepage."""
    return render_template("index.html")

@app.route("/header")
def header():
    return render_template("page_header.html")

@app.route("/search_results")
def search_results():
    return render_template("search_results.html")   

@app.route("/bubble_word")
def bubble_word():
    return render_template("bubble_word.html")

@app.route("/bubble_phrase_cnt")
def bubble_phrase_cnt():
    return render_template("bubble_phrase_cnt.html")  

@app.route("/market_impact")
def market_impact():
    return render_template("market_impact.html")   

@app.route("/twitter_data")
def twitter_data():
    return render_template("data.html") 

@app.route("/reddit_data")
def reddit_data():
    return render_template("wsbdata.html") 

@app.route("/speech_data")
def speech_data():
    return render_template("powelldata.html")     

@app.route("/sentiment")
def sentiment():
    return render_template("sentiment.html")

@app.route("/api/wsb/<date>")
def wsb(date):
    print(wsb_lmkt_x.loc[[date]])
    return wsb_lmkt_x.loc[[date]].to_json()    

@app.route("/ml/wsb/<date>")
def mlwsb(date):
    prediction = loaded_model.predict(wsb_lmkt_x.loc[[date]])
    prob = loaded_model.predict_proba(wsb_lmkt_x.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 


@app.route("/api/tweets/")
def tweets():
   
    all_results = []
    for (index, data) in trump_tweeters.dropna().iterrows():
        results_dict = {}
        if data['text']:
             results_dict["Text"] = data['text']
       

        results_dict["Date"] = data['date']
      
        results_dict["Favorites"] = data['favorites']
        
        all_results.append(results_dict)
    
    return jsonify(all_results)    

@app.route("/api/wsb/")
def reddit():
   
    all_results = []
    for (index, data) in wsb_reddit.dropna().iterrows():
        results_dict = {}
        if data['text']:
             results_dict["Text"] = data['text']
       

        results_dict["Date"] = data['date']
      
        results_dict["Favorites"] = data['favorites']
        
        all_results.append(results_dict)
    
    return jsonify(all_results) 

@app.route("/api/speech/")
def speech():
   
    all_results = []
    for (index, data) in powell_speeches.dropna().iterrows():
        results_dict = {}
        if data['text']:
             results_dict["Text"] = data['text']
       

        results_dict["Date"] = data['date']
      
            
        all_results.append(results_dict)
    
    return jsonify(all_results)   

# @app.route("/api/retweets/")
# def retweets():
#     sel = [Retweets.source, Retweets.text, Retweets.created_at, Retweets.retweet_count, Retweets.favorite_count, Retweets.id_str]
#     results = db.session.query(*sel).all()

#     all_results = []
#     for source, text, created_at, retweet_count, favorite_count, id_str in results:
#         results_dict = {}
#         results_dict["source"] = source
#         results_dict["text"] = text
#         results_dict["created_at"] = created_at
#         results_dict["retweet_count"] = retweet_count
#         results_dict["favorite_count"] = favorite_count
#         results_dict["id_str"] = id_str
#         all_results.append(results_dict)
    
#     return jsonify(all_results)    



# @app.route("/api/wordcnt/")
# def wordcnt():
#     sel = [Word_Counts.word, Word_Counts.cnt_word]
#     results = db.session.query(*sel).order_by(Word_Counts.cnt_word.desc()).limit(50)

#     all_results = []

#     for _word_, _cnt_word_ in results:
#         results_dict = {}
#         results_dict["word"] = _word_
#         results_dict["cnt_word"] = _cnt_word_
#         all_results.append(results_dict)
    
#     return jsonify(all_results)

# @app.route("/api/phrasecnt/")
# def phrasecnt():
#     sel = [Phrases.phrase_pkey, Phrases.phrase, Phrases.cnt_phrase]
#     results = db.session.query(*sel).order_by(Phrases.cnt_phrase.desc()).limit(50)


#     all_results = []
#     for phrase_pkey, phrase, cnt_phrase in results:
#         results_dict = {}
#         results_dict["phrase_pkey"] = phrase_pkey
#         results_dict["phrase"] = phrase
#         results_dict["cnt_phrase"] = cnt_phrase
#         all_results.append(results_dict)
    
#     return jsonify(all_results)


# @app.route("/api/searchtweets/<searchpattern>")
# def searchtweets(searchpattern):
#     # print(f'Search Pattern: {searchpattern}')


#     sel = [Tweets.source, Tweets.text, Tweets.created_at, Tweets.retweet_count, Tweets.favorite_count, Tweets.id_str]
#     s_str = f'%{searchpattern}%'
#     results = db.session.query(*sel).filter(Tweets.text.like(s_str)).all()

#     all_results = []
#     for source, text, created_at, retweet_count, favorite_count, id_str in results:
#         results_dict = {}
#         results_dict["source"] = source
#         results_dict["text"] = text
#         results_dict["created_at"] = created_at
#         results_dict["retweet_count"] = retweet_count
#         results_dict["favorite_count"] = favorite_count
#         results_dict["id_str"] = id_str
#         all_results.append(results_dict)
    
#     return jsonify(all_results)    


if __name__ == "__main__":
    app.run(debug=True)
