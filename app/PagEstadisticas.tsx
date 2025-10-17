import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/stylesPagEstadisticas';
import BottomNavBar from '../components/BottomNavBar';

const PagEstadisticas: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('Semanal');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const ranges = ['Semanal', 'Mensual', 'Anual'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
        <Text style={styles.headerTitle}>Abyss Forge</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>Estadísticas</Text>

      {/* Selector de rango */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{selectedRange}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdownList}>
            {ranges.map((range) => (
              <TouchableOpacity
                key={range}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedRange(range);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{range}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Contenedor de estadísticas */}
      <View style={styles.statsBox}>
        <Text style={styles.placeholderText}>
          [Aquí se mostrarán las gráficas y estadísticas de progreso]
        </Text>
      </View>

      {/* Barra de navegación inferior */}
      <BottomNavBar activeTab="stats" />
    </SafeAreaView>
  );
};

export default PagEstadisticas;
