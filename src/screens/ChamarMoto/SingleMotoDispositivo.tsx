import { Text, TouchableOpacity, View } from "react-native";
import { createStyles } from "./styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { useDarkColors } from "@/styles/theme-config";
import { IMotoIot } from "@/model/types/MotoIotDictionary";
import { statusBadge } from "@/utils/helpers";
import { TFunction } from "i18next";
import { globalStyles } from "@/styles/styles";

interface SingleMotoDispositivoProps {
  localStyles: ReturnType<typeof createStyles>;
  t: TFunction<"translation", undefined>;
  call: () => void;
  item: IMotoIot;
}

export const SingleMotoDispositivo = ({
  item,
  localStyles,
  t,
  call,
}: SingleMotoDispositivoProps) => {
  const badgeColor = statusBadge(item.condicao);

  return (
    <TouchableOpacity
      style={localStyles.card}
      onPress={() => {
        console.log("Selecionou moto:", item.id);
      }}
      activeOpacity={0.8}
    >
      <View style={localStyles.cardHeader}>
        <Text style={[localStyles.cardTitle, globalStyles.whiteText]}>
          {item.nome}
        </Text>
        <View style={[localStyles.badge, { backgroundColor: badgeColor }]}>
          <Text style={[localStyles.badgeText, globalStyles.whiteText]}>
            {item.condicao ?? "—"}
          </Text>
        </View>
      </View>

      <View style={localStyles.cardBody}>
        <Text style={[localStyles.cardSubtitle, globalStyles.paragraph]}>
          Distrito: {item.distrito?.nome ?? "—"}
        </Text>
        <Text style={[localStyles.cardText, globalStyles.paragraph, { opacity: 0.8 }]}>
          Estado: {item.descricaoDeEstado ?? "—"}
        </Text>

        <TouchableOpacity 
          style={[localStyles.button, { marginTop: 12 }]} 
          onPress={call}
          activeOpacity={0.8}
        >
          <Text style={[localStyles.buttonText, globalStyles.whiteText]}>
            Chamar Moto
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};