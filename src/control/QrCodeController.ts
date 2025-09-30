import { Alert } from "react-native";

import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const useQrCodeControl = () => {
  const handlePrint = async (base64: string) => {
    try {
      const html = `
        <html>
          <body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0">
            <img src="data:image/png;base64,${base64}" style="max-width:100%;width:600px"/>
          </body>
        </html>`;
      await Print.printAsync({ html });
    } catch (e: any) {
      Alert.alert("Erro ao imprimir", e?.message ?? String(e));
    }
  };

  const handleShare = async (base64: string) => {
    try {
      const path = await saveBase64ToFile(base64);
      if (!path) return;
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Compartilhar indisponível",
          "Compartilhar não está disponível neste dispositivo."
        );
        return;
      }
      await Sharing.shareAsync(path);
    } catch (e: any) {
      Alert.alert("Erro ao compartilhar", e?.message ?? String(e));
    }
  };

  const handleSave = async (base64 : string) => {
    const path = await saveBase64ToFile(base64);
    if (path) {
      Alert.alert("Salvo", "QR code salvo em cache. Você pode compartilhá-lo.");
    }
  };

  const saveBase64ToFile = async (base64: string) => {
    try {
      const path = `${FileSystem.cacheDirectory}qrcode.png`;
      await FileSystem.writeAsStringAsync(path, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return path;
    } catch (e: any) {
      Alert.alert("Erro ao salvar", e?.message ?? String(e));
      return null;
    }
  };

  return {
    handlePrint,
    handleSave,
    handleShare,
  };
};
