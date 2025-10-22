import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProgressTrackingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracking Screen</Text>
      <Text style={styles.subtitle}>Track your order progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
