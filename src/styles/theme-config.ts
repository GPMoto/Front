import { useTheme as useCustomTheme } from "@/context/ThemeContext";

const useDarkColors = () => {
  const { isDarkTheme } = useCustomTheme();

  const containerBg = isDarkTheme ? "#0C0C0C" : "#FFFFFF";
  const cardBg = isDarkTheme ? "#1F1F1F" : "#F5F5F5";
  const primaryText = isDarkTheme ? "#FFFFFF" : "#0C0C0C";
  const secondaryText = isDarkTheme ? "#BFC9B8" : "#666666";
  const avatarBg = isDarkTheme ? "#2C2C2C" : "#E8E8E8";
  const borderColor = isDarkTheme
    ? "rgba(65,197,38,0.18)"
    : "rgba(65,197,38,0.3)";
  const separatorColor = isDarkTheme
    ? "rgba(65,197,38,0.04)"
    : "rgba(0,0,0,0.1)";
  const infoLabelColor = isDarkTheme ? "#BFC9B8" : "#888888";
  const shadowColor = isDarkTheme ? "#000" : "#000";
  const iconColor = isDarkTheme ? "#FFFFFF" : "#0C0C0C";

  const styles = {
    containerBg,
    cardBg,
    primaryText,
    secondaryText,
    avatarBg,
    borderColor,
    separatorColor,
    infoLabelColor,
    shadowColor,
    iconColor,
  };

  return styles;
};

export { useDarkColors };
