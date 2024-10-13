import {View, Image, StyleSheet} from 'react-native'

const SliderImgae = ({ item }) => {
  return (
    <View style={styles.bannerContainer}>
      <Image source={item} style={styles.bannerImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
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

export default SliderImgae;