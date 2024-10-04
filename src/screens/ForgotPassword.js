import { useNavigation } from '@react-navigation/native';
import React , { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,ScrollView ,Alert} from 'react-native';
import TextRegular from '../components/atom/TextRegular';
import TextBold from '../components/atom/TextBold';
import colors from '../styles/colors';
import { STORAGE_KEYS } from '../storage/constant';
import { getData } from '../storage/storage';
import { BASE_URL,API_ENDPOINTS, AUTH_KEY,BASIC } from '../networking/constant';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'



const ForgetPasswordScreen = ({navigation,route}) => {
  const {SCREEN = ""} = route.params || {};
  const {FIELD_PARAM = ""} = route.params || {};
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

   
  useEffect(() => {

    const setEmailValue = async () => {
      try {
        console.log('SCREEN FORGOT :', SCREEN);
        console.log('SCREEN FORGOT :', FIELD_PARAM);
        if (SCREEN === STORAGE_KEYS.FROM_LOGIN) {
          //const userEmail = await getData(STORAGE_KEYS.USER_EMAIL);
          setEmail(FIELD_PARAM);
        }else{
        setEmail(FIELD_PARAM);
        }
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    // Call the async function immediately
    setEmailValue();
    // if(SCREEN == STORAGE_KEYS.FROM_LOGIN){
    //   setEmail(await getData(STORAGE_KEYS.USER_EMAIL))
    // }
  },[]);
  

  const handleSendOTP = async () => {
    // Validate inputs
    if (email === '' ) {
      Alert.alert('Validation Error', 'Email cannot be empty');
      return;
    }

    setLoading(true);
  const formData = new FormData();
formData.append('email', email);
      const url = `${BASE_URL}${API_ENDPOINTS.SEND_OTP}`;
     const headers = {
          'Basic': `${BASIC}`,
          'Auth-Key': `${AUTH_KEY}`,
          'Content-Type': 'multipart/form-data',
        };
axios.post(url, formData, {
  headers: headers,
})
.then(response => {
  setLoading(false);
  if (response.data.status === 200) {
      console.log(response.data)
    const OTP_ID = response.data.data.otp_id+""
          navigation.navigate('OTPVerification',{OTP_ID,SCREEN,FIELD_PARAM})
    } else {
      // Handle API error
      Alert.alert('Send OTP Failed', response.data.message || 'An error occurred. Please try again.');
    }
})
.catch(error => console.error('Error:', error));
  };
  return (
            <View style={styles.container}>
          <View style={styles.header}>
          <TouchableOpacity style={[styles.backArrow,{zIndex:1}]} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={25} color='#fff' />
        </TouchableOpacity>
            <Image
          source={require('../../assets/user-icon.png')}
          style={styles.profileIcon}
                />
              </View>
              <View style={styles.footer}>
                
        <TextRegular text="Mobile/Email" style={styles.textLabel}/>
                <TextInput
                  placeholder="Enter Your Mobile No. /Email Address"
          placeholderTextColor="#FFFFFF"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              <TouchableOpacity style={styles.button}  onPress={() => handleSendOTP()}>
          <Text style={styles.buttonText}>{loading ? 'SENDING OTP...' : 'SEND OTP'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} 
       onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            </View>
                  </View>
        );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseBackground,
  },
    header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  footer: {
    flex: 2,
    backgroundColor: colors.baseBackground,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textLabel: {
    color: '#000000',
    fontSize: 18,
    marginBottom: 10,
    
  },
  input: {
    backgroundColor: colors.accent,
    color:"#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 12,
  },
  button: {
    flex:1,
    width:'60%',
flexDirection:'row',
    backgroundColor: colors.background,
    borderRadius: 10,
alignItems: 'center',
    justifyContent:'center',
    marginTop:50,
    marginBottom: 10,
    marginLeft:'20%'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  backArrow: {
    position: 'absolute',
    top:5,
    left:10,
  },
});

export default ForgetPasswordScreen;
