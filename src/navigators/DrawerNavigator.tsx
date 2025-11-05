import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import React from "react";
import Inicio from "@/screens/Inicio/Inicio";
import Mapa from "@/screens/Mapa/Mapa";
import ProcurarMoto from "@/screens/ProcurarMoto/ProcurarMoto";
import AdicionarRastreador from "@/screens/AdicionarRastreador/AdicionarRastreador";
<<<<<<< HEAD
import Scanner from "@/screens/AdicionarRastreador/LeituraRastreador";
=======
import Scanner from "@/screens/AdicionarRastreador/LeituraRastreador"
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
import SingleMoto from "@/screens/Moto/SingleMoto";
import { AppDrawerNavigationProps, DrawerParamList } from "./NavigationTypes";
import Settings from "@/screens/Settings";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Platform } from "react-native";
import QRCodePlaca from "@/components/QrCode/QrCode";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
=======

>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4

export default function DrawerNavigator() {
  const { Screen, Navigator } = createDrawerNavigator<DrawerParamList>();
  const navigation = useNavigation<AppDrawerNavigationProps>();
<<<<<<< HEAD
  const { t } = useTranslation();

=======
  
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();

  return (
    <Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: { backgroundColor: colors.cardBg },
        headerTitleStyle: {
          fontSize: 24,
          color: colors.primaryText,
        },
        drawerActiveBackgroundColor: isDarkTheme ? "#41C52620" : "#41C52610",
        drawerActiveTintColor: "#41C526",
        drawerInactiveTintColor: colors.secondaryText,
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "600",
        },
        headerTintColor: "#41C526",
        drawerStyle: {
          backgroundColor: colors.cardBg,
        },
        drawerContentStyle: {
          backgroundColor: colors.cardBg,
        },
      }}
    >
<<<<<<< HEAD
      <Screen
        name="Inicio"
        options={{
          title: t("navigation.home"),
        }}
      >
        {(props: ParamListBase) => <Inicio {...props}></Inicio>}
      </Screen>
      <Screen
        name="Mapa"
        options={{
          title: t("navigation.map"),
        }}
      >
        {(props: ParamListBase) => <Mapa {...props}></Mapa>}
      </Screen>
      <Screen
        name="Procurar Moto"
        options={{
          title: t("navigation.searchMoto"),
        }}
      >
        {(props: ParamListBase) => <ProcurarMoto {...props}></ProcurarMoto>}
      </Screen>
      <Screen
        name="Adicionar Rastreador"
        options={{
          title: t("navigation.addTracker"),
        }}
      >
=======
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
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
        {(props: ParamListBase) => (
          <AdicionarRastreador {...props}></AdicionarRastreador>
        )}
      </Screen>
<<<<<<< HEAD
      <Screen
        name="Configurações"
        options={{
          title: t("navigation.settings"),
        }}
      >
=======
      <Screen name="Configurações">
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
        {(props: ParamListBase) => <Settings {...props}></Settings>}
      </Screen>
      <Screen
        name="Moto"
        options={{
<<<<<<< HEAD
          title: t("navigation.moto"),
=======
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: colors.cardBg },
          headerTitleStyle: {
            fontSize: 24,
            color: colors.primaryText,
          },
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
<<<<<<< HEAD
          title: t("navigation.qrcode"),
=======
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: colors.cardBg },
          headerTitleStyle: {
            fontSize: 24,
            color: colors.primaryText,
          },
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
<<<<<<< HEAD
        options={{
          title: t("navigation.scanner"),
        }}
=======
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
      />
    </Navigator>
  );
}
