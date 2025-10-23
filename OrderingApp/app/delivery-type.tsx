import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { router } from 'expo-router';

// Icon components
const BikeIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.bikeIcon}>
      <View style={styles.bikeWheel} />
      <View style={styles.bikeFrame} />
      <View style={styles.bikeWheel} />
    </View>
  </View>
);

const CarIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.carIcon}>
      <View style={styles.carBody} />
      <View style={styles.carWindow} />
    </View>
  </View>
);

const VanIcon = () => (
  <View style={styles.iconContainer}>
    <View style={styles.vanIcon}>
      <View style={styles.vanBody} />
      <View style={styles.vanWindow} />
    </View>
  </View>
);

const ClockIcon = () => (
  <View style={styles.clockIcon}>
    <View style={styles.clockFace} />
    <View style={styles.clockHand} />
  </View>
);

const HomeIcon = () => (
  <View style={styles.navIcon}>
    <View style={styles.homeIcon} />
  </View>
);

const ProfileIcon = () => (
  <View style={styles.navIcon}>
    <View style={styles.profileIcon} />
  </View>
);

const MessagesIcon = () => (
  <View style={styles.navIcon}>
    <View style={styles.messagesIcon} />
    <View style={styles.notificationDot} />
  </View>
);

const OrdersIcon = () => (
  <View style={styles.navIcon}>
    <View style={styles.ordersIcon} />
  </View>
);

export default function DeliveryTypeScreen() {
  const [selectedCourier, setSelectedCourier] = useState('bike');
  const [selectedPriority, setSelectedPriority] = useState('xpress');
  const [addressDetails, setAddressDetails] = useState('');

  const courierOptions = [
    {
      id: 'bike',
      name: 'Bike',
      description: 'Best for small parcels, up to 10kg',
      price: '₵ 25/km',
      icon: <BikeIcon />
    },
    {
      id: 'salon-car',
      name: 'Salon Car',
      description: 'Fragile and medium packages, up to 50 kg',
      price: '₵ 25/km',
      icon: <CarIcon />
    },
    {
      id: 'van',
      name: 'Van',
      description: 'Ideal for bulk goods, heavy loads, up to 500 kg',
      price: '₵ 25/km',
      icon: <VanIcon />
    }
  ];

  const calculateTotal = () => {
    const basePrice = 25; // Base price per km
    const priorityMultiplier = selectedPriority === 'xpress' ? 1 : 0;
    const additionalCost = priorityMultiplier * 25;
    return basePrice + additionalCost;
  };

  const handleOrder = () => {
    // Navigate to next screen or process order
    router.push('/payment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select a courier</Text>
        </View>

        {/* Courier Options */}
        <View style={styles.courierSection}>
          {courierOptions.map((courier) => (
            <TouchableOpacity
              key={courier.id}
              style={[
                styles.courierCard,
                selectedCourier === courier.id && styles.selectedCourierCard
              ]}
              onPress={() => setSelectedCourier(courier.id)}
            >
              {courier.icon}
              <View style={styles.courierInfo}>
                <Text style={styles.courierName}>{courier.name}</Text>
                <Text style={styles.courierDescription}>{courier.description}</Text>
              </View>
              <Text style={styles.courierPrice}>{courier.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Priority Section */}
        <View style={styles.prioritySection}>
          <View style={styles.priorityHeader}>
            <Text style={styles.priorityTitle}>Priority</Text>
            <ClockIcon />
            <Text style={styles.timeText}>00:24:00</Text>
          </View>
          
          <View style={styles.priorityButtons}>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                selectedPriority === 'xpress' && styles.selectedPriorityButton
              ]}
              onPress={() => setSelectedPriority('xpress')}
            >
              <Text style={[
                styles.priorityButtonText,
                selectedPriority === 'xpress' && styles.selectedPriorityButtonText
              ]}>
                Xpress
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityButton,
                selectedPriority === 'regular' && styles.selectedPriorityButton
              ]}
              onPress={() => setSelectedPriority('regular')}
            >
              <Text style={[
                styles.priorityButtonText,
                selectedPriority === 'regular' && styles.selectedPriorityButtonText
              ]}>
                Regular
              </Text>
            </TouchableOpacity>
            
            {selectedPriority === 'xpress' && (
              <Text style={styles.additionalCost}>+ ₵ 25/km</Text>
            )}
          </View>
        </View>

        {/* Address Details */}
        <View style={styles.addressSection}>
          <TextInput
            style={styles.addressInput}
            placeholder="Add address details and delivery instruction"
            placeholderTextColor="#999999"
            value={addressDetails}
            onChangeText={setAddressDetails}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Bottom spacing for fixed bottom bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalText}>₵ {calculateTotal()}</Text>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem}>
          <HomeIcon />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <ProfileIcon />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MessagesIcon />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <OrdersIcon />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  courierSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  courierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCourierCard: {
    borderColor: '#F7CF94',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  courierDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  courierPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  prioritySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priorityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginRight: 8,
  },
  clockIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockFace: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  clockHand: {
    width: 1,
    height: 4,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 2,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  priorityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  selectedPriorityButton: {
    backgroundColor: '#F7CF94',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
  },
  selectedPriorityButtonText: {
    color: '#2C2C2C',
  },
  additionalCost: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  addressSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addressInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2C2C2C',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  bottomSpacing: {
    height: 120,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  orderButton: {
    backgroundColor: '#F7CF94',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999999',
  },
  activeNavText: {
    color: '#2C2C2C',
    fontWeight: '600',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
  // Icon styles
  bikeIcon: {
    width: 30,
    height: 20,
    position: 'relative',
  },
  bikeWheel: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2C2C2C',
    position: 'absolute',
  },
  bikeFrame: {
    width: 20,
    height: 2,
    backgroundColor: '#2C2C2C',
    position: 'absolute',
    top: 9,
    left: 5,
  },
  carIcon: {
    width: 30,
    height: 20,
    position: 'relative',
  },
  carBody: {
    width: 30,
    height: 12,
    backgroundColor: '#2C2C2C',
    borderRadius: 6,
    position: 'absolute',
    top: 4,
  },
  carWindow: {
    width: 20,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    position: 'absolute',
    top: 6,
    left: 5,
  },
  vanIcon: {
    width: 30,
    height: 20,
    position: 'relative',
  },
  vanBody: {
    width: 30,
    height: 15,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
    position: 'absolute',
    top: 2,
  },
  vanWindow: {
    width: 20,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    position: 'absolute',
    top: 4,
    left: 5,
  },
  homeIcon: {
    width: 20,
    height: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 2,
  },
  profileIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2C2C2C',
  },
  messagesIcon: {
    width: 20,
    height: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
  },
  ordersIcon: {
    width: 20,
    height: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 2,
  },
});
