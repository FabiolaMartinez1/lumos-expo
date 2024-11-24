import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

// Interfaz para los elementos de la leyenda
interface LegendItem {
  color: string;
  label: string;
}

export default function Dashboard() {
  const colorScheme = useColorScheme();
  const chartWidth = Dimensions.get("window").width - 16; // Ancho ajustado
  const chartHeight = 220; // Altura ajustada

  const data1 = {
    labels: ["0", "20", "40", "60", "80", "100"],
    datasets: [{ data: [0.5e19, 1e19, 1.5e19, 2e19, 2.5e19, 3e19], strokeWidth: 2, color: () => "purple" }],
  };

  const data2 = {
    labels: ["0", "20", "40", "60", "80", "100"],
    datasets: [
      { data: [1, -0.5, 0.5, -1, 1.5, -1], strokeWidth: 2, color: () => "lime" },
      { data: [0.5, 1, -1.5, 0.5, -0.5, 0.5], strokeWidth: 2, color: () => "magenta" },
    ],
  };

  const data3 = {
    labels: ["0", "5", "10", "15", "20"],
    datasets: [{ data: [1e18, 2e18, 3e18, 4e18, 5e18], strokeWidth: 2, color: () => "cyan" }],
  };

  const data4 = {
    labels: ["0", "20", "40", "60", "80", "100"],
    datasets: [{ data: [0.1, 0.5, -0.2, -0.4, 0.3, 0.5], strokeWidth: 2, color: () => "yellow" }],
  };

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

  // Componente de leyenda
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

  return (
    <ScrollView style={[styles.scrollContainer, { backgroundColor: Colors[colorScheme ?? "light"].background }]}>
      {/* Cabecera con título */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lumos IOT - Dashboard</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Light Intensity</Text>
        <LineChart
          data={data1}
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
          data={data2}
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
          data={data3}
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
          data={data4}
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
    backgroundColor: "#000", // Fondo negro
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
    marginBottom: 20, // Espacio entre gráficos
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
