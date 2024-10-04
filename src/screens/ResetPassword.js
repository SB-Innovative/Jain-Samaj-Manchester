import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import colors from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL, API_ENDPOINTS, BASIC, AUTH_KEY } from '../networking/constant';
import { STORAGE_KEYS } from '../storage/constant';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import { getData } from '../storage/storage';

const ResetPasswordScreen = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { SCREEN = "" } = route.params || {};
  const { FIELD_PARAM } = route.params || {}; // Extract phone number from route params if available

const callResetPassword = async () => {
  try {
    console.log('callResetPassword');
    const url = `${BASE_URL}${API_ENDPOINTS.RESET_PASSWORD}`;

    const response = await axios.post(url, {
      pwd: newPassword,
      phone: FIELD_PARAM
    }, {
       headers : {
        'Basic': `${BASIC}`,
        'Auth-Key': `${AUTH_KEY}`,
        'Authorization': await getData(STORAGE_KEYS.USER_TOKEN),
        'Content-Type': 'multipart/form-data',
      }
    });

    if (response.data.status === 200) {
    navigation.navigate('MenuScreen');
    Alert.alert('Success', 'Password reset successfully.');
    }
    
  } catch (error) {
    console.error('Error resetting password:', error);
    Alert.alert('Error', 'Failed to change password. Please try again.');
  }
}

const callForgotPassword = async () => {
  console.error('callForgotPassword');
  try {
    const url = `${BASE_URL}${API_ENDPOINTS.FORGOT_PASSWORD}`;
   
   
    const response = await axios.post(url, {
      pwd: newPassword,
      phone: FIELD_PARAM
    }, {
       headers : {
        'Basic': `${BASIC}`,
        'Auth-Key': `${AUTH_KEY}`,
        'Content-Type': 'multipart/form-data',
      }
    });

    if (response.data.status === 200) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      );
    Alert.alert('Success', 'Created New Password successfully.');
    }
    
   
  } catch (error) {
    console.error('Error resetting password:', error);
    Alert.alert('Error', 'Failed to create new password. Please try again.');
  }
}

  const handleContinue = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    console.log()
    if(SCREEN == STORAGE_KEYS.FROM_FORGOT_PASSWORD){
      callForgotPassword()
    }else if(SCREEN == STORAGE_KEYS.FROM_RESET_PASSWORD){
      callResetPassword()
    }
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
        <TouchableOpacity style={[styles.backArrow,{zIndex:2}]} onPress={() => navigation.goBack()}>
        <Icon1 name="chevron-back-outline" size={25} color='#000' />
        </TouchableOpacity>
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
              <View style={styles.inputContainer}>
                <Icon name="lock" size={14} color={colors.primary} />
                <TextInput
                  placeholder="Enter New Password"
                  style={styles.input}
                  placeholderTextColor="#AAAAAA"
                  secureTextEntry={true}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={14} color={colors.primary} />
                <TextInput
                  placeholder="Re-Enter New Password"
                  style={styles.input}
                  placeholderTextColor="#AAAAAA"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
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
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  logo: {
    width: 100,
    height: 100,
  },
  footer: {
    width: '100%',
    height: '100%',
    flex: 4,
    flexDirection: 'column',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: '10%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 10
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    flex: 1
  },
  continueButton: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    marginTop: 60
  },
  continueButtonImage: {
    height: 50,
    width: '100%',
    borderRadius: 10,
  },
  backArrow: {
    position: 'absolute',
    top:10,
    left:10,
  },
});

export default ResetPasswordScreen;
