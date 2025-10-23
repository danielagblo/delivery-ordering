import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const messageData = [
  {
    id: '1',
    title: 'iphone 14 pro max',
    subtitle: 'is the iphone 15 pro max',
    timestamp: 'today...',
    image: require('../../assets/images/iphone.png'),
  },
  {
    id: '2',
    title: 'iphone 14 pro max',
    subtitle: 'is the iphone 15 pro max',
    timestamp: 'today...',
    image: require('../../assets/images/iphone.png'),
  },
  {
    id: '3',
    title: 'iphone 14 pro max',
    subtitle: 'is the iphone 15 pro max',
    timestamp: 'today...',
    image: require('../../assets/images/iphone.png'),
  },
  {
    id: '4',
    title: 'iphone 14 pro max',
    subtitle: 'is the iphone 15 pro max',
    timestamp: 'today...',
    image: require('../../assets/images/iphone.png'),
  },
];

export default function MessagesScreen() {
  const handleBackPress = () => {
    router.back();
  };

  const handleChatSupportPress = () => {
    router.push('/support-chat');
  };

  const handleMessagePress = (item) => {
    router.push('/chat');
  };

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem} onPress={() => handleMessagePress(item)}>
      <Image source={item.image} style={styles.messageImage} />
      <View style={styles.messageContent}>
        <Text style={styles.messageTitle}>{item.title}</Text>
        <Text style={styles.messageSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={20} color="#333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Inbox</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Message List */}
      <View style={styles.messageListContainer}>
        <FlatList
          data={messageData}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Floating Chat Support Button */}
      <TouchableOpacity style={styles.chatSupportButton} onPress={handleChatSupportPress}>
        <Text style={styles.chatSupportText}>Chat support</Text>
        <View style={styles.plusIconContainer}>
          <Ionicons name="add" size={16} color="#FFA500" />
        </View>
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navigationBar: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
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
  screenTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
  messageListContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  messageImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  messageSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  chatSupportButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatSupportText: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
  plusIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
  },
});
