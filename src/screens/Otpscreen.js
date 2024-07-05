import { View, Text, SafeAreaView, ScrollView, StatusBar, Image, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import metrics from '../Utils/metrics';
import { ACCEPT_HEADER, otp_api } from '../Utils/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-simple-toast'



const Otpscreen = ({navigation}) => {
    const firstInput = useRef(null);
    const secondInput = useRef(null);
    const thirdInput = useRef(null);
    const fourthInput = useRef(null);

    const [first, setFirstValue] = useState('');
    const [second, setSecondValue] = useState('');
    const [third, setThirsdValue] = useState('');
    const [fourth, setFourthValue] = useState('');

    const [otp, setOTP] = useState('');
    const [loading, setLoading] = useState(false);
    const [mobile_number, setMobileNumber] = useState('');
    const [token, setToken] = useState();

    const verifyOTP = async () => {
        const otp_user = first + '' + second + '' + third + '' + fourth;
        if (otp_user.length < 4) {
          Toast.show('Please enter valid otp');
          return;
        }
        var mobile = await AsyncStorage.getItem('mobile_no');
        console.log('------token ', mobile);
    
        const formData = new FormData();
        formData.append('otp', otp_user);
        formData.append('number', mobile);
        console.log('formdata : ', formData);
        setLoading(true);
        try {
          await axios
            .post(otp_api, formData, {
              headers: {
                Accept: ACCEPT_HEADER,
                // Authorization: 'Bearer ' + JSON.parse(Token),
              },
            })
            .then(res => {
              console.log('-------', res.data);
              if (res.data.success == 1) {
                // AsyncStorage.setItem("token", JSON.stringify(res.data.data.token))
                AsyncStorage.setItem('islogin', 'true');
                AsyncStorage.setItem('userId', JSON.stringify(res.data.data.id));
                AsyncStorage.setItem('token', JSON.stringify(res.data.token));

                navigation.replace('Homee');

                // props.navigation.pop(2)
              } else {
                Toast.show(res.data.message);
              }
              setLoading(false);
            });
        } catch (error) {
          setLoading(false);
        }
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#b6c463' }}>
            <ScrollView>
                <View style={styles.container}>
                    <StatusBar backgroundColor={'#b6c463'} barStyle="light-content" />
                    <View animation="fadeInUpBig" style={styles.header}>
                        <Image
                            source={require('../../assets/wicket.png')}
                            style={{ height: metrics.HEIGHT*0.4, width: metrics.WIDTH*0.7, borderRadius: 50 }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.footer}>
                        <View animation="fadeInUpBig">
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 20,
                                    marginBottom: 10,
                                    paddingHorizontal: 20,
                                    alignItems: 'center',
                                    fontWeight: '500',
                                }}>
                                {/* Please enter the OTP sent via SMS on {mobile_number} */}
                                We sent OTP code to verify your number
                            </Text>
                            {/* <Text style={styles.text_footer}>OTP * </Text> */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    marginTop: 20,
                                }}>
                                <View style={styles.cardShadow}>
                                    <View style={styles.cardContainer}>
                                        <View
                                            style={{
                                                height: 45,
                                                width: 45,
                                                borderRadius: 2,
                                                borderColor: '#000',
                                            }}>
                                            <TextInput
                                                ref={firstInput}
                                                style={styles.textOtp}
                                                keyboardType="number-pad"
                                                returnKeyType="next"
                                                maxLength={1}
                                                onSubmitEditing={() => secondInput.current.focus()}
                                                blurOnSubmit={false}
                                                value={first}
                                                onChangeText={async value => {
                                                    await setFirstValue(value);
                                                    if (value) secondInput.current.focus();
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cardShadow}>
                                    <View style={styles.cardContainer}>
                                        <View
                                            style={{
                                                height: 45,
                                                width: 45,
                                                borderRadius: 2,
                                                borderColor: '#000',
                                            }}>
                                            <TextInput
                                                ref={secondInput}
                                                style={styles.textOtp}
                                                keyboardType="number-pad"
                                                returnKeyType="next"
                                                maxLength={1}
                                                value={second}
                                                onSubmitEditing={() => {
                                                    thirdInput.current.focus();
                                                }}
                                                blurOnSubmit={false}
                                                onChangeText={value => {
                                                    setSecondValue(value);
                                                    if (value) thirdInput.current.focus();
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cardShadow}>
                                    <View style={styles.cardContainer}>
                                        <View
                                            style={{
                                                height: 45,
                                                width: 45,
                                                borderRadius: 2,
                                                borderColor: '#000',
                                            }}>
                                            <TextInput
                                                ref={thirdInput}
                                                style={styles.textOtp}
                                                keyboardType="number-pad"
                                                returnKeyType="next"
                                                maxLength={1}
                                                value={third}
                                                onSubmitEditing={() => {
                                                    fourthInput.current.focus();
                                                }}
                                                blurOnSubmit={false}
                                                onChangeText={value => {
                                                    setThirsdValue(value);
                                                    if (value) fourthInput.current.focus();
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cardShadow}>
                                    <View style={styles.cardContainer}>
                                        <View
                                            style={{
                                                height: 45,
                                                width: 45,
                                                borderRadius: 2,
                                                borderColor: '#000',
                                            }}>
                                            <TextInput
                                                ref={fourthInput}
                                                style={styles.textOtp}
                                                keyboardType="number-pad"
                                                returnKeyType="done"
                                                maxLength={1}
                                                value={fourth}
                                                // blurOnSubmit={false}
                                                onSubmitEditing={() => verifyOTP()}
                                                onChangeText={value => {
                                                    setFourthValue(value);
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => verifyOTP()}
                            >
                                    {loading ? (
                                        <ActivityIndicator size={'small'} color={'#b6c463'} />
                                    ) : (
                                        <Text style={[styles.textSign, { color: '#b6c463' }]}>
                                            Verify
                                        </Text>
                                    )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b6c463',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        alignItems: 'center',
        marginTop: 50,
    },
    footer: {
        flex: 3,
        paddingHorizontal: 20,
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: '#000',
        fontSize: 18,
        marginBottom: '5%',
        marginTop: '5%',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#000',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: metrics.HEIGHT*0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 75,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textOtp: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000',
    },
    cardShadow: {
        borderRadius: 10,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 3,
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});

export default Otpscreen