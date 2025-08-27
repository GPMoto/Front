import { useAuth } from "@/context/AuthContext";
import { ParamListBase } from "@react-navigation/native";
import { Button, View } from "react-native";

interface SettingsProps extends ParamListBase {}

const Settings = (props: SettingsProps) => {
  const { logout } = useAuth();
  return (
    <View>
      <Button title="Deslogar" onPress={logout} />
    </View>
  );
};

export default Settings;
