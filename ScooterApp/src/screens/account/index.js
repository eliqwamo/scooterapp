import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Style from './style.js';
import firebase from '../../utilis/firebase.js';
import AppColors from '../../utilis/AppColors.js';

const Account = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [changeView, setChangeView] = useState(true);
    const [btnContent, setBtnContent] = useState('New? create new account');
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (errorMsg) {
            Alert.alert('Authentication',errorMsg);
        }
    },[errorMsg])
 
    const fbsignup = async() => {
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email,password);
            //TODO
            const api = 'http://10.100.6.1:3001/api/account/signup';
            const action = fetch(api, {
                method:'post',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({
                    fbid: user.uid,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });

            const response = await action.json();
            if(response.status){
                setErrorMsg(response.message);
            } else {
                setErrorMsg(response.message);
            }
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
                        placeholder='First Name'
                        keyboardType='default'
                        value={firstName} onChangeText={text => {setFirstName(text)}}
                        style={Style.input}/>

                    <TextInput
                        placeholder='Last Name'
                        keyboardType='default'
                        value={lastName} onChangeText={text => {setLastName(text)}}
                        style={Style.input}/>



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


                    {
                        isLoading ? (
                            <ActivityIndicator size='large' color={AppColors.green} />
                        )
                        : 
                        (
                            <TouchableOpacity style={Style.logout_btn} onPress={fbsignup}>
                                <Text style={Style.btn_text}>Signup</Text>
                            </TouchableOpacity>
                        )
                    }



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