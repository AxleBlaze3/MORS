import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, Image } from 'react-native';
import MapView, { Callout, PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { api_url } from "../constants/backend";

const Height = Dimensions.get('window');

const customData = require('../../assets/data(1).json');

var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]

const colors = ["green", "#FFFF00", "orange", "red", "#52307c", "black"]

const Map = (props) => {
  // this.state = {
  //     markers: customData.Data
  // } 

  const [markers_arr, set_markers_arr] = useState([])

  const apiCall = () => {
    fetch(api_url + "allaqis", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      return res.json()
    }).then((res) => {
      set_markers_arr(res)
    }).catch((err) => {
      console.log(err)
    });
  }

  useEffect(() => {
    apiCall()
  }, []
  )
  return (
    <View style={styles.main}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        loadingEnabled={true}
        region={{
          latitude: 18.5937,
          longitude: 80.9629,
          latitudeDelta: 29.2,
          longitudeDelta: 26
        }}>
        {markers_arr.map(marker => (
          <Marker pinColor={colors[marker.aqi]}
            key={marker.cityId}
            coordinate={{
              latitude: parseFloat(marker.cityLat),
              longitude: parseFloat(marker.cityLng),
            }}>
            <Callout onPress={() => {
              props.navigation.navigate('CityData', { data: { health: marker.healthEffects, cityID: marker.cityId, guide: marker.guidanceStatement } })
            }}>
              <Text style={styles.name}>{marker.cityName}</Text>
              <Text style={styles.description}>{marker.aqiVal}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.search}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Search")}>
          <Image source={require("../../assets/search_icon.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.legend}>
        <Text style={{ color: "black", fontWeight: "bold" }}>Very Good <View style={{ ...styles.circle, backgroundColor: "green" }} /></Text>
        <Text style={{ color: "black", fontWeight: "bold" }}>Good <View style={{ ...styles.circle, backgroundColor: "#FFFF00" }} /></Text>
        <Text style={{ color: "black", fontWeight: "bold" }}>Average <View style={{ ...styles.circle, backgroundColor: "orange" }} /></Text>
        <Text style={{ color: "black", fontWeight: "bold" }}>Poor <View style={{ ...styles.circle, backgroundColor: "red" }} /></Text>
        <Text style={{ color: "black", fontWeight: "bold" }}>Very Poor <View style={{ ...styles.circle, backgroundColor: "#52307c" }} /></Text>
        <Text style={{ color: "black", fontWeight: "bold" }}>Extremely Poor <View style={{ ...styles.circle, backgroundColor: "black" }} /></Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  map: {
    height: Height.height,
    width: Height.width,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 1,
    borderColor: '#ccc',
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    width: 150,
    paddingTop: 5
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  description: {
    marginTop: 8,
  },
  search: {
    position: 'absolute',//use absolute position to show button on top of the map
    alignSelf: 'flex-end', //for align to right
    paddingRight: 10,
    paddingTop: 5
  },
  legend: {
    position: 'absolute',//use absolute position to show button on top of the map
    //alignSelf: 'baseline', //for align to right
    bottom: 15,
    right: 10,
    padding: 10,
    backgroundColor: "#89CFF0"
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginHorizontal: 15

  }
})

export default Map;