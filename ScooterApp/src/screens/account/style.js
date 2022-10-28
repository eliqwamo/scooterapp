import { StyleSheet } from 'react-native';
import Colors from '../../utilis/AppColors.js';

export default StyleSheet.create({
    container: {
        flex:1,
        padding:30,
        backgroundColor: Colors.blue,
        alignItems:'center',
        justifyContent: 'center'
    },
    input:{
        width:'100%',
        padding:14, backgroundColor:Colors.white,
        borderRadius:20, marginBottom:12
    },
    btn:{
        width:'100%',
        paddingVertical:20, borderRadius:20,
        alignItems:'center',
        backgroundColor:Colors.dark_blue
    },
    btn_text: {
        color:Colors.white,
        fontWeight:'700', fontSize:24
    }
})