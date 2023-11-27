import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from './src/config/Theme/theme'
import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import myStore from './src/redux/myStore'

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Provider store={myStore}>
      <Navigation/>
      </Provider>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})