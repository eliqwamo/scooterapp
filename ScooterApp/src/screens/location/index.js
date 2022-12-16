import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';
import * as LocationAccount from 'expo-location';

const Location = () => {

    const user = firebase.auth().currentUser;

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          
          let { status } = await LocationAccount.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let _location = await LocationAccount.getCurrentPositionAsync({});
          setLocation(_location.coords);

        })();
      }, []);
    

      console.log(JSON.stringify(location));

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        requestData(location);
      }


      const requestData = async(location) => {
        const url = 'http://10.100.6.1:3001/api/account/getDevices';
        const request = await fetch(url,{
            method:'get',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              latitude: location.latitude,
              longtitude: location.longtitude,
              limit: 500
            })
        })

        const data = await request.json();
        if(data.status){
          console.log(data);
        } else {
          Alert.alert('No data for you');
        }
      }


    return(
        <View style={Style.container}>
            <Text>{text}</Text>
        </View>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Location'
    }
}

export default Location;