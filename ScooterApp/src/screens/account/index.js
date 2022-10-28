import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';

const Account = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fbsignup = async() => {
        const user = await firebase.auth().createUserWithEmailAndPassword(email,password);
    }

    return(
        <View style={Style.container}>
            
            <TextInput
                keyboardType='email'
                value={email} onChangeText={text => {setEmail(text)}}
                style={Style.input}
            />
            <TextInput
                keyboardType='default'
                secureTextEntry={true}
                value={password} onChangeText={text => {setPassword(text)}}
                style={Style.input}
            />
            <TouchableOpacity style={Style.btn} onPress={fbsignup}>
                <Text style={Style.btn_text}>Signup</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Account;