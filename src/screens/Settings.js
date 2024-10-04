import React from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, StyleSheet, Image, Text, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';
import { getData,logoutData } from '../storage/storage';
import { STORAGE_KEYS } from '../storage/constant';
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL, API_ENDPOINTS, BASIC, AUTH_KEY } from '../networking/constant';


const Settings = ({ navigation }) => {
  const handleResetPassword = async() => {
    const SCREEN = STORAGE_KEYS.FROM_RESET_PASSWORD
    const FIELD_PARAM = await getData(STORAGE_KEYS.USER_EMAIL)
    navigation.navigate('ForgotPassword',{SCREEN,FIELD_PARAM});
  };

  const handleNotifications = () => {
    navigation.navigate('Notification');
  };

const callLogout = async () => {
  try {
    console.log('callLogout');
    const url = `${BASE_URL}${API_ENDPOINTS.LOGOUT}`;
   
   
    const response = await axios.post(url, {
      id: await getData(STORAGE_KEYS.USER_MEMBER_ID),
      fcm_token: await getData(STORAGE_KEYS.FCM_TOKEN),
    }, {
       headers : {
        'Basic': `${BASIC}`,
        'Auth-Key': `${AUTH_KEY}`,
        'Authorization': await getData(STORAGE_KEYS.USER_TOKEN),
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log('response : ',JSON.stringify(response));

    if (response.data.status === 200) {
      try {
        await logoutData();
      
       } catch (error) {
         console.error('Error clearing AsyncStorage:', error);
       }

       // Reset the navigation stack and navigate to the LoginScreen
       navigation.dispatch(
         CommonActions.reset({
           index: 0,
           routes: [{ name: 'LoginScreen' }],
         })
       );
    }
    
  } catch (error) {
    Alert.alert('Error', 'Failed to Logout. Please try again.');
  }
}

  const handleLogout = async() => {
   
    // Perform logout logic here, e.g., clearing user data, tokens, etc.
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            callLogout()
          },
        },
      ],
      { cancelable: false }
    );

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
        <TouchableOpacity style={[styles.backArrow,{zIndex:1}]} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={25} color='#000' />
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
              <TouchableOpacity style={styles.optionButton} onPress={handleResetPassword}>
                <Text style={styles.optionButtonText}>Reset Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={handleNotifications}>
                <Text style={styles.optionButtonText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
                <Text style={styles.optionButtonText}>Logout</Text>
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
    flexDirection: 'column',
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
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
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
  optionButton: {
    width: '90%',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  backArrow: {
    position: 'absolute',
    top:5,
    left:10,
  },
});

export default Settings;
