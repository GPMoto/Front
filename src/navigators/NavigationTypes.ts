import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export type DrawerParamList = {
  Inicio: undefined;
  Mapa: undefined;
  'Procurar Moto': undefined;
  'Adicionar Rastreador': undefined;
  'Relatórios': undefined;
  'Configurações' : undefined;
};

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type AppDrawerNavigationProps = DrawerNavigationProp<DrawerParamList>;