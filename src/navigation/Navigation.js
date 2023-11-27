import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Cart2 from '../screens/Cart2';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favourites from '../screens/Favourites';
import More from '../screens/More';
import Categories from '../screens/Categories';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="HomeScreen" component={Home} />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen name="Cart2" component={Cart2} />
  </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            let iconName;

            if (route.name === 'Home') {
              IconComponent = AntDesign;
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Categories') {
              IconComponent = Entypo;
              iconName = focused ? 'grid' : 'grid';
            } else if (route.name === 'Favourites') {
              IconComponent = AntDesign;
              iconName = focused ? 'heart' : 'hearto';
            } else if (route.name === 'More') {
              IconComponent = Entypo;
              iconName = focused ? 'dots-three-vertical' : 'dots-three-vertical';
            }

            return <IconComponent name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" options={{headerShown: false}} component={HomeStack} />
        <Tab.Screen name="Categories" component={Categories} />
        <Tab.Screen options={{headerShown: false}}  name="Favourites" component={Favourites} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
  </NavigationContainer>
  )
}

export default Navigation
