import { useCallback, useEffect, useState } from "react";
import { Camera, BarcodeScanningResult } from "expo-camera";
import { Alert } from "react-native";

export const useLeitorQrCode = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [cameraReady, setCameraReady] = useState(false);

  const requestCameraPermission = useCallback(async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "É necessário permitir acesso à câmera para escanear QR codes.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão da câmera:", error);
      setHasPermission(false);
    }
  }, []);

  const handleBarCodeScanned = useCallback(
    ({ type, data }: BarcodeScanningResult) => {
      if (scanned) return;

      setScanned(true);
      setData(data);
    },
    [scanned]
  );

  const resetScanner = useCallback(() => {
    setScanned(false);
    setData("");
  }, []);

  const onCameraReady = useCallback(() => {
    setCameraReady(true);
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  return {
    // Estados
    hasPermission,
    scanned,
    data,
    cameraReady,

    // Ações
    handleBarCodeScanned,
    resetScanner,
    onCameraReady,
    requestCameraPermission,
  };
};
