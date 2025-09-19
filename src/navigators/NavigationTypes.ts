import { Moto } from "@/model/Moto";
import { QrCodeResponse } from "@/model/types/QrCodeResponse";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

export type DrawerParamList = {
  Inicio: undefined;
  Mapa: undefined;
  "Procurar Moto": { idSecaoFilial: number } | undefined;
  "Adicionar Rastreador": undefined;
  Configurações: undefined;
  Moto: { moto: Moto; editing?: boolean };
  QRCode: { qrCode: QrCodeResponse; placa: string };
  Scanner: undefined;
};

export type RootStackNavigationProps =
  NativeStackNavigationProp<RootStackParamList>;
export type AppDrawerNavigationProps = DrawerNavigationProp<DrawerParamList>;
