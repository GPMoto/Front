import { useAuth } from "@/context/AuthContext";
import { ParamListBase } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useProfile } from "@/control/ProfileController";
import { useEffect, useState } from "react";
import styles from "./styles";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { ProfileResponse, UserData } from "@/model/User";
import ButtonArea from "@/components/Button/ButtonArea";

interface SettingsProps extends ParamListBase {}

const Settings = (props: SettingsProps) => {
  const { logout } = useAuth();
  const { isLoading, isError, error, profile, refetch } = useProfile();

  if (isLoading) {
    return (
      <LoadingScreen>
        <Text style={{ color: "#666", fontSize: 16 }}>
          Carregando seus dados de usuário...
        </Text>
      </LoadingScreen>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Erro ao carregar perfil: {error?.message}</Text>
        <TouchableOpacity
          onPress={() => {
            <ButtonArea title="Recarregar" action={refetch} size="medium" />;
          }}
        >
          <Text>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Icon name="user-circle-o" size={80} color="#007AFF" />
        </View>

        {profile && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{profile.nome}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
            <Text style={styles.userDetail}>Filial: {profile.filial}</Text>
            <Text style={styles.userDetail}>Grupo: {profile.grupo}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
