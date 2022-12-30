import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './style';
import Colors from '../../utilis/AppColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DeviceInfo = props => {

    const thedevice = props.route.params.device.device;

    let icon = '';
    let iconColor = '';
    if (thedevice.deviceType === 'scooter') {
        icon = 'scooter-electric';
        iconColor = Colors.purple;
    } else {
        icon = 'bicycle-electric';
        iconColor = Colors.green;
    }


    return(
        <View style={Styles.container_full}>
            <View style={{width:'100%', height:300, alignItems:'center', justifyContent:'center', backgroundColor:Colors.dark_blue}}>
                <MaterialCommunityIcons name={icon} size={200} color={iconColor} />
            </View>
            <View>
                <Text>Display the details of the company (Logo + Name)</Text>

                <Text>Display Device detail (distance, price)</Text>

                <Text>
                    If device is not available, display contact button with user
                </Text>

                <Text>
                    Display "Start Use" button (if available)
                </Text>

            </View>
        </View>
    )
}

export const screenOptions = navData => {
    return{
        headerTitle: navData.route.params.device.device.companyId.companyName
    }
}

export default DeviceInfo;