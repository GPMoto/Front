import { Text, View, TextInput } from "react-native";
import { styles } from "../../styles/styles";


interface InputLabelProps{
    title:string;
    value : string;
    setValue : (value:string)=>void;
    placeholder:string
}


export default function InputLabel(props:InputLabelProps) {
  return (
    <View>
        <Text style={styles.TextInput}>{props.title}</Text>
        <TextInput style={styles.Input} placeholder={props.placeholder} placeholderTextColor={"#8B8B8B"} value={props.value} onChangeText={e=>props.setValue(e)}></TextInput>
    </View>
  )
}
