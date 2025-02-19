import React, { useState } from 'react';
import { View,
   Text, 
   TextInput,
    Button,
     Alert 
    } 
    from 'react-native';

const QuantityInputScreen = ({ navigation }) => {
  const [quantity, setQuantity] = useState('');

  const handleNext = () => {
    const num = parseInt(quantity);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid Input', 'Enter a valid quantity.');
      return;
    }
    navigation.navigate('CalculationScreen', { quantity: num });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enter Product Quantity</Text>
      <TextInput
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        multiline={true} 
        numberOfLines={2} 
        style={{ width: '80%', height: 80, textAlignVertical: 'top' }} 
      />
      <Button title="Next" onPress={handleNext} disabled={!quantity} />
    </View>
  );
};

export default QuantityInputScreen;
