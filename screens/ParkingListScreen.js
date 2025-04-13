import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

const ParkingListScreen = ({ navigation }) => {
  const [parkings, setParkings] = useState([]);

  const fetchParkings = async () => {
    try {
      const q = query(collection(db, 'parkings'), orderBy('dateTime', 'desc'));
      const querySnapshot = await getDocs(q);
      const parkingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setParkings(parkingsData);
    } catch (error) {
      console.error('Error fetching parkings: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchParkings();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddParking')}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}> Add Parking</Text>
      </TouchableOpacity>
      
      {parkings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="local-parking" size={60} color="#FF69B4" />
          <Text style={styles.emptyText}>No parking records yet</Text>
        </View>
      ) : (
        <FlatList
          data={parkings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.item}
              onPress={() => navigation.navigate('ParkingDetail', { parkingId: item.id })}
            >
              <Text style={styles.itemDate}>
                {new Date(item.dateTime).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="#FF69B4" />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF0F5'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  emptyText: {
    fontSize: 18,
    color: '#FF69B4',
    marginTop: 20
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  itemDate: {
    fontSize: 16,
    color: '#FF1493',
    fontWeight: '500'
  }
});

export default ParkingListScreen;