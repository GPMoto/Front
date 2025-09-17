import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { useLeitorQrCode } from "@/control/LeitorQrCodeController";

export default function TesteLeituraRastreador() {
  const {
    hasPermission,
    scanned,
    data,
    cameraReady,
    handleBarCodeScanned,
    resetScanner,
    onCameraReady,
  } = useLeitorQrCode();

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0C0C0C" />
        <View style={styles.messageContainer}>
          <FontAwesome name="camera" size={60} color="#41C526" style={styles.icon} />
          <Text style={styles.messageText}>Solicitando permissão da câmera...</Text>
        </View>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0C0C0C" />
        <View style={styles.messageContainer}>
          <FontAwesome name="exclamation-triangle" size={60} color="#FF6B6B" style={styles.icon} />
          <Text style={styles.messageText}>Sem acesso à câmera</Text>
          <Text style={styles.subText}>Permita o acesso à câmera nas configurações</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C0C" />
      
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
            Posicione o QR Code dentro da área marcada
          </Text>
        </View>
      </View>

      {scanned && (
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <FontAwesome name="qrcode" size={24} color="#41C526" style={styles.resultIcon} />
            <Text style={styles.resultLabel}>Valor escaneado:</Text>
            <Text style={styles.resultValue}>{data}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.scanAgainButton} 
            onPress={resetScanner}
          >
            <FontAwesome name="refresh" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.scanAgainText}>Escanear novamente</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  scanner: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#41C526',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    borderRadius: 8,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 16,
  },
  resultCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#41C526',
  },
  resultIcon: {
    marginBottom: 8,
  },
  resultLabel: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 4,
  },
  resultValue: {
    color: '#41C526',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: '#41C526',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#41C526',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  scanAgainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
