import { StyleSheet, Text, View , Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from './src/config/Theme/theme'
import Navigation from './src/navigation/Navigation'
import { Provider } from 'react-redux'
import myStore from './src/redux/myStore'
import CircularIcon from './src/components/CircularIconButton'
import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Cart2 from './src/screens/Cart2'
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Svg, {
    Path
} from 'react-native-svg'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { NavigationContainer } from '@react-navigation/native'


const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ accessibilityLabel, accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: colors.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={colors.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: colors.white }}></View>
                </View>

                <Pressable
                    style={{
                        top: -22.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: colors.primary,
                        ...styles.shadow
                    }}
                    onPress={onPress}
                >
                    {children}
                </Pressable>
            </View>
        )
    } else {
        return (
            <Pressable
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: colors.white
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </Pressable>
        )
    }
}

const CustomTabBar = (props) => {
  if (isIphoneX()) {
      return (
          <View>
              <View
                  style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 30,
                      backgroundColor: colors.white
                  }}
              ></View>
              <BottomTabBar {...props.props} />
          </View>
      )
  } else {
      return (
          <BottomTabBar {...props.props} />
      )
  }
}

const App = () => {
  return (
    <View style={{flex: 1}}>
    <Provider store={myStore}>
    <NavigationContainer>
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            // backgroundColor: "transparent",
            borderTopColor: "transparent",
        }
    }}
    tabBar={(props) => (
        <CustomTabBar
            props={props}
        />
    )}
>
    <Tab.Screen
        name="Home"
        component={Home}
        options={{
            tabBarIcon: ({ focused }) => (
                <Image
                source={require('./src/assets/ImagePlaceHolder.png')}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? colors.white : colors.secondary
                    }}
                />
            ),
            tabBarButton: (props) => (
                <TabBarCustomButton
                    {...props}
                />
            )
        }}
    />
    <Tab.Screen
        name="Scan"
        component={Details}
        options={{
            tabBarIcon: ({ focused }) => (
                <Image
                    source={require('./src/assets/ImagePlaceHolder.png')}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? colors.white : colors.secondary
                    }}
                />
            ),
            tabBarButton: (props) => (
                <TabBarCustomButton
                    {...props}
                />
            )
        }}
    />
    <Tab.Screen
        name="User"
        component={Cart2}
        options={{
            tabBarIcon: ({ focused }) => (
                <Image
                source={require('./src/assets/ImagePlaceHolder.png')}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? colors.white : colors.secondary
                    }}
                />
            ),
            tabBarButton: (props) => (
                <TabBarCustomButton
                    {...props}
                />
            )
        }}
    />
</Tab.Navigator>
</NavigationContainer>
</Provider>
</View>
  )
}

export default App

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
}
})