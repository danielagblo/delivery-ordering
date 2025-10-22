import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function OnboardingScreen1() {
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleGetStarted = () => {
    if (transitioning) return;
    setTransitioning(true);
    // show next dot briefly, then navigate so the user sees the indicator change
    timerRef.current = global.setTimeout(() => {
      router.push('/onboarding-2');
    }, 120) as unknown as number;
  };

  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.contentArea}>
        <Text style={styles.title}>Seamless</Text>
        <Text style={styles.title}>deliveries</Text>
        
        <Text style={styles.subtitle}>Fast seamless deliveries at your doorstep. Pin an ad on oysloe and have it delivered here.</Text>
        
        {/* Page indicators */}
        <View style={styles.pageIndicators}>
          <View style={[styles.dot, !transitioning ? styles.activeDot : undefined]} />
          <View style={[styles.dot, transitioning ? styles.activeDot : undefined]} />
          <View style={styles.dot} />
        </View>
      </View>
      
      {/* Get started button */}
      <TouchableOpacity
        style={[styles.getStartedButton, transitioning ? styles.getStartedButtonDisabled : undefined]}
        onPress={handleGetStarted}
        disabled={transitioning}
      >
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
    marginBottom: 40,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  pageIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  getStartedButtonDisabled: {
    opacity: 0.7,
  },
});
