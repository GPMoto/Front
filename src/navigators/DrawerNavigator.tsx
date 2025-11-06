import { createDrawerNavigator } from "@react-navigation/drawer";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import React from "react";
import Inicio from "@/screens/Inicio/Inicio";
import Mapa from "@/screens/Mapa/Mapa";
import ProcurarMoto from "@/screens/ProcurarMoto/ProcurarMoto";
import AdicionarRastreador from "@/screens/AdicionarRastreador/AdicionarRastreador";
import Scanner from "@/screens/AdicionarRastreador/LeituraRastreador";
import SingleMoto from "@/screens/Moto/SingleMoto";
import { AppDrawerNavigationProps, DrawerParamList } from "./NavigationTypes";
import Settings from "@/screens/Settings";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Platform } from "react-native";
import QRCodePlaca from "@/components/QrCode/QrCode";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { useTranslation } from "react-i18next";

export default function DrawerNavigator() {
  const { Screen, Navigator } = createDrawerNavigator<DrawerParamList>();
  const navigation = useNavigation<AppDrawerNavigationProps>();
  const { t } = useTranslation();

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
        {(props: ParamListBase) => (
          <AdicionarRastreador {...props}></AdicionarRastreador>
        )}
      </Screen>
      <Screen
        name="Configurações"
        options={{
          title: t("navigation.settings"),
        }}
      >
        {(props: ParamListBase) => <Settings {...props}></Settings>}
      </Screen>
      <Screen
        name="Moto"
        options={{
          title: t("navigation.moto"),

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
          title: t("navigation.qrcode"),

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
        options={{
          title: t("navigation.scanner"),
        }}
      />
    </Navigator>
  );
}
