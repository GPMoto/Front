import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles/styles';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginCadastro from './pages/LoginCadastro/LoginCadastro';
import DrawerNav from './components/DrawerNav/DrawerNav';
import { useEffect, useState } from 'react';
import { loginInterface } from './Util/Interfaces';
import getLogin from './Util/GetLogin';


export default function App() {
  const {Navigator,Screen} = createNativeStackNavigator();
  
  const [user,setUser] = useState<loginInterface | null>();


  useEffect(()=>{
    const get = async()=>{
      const userLocal = await getLogin()
      setUser(userLocal)
    }
    get()
  },[])

  return (

    <NavigationContainer>
      <Navigator initialRouteName={user?'Home':'Login'} screenOptions={{
        headerShown:false,
      }}>
        <Screen name='Login' >{(props:ParamListBase)=><LoginCadastro{...props}></LoginCadastro>}</Screen>
        <Screen name='Home' component={DrawerNav}></Screen>
      </Navigator>
      
    </NavigationContainer>
  );
}


