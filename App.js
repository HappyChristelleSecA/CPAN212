import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ParkingListScreen from './screens/ParkingListScreen';
import AddParkingScreen from './screens/AddParkingScreen';
import ParkingDetailScreen from './screens/ParkingDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ParkingList">
        <Stack.Screen 
          name="ParkingList" 
          component={ParkingListScreen} 
          options={{ title: 'My Parking History' }}
        />
        <Stack.Screen 
          name="AddParking" 
          component={AddParkingScreen} 
          options={{ title: 'Add New Parking' }}
        />
        <Stack.Screen 
          name="ParkingDetail" 
          component={ParkingDetailScreen} 
          options={{ title: 'Parking Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}