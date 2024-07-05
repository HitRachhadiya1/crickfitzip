import { View, Text ,Image} from 'react-native'
import React from 'react'
import { SharedElement } from 'react-navigation-shared-element'
import metrics from '../Utils/metrics'

const b = ({route}) => {

    const { ground,id } = route.params;

  return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        <SharedElement id={`item.${ground.id}.image`}>
       <Image source={{ uri: ground.image_path }} style={{ width: metrics.WIDTH * 1, height: metrics.HEIGHT * 0.33 }}  />
       </SharedElement>
    </View>
  )
}

export default b