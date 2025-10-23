import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const TV_IMAGE = require('../assets/images/TV.png');

const DATA = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i + 1),
  title: 'Samsung AQ ultra smart..',
  price: '₵1,670,000',
  subtitle: '25km from pickup to Drop off',
}));

export default function PinnedOrderScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assign</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={TV_IMAGE} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backButton: { width: 60 },
  backText: { color: '#111', fontSize: 14 },
  headerTitle: { fontSize: 16, fontWeight: '600' },
  list: { padding: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAFA', padding: 12, borderRadius: 12, marginBottom: 12 },
  cardImage: { width: 64, height: 64, borderRadius: 8, marginRight: 12, resizeMode: 'contain' },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  cardPrice: { color: '#777', marginBottom: 6 },
  cardSubtitle: { color: '#999', fontSize: 12 },
});
