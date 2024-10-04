import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextBold = ({ text, style }) => {
  return (
    <Text style={[styles.text, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24, // Adjust default font size as needed
    color: '#FFFFFF', // Adjust default color as needed
    fontFamily: 'OpenSansBold',
  },
});

export default TextBold;
