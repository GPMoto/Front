import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles/styles';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './pages/Inicio/Inicio';

export default function App() {

  const {Screen, Navigator} = createDrawerNavigator()

  return (
    <NavigationContainer>
      <Navigator initialRouteName='Inicio' screenOptions={{
        headerStyle:{backgroundColor:"#2C2C2C"},
        drawerActiveBackgroundColor: '#41C52620',
        drawerLabelStyle:{
          color:"#41C526"
        },
        headerTintColor:"#41C526",
        drawerStyle:{
          backgroundColor:"#2C2C2C"
        }
      }}>
      <Screen name='Inicio' component={Inicio}>
      </Screen>

      </Navigator>
    </NavigationContainer>
  );
}


