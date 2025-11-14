import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/stylesRegistroEjercicio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Define tipo ampliado
type Ejercicio = {
  id: string;
  nombre: string;
  peso?: string;
  repeticiones?: string;
  series?: string;
  descanso?: string;
};
type Rutina = {
  id: string;
  nombre: string;
  ejercicios: Ejercicio[];
};
const STORAGE_KEY = 'rutinas_gym';

const RegistroEjercicio: React.FC = () => {
  const router = useRouter();
  const { rutinaId, ejercicioId } = useLocalSearchParams();

  // Estados locales del formulario
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [series, setSeries] = useState('');
  const [descanso, setDescanso] = useState('');

  useEffect(() => {
    // Cargar datos del ejercicio
    const cargarDatos = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value && rutinaId && ejercicioId) {
        const rutinas: Rutina[] = JSON.parse(value);
        const rutina = rutinas.find(r => r.id === rutinaId);
        if (rutina) {
          const ejercicio = rutina.ejercicios.find(e => e.id === ejercicioId);
          if (ejercicio) {
            setNombre(ejercicio.nombre);
            setPeso(ejercicio.peso ?? '');
            setRepeticiones(ejercicio.repeticiones ?? '');
            setSeries(ejercicio.series ?? '');
            setDescanso(ejercicio.descanso ?? '');
          }
        }
      }
    };
    cargarDatos();
  }, [rutinaId, ejercicioId]);

  // Guardar cambios
  const guardarCambios = async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value && rutinaId && ejercicioId) {
      let rutinas: Rutina[] = JSON.parse(value);
      rutinas = rutinas.map(r => {
        if (r.id !== rutinaId) return r;
        return {
          ...r,
          ejercicios: r.ejercicios.map(e =>
            e.id === ejercicioId
              ? { ...e, nombre, peso, repeticiones, series, descanso }
              : e
          )
        };
      });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(rutinas));
      Alert.alert('Cambios guardados', 'Los datos del ejercicio han sido registrados.');
      router.back(); // Regresa a la rutina
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registro ejercicio</Text>
        <TouchableOpacity onPress={guardarCambios}>
          <Ionicons name="checkmark-outline" size={26} color="#4682B4" />
        </TouchableOpacity>
      </View>

      {/* Nombre del ejercicio (editable aquí si lo deseas) */}
      <Text style={styles.exerciseTitle}>{nombre}</Text>

      {/* Campos de registro */}
      <View style={styles.field}>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Peso</Text>
          <Text style={styles.fieldUnit}>Kg/lb</Text>
        </View>
        <TextInput
          style={styles.input}
          value={peso}
          onChangeText={setPeso}
          placeholder="Ej: 60"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Repeticiones</Text>
        <TextInput
          style={styles.input}
          value={repeticiones}
          onChangeText={setRepeticiones}
          placeholder="Ej: 10"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Series</Text>
        <TextInput
          style={styles.input}
          value={series}
          onChangeText={setSeries}
          placeholder="Ej: 4"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Tiempo de descanso (seg)</Text>
        <TextInput
          style={styles.input}
          value={descanso}
          onChangeText={setDescanso}
          placeholder="Ej: 90"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      {/* Barra inferior */}
      <BottomNavBar activeTab="workout" />
    </SafeAreaView>
  );
};

export default RegistroEjercicio;
