import { useAuth } from "@/context/AuthContext";
import { ParamListBase } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useProfile } from "@/control/ProfileController";
import { StyleSheet } from "react-native";
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
      <View style={styles.headerCardVertical}>
        <View style={styles.avatarWrapVertical}>
          <Icon name="user-circle-o" size={96} color="#FFFFFF" />
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
              <Text style={styles.infoValue}>{profile.idFilial.nome}</Text>
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
                style={[styles.infoValue, { width: "70%", textAlign: "right" }]}
              >
                {profile.idFilial.idEndereco.nmLogradouro},{" "}
                {profile.idFilial.idEndereco.idCidade.nmCidade},{" "}
                {profile.idFilial.idEndereco.idCidade.idEstado.nmEstado}
              </Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.logoutButtonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C0C0C",
    padding: 20,
  },
  profileSection: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: 'center',
    width: '100%',
    maxWidth: 720,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  userInfo: {
    alignItems: "center",
    width: "100%",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  userEmail: {
    fontSize: 16,
    color: "#BFC9B8",
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 14,
    color: "#9FB99A",
    marginBottom: 3,
  },
  actionsSection: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 720,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  headerCardVertical: {
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginBottom: 16,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 720,
  },
  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: "rgba(65,197,38,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#2C2C2C",
  },
  avatarWrapVertical: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 3,
    borderColor: "rgba(65,197,38,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#2C2C2C",
  },
  headerText: {
    flex: 1,
  },
  headerTextVertical: {
    alignItems: "center",
  },
  userInfoGrid: {
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(65,197,38,0.04)",
  },
  infoLabel: {
    color: "#BFC9B8",
    fontSize: 14,
    width: "30%",
  },
  infoValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#DC143C",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    alignSelf: 'center',
    minWidth: 160,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
