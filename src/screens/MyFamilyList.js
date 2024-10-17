import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Image, ActivityIndicator, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import { API_ENDPOINTS, BASE_URL, BASIC, AUTH_KEY } from '../networking/constant';
import { STORAGE_KEYS } from '../storage/constant';
import { getData } from '../storage/storage';
import colors from '../styles/colors';
import TextBold from '../components/atom/TextBold';
import TextRegular from '../components/atom/TextRegular';
import Icon from 'react-native-vector-icons/Ionicons';
import CarouselSlider from '../components/molecule/CarouselSlider';
import ButtonCircular from '../components/atom/ButtonCircular';


// Function to flatten the data
const flattenData = (data) =>
  Object.values(data).flat().map(record => ({
    ...record,
    tree_row: record.tree_row ? parseInt(record.tree_row) : 1,
  }));

// Function to group and sort the data by tree_row
const groupByTreeRow = (flatList, setHeadRelation) => {
  // if (flatList[1]?.relation_id == 2) {
  //   setHeadRelation("Husband");
  // } else if (flatList[1]?.relation_id == 3) {
  //   setHeadRelation("Wife");
  // }

  const groupedByTreeRow = flatList.reduce((acc, record) => {
    const treeRow = record.tree_row;
    if (!acc[treeRow]) {
      acc[treeRow] = [];
    }
    acc[treeRow].push(record);
    return acc;
  }, {});

  // Convert grouped object to array of arrays and sort by tree_row
  return Object.keys(groupedByTreeRow)
    .sort((a, b) => a - b)
    .map(key => groupedByTreeRow[key]);
};



const MyFamilyList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupedData, setGroupedData] = useState([]);
  const [headRelation, setHeadRelation] = useState('Head');

  useEffect(() => {
    const fetchFamilyData = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('id', await getData(STORAGE_KEYS.USER_MEMBER_ID));
        const url = `${BASE_URL}${API_ENDPOINTS.GET_ALL_FAMILY_TREE}`;
        const headers = {
          'Basic': BASIC,
          'Auth-Key': AUTH_KEY,
          'Authorization': await getData(STORAGE_KEYS.USER_TOKEN),
          'Content-Type': 'multipart/form-data',
        };

        const response = await axios.post(url, formData, { headers });
        setLoading(false);

        if (response.data.status === 200) {
          console.log("FAMILY : " + JSON.stringify(response.data.data))
          const flatList = flattenData(response.data.data);
          console.log("flatList : " + JSON.stringify(flatList))
          const grouped = groupByTreeRow(flatList, setHeadRelation);
          setGroupedData(grouped);
        } else {
          Alert.alert(response.data.message || 'An error occurred. Please try again.');
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchFamilyData();
  }, []);

  const handleOk = () => {
    navigation.goBack(); 
  };
  
  const renderRow = ({ item, position }) => (

    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      {item.map((person, index, position) => (
        <TouchableOpacity style={styles.item} onPress={async () => {
          const ID = person.id //|| await getData(STORAGE_KEYS.USER_MEMBER_ID)
          console.log("ID : ", ID);
          const IS_HEAD = person.is_head + ""
          navigation.navigate('MyFamilyDetails', { ID: ID, IS_HEAD: IS_HEAD })
        }} >
          <View key={person.id} style={styles.item}>
            <View style={styles.horizontalView}>
              <View style={[styles.horizontalLine, { opacity: (index == 0) ? 0 : 1 }]} />
              <View style={[styles.horizontalLine2, { opacity: (index === item.length - 1) ? 0 : 1 }]} />
            </View>
            <View style={[styles.verticalLine, { opacity: (person.is_head == 1) ? 0 : 1 }]} />

            <View style={styles.itemBox}>
              <TextBold text={person.name} style={styles.title} />
              <TextRegular text={`(${person.relation || headRelation})`} style={styles.relation} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.backArrow, { zIndex: 1 }]} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={30} color='#fff' />
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.imageTop}>
          <CarouselSlider
            
          />
        </View>
        {/* <Image source={require('../../assets/menu_girl.png')} style={styles.imageTop} /> */}
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
              source={require('../../assets/heart.png')}
              style={styles.icon}
            />

          </View>
          <Text style={styles.listButtonText}>My Family</Text>
        </View>
        <ImageBackground
          source={require('../../assets/new-tree-3.png')}
          style={styles.imageBackground}
          resizeMode="stretch"
        >
          {loading ? (
            <ActivityIndicator style={styles.overlay} size="large" color={colors.orange} />
          ) : (
            <FlatList
              data={groupedData}
              renderItem={renderRow}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ImageBackground>
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
    
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: colors.baseBackground,
    paddingHorizontal: 10,
  },
  // imageTop: {
  //   width: '80%',
  //   height: '60%',
  //   marginTop: '30%',
  //   marginBottom: '20%',
  //   borderRadius: 10,
  // },
  imageTop: {
    width: '100%',
    height: '100%',
    margin: 20,
    borderRadius: 10,
    

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',


  },
  item: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 10,
    paddingHorizontal: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',


  },
  verticalLine: {
    width: 1,
    height: 0,
    // backgroundColor:colors.background
  },
  horizontalView: {
    flex: 1,
    flexDirection: 'row',
    height: 1,
    justifyContent: 'space-evenly',
  },
  horizontalLine: {
    flex: 0.5,
    height: 1,
    opacity: 1,
    //backgroundColor:colors.background
  },
  horizontalLine2: {
    flex: 0.5,
    height: 1,
    opacity: 1,
    //backgroundColor:colors.background
  },
  title: {
    fontSize: 14,
    color: colors.background,
    fontWeight: 'bold',
  },
  relation: {
    fontSize: 10,
    color: colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  listButton: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    padding: 0,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: colors.background,
    padding: 5,
  },
  icon: {
    width: 20,
    height: 18,
  },
  iconLong: {
    width: 15,
    height: 20,
  },
  listButtonText: {
    color: colors.primary,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 18,
    marginStart: 10
  },
  imageBackground: {
    flex: 1,
    width: '100%'
  },
  itemBox: {
    flex: 1,
    minWidth: 70,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fffcd6',
    borderRadius: 10,
    justifyContent: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 10,
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

export default MyFamilyList;
