import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface ResizeContext {
  startWidth: number;
  startHeight: number;
  startX: number;
  startY: number;
  [key: string]: any;
}

interface PanContext {
  startX: number;
  startY: number;
  [key: string]: any;
}

interface DraggableResizableSectionProps {
  titulo: string;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  backgroundColor?: string;
  onResize?: (width: number, height: number) => void;
  scale?: number;
}

export default function DraggableResizableSection({
  titulo,
  children,
  initialWidth = 100,
  initialHeight = 100,
  initialX = 0,
  initialY = 0,
  backgroundColor = '#A44949',
  onResize,
  scale = 1,
}: DraggableResizableSectionProps) {
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const width = useSharedValue(initialWidth);
  const height = useSharedValue(initialHeight);

  const panRef = useRef<PanGestureHandler>(null);
  const resizeRefs = {
    topLeft: useRef<PanGestureHandler>(null),
    topRight: useRef<PanGestureHandler>(null),
    bottomLeft: useRef<PanGestureHandler>(null),
    bottomRight: useRef<PanGestureHandler>(null),
  };

  // Gesture handler para arrastar o componente inteiro
  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, PanContext>({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      // Opcional: adicionar limites ou snap
    },
  });

  // Função para criar gesture handler de redimensionamento
  const createResizeGestureHandler = (corner: keyof typeof resizeRefs) => {
    return useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ResizeContext>({
      onStart: (_, context) => {
        context.startWidth = width.value;
        context.startHeight = height.value;
        context.startX = translateX.value;
        context.startY = translateY.value;
      },
      onActive: (event, context) => {
        let newWidth = context.startWidth;
        let newHeight = context.startHeight;
        let newX = context.startX;
        let newY = context.startY;

        switch (corner) {
          case 'topLeft':
            newWidth = Math.max(50, context.startWidth - event.translationX);
            newHeight = Math.max(50, context.startHeight - event.translationY);
            newX = context.startX + event.translationX;
            newY = context.startY + event.translationY;
            break;
          case 'topRight':
            newWidth = Math.max(50, context.startWidth + event.translationX);
            newHeight = Math.max(50, context.startHeight - event.translationY);
            newY = context.startY + event.translationY;
            break;
          case 'bottomLeft':
            newWidth = Math.max(50, context.startWidth - event.translationX);
            newHeight = Math.max(50, context.startHeight + event.translationY);
            newX = context.startX + event.translationX;
            break;
          case 'bottomRight':
            newWidth = Math.max(50, context.startWidth + event.translationX);
            newHeight = Math.max(50, context.startHeight + event.translationY);
            break;
        }

        width.value = newWidth;
        height.value = newHeight;
        translateX.value = newX;
        translateY.value = newY;
      },
      onEnd: () => {
        if (onResize) {
          runOnJS(onResize)(width.value, height.value);
        }
      },
    });
  };

  const resizeGestureHandlers = {
    topLeft: createResizeGestureHandler('topLeft'),
    topRight: createResizeGestureHandler('topRight'),
    bottomLeft: createResizeGestureHandler('bottomLeft'),
    bottomRight: createResizeGestureHandler('bottomRight'),
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale },
    ],
    width: width.value,
    height: height.value,
  }));

  const handleStyle = {
    position: 'absolute' as const,
    width: Math.max(10, 20 / scale), // Ajusta tamanho do handle baseado no zoom
    height: Math.max(10, 20 / scale),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: Math.max(5, 10 / scale),
  };

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={panGestureHandler}
    >
      <Animated.View style={animatedStyle}>
        <View
          style={{
            flex: 1,
            borderRadius: 8,
            padding: 5,
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor,
            alignItems: 'flex-start',
          }}
        >
          <Text style={{ fontSize: 14, color: 'black', marginBottom: 5 }}>
            {titulo}
          </Text>
          {children}
        </View>

        {/* Handles de redimensionamento */}
        <PanGestureHandler
          ref={resizeRefs.topLeft}
          onGestureEvent={resizeGestureHandlers.topLeft}
        >
          <Animated.View style={[handleStyle, { top: -10, left: -10 }]} />
        </PanGestureHandler>

        <PanGestureHandler
          ref={resizeRefs.topRight}
          onGestureEvent={resizeGestureHandlers.topRight}
        >
          <Animated.View style={[handleStyle, { top: -10, right: -10 }]} />
        </PanGestureHandler>

        <PanGestureHandler
          ref={resizeRefs.bottomLeft}
          onGestureEvent={resizeGestureHandlers.bottomLeft}
        >
          <Animated.View style={[handleStyle, { bottom: -10, left: -10 }]} />
        </PanGestureHandler>

        <PanGestureHandler
          ref={resizeRefs.bottomRight}
          onGestureEvent={resizeGestureHandlers.bottomRight}
        >
          <Animated.View style={[handleStyle, { bottom: -10, right: -10 }]} />
        </PanGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
}
