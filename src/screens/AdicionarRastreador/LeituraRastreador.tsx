import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Camera, CameraView } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { useLeitorQrCode } from "@/control/LeitorQrCodeController";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles-leitura";
import { useTranslation } from "react-i18next";

export default function TesteLeituraRastreador() {
  const { t } = useTranslation();
  const {
    hasPermission,
    scanned,
    data,
    cameraReady,
    handleBarCodeScanned,
    resetScanner,
    onCameraReady,
  } = useLeitorQrCode();

  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <View style={styles.messageContainer}>
          <FontAwesome
            name="camera"
            size={60}
            color="#41C526"
            style={styles.icon}
          />
          <Text style={styles.messageText}>
            {t("addTracker.requestingPermission")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <View style={styles.messageContainer}>
          <FontAwesome
            name="exclamation-triangle"
            size={60}
            color="#FF6B6B"
            style={styles.icon}
          />
          <Text style={styles.messageText}>{t("addTracker.noAccess")}</Text>
          <Text style={styles.subText}>{t("addTracker.allowAccess")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.scannerContainer}>
        <CameraView
          style={styles.scanner}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          onCameraReady={onCameraReady}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
        />

        {/* Scanner overlay with corner markers */}
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>

          <Text style={styles.instructionText}>
            {t("addTracker.positionQR")}
          </Text>
        </View>
      </View>

      {data && (
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <FontAwesome
              name="check-circle"
              size={32}
              color="#41C526"
              style={styles.resultIcon}
            />
            <Text style={styles.resultLabel}>
              {t("addTracker.qrCodeLabel")}
            </Text>
            <Text style={styles.resultValue}>{data}</Text>
          </View>

          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={resetScanner}
          >
            <FontAwesome
              name="camera"
              size={18}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.scanAgainText}>
              {t("addTracker.scanAgain")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
