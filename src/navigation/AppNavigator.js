import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AddSaeScreen from '../screens/AddSaeScreen';
import ClassementScreen from '../screens/ClassementScreen';
import HomeScreen from '../screens/HomeScreen';
import SaeDetailScreen from '../screens/SaeDetailScreen';
import SaeListScreen from '../screens/SaeListScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SaeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SaeList" component={SaeListScreen} options={{ title: 'Les SAé' }} />
      <Stack.Screen name="SaeDetail" component={SaeDetailScreen} options={{ title: 'Détail' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="SAé" component={SaeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Classement" component={ClassementScreen} />
      <Tab.Screen name="Ajouter" component={AddSaeScreen} />
    </Tab.Navigator>
  );
}