import ButtonArea from "@/components/Button/ButtonArea";
import { useAuthControl } from "@/control/AuthController";
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { cadastroStyles } from "./CadastroStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import useAllFiliais from "@/control/CadastroController";

const Cadastro = () => {
  const {
    data: filiais,
    error: filialError,
    isLoading: filialLoading,
    selectedFilial,
    setSelectedFilial,
    form,
    handleForm,
    cadastroForm,
    formErrors,
    salvar,
  } = useAllFiliais();

  if (filialLoading || cadastroForm.isPending) {
    return (
      <View style={cadastroStyles.loadingContainer}>
        <ActivityIndicator size={"large"} color="#41C526" />
        <Text style={cadastroStyles.loadingText}>Criando sua conta...</Text>
      </View>
    );
  }
  if (filialError) {
    return (
      <View style={cadastroStyles.loadingContainer}>
        <Text style={cadastroStyles.errorText}>
          Ah não, deu erro:{" "}
          {filialError?.message ?? cadastroForm.error?.message}
        </Text>
      </View>
    );
  }
  return (
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
              <Text style={cadastroStyles.welcomeText}>Crie sua conta!</Text>
              <Text style={cadastroStyles.subtitleText}>
                Cadastre-se no{" "}
                <Text style={cadastroStyles.brandHighlight}>GPSMottu</Text>
              </Text>
            </View>
            {cadastroForm.error ? (
              <View style={cadastroStyles.errorContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={18}
                  color="#FF4444"
                  style={cadastroStyles.errorIcon}
                />
                <Text style={cadastroStyles.errorText}>
                  {cadastroForm.error.message}
                </Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={cadastroStyles.inputContainer}>
              {/* Nome Input */}
              <View style={cadastroStyles.inputWrapper}>
                <Text style={cadastroStyles.inputLabel}>Nome</Text>
                <TextInput
                  style={cadastroStyles.inputField}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#8B8B8B"
                  value={form.nome}
                  onChangeText={(text) => handleForm(text, "nome")}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {formErrors.nome && (
                  <Text style={cadastroStyles.fieldErrorText}>
                    {formErrors.nome}
                  </Text>
                )}
              </View>

              <View style={cadastroStyles.inputWrapper}>
                <Text style={cadastroStyles.inputLabel}>Email</Text>
                <TextInput
                  style={cadastroStyles.inputField}
                  placeholder="Digite seu email"
                  placeholderTextColor="#8B8B8B"
                  value={form.email}
                  onChangeText={(text) => handleForm(text, "email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {formErrors.email && (
                  <Text style={cadastroStyles.fieldErrorText}>
                    {formErrors.email}
                  </Text>
                )}
              </View>

              {/* Filial Picker */}
              <View style={cadastroStyles.pickerWrapper}>
                <Text style={cadastroStyles.inputLabel}>Filial</Text>
                <View style={cadastroStyles.pickerContainer}>
                  <Picker
                    selectedValue={selectedFilial}
                    onValueChange={(filial) => {
                      setSelectedFilial(filial);
                      if (filial) {
                        handleForm(filial.idFilial.toString(), "filial");
                      }
                    }}
                    style={cadastroStyles.picker}
                    dropdownIconColor="#8B8B8B"
                  >
                    <Picker.Item
                      label="Selecione uma filial"
                      value={null}
                      color="#8B8B8B"
                    />
                    {filiais &&
                      filiais.map((filial) => (
                        <Picker.Item
                          value={filial}
                          key={filial.idFilial}
                          label={filial.nome}
                          color="#000000"
                        />
                      ))}
                  </Picker>
                </View>
              </View>

              {/* Password Input */}
              <View style={cadastroStyles.inputWrapper}>
                <Text style={cadastroStyles.inputLabel}>Senha</Text>
                <TextInput
                  style={cadastroStyles.inputField}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#8B8B8B"
                  value={form.password}
                  onChangeText={(text) => handleForm(text, "password")}
                  secureTextEntry
                  autoComplete="password"
                />
                {formErrors.password && (
                  <Text style={cadastroStyles.fieldErrorText}>
                    {formErrors.password}
                  </Text>
                )}
              </View>
            </View>

            {/* Register Button */}
            <View style={cadastroStyles.buttonContainer}>
              <ButtonArea size="small" title="Registrar" action={salvar} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Cadastro;
