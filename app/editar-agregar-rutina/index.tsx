import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar';
import styles from '../../styles/stylesEditarRutina';

const EditarRutina: React.FC = () => {
  const [nombreRutina, setNombreRutina] = useState('Push');
  const [ejercicios, setEjercicios] = useState([
    { id: '1', nombre: 'Press banca' },
    { id: '2', nombre: 'Copa tricep' },
  ]);
  const [nuevoEjercicio, setNuevoEjercicio] = useState('');
  const [modoEdicion, setModoEdicion] = useState(true); // al entrar ya estamos en modo edición

  // Agregar ejercicio
  const agregarEjercicio = () => {
    if (nuevoEjercicio.trim() === '') return;
    setEjercicios(prev => [...prev, { id: Date.now().toString(), nombre: nuevoEjercicio }]);
    setNuevoEjercicio('');
  };

  // Confirmar eliminación
  const eliminarEjercicio = (id: string, nombre: string) => {
    Alert.alert(
      'Eliminar ejercicio',
      `¿Seguro que deseas eliminar "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => setEjercicios(prev => prev.filter(e => e.id !== id)),
        },
      ],
    );
  };

  // Guardar cambios
  const guardarCambios = () => {
    console.log('Rutina guardada:', nombreRutina, ejercicios);
    setModoEdicion(false);
    Alert.alert('Cambios guardados', 'La rutina se ha actualizado correctamente.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Volver')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Editar/Agregar Split-Día</Text>

        {modoEdicion ? (
          <TouchableOpacity onPress={guardarCambios}>
            <Ionicons name="checkmark-outline" size={26} color="#4682B4" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setModoEdicion(true)}>
            <Ionicons name="create-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Nombre del split/día */}
      <View style={styles.section}>
        <Text style={styles.label}>Nombre de split/día</Text>
        <TextInput
          style={styles.input}
          value={nombreRutina}
          editable={modoEdicion}
          onChangeText={setNombreRutina}
          placeholder="Nombre de la rutina"
          placeholderTextColor="#999"
        />
      </View>

      {/* Lista de ejercicios */}
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
                editable={modoEdicion}
                onChangeText={(text) =>
                  setEjercicios(prev =>
                    prev.map(e => (e.id === item.id ? { ...e, nombre: text } : e))
                  )
                }
              />
              {modoEdicion && (
                <TouchableOpacity onPress={() => eliminarEjercicio(item.id, item.nombre)}>
                  <Ionicons name="trash-outline" size={20} color="#4682B4" />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>

      {/* Agregar ejercicio */}
      {modoEdicion && (
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
      )}

      {/* Barra de navegación */}
      <BottomNavBar
        activeTab="workout"
        onStatsPress={() => console.log('Ir a estadísticas')}
        onWorkoutPress={() => console.log('Ya estás en rutina')}
        onWeightPress={() => console.log('Ir a peso corporal')}
      />
    </SafeAreaView>
  );
};

export default EditarRutina;
