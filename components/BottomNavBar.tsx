// BottomNavBar.tsx
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/bottomNavStyles';

interface BottomNavBarProps {
  activeTab: 'stats' | 'workout' | 'weight';
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.navigate('/PagEstadisticas')}
        style={styles.iconButton}
      >
        <Image
          source={require('../assets/images/stats.png')}
          style={[
            styles.icon,
            { tintColor: activeTab === 'stats' ? '#4682B4' : '#FFFFFF' }
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate('/')}
        style={styles.iconButton}
      >
        <Image
          source={require('../assets/images/dumbell.png')}
          style={[
            styles.icon,
            { tintColor: activeTab === 'workout' ? '#4682B4' : '#FFFFFF' }
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate('/PagPeso')}
        style={styles.iconButton}
      >
        <Image
          source={require('../assets/images/weight.png')}
          style={[
            styles.icon,
            { tintColor: activeTab === 'weight' ? '#4682B4' : '#FFFFFF' }
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;