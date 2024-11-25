import React, { useState, useEffect  } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  // Estados simulados para datos

  // Estados para los datos obtenidos de la API
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const getEnvironmentalData = async () => {
    try {
      const userId = 1; // Aquí pones el user_id correspondiente
      const response = await axios.get(`http://localhost:3000/api/environmental-data/last/${userId}`);
      const data = response.data;

      // Actualizar los estados con los datsos obtenidos
      setTemperature(data.temperature_celsius);
      setHumidity(data.humidity_percentage);
      setTimestamp(data.timestamp_data);
    } catch (error) {
      console.error("Error al obtener los datos ambientales:", error);
    }
  };  
  useEffect(() => {
    getEnvironmentalData();
  }, []);

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
