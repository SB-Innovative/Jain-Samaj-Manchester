import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextRegular = ({ text, style }) => {
  return (
    <Text style={[styles.text, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18, // Adjust default font size as needed
    color: '#FFFFFF', // Adjust default color as needed
    fontFamily: 'OpenSansRegular',
    justifyContent: 'flex-start'
  },
});

export default TextRegular;