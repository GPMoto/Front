import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {Text, View, ScrollView, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/styles";
import ModalMapaComponent from "./ModalMapaComponent";
import { mapaComponentStyles } from "./MapaComponentStyles";
import { useMoto } from "@/control/MotoControl";
import VisualizadorMotos from "./VisualizadorMotos";
import { GestureHandlerRootView, PinchGestureHandler, PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import DraggableResizableSection from "./DraggableResizableSection";

interface PinchContext {
  startScale: number;
  [key: string]: any;
}

// Componente para desenhar fundo quadriculado
const GridBackground = ({ scale }: { scale: number }) => {
  const gridSize = 20 / scale; // Ajusta o tamanho do grid baseado no zoom
  
  return (
    <View style={mapaComponentStyles.gridBackground}>
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F0F0F0',
      }}>
        {/* Grid horizontal */}
        {Array.from({ length: Math.ceil(100 / gridSize) }, (_, i) => (
          <View
            key={`h-${i}`}
            style={{
              position: 'absolute',
              top: i * gridSize,
              left: 0,
              right: 0,
              height: scale > 1 ? 1 : 0.5,
              backgroundColor: scale > 1 ? '#CCCCCC' : '#DDDDDD',
            }}
          />
        ))}
        {/* Grid vertical */}
        {Array.from({ length: Math.ceil(100 / gridSize) }, (_, i) => (
          <View
            key={`v-${i}`}
            style={{
              position: 'absolute',
              left: i * gridSize,
              top: 0,
              bottom: 0,
              width: scale > 1 ? 1 : 0.5,
              backgroundColor: scale > 1 ? '#CCCCCC' : '#DDDDDD',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default function MapaComponent() {
  const {
    atualizarCorMoto,
    listaMotos,
    modalVisible,
    abrirModal,
    motoView,
    setModalVisible,
  } = useMoto();

  const scale = useSharedValue(1);
  const pinchRef = useRef<PinchGestureHandler>(null);

  // Gesture handler para zoom (pinch)
  const pinchGestureHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, PinchContext>({
    onStart: (_, context) => {
      context.startScale = scale.value;
    },
    onActive: (event, context) => {
      scale.value = context.startScale * event.scale;
      // Limitar escala entre 0.3 e 3
      scale.value = Math.max(0.3, Math.min(3, scale.value));
    },
    onEnd: () => {
      scale.value = withSpring(scale.value);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const zoomIndicatorStyle = useAnimatedStyle(() => ({
    opacity: scale.value !== 1 ? 1 : 0,
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={mapaComponentStyles.container}>
        <Text style={globalStyles.paragraph_black}>Pátio</Text>
        
        {/* Controles de Zoom */}
        <View style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          flexDirection: 'column',
          gap: 10,
          zIndex: 1000,
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              scale.value = Math.min(3, scale.value * 1.2);
              scale.value = withSpring(scale.value);
            }}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              scale.value = Math.max(0.3, scale.value * 0.8);
              scale.value = withSpring(scale.value);
            }}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>−</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              scale.value = 1;
              scale.value = withSpring(scale.value);
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>100%</Text>
          </TouchableOpacity>
        </View>
        <PinchGestureHandler
          ref={pinchRef}
          onGestureEvent={pinchGestureHandler}
        >
          <Animated.View style={[{ flex: 1 }, animatedStyle]}>
            <ScrollView 
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              bounces={false}
              scrollEnabled={true}
              horizontal={true}
              pagingEnabled={false}
              maximumZoomScale={1}
              minimumZoomScale={1}
              bouncesZoom={false}
            >
              <View style={mapaComponentStyles.infiniteArea}>
                <GridBackground scale={scale.value} />
                <DraggableResizableSection
                  titulo="Mapa"
                  initialX={50}
                  initialY={50}
                  initialWidth={300}
                  initialHeight={200}
                  backgroundColor="#A44949"
                  scale={scale.value}
                >
                  <VisualizadorMotos listaMotos={listaMotos} abrirModal={abrirModal} />
                </DraggableResizableSection>
                <DraggableResizableSection
                  titulo="Conserto"
                  initialX={400}
                  initialY={50}
                  initialWidth={200}
                  initialHeight={150}
                  backgroundColor="#A44949"
                  scale={scale.value}
                >
                  <MaterialIcons name="report-problem" size={16} color="black" />
                </DraggableResizableSection>

                <DraggableResizableSection
                  titulo="Qualidade"
                  initialX={650}
                  initialY={50}
                  initialWidth={250}
                  initialHeight={150}
                  backgroundColor="#49A44C"
                  scale={scale.value}
                >
                  <Ionicons name="ribbon-sharp" size={20} color="black" />
                </DraggableResizableSection>

                <DraggableResizableSection
                  titulo="Administrativo"
                  initialX={50}
                  initialY={300}
                  initialWidth={300}
                  initialHeight={180}
                  backgroundColor="#A4A449"
                  scale={scale.value}
                >
                  <MaterialIcons
                    name="admin-panel-settings"
                    size={24}
                    color="black"
                  />
                </DraggableResizableSection>

                <DraggableResizableSection
                  titulo="Estoque"
                  initialX={400}
                  initialY={300}
                  initialWidth={250}
                  initialHeight={180}
                  backgroundColor="#5049A4"
                  scale={scale.value}
                >
                  <Entypo name="box" size={24} color="black" />
                </DraggableResizableSection>

                <DraggableResizableSection
                  titulo="Recepção"
                  initialX={700}
                  initialY={300}
                  initialWidth={200}
                  initialHeight={300}
                  backgroundColor="#A4499E"
                  scale={scale.value}
                >
                  <MaterialIcons name="person" size={24} color="black" />
                </DraggableResizableSection>
              </View>
            </ScrollView>
          </Animated.View>
        </PinchGestureHandler>

        {motoView && (
          <ModalMapaComponent
            motoView={motoView}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            atualizarComMoto={atualizarCorMoto}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}
