import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar';
import styles from '../../styles/stylesPagRutina';
import { useNavigation } from '@react-navigation/native';

const PantallaRutina: React.FC = () => {
  const navigation = useNavigation<any>();

  const ejercicios = [
    { id: '1', nombre: 'Press banca' },
    { id: '2', nombre: 'Copa tricep' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>split-Día</Text>

        <TouchableOpacity onPress={() => navigation.navigate('EditarRutina')}>
          <Ionicons name="create-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Título principal */}
      <View style={styles.mainCard}>
        <Text style={styles.mainCardText}>Push</Text>
      </View>

      {/* Lista de ejercicios */}
      <FlatList
        data={ejercicios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseText}>{item.nombre}</Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#4682B4" />
          </View>
        )}
      />

      {/* Barra de navegación inferior */}
      <BottomNavBar
        activeTab="workout"
        onStatsPress={() => console.log('Ir a estadísticas')}
        onWorkoutPress={() => console.log('Ya estás en rutina')}
        onWeightPress={() => console.log('Ir a peso corporal')}
      />
    </SafeAreaView>
  );
};

export default PantallaRutina;
