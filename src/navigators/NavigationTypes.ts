import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

export type DrawerParamList = {
  Inicio: undefined;
  Mapa: undefined;
  "Procurar Moto": undefined;
  "Adicionar Rastreador": undefined;
  "Configurações": undefined;
};

export type RootStackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;
export type AppDrawerNavigationProps = DrawerNavigationProp<DrawerParamList>;
