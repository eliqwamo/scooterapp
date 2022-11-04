import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';

const Dashboard = () => {

    const user = firebase.auth().currentUser;


    const logout = () => {
        firebase.auth().signOut();
    }

    return(
        <View style={Style.container}>
            <Text>Hello {user.email}</Text>
            <TouchableOpacity style={Style.logout_btn} onPress={logout}>
                <Text style={Style.logout_text}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Dashboard;