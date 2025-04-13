import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const ParkingDetailScreen = ({ route, navigation }) => {
  const { parkingId } = route.params;
  const [parking, setParking] = useState(null);
  const [buildingCode, setBuildingCode] = useState('');
  const [hours, setHours] = useState('1');
  const [licensePlate, setLicensePlate] = useState('');

  useEffect(() => {
    const fetchParking = async () => {
      try {
        const docRef = doc(db, 'parkings', parkingId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setParking(data);
          setBuildingCode(data.buildingCode);
          setHours(data.hours);
          setLicensePlate(data.licensePlate);
        } else {
          Alert.alert('Error', 'Parking record not found');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error fetching parking: ', error);
        Alert.alert('Error', 'Failed to load parking details');
        navigation.goBack();
      }
    };

    fetchParking();
  }, [parkingId]);

  const handleUpdate = async () => {
    if (!buildingCode || !/^[A-Za-z0-9]{5}$/.test(buildingCode)) {
      Alert.alert('Invalid Building Code', 'Must be exactly 5 alphanumeric characters');
      return;
    }
    
    if (!licensePlate || licensePlate.length < 2 || licensePlate.length > 8) {
      Alert.alert('Invalid License Plate', 'Must be 2-8 alphanumeric characters');
      return;
    }
    
    try {
      await updateDoc(doc(db, 'parkings', parkingId), {
        buildingCode: buildingCode.toUpperCase(),
        hours,
        licensePlate: licensePlate.toUpperCase()
      });
      
      Alert.alert('Success', 'Parking updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating parking: ', error);
      Alert.alert('Error', 'Failed to update parking');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'parkings', parkingId));
      Alert.alert('Success', 'Parking deleted successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting parking: ', error);
      Alert.alert('Error', 'Failed to delete parking');
    }
  };

  if (!parking) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="directions-car" size={50} color="#FF69B4" />
        <Text style={styles.loadingText}>Loading parking details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="local-parking" size={30} color="#FF69B4" />
        <Text style={styles.headerText}>Parking Details</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date & Time</Text>
        <Text style={styles.sectionValue}>
          {new Date(parking.dateTime).toLocaleDateString()} at {new Date(parking.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Building Code</Text>
        <TextInput
          style={styles.input}
          value={buildingCode}
          onChangeText={setBuildingCode}
          maxLength={5}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parking Duration</Text>
        <View style={styles.durationContainer}>
          {['1', '4', '12', '24'].map((hour) => (
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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>License Plate</Text>
        <TextInput
          style={styles.input}
          value={licensePlate}
          onChangeText={setLicensePlate}
          maxLength={8}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.sectionValue}>{parking.location.address}</Text>
        <Text style={styles.coordinates}>
          Latitude: {parking.location.lat.toFixed(4)}, Longitude: {parking.location.lng.toFixed(4)}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>Update Parking Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete Parking Info</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF0F5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F5'
  },
  loadingText: {
    marginTop: 20,
    color: '#FF69B4',
    fontSize: 18
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    marginLeft: 10
  },
  section: {
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FF69B4',
    marginBottom: 10,
    fontWeight: '500'
  },
  sectionValue: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    color: '#FF1493',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFB6C1'
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    color: '#FF1493',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFB6C1'
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  coordinates: {
    color: '#FFB6C1',
    fontSize: 14,
    marginTop: 5
  },
  buttonContainer: {
    marginTop: 20
  },
  updateButton: {
    backgroundColor: '#FF1493',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  deleteButton: {
    backgroundColor: '#FF1493',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default ParkingDetailScreen;