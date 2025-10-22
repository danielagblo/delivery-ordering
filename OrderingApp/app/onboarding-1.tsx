import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OnboardingScreen1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seamless </Text>
      <Text style={styles.title}>deliveries</Text>
      <Text style={styles.subtitle}>Fast seamless deliveries at your doorstep.</Text>
      <Text style={styles.subtitle}>Pin an ad on oysloe and have it delivered here.</Text>
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
