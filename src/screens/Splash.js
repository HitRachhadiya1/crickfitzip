import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import metrics from '../Utils/metrics';

export default function Splash({navigation}) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 3600);

    return () => clearTimeout(timeout);
  }, []); 

  return (

   
    <View style={styles.splash}>
       <StatusBar backgroundColor='#fff' />
      <LottieView
        source={require('../../assets/initiativeCompany.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
      />
      {/* <Animatable.View animation="fadeInDown" delay={3200}>
                <Image source={require('../../assets/logo_image.png')} />
            </Animatable.View> */}
   <Image style={{height:metrics.HEIGHT*0.5,width:metrics.WIDTH*1}}  source={require('../../assets/ab.gif')} />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent:'flex-end',
    alignItems: 'flex-end',
    margin: 0,
  },
});
