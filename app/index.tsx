import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/stylesPagPrincipal';
import BottomNavBar from '../components/BottomNavBar';

const PagPrincipal: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
        <Text style={styles.headerTitle}>Abyss Forge</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>Rutina</Text>

      {/* Botones principales */}
      <TouchableOpacity style={styles.card}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Push</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Pull</Text>
      </TouchableOpacity>

      {/* Barra de navegación inferior */}
      <BottomNavBar
        activeTab="workout" // 🔹 Esta pantalla es la principal
        onStatsPress={() => console.log('Ir a estadísticas')}
        onWorkoutPress={() => console.log('Ya estás en rutinas')}
        onWeightPress={() => console.log('Ir a peso corporal')}
      />
    </SafeAreaView>
  );
};

export default PagPrincipal;
