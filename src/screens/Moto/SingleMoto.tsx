import { DrawerParamList } from "@/navigators/NavigationTypes";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useMoto } from "@/control/MotoControl";
import ButtonArea from "@/components/Button/ButtonArea";
import { Picker } from "@react-native-picker/picker";
import { useTipoMoto } from "@/control/TipoMotoController";
import { capitalize } from "@/utils/helpers";
import { useEffect } from "react";
import useFilial from "@/control/FilialController";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { createStyles } from "./styles";

const SingleMoto = () => {
  const route = useRoute<RouteProp<DrawerParamList, "Moto">>();
  const navigation = useNavigation();
  const { isDarkTheme } = useTheme();
  const colors = useDarkColors();
  const styles = createStyles(colors, isDarkTheme);

  if (!route.params?.moto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro: Moto não encontrada</Text>
      </View>
    );
  }

  const { editing, moto: routeMoto } = route.params;
  const {
    editingMoto,
    handleEditingForm,
    saveChanges,
    enterEditMode,
    setRouteMoto,
    singleMoto,
    verifyIsCreating,
    saveLoading,
    updateLoading,
    handleSave,
    motoErrors,
  } = useMoto({ motoId: routeMoto.idMoto });
  const { tipoMotos } = useTipoMoto();

  useEffect(() => {
    if (singleMoto.data) {
      setRouteMoto(singleMoto.data);
    }

    if (editing && !editingMoto) {
      const motoToEdit = singleMoto.data || routeMoto;
      enterEditMode(motoToEdit);
    }
  }, [singleMoto.data, editing]);

  const currentMoto = singleMoto.data || routeMoto;
  const moto = editingMoto ?? currentMoto;

  const { secoes, error: secoesError, loading: secoesLoading } = useFilial();

  if (singleMoto.isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <ActivityIndicator size="large" color="#41C526" />
        <Text style={styles.loadingText}>Carregando moto...</Text>
      </SafeAreaView>
    );
  }

  if (singleMoto.isError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          backgroundColor={colors.containerBg}
        />
        <Text style={styles.errorText}>
          Erro ao carregar moto: {singleMoto.error?.message}
        </Text>
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
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <MaterialIcons name="motorcycle" size={32} color="#41C526" />
            <View style={styles.headerText}>
              <Text style={styles.title}>Moto #{moto.idMoto}</Text>
              <Text style={styles.subtitle}>Informações detalhadas</Text>
            </View>
          </View>

          {/* Informações */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.status}</Text>
              ) : (
                <>
                  <View style={[
                    styles.pickerContainer, 
                    styles.editableInput,
                    motoErrors.status && { borderColor: '#FF6B6B', borderWidth: 2 }
                  ]}>
                    <Picker
                      selectedValue={moto.status}
                      onValueChange={(text) => handleEditingForm("status", text)}
                      style={styles.picker}
                      dropdownIconColor="#8B8B8B"
                    >
                      <Picker.Item
                        label="Disponível"
                        value="Disponível"
                        color="#000000"
                      />
                      <Picker.Item
                        label="Manutenção"
                        value="Manutenção"
                        color="#000000"
                      />
                      <Picker.Item
                        label="Vendida"
                        value="Vendida"
                        color="#000000"
                      />
                    </Picker>
                  </View>
                  {motoErrors.status && (
                    <Text style={{ color: '#FF6B6B', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                      {motoErrors.status}
                    </Text>
                  )}
                </>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Condições de Manutenção</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.condicoesManutencao}</Text>
              ) : (
                <>
                  <View style={[
                    styles.pickerContainer, 
                    styles.editableInput,
                    motoErrors.condicoesManutencao && { borderColor: '#FF6B6B', borderWidth: 2 }
                  ]}>
                    <Picker
                      selectedValue={moto.condicoesManutencao}
                      onValueChange={(text) =>
                        handleEditingForm("condicoesManutencao", text)
                      }
                      style={styles.picker}
                      dropdownIconColor="#8B8B8B"
                    >
                      <Picker.Item
                        label="Excelente"
                        value="Excelente"
                        color="#000000"
                      />
                      <Picker.Item label="Boa" value="Boa" color="#000000" />
                      <Picker.Item
                        label="Regular"
                        value="Regular"
                        color="#000000"
                      />
                      <Picker.Item label="Ruim" value="Ruim" color="#000000" />
                      <Picker.Item
                        label="Péssima"
                        value="Péssima"
                        color="#000000"
                      />
                    </Picker>
                  </View>
                  {motoErrors.condicoesManutencao && (
                    <Text style={{ color: '#FF6B6B', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                      {motoErrors.condicoesManutencao}
                    </Text>
                  )}
                </>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo da Moto</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.idTipoMoto.nmTipo}</Text>
              ) : (
                <>
                  <View style={[
                    styles.pickerContainer, 
                    styles.editableInput,
                    motoErrors.idTipoMoto && { borderColor: '#FF6B6B', borderWidth: 2 }
                  ]}>
                    <Picker
                      selectedValue={moto.idTipoMoto}
                      onValueChange={(value) =>
                        handleEditingForm("idTipoMoto", value)
                      }
                      style={styles.picker}
                      dropdownIconColor="#8B8B8B"
                    >
                      {tipoMotos.data?.map((tipoMoto) => (
                        <Picker.Item
                          label={capitalize(tipoMoto.nmTipo)}
                          value={tipoMoto}
                          key={tipoMoto.id_tipo_moto}
                        />
                      ))}
                    </Picker>
                  </View>
                  {motoErrors.idTipoMoto && (
                    <Text style={{ color: '#FF6B6B', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                      {typeof motoErrors.idTipoMoto === 'string' ? motoErrors.idTipoMoto : 'Tipo da moto é obrigatório'}
                    </Text>
                  )}
                </>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Identificador</Text>
              {!editing ? (
                <Text style={styles.infoValue}>{moto.identificador}</Text>
              ) : (
                <>
                  <TextInput
                    style={[
                      styles.editableInput,
                      motoErrors.identificador && { borderColor: '#FF6B6B', borderWidth: 2 }
                    ]}
                    value={moto.identificador}
                    onChangeText={(text) =>
                      handleEditingForm("identificador", text)
                    }
                  />
                  {motoErrors.identificador && (
                    <Text style={{ color: '#FF6B6B', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                      {motoErrors.identificador}
                    </Text>
                  )}
                </>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Seção da moto</Text>
              {!editing ? (
                <Text style={styles.infoValue}>
                  {moto.idSecaoFilial.idTipoSecao.nmSecao}
                </Text>
              ) : (
                <>
                  <View style={[
                    styles.pickerContainer, 
                    styles.editableInput,
                    motoErrors.idSecaoFilial && { borderColor: '#FF6B6B', borderWidth: 2 }
                  ]}>
                    <Picker
                      selectedValue={moto.idSecaoFilial}
                      onValueChange={(value) =>
                        handleEditingForm("idSecaoFilial", value)
                      }
                      style={styles.picker}
                      dropdownIconColor="#8B8B8B"
                    >
                      {secoes &&
                        secoes.map((secao) => (
                          <Picker.Item
                            label={capitalize(secao.idTipoSecao.nmSecao)}
                            value={secao}
                            key={secao.idSecao}
                          />
                        ))}
                    </Picker>
                  </View>
                  {motoErrors.idSecaoFilial && (
                    <Text style={{ color: '#FF6B6B', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                      {typeof motoErrors.idSecaoFilial === 'string' ? motoErrors.idSecaoFilial : 'Seção filial é obrigatória'}
                    </Text>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <View style={{ padding: 16 }}>
        {/* Mostrar resumo de erros se houver */}
        {editing && Object.keys(motoErrors).length > 0 && (
          <View style={{
            backgroundColor: isDarkTheme ? '#2D1B1B' : '#FFF5F5',
            borderColor: '#FF6B6B',
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
          }}>
            <Text style={{ color: '#FF6B6B', fontWeight: 'bold', marginBottom: 8 }}>
              Corrija os seguintes erros:
            </Text>
            {Object.values(motoErrors).map((error, index) => (
              <Text key={index} style={{ color: '#FF6B6B', fontSize: 12, marginBottom: 4 }}>
                • {error}
              </Text>
            ))}
          </View>
        )}
        
        {editing && verifyIsCreating(moto) && saveLoading ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color="#41C526" />
            <Text style={{ color: "#41C526", marginLeft: 8 }}>
              Cadastrando moto...
            </Text>
          </View>
        ) : editing && updateLoading ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color="#41C526" />
            <Text style={{ color: "#41C526", marginLeft: 8 }}>
              Salvando alterações...
            </Text>
          </View>
        ) : (
          <ButtonArea
            title={!editing ? "Editar" : "Salvar"}
            size="medium"
            action={() => {
              if (editing) {
                if (verifyIsCreating(moto)) {
                  handleSave();
                  // A navegação agora é controlada pelo MotoControl baseada no sucesso/erro
                } else {
                  saveChanges();
                  // A navegação agora é controlada pelo MotoControl baseada no sucesso/erro
                }
              } else {
                enterEditMode(routeMoto);
              }
            }}
          />
        )}
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SingleMoto;
