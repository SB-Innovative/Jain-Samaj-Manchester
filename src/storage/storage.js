// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constant';
// Generic method to save data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing data with key ${key}`, error);
  }
};

// Generic method to retrieve data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error retrieving data with key ${key}`, error);
  }
};

// Generic method to remove data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data with key ${key}`, error);
  }
};

export const logoutData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_ID);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_MEMBER_ID);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_MOBILE);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_NAME);
    
  } catch (error) {
    console.log(`Error removing data with key`, error);
  }
};
export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(`Error removing all data`, error);
  }
};
