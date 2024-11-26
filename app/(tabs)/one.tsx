import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import Slider from "@react-native-community/slider"; // Asegúrate de instalarlo

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const [isOn, setIsOn] = useState(false); // Estado del foco (encendido o apagado)
  const [intensity, setIntensity] = useState(0.5); // Intensidad del foco (0 a 1)

  // Base URL de tu servidor
  const BASE_URL = "http://192.168.20.77:3000"; // Cambia esto si no usas localhost

  // Función para interactuar con el servidor
  const interactWithFoco = async (action: "encender" | "apagar") => {
    try {
      const response = await fetch(`${BASE_URL}/${action}`);
      if (response.ok) {
        const message = await response.text();
        console.log(`[LOG] ${message}`);
        Alert.alert(
          "Estado del foco",
          action === "encender" ? "Foco encendido" : "Foco apagado"
        );
      } else {
        console.error(`[ERROR] Error al realizar acción: ${action}`);
        Alert.alert("Error", `No se pudo ${action} el foco.`);
      }
    } catch (error) {
      console.error(`[ERROR] Error al interactuar con el servidor:`, error);
      Alert.alert("Error", "No se pudo comunicar con el servidor.");
    }
  };

  // Función para ajustar la luminosidad
  const adjustBrightness = async (action: "incrementar" | "reducir") => {
    try {
      const response = await fetch(`${BASE_URL}/${action}`);
      if (response.ok) {
        const message = await response.text();
        console.log(`[LOG] ${message}`);
        Alert.alert(
          "Luminosidad",
          action === "incrementar"
            ? "Luminosidad incrementada"
            : "Luminosidad reducida"
        );
      } else {
        console.error(`[ERROR] Error al realizar acción: ${action}`);
        Alert.alert("Error", `No se pudo ajustar la luminosidad.`);
      }
    } catch (error) {
      console.error(`[ERROR] Error al interactuar con el servidor:`, error);
      Alert.alert("Error", "No se pudo comunicar con el servidor.");
    }
  };

  // Función para alternar el estado del foco
  const toggleLight = async () => {
    if (isOn) {
      await interactWithFoco("apagar");
    } else {
      await interactWithFoco("encender");
    }
    setIsOn(!isOn); // Cambia el estado local del foco
  };

  const increaseIntensity = async () => {
    await adjustBrightness("incrementar");
    setIntensity((prev) => Math.min(prev + 0.1, 1));
  };

  const decreaseIntensity = async () => {
    await adjustBrightness("reducir");
    setIntensity((prev) => Math.max(prev - 0.1, 0));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      {/* Círculo amarillo detrás */}
      {isOn && <View style={styles.circle} />}

      {isOn && (
        <>
          <View
            style={[
              styles.aura,
              { width: 310, height: 310, opacity: 0.4 * intensity },
            ]}
          />
          <View
            style={[
              styles.aura,
              { width: 280, height: 280, opacity: 0.6 * intensity },
            ]}
          />
          <View
            style={[
              styles.aura,
              { width: 220, height: 220, opacity: 0.8 * intensity },
            ]}
          />
        </>
      )}

      {/* Imagen del foco */}
      <Image
        source={require("@/assets/images/foco.png")} // Ruta a tu imagen del foco
        style={styles.lightBulb}
        resizeMode="contain"
      />

      {/* Barra para ajustar intensidad */}
      {isOn && (
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={decreaseIntensity}
          >
            <Text style={styles.adjustButtonText}>-</Text>
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={intensity}
            onSlidingComplete={(value) => {
              setIntensity(value);
              console.log("Intensidad ajustada con el deslizador:", value);
            }}
            minimumTrackTintColor="#FEF868"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#FEF868"
          />
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={increaseIntensity}
          >
            <Text style={styles.adjustButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón para encender/apagar */}
      <TouchableOpacity style={styles.powerButton} onPress={toggleLight}>
        <Text style={styles.powerIcon}>{isOn ? "Apagar" : "Encender"}</Text>
      </TouchableOpacity>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "#FEF868",
    zIndex: 0,
  },
  aura: {
    position: "absolute",
    borderRadius: 150,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  lightBulb: {
    width: 250,
    height: 250,
    zIndex: 1,
  },
  powerButton: {
    position: "absolute",
    bottom: 50,
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  powerIcon: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 120,
  },
  slider: {
    width: 250,
    height: 40,
  },
  adjustButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "#FEF868",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  adjustButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
