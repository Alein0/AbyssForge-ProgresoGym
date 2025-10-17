import React from 'react';
import { SafeAreaView, View, Text, TextInput, Image } from 'react-native';
import styles from '../styles/stylesPagPeso';
import BottomNavBar from '../components/BottomNavBar';

const PagPeso: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
        <Text style={styles.headerTitle}>Abyss Forge</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>Peso corporal</Text>

      {/* Campo de ingreso */}
      <Text style={styles.label}>Ingresar peso corporal</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 70.5 kg"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      {/* Sección de registro */}
      <Text style={styles.label}>Registro de peso corporal</Text>
      <View style={styles.registerBox}>
        <Text style={styles.placeholderText}>[Aquí se mostrarán los registros]</Text>
      </View>

      {/* Barra de navegación inferior */}
      <BottomNavBar
        activeTab="weight"
        onStatsPress={() => console.log('Ir a estadísticas')}
        onWorkoutPress={() => console.log('Ir a rutinas')}
        onWeightPress={() => console.log('Ya estás en peso corporal')}
      />
    </SafeAreaView>
  );
};

export default PagPeso;
