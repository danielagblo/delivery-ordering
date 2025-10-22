import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OnboardingScreen2() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>One login</Text>
      <Text style={styles.title}>two apps</Text>
      <Text style={styles.subtitle}>Login to the delivery dashboard,with the same</Text>
      <Text style={styles.subtitle}>login you use for oysloe. No hassle,at all.</Text>
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
