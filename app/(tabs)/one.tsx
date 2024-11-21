import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

export default function TabOneScreen() {
  const [isOn, setIsOn] = useState(false); // Estado del foco (encendido o apagado)

  const toggleLight = () => {
    setIsOn((prev) => !prev); // Cambia el estado del foco
  };

  return (
    // <View style={[styles.container, { backgroundColor: isOn ? '#FFEB8C' : '#21C7F3' }]}>
    //   {/* Aura detrás del foco */}
    //   <View style={[styles.aura, { backgroundColor: isOn ? '#FFF5D7' : '#ABE2F0' }]} />

    <View style={[styles.container, { backgroundColor: isOn ? "#31C6E8" : "#31C6E8" }]}>
      {/* Capas de aura difusa */}
      {isOn && (
        <>
          <View style={[styles.aura, { width: 310, height: 310, opacity: 0.4 }]} />
          <View style={[styles.aura, { width: 280, height: 280, opacity: 0.6 }]} />
          <View style={[styles.aura, { width: 220, height: 220, opacity: 0.8 }]} />
        </>
      )}

      {/* Imagen del foco */}
      <Image
        source={require('@/assets/images/foco.png')} // Ruta a tu imagen del foco
        style={styles.lightBulb}
        resizeMode="contain"
      />

      {/* Botón para encender/apagar */}
      <TouchableOpacity style={styles.powerButton} onPress={toggleLight}>
        <Text style={styles.powerIcon}>🔘</Text>
      </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aura: {
    position: 'absolute',
    // width: 450,
    // height: 450,
    borderRadius: 150,
    // opacity: 0.7,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  lightBulb: {
    width: 250,
    height: 250,
    zIndex: 1,
  },
  powerButton: {
    position: 'absolute',
    bottom: 50,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  powerIcon: {
    fontSize: 30,
    color: '#FFF',
  },
});
