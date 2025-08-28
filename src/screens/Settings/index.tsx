import { useAuth } from "@/context/AuthContext";
import { ParamListBase } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useProfile } from "@/control/ProfileController";
import { useEffect } from "react";
import styles from "./styles";
import LoadingScreen from "@/components/shared/LoadingScreen";

interface SettingsProps extends ParamListBase {}

const Settings = (props: SettingsProps) => {
  const { loading, usuario, getUserInfo } = useProfile();
  const { logout } = useAuth();

  useEffect(() => {
    console.log("Settings useEffect executado");
    getUserInfo();
  }, []); 

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Icon name="user-circle-o" size={80} color="#007AFF" />
        </View>

        {usuario && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{usuario?.nome}</Text>
            <Text style={styles.userEmail}>{usuario?.email}</Text>
            <Text style={styles.userDetail}>Filial: {usuario?.filial}</Text>
            <Text style={styles.userDetail}>Grupo: {usuario?.grupo}</Text>
          </View>
        )}
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Deslogar</Text>
        </TouchableOpacity>
      </View>

      <LoadingScreen visible={loading}>
        <Text style={{ color: "#666", fontSize: 16 }}>
          Carregando seus dados de usuário...
        </Text>
      </LoadingScreen>
    </View>
  );
};

export default Settings;
