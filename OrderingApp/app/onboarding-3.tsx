import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

// Paper airplane icon component
const PaperAirplaneIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.airplane}>
      <View style={styles.airplaneBody} />
      <View style={styles.airplaneWing} />
      <View style={styles.airplaneTail} />
    </View>
  </View>
);

export default function OnboardingScreen3() {
  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.contentArea}>
        <PaperAirplaneIcon />
        
        <Text style={styles.title}>Pin an ad</Text>
        <Text style={styles.title}>to deliver</Text>
        
        <Text style={styles.subtitle}>Once an ad is pinned on oysloe, you can</Text>
        <Text style={styles.subtitle}>head right here to have it delivered to you.</Text>
        
        {/* Page indicators */}
        <View style={styles.pageIndicators}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
      </View>
      
      {/* Get started button */}
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  iconContainer: {
    marginBottom: 40,
  },
  airplane: {
    width: 80,
    height: 60,
    position: 'relative',
  },
  airplaneBody: {
    position: 'absolute',
    width: 60,
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    top: 26,
    left: 10,
    transform: [{ rotate: '15deg' }],
  },
  airplaneWing: {
    position: 'absolute',
    width: 40,
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    top: 20,
    left: 20,
    transform: [{ rotate: '-10deg' }],
  },
  airplaneTail: {
    position: 'absolute',
    width: 20,
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    top: 32,
    left: 50,
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2C2C2C',
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  pageIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2C2C2C',
  },
  getStartedButton: {
    backgroundColor: '#F7CF94',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 50,
    alignSelf: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2C',
    textAlign: 'center',
  },
});
