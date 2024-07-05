import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import metrics from '../Utils/metrics'
import { TextInput } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ACCEPT_HEADER, login_api, verify_number } from '../Utils/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios';

const LoginScreen = ({ navigation }) => {

    useEffect( () => {
         checklogin();
      }, []);
    
      const checklogin = async () => {
        var islogins = await AsyncStorage.getItem('islogin');
        if (islogins === 'true') {
          navigation.replace('Homee');
          AsyncStorage.setItem('verify', 'succ');
        } else {
          AsyncStorage.setItem('verify', 'succ1');
          //  props.navigation.replace("WelcomeScreen")
        }
      };

    const [mobile,setMobile] = useState('')
    const [check_textInputChange,setCheck_textInputChange] = useState('')
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false);



    function checkMobile (mobileno) {
        if(mobileno===''){
            setError('Please Enter Mobile Number');
            console.log('true');
        }
        else{
            if(mobileno<10){
                setError('Please Enter Valid Mobile Number')
            }
            else{
              verifyNumber(mobileno)
            }
        }
    }

    function login(mobileno) {
        var formData = new FormData();
        formData.append('number', mobileno);
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
              AsyncStorage.setItem('mobile_no', mobileno);
              console.log(mobileno);
              navigation.navigate('OtpScreen', {
                OTP: res.data.otp,
                mobile: mobileno,
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

      function verifyNumber(mobileno) {
        var formData = new FormData();
        formData.append('number', mobileno);
        setLoading(true);

        axios
          .post(verify_number, formData, {
            headers: {
              Accept: ACCEPT_HEADER,
            },
          })
          .then(async res => {
            console.log(res.data);
            if (res.data.success == 1) {
              // AsyncStorage.setItem("islogin", 'true')
              AsyncStorage.setItem('userId', JSON.stringify(res.data.id));
              AsyncStorage.setItem('mobile_no', mobileno);
              console.log(mobileno);
              navigation.navigate('OtpScreen', {
                OTP: res.data.otp,
                mobile: mobileno,
              });
            } else {
              navigation.navigate('NameScreen', {
                OTP: res.data.otp,
                mobile: mobileno,
              });
            }
            setLoading(false);

          })
          .catch(err => {
            setLoading(false);

            console.log('err', JSON.stringify(err, null, 2));
          });
      }

    const textInputChange = no => {
        if (no.length > 0) {
          setMobile(no)
          setCheck_textInputChange(true)
        } else {
            setMobile(no)
            setCheck_textInputChange(false)
        }
      };

    return (
        <View style={{ backgroundColor: '#b6c463', flex: 1 }}>
            <StatusBar backgroundColor='#dce3b5' />

<ScrollView>

            {/* <Image source={require('../../assets/ball4.gif')} style={{  width:metrics.WIDTH*0.6,height:metrics.HEIGHT*0.2}}/> */}
            <Animatable.View animation='fadeInUp' style={{ flex: 0.4, backgroundColor: '#dce3b5' }}>
                <Image source={require('../../assets/batsman2.png')} style={{ height: metrics.HEIGHT * 0.35, width: metrics.WIDTH * 0.5, alignSelf: 'center', marginTop: 20 }} />
            </Animatable.View>

            <Animatable.View animation='fadeInUp' style={{ flex: 0.1, backgroundColor: '#cbd590' }}>
                <Text style={{ color: '#6e773c', fontWeight: '900', fontSize: 32, textAlign: 'center', paddingVertical: 20 }}>CRICKFIT</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={{ paddingHorizontal: 25, flex: 0.5 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center', paddingTop: 40 }}>Please Enter Your Phone Number</Text>
                <Text style={{ color: '#fff', fontSize: 17, fontWeight: '400', textAlign: 'center', paddingTop: 10 }}>We will send you 4 digit code for verification</Text>
                <View style={[styles.card, styles.shadowProp]}>

                    <TextInput
                        mode='flat'
                        placeholder='Enter Your Phone Number'
                        underlineColor='#fff'
                        keyboardType='number-pad'
                        activeUnderlineColor='#fff'
                        textColor='black'
                        selectionColor='#68ce35'
                        style={{ backgroundColor: 'white', }}
                        maxLength={10}
                        onChangeText={no => textInputChange(no)}
                    />
                </View>
                <Text style={{color:'red',textAlign:'center'}}>{error}</Text>

                
                <TouchableOpacity style={{ borderWidth: 1,marginBottom:20, borderColor: '#fff', marginTop: 40, borderRadius: 35, backgroundColor: '#fff', width: metrics.WIDTH * 0.4, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={() => {
                       checkMobile(mobile)
                        } }>
                    {loading ? (
                                        <ActivityIndicator size={'small'} color={'#b6c463'} style={{paddingVertical:12}} />
                                    ) : (
                                      <><Text style={{ color: '#b6c463', paddingVertical: 12, textAlign: 'center', fontWeight: '800', fontSize: 20 }}>Login</Text><FontAwesome name='arrow-right' color='#b6c463' size={22} style={{ paddingTop: 15, paddingLeft: 20 }} /></>

                                    )}
                </TouchableOpacity>
            </Animatable.View>
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
export default LoginScreen