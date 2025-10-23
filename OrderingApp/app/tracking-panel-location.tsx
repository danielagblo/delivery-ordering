import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  Animated,
  TextInput,
  ScrollView,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function TrackingPanelLocationScreen() {
  const [slideValue] = useState(new Animated.Value(0));
  const [isPaid, setIsPaid] = useState(false);
  const [secretCode, setSecretCode] = useState(['', '', '', '', '']);
  const [currentStep, setCurrentStep] = useState(0);
  const panRef = useRef(null);

  // Sample route coordinates
  const routeCoordinates = [
    { latitude: 5.6037, longitude: -0.1870 },
    { latitude: 5.6040, longitude: -0.1865 },
    { latitude: 5.6045, longitude: -0.1860 },
    { latitude: 5.6050, longitude: -0.1855 },
    { latitude: 5.6055, longitude: -0.1850 },
  ];

  const mapMarkers = [
    {
      id: 1,
      coordinate: { latitude: 5.6037, longitude: -0.1870 },
      title: "Current Location",
      description: "Your current position",
      pinColor: '#8B5CF6',
    },
    {
      id: 2,
      coordinate: { latitude: 5.6025, longitude: -0.1885 },
      title: "Noelle's Court",
      description: "Hotel",
    },
    {
      id: 3,
      coordinate: { latitude: 5.6050, longitude: -0.1850 },
      title: "Majeevelli",
      description: "Hotel",
    },
    {
      id: 4,
      coordinate: { latitude: 5.6045, longitude: -0.1865 },
      title: "Third Link Street",
      description: "Location marker",
    },
    {
      id: 5,
      coordinate: { latitude: 5.6040, longitude: -0.1875 },
      title: "Church of Ch Comm.18 jun",
      description: "Church",
    },
    {
      id: 6,
      coordinate: { latitude: 5.6035, longitude: -0.1880 },
      title: "Engsi Properties",
      description: "Property",
    },
  ];

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: slideValue } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent as any;
      const slideWidth = width * 0.7 - 60;
      
      if (translationX > slideWidth * 0.7) {
        // Complete the slide
        Animated.timing(slideValue, {
          toValue: slideWidth,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setIsPaid(true);
        });
      } else {
        // Reset to start
        Animated.timing(slideValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const resetPayment = () => {
    setIsPaid(false);
    slideValue.setValue(0);
  };

  const handleSecretCodeChange = (text: string, index: number) => {
    const newCode = [...secretCode];
    newCode[index] = text;
    setSecretCode(newCode);
    
    // Auto-focus next input
    if (text && index < 4) {
      // Focus next input logic would go here
    }
  };

  const handlePickup = () => {
    console.log('Pickup action');
  };

  const handleDropOff = () => {
    console.log('Drop off action');
  };

  const handleChat = () => {
    router.push('/chat');
  };

  const handleCall = () => {
    console.log('Call rider');
  };

  return (
    <RNSafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Slide to Pay Component */}
        <View style={styles.slideToPayContainer}>
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View style={styles.slideToPayButton}>
              <Animated.View 
                style={[
                  styles.slideButton,
                  {
                    transform: [{
                      translateX: slideValue.interpolate({
                        inputRange: [0, width * 0.7 - 60],
                        outputRange: [0, width * 0.7 - 60],
                        extrapolate: 'clamp',
                      })
                    }]
                  }
                ]}
              >
                <MaterialIcons name="check" size={20} color="#ffffff" />
              </Animated.View>
              
              <View style={styles.slideTrack}>
                <Text style={styles.slideText}>
                  {isPaid ? 'Payment Complete!' : 'Slide to pay'}
                </Text>
                <View style={styles.chevronContainer}>
                  <MaterialIcons name="chevron-right" size={16} color="#666666" />
                  <MaterialIcons name="chevron-right" size={16} color="#666666" />
                </View>
              </View>
            </Animated.View>
          </PanGestureHandler>
          
          {isPaid && (
            <TouchableOpacity style={styles.resetButton} onPress={resetPayment}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Booking Details Panel */}
        <View style={styles.bookingPanel}>
          <View style={styles.bookingHeader}>
            <View style={styles.bookingIdSection}>
              <Text style={styles.bookingLabel}>Booking ID</Text>
              <Text style={styles.bookingId}>#567-356-32</Text>
            </View>
            <View style={styles.statusSection}>
              <Text style={styles.statusLabel}>Status</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>

          {/* Progress Tracker */}
          <View style={styles.progressContainer}>
            <View style={styles.progressStep}>
              <View style={[styles.progressDot, styles.completedDot]}>
                <MaterialIcons name="check" size={12} color="#ffffff" />
              </View>
              <Text style={styles.progressLabel}>Pickup</Text>
            </View>
            
            <View style={[styles.progressLine, styles.completedLine]} />
            
            <View style={styles.progressStep}>
              <View style={[styles.progressDot, styles.completedDot]}>
                <MaterialIcons name="check" size={12} color="#ffffff" />
              </View>
              <Text style={styles.progressLabel}>On road</Text>
            </View>
            
            <View style={[styles.progressLine, styles.pendingLine]} />
            
            <View style={styles.progressStep}>
              <View style={[styles.progressDot, styles.pendingDot]} />
              <Text style={styles.progressLabel}>Id verified</Text>
            </View>
            
            <View style={[styles.progressLine, styles.pendingLine]} />
            
            <View style={styles.progressStep}>
              <View style={[styles.progressDot, styles.pendingDot]} />
              <Text style={styles.progressLabel}>Fee Paid</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handlePickup}>
              <Text style={styles.actionButtonText}>Pick up</Text>
              <MaterialIcons name="keyboard-arrow-up" size={16} color="#666666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleDropOff}>
              <Text style={styles.actionButtonText}>Drop off</Text>
              <MaterialIcons name="keyboard-arrow-up" size={16} color="#666666" />
            </TouchableOpacity>
          </View>

          {/* Delivery Information */}
          <View style={styles.deliveryInfo}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Created</Text>
              <Text style={styles.infoValue}>2nd April-12:30pm</Text>
              <Text style={styles.infoLabel}>Sender</Text>
              <Text style={styles.infoValue}>Apam industry</Text>
            </View>
            
            <View style={styles.infoColumn}>
              <Text style={styles.infoLabel}>Arrival</Text>
              <Text style={[styles.infoValue, styles.arrivalTime]}>2nd April-6:00pm</Text>
              <Text style={styles.infoLabel}>Receiver</Text>
              <Text style={styles.infoValue}>Jane Agbo</Text>
            </View>
            
            <View style={styles.packageContainer}>
              <Image 
                source={require('@/assets/images/package.png')} 
                style={styles.packageImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Delivery Timeline Panel */}
        <View style={styles.timelinePanel}>
          <View style={styles.timelineContainer}>
            {/* Out for delivery */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <View style={[styles.timelineDot, styles.activeDot]}>
                  <MaterialIcons name="check" size={12} color="#ffffff" />
                </View>
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineTitle}>Out for delivery</Text>
                  <Text style={styles.timelineTime}>Today</Text>
                </View>
                <View style={styles.timerContainer}>
                  <MaterialIcons name="access-time" size={14} color="#666666" />
                  <Text style={styles.timerText}>00:00:00</Text>
                </View>
                
                {/* Rider Information */}
                <View style={styles.riderInfo}>
                  <Image 
                    source={require('@/assets/images/rider-pfp.png')} 
                    style={styles.riderAvatar}
                  />
                  <View style={styles.riderDetails}>
                    <Text style={styles.riderLabel}>Rider</Text>
                    <View style={styles.vehicleInfo}>
                      <MaterialIcons name="pedal-bike" size={14} color="#F7CF94" />
                      <View style={styles.vehicleBadge}>
                        <Text style={styles.vehicleText}>Bike</Text>
                      </View>
                      <Text style={styles.plateNumber}>GS 654-21</Text>
                    </View>
                  </View>
                  
                  <View style={styles.contactButtons}>
                    <TouchableOpacity style={styles.contactButton} onPress={handleChat}>
                      <MaterialIcons name="chat" size={20} color="#666666" />
                      <View style={styles.chatNotificationDot} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
                      <MaterialIcons name="call" size={20} color="#666666" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Verify secret code */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <View style={[styles.timelineDot, styles.pendingDot]} />
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineTitle}>Verify your secret code</Text>
                  <Text style={styles.timelineTime}>Today</Text>
                </View>
                
                <View style={styles.secretCodeContainer}>
                  {secretCode.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.secretCodeInput}
                      value={digit}
                      onChangeText={(text) => handleSecretCodeChange(text, index)}
                      maxLength={1}
                      keyboardType="numeric"
                      placeholder="#"
                      placeholderTextColor="#999999"
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Thank You */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineIcon}>
                <View style={[styles.timelineDot, styles.pendingDot]} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Thank You</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </RNSafeAreaView>
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
  
  // Slide to Pay Styles
  slideToPayContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  slideToPayButton: {
    width: width * 0.7,
    height: 50,
    backgroundColor: '#E5E7EB',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  slideButton: {
    position: 'absolute',
    left: 4,
    top: 4,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F7CF94',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  slideTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  slideText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginRight: 8,
  },
  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButton: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#EF4444',
    borderRadius: 20,
  },
  resetText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Booking Panel Styles
  bookingPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bookingIdSection: {
    flex: 1,
  },
  bookingLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  statusSection: {
    alignItems: 'flex-end',
  },
  statusLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: '#F7CF94',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Progress Tracker Styles
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressStep: {
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedDot: {
    backgroundColor: '#F7CF94',
  },
  pendingDot: {
    backgroundColor: '#E0E0E0',
  },
  progressLine: {
    height: 2,
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 20,
  },
  completedLine: {
    backgroundColor: '#F7CF94',
  },
  pendingLine: {
    backgroundColor: '#E0E0E0',
  },
  progressLabel: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },

  // Action Buttons Styles
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2C2C2C',
    marginRight: 4,
  },

  // Delivery Info Styles
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#2C2C2C',
    marginBottom: 12,
  },
  arrivalTime: {
    color: '#FF4444',
  },
  packageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageImage: {
    width: 60,
    height: 60,
  },

  // Timeline Panel Styles
  timelinePanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timelineContainer: {
    position: 'relative',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  timelineIcon: {
    width: 40,
    alignItems: 'center',
    position: 'relative',
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: '#F7CF94',
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 16,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  timelineTime: {
    fontSize: 12,
    color: '#999999',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },

  // Rider Info Styles
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  riderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  riderDetails: {
    flex: 1,
  },
  riderLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleBadge: {
    backgroundColor: '#F7CF94',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  vehicleText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  plateNumber: {
    fontSize: 12,
    color: '#666666',
  },
  contactButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chatNotificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },

  // Secret Code Styles
  secretCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  secretCodeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    backgroundColor: '#FFFFFF',
  },
});