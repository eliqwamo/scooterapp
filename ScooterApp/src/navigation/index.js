import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AppColors from '../utilis/AppColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

//SCREEN
import Dashboard from "../screens/dashboard";
import Location from "../screens/location";
import Profile from "../screens/profile";
import Social from "../screens/social";

const DashboardNavigation = createNativeStackNavigator();
export const DashboardStack = () => {
    return(
        <DashboardNavigation.Navigator>
            <DashboardNavigation.Screen name="dashboard" component={Dashboard} />
        </DashboardNavigation.Navigator>
    )
}

const LocationNavigation = createNativeStackNavigator();
export const LocationStack = () => {
    return(
        <LocationNavigation.Navigator>
            <LocationNavigation.Screen name="location" component={Location} />
        </LocationNavigation.Navigator>
    )
}

const ProfileNavigation = createNativeStackNavigator();
export const ProfileStack = () => {
    return(
        <ProfileNavigation.Navigator>
            <ProfileNavigation.Screen name="profile" component={Profile} />
        </ProfileNavigation.Navigator>
    )
}

const SocialNavigation = createNativeStackNavigator();
export const SocialStack = () => {
    return(
        <SocialNavigation.Navigator>
            <SocialNavigation.Screen name="social" component={Social} />
        </SocialNavigation.Navigator>
    )
}

const AppTab = createMaterialBottomTabNavigator();
export const TabNavigator = () => {
    return(
        <AppTab.Navigator initialRouteName="overviewTab" activeColor='#ffcc00' inactiveColor={AppColors.green} barStyle={{backgroundColor:AppColors.purple}}>
            <AppTab.Screen name="overviewTab" component={DashboardStack} options={{ tabBarLabel:'Overview', tabBarIcon: ({x}) => (<MaterialCommunityIcons color={x} name="view-grid" size={28} />) }} />
            <AppTab.Screen name="locationTab" component={LocationStack} options={{ tabBarLabel:'Location', tabBarIcon: ({x}) => (<MaterialCommunityIcons color={x} name="scooter-electric" size={28} />) }} />
            <AppTab.Screen name="socialTab" component={SocialStack} options={{ tabBarLabel:'Social', tabBarIcon: ({x}) => (<Entypo color={x} name="network" size={28} />) }} />
            <AppTab.Screen name="profileTab" component={ProfileStack} options={{ tabBarLabel:'Profile', tabBarIcon: ({x}) => (<Entypo color={x} name="user" size={28} />) }} />
        </AppTab.Navigator>
    )
}