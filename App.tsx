import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginCadastro from './pages/LoginCadastro/LoginCadastro';
import DrawerNav from './components/DrawerNav/DrawerNav';
import { useEffect, useState } from 'react';
import { loginInterface } from './utils/Interfaces';
import getLogin from './utils/GetLogin';

export default function App() {
  const {Navigator,Screen} = createNativeStackNavigator();
  
  const [user,setUser] = useState<loginInterface | null>();


  useEffect(()=>{
    const get = async()=>{
      // const userLocal = await getLogin()
      // console.log(userLocal)
      // setUser(()=>userLocal)
    }
    get()
  },[])

  return (

    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown:false,
      }}>
        {user === null ? (
          <Screen name="Login">
            {(props: ParamListBase) => <LoginCadastro {...props} />}
          </Screen>
        ) : (
          <Screen name="Home" component={DrawerNav} />
        )}
      </Navigator>
    </NavigationContainer>
  );
}


