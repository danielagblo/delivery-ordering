import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function TrackingListScreen() {
  const orders = [
    {
      id: 1,
      status: 'Active',
      type: 'Regular',
      orderNumber: '#567-356-32',
      progress: {
        pickup: true,
        onRoad: true,
        idVerified: false,
        delivered: false,
      },
    },
    {
      id: 2,
      status: 'Active',
      type: 'Regular',
      orderNumber: '#567-356-32',
      progress: {
        pickup: true,
        onRoad: true,
        idVerified: false,
        delivered: false,
      },
    },
    {
      id: 3,
      status: 'Done',
      type: 'Regular',
      orderNumber: '#567-356-32',
      completedDate: '2nd April-12:30pm',
    },
    {
      id: 4,
      status: 'Done',
      type: 'Xpress',
      orderNumber: '#567-356-32',
      completedDate: '2nd April-12:30pm',
    },
  ];

  const renderProgressBar = (progress: any) => {
    const stages = [
      { key: 'pickup', label: 'Pickup', completed: progress.pickup },
      { key: 'onRoad', label: 'On road', completed: progress.onRoad },
      { key: 'idVerified', label: 'Id verified', completed: progress.idVerified },
      { key: 'delivered', label: 'Delivered', completed: progress.delivered },
    ];

    return (
      <View style={styles.progressContainer}>
        {stages.map((stage, index) => (
          <View key={stage.key} style={styles.stageContainer}>
            <View style={[
              styles.stageIcon,
              stage.completed ? styles.stageIconCompleted : styles.stageIconPending
            ]}>
              {stage.completed && (
                <MaterialIcons name="check" size={12} color="#ffffff" />
              )}
            </View>
            <Text style={[
              styles.stageLabel,
              stage.completed ? styles.stageLabelCompleted : styles.stageLabelPending
            ]}>
              {stage.label}
            </Text>
            {index < stages.length - 1 && (
              <View style={[
                styles.progressLine,
                stage.completed ? styles.progressLineCompleted : styles.progressLinePending
              ]} />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderOrderCard = (order: any) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View style={styles.statusContainer}>
          <View style={styles.statusTag}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
          <Text style={styles.typeText}>{order.type}</Text>
        </View>
        <Image 
            source={require('@/assets/images/package.png')} 
            style={styles.packageIcon}
            contentFit="contain"
          />
      </View>
      
      <Text style={styles.orderNumber}>{order.orderNumber}</Text>
      
      {order.status === 'Active' ? (
        renderProgressBar(order.progress)
      ) : (
        <Text style={styles.completedDate}>{order.completedDate}</Text>
      )}
    </View>
  );

  return (
    <RNSafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#374151" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Order List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.map(renderOrderCard)}
      </ScrollView>
    </RNSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  backText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  headerSpacer: {
    width: 80, // To center the title
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  orderCard: {
    backgroundColor: '#FEF3E2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTag: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  packageIcon: {
    width: 60,
    height: 60,
    marginTop: -10,
    marginRight: -10,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
  },
  completedDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  stageIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stageIconCompleted: {
    backgroundColor: '#F97316',
  },
  stageIconPending: {
    backgroundColor: '#D1D5DB',
  },
  stageLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  stageLabelCompleted: {
    color: '#F97316',
  },
  stageLabelPending: {
    color: '#9CA3AF',
  },
  progressLine: {
    position: 'absolute',
    top: 12,
    left: '50%',
    width: '100%',
    height: 2,
    zIndex: -1,
  },
  progressLineCompleted: {
    backgroundColor: '#F97316',
  },
  progressLinePending: {
    backgroundColor: '#D1D5DB',
  },
});
