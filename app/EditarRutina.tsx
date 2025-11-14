import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/stylesEditarRutina';
import { useRouter, useLocalSearchParams } from 'expo-router';

type Ejercicio = { id: string; nombre: string };
type Rutina = { id: string; nombre: string; ejercicios: Ejercicio[] };
const STORAGE_KEY = 'rutinas_gym';

const EditarRutina: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [nombreRutina, setNombreRutina] = useState('');
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [nuevoEjercicio, setNuevoEjercicio] = useState('');
  const [modoEdicion, setModoEdicion] = useState(true);

  useEffect(() => {
    // Cargar datos existentes de la rutina seleccionada
    const cargarRutina = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value) {
        const rutinas: Rutina[] = JSON.parse(value);
        const rutina = rutinas.find(r => r.id === id);
        if (rutina) {
          setNombreRutina(rutina.nombre);
          setEjercicios(rutina.ejercicios);
        }
      }
    };
    cargarRutina();
  }, [id]);

  const agregarEjercicio = () => {
    if (!nuevoEjercicio.trim()) return;
    setEjercicios(prev => [...prev, { id: Date.now().toString(), nombre: nuevoEjercicio }]);
    setNuevoEjercicio('');
  };

  const eliminarEjercicio = (idDel: string) => {
    setEjercicios(prev => prev.filter(e => e.id !== idDel));
  };

  const guardarCambios = async () => {
    if (!nombreRutina.trim() || ejercicios.length === 0) {
      Alert.alert('Error', 'Completa el nombre y al menos un ejercicio');
      return;
    }
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      const rutinas: Rutina[] = value ? JSON.parse(value) : [];
      // Actualiza rutina existente:
      const nuevasRutinas = rutinas.map(r =>
        r.id === id ? { ...r, nombre: nombreRutina, ejercicios } : r
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasRutinas));
      Alert.alert('Rutina actualizada', 'La rutina se ha guardado correctamente.');
      router.replace('/rutinas');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la rutina.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Rutina</Text>
        <TouchableOpacity onPress={guardarCambios}>
          <Ionicons name="checkmark-outline" size={26} color="#4682B4" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Nombre de rutina</Text>
        <TextInput
          style={styles.input}
          value={nombreRutina}
          onChangeText={setNombreRutina}
          placeholder="Nombre de la rutina"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Ejercicios</Text>
        <FlatList
          data={ejercicios}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.exerciseCard}>
              <TextInput
                style={styles.exerciseText}
                value={item.nombre}
                onChangeText={text =>
                  setEjercicios(prev =>
                    prev.map(e => (e.id === item.id ? { ...e, nombre: text } : e))
                  )
                }
              />
              <TouchableOpacity onPress={() => eliminarEjercicio(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#4682B4" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.addSection}>
        <TextInput
          style={styles.inputAdd}
          placeholder="Nuevo ejercicio..."
          placeholderTextColor="#999"
          value={nuevoEjercicio}
          onChangeText={setNuevoEjercicio}
        />
        <TouchableOpacity style={styles.addButton} onPress={agregarEjercicio}>
          <Ionicons name="add-circle" size={34} color="#4682B4" />
        </TouchableOpacity>
      </View>
      <BottomNavBar activeTab="workout" />
    </SafeAreaView>
  );
};

export default EditarRutina;
