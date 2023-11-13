import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import DetailScreen from './screens/DetailScreen'
import Database from './Database'
import { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddScreen from './screens/AddScreen'
import HomeScreen from './screens/HomeScreen'
import EntryScreen from './screens/EntryScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  useEffect(() => {
    Database.initDatabase()
    console.log('Database initialized')
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelStyle: { fontSize: 20 },
        }}
      >
        <Tab.Screen name='Add' component={AddScreen} />
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Search' component={EntryScreen} />
        <Tab.Screen
          name='Detail'
          component={DetailScreen}
          options={{
            tabBarItemStyle: { display: 'none' },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
