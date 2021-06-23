import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, actionOnRow } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { api_url } from "../constants/backend";

const Search = (props) => {
  const [filteredData, setFilteredData] = useState([])
  const [masterData, setmasterData] = useState([])
  const [search, setsearch] = useState('')

  useEffect(() => {
    fetchCityNames();
    return () => {

    }
  }, [])

  const fetchCityNames = () => {
    const apiURL = api_url + 'allaqis'
    fetch(apiURL)
      .then((res) => res.json())
      .then((responseJson) => {
        setFilteredData(responseJson)
        setmasterData(responseJson)
      }).catch((error) => {
        console.error(error)
      })
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.cityName ? item.cityName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setsearch(text);
    } else {
      setFilteredData(masterData)
      setsearch(text)
    }
  }

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CityData', { data: { cityID: item.cityId, health: item.healthEffects, guide: item.guidanceStatement } })}>
        <Text style={styles.itemStyle}>
          {item.cityName}
        </Text>
      </TouchableOpacity>
    )
  }

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#023c59", "#012a3e", "#081422"]}>
        <View style={{ backgroundColor: "transparent", height: "100%", marginTop: 37 }}>
          <TextInput
            style={styles.textInputStyle}
            value={search}
            placeholder="Search Here"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          />
          <FlatList
            data={filteredData}
            keyExtractor={(item, cityId) => cityId.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
    color: 'white',
    marginBottom: 10
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white'
  }
})

export default Search