import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export const CourselItem = ({item}) => {
    console.warn("item5", item)
  return (
    <View style={styles.secondSlider}>
      <Image
        style={styles.sliderImg}
        source={item?.sliderImage}
        resizeMode='stretch'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  secondSlider: {
    flex: 1,
    width: '100%',
    height: 300,
    backgroundColor: '#F9F9FB',
    marginHorizontal: 5,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    marginLeft: -0,
  },

  sliderImg: {
    width: '100%',
    height: 300,
  },
});
