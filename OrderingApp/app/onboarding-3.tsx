import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OnboardingScreen3() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pin an ad</Text>
      <Text style={styles.title}>to deliver</Text>
      <Text style={styles.subtitle}>Once an ad is pinned on oysloe,you can</Text>
      <Text style={styles.subtitle}>head right here to have it delivered to you.</Text>
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
