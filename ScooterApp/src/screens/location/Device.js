import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './style';
import Colors from '../../utilis/AppColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//bicycle-electric
//scooter-electric

const Device = props => {

    let icon = '';
    let iconColor = '';
    if (props.device.deviceType === 'scooter') {
        icon = 'scooter-electric';
        iconColor = Colors.purple;
    } else {
        icon = 'bicycle-electric';
        iconColor = Colors.green;
    }

    let batteryColor = '';
    let batteryWidth = props.device.batteryLevel + '%';
    if (props.device.batteryLevel < 30) {
        batteryColor = Colors.red
    } else if((props.device.batteryLevel < 60)) {
        batteryColor = Colors.yellow
    } else {
        batteryColor = Colors.batteryGreen
    }

    return (
        <View style={Styles.row_container}>

            <View style={Styles.main}>
                <View style={Styles.icon_container}>
                    <MaterialCommunityIcons name={icon} size={40} color={iconColor} />
                </View>
                <View style={Styles.info_container}></View>
                <View style={Styles.data_container}>
                    
                </View>
            </View>
            <View style={{width:batteryWidth, backgroundColor:batteryColor, 
                height:30, alignItems:'center', justifyContent:'center', 
                borderBottomRightRadius:10, borderBottomLeftRadius:10,}}>
                <Text style={{color:Colors.white}}>{props.device.batteryLevel}%</Text>
            </View>

        </View>
    )
}

export default Device;
