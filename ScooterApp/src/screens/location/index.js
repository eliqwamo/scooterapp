import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, 
  ActivityIndicator, TextInput, Alert } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';
import * as LocationAccount from 'expo-location';
import Colors from '../../utilis/AppColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Device from './Device.js';

const Location = () => {

    const user = firebase.auth().currentUser;

    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [token, setToken] = useState(null);
    const [devicesList, setDevicesList] = useState([]);

    const setMyData = useCallback(async () => {
        try {
            const data = await AsyncStorage.getItem('Account');
            if(data){
                const parseData = JSON.parse(data);
                setToken(parseData.token);
            } else {
                console.log('User is not exist');
            }
        } catch (error) {
            console.log(error);
        }
    },[token]);

    useEffect(() => {
        setMyData()
    },[setMyData]);



    const requestData = async(location) => {

      const url = 'http://10.100.6.1:3001/api/account/getDevices';
      const request = await fetch(url,{
          method:'post',
          headers: {
              'Content-Type' : 'application/json',
              'Authorization' : `Bearer ${token}`
          },
          body: JSON.stringify({
            latitude: '31.25052751524955',
            longtitude: '34.79164329355345',
            limit: 500
          })
      })
      const data = await request.json();
      if(data.status){
        setDevicesList(data.devices);
      } else {

        Alert.alert('No data for you');
      }
    }
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
    

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        requestData(location);
      }





    return(
        <View style={Style.container}>
            {
              isLoading ? 
              (
                <ActivityIndicator size='large' color={Colors.purple} />
              ) 
              : 
              (
                <FlatList style={{width:'100%'}}
                  data={devicesList}
                  keyExtractor={item => item.device._id}
                  renderItem={rowItem => <Device device={rowItem.item} />}
                />
              )
            }
        </View>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: 'Location'
    }
}

export default Location;