import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useRouter } from 'expo-router'; import React, { useEffect, useState } from 'react'; 
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'; 
import BottomNavBar from '../components/BottomNavBar'; 
import styles from '../styles/stylesPagPrincipal'; 

type Ejercicio = { id: string; nombre: string }; 
type Rutina = { id: string; nombre: string; ejercicios: Ejercicio[] }; 

const STORAGE_KEY = 'rutinas_gym'; 
const PagPrincipal: React.FC = () => { 
  const router = useRouter(); 
  const [rutinas, setRutinas] = useState<Rutina[]>([]); 
  
  useEffect(() => { 
    const cargarRutinas = async () => { 
      const value = await AsyncStorage.getItem(STORAGE_KEY); 
      
      if (value) setRutinas(JSON.parse(value)); 
      else setRutinas([]); }; cargarRutinas(); }, []);
      
      return (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
      <Text style={styles.headerTitle}>Abyss Forge</Text>
    </View>
    <Text style={styles.title}>Rutina</Text>
    {/* Botón "+" */}
    <TouchableOpacity style={styles.card} onPress={() => router.navigate('/AgregarRutina')}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
    {rutinas.length > 0 && (
      <FlatList
        data={rutinas}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 70 }}
        style={{ flex: 1, width: '100%' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.navigate({
              pathname: '/rutinas',
              params: { id: item.id }
            })}
          >
            <Text style={styles.cardText}>{item.nombre}</Text>
            <Text style={styles.cardSubText}>{item.ejercicios.length} ejercicios</Text>
          </TouchableOpacity>
        )}
      />
    )}
    <BottomNavBar activeTab="workout" />
  </SafeAreaView>
);

}; export default PagPrincipal;