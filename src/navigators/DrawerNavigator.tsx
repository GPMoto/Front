import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import React from "react";
import Inicio from "@/screens/Inicio/Inicio";
import Mapa from "@/screens/Mapa/Mapa";
import ProcurarMoto from "@/screens/ProcurarMoto/ProcurarMoto";
import AdicionarRastreador from "@/screens/AdicionarRastreador/AdicionarRastreador";
import Scanner from "@/screens/AdicionarRastreador/TesteLeituraRastreador"
import SingleMoto from "@/screens/Moto/SingleMoto";
import { AppDrawerNavigationProps, DrawerParamList } from "./NavigationTypes";
import Settings from "@/screens/Settings";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Platform } from "react-native";
import QRCodePlaca from "@/components/QrCode/QrCode";


export default function DrawerNavigator() {
  const { Screen, Navigator } = createDrawerNavigator<DrawerParamList>();

  const navigation = useNavigation<AppDrawerNavigationProps>();

  return (
    <Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: { backgroundColor: "#2C2C2C" },
        headerTitleStyle: {
          fontSize: 24,
        },
        drawerActiveBackgroundColor: "#41C52620",
        drawerLabelStyle: {
          color: "#41C526",
          fontSize: 18,
        },
        headerTintColor: "#41C526",
        drawerStyle: {
          backgroundColor: "#2C2C2C",
        },
      }}
    >
      <Screen name="Inicio">
        {(props: ParamListBase) => <Inicio {...props}></Inicio>}
      </Screen>
      <Screen name="Mapa">
        {(props: ParamListBase) => <Mapa {...props}></Mapa>}
      </Screen>
      <Screen name="Procurar Moto">
        {(props: ParamListBase) => <ProcurarMoto {...props}></ProcurarMoto>}
      </Screen>
      <Screen name="Adicionar Rastreador">
        {(props: ParamListBase) => (
          <AdicionarRastreador {...props}></AdicionarRastreador>
        )}
      </Screen>
      <Screen name="Configurações">
        {(props: ParamListBase) => <Settings {...props}></Settings>}
      </Screen>
      <Screen
        name="Moto"
        options={{
          drawerItemStyle: { display: "none" },
          headerLeft: (props) => (
            <Icon
              size={24}
              style={{
                marginHorizontal: 16,
              }}
              name={Platform.OS === "android" ? "arrow-back" : "arrow-back-ios"}
              color="#41C526"
              onPress={() => navigation.navigate("Procurar Moto")}
            />
          ),
        }}
      >
        {(props: ParamListBase) => <SingleMoto {...props}></SingleMoto>}
      </Screen>
      <Screen
        name="QRCode"
        options={{
          drawerItemStyle: { display: "none" },
          headerLeft: (props) => (
            <Icon
              size={24}
              style={{
                marginHorizontal: 16,
              }}
              name={Platform.OS === "android" ? "arrow-back" : "arrow-back-ios"}
              color="#41C526"
              onPress={() => navigation.navigate("Adicionar Rastreador")}
            />
          ),
        }}
      >
        {(props: ParamListBase) => <QRCodePlaca {...props} />}
      </Screen>
      <Screen
        name="Scanner"
        component={Scanner}
      />
    </Navigator>
  );
}
