import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native-animatable'
import LottieContainer, {LottieContainerProps,} from '../components/LottieContainer';

const animations: LottieContainerProps[] = [
  {
    name: 'Sucess',
    source: 'https://lottiefiles.com/782-check-mark-success',
    author: 'Travis Gregory',
    path: require('../../assets/success.json'),
  },
];




const SuccessScreen = ({navigation}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Homee');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []); 

  return (
    <View style={{justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
      {animations.map((animation, index) => (
          <LottieContainer key={index} {...animation} />
        ))}
        <Text style={{color:'#000',fontSize:24}}>Booking Successfull</Text>
    </View>
  )
}

export default SuccessScreen