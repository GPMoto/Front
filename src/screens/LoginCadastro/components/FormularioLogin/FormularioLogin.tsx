import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { formularioLoginStyles } from "./FormularioLoginStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthControl } from "@/control/AuthController";
import ButtonArea from "@/components/Button/ButtonArea";

export default function FormularioLogin(props: any) {
  const {
    loading,
    loginUser,
    loginErrors,
    error,
    handleForm,
    formulario,
    goToRegisterPage,
  } = useAuthControl();

  return (
    <View style={formularioLoginStyles.container}>
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
          <View style={formularioLoginStyles.loginCard}>
            {/* Header */}
            <View style={formularioLoginStyles.header}>
              <Text style={formularioLoginStyles.welcomeText}>
                Bem-vindo de volta!
              </Text>
              <Text style={formularioLoginStyles.subtitleText}>
                Entre na sua conta do{" "}
                <Text style={formularioLoginStyles.brandHighlight}>
                  GPSMottu
                </Text>
              </Text>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={formularioLoginStyles.errorContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={18}
                  color="#FF4444"
                  style={formularioLoginStyles.errorIcon}
                />
                <Text style={formularioLoginStyles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={formularioLoginStyles.inputContainer}>
              {/* Email Input */}
              <View style={formularioLoginStyles.inputWrapper}>
                <Text style={formularioLoginStyles.inputLabel}>Nome</Text>
                <TextInput
                  style={formularioLoginStyles.inputField}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#8B8B8B"
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
                  <Text style={formularioLoginStyles.fieldErrorText}>
                    {loginErrors.email}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View style={formularioLoginStyles.inputWrapper}>
                <Text style={formularioLoginStyles.inputLabel}>Senha</Text>
                <TextInput
                  style={formularioLoginStyles.inputField}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#8B8B8B"
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
                  <Text style={formularioLoginStyles.fieldErrorText}>
                    {loginErrors.senha}
                  </Text>
                )}
              </View>
            </View>

            {/* Login Button */}
            <View style={formularioLoginStyles.buttonContainer}>
              <ButtonArea size="small" title="Entrar" action={() => {
                console.log("login cadastro ")
                loginUser()}} />
            </View>

            {/* Forgot Password */}
            { /* <View style={formularioLoginStyles.forgotPasswordContainer}>
              <Text style={formularioLoginStyles.forgotPasswordText}>
                Esqueceu sua senha?{" "}
                <Text style={formularioLoginStyles.forgotPasswordLink}>
                  Clique aqui
                </Text>
              </Text>
            </View> */}

            {/* Loading Overlay */}
            {loading && (
              <View style={formularioLoginStyles.loadingContainer}>
                <ActivityIndicator color="#41C526" size="large" />
              </View>
            )}
          </View>

          {/* Footer */}
          <View style={formularioLoginStyles.footerContainer}>
            <Text style={formularioLoginStyles.footerText}>
              Não tem uma conta?{" "}
              <Text
                style={formularioLoginStyles.footerLink}
                onPress={goToRegisterPage}
              >
                Cadastre-se
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
