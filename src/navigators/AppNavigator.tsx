import DrawerNavigator from "@/navigators/DrawerNavigator"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export default function AppNavigator(){
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={DrawerNavigator} />
        </Stack.Navigator>
    )
}