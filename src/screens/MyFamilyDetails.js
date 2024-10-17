import React, { useState,useEffect } from 'react';
import { Text,View, Button, StyleSheet, Alert, ScrollView, Image ,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import TextInputField from '../components/molecule/TextInputField';
import PickerField from '../components/molecule/PickerField';
import ButtonCircular from '../components/atom/ButtonCircular';
import { BASE_URL,BASIC,API_ENDPOINTS,AUTH_KEY } from '../networking/constant';
import { getData } from '../storage/storage';
import axios from 'axios';
import { STORAGE_KEYS } from '../storage/constant';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import CarouselSlider from '../components/molecule/CarouselSlider';

const MyFamilyDetails = ({navigation,route}) => {
  let ID =  route.params.ID
  let IS_HEAD =  route.params.IS_HEAD
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [dob, setDob] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [workMobile, setWorkMobile] = useState('');  
  const [postCode, setPostCode] = useState('');
  const [town, setTown] = useState('a');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateMobile = (mobile) => /^0[0-9]{10}$/.test(mobile);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const fetchDataHead = async () => {
    setLoading(true);
    const formData = new FormData();
  formData.append('id', ID);
  const url = `${BASE_URL}${API_ENDPOINTS.GET_HEAD_BYID}`;
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
    setLoading(false);
    
    console.log("IS_HEAD : ",IS_HEAD)
    console.log("API : ","GET_HEAD_BYID ")
    console.log("JSON : ",JSON.stringify(headers))
    //console.log(response.data)
    if (response.data.status === 200) {
      console.log("DATA : ",[response.data.data])
      console.log("MOBILE : ",[response.data.data][0].mobile)
       setData([response.data.data][0])
     setMobileNo(replaceNulWithEmpty([response.data.data][0].mobile))
     setEmail(replaceNulWithEmpty([response.data.data][0].email))
     setOccupation([response.data.data][0].occupation)
     setAddress([response.data.data][0].address1+","+[response.data.data][0].address2+","+[response.data.data][0].town)
     setDob([response.data.data][0].dob)
     setMaritalStatus([response.data.data][0].maritial_status)
     setFirstName([response.data.data][0].name)
     setLastName([response.data.data][0].lastname)
     setAddress1([response.data.data][0].address1)
     setAddress2([response.data.data][0].address2)
     setTown([response.data.data][0].town)
     setPostCode([response.data.data][0].post_code)
     setWorkMobile([response.data.data][0].work_mobile)

          } else {
            // Handle API error
            Alert.alert( response.data.message || 'An error occurred. Please try again.');
          }
    })
  .catch(error => console.error('Error:', error));
  };

  const replaceNulWithEmpty = (field) => {
 
    console.log("field before : ",JSON.stringify(field))
      if (field === null || field === "null") {
        field = ""; // Replace null with ""
        console.log("field in : ",field)
      }
      console.log("field After : ",field)
      return field;
  ;
  };
  
  const fetchDataMember = async () => {
    setLoading(true);
    const formData = new FormData();
    console.log("IS_HEAD : ",IS_HEAD)
    console.log("API : ","GET_M_FAMILY_BY_ID ")
  formData.append('id', ID);
  const url = `${BASE_URL}${API_ENDPOINTS.GET_M_FAMILY_BY_ID}`;
  const headers = {
      'Basic': `${BASIC}`,
      'Auth-Key': `${AUTH_KEY}`,
      'Authorization': await getData(STORAGE_KEYS.USER_TOKEN),
      'Content-Type': 'multipart/form-data',
    };
    console.log("JSON : ",JSON.stringify(formData))
  axios.post(url, formData, {
    headers: headers,
  })
  .then(response => {
    setLoading(false);
    console.log("API : ","GET_M_FAMILY_BY_ID ")
    console.log(response.data)
    if (response.data.status === 200) {
      console.log(response.data.data)
      setData(response.data.data[0])
      console.log("MOBILE : ",[response.data.data][0].mobile);
      setMobileNo(replaceNulWithEmpty(response.data.data[0].mobile))
      setEmail(replaceNulWithEmpty(response.data.data[0].email))
      setOccupation(response.data.data[0].occupation)
      setAddress(response.data.data[0].address1+","+response.data.data[0].address2+","+response.data.data[0].town)
      setDob(response.data.data[0].dob)
      setMaritalStatus(response.data.data[0].maritial_status)
      setFirstName(response.data.data[0].name)
      setLastName(response.data.data[0].lastname)
          } else {
            // Handle API error
            Alert.alert( response.data.message || 'An error occurred. Please try again.');
          }
    })
  .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if(IS_HEAD === "1"){
      fetchDataHead();
    }else {
      fetchDataMember();
    }
  },[]);
  

  // const fetchData = async () => {
  //   setLoading(true);
  //   const formData = new FormData();
  // formData.append('id', ID);
  // const url = `${BASE_URL}${API_ENDPOINTS.GET_M_FAMILY_BY_ID}`;
  // const headers = {
  //     'Basic': `${BASIC}`,
  //     'Auth-Key': `${AUTH_KEY}`,
  //     'Authorization': await getData(STORAGE_KEYS.USER_TOKEN),
  //     'Content-Type': 'multipart/form-data',
  //   };
  // axios.post(url, formData, {
  //   headers: headers,
  // })
  // .then(response => {
  //   setLoading(false);
  //   console.log(response.data)
  //   if (response.data.status === 200) {
  //     console.log(response.data.data)
  //     console.log("Second : "+response.data.data[0].email)
  //    setData(response.data.data[0])
  //    setMobileNo(response.data.data[0].mobile)
  //    setEmail(response.data.data[0].email)
  //    setOccupation(response.data.data[0].occupation)
  //    setAddress(response.data.data[0].address1+","+response.data.data[0].address2+","+response.data.data[0].town)
  //    setDob(response.data.data[0].dob)
  //    setMaritalStatus(response.data.data[0].maritial_status)
  //    setFirstName(response.data.data[0].name)
  //    setLastName(response.data.data[0].lastname)
     
  //         } else {
  //           // Handle API error
  //           Alert.alert( response.data.message || 'An error occurred. Please try again.');
  //         }
  //   })
  // .catch(error => console.error('Error:', error));
  // };

  const UpdateHeadData = async () => {
    setLoading(true);
    const formData = new FormData();
  formData.append('id', ID);
  formData.append('name', firstName);
  formData.append('lastname', lastName);
  formData.append('mobile', mobileNo);
  formData.append('occupation', occupation);
  formData.append('dob', dob);
  formData.append('maritial_status', maritalStatus);
  formData.append('email', email);
  formData.append('address1',address1)
  formData.append('address2',address2)
  formData.append('post_code',postCode)
  formData.append('work_mobile',workMobile)
  formData.append('town',town)


  const url = `${BASE_URL}${API_ENDPOINTS.UPDATE_HEAD_DETAILS}`;
  console.log("UPDATE_HEAD_DETAILS : ",url)
  
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
    setLoading(false);
    console.log(response.data)
    if (response.data.status === 200) {
      console.log(response.data.data)
  
      Alert.alert( response.data.message,"Data Updated Sucessfully.");
          } else {
            // Handle API error
            Alert.alert( response.data.message || 'An error occurred. Please try again.');
          }
    })
  .catch(error => console.error('Error:', error));
  };

  const UpdateData = async () => {
    setLoading(true);
    const formData = new FormData();
  formData.append('id', ID);
  formData.append('name', firstName);
  formData.append('lastname', lastName);
  formData.append('mobile', mobileNo);
  formData.append('occupation', occupation);
  formData.append('dob', dob);
  formData.append('email', email);
  formData.append('maritial_status', maritalStatus);
  console.log("IS_HEAD : ",IS_HEAD)
  console.log("JSON : ",JSON.stringify(formData))

  const url = `${BASE_URL}${API_ENDPOINTS.UPDATE_FAMILY_DETAILS}`;
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
    setLoading(false);
    console.log(response.data)
    if (response.data.status === 200) {
      console.log(response.data.data)
  
      Alert.alert( response.data.message,"Data Updated Sucessfully.");
          } else {
            // Handle API error
            Alert.alert( response.data.message || 'An error occurred. Please try again.');
          }
    })
  .catch(error => console.error('Error:', error));
  };

  // useEffect(() => {
  //  fetchData();
  //  console.log("LIST DETAILS IDS : ",ID)
  // }, []);

  const handleOK = () => {
    navigation.goBack();
  };
  const handleUpdate = () => {
    if (!validateName(firstName)) {
      Alert.alert("Invalid Input", "First Name should contain only letters.");
      return;
    }
    if (!validateName(lastName)) {
      Alert.alert("Invalid Input", "Last Name should contain only letters.");
      return;
    }
    if (mobileNo && !validateMobile(mobileNo)) {
      Alert.alert("Invalid Input", "Mobile Number should be a valid 10-digit number,starts with 0.");
      return;
    }
    if (email  &&  !validateEmail(email)) {
      Alert.alert("Invalid Input", "Email should be a valid email address.");
      return;
    }

    if(IS_HEAD === "1"){
      UpdateHeadData();
    }else {
      UpdateData();
    }
  };

  const maritalStatusItems = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    // Add more options as needed
  ];

  
  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
     <ScrollView  contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={[styles.backArrow,{zIndex:1}]} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={30} color='#fff' />
        </TouchableOpacity>
    <View style={styles.container}>
    <View  style={styles.image}>
    <CarouselSlider
        item={require('../../assets/menu_girl.png')}
      />
        </View>
     {/* <Image style={styles.image} source={require("../../assets/list_bg.png")}/> */}
       <Text style={styles.title}>Jain Samaj Manchester Directory </Text>
     <View style={styles.subContainer}>
     {loading ? (
          <ActivityIndicator style={styles.overlay} size="large" color={colors.orange} />
        ) : (
   
    <View style={styles.table}>
      
   
      <TextInputField
        label="First Name"
        value={firstName}
        editable={true}
        onChangeText={setFirstName}
      />
    
      <TextInputField
        label="Last Name"
        value={lastName}
        editable={true}
        onChangeText={setLastName}
      />
   
      <PickerField
        label="Marital Status"
        selectedValue={maritalStatus}
        onValueChange={setMaritalStatus}
        items={maritalStatusItems}
      />
   
      <TextInputField
        label="Date of Birth"
        value={dob}
        onChangeText={setDob}
        editable={true}
        placeholder="DD/MM/YYYY"
      />
      

<TextInputField
        label="Occupation"
        value={occupation}
        editable={true}
        onChangeText={setOccupation}
      />
    
      
      {(IS_HEAD == "0" ) ? (
      <TextInputField
        label="Address"
        value={address}
        editable={false}
        onChangeText={setAddress}
      />
      ) : null}

{(IS_HEAD == "1" ) ? (
      <TextInputField
        label="Address1"
        value={address1}
        editable={true}
        onChangeText={setAddress1}
      />
      ) : null}
       {(IS_HEAD == "1") ? (
      <TextInputField
        label="Address2"
        value={address2}
        editable={true}
        onChangeText={setAddress2}
      />
      ) : null}

{(IS_HEAD == "1" ) ? (
      <TextInputField
        label="Town"
        value={town}
        editable={true}
        onChangeText={setTown}
      />
      ) : null}

{(IS_HEAD == "1" ) ? (
      <TextInputField
        label="Work Mobile"
        value={workMobile}
        editable={true}
        keyboardType="phone-pad"
        onChangeText={setWorkMobile}
      />
      ) : null}

      
      <TextInputField
        label="Mobile No"
        value={mobileNo}
        editable={(IS_HEAD == "1" ) ? false : true}
        onChangeText={setMobileNo}
        keyboardType="phone-pad"
      />
      

   
    <TextInputField
        label="Email"
        value={email}
        editable={(IS_HEAD == "1" ) ? false : true}
        onChangeText={setEmail}
      />
   

<View style={styles.buttonContainer}>
  <ButtonCircular 
  text = {'Back'}
  style={styles.buttonText}
  handleClick={handleOK}
  />

<ButtonCircular 
  text = {'Update'}
  style={styles.buttonText}
  handleClick={handleUpdate}
  /> 
 </View>

    </View>
        )}
      </View>
     

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: colors.baseBackground,
  },
  table: {
    flex:1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin:10
  },
  image: {
    flex:1,
    width:'100%',
    height:100,
  },
  
  
  button: {
    width:'30%',
    backgroundColor: '#FF6600',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    position:'absolute',
    width:'88%',
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    color: 'white',
    fontSize:16,
    fontWeight: 'bold',
    backgroundColor: '#F05D10',
    borderRadius: 15,
    fontWeight: 'bold',
    paddingHorizontal:15,
    paddingVertical:10,
    top:160,
    left:25,
    right:20,
    textAlign: 'center' 
  },
  image: {
    flex:1,
    width:'100%',
    height:200,
  },
  subContainer:{
    flex:1,
    width:'100%',
    height:'70%',
    padding:20
  },
separator: {
  height: 1,
  backgroundColor: '#ccc',
  marginVertical:10
},
overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.0)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 0.5,
},
backArrow: {
  position: 'absolute',
  top:50,
  left:10,
},
});

export default MyFamilyDetails;
