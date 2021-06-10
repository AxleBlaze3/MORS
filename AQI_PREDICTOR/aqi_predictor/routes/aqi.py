from flask import Blueprint,render_template,url_for,redirect,current_app,request,make_response,jsonify
from werkzeug.wrappers import response
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
    print(os.environ.get('MONGO_URI') )
    try:
        city = mongo.db.histdatas.find_one_or_404({"cityId": ObjectId(data["city_id"])})
        print(city)
    except Exception as ex:
        print(ex)
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

    predictions = np.append(arr[5:10],predictions)
    return jsonify(actual=arr.tolist(),predicted=predictions.tolist())


@aqi.route('/change_aqi',methods=['PATCH'])
def change_aqi():
    cityids = []
    try:
        cities = mongo.db.cityinfos
        
        for city in cities.find():
            # print(city.id)
            cityids.append(city["_id"])
    except Exception as ex:
        print(ex)
        return "Something went wrong while fetching cities from database"
    
    i=1
    for id in cityids:
        try:
            city = mongo.db.histdatas1.find_one({"cityId":id})
            if city:
                data = city["data"]
                print("Old Value",data)
                new_val = 100
                data.pop(0)
                data.append(new_val)
                print("New value",data)
                mongo.db.histdatas1.update_one(
                        {"cityId":id},
                        {"$set":{"data":data}}
                )

        except Exception as ex:
            print(ex)
            return "Something went wrong while updating cities in database"

    return "Updated"
