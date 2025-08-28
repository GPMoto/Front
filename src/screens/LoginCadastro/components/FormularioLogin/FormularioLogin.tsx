import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useRef } from "react";
import { formularioLoginStyles } from "./FormularioLoginStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthControl } from "@/control/AuthController";

export default function FormularioLogin(props: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);
  //TODO: receber error do controller useAuthControl()
  const { loading, loginUser, loginErrors, error } = useAuthControl();

  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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
                <Text style={formularioLoginStyles.inputLabel}>Email</Text>
                <TextInput
                  style={[
                    formularioLoginStyles.inputField,
                    emailFocused && formularioLoginStyles.inputFieldFocused,
                  ]}
                  placeholder="Digite seu email"
                  placeholderTextColor="#8B8B8B"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
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
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={[
                      formularioLoginStyles.inputField,
                      senhaFocused && formularioLoginStyles.inputFieldFocused,
                      { paddingRight: 50 },
                    ]}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#8B8B8B"
                    value={senha}
                    onChangeText={setSenha}
                    onFocus={() => setSenhaFocused(true)}
                    onBlur={() => setSenhaFocused(false)}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                    editable={!loading}
                    blurOnSubmit={true}
                    returnKeyType="done"
                    onSubmitEditing={() =>
                      loginUser({ email, password: senha })
                    }
                  />
                  {loginErrors.password && (
                    <Text style={formularioLoginStyles.fieldErrorText}>
                      {loginErrors.password}
                    </Text>
                  )}

                  <Pressable
                    style={{
                      position: "absolute",
                      right: 15,
                      top: 15,
                      padding: 5,
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={24}
                      color="#8B8B8B"
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Login Button */}
            <View style={formularioLoginStyles.buttonContainer}>
              <Pressable
                onPress={() => loginUser({ email, password: senha })}
                onPressIn={handleButtonPressIn}
                onPressOut={handleButtonPressOut}
                disabled={loading}
                style={({ pressed }) => [
                  formularioLoginStyles.loginButton,
                  pressed && formularioLoginStyles.loginButtonPressed,
                ]}
              >
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={formularioLoginStyles.loginButtonText}>
                      Entrar
                    </Text>
                  )}
                </Animated.View>
              </Pressable>
            </View>

            {/* Forgot Password */}
            <View style={formularioLoginStyles.forgotPasswordContainer}>
              <Text style={formularioLoginStyles.forgotPasswordText}>
                Esqueceu sua senha?{" "}
                <Text style={formularioLoginStyles.forgotPasswordLink}>
                  Clique aqui
                </Text>
              </Text>
            </View>

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
              <Text style={formularioLoginStyles.footerLink}>Cadastre-se</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
