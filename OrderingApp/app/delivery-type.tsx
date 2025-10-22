import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DeliveryTypeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Type Screen</Text>
      <Text style={styles.subtitle}>Choose your delivery option</Text>
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
