import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0C0C0C',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 10
    },
    container_center :{
        flex: 1,
        backgroundColor: '#0C0C0C',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    TextInput:{
        color:"white",
        fontSize:24,
    },
    Input:{
        borderRadius:16,
        borderWidth:4,
        borderColor:"#41C526",
        backgroundColor:"white",
        padding:16
    },
    pageColor:{
        backgroundColor:"#0C0C0C"
    },
    paragraph:{
        color:"white",
        fontSize:16,
        textAlign:"left",
    },
    paragraph_center:{
        color:"white",
        fontSize:16,
        textAlign:"center",
    },
    paragraph_black:  {
        color:"black",
        fontSize:16,
        textAlign:"left",
    },
    highlight: {
        fontWeight: 'bold',
        color:"#41C526",
        fontSize:40,
    },

})