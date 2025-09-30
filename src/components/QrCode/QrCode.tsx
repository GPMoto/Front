import { QrCodeResponse } from "@/model/types/QrCodeResponse";
import { DrawerParamList } from "@/navigators/NavigationTypes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useQrCodeControl } from "@/control/QrCodeController";

export default function QRCodePlaca() {
  const route = useRoute<RouteProp<DrawerParamList, "QRCode">>();
  const { qrCode: item, placa } = route.params;

  const { handlePrint, handleSave, handleShare } = useQrCodeControl();

  const svgRef = useRef<any>(null);

  const exportAndRun = (action: (base64: string) => Promise<void> | void) => {
    svgRef.current?.toDataURL((data: string) => {
      action(data);
    });
  };

  const onPrint = () => exportAndRun(handlePrint);
  const onShare = () => exportAndRun(handleShare);
  const onSave = () => exportAndRun(handleSave);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QR Code da Moto</Text>
        <Text style={styles.message}>
          O QR code da moto com placa <Text style={styles.placa}>{placa}</Text>{" "}
          é esse abaixo
        </Text>
      </View>

      <View style={styles.qrContainer}>
        <View style={styles.qrWrapper}>
          <QRCode
            value={item["qrCode"]}
            size={280}
            backgroundColor="#FFFFFF"
            color="#000000"
            getRef={(c) => svgRef.current = c}
          />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onPrint}>
          <Icon name="print" size={20} color="#FFFFFF" />
          <Text style={styles.actionText}>Imprimir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Icon name="share" size={20} color="#FFFFFF" />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0C0C",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#BFC9B8",
    textAlign: "center",
    lineHeight: 24,
  },
  placa: {
    color: "#41C526",
    fontWeight: "bold",
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  qrWrapper: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#1F1F1F",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(65,197,38,0.1)",
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
});
