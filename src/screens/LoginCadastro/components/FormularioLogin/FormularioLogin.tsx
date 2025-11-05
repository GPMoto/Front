import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthControl } from "@/control/AuthController";
import ButtonArea from "@/components/Button/ButtonArea";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormularioLogin() {
=======

export default function FormularioLogin(props: any) {
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
  const {
    loading,
    loginUser,
    loginErrors,
    error,
    handleForm,
    formulario,
    goToRegisterPage,
  } = useAuthControl();

  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);
<<<<<<< HEAD
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);
=======
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.loginCard}>
            {/* Header */}
            <View style={styles.header}>
<<<<<<< HEAD
              <Text style={styles.welcomeText}>{t("home.welcome")}</Text>
              <Text style={styles.subtitleText}>{t("login.subtitle")}</Text>
=======
              <Text style={styles.welcomeText}>
                Bem-vindo de volta!
              </Text>
              <Text style={styles.subtitleText}>
                Entre na sua conta do{" "}
                <Text style={styles.brandHighlight}>
                  GPSMottu
                </Text>
              </Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={18}
                  color="#FF4444"
                  style={styles.errorIcon}
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={styles.inputContainer}>
              {/* Email Input */}
              <View style={styles.inputWrapper}>
<<<<<<< HEAD
                <Text style={styles.inputLabel}>{t("login.emailLabel")}</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("login.emailPlaceholder")}
=======
                <Text style={styles.inputLabel}>Nome</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite seu nome"
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={formulario.email}
                  onChangeText={(text) => handleForm(text, "email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  editable={!loading}
                  blurOnSubmit={false}
                  returnKeyType="next"
                />
                {loginErrors.email && (
<<<<<<< HEAD
                  <Text style={styles.fieldErrorText}>{loginErrors.email}</Text>
=======
                  <Text style={styles.fieldErrorText}>
                    {loginErrors.email}
                  </Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
<<<<<<< HEAD
                <Text style={styles.inputLabel}>
                  {t("login.passwordLabel")}
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("login.passwordPlaceholder")}
=======
                <Text style={styles.inputLabel}>Senha</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite sua senha"
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={formulario.senha}
                  onChangeText={(text) => handleForm(text, "senha")}
                  secureTextEntry
                  autoComplete="password"
                  editable={!loading}
                  blurOnSubmit={true}
                  returnKeyType="done"
                  onSubmitEditing={loginUser}
                />
                {loginErrors.senha && (
<<<<<<< HEAD
                  <Text style={styles.fieldErrorText}>{loginErrors.senha}</Text>
=======
                  <Text style={styles.fieldErrorText}>
                    {loginErrors.senha}
                  </Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                )}
              </View>
            </View>

            {/* Login Button */}
            <View style={styles.buttonContainer}>
<<<<<<< HEAD
              <ButtonArea
                size="small"
                title={t("login.loginButton")}
                action={() => {
                  loginUser();
                }}
              />
=======
              <ButtonArea size="small" title="Entrar" action={() => {
                loginUser()}} />
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
            </View>

            {/* Loading Overlay */}
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#41C526" size="large" />
              </View>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
<<<<<<< HEAD
              {t("login.noAccount")}{" "}
              <Text style={styles.footerLink} onPress={goToRegisterPage}>
                {t("login.registerLink")}
=======
              Não tem uma conta?{" "}
              <Text
                style={styles.footerLink}
                onPress={goToRegisterPage}
              >
                Cadastre-se
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
