import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar';
import styles from '../../styles/stylesRegistroEjercicio';
import { useNavigation } from '@react-navigation/native';

const RegistroEjercicio: React.FC = () => {
  const navigation = useNavigation<any>();

  const [peso, setPeso] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [series, setSeries] = useState('');
  const [descanso, setDescanso] = useState('');

  const guardarCambios = () => {
    Alert.alert('Cambios guardados', 'Los datos del ejercicio han sido registrados.');
    console.log({ peso, repeticiones, series, descanso });
    navigation.goBack(); // regresa a la rutina
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Registro ejercicio</Text>

        <TouchableOpacity onPress={guardarCambios}>
          <Ionicons name="checkmark-outline" size={26} color="#4682B4" />
        </TouchableOpacity>
      </View>

      {/* Título del ejercicio */}
      <Text style={styles.exerciseTitle}>Press banca</Text>

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
      <BottomNavBar
        activeTab="workout"
        onStatsPress={() => console.log('Ir a estadísticas')}
        onWorkoutPress={() => console.log('Ya estás en rutina')}
        onWeightPress={() => console.log('Ir a peso corporal')}
      />
    </SafeAreaView>
  );
};

export default RegistroEjercicio;
