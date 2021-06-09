from flask import Blueprint,render_template,url_for,redirect,current_app,request,make_response,jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from bson import ObjectId
from aqi_predictor import mongo

aqi = Blueprint('aqi',__name__)

@aqi.route('/predict_aqi',methods=['POST'])
def predict_aqi():
    T = 10
    data = request.get_json()
    try:
        city = mongo.db.histdatas.find_one_or_404({"cityId": ObjectId(data["city_id"])})
        print(city)
    except Exception as inst:
        print(inst)
        return "Something went wrong while fetching from database"
    
    model = load_model("LSTM_10__200.h5")
    arr = city["data"]
    arr = np.array(arr)
    changed_arr = arr.copy()
    predictions = []
    print("Actual Array:",changed_arr,"\n")
    print("=============================","\n")
    for i in range(T):
        sample_arr = changed_arr.reshape(T,1)
        prediction = model.predict(sample_arr[0])[:,0][0][0]
        print("Predicted Value:",prediction,"\n")
        changed_arr = np.delete(changed_arr, 0)
        changed_arr = np.append(changed_arr, prediction)
        print("Changed Array:",changed_arr,"\n")
        predictions = np.append(predictions,prediction)

    predictions = np.append(arr[4:9],predictions)
    return jsonify(actual=arr.tolist(),predicted=predictions.tolist())
    # return "Hello"