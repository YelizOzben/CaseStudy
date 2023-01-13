import * as React from 'react';
import Home from '../Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const options = {
    headerShown: false,
  };

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'information-circle'
            } else if (route.name === 'KEŞFET') {
              iconName = 'compass';
            } else if (route.name === 'DAHA CÜZDAN') {
              iconName = 'star';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { borderTopRightRadius: 20, borderTopLeftRadius: 20, height:60 }
        })}
      >
        <Tab.Screen
          name="KEŞFET"
          component={Home}
          options={{
            ...options,
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            ...options,
          }}
        />
        <Tab.Screen
          name="DAHA CÜZDAN"
          component={Home}
          options={{
            ...options,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
