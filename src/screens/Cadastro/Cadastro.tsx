import ButtonArea from "@/components/Button/ButtonArea";
import { useAuthControl } from "@/control/AuthController";
import { ActivityIndicator, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { cadastroStyles } from "./CadastroStyles";
import { MaterialIcons } from "@expo/vector-icons";

const Cadastro = () => {
  const {
    createAccountUser,
    loading,
    error,
    handleForm,
    formulario,
    loginErrors,
  } = useAuthControl();
  if (loading) {
    return (
      <View style={cadastroStyles.loadingContainer}>
        <ActivityIndicator size={"large"} color="#41C526" />
        <Text style={cadastroStyles.loadingText}>Criando sua conta...</Text>
      </View>
    );
  }  if (error) {
    return (
      <View style={cadastroStyles.loadingContainer}>
        <Text style={cadastroStyles.errorText}>Ah não, deu erro: {error}</Text>
      </View>
    );
  }return (
    <View style={cadastroStyles.container}>
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
          <View style={cadastroStyles.cadastroCard}>
            <View style={cadastroStyles.header}>
              <Text style={cadastroStyles.welcomeText}>
                Crie sua conta!
              </Text>
              <Text style={cadastroStyles.subtitleText}>
                Cadastre-se no{" "}
                <Text style={cadastroStyles.brandHighlight}>
                  GPSMottu
                </Text>
              </Text>
            </View>
            {error ? (
              <View style={cadastroStyles.errorContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={18}
                  color="#FF4444"
                  style={cadastroStyles.errorIcon}
                />
                <Text style={cadastroStyles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={cadastroStyles.inputContainer}>
              {/* Email Input */}
              <View style={cadastroStyles.inputWrapper}>
                <Text style={cadastroStyles.inputLabel}>Email</Text>
                <TextInput
                  style={cadastroStyles.inputField}
                  placeholder="Digite seu email"
                  placeholderTextColor="#8B8B8B"
                  value={formulario.email}
                  onChangeText={(text) => handleForm(text, "email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {loginErrors.email && <Text style={cadastroStyles.fieldErrorText}>{loginErrors.email}</Text>}
              </View>

              {/* Password Input */}
              <View style={cadastroStyles.inputWrapper}>
                <Text style={cadastroStyles.inputLabel}>Senha</Text>
                <TextInput
                  style={cadastroStyles.inputField}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#8B8B8B"
                  value={formulario.password}
                  onChangeText={(text) => handleForm(text, "password")}
                  secureTextEntry
                  autoComplete="password"
                />
                {loginErrors.password && <Text style={cadastroStyles.fieldErrorText}>{loginErrors.password}</Text>}
              </View>
            </View>

            {/* Register Button */}
            <View style={cadastroStyles.buttonContainer}>
              <ButtonArea size="small" title="Registrar" action={createAccountUser} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Cadastro;
