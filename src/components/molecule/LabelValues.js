// components/TextInputField.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import TextRegular from '../atom/TextRegular';
import TextBold from '../atom/TextBold';

const LabelValues = ({ label,labelStyle,valueStyle, value, }) => {
  return (
    <View style={styles.container}>
      <TextBold text={label} style={labelStyle}/>
      <TextRegular text={value} style={valueStyle}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
});

export default LabelValues;
