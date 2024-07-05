import { View, Text, TouchableOpacity, Image, StatusBar, useWindowDimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import metrics from '../Utils/metrics'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RenderHtml from 'react-native-render-html';
import { SharedElement } from 'react-navigation-shared-element'
import * as Animatable from 'react-native-animatable';
import MapView from 'react-native-maps';

const DetailScreen = ({ route, navigation }) => {

  const { ground, id } = route.params;
  const windowWidth = useWindowDimensions().width;

  const [dground, setDground] = useState({});

  useEffect(() => {
    setDground(ground);
    console.log('--------', id);
  }, [])

  const source = {
    html: ground.description
  };

  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
        <StatusBar backgroundColor={'#fff'} />
        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#fff', width: 40, height: 40, borderRadius: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 10, top: 15, zIndex: 11 }}>
            <Ionicons name='arrow-back' size={30} color='#000' />
          </TouchableOpacity>

          <SharedElement id={`item.${ground.id}.image`}  >
            <Image source={{ uri: ground.image_path }} style={{ width: metrics.WIDTH * 1, height: metrics.HEIGHT * 0.327 }} />
          </SharedElement>
          
        </View>
        <Animatable.View style={{ paddingHorizontal: 20, paddingVertical: 15 }} animation='zoomIn'>
          <Text style={{ color: '#545c23', fontSize: 22, fontWeight: '900', marginBottom: 10 }}>{ground.name}</Text>
          <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
            <MaterialIcons name='access-time' size={22} color='#000' style={{ marginRight: 10 }} /><Text style={{ color: 'black' }}>{ground.time}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
            <MaterialIcons name='location-pin' size={22} color='#000' style={{ marginRight: 10 }} /><Text style={{ color: 'black', width: '96%' }}>{ground.location}</Text>
          </View>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '500', paddingVertical: 5 }}>About Venue</Text>
          <RenderHtml
            tagsStyles={{
              body: {
                color: '#000',
              }
            }}
            contentWidth={windowWidth}
            source={source}
          />
          <Text style={{ color: '#000', fontSize: 18, fontWeight: '500', paddingVertical: 10 }}>Map</Text>
          <View
            style={{
              height: metrics.HEIGHT * 0.3,
            }}
          >
            <MapView
              style={{ flex: 1, marginTop: 0, height: 420, marginBottom: 20 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>

        </Animatable.View>

      </ScrollView>

      <Animatable.View animation='pulse' delay={1000} iterationCount={2} >
        <TouchableOpacity style={{ backgroundColor: '#656f2a', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 25, alignSelf: 'center', borderRadius: 3 }} onPress={() => navigation.navigate('BookingScreen', {
          ground_type: ground.id,
        })} >
          <Text style={{ color: '#fff', textAlign: 'center', paddingVertical: 9, fontSize: 19, fontWeight: '700' }}>Book Now</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

export default DetailScreen;
