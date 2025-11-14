import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import styles from '../styles/stylesPagRutina';

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

const PantallaRutinas: React.FC = () => {
  const router = useRouter();
  const [rutinas, setRutinas] = useState<Rutina[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [ejerciciosMenu, setEjerciciosMenu] = useState<Ejercicio[]>([]);
  const [rutinaActualId, setRutinaActualId] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value) setRutinas(JSON.parse(value));
      else setRutinas([]);
    };
    cargar();
  }, []);

  const abrirMenu = (ejercicios: Ejercicio[], rutinaId: string) => {
    setEjerciciosMenu(ejercicios);
    setRutinaActualId(rutinaId);
    setMenuVisible(true);
  };

  const cerrarMenu = () => {
    setMenuVisible(false);
    setEjerciciosMenu([]);
    setRutinaActualId(null);
  };

  // BOTÓN ELIMINAR: ¡robusto!
const eliminarRutina = (id: string) => {
  if (Platform.OS === 'web') {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta rutina?')) {
      return;
    }
    const nuevasRutinas = rutinas.filter(r => r.id !== id);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasRutinas))
      .then(() => setRutinas(nuevasRutinas))
      .catch(() => alert('No se pudo eliminar la rutina.'));
  } else {
    Alert.alert(
      'Eliminar rutina',
      '¿Estás seguro de que deseas eliminar esta rutina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const nuevasRutinas = rutinas.filter(r => r.id !== id);
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasRutinas))
              .then(() => setRutinas(nuevasRutinas))
              .catch(() => Alert.alert('Error', 'No se pudo eliminar la rutina.'));
          }
        }
      ]
    );
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tus rutinas</Text>
        <TouchableOpacity style={{ position: "absolute", right: 15 }} onPress={() => router.navigate('/AgregarRutina')}>
          <Ionicons name="add-circle-outline" size={28} color="#4682B4" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={rutinas}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 70, alignItems: 'center' }}
        renderItem={({ item }) => (
          <View style={styles.rutinaCard}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => router.navigate({ pathname: '/rutinas', params: { id: item.id } })}>
              <Text style={styles.rutinaNombre}>{item.nombre}</Text>
              <Text style={styles.rutinaCantidad}>{item.ejercicios.length} ejercicios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => abrirMenu(item.ejercicios, item.id)}
            >
              <Ionicons name="list-outline" size={24} color="#4682B4" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.navigate({ pathname: '/EditarRutina', params: { id: item.id } })}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="create-outline" size={22} color="#4682B4" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => eliminarRutina(item.id)}
            >
              <Ionicons name="trash-outline" size={22} color="#ee4444" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Menú modal para ejercicios */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={styles.menuOverlay}>
          <View style={styles.menuBox}>
            <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 8 }} onPress={cerrarMenu}>
              <Ionicons name="close" size={28} color="#4682B4" />
            </TouchableOpacity>
            <Text style={styles.menuTitle}>Ejercicios</Text>
            {ejerciciosMenu.length === 0 ? (
              <Text style={styles.menuVacio}>No hay ejercicios en esta rutina.</Text>
            ) : (
              ejerciciosMenu.map(ejercicio => (
                <View key={ejercicio.id} style={styles.menuEjercicio}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.ejercicioNombre}>{ejercicio.nombre}</Text>
                    <Text style={styles.ejercicioDato}>Peso: {ejercicio.peso ?? '--'} kg</Text>
                    <Text style={styles.ejercicioDato}>
                      Reps: {ejercicio.repeticiones ?? '--'} | Series: {ejercicio.series ?? '--'} | Descanso: {ejercicio.descanso ?? '--'} seg
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ marginLeft: 6 }}
                    onPress={() => {
                      cerrarMenu();
                      router.navigate({
                        pathname: '/registro-ejercicio',
                        params: { rutinaId: rutinaActualId, ejercicioId: ejercicio.id }
                      });
                    }}
                  >
                    <Ionicons name="create-outline" size={22} color="#4682B4" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </Modal>
      <BottomNavBar activeTab="workout" />
    </SafeAreaView>
  );
};

export default PantallaRutinas;
