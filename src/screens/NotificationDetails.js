import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ButtonCircular from '../components/atom/ButtonCircular';
import colors from '../styles/colors';
import LabelValues from '../components/molecule/LabelValues';
import Icon from 'react-native-vector-icons/Ionicons';
import TextBold from '../components/atom/TextBold';
import TextRegular from '../components/atom/TextRegular';
import CarouselSlider from '../components/molecule/CarouselSlider';

const NotificationDetails = ({ navigation, route }) => {
  const { ID, TITLE, DESCRIPTION } = route.params;
  console.log("Title : ", TITLE);

  const handleOk = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.backArrow, { zIndex: 1 }]} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={30} color='#fff' />
      </TouchableOpacity>
      <CarouselSlider/>
      <Text style={styles.title}>Jain Samaj Manchester Directory</Text>
      <View style={styles.subContainer}>
        <View style={styles.itemContainer}>
        <View style={styles.contentStyle}>
      <TextBold text={"Title : "} style={styles.textBold}/>
      <TextRegular text={TITLE}  style={styles.textRegular}/>
    </View>
    <View style={styles.contentStyle}>
      <TextBold text={"Message : "} style={styles.textBold}/>
      <TextRegular text={DESCRIPTION}  style={styles.textRegular}/>
    </View>
          {/* <LabelValues label={"Title : "} value={TITLE} labelStyle={styles.textBold} valueStyle={styles.textRegular} />
          <LabelValues label={"Message : "} value={DESCRIPTION} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> */}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonCircular
          text={'Back'}
          style={styles.buttonText}
          handleClick={handleOk}
          linearGradient={styles.linearGradient}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.baseBackground,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 180,
  },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    position: 'absolute',
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#F05D10',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    top: 195,
    left: 20,
    textAlign: 'center',
  },
  subContainer: {
    width: '100%',
    height: '67%',
    padding: 20,
  },
  textBold: {
    fontSize: 14,
    color: '#000000',
  },
  textRegular: {
    flex:1,
    fontSize: 14,
    color: '#000000',
  },
  itemContainer: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',  // Adjust to align text to the left
    flexDirection: 'column',  // Ensure the children are aligned vertically
    borderColor: colors.background,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  linearGradient: {
    width: '40%',
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  contentStyle: {
    flexDirection: 'row',
    marginTop:10
  },
});

export default NotificationDetails;
