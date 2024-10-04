import React from 'react';
import { Text, StyleSheet,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonCircular = ({ text, style, handleClick,linearGradient }) => {
  return (
    <LinearGradient
    colors={['#874268','#7C3D5F','#723858', '#6B3552','#683351','#5F2F4A','#552A42', '#4C263B']}
    style={[styles.linearGradient,linearGradient]}
    start={{ x: 1, y: 0 }} // Start of the gradient
    end={{ x: 0, y: 0 }} // End of the gradient (left to right)
  >
     <TouchableOpacity style={styles.button} onPress={handleClick}>
     <Text style={[styles.buttonText, style]}>{text}</Text>
   </TouchableOpacity>
   </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    width:'100%',
    // backgroundColor: '#FF6600',
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24, // Adjust default font size as needed
    color: '#FFFFFF', // Adjust default color as needed
    fontFamily: 'OpenSansBold',
  },
  linearGradient: {
    width:'30%',
    // backgroundColor: '#FF6600',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonCircular;