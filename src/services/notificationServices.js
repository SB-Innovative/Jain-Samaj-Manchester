import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData,storeData } from '../storage/storage';
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log('Authorization status:', authStatus);
        registerForRemoteMessages()
    }
}

// Register the device for remote messages
const registerForRemoteMessages = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('Device registered for remote messages.');
      getFCMToken(); // Fetch the token after registration
    } catch (error) {
      console.error('Failed to register for remote messages:', error);
    }
  };

const getFcmToken = async () => {
    console.log("Old FCM token", "fcmToken");
    try{

        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("Old FCM token", fcmToken);
        if(!fcmToken){
            try{
                const fcmToken = await messaging().getToken();
                if(fcmToken){
                    console.log("New FCM:", fcmToken);
                    await AsyncStorage.setItem('fcmToken', fcmToken);
                }
            }catch(error){
                console.log(",....error",error);
            }
        }
    } catch(err) {
        console.log(",my eerr", err)
    }
}
export const NotificationServices = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });
    //foreground Message Handling
    messaging().onMessage(async remoteMessage => {
        console.log('Notification in foreground', remoteMessage);
        Alert.alert(message.notification.title, message.notification.body);
    });
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
}