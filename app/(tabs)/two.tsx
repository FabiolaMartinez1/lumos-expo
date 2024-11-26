import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

export default function TabTwoScreen() {
  const [color, setColor] = useState("#ffffff"); // Estado inicial del color
  const BASE_URL = "http://192.168.20.77:3000"; // Cambia esta URL si es necesario

  // Función para enviar comandos al servidor
  const sendColorCommand = async (rgbColor: number) => {
    try {
      const response = await fetch(`${BASE_URL}/color`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rgb: rgbColor }), // Enviar el color en formato JSON
      });

      if (response.ok) {
        const message = await response.text();
        console.log(`[LOG] ${message}`);
        Alert.alert(
          "Cambio de color",
          "El color del foco ha sido actualizado."
        );
      } else {
        console.error("[ERROR] Error al cambiar el color");
        Alert.alert("Error", "No se pudo cambiar el color del foco.");
      }
    } catch (error) {
      console.error("[ERROR] Error al interactuar con el servidor:", error);
      Alert.alert("Error", "No se pudo comunicar con el servidor.");
    }
  };

  // Convierte un color hexadecimal (#RRGGBB) a entero RGB
  const hexToRgbInt = (hex: string): number => {
    // Validación del formato hexadecimal
    if (!/^#([0-9A-F]{6})$/i.test(hex)) {
      console.error(`[ERROR] Formato de color inválido: ${hex}`);
      Alert.alert("Error", "El color seleccionado no es válido.");
      return 0; // Devuelve 0 en caso de error
    }
    return parseInt(hex.replace("#", ""), 16);
  };

  // Cambiar el color del foco basado en la selección del usuario
  const changeColor = () => {
    const rgbInt = hexToRgbInt(color);
    if (rgbInt === 0) return; // Detiene el proceso si el color no es válido
    console.log(`[LOG] Cambiando color a: ${color} (RGB: ${rgbInt})`);
    sendColorCommand(rgbInt);
  };

  // Resetear el color a blanco
  const resetColor = () => {
    setColor("#ffffff"); // Actualizar el estado local del color
    const rgbInt = hexToRgbInt("#ffffff");
    console.log("[LOG] Reseteando color a blanco (RGB: 16777215)");
    sendColorCommand(rgbInt);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.colorPickerContainer}>
        <ColorPicker
          color={color}
          onColorChangeComplete={setColor}
          thumbSize={40}
          sliderSize={40}
          gapSize={16}
          row={false}
          swatches={false}
          discrete={false}
        />
      </View>
      <Pressable style={styles.button} onPress={changeColor}>
        <Text style={styles.buttonText}>Cambiar Color</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={resetColor}>
        <Text style={styles.buttonText}>Reset to White</Text>
      </Pressable>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  colorPickerContainer: {
    width: width * 0.8, // 80% del ancho de la pantalla
    height: width * 0.8, // Mantener la proporción del aspecto
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#31C6E8",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.6, // 60% del ancho de la pantalla
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
