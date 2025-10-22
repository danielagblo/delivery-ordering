import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const pages = [
  {
    title: ['Seamless', 'deliveries'],
    subtitle:
      'Fast seamless deliveries at your doorstep. Pin an ad on oysloe and have it delivered here.',
  },
  {
    title: ['One login', 'two apps'],
    subtitle:
      'Login to the delivery dashboard, with the same login you use for oysloe. No hassle, at all.',
    
  },
  {
    title: ['Pin an ad', 'to deliver'],
    subtitle:
      'Once an ad is pinned on oysloe, you can head right here to have it delivered to you.',
  },
];

export default function Onboarding() {
  const scrollRef = useRef<ScrollView | null>(null);
  const [index, setIndex] = useState(0);

  function goTo(next: number) {
    const clamped = Math.max(0, Math.min(pages.length - 1, next));
    setIndex(clamped);
    scrollRef.current?.scrollTo({ x: clamped * SCREEN_WIDTH, animated: true });
  }

  const handleNext = () => {
    if (index < pages.length - 1) {
     
      goTo(index + 1);
    } else {
      
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setIndex(page);
        }}
      >
        {pages.map((p, i) => (
          <View key={i} style={[styles.page, { width: SCREEN_WIDTH }]}> 
            {i === 1 && <View style={styles.semiCircle} />}
            <View style={styles.contentArea}>
              {i === 2 && <DeliveryImage />}
              <Text style={styles.title}>{p.title[0]}</Text>
              <Text style={styles.title}>{p.title[1]}</Text>
              <Text style={styles.subtitle}>{p.subtitle}</Text>

              <View style={styles.pageIndicators}>
                {pages.map((_, j) => (
                  <View key={j} style={[styles.dot, index === j ? styles.activeDot : undefined]} />
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleNext}
              accessibilityLabel={i < pages.length - 1 ? 'Next' : 'Get started'}
            >
              <Text style={styles.buttonText}>{i < pages.length - 1 ? 'Get started' : 'Get started'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function DeliveryImage() {
  return (
    <Image
      key="delivery-image"
      source={require('../assets/images/text-delivery.png')}
      style={styles.deliveryImage}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    flex: 1,
    justifyContent: 'space-between',
  },
  semiCircle: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 200,
    height: 100,
    backgroundColor: '#A8E6CF',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    zIndex: -1,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
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
  deliveryImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
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
});
