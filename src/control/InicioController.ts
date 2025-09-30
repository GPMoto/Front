import { useNavigation } from "@react-navigation/native";
import { AppDrawerNavigationProps } from "@/navigators/NavigationTypes";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "./ProfileController";
import useFilial from "./FilialController";
import { useMoto } from "./MotoControl";

export default function useInicio() {
  const navigation = useNavigation<AppDrawerNavigationProps>();
  const { isAuthenticated, logout } = useAuth();

  const { profile } = useProfile();
  const { secoes } = useFilial();
  const { pagedMotos } = useMoto({});

  const appTitle = profile?.nmUsuario ?? "GP Moto";
  const subtitle = "Seja bem-vindo de volta,";
  const sections = secoes?.length ?? "-";
  const motorcycles = pagedMotos.data?.totalElements ?? "-";

  const openDrawer = () => navigation.navigate("Inicio");

  const goToMapa = () => navigation.navigate("Mapa");

  const goToProcurar = () => navigation.navigate("Procurar Moto");

  return {
    appTitle,
    subtitle,
    isAuthenticated,
    logout,
    openDrawer,
    goToMapa,
    goToProcurar,
    sections,
    motorcycles
  };
}
