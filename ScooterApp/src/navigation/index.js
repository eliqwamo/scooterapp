import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AppColors from '../utilis/AppColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

//SCREEN
import Dashboard, { screenOptions as DashboardScreenOption } from "../screens/dashboard";
import Chatroom, { screenOptions as ChatroomScreenOption } from '../screens/dashboard/Chatroom';
import Location, { screenOptions as LocationScreenOption } from "../screens/location";
import Profile, { screenOptions as ProfileScreenOption } from "../screens/profile";
import Social, { screenOptions as SocialScreenOption } from "../screens/social";

const defaultOptions = {
    headerStyle: {backgroundColor: AppColors.green},
    headerTintColor: AppColors.white
}

const DashboardNavigation = createNativeStackNavigator();
export const DashboardStack = () => {
    return(
        <DashboardNavigation.Navigator screenOptions={defaultOptions}>
            <DashboardNavigation.Screen name="dashboard" component={Dashboard} options={DashboardScreenOption} />
            <DashboardNavigation.Screen name="chatroom" component={Chatroom} options={ChatroomScreenOption} />
        </DashboardNavigation.Navigator>
    )
}

const LocationNavigation = createNativeStackNavigator();
export const LocationStack = () => {
    return(
        <LocationNavigation.Navigator screenOptions={defaultOptions}>
            <LocationNavigation.Screen name="location" component={Location} options={LocationScreenOption} />
        </LocationNavigation.Navigator>
    )
}

const ProfileNavigation = createNativeStackNavigator();
export const ProfileStack = () => {
    return(
        <ProfileNavigation.Navigator screenOptions={defaultOptions}>
            <ProfileNavigation.Screen name="profile" component={Profile} options={ProfileScreenOption} />
        </ProfileNavigation.Navigator>
    )
}

const SocialNavigation = createNativeStackNavigator();
export const SocialStack = () => {
    return(
        <SocialNavigation.Navigator screenOptions={defaultOptions}>
            <SocialNavigation.Screen name="social" component={Social} options={SocialScreenOption} />
        </SocialNavigation.Navigator>
    )
}

const AppTab = createMaterialBottomTabNavigator();
export const TabNavigator = () => {
    return(
        <AppTab.Navigator initialRouteName="overviewTab" activeColor={AppColors.white} inactiveColor={AppColors.purple_light} barStyle={{backgroundColor:AppColors.purple}}>
            <AppTab.Screen name="overviewTab" component={DashboardStack} options={{ tabBarLabel:'Overview', tabBarIcon: ({color}) => (<MaterialCommunityIcons color={color} name="view-grid" size={28} />) }} />
            <AppTab.Screen name="locationTab" component={LocationStack} options={{ tabBarLabel:'Location', tabBarIcon: ({color}) => (<MaterialCommunityIcons color={color} name="scooter-electric" size={28} />) }} />
            <AppTab.Screen name="socialTab" component={SocialStack} options={{ tabBarLabel:'Social', tabBarIcon: ({color}) => (<Entypo color={color} name="network" size={28} />) }} />
            <AppTab.Screen name="profileTab" component={ProfileStack} options={{ tabBarLabel:'Profile', tabBarIcon: ({color}) => (<Entypo color={color} name="user" size={28} />) }} />
        </AppTab.Navigator>
    )
}