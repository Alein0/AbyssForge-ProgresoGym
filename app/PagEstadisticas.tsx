import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import styles from '../styles/stylesPagEstadisticas';
import BottomNavBar from '../components/BottomNavBar';

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
  const [pesoData, setPesoData] = useState<{labels: string[], data: number[]}>({labels: [], data: []});
  const [ejerciciosHistorial, setEjerciciosHistorial] = useState<EjercicioHistorial[]>([]);

  // Rango de tiempo
  const ranges = ['Semanal', 'Mensual', 'Anual'];

  // Cargar datos del peso
  useEffect(() => {
    const cargarRegistrosPeso = async () => {
      const value = await AsyncStorage.getItem('registros_peso');
      if (value) {
        const registros = JSON.parse(value);
        // Filtra por rango si lo deseas aquí, este ejemplo es básico
        setPesoData({
          labels: registros.map((r: any) => r.fecha).reverse(),
          data: registros.map((r: any) => parseFloat(r.peso)).reverse()
        });
      }
    };
    cargarRegistrosPeso();
  }, [selectedRange]);

  // Cargar historial de ejercicios
  useEffect(() => {
    const cargarHistorial = async () => {
      const rutinas = await AsyncStorage.getItem('rutinas_gym');
      if (rutinas) {
        const arr: EjercicioHistorial[] = [];
        JSON.parse(rutinas).forEach((rutina: any) => {
          rutina.ejercicios.forEach((ej: any) => {
            if (ej.historial && ej.historial.length > 0) { // Necesitas guardar un historial de registros por ejercicio para esto.
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
        <Text style={styles.headerTitle}>Abyss Forge</Text>
      </View>

      <Text style={styles.title}>Estadísticas</Text>

      {/* Selector de rango */}
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

      {/* Contenedor de estadísticas */}
      <ScrollView style={styles.statsBox}>
        {/* Gráfico de peso corporal */}
        <Text style={styles.statsTitle}>Progreso de peso corporal</Text>
        {pesoData.data.length > 0 ? (
          <LineChart
            data={{
              labels: pesoData.labels,
              datasets: [{ data: pesoData.data }]
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisSuffix=" kg"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#4682B4',
              backgroundGradientFrom: '#4682B4',
              backgroundGradientTo: '#87CEEB',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(22, 22, 22, ${opacity})`,
              labelColor: () => `#222`,
            }}
            bezier
            style={{ marginVertical: 12, borderRadius: 16 }}
          />
        ) : (
          <Text style={styles.placeholderText}>No hay registros de peso corporal.</Text>
        )}

        {/* Gráficos de ejercicios por nombre */}
        {ejerciciosHistorial.length > 0 ? (
          ejerciciosHistorial.map((ej, idx) => (
            <View key={idx} style={{ marginBottom: 40 }}>
              <Text style={styles.statsTitle}>{ej.nombre}</Text>
              <LineChart
                data={{
                  labels: ej.fechas,
                  datasets: [{ data: ej.pesos }]
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisSuffix=" kg"
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: '#4682B4',
                  backgroundGradientFrom: '#4682B4',
                  backgroundGradientTo: '#87CEEB',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(52, 52, 75, ${opacity})`,
                  labelColor: () => `#222`,
                }}
                bezier
                style={{ marginVertical: 12, borderRadius: 16 }}
              />
              {/* Puedes agregar más gráficos aquí (repeticiones, series, etc.) */}
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>No hay registros de ejercicios.</Text>
        )}
      </ScrollView>

      {/* Barra inferior */}
      <BottomNavBar activeTab="stats" />
    </SafeAreaView>
  );
};

export default PagEstadisticas;
