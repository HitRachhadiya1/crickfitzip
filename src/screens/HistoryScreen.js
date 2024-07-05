import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import metrics from '../Utils/metrics';
import { Image } from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ACCEPT_HEADER, past_booking, upcoming_booking } from '../Utils/const';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment';
import axios from 'axios';


const FirstTab = ({data}) => (
<View style={{flex:1,backgroundColor:'#e5eac8',height:'100%'}}>
<ScrollView> 

{data && data.length > 0 ? data.map((pd) => (
       
        <View style={styles.card}>
        {/* <View style={{ position: 'absolute', right: '50%', top: -25, height: 60, width: 60, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', elevation: 8, alignItems: 'center' }}>
          <MaterialCommunityIcons name='block-helper' color='red' size={60} style={{position:'absolute',zIndex:1}} />
          <Image source={require('../../assets/ac.png')} style={{ width: 35, height: 35, borderRadius: 0 }} />
          </View> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#000', fontSize: 24 }}>{moment(pd.date).format("Do")}</Text>
            {/* <Text style={{ color: '#000' }}>{moment(pd.date).format("o")}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#80bc4b', fontSize: 16, fontWeight: '500', marginRight: 3 }}>₹</Text>
            <Text style={{ color: '#80bc4b', fontSize: 24, fontWeight: '700' }}>{pd.total_price}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
        <Text style={{ color: '#000', fontSize: 14 }}>{moment(pd.date).format("MMMM")} , </Text>
        <Text style={{ color: '#000', fontSize: 14 }}>{moment(pd.date).format("dddd")}</Text>
        </View>
        <Text style={{ color: '#000', fontSize: 18, fontWeight: '600', marginTop: 25 }}>{pd.groundtype.name}</Text>
        {pd.childs.map((c) => {
          return(
            <View style={{flexDirection:'row'}}>
        <Text style={{ color: '#000' }}>{c.from_time} - </Text>
        <Text style={{ color: '#000' }}>{c.to_time}</Text>
        </View>
          )
        })}
        <Text style={{ color: '#000' }}>{pd.groundtype.location}</Text>
      
        {/* <TouchableOpacity style={{ backgroundColor: '#758131', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5, marginTop: 20 }}><Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>BOOK AGAIN</Text></TouchableOpacity> */}
      </View>
    
   )
   ):      <View style={{height:'100%',justifyContent:'center',alignItems:'center',}}><Text style={{color:'#000' ,fontSize:24,fontWeight:'bold'}}>{data.length < 0 ? "Loading": 'No Records Found'}  </Text></View> }
     </ScrollView>


  </View>
);

const SecondTab = ({data}) => (
  <View style={{flex:1,backgroundColor:'#e5eac8',height:'100%'}}>
  
  <ScrollView> 
  
  {data && data.length > 0 ? data.map((pd) => (
         
          <View style={styles.card}>
          {/* <View style={{ position: 'absolute', right: '50%', top: -25, height: 60, width: 60, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', elevation: 8, alignItems: 'center' }}>
            <MaterialCommunityIcons name='block-helper' color='red' size={60} style={{position:'absolute',zIndex:1}} />
            <Image source={require('../../assets/ac.png')} style={{ width: 35, height: 35, borderRadius: 0 }} />
            </View> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#000', fontSize: 24 }}>{moment(pd.date).format("Do")}</Text>
              {/* <Text style={{ color: '#000' }}>{moment(pd.date).format("o")}</Text> */}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#80bc4b', fontSize: 16, fontWeight: '500', marginRight: 3 }}>₹</Text>
              <Text style={{ color: '#80bc4b', fontSize: 24, fontWeight: '700' }}>{pd.total_price}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <Text style={{ color: '#000', fontSize: 14 }}>{moment(pd.date).format("MMMM")} , </Text>
          <Text style={{ color: '#000', fontSize: 14 }}>{moment(pd.date).format("dddd")}</Text>
          </View>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '600', marginTop: 25 }}>{pd.groundtype.name}</Text>
          {pd.childs.map((c) => {
            return(
              <View style={{flexDirection:'row'}}>
          <Text style={{ color: '#000' }}>{c.from_time} - </Text>
          <Text style={{ color: '#000' }}>{c.to_time}</Text>
          </View>
            )
          })}
          <Text style={{ color: '#000' }}>{pd.groundtype.location}</Text>
        
          {/* <TouchableOpacity style={{ backgroundColor: '#758131', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5, marginTop: 20 }}><Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>BOOK AGAIN</Text></TouchableOpacity> */}
        </View>
      
     )
     ):      <View style={{height:'100%',justifyContent:'center',alignItems:'center',}}><Text style={{color:'#000' ,fontSize:24,fontWeight:'bold'}}>No Records Found</Text></View> }
       </ScrollView>
  
        
    </View>
);

const HistoryScreen = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [getLoading, setLoading] = useState(false);


  
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getPastBooking()
      getUpcomingBooking()
    });
    return unsubscribe;
  
  },[props])

  

  const renderTabBar = (props) => (
    <View style={{ backgroundColor: '#e5eac8', height: metrics.HEIGHT * 0.09, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', width: '90%', borderRadius: 10, alignSelf: 'center', overflow: 'hidden', borderWidth: 0.9, borderColor: '#b6c463' }}>
        {props.navigationState.routes.map((route, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              backgroundColor: activeTab === index ? '#b6c463' : '#fff',
              paddingVertical: 12,
              alignItems: 'center',
            }}
            onPress={() => setActiveTab(index)}
          >
            <Text style={{ color: activeTab === index ? '#fff' : '#97a63f', fontWeight: '600' }}>{route.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  const sceneMap = SceneMap({
    first: () => <FirstTab data={(upcomingBookings)} />,
    second: () => <SecondTab data={pastBookings} />,
  });

  const getPastBooking = async () => {
   
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .get(past_booking, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(async res => {
        if (res.data.success == 1) {
          console.log('data----',JSON.stringify(res.data.data,null,2));
          setPastBookings(res.data.data)
         
        } else {
          Toast.show(res.data.message);
        
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
       
      });
  }

  const getUpcomingBooking = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .get(upcoming_booking, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(async res => {
        if (res.data.success == 1) {
          setUpcomingBookings(res.data.data)
        } else {
          Toast.show(res.data.message);
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
      });
  }


  return (
    <><StatusBar backgroundColor='#e5eac8'  barStyle='light-content'/><TabView
      navigationState={{
        index: activeTab, routes: [
          { key: 'first', title: 'Upcoming Bookings' },
          { key: 'second', title: 'Past Bookings' },
        ]
      }}
      renderScene={sceneMap}
      renderTabBar={renderTabBar}
      onIndexChange={setActiveTab} /></>
  );

}

const styles = StyleSheet.create({
  card: {
    width: metrics.WIDTH * 0.94,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    alignSelf: 'center',
    elevation: 7,
    borderRadius: 10,
    marginBottom:20,
    padding: 20,
  },
})

export default HistoryScreen