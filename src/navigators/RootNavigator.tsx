import { useContext } from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator(){
    // const {user} = useAuth();
    const user = true;
    return user ? <AppNavigator /> : <AuthNavigator />
}