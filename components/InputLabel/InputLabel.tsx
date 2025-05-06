import { Text, View, TextInput, Image, Pressable } from "react-native";
import { styles } from "../../styles/styles";
import { FontAwesome } from '@expo/vector-icons';


interface InputLabelProps{
    title:string;
    value : string;
    setValue : (value:string)=>void;
    placeholder:string
    show:boolean
    onPress?:()=>void;
}


export default function InputLabel(props:InputLabelProps) {
  return (
    <View>
        <Text style={styles.TextInput}>{props.title}</Text>
        <View style={[styles.Input,{justifyContent:"space-between"}]}>
          <TextInput style={{width:"90%"}} placeholder={props.placeholder} placeholderTextColor={"#8B8B8B"} value={props.value} onChangeText={e=>props.setValue(e)}></TextInput>
          {props.show ? 
          <Pressable style={{alignItems:"center",justifyContent:"center"}} onPress={props.onPress}>
            <FontAwesome name="search" size={30} color="#41C526" />
          </Pressable>
          :
          <></>
          }
        </View>
    </View>
  )
}
