import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SectionList, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { BASE_URL, BASIC, API_ENDPOINTS, AUTH_KEY } from '../networking/constant';
import { getData } from '../storage/storage';
import axios from 'axios';
import { STORAGE_KEYS } from '../storage/constant';
import moment from 'moment';

const NotificationScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const userId = await getData(STORAGE_KEYS.USER_MEMBER_ID);
      const userToken = await getData(STORAGE_KEYS.USER_TOKEN);

      const limit = 500; // Page size
      const offset = (page - 1) * limit; // Calculate offset based on the page

      // Debugging: Log the offset and page values
      console.log(`Fetching data: Page = ${page}, Limit = ${limit}, Offset = ${offset}`);

      const formData = new FormData();
      formData.append('id', userId);
      formData.append('limit', limit);
      formData.append('offset', offset);

      const url = `${BASE_URL}${API_ENDPOINTS.GET_NOTIFICATION}`;
      const headers = {
        'Basic': `${BASIC}`,
        'Auth-Key': `${AUTH_KEY}`,
        'Authorization': userToken,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(url, formData, { headers });

      if (response.data.status === 200) {
        const fetchedData = response.data.data;
       // setFetchedData(response.data.data);
        console.log('Fetched Data:', fetchedData); // Debugging: Log the fetched data

        // Check if there is no more data
        if (fetchedData.length < limit) {
          setHasMore(false);
        }

        // Remove duplicates
        const uniqueData = Array.from(new Map([...data, ...fetchedData].map(item => [item.id, item])).values());

        setData(uniqueData);
        setGroupedData(groupByCreatedDate(uniqueData));
      } else {
        Alert.alert('Error', response.data.message);
        setHasMore(false);  // Prevent further fetching if the API signals an error
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch notifications. Please try again.');
      setHasMore(false);  // Prevent further fetching on network errors
    } finally {
      setLoading(false);  // Ensure loading state is reset
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLoadMore = () => {
   // if (hasMore && !loading) {
      console.log('Loading more data...'); // Debugging: Log when attempting to load more data
      setPage(prevPage => prevPage + 1);
   // }
  };

  function formatDate(dateString) {
    return moment(dateString).format('DD MMM YYYY');
  }

  function formatTime(timeString) {
    return moment(timeString, 'HH:mm:ss').format('h:mm A');
  }

  function groupByCreatedDate(items) {
    const grouped = [];
    items.forEach(item => {
      const date = formatDate(item.created_datetime.split(" ")[0]);
      let group = grouped.find(g => g.date === date);

      if (!group) {
        group = { date, items: [] };
        grouped.push(group);
      }

      group.items.push(item);
    });

    return grouped;
  }

  const sections = groupedData.map(group => ({
    title: group.date,
    data: group.items,
  }));

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() =>
        navigation.navigate('NotificationDetails', { ID: item.id, TITLE: item.title, DESCRIPTION: item.description })}>
        <View style={styles.notificationItem}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/heart.png')} style={styles.profileIcon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.message}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.description}</Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.rightContainer}>
              <Image source={require('../../assets/clock.png')} style={styles.clockIcon} />
              <Text style={styles.time}>{formatTime(item.created_datetime.split(" ")[1])}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.status}>{item.tag}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={[styles.backArrow]} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={30} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.dateHeaderContainer}>
            <Text style={styles.dateHeader}>{title}</Text>
            <View style={styles.headerLine} />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.baseBackground,
  },
  profileIcon: {
    width: 20,
    height: 18,
  },
  clockIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 53,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: colors.background,
    
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 16,
    color: 'white',
    fontFamily: 'ManropeBold',
    alignItems: 'center',
    paddingLeft: 115,
    paddingTop: 15,
    
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 15,
    color: '#000000',
  },
  subtitle: {
    fontSize: 12,
    color: '#222222',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    justifyContent: 'flex-end',
  },
  status: {
    flexWrap: 'wrap',
    fontSize: 12,
    color: '#000',
  },
  dateHeader: {
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: colors.baseBackground,
  },
  dateHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.baseBackground,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9',
    marginLeft: 10,
  },
  backArrow: {
    position: 'absolute',
    top:50,
    left:10,
  },
});

export default NotificationScreen;
