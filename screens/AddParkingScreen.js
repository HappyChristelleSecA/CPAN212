import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import * as Location from 'expo-location';

const AddParkingScreen = ({ navigation }) => {
  const [buildingCode, setBuildingCode] = useState('');
  const [hours, setHours] = useState('1');
  const [licensePlate, setLicensePlate] = useState('');
  const [location, setLocation] = useState(null);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        address: geocode[0]?.street + ', ' + geocode[0]?.city || 'Current Location'
      });
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get location');
    }
  };

  const handleAddParking = async () => {
    if (!buildingCode || !/^[A-Za-z0-9]{5}$/.test(buildingCode)) {
      Alert.alert('Invalid Building Code', 'Must be exactly 5 alphanumeric characters');
      return;
    }
    
    if (!licensePlate || licensePlate.length < 2 || licensePlate.length > 8) {
      Alert.alert('Invalid License Plate', 'Must be 2-8 alphanumeric characters');
      return;
    }
    
    if (!location) {
      Alert.alert('Location Required', 'Please set your parking location');
      return;
    }
    
    try {
      await addDoc(collection(db, 'parkings'), {
        buildingCode: buildingCode.toUpperCase(),
        hours,
        licensePlate: licensePlate.toUpperCase(),
        location,
        dateTime: new Date().toISOString()
      });
      
      Alert.alert('Success', 'Parking added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding parking: ', error);
      Alert.alert('Error', 'Failed to add parking');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Parking</Text>
      
      <Text style={styles.label}>Building Code</Text>
      <TextInput
        style={styles.input}
        value={buildingCode}
        onChangeText={setBuildingCode}
        maxLength={5}
        placeholder="A1B2C"
        placeholderTextColor="#FFB6C1"
      />

      <Text style={styles.label}>Parking Duration</Text>
      <View style={styles.durationContainer}>
        {['1 or less', '4', '12', '24'].map((hour) => (
          <TouchableOpacity
            key={hour}
            style={[styles.durationButton, hours === hour && styles.durationButtonSelected]}
            onPress={() => setHours(hour)}
          >
            <Text style={[styles.durationText, hours === hour && styles.durationTextSelected]}>
              {hour}-hour
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>License Plate</Text>
      <TextInput
        style={styles.input}
        value={licensePlate}
        onChangeText={setLicensePlate}
        maxLength={8}
        placeholder="ABC123"
        placeholderTextColor="#FFB6C1"
      />

      <Text style={styles.label}>Location</Text>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={getCurrentLocation}
      >
        <MaterialIcons name="location-on" size={24} color="#FF69B4" />
        <Text style={styles.locationButtonText}>
          {location ? location.address : 'Set Current Location'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleAddParking}
        disabled={!location}
      >
        <Text style={styles.submitButtonText}>Save Parking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF0F5'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 30,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    color: '#FF69B4',
    marginBottom: 10,
    fontWeight: '500'
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFB6C1',
    fontSize: 16,
    color: '#FF1493'
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  durationButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#FFE4E1',
    marginRight: 10,
    marginBottom: 10
  },
  durationButtonSelected: {
    backgroundColor: '#FF69B4'
  },
  durationText: {
    color: '#FF69B4',
    fontWeight: '500'
  },
  durationTextSelected: {
    color: 'white'
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFB6C1'
  },
  locationButtonText: {
    marginLeft: 10,
    color: '#FF1493',
    fontSize: 16
  },
  submitButton: {
    backgroundColor: '#FF69B4',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default AddParkingScreen;