import React from "react";
import { useAuth } from "@/context/AuthContext";
import { ParamListBase } from "@react-navigation/native";
import {
  Text,
  View,
  Switch,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useProfile } from "@/control/ProfileController";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ButtonArea from "@/components/Button/ButtonArea";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";

interface SettingsProps extends ParamListBase {}

const Settings = (props: SettingsProps) => {
  const { logout } = useAuth();
  const { isLoading, isError, error, profile, refetch, formatCNPJ } =
    useProfile();
  const { toggleTheme, isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  if (isLoading) {
    return (
      <LoadingScreen>
        <Text style={{ color: colors.secondaryText, fontSize: 16 }}>
          Carregando seus dados de usuário...
        </Text>
      </LoadingScreen>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={[styles.text, { textAlign: "center", marginBottom: 20 }]}>
          Erro ao carregar perfil: {error?.message}
        </Text>
        <ButtonArea title="Tentar novamente" action={refetch} size="medium" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar ajustado para ambos os temas */}
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
      <View style={styles.headerCardVertical}>
        <View style={styles.avatarWrapVertical}>
          <Icon name="user-circle-o" size={96} color={colors.iconColor} />
        </View>
        {profile && (
          <View style={styles.headerTextVertical}>
            <Text style={styles.userName}>{profile.nmUsuario}</Text>
            <Text style={styles.userEmail}>{profile.nmEmail}</Text>
          </View>
        )}
      </View>
      <View style={styles.profileSection}>
        {profile && (
          <View style={styles.userInfoGrid}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Filial</Text>
              <Text style={styles.infoValue}>
                {`${profile.idFilial.idContato.nmDono}`}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Grupo</Text>
              <Text style={styles.infoValue}>{profile.idPerfil.nmPerfil}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>CNPJ</Text>
              <Text style={styles.infoValue}>
                {formatCNPJ(profile.idFilial.cnpjFilial)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Supervisor</Text>
              <Text style={styles.infoValue}>
                {profile.idFilial.idContato.nmDono}
              </Text>
            </View>
            <View style={[styles.infoRow, { alignItems: "flex-start" }]}>
              <Text style={styles.infoLabel}>Endereço</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    width: "70%",
                    textAlign: "right",
                  },
                ]}
              >
                {profile.idFilial.idEndereco.nmLogradouro},{" "}
                {profile.idFilial.idEndereco.idCidade.nmCidade},{" "}
                {profile.idFilial.idEndereco.idCidade.idEstado.nmEstado}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Theme toggle */}
      <View style={[styles.actionsSection, { marginBottom: 16 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={[styles.infoValue, { fontSize: 14 }]}>
              Tema {isDarkTheme ? "Escuro" : "Claro"}
            </Text>
          </View>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#41C526" }}
            thumbColor={isDarkTheme ? "#FFFFFF" : "#f4f3f4"}
          />
        </View>
      </View>

      <ButtonArea
        title="Deslogar"
        action={logout}
        size="medium"
        additionalStyles={{
          backgroundColor: "#DC143C",
          shadowColor: "#DC143C",
        }}
      />
    </SafeAreaView>
  );
};

export default Settings;
