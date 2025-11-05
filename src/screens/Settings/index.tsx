<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
import { useAuth } from "@/context/AuthContext";
import { ParamListBase } from "@react-navigation/native";
import {
  Text,
  View,
  Switch,
  StyleSheet,
  StatusBar,
  SafeAreaView,
<<<<<<< HEAD
  TouchableOpacity,
  ScrollView,
=======
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
} from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useProfile } from "@/control/ProfileController";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ButtonArea from "@/components/Button/ButtonArea";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileService from "@/services/ProfileService";
=======
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4

interface SettingsProps extends ParamListBase {}

const Settings = (props: SettingsProps) => {
<<<<<<< HEAD
  const { logout, token: authToken } = useAuth();
=======
  const { logout } = useAuth();
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
  const { isLoading, isError, error, profile, refetch, formatCNPJ } =
    useProfile();
  const { toggleTheme, isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);
<<<<<<< HEAD
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem("language", lang);

    await new ProfileService(authToken).saveLanguagePreference(
      translateToExpectedSpringEnums(lang),
    );
    setCurrentLanguage(lang);
  };

  const languages = [
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  const translateToExpectedSpringEnums = (lang: string) => {
    lang = lang.toUpperCase();

    switch (lang) {
      case "PT-BR":
        return "PTBR";
      case "EN":
        return lang;
      case "ES":
        return lang;
      default:
        return "PTBR";
    }
  };
=======
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4

  if (isLoading) {
    return (
      <LoadingScreen>
        <Text style={{ color: colors.secondaryText, fontSize: 16 }}>
<<<<<<< HEAD
          {t("settings.loadingText")}
=======
          Carregando seus dados de usuário...
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
        </Text>
      </LoadingScreen>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={[styles.text, { textAlign: "center", marginBottom: 20 }]}>
<<<<<<< HEAD
          {t("settings.errorPrefix")} {error?.message}
        </Text>
        <ButtonArea
          title={t("settings.retryButton")}
          action={refetch}
          size="medium"
        />
=======
          Erro ao carregar perfil: {error?.message}
        </Text>
        <ButtonArea title="Tentar novamente" action={refetch} size="medium" />
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar ajustado para ambos os temas */}
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={colors.containerBg}
      />
<<<<<<< HEAD
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
      >
        <View style={styles.headerCardVertical}>
          <View style={styles.avatarWrapVertical}>
            <Icon name="user-circle-o" size={96} color={colors.iconColor} />
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
                <Text style={styles.infoLabel}>
                  {t("settings.filialLabel")}
                </Text>
                <Text style={styles.infoValue}>
                  {`${profile.idFilial.idContato.nmDono}`}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t("settings.groupLabel")}</Text>
                <Text style={styles.infoValue}>
                  {profile.idPerfil.nmPerfil}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{t("settings.cnpjLabel")}</Text>
                <Text style={styles.infoValue}>
                  {formatCNPJ(profile.idFilial.cnpjFilial)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {t("settings.supervisorLabel")}
                </Text>
                <Text style={styles.infoValue}>
                  {profile.idFilial.idContato.nmDono}
                </Text>
              </View>
              <View style={[styles.infoRow, { alignItems: "flex-start" }]}>
                <Text style={styles.infoLabel}>
                  {t("settings.addressLabel")}
                </Text>
                <Text
                  style={[
                    styles.infoValue,
                    {
                      width: "70%",
                      textAlign: "right",
                    },
                  ]}
                >
                  {profile.idFilial.idEndereco.nmLogradouro},{" "}
                  {profile.idFilial.idEndereco.idCidade.nmCidade},{" "}
                  {profile.idFilial.idEndereco.idCidade.idEstado.nmEstado}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Language Selector */}
        <View style={[styles.actionsSection, { marginBottom: 16 }]}>
          <Text style={[styles.infoLabel, { marginBottom: 12 }]}>
            {t("language")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 8,
            }}
          >
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => changeLanguage(lang.code)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor:
                    currentLanguage === lang.code
                      ? "#41C526"
                      : isDarkTheme
                        ? "#2A2A2A"
                        : "#F5F5F5",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor:
                    currentLanguage === lang.code ? "#41C526" : "transparent",
                }}
              >
                <Text style={{ fontSize: 24, marginBottom: 4 }}>
                  {lang.flag}
                </Text>
                <Text
                  style={{
                    color:
                      currentLanguage === lang.code
                        ? "#FFFFFF"
                        : colors.primaryText,
                    fontSize: 12,
                    fontWeight:
                      currentLanguage === lang.code ? "bold" : "normal",
                  }}
                >
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Theme toggle */}
        <View style={[styles.actionsSection, { marginBottom: 16 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={[styles.infoValue, { fontSize: 14 }]}>
                {isDarkTheme
                  ? t("settings.themeDark")
                  : t("settings.themeLight")}
              </Text>
            </View>
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#41C526" }}
              thumbColor={isDarkTheme ? "#FFFFFF" : "#f4f3f4"}
            />
          </View>
        </View>

        <ButtonArea
          title={t("settings.logoutButton")}
          action={logout}
          size="medium"
          additionalStyles={{
            backgroundColor: "#DC143C",
            shadowColor: "#DC143C",
          }}
        />
      </ScrollView>
=======
      <View style={styles.headerCardVertical}>
        <View style={styles.avatarWrapVertical}>
          <Icon name="user-circle-o" size={96} color={colors.iconColor} />
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
              <Text style={styles.infoValue}>
                {`${profile.idFilial.idContato.nmDono}`}
              </Text>
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
                style={[
                  styles.infoValue,
                  {
                    width: "70%",
                    textAlign: "right",
                  },
                ]}
              >
                {profile.idFilial.idEndereco.nmLogradouro},{" "}
                {profile.idFilial.idEndereco.idCidade.nmCidade},{" "}
                {profile.idFilial.idEndereco.idCidade.idEstado.nmEstado}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Theme toggle */}
      <View style={[styles.actionsSection, { marginBottom: 16 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={[styles.infoValue, { fontSize: 14 }]}>
              Tema {isDarkTheme ? "Escuro" : "Claro"}
            </Text>
          </View>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#41C526" }}
            thumbColor={isDarkTheme ? "#FFFFFF" : "#f4f3f4"}
          />
        </View>
      </View>

      <ButtonArea
        title="Deslogar"
        action={logout}
        size="medium"
        additionalStyles={{
          backgroundColor: "#DC143C",
          shadowColor: "#DC143C",
        }}
      />
>>>>>>> cee338f32f23dd48f4a42370af22eed620c488e4
    </SafeAreaView>
  );
};

export default Settings;
