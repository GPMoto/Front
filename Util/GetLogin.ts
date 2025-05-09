import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginInterface } from "./Interfaces";

export default async function getLogin(){
    let login = await AsyncStorage.getItem("LOGIN")
    if(login){
        let loginObj : loginInterface = JSON.parse(login)
        return loginObj;
    }else{
        return null;
    }
}