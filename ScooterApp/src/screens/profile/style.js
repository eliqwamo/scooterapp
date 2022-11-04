
import { StyleSheet } from 'react-native';
import Colors from '../../utilis/AppColors.js';

export default StyleSheet.create({

    logout_btn: {width:'100%', paddingVertical:12, alignItems:'center',
    backgroundColor: Colors.purple, borderRadius:20},
    logout_text: {fontSize:20, color:Colors.white},


    container: {
        flex:1,
        padding:30,
        backgroundColor: Colors.white,
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