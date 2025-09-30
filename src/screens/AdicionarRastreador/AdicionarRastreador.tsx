import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import useAdicionarRastreador from "@/control/AdicionarRastreadorController";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Moto } from "@/model/Moto";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";

export default function AdicionarRastreador() {
  const { openCamera, motos, motosError, motosLoading, processingImage, getQRCodeFromIdentifier } = useAdicionarRastreador();
  const navigation = useNavigation();
  
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  // Mostrar LoadingScreen quando estiver processando imagem
  if (processingImage) {
    return (
      <LoadingScreen>
        <Text style={styles.loadingText}>
          Processando imagem...
        </Text>
        <Text style={styles.loadingSubtext}>
          Extraindo texto da foto capturada
        </Text>
      </LoadingScreen>
    );
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Adicionar Rastreador</Text>
        <Text style={styles.subtitle}>
          Tire uma foto da placa ou selecione um identificador abaixo.
        </Text>
      </View>

      {motosLoading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Carregando identificadores...
          </Text>
        </View>
      ) : motosError ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Erro carregando dados</Text>
        </View>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item: Moto) => `${item.idMoto}`}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => getQRCodeFromIdentifier(item.identificador)}
            >
              <View style={styles.cardLeft}>
                <Icon name="id-badge" size={20} color="#41C526" />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.identificadorText}>
                  {item.identificador}
                </Text>
                <Text style={styles.identificadorSub}>
                  {item.idTipoMoto.nmTipo || ""}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={openCamera}>
        <Icon name="camera" size={24} color="#0C0C0C" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};


