import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';

const Location = () => {

    const user = firebase.auth().currentUser;

    return(
        <View style={Style.container}>
            <Text>Location</Text>
        </View>
    )
}

export default Location;