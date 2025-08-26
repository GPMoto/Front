import { createDrawerNavigator } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'
import React from 'react'
import Inicio from '../screens/Inicio/Inicio'
import Mapa from '../screens/Mapa/Mapa'
import ProcurarMoto from '../screens/ProcurarMoto/ProcurarMoto'
import AdicionarRastreador from '../screens/AdicionarRastreador/AdicionarRastreador'
import Relatorio from '../screens/Relatorios/Relatorio'

export default function DrawerNavigator() {
    const {Screen, Navigator} = createDrawerNavigator()

    return (
    <Navigator initialRouteName='Inicio' screenOptions={{
        headerStyle:{backgroundColor:"#2C2C2C"},
        headerTitleStyle:{
          fontSize:24
        },
        drawerActiveBackgroundColor: '#41C52620',
        drawerLabelStyle:{
          color:"#41C526",
          fontSize:18
        },
        headerTintColor:"#41C526",
        drawerStyle:{
          backgroundColor:"#2C2C2C",
        }
      }}>
      <Screen name='Inicio'>
        {(props:ParamListBase)=><Inicio {...props}></Inicio>}
      </Screen>
      <Screen name='Mapa'>
        {(props:ParamListBase)=><Mapa {...props}></Mapa>}
      </Screen>
      <Screen name='Procurar Moto'>
        {(props:ParamListBase)=><ProcurarMoto {...props}></ProcurarMoto>}
      </Screen>
      <Screen name='Adicionar Rastreador'>
        {(props:ParamListBase)=><AdicionarRastreador {...props}></AdicionarRastreador>}
      </Screen>
      <Screen name='Relatórios'>
        {(props:ParamListBase)=><Relatorio {...props}></Relatorio>}
      </Screen>

      


      </Navigator>
  )
}
