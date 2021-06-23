import React from 'react'
import { Text, StatusBar } from 'react-native'

const DataScreen = () => {
    return <Text style={{paddingTop: StatusBar.currentHeight + 20, fontSize: 30, textAlign: 'center', fontWeight: 'bold'}}>Data</Text>
}

export default DataScreen