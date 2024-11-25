import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import {
  fetchLightIntensity,
  fetchEnergyConsumption,
  fetchAverageLightIntensity,
  fetchEnergyConsumptionError,
} from "@/service/apiService";

// Interfaz para los elementos de la leyenda
interface LegendItem {
  color: string;
  label: string;
}

export default function Dashboard() {
  const colorScheme = useColorScheme();
  const chartWidth = Dimensions.get("window").width - 16; // Ancho ajustado
  const chartHeight = 220; // Altura ajustada
  // Constante para user_id
  const userId = 1; // Reemplaza con el user_id necesario

  const [lightIntensityData, setLightIntensityData] = useState<any>(null);
  const [energyConsumptionData, setEnergyConsumptionData] = useState<any>(null);
  const [averageLightIntensityData, setAverageLightIntensityData] = useState<any>(null);
  const [energyConsumptionErrorData, setEnergyConsumptionErrorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          lightIntensity,
          energyConsumption,
          averageLightIntensity,
          energyConsumptionError,
        ] = await Promise.all([
          fetchLightIntensity(userId),
          fetchEnergyConsumption(userId),
          fetchAverageLightIntensity(userId),
          fetchEnergyConsumptionError(userId),
        ]);

        setLightIntensityData({
          labels: lightIntensity.map((item: any) => item.intensity_id.toString()),
          datasets: [
            {
              data: lightIntensity.map((item: any) => item.intensity_level),
              strokeWidth: 2,
              color: () => "purple",
            },
          ],
        });

        setEnergyConsumptionData({
          labels: energyConsumption.map((item: any) => item.usage_term.toString()),
          datasets: [
            {
              data: energyConsumption.map((item: any) => item.estimated_consumption),
              strokeWidth: 2,
              color: () => "lime",
            },
            {
              data: energyConsumption.map((item: any) => item.actual_consumption),
              strokeWidth: 2,
              color: () => "magenta",
            },
          ],
        });

        setAverageLightIntensityData({
          labels: averageLightIntensity.map((item: any) => item.interval.toString()),
          datasets: [
            {
              data: averageLightIntensity.map((item: any) => item.average),
              strokeWidth: 2,
              color: () => "cyan",
            },
          ],
        });

        setEnergyConsumptionErrorData({
          labels: energyConsumptionError.map((item: any) => item.usage_term.toString()),
          datasets: [
            {
              data: energyConsumptionError.map((item: any) => item.error),
              strokeWidth: 2,
              color: () => "yellow",
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#000",
    backgroundGradientTo: "#000",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    propsForDots: {
      r: "3",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const Legend = ({ items }: { items: LegendItem[] }) => (
    <View style={styles.legendContainer}>
      {items.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.label}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.scrollContainer, { backgroundColor: Colors[colorScheme ?? "light"].background }]}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.scrollContainer, { backgroundColor: Colors[colorScheme ?? "light"].background }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lumos IOT - Dashboard</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Light Intensity</Text>
        <LineChart
          data={lightIntensityData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          fromZero
        />
        <Legend items={[{ color: "purple", label: "Light Intensity" }]} />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Energy Consumption</Text>
        <LineChart
          data={energyConsumptionData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
        />
        <Legend
          items={[
            { color: "lime", label: "Estimated Consumption" },
            { color: "magenta", label: "Actual Consumption" },
          ]}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Average Light Intensity per Interval</Text>
        <LineChart
          data={averageLightIntensityData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          fromZero
        />
        <Legend items={[{ color: "cyan", label: "Average Intensity" }]} />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Error - Energy Consumption</Text>
        <LineChart
          data={energyConsumptionErrorData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          fromZero
        />
        <Legend items={[{ color: "yellow", label: "Error" }]} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 16,
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  chartContainer: {
    marginBottom: 20,
    paddingHorizontal: 8,
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
    borderColor: "#fff",
    borderWidth: 1,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    color: "#fff",
    fontSize: 12,
  },
});
