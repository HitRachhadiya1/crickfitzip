import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProfileScreen = ({ navigation }) => {

  const [mobile, setMobile] = useState('');
  const [islogin, setIsLogin] = useState(true);

  useEffect(() => {
    
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    });
    return unsubscribe;
  }, [[navigation]])

  const getData = async () => {
    const mobile_no = await AsyncStorage.getItem('mobile_no');
    const is_login = await AsyncStorage.getItem('islogin');
    setIsLogin(is_login);
    setMobile(mobile_no);
   
  }


  const onLogout = async () => {
    AsyncStorage.clear()
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('islogin');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('verify');
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
      <View style={{ backgroundColor: '#d3dca3', flex: 0.4, width: '100%', height: '100%', alignItems: 'center',borderBottomLeftRadius:100,borderBottomRightRadius:100 }}>
        {/* <Ionicons name='md-person-circle-outline' size={200} color='#656f2a'/> */}
        <View style={{ borderRadius: 200, overflow: 'hidden', width: 200, height: 200, marginTop: 190, borderColor: '#97a63f', borderWidth: 3,alignItems:'center',justifyContent:'center',padding:10,backgroundColor:'#fff' }}>
          <Image source={require('../../assets/batsman3.png')} style={{ width: '90%', height: '90%' }} resizeMode='contain' />
        </View>      
        <Text style={{ color: '#656f2a', fontSize: 20, marginTop: 30, fontWeight: '700' }}>{mobile}</Text>

      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onLogout()} style={{ position: 'absolute', top: 150, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderColor: '#656f2a', marginTop: 80, borderWidth: 1, borderRadius: 10, paddingVertical: 9, backgroundColor: '#000eef1da', paddingHorizontal: 25, width: '50%' }}>
          <Text style={{ color: '#656f2a', fontSize: 20, fontWeight: '500', marginRight: 20 }}>Logout</Text>
          <MaterialCommunityIcons name='logout' size={25} color='#656f2a' />

        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen