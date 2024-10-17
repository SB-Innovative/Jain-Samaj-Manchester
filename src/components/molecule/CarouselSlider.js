// components/TextInputField.js
import React, { useState } from 'react';
import { View, StyleSheet,Dimensions,Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window');

const CarouselSlider = ({ label, value, editable,onChangeText, placeholder, keyboardType = 'default' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = [
    { image: require('../../../assets/menu_girl.png') },
    { image: require('../../../assets/home-banner2.png') },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.bannerContainer}>
        <Image source={item.image} style={styles.bannerImage} />
      </View>
    );
  };

  return (
    <Carousel
  
    data={banners}
    renderItem={renderItem}
    sliderWidth={screenWidth}
    itemWidth={screenWidth }
    onSnapToItem={(index) => setActiveIndex(index)}
    autoplay={true}
    loop={true}
  />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  bannerContainer: {
    height: 500,
    borderRadius: 8,
    overflow: 'hidden',
    borderRadius:10
  },
  bannerImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
});

export default CarouselSlider;
