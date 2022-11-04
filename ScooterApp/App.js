import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Account from './src/screens/account';
import Dashboard from './src/screens/dashboard';
import firebase from './src/utilis/firebase.js';

import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './src/navigation'

export default function App() {

  const [isAuth, setIsAuth] = useState(false);
  if (firebase.apps.length) {
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuth(!!user);
    })
  }

  return (
    <NavigationContainer>
    <View style={{flex:1}}>
      {
        isAuth ?
          (
            <TabNavigator />
          )
          :
          (
            <Account />
          )
      }
    </View>
    </NavigationContainer>
  );
}
