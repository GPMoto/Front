import { useAuth } from "@/context/AuthContext";
import { ParamListBase } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useProfile } from "@/control/ProfileController";
import styles from "./styles";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ButtonArea from "@/components/Button/ButtonArea";

interface SettingsProps extends ParamListBase {}

const Settings = (props: SettingsProps) => {
  const { logout } = useAuth();
  const { isLoading, isError, error, profile, refetch, formatCNPJ } =
    useProfile();

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
            <Text style={styles.userName}>{profile.nmUsuario}</Text>
            <Text style={styles.userEmail}>{profile.nmEmail}</Text>
            <Text style={styles.userDetail}>
              Filial: {profile.idFilial.nome}
            </Text>
            <Text style={styles.userDetail}>
              Grupo: {profile.idPerfil.nmPerfil}
            </Text>
            <Text style={styles.userDetail}>
              CNPJ Filial: {formatCNPJ(profile.idFilial.cnpjFilial)}
            </Text>
            <Text style={styles.userDetail}>
              Supervisor(a) da filial: {profile.idFilial.idContato.nmDono}
            </Text>
            <Text style={[styles.userDetail, { textAlign: "center" }]}>
              Endereço: {profile.idFilial.idEndereco.nmLogradouro},{" "}
              {profile.idFilial.idEndereco.idCidade.nmCidade},{" "}
              {profile.idFilial.idEndereco.idCidade.idEstado.nmEstado}
            </Text>
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
