import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TermsAndConditionsScreen() {
  const handleBackPress = () => {
    router.back();
  };

  const handleTandCPress = () => {
    router.push('/terms-and-conditions');
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={20} color="#333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tandcButton} onPress={handleTandCPress}>
          <Text style={styles.tandcText}>T&C</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        <Text style={styles.mainHeading}>Terms and Conditions</Text>
        <Text style={styles.dateText}>Dated: 23-3-2025</Text>
        <Text style={styles.placeholderText}>Your friend sign up using your link</Text>
        
        {/* Empty content area for terms text */}
        <View style={styles.termsContent}>
          {/* Terms text would go here */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigationBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 8,
  },
  tandcButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tandcText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  termsContent: {
    flex: 1,
    backgroundColor: '#fff',
    // Terms text content would be added here
  },
});
