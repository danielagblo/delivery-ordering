import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationPopup from '../../components/NotificationPopup';

import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [destination, setDestination] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  let MapViewComp: any = null;
  let MarkerComp: any = null;
  let PROVIDER_GOOGLE_CONST: any = null;
  try {
    
    const maps = require('react-native-maps');
    MapViewComp = maps.default || maps.MapView || maps;
    MarkerComp = maps.Marker || maps.default?.Marker;
    PROVIDER_GOOGLE_CONST = maps.PROVIDER_GOOGLE;
  } catch (e) {
   
  }

  const currentLocation = {
    latitude: 5.6037,
    longitude: -0.1870,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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
      coordinate: { latitude: 5.6045, longitude: -0.1865 },
      title: "Third Link Street",
      description: "Location marker",
    },
    {
      id: 3,
      coordinate: { latitude: 5.6025, longitude: -0.1885 },
      title: "Noelle's Court",
      description: "Hotel",
    },
    {
      id: 4,
      coordinate: { latitude: 5.6050, longitude: -0.1850 },
      title: "Majeevelli",
      description: "Hotel",
    },
  ];

  const destinations = [
    { id: '1', title: 'China Mall,Ashaiman', subtitle: 'Greater accra,ashaiman municipality' },
    { id: '2', title: "Lashibi community 23 park", subtitle: 'Greater accra,ashaiman municipality' },
    { id: '3', title: 'Spintex opposite coastal estate', subtitle: 'Greater accra,ashaiman municipality' },
    { id: '4', title: 'Mama mo beauty care', subtitle: 'Greater accra,ashaiman municipality' },
    { id: '5', title: 'China Mall,Ashaiman', subtitle: 'Greater accra,ashaiman municipality' },
    { id: '6', title: "Lashibi community 23 park", subtitle: 'Greater accra,ashaiman municipality' },
  ];

  // simple destination input state

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Map Section */}
  <View style={styles.mapContainer}>
        {MapViewComp ? (
          <MapViewComp
            provider={PROVIDER_GOOGLE_CONST}
            style={styles.map}
            initialRegion={currentLocation}
            showsUserLocation={true}
            showsMyLocationButton={false}
            mapType="standard"
          >
            {mapMarkers.map((marker) => (
             
              MarkerComp ? (
                <MarkerComp
                  key={marker.id}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                  pinColor={marker.pinColor || '#666666'}
                />
              ) : null
            ))}
          </MapViewComp>
        ) : (
          
          <Image
            source={require('../../assets/images/map.png')}
            style={[styles.map, styles.mapImage]}
            resizeMode="cover"
          />
        )}

        {/* Notification / Location button (centered) */}
        <View style={styles.notificationContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={[styles.notificationButton, showNotifications && styles.notificationButtonActive]}
            onPress={() => setShowNotifications((s) => !s)}
          >
            <Image source={require('../../assets/images/map-location.png')} style={styles.notificationIcon} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Panel: simple destination input pinned to bottom (down side) */}
      <View style={styles.bottomPanel}>
        <View style={styles.inputSection}>
          <View style={styles.destinationInput}>
            <View style={styles.leftIconWrapper}>
              <Image source={require('../../assets/images/destination-location.png')} style={styles.leftIcon} />
            </View>
            <View style={styles.inputTextContainer}>
              <Text style={styles.inputPlaceholder}>Destination</Text>
              <Text style={styles.inputSubtext}>Drop off to?</Text>
            </View>
            <TouchableOpacity style={styles.currentLocationButton}>
              <Image source={require('../../assets/images/dark-location.png')} style={styles.rightIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Notification Popup */}
      <NotificationPopup 
        visible={showNotifications} 
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: width,
    height: height * 0.77, 
  },
  mapFallback: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  headerDragArea: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
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
  notificationContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
    zIndex: 999,
  },
  notificationIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  notificationButtonActive: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
   grabHandle: {
     width: 40,
     height: 4,
     backgroundColor: '#D0D0D0',
     borderRadius: 2,
     alignSelf: 'center',
     marginBottom: 16,
   },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  destinationInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginRight: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  leftIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputTextContainer: {
    flex: 1,
  },
  inputPlaceholder: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  inputSubtext: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  currentLocationButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: 20,
    height: 20,
    tintColor: '#666666',
    resizeMode: 'contain',
  },
   grabHandleTouchable: {
     alignItems: 'center',
     paddingVertical: 12,
     paddingHorizontal: 20,
   },
  grabTouchableArea: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  listContainer: {
    maxHeight: Dimensions.get('window').height * 0.5,
    marginTop: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  listIcon: {
    width: 20,
    height: 20,
    tintColor: '#8B5CF6',
    marginRight: 12,
    resizeMode: 'contain',
  },
  listIconSmall: {
    width: 18,
    height: 18,
    tintColor: '#8B5CF6',
    resizeMode: 'contain',
  },
  leftIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  listText: {
    flex: 1,
  },
  listTitle: {
    fontSize: 15,
    color: '#263238',
    fontWeight: '600',
  },
  listSubtitle: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
  listSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

});