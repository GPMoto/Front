import { View, StatusBar, SafeAreaView } from "react-native";
import FormularioLogin from "./components/FormularioLogin/FormularioLogin";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";

export default function LoginCadastro(props: any) {
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
      <FormularioLogin {...props}></FormularioLogin>
    </SafeAreaView>
  );
}


