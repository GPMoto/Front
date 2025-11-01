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
import { useTranslation } from "react-i18next";

const Cadastro = () => {
  const { t } = useTranslation();
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

  if (filialLoading || cadastroForm.isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color="#41C526" />
          <Text style={styles.loadingText}>{t("register.loadingText")}</Text>
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
            {t("register.errorPrefix")}{" "}
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
              <Text style={styles.welcomeText}>{t("register.title")}</Text>
              <Text style={styles.subtitleText}>
                {t("register.subtitle")}{" "}
                <Text style={styles.brandHighlight}>
                  {t("register.brandName")}
                </Text>
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
                <Text style={styles.inputLabel}>{t("register.nameLabel")}</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("register.namePlaceholder")}
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={form.nome}
                  onChangeText={(text) => handleForm(text, "nome")}
                  keyboardType="default"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {formErrors.nome && (
                  <Text style={styles.fieldErrorText}>{formErrors.nome}</Text>
                )}
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  {t("register.emailLabel")}
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("register.emailPlaceholder")}
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={form.email}
                  onChangeText={(text) => handleForm(text, "email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {formErrors.email && (
                  <Text style={styles.fieldErrorText}>{formErrors.email}</Text>
                )}
              </View>

              {/* Filial Picker */}
              <View style={styles.pickerWrapper}>
                <Text style={styles.inputLabel}>
                  {t("register.filialLabel")}
                </Text>

                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={form.idFilial || 0}
                    onValueChange={(idFilial) => {
                      console.log("Picker onValueChange:", idFilial);
                      if (idFilial && idFilial !== 0) {
                        handleForm(idFilial.toString(), "idFilial");
                        const filial = filiais?.find(
                          (f) => f.idFilial === idFilial,
                        );
                        setSelectedFilial(filial || null);
                      }
                    }}
                    style={styles.picker}
                    dropdownIconColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  >
                    <Picker.Item
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
                        return (
                          <Picker.Item
                            value={filial.idFilial}
                            key={filial.idFilial}
                            label={label}
                            color={isDarkTheme ? "#8B8B8B" : "#666"}
                          />
                        );
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
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  {t("register.passwordLabel")}
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t("register.passwordPlaceholder")}
                  placeholderTextColor={isDarkTheme ? "#8B8B8B" : "#666"}
                  value={form.senha}
                  onChangeText={(text) => handleForm(text, "senha")}
                  secureTextEntry
                  autoComplete="password"
                />
                {formErrors.senha && (
                  <Text style={styles.fieldErrorText}>{formErrors.senha}</Text>
                )}
              </View>
            </View>

            {/* Register Button */}
            <View style={styles.buttonContainer}>
              <ButtonArea
                size="small"
                title={t("register.registerButton")}
                action={salvar}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Cadastro;
