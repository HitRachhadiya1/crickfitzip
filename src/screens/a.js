import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native-animatable'
import { SharedElement } from 'react-navigation-shared-element'
import metrics from '../Utils/metrics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ACCEPT_HEADER, get_groundtype } from '../Utils/const'
import axios from 'axios'
import SimpleToast from 'react-native-simple-toast'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const a = ({ navigation }) => {

    const [grounds, setGrounds] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGround()
        });
        return unsubscribe;
    }, [navigation])



    const getGround = async () => {
        var token = await AsyncStorage.getItem('token');
        axios
            .get(get_groundtype, {
                headers: {
                    Accept: ACCEPT_HEADER,
                    Authorization: 'Bearer ' + JSON.parse(token),
                },
            })
            .then(async res => {
                if (res.data.success == 1) {
                    setGrounds(res.data.data);
                    // AsyncStorage.setItem("islogin", 'true')
                } else {
                    SimpleToast.show(res.data.message);
                }
            })
            .catch(err => {
                console.log('err', JSON.stringify(err, null, 2));
            });
    }

    return (
        <View>
            {grounds && grounds.length > 0 ? grounds.map((ground, index) => (
                <TouchableOpacity activeOpacity={0.9} key={ground.id} onPress={() => {
                    navigation.navigate('b', {
                        ground: ground,
                        id: ground.id
                    })
                }}
                style={styles.card} 
                >
                    <SharedElement id={`item.${ground.id}.image`}>
                        <Image source={{ uri: ground.image_path }} style={styles.image} />
                    </SharedElement>
                    <View style={styles.card2} >
                <Text style={styles.gtitle}>{ground.name}</Text>
                <View style={styles.detailView}>
                  <MaterialIcons name='access-time' size={22} color='#000' style={{ marginRight: 10 }} /><Text style={{ color: 'black' }}>{ground.time}</Text>
                </View>
                <View style={styles.detailView}>
                  <MaterialIcons name='location-pin' size={22} color='#000' style={{ marginRight: 10 }} /><Text style={{ color: 'black' }}>{ground.location}</Text>
                </View>

              </View>
                </TouchableOpacity>
            )) : <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Image source={require('../../assets/loading2.gif')} style={{ height: '10%', width: '20%' }} />
          </View>}
        </View>
    )
}

export default a

const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    card: {
      width: metrics.WIDTH * 0.94,
      backgroundColor: '#e5eac8',
      marginVertical: 3,
      shadowColor: "#000",
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      alignSelf: 'center',
      elevation: 7,
      marginBottom: 20
    },
    card2: {
      backgroundColor: '#e5eac8',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      alignSelf: 'center',
      elevation: 2,
      padding: 15,
      width: metrics.WIDTH * 0.94, alignSelf: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
    },
    image: {
      height: metrics.HEIGHT * 0.285,
      width: metrics.WIDTH * 0.88,
      alignSelf: 'center',
      marginVertical: 10,
      borderRadius: 6
    },
    container: {
      height: metrics.HEIGHT * 0.065, overflow: 'hidden',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      borderRadius: 10
    },
    image2: {
      height: metrics.HEIGHT * 0.25,
      width: metrics.WIDTH * 0.88,
      alignSelf: 'center',
      borderRadius: 10,
      position: 'absolute',
      bottom: 0,
      justifyContent: 'flex-end'
    },
    gtitle: {
      color: '#000',
      fontSize: 17,
      marginBottom: 10,
      fontWeight: '900'
    },
    dtxt: {
      color: 'white',
      fontSize: 14,
      marginLeft: 10,
      marginBottom: 5,
      fontWeight: '600'
    },
    detailView: {
      flexDirection: 'row',
      marginVertical: 5,
      width: metrics.WIDTH * 0.71,
    },
    btn: {
      backgroundColor: '#758131',
      width: metrics.WIDTH * 0.3,
      borderRadius: 5,
      marginTop: 8,
      marginBottom: 10,
      marginLeft: 10
    },
    btntxt: {
      color: '#fff',
      fontSize: 15,
      alignSelf: 'center',
      paddingVertical: 5,
      fontWeight: 'bold'
    }
  });
  