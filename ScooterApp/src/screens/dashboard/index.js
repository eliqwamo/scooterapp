import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppColors from '../../utilis/AppColors.js';

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

export const screenOptions = navData => {
    return {
        headerTitle: 'Welcome',
        headerShown: true,
        headerRight: () => (<Ionicons onPress={() => 
            {Alert.alert('This is working well!')}} 
            color={AppColors.white} name="settings-sharp" size={28} />)
    }
}


export default Dashboard;