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
  StatusBar,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import useAllFiliais from "@/control/CadastroController";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";

const Cadastro = () => {
  const { t } = useTranslation();
=======

const Cadastro = () => {
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
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

  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

<<<<<<< HEAD
=======
  // Debug logs
  console.log("Filiais no componente:", filiais);
  console.log("Loading:", filialLoading);
  console.log("Error:", filialError);
  console.log("Form:", form);

>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
  if (filialLoading || cadastroForm.isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color="#41C526" />
<<<<<<< HEAD
          <Text style={styles.loadingText}>{t("register.loadingText")}</Text>
=======
          <Text style={styles.loadingText}>Criando sua conta...</Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
        </View>
      </SafeAreaView>
    );
  }
  if (filialError) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>
<<<<<<< HEAD
            {t("register.errorPrefix")}{" "}
=======
            Ah não, deu erro:{" "}
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
            {filialError?.message ?? cadastroForm.error?.message}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
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
          <View style={styles.cadastroCard}>
            <View style={styles.header}>
<<<<<<< HEAD
              <Text style={styles.welcomeText}>{t("register.title")}</Text>
              <Text style={styles.subtitleText}>
                {t("register.subtitle")}{" "}
                <Text style={styles.brandHighlight}>
                  {t("register.brandName")}
                </Text>
=======
              <Text style={styles.welcomeText}>Crie sua conta!</Text>
              <Text style={styles.subtitleText}>
                Cadastre-se no{" "}
                <Text style={styles.brandHighlight}>GPSMottu</Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
              </Text>
            </View>
            {cadastroForm.error ? (
              <View style={styles.errorContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={18}
                  color="#FF4444"
                  style={styles.errorIcon}
                />
                <Text style={styles.errorText}>
                  {cadastroForm.error.message}
                </Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={styles.inputContainer}>
              {/* Nome Input */}
              <View style={styles.inputWrapper}>
<<<<<<< HEAD
                <Text style={styles.inputLabel}>{t("register.nameLabel")}</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("register.namePlaceholder")}
=======
                <Text style={styles.inputLabel}>Nome</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite seu nome"
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={form.nome}
                  onChangeText={(text) => handleForm(text, "nome")}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {formErrors.nome && (
<<<<<<< HEAD
                  <Text style={styles.fieldErrorText}>{formErrors.nome}</Text>
=======
                  <Text style={styles.fieldErrorText}>
                    {formErrors.nome}
                  </Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                )}
              </View>

              <View style={styles.inputWrapper}>
<<<<<<< HEAD
                <Text style={styles.inputLabel}>
                  {t("register.emailLabel")}
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("register.emailPlaceholder")}
=======
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite seu email"
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={form.email}
                  onChangeText={(text) => handleForm(text, "email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {formErrors.email && (
<<<<<<< HEAD
                  <Text style={styles.fieldErrorText}>{formErrors.email}</Text>
                )}
              </View>

              {/* Filial Picker */}
              <View style={styles.pickerWrapper}>
                <Text style={styles.inputLabel}>
                  {t("register.filialLabel")}
                </Text>

=======
                  <Text style={styles.fieldErrorText}>
                    {formErrors.email}
                  </Text>
                )}
              </View>

              <View style={styles.pickerWrapper}>
                <Text style={styles.inputLabel}>Filial</Text>
                
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={form.idFilial || 0}
                    onValueChange={(idFilial) => {
                      console.log("Picker onValueChange:", idFilial);
                      if (idFilial && idFilial !== 0) {
                        handleForm(idFilial.toString(), "idFilial");
<<<<<<< HEAD
                        const filial = filiais?.find(
                          (f) => f.idFilial === idFilial,
                        );
=======
                        const filial = filiais?.find(f => f.idFilial === idFilial);
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                        setSelectedFilial(filial || null);
                      }
                    }}
                    style={styles.picker}
                    dropdownIconColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  >
                    <Picker.Item
<<<<<<< HEAD
                      label={t("register.filialPlaceholder")}
                      value={0}
                      color={isDarkTheme ? "#8B8B8B" : "#666"}
                    />
                    {filiais && filiais.length > 0 ? (
                      filiais.map((filial) => {
                        console.log("Renderizando filial:", filial);
                        const label =
                          filial.idContato?.nmDono ||
                          `Filial ${filial.idFilial}`;
=======
                      label="Selecione uma filial"
                      value={0}
                      color={isDarkTheme ? "#8B8B8B" : "#666"}
                    />
                    {filiais && filiais.length > 0 ?
                      filiais.map((filial) => {
                        console.log("Renderizando filial:", filial);
                        const label = filial.idContato?.nmDono || `Filial ${filial.idFilial}`;
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                        return (
                          <Picker.Item
                            value={filial.idFilial}
                            key={filial.idFilial}
                            label={label}
                            color={isDarkTheme ? "#8B8B8B" : "#666"}
                          />
                        );
<<<<<<< HEAD
                      })
                    ) : (
                      <Picker.Item
                        label={t("register.filialNone")}
                        value={-1}
                        color="#FF0000"
                      />
                    )}
                  </Picker>
                </View>
=======
                      }) : (
                        <Picker.Item
                          label="Nenhuma filial disponível"
                          value={-1}
                          color="#FF0000"
                        />
                      )
                    }
                  </Picker>
                </View>
                
               
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
<<<<<<< HEAD
                <Text style={styles.inputLabel}>
                  {t("register.passwordLabel")}
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("register.passwordPlaceholder")}
=======
                <Text style={styles.inputLabel}>Senha</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Digite sua senha"
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={form.senha}
                  onChangeText={(text) => handleForm(text, "senha")}
                  secureTextEntry
                  autoComplete="password"
                />
                {formErrors.senha && (
<<<<<<< HEAD
                  <Text style={styles.fieldErrorText}>{formErrors.senha}</Text>
=======
                  <Text style={styles.fieldErrorText}>
                    {formErrors.senha}
                  </Text>
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
                )}
              </View>
            </View>

            {/* Register Button */}
            <View style={styles.buttonContainer}>
<<<<<<< HEAD
              <ButtonArea
                size="small"
                title={t("register.registerButton")}
                action={salvar}
              />
=======
              <ButtonArea size="small" title="Registrar" action={salvar} />
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Cadastro;
