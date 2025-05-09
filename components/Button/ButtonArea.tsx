import { View, Button, StyleSheet, Pressable, Text } from "react-native";

interface ButtonAreaProps {
  title: string;
  action?: () => void;
  size: "small" | "medium" | "large";
  actionWithParameters?: (info : any) => any
  infoForActionWithParameters? : any
}

export default function ButtonArea(props: ButtonAreaProps) {
  const sizeChooser = {
    small: 16,
    medium: 20,
    large: 28,
  };
  return (
    <Pressable>
      <Text
        style={{
          backgroundColor: "#49A44C",
          borderColor: "#41C526",
          borderWidth: 3,
          color: "white",
          fontSize: sizeChooser[props.size],
          alignSelf: 'center',
          paddingHorizontal: 36,
          borderRadius: 8,
          paddingVertical: 6
        }}
        onPress={() => props.action ? props.action() : props.actionWithParameters?(props.infoForActionWithParameters) : '' }
      >
        {props.title}
      </Text>
    </Pressable>
  );
}
