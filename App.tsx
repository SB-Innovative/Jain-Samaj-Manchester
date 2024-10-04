//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, LogBox, Platform, PermissionsAndroid, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreenHello from './src/screens/LoginScreenHello';
import ForgetPasswordScreen from './src/screens/ForgotPassword';
import OTPVerificationScreen from './src/screens/OTPScreen';
import ResetPasswordScreen from './src/screens/ResetPassword';
import NotificationScreen from './src/screens/Notification';
import MenuScreen from './src/screens/MenuScreen';
import ListDetails from './src/screens/ListDetails';
import List from './src/screens/List';
import MyFamilyList from './src/screens/MyFamilyList';
import MyFamilyDetails from './src/screens/MyFamilyDetails';
import colors from './src/styles/colors';
import { getData, storeData } from './src/storage/storage';
import { STORAGE_KEYS } from './src/storage/constant';
import Settings from './src/screens/Settings';
import ListFamilyMembers from './src/screens/ListFamilyMembers';
import NotificationDetails from './src/screens/NotificationDetails';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { requestUserPermission, NotificationServices } from './src/services/notificationServices';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();
const navigationRef = React.createRef();


// const requestNotificationPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//         {
//           title: 'Notification Permission',
//           message: 'This app needs access to send you notifications.',
//           buttonPositive: 'OK',
//           buttonNegative: 'Cancel',
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Notification permission granted');
//       } else {
//         console.log('Notification permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   }
// };

const App = () => {
  const [token, setToken] = useState(null);
  const [isLoginVerified, setLoginVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestUserPermission();
    NotificationServices()
  }, []);




  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await getData(STORAGE_KEYS.USER_TOKEN);
        const loginVerified = await getData(STORAGE_KEYS.IS_LOGIN_VERIFIED);

        console.log("Fetched token: ", storedToken);
        console.log("Fetched isLoginVerified: ", loginVerified);

        setToken(storedToken);
        setLoginVerified(loginVerified === 'true');
      } catch (error) {
        console.error('Error fetching auth data:', error);
      } finally {
        setLoading(false);
        SplashScreen.hide();
      }
    };

    initializeAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }

  return (
    // <SafeAreaProvider>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={token && isLoginVerified ? "MenuScreen" : "LoginScreen"}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreenHello}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListDetails"
          component={ListDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyFamilyList"
          component={MyFamilyList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyFamilyDetails"
          component={MyFamilyDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListFamilyMembers"
          component={ListFamilyMembers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationDetails"
          component={NotificationDetails}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
};



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
