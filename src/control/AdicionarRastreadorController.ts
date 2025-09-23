import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIdentificador } from "./IdentificadorController";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";
import { PhotoFile } from "@/model/types/PhotoFile";
import IdentificadorService from "@/services/IdentificadorService";
import { useAuth } from "@/context/AuthContext";
import {QrCodeResponse} from "@/model/types/QrCodeResponse";
import { AppDrawerNavigationProps } from "@/navigators/NavigationTypes";

export const useAdicionarRastreador = () => {
  const { token } = useAuth();

  const [cameraOpen, setCameraOpen] = useState(false);

  const { identificadoresFilial } = useIdentificador({});
  const [photo, setPhoto] = useState<PhotoFile>(null);
  const [qrCodeValor, setQrCodeValor] = useState<QrCodeResponse | null>(null);

  const navigation = useNavigation<AppDrawerNavigationProps>();

  useEffect(() => {
    if (qrCodeValor) {
      Alert.alert("Upload de imagem feito!");
      setTimeout(() => {
        navigation.navigate("QRCode", {
          qrCode: qrCodeValor,
          placa : "ABC-1234",
        });
      }, 1000);
    }
  }, [qrCodeValor]);

  const getCameraPermissions = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status === "granted") return status;

    const { status: newStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (newStatus !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera nas configurações."
      );
      return null;
    }

    return newStatus;
  };

  

  const openCamera = async () => {
    try {
      if (
        (await getCameraPermissions()) !== ImagePicker.PermissionStatus.GRANTED
      ) {
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
        base64: false,
      });

      const canceled = result.canceled;
      const uri = result.assets![0].uri;

      if (canceled || !uri) return null;

      const filename =
        uri.split("/").pop() ??
        `photo.${Platform.OS === "android" ? "jpg" : "jpg"}`;
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? match[1] : "jpg";
      const mime = `image/${ext === "jpg" ? "jpeg" : ext}`;

      const file: PhotoFile = { uri, name: filename, type: mime };
      const response = await new IdentificadorService(token).uploadPhoto(file);
      setQrCodeValor(response);
    } catch (error) {
      console.warn("openCamera error", error);
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
      return null;
    }
  };

  const closeCamera = useCallback(() => setCameraOpen(false), []);

  return {
    identificadoresFilial,
    cameraOpen,
    openCamera,
    closeCamera,
    navigation,
  } as const;
};

export default useAdicionarRastreador;
