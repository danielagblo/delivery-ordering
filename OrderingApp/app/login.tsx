import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Accept any input and navigate to the main app
    // In a real app, you'd validate credentials first
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Login</Text>
        
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={18} color="#4A4A4A" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={18} color="#4A4A4A" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        {/* Marketplace Login Link */}
        <TouchableOpacity style={styles.marketplaceLogin}>
          <MaterialIcons name="info-outline" size={16} color="#6B7280" style={styles.marketplaceIcon} />
          <Text style={styles.marketplaceText}>use marketplace login</Text>
        </TouchableOpacity>
        
        {/* "or continue with" label above social buttons */}
        <Text style={styles.separatorText}>or continue with</Text>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialCircle} onPress={handleLogin}>
            <Image source={require('../assets/images/google.png')} style={styles.socialImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialCircle} onPress={handleLogin}>
            <Image source={require('../assets/images/phone.png')} style={styles.socialImage} />
          </TouchableOpacity>
        </View>
        {/* Full width underline moved lower to underline across the screen */}
        <View style={styles.fullUnderline} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    color: '#2F3B45',
    marginBottom: 28,
    fontFamily: 'System',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2F3B45',
  },
  loginButton: {
    backgroundColor: '#F7CF94',
    borderRadius: 28,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F3B45',
  },
  marketplaceLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  marketplaceIcon: {
    marginRight: 8,
  },
  marketplaceText: {
    fontSize: 13,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
  },
  separatorLine: {
    flex: 1,
  
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },
  socialCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  socialImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  fullUnderline: {
    height: 1,
    backgroundColor: '#E5E7EB',
    alignSelf: 'stretch',
    marginTop: 18,
  },
});
