import ButtonArea from "@/components/Button/ButtonArea";
import { useAuthControl } from "@/control/AuthController";
import { ActivityIndicator, Text, TextInput, View } from "react-native";

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
      <View style={{ padding: 32 }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Ah não, deu erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 32 }}>
      <Text>Email</Text>
      <TextInput
        value={formulario.email}
        onChangeText={(text) => handleForm(text, "email")}
      />
      {loginErrors.email && <Text>{loginErrors.email}</Text>}
      <Text>Senha</Text>
      {loginErrors.password && <Text>{loginErrors.password}</Text>}

      <TextInput
        value={formulario.password}
        onChangeText={(text) => handleForm(text, "password")}
      />
      <ButtonArea size="small" title="Registrar" action={createAccountUser} />
    </View>
  );
};

export default Cadastro;
