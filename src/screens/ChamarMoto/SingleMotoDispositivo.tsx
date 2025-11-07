import { Text, TouchableOpacity, View } from "react-native";
import { createStyles } from "./styles";
import { IMotoIot } from "@/model/types/MotoIotDictionary";
import { statusBadge } from "@/utils/helpers";
import { TFunction } from "i18next";

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
        <Text style={localStyles.cardTitle}>
          {item.nome}
        </Text>
        <View style={[localStyles.badge, { backgroundColor: badgeColor }]}>
          <Text style={localStyles.badgeText}>
            {item.condicao ?? "—"}
          </Text>
        </View>
      </View>

      <View style={localStyles.cardBody}>
        <Text style={localStyles.cardSubtitle}>
          {t('callMoto.district')}: {item.distrito?.nome ?? "—"}
        </Text>
        <Text style={localStyles.cardText}>
          {t('callMoto.state')}: {item.descricaoDeEstado ?? "—"}
        </Text>

        <TouchableOpacity 
          style={localStyles.button} 
          onPress={call}
          activeOpacity={0.8}
        >
          <Text style={localStyles.buttonText}>
            {t('callMoto.callButton')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};