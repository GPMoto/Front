import { View,Button } from 'react-native'

interface ButtonAreaProps{
  title:string;
  action:()=>void;
}


export default function ButtonArea(props:ButtonAreaProps) {
  return (
    <View>
        <Button title={props.title} onPress={()=> props.action} color={"white"}></Button>
    </View>
  )
}
