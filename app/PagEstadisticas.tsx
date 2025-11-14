import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/stylesPagEstadisticas';

type EjercicioHistorial = {
  nombre: string;
  fechas: string[];
  pesos: number[];
  repeticiones?: number[];
  series?: number[];
};

const PagEstadisticas: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('Semanal');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [pesoData, setPesoData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] });
  const [ejerciciosHistorial, setEjerciciosHistorial] = useState<EjercicioHistorial[]>([]);

  const ranges = ['Semanal', 'Mensual', 'Anual'];
  const chartWidth = Math.floor(Dimensions.get('window').width * 0.8);

  useEffect(() => {
    const cargarRegistrosPeso = async () => {
      const value = await AsyncStorage.getItem('registros_peso');
      if (value) {
        const registros = JSON.parse(value);
        setPesoData({
          labels: registros.map((r: any) => r.fecha).reverse(),
          data: registros.map((r: any) => parseFloat(r.peso)).reverse(),
        });
      }
    };
    cargarRegistrosPeso();
  }, [selectedRange]);

  useEffect(() => {
    const cargarHistorial = async () => {
      const rutinas = await AsyncStorage.getItem('rutinas_gym');
      if (rutinas) {
        const arr: EjercicioHistorial[] = [];
        JSON.parse(rutinas).forEach((rutina: any) => {
          rutina.ejercicios.forEach((ej: any) => {
            if (ej.historial && ej.historial.length > 0) {
              arr.push({
                nombre: ej.nombre,
                fechas: ej.historial.map((h: any) => h.fecha),
                pesos: ej.historial.map((h: any) => parseFloat(h.peso || '0')),
                repeticiones: ej.historial.map((h: any) => parseInt(h.repeticiones || '0')),
                series: ej.historial.map((h: any) => parseInt(h.series || '0')),
              });
            }
          });
        });
        setEjerciciosHistorial(arr);
      }
    };
    cargarHistorial();
  }, [selectedRange]);

  const chartConfig = {
    backgroundColor: '#22223B',
    backgroundGradientFrom: '#232A34',
    backgroundGradientTo: '#14151A',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(70,130,180,${opacity})`,
    labelColor: (opacity = 1) => `rgba(207,207,207,${opacity})`,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#FFD700',
      fill: '#4682B4',
    },
    propsForBackgroundLines: {
      stroke: "#464973",
      strokeDasharray: "4",
    },
    propsForLabels: {
      fontWeight: 'bold',
    },
    style: {
      borderRadius: 20,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
        <Text style={styles.headerTitle}>Abyss Forge</Text>
      </View>
      <Text style={styles.title}>Estadísticas</Text>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{selectedRange}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownList}>
            {ranges.map((range) => (
              <TouchableOpacity
                key={range}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedRange(range);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{range}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <ScrollView
        style={styles.statsBox}
        contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.statsTitle}>Progreso de peso corporal</Text>
        {pesoData.data.length > 0 ? (
          <View style={styles.chartCard}>
            <LineChart
              data={{
                labels: pesoData.labels,
                datasets: [{ data: pesoData.data }],
              }}
              width={chartWidth}
              height={220}
              yAxisSuffix=" kg"
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        ) : (
          <Text style={styles.placeholderText}>No hay registros de peso corporal.</Text>
        )}

        {ejerciciosHistorial.length > 0 ? (
          ejerciciosHistorial.map((ej, idx) => (
            <View key={idx} style={styles.chartCard}>
              <Text style={[styles.statsTitle, { color: '#FFD700', marginTop: 10 }]}>{ej.nombre}</Text>
              <LineChart
                data={{
                  labels: ej.fechas,
                  datasets: [{ data: ej.pesos }],
                }}
                width={chartWidth}
                height={220}
                yAxisSuffix=" kg"
                yAxisInterval={1}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
              {ej.repeticiones && ej.repeticiones.length > 0 && (
                <View>
                  <Text style={[styles.statsTitle, { fontSize: 16, color: '#87CEFA', marginTop: 8 }]}>
                    Repeticiones
                  </Text>
                  <LineChart
                    data={{
                      labels: ej.fechas,
                      datasets: [{ data: ej.repeticiones }],
                    }}
                    width={chartWidth}
                    height={180}
                    yAxisSuffix=" rep"
                    yAxisInterval={1}
                    chartConfig={{
                      ...chartConfig,
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(135,206,250,${opacity})`
                    }}
                    bezier
                    style={styles.chart}
                  />
                </View>
              )}
              {ej.series && ej.series.length > 0 && (
                <View>
                  <Text style={[styles.statsTitle, { fontSize: 16, color: '#32cd32', marginTop: 8 }]}>
                    Series
                  </Text>
                  <LineChart
                    data={{
                      labels: ej.fechas,
                      datasets: [{ data: ej.series }],
                    }}
                    width={chartWidth}
                    height={180}
                    yAxisSuffix=" sets"
                    yAxisInterval={1}
                    chartConfig={{
                      ...chartConfig,
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(50,205,50,${opacity})`
                    }}
                    bezier
                    style={styles.chart}
                  />
                </View>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>No hay registros de ejercicios.</Text>
        )}
      </ScrollView>
      <View style={styles.navbarFix}>
        <BottomNavBar activeTab="stats" />
      </View>
    </SafeAreaView>
  );
};

export default PagEstadisticas;
