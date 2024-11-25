import React, { useState, useEffect  } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

import { fetchEnvironmentalData } from "@/service/apiService";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  // Estados simulados para datos

  // Estados para los datos obtenidos de la API
  const [temperature, setTemperature] = useState(24.5);
  const [humidity, setHumidity] = useState(55.3);
  const [timestamp, setTimestamp] = useState("2024-11-24 14:35:00");
  
  useEffect(() => {
    const getEnvironmentalData = async () => {
      try {
        const data = await fetchEnvironmentalData(1); // Llamamos con el user_id 1
        // Actualizamos los estados con los datos obtenidos
        setTemperature(data.temperature_celsius);
        setHumidity(data.humidity_percentage);
        setTimestamp(data.timestamp_data);
      } catch (error) {
        console.error("Error al obtener los datos ambientales:", error);
      }
    };

    // Ejecutamos la función una vez al cargar el componente
    getEnvironmentalData();

    // Configuramos el polling cada 3 segundos
    const intervalId = setInterval(() => {
      getEnvironmentalData(); // Vuelve a llamar a la API cada 3 segundos
    }, 3000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // El array vacío [] asegura que se ejecute solo al montar el componente




  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? "light"].background }]}>
      <Text style={styles.title}>Datos Ambientales</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Temperatura:</Text>
        <Text style={styles.value}>{temperature.toFixed(2)} °C</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Humedad:</Text>
        <Text style={styles.value}>{humidity.toFixed(2)} %</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Última Actualización:</Text>
        <Text style={styles.value}>{timestamp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  card: {
    width: "90%",
    backgroundColor: "#222",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: "#aaa",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
});
