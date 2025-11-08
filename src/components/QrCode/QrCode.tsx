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
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { useTranslation } from "react-i18next";

export default function QRCodePlaca() {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<DrawerParamList, "QRCode">>();
  const { qrCode: item, placa } = route.params;

  const { handlePrint, handleSave, handleShare } = useQrCodeControl();
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();

  const svgRef = useRef<any>(null);

  const styles = createStyles(colors, isDarkTheme);

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
        <Text style={styles.title}>{t("qrCode.title")}</Text>
        <Text style={styles.message}>
          {t("qrCode.message")} <Text style={styles.placa}>{placa}</Text>{" "}
          {t("qrCode.messageEnd")}
        </Text>
      </View>

      <View style={styles.qrContainer}>
        <View style={styles.qrWrapper}>
          <QRCode
            value={item["qrCode"]}
            size={280}
            backgroundColor="#FFFFFF"
            color="#000000"
            getRef={(c) => (svgRef.current = c)}
          />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={onPrint}>
          <Icon name="print" size={20} color={colors.iconColor} />
          <Text style={styles.actionText}>{t("qrCode.printButton")}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Icon name="share" size={20} color={colors.iconColor} />
          <Text style={styles.actionText}>{t("qrCode.shareButton")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof useDarkColors>,
  isDarkTheme: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.containerBg,
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
      color: colors.primaryText,
      marginBottom: 12,
      textAlign: "center",
    },
    message: {
      fontSize: 16,
      color: colors.secondaryText,
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
      shadowColor: colors.shadowColor,
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
      backgroundColor: colors.cardBg,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: "center",
      flex: 1,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    actionText: {
      color: colors.primaryText,
      fontSize: 14,
      fontWeight: "600",
      marginTop: 8,
    },
  });