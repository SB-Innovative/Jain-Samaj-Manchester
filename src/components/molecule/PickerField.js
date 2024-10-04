import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerField = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          color={"#000"}
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={onValueChange}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 1,
    backgroundColor:"#FFF",
    color: '#000',
    overflow: 'hidden',  // Ensures the border radius is applied properly
  },
  picker: {
    height: 50,  // Adjust the height as needed
    width: '100%',  // Adjust the width as needed
    color: '#000',
  },
});

export default PickerField;
