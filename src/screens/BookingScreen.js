import { View, Text, StatusBar, Button, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import metrics from '../Utils/metrics'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import DatePicker from 'react-native-date-picker'
import axios from 'axios'
import { ACCEPT_HEADER, get_slot, place_order } from '../Utils/const'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

const BookingScreen = ({ route, navigation }) => {

  const { ground_type } = route.params;

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectdate, setSelectDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const [selectedSlotIds, setSelectedSlotIds] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);


  useEffect(() => {
    console.log(ground_type);
  })

  const handleOptionToggle = (optionId, price) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
    if (selectedSlotIds.includes(optionId)) {
      setSelectedSlotIds(selectedSlotIds.filter((id) => id !== optionId));
      setSelectedPrices(selectedPrices.filter((p) => p !== price));
    } else {
      setSelectedSlotIds([...selectedSlotIds, optionId]);
      setSelectedPrices([...selectedPrices, price]);
    }
    console.log(selectedSlotIds, selectedPrices);
  };
  // const calculateTotalAmount = () => {
  //   let totalAmount = 0;
  //   selectedOptions.forEach((optionId) => {
  //     const option = slots.find((option) => option.id === optionId);
  //     if (option) {
  //       totalAmount += Number(option.amount);
  //     }
  //   });
  //   return totalAmount;
  // };

  useEffect(() => {
    console.log(selectedOptions);
  })

  const getSlot = async () => {
    setIsLoading(true)
    var token = await AsyncStorage.getItem('token');
    var formData = new FormData();
    formData.append('date', moment(date).format('YYYY-MM-DD'));
    formData.append('ground_type', ground_type);

    axios
      .post(get_slot, formData, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(async res => {
        console.log(res.data);
        if (res.data.success == 1) {
          setSlots(res.data.data)
        } else {
          Toast.show(res.data.message);
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
        setIsLoading(false)
      });
      setIsLoading(false)
  }

  const placeOpder = async () => {
    
    var token = await AsyncStorage.getItem('token');
    var formData = new FormData();
    formData.append('date', moment(date).format('YYYY-MM-DD'));
    formData.append('ground_type', ground_type);
    // {selectedSlotIds.map((ids,ind) => {
    //   formData.append(`id${ind}`,ids)
    // })}
    for (let i = 0; i < selectedSlotIds.length; i++) {
      formData.append('id[' + i + ']', selectedSlotIds[i])
    }
    for (let i = 0; i < selectedPrices.length; i++) {
      formData.append('price[' + i + ']', selectedPrices[i])
    }

    // {selectedPrices.map((ids,ind) => {
    //   formData.append(`price${[ind]}`,ids)
    // })}

    axios
      .post(place_order, formData, {
        headers: {
          Accept: ACCEPT_HEADER,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      })
      .then(async res => {
        console.log('getslot----', res.data);
        if (res.data.success == 1) {
          setSlots(res.data.data)
          navigation.navigate('SuccessScreen')

        } else {
          Toast.show(res.data.message);
          console.log('-----');
        }
      })
      .catch(err => {
        console.log('err', JSON.stringify(err, null, 2));
      });
  }

  return (
    <View style={{ height: '100%' }}>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <StatusBar backgroundColor='#b6c463' />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back' color='#fff' size={28} style={{ marginVertical: 6, marginHorizontal: 5 }} />
          </TouchableOpacity>
          <Text style={styles.title}>Book Now</Text>
        </View>
        <View style={styles.datepicker}>
          <DatePicker
            modal
            mode='date'
            open={open}
            minimumDate={new Date()}
            date={date}
            onConfirm={(selectedDate) => {
              setOpen(false)
              setDate(selectedDate)
              getSlot(date)
              setSelectDate(true)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
          {selectdate == true ?

            <View style={styles.dateView}>
              <Fontisto name='date' size={16} color='#000' style={{ marginLeft: 15 }} />
              <Text style={styles.datetxt}>{moment(date).format('YYYY-MM-DD')}</Text>
            </View>
            : null}

          <TouchableOpacity onPress={() => {
            setOpen(true)
           
          }} style={styles.btn}>
            <Text style={styles.btntxt}>Select Date</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.slotmain}>
          <Text style={{ color: '#000', fontSize: 22, fontWeight: '700' }}>Available Slots</Text>
          <View style={styles.slotView}>
            {slots && slots.length > 0 ? slots.map((option) => {
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleOptionToggle(option.id, option.amount)}
                  style={{
                    borderWidth: 0.7,
                    borderColor: '#758131',
                    backgroundColor: selectedOptions.includes(option.id) ? '#dce3b5' : 'white',
                    width: '48%',
                    padding: 14,
                    paddingHorizontal: 20,
                    marginBottom: 10,
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 2,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.slotttxt}>From : </Text><Text style={styles.slottxt}>{option.from_time}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.slotttxt}>To : </Text><Text style={styles.slottxt}>{option.to_time}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.slotttxt}>Amount : </Text><Text style={styles.slottxt}>{option.amount}</Text>
                  </View>
                </TouchableOpacity>
              )
            }) : 
            <View>
              {isLoading ? <ActivityIndicator size={30}/> : <Text style={{ color: '#000' }}>Please Select Date...</Text>}
              
            </View>
            }
          </View>
        </View>

      </ScrollView>
      {selectedOptions.length == 0 ? null : <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 25, alignSelf: 'center', width: '100%' }}>
        {/* <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <Text style={styles.slotttxt}>Total amount : </Text><Text style={styles.slottxt}>{calculateTotalAmount()}</Text>
        </View> */}
        <TouchableOpacity style={{ backgroundColor: '#b6c463', width: '90%', borderRadius: 3 }} onPress={() => {
          placeOpder()

        }} >
          <Text style={{ color: '#fff', textAlign: 'center', paddingVertical: 9, fontSize: 17, fontWeight: '500' }}>Next</Text>
        </TouchableOpacity>
      </View>}

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: metrics.HEIGHT * 0.055,
    backgroundColor: '#b6c463',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 5,
    alignItems: 'center',
    marginLeft:10
  },
  datepicker: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  dateView: {
    borderWidth: 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, marginHorizontal: 23
  },
  datetxt: {
    color: '#000',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  btn: {
    backgroundColor: '#656f2a',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btntxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10
  },
  slotcontainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: 30,
    width: '90%'
  },
  slotmain: {
    width: '90%',
    display: 'flex',
    alignItems: 'flex-start',
    marginHorizontal: '5%',
    marginVertical: 20,
    justifyContent: 'flex-start',
    gap: 10,
  },
  slotView: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%'
  },
  slottxt: {
    color: '#000'
  },
  slotttxt: {
    color: '#000',
    fontWeight: 'bold'
  }
})

export default BookingScreen
