import os
import json
import pandas as pd
import numpy as np
import pickle

from pandas.core.indexes.period import PeriodIndex

from sklearn.linear_model import LogisticRegression 
from sklearn.ensemble import RandomForestClassifier



from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


#################################################
# Database Setup
#################################################
wsb_lmkt_x = pd.read_csv(os.path.join("Data","wsb_lmkt_x.csv"))
wsb_lmkt_x.set_index("date", inplace=True)
# 'LOAD MODELS'
filename = 'wsb_lgcap_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

filename2 = 'powell_lgcap_model.sav'
loaded_model2 = pickle.load(open(filename2, 'rb'))

filename3 = 'powell_mdcap_model.sav'
loaded_model3 = pickle.load(open(filename3, 'rb'))

filename4 = 'powell_smcap_model.sav'
loaded_model4 = pickle.load(open(filename4, 'rb'))

filename5 = 'trump_lgcap_model.sav'
loaded_model5 = pickle.load(open(filename5, 'rb'))

filename6 = 'trump_mdcap_model.sav'
loaded_model6 = pickle.load(open(filename6, 'rb'))

filename7 = 'trump_smcap_model.sav'
loaded_model7 = pickle.load(open(filename7, 'rb'))

filename8 = 'wsb_lgcap_model.sav'
loaded_model8 = pickle.load(open(filename8, 'rb'))

filename9 = 'wsb_mdcap_model.sav'
loaded_model9 = pickle.load(open(filename9, 'rb'))  

filename10 = 'wsb_smcap_model.sav'
loaded_model10 = pickle.load(open(filename10, 'rb'))


# LOAD DATAFRAMES

trump_tweeters = pd.read_csv(os.path.join("Data","trump_tweeters.csv"))

wsb_reddit0 = pd.read_csv(os.path.join("static","data","WSB_rd_count_0.csv"))
wsb_reddit1 = pd.read_csv(os.path.join("static","data","WSB_rd_count_1.csv"))
wsb_reddit2 = pd.read_csv(os.path.join("static","data","WSB_rd_count_2.csv"))
# wsb_reddit3 = pd.read_csv(os.path.join("static","data","WSB_rd_count_3.csv"))
# wsb_reddit4 = pd.read_csv(os.path.join("static","data","WSB_rd_count_4.csv"))
# wsb_reddit5 = pd.read_csv(os.path.join("static","data","WSB_rd_count_5.csv"))


powell =  pd.read_csv(os.path.join("static","data","powell_lmkt_x.csv"))
powell2 =  pd.read_csv(os.path.join("static","data","powell_mmkt_x.csv"))
powell3 =  pd.read_csv(os.path.join("static","data","powell_smkt_x.csv"))


powell.set_index("date",inplace=True)
powell2.set_index("date",inplace=True)
powell3.set_index("date",inplace=True)

trump =  pd.read_csv(os.path.join("static","data","trump_lmkt_x.csv"))
trump2 =  pd.read_csv(os.path.join("static","data","trump_mmkt_x.csv"))
trump3 =  pd.read_csv(os.path.join("static","data","trump_smkt_x.csv"))


trump.set_index("date",inplace=True)
trump2.set_index("date",inplace=True)
trump3.set_index("date",inplace=True)

wsb =  pd.read_csv(os.path.join("static","data","wsb_lmkt_x.csv"))
wsb2 =  pd.read_csv(os.path.join("static","data","wsb_mmkt_x.csv"))
wsb3 =  pd.read_csv(os.path.join("static","data","wsb_smkt_x.csv"))


wsb.set_index("date",inplace=True)
wsb2.set_index("date",inplace=True)
wsb3.set_index("date",inplace=True)

frames = [wsb_reddit0,wsb_reddit1]#,wsb_reddit2,wsb_reddit3,wsb_reddit4,wsb_reddit5]
wsb_reddit=pd.concat(frames)
del wsb_reddit0
del wsb_reddit1
del wsb_reddit2
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

@app.route("/Trump_Effects")
def bubble_word():
    return render_template("Trump_Effects.html")

@app.route("/bubble_phrase_cnt")
def bubble_phrase_cnt():
    return render_template("bubble_phrase_cnt.html")  

@app.route("/wsb_effects")
def market_impact():
    return render_template("wsb_effects.html")   

@app.route("/twitter_data")
def twitter_data():
    return render_template("data.html") 

@app.route("/reddit_data")
def reddit_data():
    return render_template("wsbdata.html") 

@app.route("/speech_data")
def speech_data():
    return render_template("powelldata.html")     

@app.route("/powell_effects")
def sentiment():
    return render_template("powell_effects.html")

@app.route("/api/wsb/<date>")
def wsb(date):
    print(wsb_lmkt_x.loc[[date]])
    return wsb_lmkt_x.loc[[date]].to_json()    

@app.route("/ml/wsb/<date>")
def mlwsbd(date):
    prediction = loaded_model.predict(wsb_lmkt_x.loc[[date]])
    prob = loaded_model.predict_proba(wsb_lmkt_x.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 

@app.route("/ml/pow/<date>")
def mlpow(date):
    prediction = loaded_model2.predict(powell.loc[[date]])
    prob = loaded_model2.predict_proba(powell.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 


@app.route("/ml/pow_mid/<date>")
def mlpowmid(date):
    prediction = loaded_model3.predict(powell2.loc[[date]])
    prob = loaded_model3.predict_proba(powell2.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 


@app.route("/ml/pow_small/<date>")
def mlpowsmall(date):
    prediction = loaded_model4.predict(powell3.loc[[date]])
    prob = loaded_model4.predict_proba(powell3.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 



@app.route("/ml/trump/<date>")
def mltrump(date):
    prediction = loaded_model5.predict(trump.loc[[date]])
    prob = loaded_model5.predict_proba(trump.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 


@app.route("/ml/trump_mid/<date>")
def mltrummid(date):
    prediction = loaded_model6.predict(trump2.loc[[date]])
    prob = loaded_model6.predict_proba(trump2.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 


@app.route("/ml/trump_small/<date>")
def mltrumpsmall(date):
    prediction = loaded_model7.predict(trump3.loc[[date]])
    prob = loaded_model7.predict_proba(trump3.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 

@app.route("/ml/wsb/<date>")
def mlwsb(date):
    prediction = loaded_model8.predict(wsb.loc[[date]])
    prob = loaded_model8.predict_proba(wsb.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 


@app.route("/ml/wsb_mid/<date>")
def mlwsbmid(date):
    prediction = loaded_model9.predict(wsb2.loc[[date]])
    prob = loaded_model9.predict_proba(wsb2.loc[[date]])
    mydict = {}
    mydict['predict'] = float(prediction[0])
    mydict['probneg']=float(prob[0][0])
    mydict['probpos']=float(prob[0][1])
    return  jsonify  (mydict) 


@app.route("/ml/wsb_small/<date>")
def mlwsbsmall(date):
    prediction = loaded_model10.predict(wsb3.loc[[date]])
    prob = loaded_model10.predict_proba(wsb3.loc[[date]])
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


if __name__ == "__main__":
    app.run(debug=True)
