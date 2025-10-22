import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface NotificationPopupProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationPopup({ visible, onClose }: NotificationPopupProps) {
  const notifications = [
    {
      id: '1',
      company: 'JoSem plus company ltd',
      message: 'John AF Kennedy: Courier assaigned for oder with tracking id #6754-485-45',
      time: '10m',
    },
    {
      id: '2',
      company: 'JoSem plus company ltd',
      message: 'John AF Kennedy: Order with id #6754-485-45 picked up by your courier.',
      time: '10m',
    },
    {
      id: '3',
      company: 'JoSem plus company ltd',
      message: 'John AF Kennedy: Order with id #6754-485-45 is on road to your drop of destination.',
      time: '10m',
    },
    {
      id: '4',
      company: 'JoSem plus company ltd',
      message: 'John AF Kennedy: Order with id #6754-485-45 is delivered',
      time: '10m',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.popup}>
          {notifications.map((notification) => (
            <View key={notification.id} style={styles.notificationCard}>
              <Text style={styles.companyName}>{notification.company}</Text>
              <Text style={styles.message}>{notification.message}</Text>
              <Text style={styles.time}>{notification.time}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 20,
  },
  popup: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  companyName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  message: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
  },
});
