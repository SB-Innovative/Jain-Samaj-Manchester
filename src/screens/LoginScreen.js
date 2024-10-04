import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import TextBold from '../components/atom/TextBold';
import TextRegular from '../components/atom/TextRegular';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <View style={styles.header}>
        <Text style={styles.time}>5:13</Text>
        <View style={styles.statusIcons}>
          <Image source={require('../assets/wifi-icon.png')} style={styles.icon} />
          <Image source={require('../assets/battery-icon.png')} style={styles.icon} />
        </View>
      </View> */}
      <Image source={require('../../assets/user-icon.png')} style={styles.userIcon} />
      <TextBold text="Login" style={styles.title} />
      <TextRegular text="Mobile/Email" />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Mobile No. / Email Address"
        placeholderTextColor="#ECE5E2"
      />
      <TextRegular text="Password" />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Password"
        placeholderTextColor="#ECE5E2"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <TextRegular text="Login"style={styles.buttonText}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6f00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  time: {
    color: 'white',
    fontSize: 18,
  },
  statusIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  userIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'OpenSansBold',
    marginBottom: 100,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#ffb84d',
    borderRadius: 10,
    borderColor:'#FFFFFFCD',
    borderWidth:2,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: 'white',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ff6f00',
    fontSize: 18,
    fontFamily: 'OpenSansRegular',
  },
});

export default LoginScreen;
