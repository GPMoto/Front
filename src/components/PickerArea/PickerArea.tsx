import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { optionsInterface } from "../../utils/Interfaces";
import { globalStyles } from "../../styles/styles";


interface PickerAreaProps{
    title:string;
    options:optionsInterface[];
    setValue:(value:string)=>void
}

export default function PickerArea(props:PickerAreaProps) {
  return (
    <View>
        <Text style={globalStyles.TextInput}>{props.title}</Text>
        <Picker style={globalStyles.TextInput} selectedValue={"Escolha uma opção"} onValueChange={(itemValue,itemIndex)=>props.setValue(String(itemValue))}>
            {props.options.map(e=><Picker.Item label={e.value} value={e.value}></Picker.Item>)}
        </Picker>
    </View>
  )
}
