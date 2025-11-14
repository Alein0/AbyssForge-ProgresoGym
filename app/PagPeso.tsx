import React, { useState, useEffect } from 'react';
import { SafeAreaView,Platform, View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/stylesPagPeso';
import BottomNavBar from '../components/BottomNavBar';

// Tipo de registro
type RegistroPeso = {
  id: string;
  peso: string;
  fecha: string;
};

const STORAGE_KEY = 'registros_peso';

const PagPeso: React.FC = () => {
  const [peso, setPeso] = useState('');
  const [registros, setRegistros] = useState<RegistroPeso[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value) setRegistros(JSON.parse(value));
      } catch (e) {
        Alert.alert('Error', 'No se pudo cargar los registros.');
      }
    };
    cargarDatos();
  }, []);

 const guardarRegistro = async () => {
  if (!peso.trim()) {
    if (Platform.OS === "web") {
      window.alert("Ingresa un peso válido.");
    } else {
      Alert.alert("Error", "Ingresa un peso válido.");
    }
    return;
  }

  const nuevoRegistro: RegistroPeso = {
    id: Date.now().toString(),
    peso,
    fecha: new Date().toLocaleDateString(),
  };

  const nuevosRegistros = [nuevoRegistro, ...registros];

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosRegistros));
    setRegistros(nuevosRegistros);
    setPeso("");

    // 🔥 Mensaje de éxito
    if (Platform.OS === "web") {
      window.alert("Registro guardado correctamente.");
    } else {
      Alert.alert("Guardado", "El registro se añadió correctamente.");
    }

  } catch (e) {
    if (Platform.OS === "web") {
      window.alert("No se pudo guardar el registro.");
    } else {
      Alert.alert("Error", "No se pudo guardar el registro.");
    }
  }
};


  const eliminarRegistro = async (id: string) => {
  // 🛑 Confirmación antes de borrar
  if (Platform.OS === "web") {
    const confirmado = window.confirm("¿Seguro que deseas eliminar este registro?");
    if (!confirmado) return;
  } else {
    const confirmado = await new Promise<boolean>(resolve => {
      Alert.alert(
        "Eliminar",
        "¿Seguro que deseas eliminar este registro?",
        [
          { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
          { text: "Eliminar", style: "destructive", onPress: () => resolve(true) }
        ]
      );
    });

    if (!confirmado) return;
  }

  //  Eliminar
  const nuevosRegistros = registros.filter(r => r.id !== id);

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosRegistros));
    setRegistros(nuevosRegistros);

    // 🔥 Mensaje de confirmación
    if (Platform.OS === "web") {
      window.alert("Registro eliminado.");
    } else {
      Alert.alert("Eliminado", "El registro ha sido eliminado.");
    }

  } catch (e) {
    if (Platform.OS === "web") {
      window.alert("No se pudo eliminar el registro.");
    } else {
      Alert.alert("Error", "No se pudo eliminar el registro.");
    }
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
        <Text style={styles.headerTitle}>Abyss Forge</Text>
      </View>

      <Text style={styles.title}>Peso corporal</Text>

      <Text style={styles.label}>Ingresar peso corporal</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%' }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Ejemplo: 70.5 kg"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TouchableOpacity
          style={{ marginLeft: 10, padding: 10, backgroundColor: '#4682B4', borderRadius: 8 }}
          onPress={guardarRegistro}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Registro de peso corporal</Text>
      <View style={styles.registerBox}>
        {registros.length === 0 ? (
          <Text style={styles.placeholderText}>No hay registros aún.</Text>
        ) : (
          <FlatList
            data={registros}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.recordCard}>
                <View>
                  <Text style={styles.recordPeso}>{item.peso} kg</Text>
                  <Text style={styles.recordFecha}>{item.fecha}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarRegistro(item.id)}>
                  <Text style={styles.deleteText}>⨉</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      <BottomNavBar activeTab="weight" />
    </SafeAreaView>
  );
};

export default PagPeso;


