import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIdentificador } from "./IdentificadorController";
import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";
import { PhotoFile } from "@/model/types/PhotoFile";
import IdentificadorService from "@/services/IdentificadorService";
import { useAuth } from "@/context/AuthContext";
import { QrCodeResponse } from "@/model/types/QrCodeResponse";
import { AppDrawerNavigationProps } from "@/navigators/NavigationTypes";
import { useMoto } from "./MotoControl";
import { useTipoMoto } from "./TipoMotoController";
import useFilial from "./FilialController";

export const useAdicionarRastreador = () => {
  const { token } = useAuth();

  const [cameraOpen, setCameraOpen] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);

  const { pagedMotos } = useMoto({})

  const { tipoMotos } = useTipoMoto()
  const { secoes } = useFilial()

  const motos = pagedMotos.data ? pagedMotos.data.content : [];
  
  
  const [photo, setPhoto] = useState<PhotoFile>(null);
  const [qrCodeValor, setQrCodeValor] = useState<QrCodeResponse | null>(null);

  const navigation = useNavigation<AppDrawerNavigationProps>();

  useEffect(() => {
    if (qrCodeValor) {
      setTimeout(() => {
        navigation.navigate("QRCode", {
          qrCode: qrCodeValor,
          placa: qrCodeValor.qrCode,
        });
      }, 1000);
    }
  }, [qrCodeValor]);

  const getQRCodeFromIdentifier = (identifier : string) => setQrCodeValor({qrCode: identifier})

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
      if (canceled) return;

      const uri = result.assets?.[0]?.uri;
      if (!uri) return;

      setProcessingImage(true);

      try {
        const ocrTexts = await new IdentificadorService(token).readTextFromImage(uri);
        const response = ocrTexts.join(" ");
        
        console.log("OCR Result:", response);
        navigation.navigate("Moto", {
          moto: {
            idTipoMoto: tipoMotos.data![0],
            idSecaoFilial: secoes![0],
            condicoesManutencao: 'Manutenção',
            status: "Disponível",
            identificador: response
          },
          editing: true
        })
        
      } catch (ocrError) {
        console.warn("OCR failed, trying upload service:", ocrError);
        const response = await new IdentificadorService(token).uploadPhoto(result);
        if (response) {
          setQrCodeValor(response);
        }
      } finally {
        setProcessingImage(false);
      }
      
    } catch (error) {
      console.warn("openCamera error", error);
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
      setProcessingImage(false);
      return null;
    }
  };

  const closeCamera = useCallback(() => setCameraOpen(false), []);

  return {
    cameraOpen,
    openCamera,
    closeCamera,
    navigation,
    motos : pagedMotos.data ? pagedMotos.data.content : [],
    motosLoading : pagedMotos.isLoading,
    motosError : pagedMotos.isError,
    getQRCodeFromIdentifier,
    processingImage
  } as const;
};

export default useAdicionarRastreador;
