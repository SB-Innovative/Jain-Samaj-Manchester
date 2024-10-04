import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import axios from 'axios';
import { getData, storeData } from '../storage/storage';
import { STORAGE_KEYS } from '../storage/constant';
import { BASE_URL,API_ENDPOINTS, AUTH_KEY,BASIC } from '../networking/constant';
import { CommonActions } from '@react-navigation/native';

const LoginScreenHello = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validate inputs
    if (username === '' || password === '') {
      Alert.alert('Validation Error', 'Username and Password cannot be empty');
      return;
    }

    setLoading(true);
    try {

    const url = `${BASE_URL}${API_ENDPOINTS.LOGIN}`;
  const params = {
    email: username,
    password: password,
    fcm_token: await getData(STORAGE_KEYS.FCM_TOKEN)
  };
  const headers = {
    'Basic': `${BASIC}`,
    'Auth-Key': `${AUTH_KEY}`,
    'Content-Type': 'application/json',
  };
      // Replace with your actual API endpoint
      const response = await axios.post(url,null, {
        params,headers
      });
      

      setLoading(false);

      console.log("response : ", response.data.data.email)
      if (response.data.status === 200) {
        storeData(STORAGE_KEYS.USER_ID,response.data.data.id+"")
        storeData(STORAGE_KEYS.USER_MEMBER_ID,response.data.data.member_id+"")
        storeData(STORAGE_KEYS.USER_EMAIL,response.data.data.email+"")
        storeData(STORAGE_KEYS.USER_MOBILE,response.data.data.mobile+"")
        storeData(STORAGE_KEYS.USER_TOKEN,response.data.data.token+"")

        if(response.data.data.active == "1"){
          if(await getData(STORAGE_KEYS.IS_LOGIN_VERIFIED) == "true"){
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'MenuScreen' }],
              })
            );
          }else{
            const SCREEN = STORAGE_KEYS.FROM_LOGIN
            const FIELD_PARAM = username
            navigation.navigate('ForgotPassword',{SCREEN,FIELD_PARAM});
          }
        }else{
          Alert.alert('Attention!', 'You have been Deactivated. Please contact to Admin.');
        }
        
       
      } else {
        // Handle API error
        Alert.alert('Login Failed', response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Alert.alert('Login Failed', error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert('Network Error', 'No response received. Please check your network connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.scrollContainer}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../assets/user-icon.png')}
              style={styles.profileIcon}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.headerText}>Jai Jinendra</Text>
            <Text style={styles.subHeaderText}>Sign in to your Account</Text>
            <View style={styles.inputContainer}>
              <Icon name="user-large" size={14} color={colors.background} />
              <TextInput
                placeholder="Username"
                style={styles.input}
                placeholderTextColor="#AAAAAA"
                value={username}
                color="#000000"
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="unlock" size={14} color={colors.background} />
              <TextInput
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#AAAAAA"
                secureTextEntry={true}
                value={password}
                color="#000000"
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity onPress={() => { const SCREEN = STORAGE_KEYS.FROM_FORGOT_PASSWORD
            navigation.navigate('ForgotPassword',{SCREEN});}}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View flex={1}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              <Image
                source={require('../../assets/login_btn.png')}
                style={styles.loginButtonContainer}
              />
              <Text style={styles.loginButtonText}>{loading ? 'Loading...' : 'Login'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#FF5B1F',
  },
  container: {
    flexGrow: 1,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.baseBackground,
  },
  scrollContainer: {
    width: '100%',
    height: 720,
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    height: 400,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 50,
  },
  formContainer: {
    marginTop: 200,
    height: 360,
    position: 'absolute',
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 50,
    textAlign: 'center',
    paddingTop: 5,
    paddingHorizontal: 15,
    marginBottom: 50,
    elevation: 5,
  },
  headerText: {
    fontSize: 36,
    color: '#FF5B1F',
    fontFamily: 'ManropeExtraBold',
  },
  subHeaderText: {
    fontSize: 10,
    color: '#000',
    marginBottom: 50,
    fontFamily: 'ManropeExtraBold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex:1,
    width:'100%',
    height: 50,
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    textAlign: 'right',
    color: '#FF5B1F',
    marginBottom: 14,
    fontFamily: 'ManropeExtraBold',
  },
  loginButton: {
    position: 'absolute',
    top: '75%',
    left: '-25%',
    flexDirection: 'row',
    width: '50%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  loginIcon: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    position: 'absolute',
    width: '100%',
    top: '20%',
    left: '50%',
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonContainer: {
    position: 'absolute',
    width: '100%',
    height: 50,
    top: '0%',
    left: '0%',
  },
});

export default LoginScreenHello;
