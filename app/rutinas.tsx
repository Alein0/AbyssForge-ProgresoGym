import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/stylesPagRutina';
import { Platform } from "react-native";


type Ejercicio = {
  id: string;
  nombre: string;
  peso?: string;
  repeticiones?: string;
  series?: string;
  descanso?: string;
};

type Rutina = { id: string; nombre: string; ejercicios: Ejercicio[] };
const STORAGE_KEY = 'rutinas_gym';

const PantallaRutina: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [rutina, setRutina] = useState<Rutina | null>(null);

  // Cargar rutina
  
  useEffect(() => {
  if (!id) return; // ← evitar ejecución prematura
  const cargar = async () => {
     const value = await AsyncStorage.getItem(STORAGE_KEY);

    if (value) {
      const rutinas: Rutina[] = value ? JSON.parse(value) : [];
      const encontrada = rutinas.find(r => String(r.id) === String(id));
      setRutina(encontrada || null);
    }
  };
  cargar();
}, [id]);


  //  ELIMINAR RUTINA COMPLETA
  const eliminarRutina = async () => {

  // ✔ Web: usar confirm() nativo del navegador
  if (Platform.OS === "web") {
    const confirmado = confirm("¿Seguro que deseas eliminar esta rutina?");
    if (!confirmado) return;

    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (!value) return;

    const rutinas: Rutina[] = JSON.parse(value);
    const nuevas = rutinas.filter(r => String(r.id) !== String(id));

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevas));

    alert("Rutina eliminada.");
    router.replace('/');
    return;
  }

  // Móvil: usar Alert de React Native
  Alert.alert(
    "Eliminar rutina",
    "¿Seguro que deseas eliminar esta rutina?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          const value = await AsyncStorage.getItem(STORAGE_KEY);
          if (!value) return;

          const rutinas: Rutina[] = JSON.parse(value);
          const nuevas = rutinas.filter(r => String(r.id) !== String(id));

          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevas));

          Alert.alert("Rutina eliminada", "Se eliminó correctamente.", [
            { text: "OK", onPress: () => router.replace('/rutinas') }
          ]);
        }
      }
    ]
  );
};

  if (!rutina) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
          Cargando rutina...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
<View style={styles.header}>
  
  {/* Flecha a la izquierda */}
  <View style={{ position: "absolute", left: 15 }}>
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  </View>

  {/* Título centrado */}
  <Text style={styles.headerTitle}>{rutina.nombre}</Text>

  {/* Botones a la derecha */}
  <View style={{ position: "absolute", right: 15, flexDirection: "row" }}>
    <TouchableOpacity onPress={eliminarRutina} style={{ marginRight: 15 }}>
      <Ionicons name="trash-outline" size={26} color="red" />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: '/EditarRutina',
          params: { id: rutina.id }
        })
      }
    >
      <Ionicons name="create-outline" size={26} color="#4fa3ff" />
    </TouchableOpacity>
  </View>

</View>


      {/* Lista de ejercicios */}
      <FlatList
        data={rutina.ejercicios}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 70 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.rutinaCard}
            onPress={() =>
              router.navigate({
                pathname: '/registro-ejercicio',
                params: { rutinaId: rutina.id, ejercicioId: item.id }
              })
            }
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.rutinaNombre}>{item.nombre}</Text>

              <Text style={styles.rutinaCantidad}>
                Peso: {item.peso ?? '--'} kg
              </Text>
              <Text style={styles.rutinaCantidad}>
                Reps: {item.repeticiones ?? '--'} | Series: {item.series ?? '--'} | Descanso: {item.descanso ?? '--'} s
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <BottomNavBar activeTab="workout" />
    </SafeAreaView>
  );
};

export default PantallaRutina;
