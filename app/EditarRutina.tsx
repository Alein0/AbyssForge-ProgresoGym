import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
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

  useEffect(() => {
    const cargarRutina = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value) {
        const rutinas: Rutina[] = JSON.parse(value);
        const rutina = rutinas.find(r => String(r.id) === String(id));

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
    if (Platform.OS === "web") {
      window.alert("Completa el nombre y al menos un ejercicio");
    } else {
      Alert.alert("Error", "Completa el nombre y al menos un ejercicio");
    }
    return;
  }

  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    const rutinas: Rutina[] = value ? JSON.parse(value) : [];

    const nuevasRutinas = rutinas.map(r =>
      String(r.id) === String(id)
        ? { ...r, nombre: nombreRutina.trim(), ejercicios }
        : r
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasRutinas));

    // Mensaje según plataforma
    if (Platform.OS === "web") {
      window.alert("Rutina actualizada correctamente.");

      // Volver a la pantalla anterior
      setTimeout(() => {
        router.back();

        // Si back no funciona (Web bug), usar fallback
        if (window.history.length <= 1) {
          window.location.href = document.referrer || "/rutinas";
        }
      }, 100);

    } else {
      Alert.alert(
        "Rutina actualizada",
        "La rutina se guardó correctamente.",
        [
          { 
            text: "OK", 
            onPress: () =>
              setTimeout(() => router.back(), 100)
          }
        ]
      );
    }

  } catch (e) {
    if (Platform.OS === "web") {
      window.alert("No se pudo guardar la rutina.");
    } else {
      Alert.alert("Error", "No se pudo guardar la rutina.");
    }
  }
};


  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
     <View style={styles.header}>
  <TouchableOpacity style={styles.headerLeft} onPress={() => router.back()}>
    <Ionicons name="arrow-back" size={24} color="#fff" />
  </TouchableOpacity>

  <View style={styles.headerCenter}>
    <Text style={styles.headerTitle}>Editar Rutina</Text>
  </View>

  <View style={styles.headerRight}>
    <TouchableOpacity onPress={guardarCambios}>
      <Ionicons name="checkmark-outline" size={26} color="#4682B4" />
    </TouchableOpacity>
  </View>
</View>


      {/* Nombre */}
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

      {/* Ejercicios */}
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

      {/* Agregar ejercicio */}
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
