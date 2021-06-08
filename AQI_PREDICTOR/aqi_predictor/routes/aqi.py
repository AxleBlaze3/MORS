from flask import Blueprint,render_template,url_for,redirect,current_app,request,make_response,jsonify
# import tensorflow as tf
# from tensorflow.keras.models import load_model
from bson import ObjectId
from aqi_predictor import mongo

aqi = Blueprint('aqi',__name__)

@aqi.route('/predict_aqi',methods=['POST'])
def predict_aqi():
    data = request.get_json()
    try:
        city = mongo.db.histdatas.find_one_or_404({"city_id": ObjectId(data["city_id"])})
    except:
        print("Something went wrong while fetching from database")
    
    # model = load_model("LSTM_10__200.h5")
    # sample_arr = [[212],
    #    [208],
    #    [192],
    #    [174],
    #    [184],
    #    [169],
    #    [175],
    #    [323],
    #    [242],
    #    [259]]
    # ans = model.predict(sample_arr[0])[:,0][0][0]
    

    # print(ans) 
    return data["city_id"]