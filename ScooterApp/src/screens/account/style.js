import { StyleSheet } from 'react-native';
import Colors from '../../utilis/AppColors.js';

export default StyleSheet.create({
    title:{marginBottom:20, fontSize:20, fontWeight:'500'},

    logout_btn: {width:'100%', paddingVertical:12, alignItems:'center',
    backgroundColor: Colors.purple, borderRadius:20},
    logout_text: {fontSize:20, color:Colors.white},

    newaacount:{width:'100%', paddingVertical:12, alignItems:'center',
    backgroundColor: Colors.blue, marginTop:10, borderColor:Colors.purple, borderWidth:1, borderRadius:20},

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