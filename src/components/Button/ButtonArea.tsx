import { View, Button, StyleSheet, Pressable, Text, ViewStyle } from "react-native";

interface ButtonAreaProps {
  title: string;
  action?: () => void;
  size: "small" | "medium" | "large";
  actionWithParameters?: (info : any) => any
  infoForActionWithParameters? : any
  additionalStyles? : ViewStyle
}

export default function ButtonArea(props: ButtonAreaProps) {
  const getSizeStyles = () => {
    switch (props.size) {
      case "small":
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 14,
          borderRadius: 10,
        };
      case "medium":
        return {
          paddingVertical: 14,
          paddingHorizontal: 20,
          fontSize: 16,
          borderRadius: 12,
        };
      case "large":
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          fontSize: 18,
          borderRadius: 14,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Pressable 
      style={[styles.button, sizeStyles, props.additionalStyles]}
      onPress={() => props.action ? props.action() : props.actionWithParameters?(props.infoForActionWithParameters) : '' }
      android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
    >
      <Text style={[styles.buttonText, { fontSize: sizeStyles.fontSize }]}>
        {props.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#41C526",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#41C526",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
