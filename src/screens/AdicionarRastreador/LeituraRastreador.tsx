import React from "react";
<<<<<<< HEAD
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
=======
import { Text, View, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
import { Camera, CameraView } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { useLeitorQrCode } from "@/control/LeitorQrCodeController";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles-leitura";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";

export default function TesteLeituraRastreador() {
  const { t } = useTranslation();
=======

export default function TesteLeituraRastreador() {
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
  const {
    hasPermission,
    scanned,
    data,
    cameraReady,
    handleBarCodeScanned,
    resetScanner,
    onCameraReady,
  } = useLeitorQrCode();
<<<<<<< HEAD

=======
  
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
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
<<<<<<< HEAD
          <FontAwesome
            name="camera"
            size={60}
            color="#41C526"
            style={styles.icon}
          />
          <Text style={styles.messageText}>
            {t("addTracker.requestingPermission")}
          </Text>
=======
          <FontAwesome name="camera" size={60} color="#41C526" style={styles.icon} />
          <Text style={styles.messageText}>Solicitando permissão da câmera...</Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
        </View>
      </SafeAreaView>
    );
  }
<<<<<<< HEAD

=======
  
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <View style={styles.messageContainer}>
<<<<<<< HEAD
          <FontAwesome
            name="exclamation-triangle"
            size={60}
            color="#FF6B6B"
            style={styles.icon}
          />
          <Text style={styles.messageText}>{t("addTracker.noAccess")}</Text>
          <Text style={styles.subText}>{t("addTracker.allowAccess")}</Text>
=======
          <FontAwesome name="exclamation-triangle" size={60} color="#FF6B6B" style={styles.icon} />
          <Text style={styles.messageText}>Sem acesso à câmera</Text>
          <Text style={styles.subText}>Permita o acesso à câmera nas configurações</Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

=======
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />
      
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
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
<<<<<<< HEAD

=======
        
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
        {/* Scanner overlay with corner markers */}
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
<<<<<<< HEAD

          <Text style={styles.instructionText}>
            {t("addTracker.positionQR")}
=======
          
          <Text style={styles.instructionText}>
            Posicione o QR Code dentro da área marcada
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
          </Text>
        </View>
      </View>

      {data && (
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
<<<<<<< HEAD
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
=======
            <FontAwesome name="check-circle" size={32} color="#41C526" style={styles.resultIcon} />
            <Text style={styles.resultLabel}>QR Code</Text>
            <Text style={styles.resultValue}>{data}</Text>
          </View>
          
          <TouchableOpacity style={styles.scanAgainButton} onPress={resetScanner}>
            <FontAwesome name="camera" size={18} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.scanAgainText}>Escanear Novamente</Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
<<<<<<< HEAD
}
=======
};


>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
