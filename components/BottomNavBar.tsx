import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/bottomNavStyles';

interface BottomNavBarProps {
  activeTab: 'stats' | 'workout' | 'weight';
  onStatsPress?: () => void;
  onWorkoutPress?: () => void;
  onWeightPress?: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onStatsPress,
  onWorkoutPress,
  onWeightPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onStatsPress} style={styles.iconButton}>
        <Image
          source={require('../assets/images/stats.png')}
          style={[
            styles.icon,
            { tintColor: activeTab === 'stats' ? '#4682B4' : '#FFFFFF' },
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onWorkoutPress} style={styles.iconButton}>
        <Image
          source={require('../assets/images/dumbell.png')}
          style={[
            styles.icon,
            { tintColor: activeTab === 'workout' ? '#4682B4' : '#FFFFFF' },
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onWeightPress} style={styles.iconButton}>
        <Image
          source={require('../assets/images/weight.png')}
          style={[
            styles.icon,
            { tintColor: activeTab === 'weight' ? '#4682B4' : '#FFFFFF' },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
