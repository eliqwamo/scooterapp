import React from "react";
import { View, Text, TouchableOpacity,Image } from 'react-native';
import Styles from './style';
import Colors from '../../utilis/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//bicycle-electric
//scooter-electric

const Device = props => {

    let icon = '';
    let iconColor = '';
    if (props.device.device.deviceType === 'scooter') {
        icon = 'scooter-electric';
        iconColor = Colors.purple;
    } else {
        icon = 'bicycle-electric';
        iconColor = Colors.green;
    }

    let status = '';
    let statusColor = '';
    if (props.device.device.deviceStatus === 'available') {
        status = 'checkbox-blank-circle';
        statusColor = Colors.green;
    } else {
        status = 'minus-circle-outline';
        statusColor = Colors.red;
    }

    let batteryColor = '';
    let batteryWidth = props.device.device.batteryLevel + '%';
    if (props.device.device.batteryLevel < 30) {
        batteryColor = Colors.red
    } else if((props.device.device.batteryLevel < 60)) {
        batteryColor = Colors.yellow
    } else {
        batteryColor = Colors.batteryGreen
    }

    return (
        <TouchableOpacity onPress={props.onclick} style={Styles.row_container}>

            <View style={Styles.main}>
                <View style={Styles.icon_container}>
                    <MaterialCommunityIcons name={icon} size={40} color={iconColor} />
                </View>
                <View style={Styles.info_container}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri: props.device.device.companyId.companyLogo}} style={{width:40, height:40, resizeMode:'cover'}} />
                        <Text style={{marginLeft:10, marginTop:10}}>{props.device.device.companyId.companyName}</Text>
                    </View>
                    <Text style={{marginTop:5}}>${props.device.device.rentAmountPerDay} per day</Text>
                </View>
                <View style={Styles.data_container}>
                    <MaterialCommunityIcons name={status} size={22} color={statusColor} />
                    <Text style={Styles.dist_text}>{props.device.dist}m</Text>
                </View>
            </View>
            <View style={{width:batteryWidth, backgroundColor:batteryColor, 
                height:30, alignItems:'center', justifyContent:'center', 
                borderBottomRightRadius:10, borderBottomLeftRadius:10,}}>
                <Text style={{color:Colors.white}}>{props.device.device.batteryLevel}%</Text>
            </View>

        </TouchableOpacity>
    )
}

export default Device;
