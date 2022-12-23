
import { StyleSheet } from 'react-native';
import Colors from '../../utilis/AppColors.js';

export default StyleSheet.create({

    logout_btn: {width:'100%', paddingVertical:12, alignItems:'center',
    backgroundColor: Colors.purple, borderRadius:20},
    logout_text: {fontSize:20, color:Colors.white},


    container: {
        flex:1,
        padding:30,
        backgroundColor: Colors.bg,
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
    },





    row_container:{
        width:'100%', marginBottom:12,
        backgroundColor:Colors.white,
        borderRadius:10,
    },
    main: {
        flexDirection:'row',
        height:70,
        backgroundColor:Colors.white,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    battery: {
        width:'100%',
        height:30,
        alignItems:'center', justifyContent:'center',
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        backgroundColor:Colors.green
    },

    icon_container:{width:'20%', height:70, alignItems:'center', justifyContent:'center'},
    info_container:{width:'60%'},
    data_container:{width:'20%', alignItems:'center', justifyContent:'center', height:70},
})