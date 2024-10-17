import React, { useState,useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image ,Alert,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { BASE_URL,BASIC,API_ENDPOINTS,AUTH_KEY } from '../networking/constant';
import { getData } from '../storage/storage';
import axios from 'axios';
import { STORAGE_KEYS } from '../storage/constant';
import CarouselSlider from '../components/molecule/CarouselSlider';
import ButtonCircular from '../components/atom/ButtonCircular';

const dummyData = [
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
  { name: 'JOHN', age: 'R', mobile: 'M' },
];

const List = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered data based on search

  const openDialPad = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const replaceNullNames = (response) => {
    return response.map(item => {
      if (item.name === null) {
        item.name = "Unknown"; // Replace null with "Unknown"
      }
      return item;
    });
  };
  
  const handleOk = () => {
    navigation.goBack(); 
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const formData = new FormData();
    formData.append('id', await getData(STORAGE_KEYS.USER_MEMBER_ID));
    const url = `${BASE_URL}${API_ENDPOINTS.GET_ALL_DATA}`;
    const headers = {
        'Basic': `${BASIC}`,
        'Auth-Key': `${AUTH_KEY}`,
        'Authorization': await getData(STORAGE_KEYS.USER_TOKEN),
        'Content-Type': 'multipart/form-data',
      };
    axios.post(url, null, {
      headers: headers,
    })
    .then(response => {
      setLoading(false);
      if (response.data.status === 200) {
        console.log("Response11 : "+response.data.data+"")
       // console.log("Response1 : "+response.data.data[0]+"")
        const flatList = response.data.data.flat();

        const updatedData = replaceNullNames(flatList)
        console.log("Response1 : "+JSON.stringify(updatedData)+"")
        const sortedUsers = updatedData.sort((a, b) => a.name.localeCompare(b.name));
       setData(sortedUsers)
       setUsers(sortedUsers); // Set initial unfiltered data
            setFilteredUsers(sortedUsers);
             
            } else {
              // Handle API error
              Alert.alert(response.data.message,  'An error occurred. Please try again.');
            }
      })
    .catch(error => console.error('Error:', error));
    //  catch (error) {
    //     console.error('Error fetching data:', error);
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    };

    fetchData();
  }, []);

  // Filter data based on search text
  useEffect(() => {
    const filteredData = users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) 
    //  {user.name ? user.name.toLowerCase().includes(searchText.toLowerCase()) : "" }
   //console.log("USER : ", user.name.toLowerCase())
     // user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filteredData);
    console.log("filterdata : "+ filteredUsers)

  }, [searchText, users]); // Re-run filter when searchText or users change


  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name +" "+item.lastname}</Text>
      {/* <Text style={styles.tableCell}>{item.age}</Text> */}
      <TouchableOpacity style={styles.tableCell} onPress={() => openDialPad(item.mobile)}>
      <Text style={styles.phoneNumber}>{item.mobile}</Text>
      </TouchableOpacity>
      <View style={styles.tableCell}>


<TouchableOpacity style={styles.detailsBtn}  onPress={() => {
  const ID = item.id+""
  console.log("ID : ",ID);
  const IS_HEAD = item.is_head+""
  const FAMILY_ID = item.id+""
  const NAME = item.name.trim()+" "+item.lastname+""
  navigation.navigate('ListDetails',{ID:ID,IS_HEAD : IS_HEAD,FAMILY_ID:FAMILY_ID, NAME: NAME})
  }} >
<Image style={styles.detailsBtn} source={require('../../assets/btn_details_new.png')}/>
</TouchableOpacity>
     
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      
        <View style={styles.header}>
        <TouchableOpacity style={[styles.backArrow,{zIndex:1}]} onPress={() => navigation.goBack()}>
       <Icon name="chevron-back-outline" size={30} color='#fff' />
        </TouchableOpacity>
        
        <View  style={styles.imageTop}>
        <CarouselSlider/>
        </View>
      
      {/* <Image
          source={require('../../assets/menu_girl.png')} 
          style={styles.imageTop}
        /> */}
        {/* <Image source={{ uri: 'https://path-to-your-image.jpg' }} style={styles.image} /> */}
        <Text style={styles.title}>Jain Samaj Manchester Directory </Text>
      </View>
      <View style={styles.buttonContainer}>
  <ButtonCircular 
  text = {'Back'}
  style={styles.buttonText}
  handleClick={handleOk}
  linearGradient={styles.linearGradient}
  />
   </View>
      <View style={styles.footer}>
      <View style={styles.listButton}>
      
      <View style={styles.iconContainer}>
          <Image
          source={require('../../assets/menu_doc.png')}
          style={styles.iconLong}
        />

    
        </View>
        
          <Text style={styles.listButtonText}>Directory</Text>

         
        </View>
 

      {/* <TouchableOpacity style={styles.listButton}>
        <Icon name="list-outline" size={20} color="white" />
        <Text style={styles.listButtonText}>List</Text>
      </TouchableOpacity> */}
       <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          {/* <Icon name="send" size={20} color="white" /> */}
          <Image
          source={require('../../assets/search_arrow.png')}
          style={styles.searchButton}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Name</Text>
        {/* <Text style={styles.tableHeaderCell}>Age</Text> */}
        <Text style={styles.tableHeaderCell}>Mobile</Text>
        <Text style={styles.tableHeaderCell}></Text>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.table}
      />
     
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseBackground,
  },
  header: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: colors.baseBackground,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position:'absolute',
    flexWrap:"wrap",
    flexDirection:'row',
    alignItems:'center',
    left:30,
    top:30
  
  },
  backButtonText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  listButtonText: {
    color: colors.primary,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize:18,
    marginStart:10
  },
  tableHeader: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 0.25,
    backgroundColor:colors.background,
    borderColor: colors.background,
    color: 'white',
    padding:5,
  },
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'center',
    textAlign: 'left',
    borderWidth:0.25,
    borderColor:colors.primary,
    color: colors.textcolor,
    fontFamily:'ManropeExtraBold',
    padding:10,
    fontWeight: 'bold',
   
  },
  searchContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    borderColor: '#FF6F00',
    borderRadius: 50,
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  searchInput: {
    height:50,
    flex: 1,
    paddingHorizontal: 10,
    color: '#000',
  },
  searchButton: {
    width:40,
    height:40,
   
    padding: 10,
    borderRadius: 40,
    marginLeft: 0,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  iconContainer: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: colors.background,
    padding:5,
  },
  title: {
    position:'absolute',
    width:'88%',
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    color: 'white',
    fontSize:16,
    fontWeight: 'bold',
    backgroundColor: '#F05D10',
    borderRadius: 15,
    fontWeight: 'bold',
    paddingHorizontal:15,
    paddingVertical:10,
    left:20,
    right:20,
    bottom:0,
    textAlign: 'center' 
  },
  iconSquare: {
    width: 20,
    height: 20,
  },
  iconLong: {
    width: 15,
    height: 20,
  },
  imageTop: {
    width: '100%',
    height: '100%',
    borderRadius:10
  },
  detailsBtn:{
    flex:1,
    flexDirection:'row',
    width:70,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    aspectRatio:2.5
  
  },
  phoneNumber: {
    color: colors.textcolor,
    textDecorationLine: 'underline',
    justifyContent:'center',
  flex:1
  },
  backArrow: {
    position: 'absolute',
    top:50,
    left:10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom:5,
    alignItems:'flex-start',
  },
  buttonText: {
    justifyContent:'center',
    alignItems:'center',
    color: 'white',
    fontWeight: 'bold',
  },
  linearGradient: {
    width:'40%',
  },
});

export default List;
