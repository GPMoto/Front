import { StackRouter } from "@react-navigation/native";
import { useRef } from "react";
import { Animated, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface ResizableSectionProps {
  titulo: string;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  backgroundColor?: string;
}

const ResizableSection = (props: ResizableSectionProps) => {
  const translateX = useSharedValue(props.initialX ?? 0);
  const translateY = useSharedValue(props.initialY ?? 0);
  const scale = useSharedValue(1);
  const width = useSharedValue(props.initialWidth ?? 100);
  const height = useSharedValue(props.initialHeight ?? 100);

//   type PanContext = { startX: number; startY: number };
  const panGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate((event) => {
      translateX.value = translateX.value + event.translationX;
      translateY.value = translateY.value + event.translationY;
    })
    .onEnd(() => {
    });

//   type PinchContext = { startScale: number };
  const pinchGestureHandler = Gesture.Pinch()
    .onStart(() => {})
    .onUpdate((event) => {
      scale.value = Math.max(0.5, Math.min(3, scale.value));
    })
    .onEnd(() => {
      scale.value = withSpring(scale.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
  }));
  return (
    <GestureDetector
      gesture={Gesture.Simultaneous(panGesture, pinchGestureHandler)}
    >
      <Animated.View
        style={[
          animatedStyle,
          containerStyle,
          { backgroundColor: props.backgroundColor || "white" },
        ]}
      >
        <Text style={{ fontSize: 14, color: "black", marginBottom: 5 }}>
          {props.titulo}
        </Text>
        {props.children}
      </Animated.View>
    </GestureDetector>
  );
};

export default ResizableSection;
