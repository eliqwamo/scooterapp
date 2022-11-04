import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Account from './src/screens/account';
import Dashboard from './src/screens/dashboard';
import firebase from './src/utilis/firebase.js';

export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  if (firebase.apps.length) {
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuth(!!user);
    })
  }

  return (
    <View style={{flex:1}}>
      {
        isAuth ?
          (
            <Dashboard />
          )
          :
          (
            <Account />
          )
      }
    </View>
  );
}
