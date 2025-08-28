import React from "react";
import { View } from "react-native";
import FormularioUwb from "./components/FormularioUwb/FormularioUwb";
import { globalStyles } from "../../styles/styles";

interface FormularioPaginaProps {
  identificador: string;
  setIdentificador: (value: string) => void;
  setLoading: (value: boolean) => void;
}

function FormularioPagina({
  identificador,
  setIdentificador,
  setLoading,
}: FormularioPaginaProps) {
  return (
    <View
      style={[
        globalStyles.container,
        {
          width: "80%",
          alignSelf: "center",
          display: identificador ? "flex" : "none",
        },
      ]}
    >
      <FormularioUwb
        identificador={identificador}
        setIdentificador={setIdentificador}
        setLoading={setLoading}
      />
    </View>
  );
}

export default FormularioPagina;
