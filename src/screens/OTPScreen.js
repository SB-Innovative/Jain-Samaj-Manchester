import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL, API_ENDPOINTS, BASIC, AUTH_KEY } from '../networking/constant';
import { STORAGE_KEYS } from '../storage/constant';
import { getData, storeData } from '../storage/storage';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

let isButtonDisabled = true;
const OTPVerificationScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { SCREEN = "" } = route.params || {};
  const { OTP_ID } = route.params;
  const {FIELD_PARAM = ""} = route.params || {};
  const [otpID, setOtpID] = useState(OTP_ID);
  const [otp, setOtp] = useState('');

  const handleOtpFilled = (code) => {
    setOtp(code);
    if (code.length === 6) {
      isButtonDisabled = false;
    }
  };

  const handleOtpChanged = (code) => {
    setOtp(code);
    if (code.length < 6) {
      isButtonDisabled = true;
    }
  };

  useEffect(() => {
    const setEmailValue = async () => {
      try {
       // const userEmail = await getData(STORAGE_KEYS.USER_EMAIL);
        setEmail(FIELD_PARAM);
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };
    setEmailValue();
  }, []);

  const handleResendOtp = () => {
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
          const newOtpID = response.data.data.otp_id;
          setOtpID(newOtpID);
          Alert.alert('Success', 'OTP has been resent.');
        } else {
          Alert.alert('Error', 'Failed to resend OTP.');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to resend OTP.');
      });
  };

  const handleContinue = () => {
    if (otp.length === 6) {
      setLoading(true);
      console.log("VERIFY OTP")
      const formData = new FormData();
      formData.append('id', otpID);
      formData.append('otp', otp);
      const url = `${BASE_URL}${API_ENDPOINTS.VERIFY_OTP}`;
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
          console.log(response.data)
          if (response.data.status === 200) {
            if (SCREEN === STORAGE_KEYS.FROM_LOGIN) {
              storeData(STORAGE_KEYS.IS_LOGIN_VERIFIED, "true");
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'MenuScreen' }],
                })
              );
            } else if(SCREEN === STORAGE_KEYS.FROM_FORGOT_PASSWORD){
              const OTP_ID = response.data.data.otp_id+""
              navigation.navigate('ResetPassword',{SCREEN,FIELD_PARAM})
            }
            else if(SCREEN === STORAGE_KEYS.FROM_RESET_PASSWORD){
              const OTP_ID = response.data.data.otp_id+""
              navigation.navigate('ResetPassword',{SCREEN,FIELD_PARAM})
            }
          } else {
            Alert.alert('Error', 'Failed to verify OTP.');
          }
        })
        .catch(error => {
          setLoading(false);
          console.error('Error:', error);
          Alert.alert('Error', 'Failed to verify OTP.');
        });
    } else {
      Alert.alert('Alert', 'Enter 6 digit OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
        <TouchableOpacity style={[styles.backArrow,{zIndex:1}]} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={30} color='#fff' />
        </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={styles.overlay} size="large" color={colors.orange} />
          ) : null}
          <View style={styles.header}>

            <Image source={require('../../assets/logo_img.png')} style={styles.logo} />
          </View>
          <LinearGradient
            colors={['#874268', '#7C3D5F', '#723858', '#6B3552', '#683351', '#5F2F4A', '#552A42', '#4C263B']}
            style={styles.linearGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.footer}>
              <Text style={styles.title}>VERIFY ACCOUNT!</Text>
              <Text style={styles.subtitle}>OTP Sent on {email}</Text>
              <Text style={styles.startLeftText}>Enter OTP</Text>
              <OTPInputView
                style={styles.otpContainer}
                pinCount={6}
                onCodeFilled={handleOtpFilled}
                onCodeChanged={handleOtpChanged}
                autoFocusOnLoad
                codeInputFieldStyle={styles.otpInput}
                codeInputHighlightStyle={styles.otpInputHighlight}
              />
              <Text style={styles.resendText}>Didn't receive the code?</Text>
              <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Image source={require('../../assets/btn_continue.png')} style={styles.continueButtonImage} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.baseBackground,
  },
  scrollViewContent: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.baseBackground,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  footer: {
    width: '100%',
    flex: 2,
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: '10%',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 25,
    fontFamily: 'ManropeBold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 30,
  },
  startLeftText: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 14,
    color: 'white',
    marginBottom: 20,
  },
  otpContainer: {
    width: '100%',
    height: 50,
    color: 'white',
    marginBottom: 20,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'black',
    backgroundColor: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 3,
  },
  otpInputHighlight: {
    borderColor: colors.accent,
  },
  resendText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  resendButton: {
    marginBottom: 20,
  },
  resendButtonText: {
    color: 'white',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  continueButton: {
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  buttonEnabled: {
    backgroundColor: 'blue',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  continueButtonImage: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backArrow: {
    position: 'absolute',
    top:50,
    left:10,
  },
});

export default OTPVerificationScreen;
