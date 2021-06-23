import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
  Text,
  StatusBar,
  View,
  ToastAndroid,
  ScrollView,
  Touchable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from 'react-native-line-chart';
import { Dimensions } from 'react-native';
import { api_url, flask_url } from "../constants/backend";
import axios from "axios";


const CityData = (props) => {

  const { navigation } = props;

  const data = navigation.getParam('data')

  const cityID = data['cityID'];
  const health = data['health'];
  const guide = data['guide'];

  let tableHead = ['Pollutants', 'Average', 'Min', 'Max'];


  const [obj, setObj] = useState(null)
  const [obj1, setObj1] = useState([])

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');


  today = dd + '/' + mm;


  const apiCall = async () => {

    let response
    let response1

    try {
      response = await axios.get(api_url + "onepollutant/" + cityID)
      setObj(response.data)
      //console.log(response.data)
      response1 = await axios.post(flask_url + "predict_aqi", { city_id: cityID })
      setObj1(response1.data["predicted"])
      //console.log(response1.data)


    } catch (err) {

      //return res.send(err)
      console.log(err);
    }
  }

  useEffect(() => {
    apiCall()
  }, []
  )

  //console.log(obj)

  if (!obj || obj1.length === 0) {
    return (
      <View style={styles.container}>
        {/* <Text>
          Please Wait...
        </Text> */}
        <ActivityIndicator
          size="large" color="#023c59" />
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: "#081422" }}>
      <LinearGradient colors={["#023c59", "#012a3e", "#081422"]}>

        <Text style={styles.textStyle1}>
          {obj.cityName}
        </Text>

        <Text style={styles.textStyle2}>
          23c
        </Text>

        <Table borderStyle={{ borderColor: 'transparent' }} style={{ marginTop: 40, paddingHorizontal: 10 }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.row}>
            <Cell data="CO" textStyle={styles.text} />
            <Cell data={obj["CO"][2]} textStyle={styles.text} />
            <Cell data={obj["CO"][1]} textStyle={styles.text} />
            <Cell data={obj["CO"][3]} textStyle={styles.text} />
          </TableWrapper>

          <TableWrapper style={styles.row}>
            <Cell data="NH3" textStyle={styles.text} />
            <Cell data={obj["NH3"][2]} textStyle={styles.text} />
            <Cell data={obj["NH3"][1]} textStyle={styles.text} />
            <Cell data={obj["NH3"][3]} textStyle={styles.text} />
          </TableWrapper>

          <TableWrapper style={styles.row}>
            <Cell data="PM2.5" textStyle={styles.text} />
            <Cell data={obj["PM25"][2]} textStyle={styles.text} />
            <Cell data={obj["PM25"][1]} textStyle={styles.text} />
            <Cell data={obj["PM25"][3]} textStyle={styles.text} />
          </TableWrapper>

          <TableWrapper style={styles.row}>
            <Cell data="PM10" textStyle={styles.text} />
            <Cell data={obj["PM10"][2]} textStyle={styles.text} />
            <Cell data={obj["PM10"][1]} textStyle={styles.text} />
            <Cell data={obj["PM10"][3]} textStyle={styles.text} />
          </TableWrapper>

          <TableWrapper style={styles.row}>
            <Cell data="NO2" textStyle={styles.text} />
            <Cell data={obj["NO2"][2]} textStyle={styles.text} />
            <Cell data={obj["NO2"][1]} textStyle={styles.text} />
            <Cell data={obj["NO2"][3]} textStyle={styles.text} />
          </TableWrapper>

          <TableWrapper style={styles.row}>
            <Cell data="SO2" textStyle={styles.text} />
            <Cell data={obj["SO2"][2]} textStyle={styles.text} />
            <Cell data={obj["SO2"][1]} textStyle={styles.text} />
            <Cell data={obj["SO2"][3]} textStyle={styles.text} />
          </TableWrapper>
        </Table>

        <Text style={{ marginTop: 30, color: "red", textAlign: "center", fontWeight: "bold" }}>
          Health Effect:
        </Text>

        <Text style={{ marginTop: 10, color: "white", textAlign: "center" }}>
          {health}
        </Text>

        <Text style={{ marginTop: 30, color: "#00BFFF", textAlign: "center", fontWeight: "bold" }}>
          Guidance Statement:
        </Text>

        <Text style={{ marginTop: 10, color: "white", textAlign: "center" }}>
          {guide}
        </Text>

        <Text style={{ marginTop: 40, color: "orange", textAlign: "center" }}>
          AQI Prediction for next 10 days
        </Text>
        <LineChart
          data={{
            labels: ['-4', '-3', '-2', '-1', today, "+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10"],
            datasets: [{
              data: obj1

            }]
          }}
          width={Dimensions.get('window').width - (Dimensions.get('window').width * 0.05)} // from react-native
          height={200}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            }
          }}
          bezier
          style={{
            marginVertical: 10,
            borderRadius: 16,
            paddingHorizontal: 11,
          }}
        />


      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  textStyle1: {
    paddingTop: 35,
    paddingHorizontal: 5,
    fontSize: 30,
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
  },

  textStyle2: {
    paddingHorizontal: 5,
    marginTop: -40,
    fontSize: 30,
    color: "white",
    textAlign: "right",
    fontWeight: "bold",
  },

  textStyle3: {
    paddingTop: 50,
    paddingHorizontal: 20,
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },

  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },

  head: {
    height: 40,
    backgroundColor: '#808B97'
  },

  text: {
    margin: 6
  },

  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1'
  },

});

export default CityData;
