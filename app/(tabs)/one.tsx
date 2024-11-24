import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback  } from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from "@/constants/Colors";
// import Slider from '@mui/material/Slider';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Slider from '@react-native-community/slider'; // Asegúrate de instalarlo

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const [isOn, setIsOn] = useState(false); // Estado del foco (encendido o apagado)
  const [intensity, setIntensity] = useState(0.5); // Intensidad del foco (0 a 1)

  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(100);
  // const [priceRange, setPriceRange] = useState([0, 100]);

  const toggleLight = () => {
    // setIsOn((prev) => !prev); // Cambia el estado del foco
    setIsOn((prev) => {
      const newState = !prev; // Cambia el estado del foco
      if (newState) {
        console.log("El foco está encendido. Intensidad actual:", intensity);
      } else {
        console.log("El foco está apagado.");
      }
      return newState;
    });
  };

  const increaseIntensity = () => {
    // setIntensity((prev) => Math.min(prev + 0.1, 1)); // Incrementa hasta un máximo de 1
    setIntensity((prev) => {
      const newIntensity = Math.min(prev + 0.1, 1);
      console.log("Intensidad aumentada:", newIntensity);
      return newIntensity;
    });
  };

  const decreaseIntensity = () => {
    // setIntensity((prev) => Math.max(prev - 0.1, 0)); // Disminuye hasta un mínimo de 0
    setIntensity((prev) => {
      const newIntensity = Math.max(prev - 0.1, 0);
      console.log("Intensidad disminuida:", newIntensity);
      return newIntensity;
    });
  };



  // const handleValuesChange = (values: number[]) => {
  //   setPriceRange(values);
  //   setMinPrice(minPrice);
  //   setMaxPrice(maxPrice);
  // };
  // const handleValueChange = useCallback((value:any) => {
  //   setIntensity(value);
  // }, []);

  return (
    // <View style={[styles.container, { backgroundColor: isOn ? '#FFEB8C' : '#21C7F3' }]}>
    //   {/* Aura detrás del foco */}
    //   <View style={[styles.aura, { backgroundColor: isOn ? '#FFF5D7' : '#ABE2F0' }]} />

    // <View style={[styles.container, { backgroundColor: isOn ? "#8fe3ff" : "#8fe3ff" }]}>
      <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? "light"].background }]}>
      
      {/* Círculo amarillo detrás */}
      {isOn && <View style={styles.circle} />}

      {isOn && (
        <>
          {/* <View style={[styles.aura, { width: 310, height: 310, opacity: 0.4 }]} />
          <View style={[styles.aura, { width: 280, height: 280, opacity: 0.6 }]} />
          <View style={[styles.aura, { width: 220, height: 220, opacity: 0.8 }]} /> */}
          <View style={[styles.aura, { width: 310, height: 310, opacity: 0.4 * intensity }]} />
          <View style={[styles.aura, { width: 280, height: 280, opacity: 0.6 * intensity }]} />
          <View style={[styles.aura, { width: 220, height: 220, opacity: 0.8 * intensity }]} />
        
        </>
      )}

      {/* Imagen del foco */}
      <Image
        source={require('@/assets/images/foco.png')} // Ruta a tu imagen del foco
        style={styles.lightBulb}
        resizeMode="contain"
      />

      {/* Barra para ajustar intensidad */}
      {isOn && (
        // <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />

        // <Slider
        //   style={styles.slider}
        //   minimumValue={0}
        //   maximumValue={1}
        //   step={0.01} // Permite ajustes más finos
        //   value={intensity}
        //   onValueChange={(value) => setIntensity(value)} // Actualiza en tiempo real
        //   // onSlidingComplete={(value) => setIntensity(value)} // Cambia de onValueChange a onSlidingComplete
        //   // onValueChange={handleValueChange}
        //   minimumTrackTintColor="#FFD700"
        //   maximumTrackTintColor="#ddd"
        //   thumbTintColor="#FFD700"
        // />

        <View style={styles.sliderContainer}>
          <TouchableOpacity style={styles.adjustButton} onPress={decreaseIntensity}>
            <Text style={styles.adjustButtonText}>-</Text>
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01} // Permite ajustes más finos
            value={intensity}
            onSlidingComplete={(value) => {
              setIntensity(value);
              console.log("Intensidad ajustada con el deslizador:", value);
            }}
            // onSlidingComplete={(value) => setIntensity(value)}
            // onValueChange={(value) => setIntensity(value)} // Actualiza en tiempo real
            minimumTrackTintColor="#FEF868"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#FEF868"
          />
          <TouchableOpacity style={styles.adjustButton} onPress={increaseIntensity}>
            <Text style={styles.adjustButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        // <MultiSlider
        //         values={priceRange}
        //         min={0}
        //         max={50}
        //         step={1}
        //         onValuesChange={handleValuesChange}
        //         selectedStyle={{ backgroundColor: '#86AB9A' }}
        //         unselectedStyle={{ backgroundColor: '#000000' }}
        //         markerStyle={{ backgroundColor: '#86AB9A', height: 30, width: 30 }}
        //       />
      )}

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
  circle: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175, // Hace que el círculo sea perfecto
    backgroundColor: '#FEF868', // Amarillo dorado
    zIndex: 0, // Asegura que esté detrás del aura
  },
  aura: {
    position: 'absolute',
    // width: 300,
    // height: 300,
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
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
  },
  slider: {
    width: 250,
    height: 40,
    // position: 'absolute',
    // bottom: 120, // Justo encima del botón de encendido
  },
  adjustButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#FEF868',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  adjustButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
