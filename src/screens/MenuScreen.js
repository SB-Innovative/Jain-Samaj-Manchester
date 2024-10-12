import React ,{useEffect, useState}from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity,ImageBackground ,Dimensions} from 'react-native';
import colors from '../styles/colors';
import { clear } from '../storage/storage';
import { BASE_URL,BASIC,API_ENDPOINTS,AUTH_KEY } from '../networking/constant';
import { getData } from '../storage/storage';
import axios from 'axios';
import { STORAGE_KEYS } from '../storage/constant';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
// import Carousel from 'react-native-snap-carousel';
const { width: screenWidth } = Dimensions.get('window');




const MenuScreen = ({navigation}) => {

  const [activeIndex, setActiveIndex] = useState(0);

  // const banners = [
  //   { url: 'https://via.placeholder.com/600x300?text=Banner+1' },
  //   { url: 'https://via.placeholder.com/600x300?text=Banner+2' },
  //   { url: 'https://via.placeholder.com/600x300?text=Banner+3' },
  //   { url: 'https://via.placeholder.com/600x300?text=Banner+4' },
  // ];

  const banners = [
    { image: require('../../assets/menu_girl.png') },
    { image: require('../../assets/menu_girl.png') },
    { image: require('../../assets/menu_girl.png') },
    { image: require('../../assets/menu_girl.png') },
  ];


  const fetchData = async () => {
   //setLoading(true);
    const formData = new FormData();
  formData.append('id', await getData(STORAGE_KEYS.USER_MEMBER_ID));
  const url = `${BASE_URL}${API_ENDPOINTS.VERIFY_MEMBER_STATUS}`;
  const headers = {
      'Basic': `${BASIC}`,
      'Auth-Key': `${AUTH_KEY}`,
      'Authorization': await getData(STORAGE_KEYS.USER_TOKEN),
      'Content-Type': 'multipart/form-data',
    };
  axios.post(url, formData, {
    headers: headers,
  })
  .then(response => {
   // setLoading(false);
    console.log(response.data)
    if (response.data.status === 200) {
      console.log(response.data.data)
      if(response.data.data.status != "1"){
        clear();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        );
      }
    }else{
      clear();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      );
    }
    })
  .catch(error => console.error('Error:', error));
  };
  useEffect(() => {
    fetchData();
   }, []);

   const renderItem = ({ item }) => {
    return (
      <View style={styles.bannerContainer}>
        <Image source={item.image} style={styles.bannerImage} />
      </View>
    );
  };


  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <ImageBackground
          source={require('../../assets/menu_bg.png')} 
          style={styles.imageBackground}
          resizeMode="cover" 
        >
    

        {/* <Image
          source={require('../../assets/menu_girl.png')} 
          style={styles.image}
        /> */}
        {/* <Carousel
        position={'absolute'}
        data={banners}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth }
        onSnapToItem={(index) => setActiveIndex(index)}
        autoplay={true}
        loop={true}
      /> */}
    
        <Text style={styles.title}>Jain Samaj Manchester Directory </Text>
      <TouchableOpacity onPress={() => navigation.navigate('List')} style={[styles.button, { marginTop: '100%' }]} >
      <View style={styles.iconContainer}>
          <Image
          source={require('../../assets/menu_doc.png')}
          style={styles.iconLong}
        />
        </View>
        <View flex={1} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} >
        <Text style={styles.buttonText}>Directory</Text>
        </View>
       
      </TouchableOpacity>
      
      <TouchableOpacity  onPress={() => navigation.navigate('MyFamilyList')}  style={styles.button}>
      <View style={styles.iconContainer}>
          <Image
          source={require('../../assets/heart.png')}
          style={styles.icon}
        />
        </View>
        <View flex={1} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>

        <Text style={styles.buttonText}>My Family</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Settings')}>
      <View style={styles.iconContainer}>
          <Image
          source={require('../../assets/menu_globe.png')}
          style={styles.iconSquare}
        />
        </View>
        <View flex={1} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
        <Text style={styles.buttonText}>Settings</Text>
        </View>
      </TouchableOpacity>
      </ImageBackground>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    width: '100%',
    height:'60%',
    backgroundColor:'white',

  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex:1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:'50%'
  },
  image: {
    width: '95%',
    height: '50%',
    marginTop:'50%', 
    marginBottom:60,
    marginHorizontal:'20%',
    borderRadius:10
    
  },
  button: {
    flexDirection:'row',
    width: '70%',
    height:60,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    elevation:5,
    marginBottom:'10%'
    
  },
  buttonText: {
    flexDirection:'row',
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent:'center',
    marginLeft:-40
  },
 
  iconContainer: {
    width: 45,
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 30,
    height: 25,
  },
  iconLong: {
    width: 25,
    height: 30,
  },
  iconSquare: {
    width: 30,
    height: 30,
  },
  backArrow: {
    position: 'absolute',
    top:10,
    left:10,
  },
  title: {
    position:'absolute',
    width:'88%',
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    color: 'white',
    fontSize:16,
    fontWeight: 'bold',
    backgroundColor: '#F05D10',
    borderRadius: 15,
    fontWeight: 'bold',
    paddingHorizontal:15,
    paddingVertical:10,
    top:'40%',
    left:20,
    right:20,
    textAlign: 'center' 
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
  bannerNewContainer:{
    flex:1,
    width: '95%',
    height: '50%',
    marginTop:'50%', 
    marginBottom:60,
    marginHorizontal:'20%',
    overflow: 'hidden',
    borderRadius:10

    
  }
});

export default MenuScreen;
