import React, { useState,useEffect } from 'react';
import { Text,View, Button, StyleSheet, Alert, ScrollView, Image ,TouchableOpacity,FlatList,ActivityIndicator, Linking} from 'react-native';
import TextInputField from '../components/molecule/TextInputField';
import PickerField from '../components/molecule/PickerField';
import ButtonCircular from '../components/atom/ButtonCircular';
import { BASE_URL,BASIC,API_ENDPOINTS,AUTH_KEY } from '../networking/constant';
import { getData } from '../storage/storage';
import axios from 'axios';
import { STORAGE_KEYS } from '../storage/constant';
import colors from '../styles/colors';
import TextBold from '../components/atom/TextBold';
import LabelValues from '../components/molecule/LabelValues';
import Icon from 'react-native-vector-icons/Ionicons';
import TextRegular from '../components/atom/TextRegular';
import CarouselSlider from '../components/molecule/CarouselSlider';


const ListFamilyMembers = ({navigation,route}) => {
  let ID =  route.params.ID
  let FAMILY_ID = route.params.FAMILY_ID
  let NAME = route.params.NAME
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [dob, setDob] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const flattenData = (data) =>
  Object.values(data).flat().map(record => ({
    ...record,
    tree_row: record.tree_row ? parseInt(record.tree_row) : 1,
  }));

  const fetchData = async () => {
    setLoading(true);
    const formData = new FormData();
    console.log("FAMILY_ID2 : ",FAMILY_ID);
  formData.append('id', FAMILY_ID);
  
  const url = `${BASE_URL}${API_ENDPOINTS.GET_ALL_FAMILY_TREE}`;
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
      const flatList = flattenData(response.data.data);
      console.log("flatList : "+ JSON.stringify(flatList))
     setData(flatList)
          } else {
            // Handle API error
            Alert.alert( response.data.message || 'An error occurred. Please try again.');
          }
    })
  .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
   fetchData();
   console.log("LIST DETAILS IDS : ",ID)
  }, []);

  const handleSubmit = () => {
    navigation.goBack(); 
  };

  const maritalStatusItems = [
    { label: 'Single', value: 'single' },
    { label: 'Married', value: 'married' },
    // Add more options as needed
  ];
  const openDialPad = (number) => {
    Linking.openURL(`tel:${number}`);
  };
  const openEmail= (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCoontainer}>
      <View style={styles.nameCenter}>
        <TextBold text={item.name +" "+ item.lastname} style={styles.nameCenter}/>
      </View>
      {item.email ? (<View style={styles.labelcontainer}>
      <TextBold text={"Email : "} style={styles.textBold}/>
      <TouchableOpacity style={styles.regularUnderline} onPress={() => openEmail(item.email)}>
      <TextRegular text={item.email} style={styles.regularUnderline}/>
      </TouchableOpacity>
    </View>): null}
      {/* {item.email ? ( <LabelValues label={"Email : "} value={item.email} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> ): null} */}
      {item.relation ? (<LabelValues label={"Relation with Head: "} value={item.relation} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> ): null}
      {item.maritial_status ? (<LabelValues label={"Marital Status : "} value={item.maritial_status} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> ): null}
      {/* {item.dob ? (<LabelValues label={"DOB : "} value={item.dob} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> ): null} */}
      {item.occupation ? (<LabelValues label={"Occupation : "} value={item.occupation} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> ): null}
      {item.address1 ? (<LabelValues label={"Address : "} value={item.address1+" "+ item.address2+" "+ item.town} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> ): null}
      {/* {item.mobile ? (<LabelValues label={"Mobile No : "} value={item.mobile} labelStyle={styles.textBold} valueStyle={styles.textRegular} /> ): null} */}
      {item.mobile ? (<View style={styles.labelcontainer}>
      <TextBold text={"Mobile No : "} style={styles.textBold}/>
      <TouchableOpacity style={styles.regularUnderline} onPress={() => openDialPad(item.mobile)}>
      <TextRegular text={item.mobile} style={styles.regularUnderline}/>
      </TouchableOpacity>
    </View>
    ): null}
    {/* <TextInputField
        label="Email"
        value={item.email}
        editable={false}
        onChangeText={setEmail}
      />

      <TextInputField
        label="Family Head Last Name"
        value={item.lastname}
        editable={false}
        onChangeText={setLastName}
      />

      <TextInputField
        label="Family Head First Name/Last Name"
        value={item.name}
        editable={false}
        onChangeText={setFirstName}
      />

      <PickerField
        label="Family Head Marital Status"
        selectedValue={item.maritial_status}
        onValueChange={setMaritalStatus}
        items={maritalStatusItems}
      />

      <TextInputField
        label="Family Head Date of Birth"
        value={item.dob}
        onChangeText={setDob}
        editable={false}
        placeholder="YYYY-MM-DD"
      />

      <TextInputField
        label="Family Head Occupation"
        value={item.occupation}
        editable={false}
        onChangeText={setOccupation}
      />

      <TextInputField
        label="Address"
        value={item.address}
        editable={false}
        onChangeText={setAddress}
      />

      <TextInputField
        label="Mobile No"
        value={item.mobile}
        editable={false}
        onChangeText={setMobileNo}
        keyboardType="phone-pad"
      /> */}

    </View>
  );
  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  return (
    <View style={styles.container}>
       <TouchableOpacity style={[styles.backArrow,{zIndex:1}]} onPress={() => navigation.goBack()}>
       <Icon name="chevron-back-outline" size={30} color='#fff' />
        </TouchableOpacity>
        <View  style={styles.image}>
        <CarouselSlider
        item={require('../../assets/menu_girl.png')}
      />
        </View>
     {/* <Image style={styles.image} source={require("../../assets/list_bg.png")}/> */}
       <Text style={styles.title}>Jain Samaj Manchester Directory </Text>
     <View style={styles.subContainer}>
     <View style={styles.nameCenter}>
        <TextBold text={"All Family members of "+NAME} style={styles.nameCenter}/>
      </View>
     {loading ? (
          <ActivityIndicator style={styles.overlay} size="large" color={colors.orange} />
        ) : (
     <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.table}
         ItemSeparatorComponent={ItemSeparator}
        
      />
        )}
      </View>
     
<View style={styles.buttonContainer}>
  <ButtonCircular 
  text = {'Back'}
  style={styles.buttonText}
  handleClick={handleSubmit}
  />

{/* <ButtonCircular 
  text = {'EDIT'}
  style={styles.buttonText}
  handleClick={() => Alert.alert('Edit', 'Edit button pressed')}
  /> */}
        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Edit', 'Edit button pressed')}>
          <Text style={styles.buttonText}>EDIT</Text>
        </TouchableOpacity> */}
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: colors.baseBackground,
  },
  labelcontainer: {
    flex:1,
    flexDirection:'row',
    marginVertical: 8,
  },
  itemCoontainer: {
    borderColor: colors.background,
    borderWidth:2,
    borderRadius:10,
    padding:10
  },
  table: {
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 0,
    marginBottom:10
  },
  image: {
    flex:1,
    width:'100%',
    height:200,
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
    top:195,
    left:20,
    right:20,
    textAlign: 'center' 
  },
  image: {
    flex:1,
    width:'100%',
    height:120,
  },
  subContainer:{
    width:'100%',
    height:'67%',
    padding:20
  },
separator: {
  height: 1,
  marginVertical:10
},
overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.0)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 0.5,
},
nameCenter: {
  flexDirection:'row',
  fontSize: 18,
  justifyContent:'center',
  alignItems:'center',
  color: colors.background,
  fontWeight: 'bold',
},
textBold: {
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  fontSize: 14, // Adjust default font size as needed
  color: '#000000', // Adjust default color as needed
},
textRegular: {
  flex:1,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  fontSize: 14, // Adjust default font size as needed
  color: '#000000', // Adjust default color as needed
},
backArrow: {
  position: 'absolute',
  top:50,
  left:10,
  elevation:10
},
regularUnderline: {
  flex:1,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  fontSize: 14, 
  color: '#000000',
  textDecorationLine: 'underline',
},

});

export default ListFamilyMembers;
