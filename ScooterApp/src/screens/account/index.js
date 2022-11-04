import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';

const Account = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [changeView, setChangeView] = useState(true);
    const [btnContent, setBtnContent] = useState('New? create new account');
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        if (errorMsg) {
            Alert.alert('Authentication',errorMsg);
        }
    },[errorMsg])
 
    const fbsignup = async() => {
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email,password);
        } catch (error) {
            setErrorMsg(error.message);
        }
    }

    const fblogin = async() => {
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email,password);
        } catch (error) {
            setErrorMsg(error.message);
        }
    }

    const changeViewAction = () => {
        setChangeView(!changeView)
        changeView ? (setBtnContent('Return to login')) : (setBtnContent('New? create new account'))
    }

    return(
        <View style={Style.container}>

            {
                changeView ? (
                    <View style={{width:'100%'}}>
                    <Text style={Style.title}>Login</Text>
                    <TextInput
                        placeholder='Email'
                        keyboardType='email'
                        value={email} onChangeText={text => {setEmail(text)}}
                        style={Style.input}/>
                    <TextInput
                        placeholder='Password'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={password} onChangeText={text => {setPassword(text)}}
                        style={Style.input}/>
                    <TouchableOpacity style={Style.logout_btn} onPress={fblogin}>
                        <Text style={Style.btn_text}>Login</Text>
                    </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{width:'100%'}}>
                    <Text style={Style.title}>Create new account</Text>
                    <TextInput
                        placeholder='Email'
                        keyboardType='email'
                        value={email} onChangeText={text => {setEmail(text)}}
                        style={Style.input}/>
                    <TextInput
                        placeholder='Password'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={password} onChangeText={text => {setPassword(text)}}
                        style={Style.input}/>
                    <TouchableOpacity style={Style.logout_btn} onPress={fbsignup}>
                        <Text style={Style.btn_text}>Signup</Text>
                    </TouchableOpacity>
                    </View>
                )
            }


            <TouchableOpacity onPress={changeViewAction} style={Style.newaacount}>
                <Text>{btnContent}</Text>
            </TouchableOpacity>





        </View>
    )
}

export default Account;