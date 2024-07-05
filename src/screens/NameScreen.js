import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import metrics from '../Utils/metrics'
import { TextInput } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ACCEPT_HEADER, login_api, verify_number } from '../Utils/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios';

const NameScreen = ({route,navigation}) => {

    const { mobile } = route.params;

    const [uname,setuName] = useState('')
    const [check_textInputChange,setCheck_textInputChange] = useState('')
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false);

    function login(uname) { 
        var formData = new FormData();
        formData.append('number', mobile);
        formData.append('name', uname);

        setLoading(true);

        axios
          .post(login_api, formData, {
            headers: {
              Accept: ACCEPT_HEADER,
            },
          })
          .then(async res => {
            console.log(res.data);
            if (res.data.success == 1) {
              // AsyncStorage.setItem("islogin", 'true')
              AsyncStorage.setItem('userId', JSON.stringify(res.data.id));
              AsyncStorage.setItem('mobile_no', mobile);
              AsyncStorage.setItem('user_name', uname);
              console.log(mobile);
              navigation.navigate('OtpScreen', {
                OTP: res.data.otp,
                mobile: mobile,
              });
            } else {
              Toast.show(res.data.message);
            }
            setLoading(false);

          })
          .catch(err => {
            setLoading(false);

            console.log('err', JSON.stringify(err, null, 2));
          });
      }

      const textInputChange = name => {
        if (name.length != 0) {
          setuName(name)
          setCheck_textInputChange(true)
        } else {
            setuName(name)
            setCheck_textInputChange(false)
        }
      };

      function checkName (uname) {
        if(uname===''){
            setError('Please Enter Your Name');
            console.log('true');
        }
        else{
            login(uname)
        }
    }

    return (
        <View style={{ backgroundColor: '#b6c463', flex: 1 }}>
            <StatusBar backgroundColor='#dce3b5' />

            <ScrollView>
                <View style={{height:metrics.HEIGHT*1.02}}>
            <View style={{ paddingHorizontal: 25,height:'45%' }}>
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center', paddingTop: 40 }}>Please Enter Your Name</Text>
                    <View style={[styles.card, styles.shadowProp]}>

                        <TextInput
                            mode='flat'
                            placeholder='Enter Your Name'
                            underlineColor='#fff'
                            activeUnderlineColor='#fff'
                            textColor='black'
                            selectionColor='#68ce35'
                            style={{ backgroundColor: 'white', }}
                            maxLength={10}
                            onChangeText={name => textInputChange(name)}
                        />
                    </View>
                    <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>


                    <TouchableOpacity style={{ borderWidth: 1, marginBottom: 20, borderColor: '#fff', marginTop: 40, borderRadius: 35, backgroundColor: '#fff', width: metrics.WIDTH * 0.4, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={() => checkName(uname)}>
                        {loading ? (
                                        <ActivityIndicator size={'small'} color={'#b6c463'} style={{paddingVertical:12}} />
                                    ) : (
                                      <><Text style={{ color: '#b6c463', paddingVertical: 12, textAlign: 'center', fontWeight: '800', fontSize: 20 }}>Login</Text><FontAwesome name='arrow-right' color='#b6c463' size={22} style={{ paddingTop: 15, paddingLeft: 20 }} /></>

                                    )}
                    </TouchableOpacity>
                </View>
                <View style={{ height:'10%', backgroundColor: '#cbd590' }}>
                    <Text style={{ color: '#6e773c', fontWeight: '900', fontSize: 32, textAlign: 'center', paddingVertical: 20 }}>CRICKFIT</Text>
                </View>

                {/* <Image source={require('../../assets/ball4.gif')} style={{  width:metrics.WIDTH*0.6,height:metrics.HEIGHT*0.2}}/> */}
                <View style={{ height:'45%' ,backgroundColor: '#dce3b5' }}>
                    <Image source={require('../../assets/name2.png')} style={{ height: metrics.HEIGHT * 0.4, width: metrics.WIDTH * 0.8, alignSelf: 'center', marginTop: 20 }} />
                </View>

                
</View>
                
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({

    card: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },


});
export default NameScreen