import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { IconSymbol } from '@/components/ui/icon-symbol';

const supportChatData = [
  {
    id: '1',
    type: 'date',
    content: 'Yesterday',
  },
  {
    id: '2',
    type: 'message',
    sender: 'you',
    name: 'You',
    message: 'Hi,can i grab? your product.i need this item to buy',
    timestamp: '12:00',
    profileImage: require('../assets/images/John.png'),
  },
  {
    id: '3',
    type: 'message',
    sender: 'alex',
    name: 'Alex',
    message: 'The amount on the phone is my last price pls',
    timestamp: '12:00',
    profileImage: require('../assets/images/you.png'),
  },
  {
    id: '4',
    type: 'date',
    content: 'Today',
  },
  {
    id: '5',
    type: 'message',
    sender: 'alex',
    name: 'Alex',
    message: 'Hello,can we talk?',
    timestamp: '12:00',
    profileImage: require('../assets/images/you.png'),
  },
];

export default function SupportChatScreen() {
  const [message, setMessage] = useState('');

  const handleBackPress = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      Alert.alert('Message Sent', `Sending: ${message}`);
      setMessage('');
    }
  };

  const handleVoiceMessage = () => {
    Alert.alert('Voice Message', 'Recording voice message...');
  };

  const handleAttachment = () => {
    Alert.alert('Attachment', 'Opening attachment options...');
  };

  const renderMessageItem = ({ item }: { item: any }) => {
    if (item.type === 'date') {
      return (
        <View style={styles.dateContainer}>
          <View style={styles.dateBubble}>
            <Text style={styles.dateText}>{item.content}</Text>
          </View>
        </View>
      );
    }

    const isYou = item.sender === 'you';
    
    return (
      <View style={[styles.messageContainer, isYou ? styles.messageContainerRight : styles.messageContainerLeft]}>
        {!isYou && (
          <View style={styles.profileContainer}>
            <Image source={item.profileImage} style={styles.profileImage} />
            <Text style={styles.senderName}>{item.name}</Text>
          </View>
        )}
        
        <View style={[styles.messageBubble, isYou ? styles.messageBubbleRight : styles.messageBubbleLeft]}>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
        
        <View style={[styles.timestampContainer, isYou ? styles.timestampRight : styles.timestampLeft]}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {isYou && <Ionicons name="checkmark" size={12} color="#999" />}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header (white) - remove dark top area from previous mock */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Support</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Chat Content */}
      <View style={styles.chatContainer}>
        <FlatList
          data={supportChatData}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContent}
        />
      </View>

      {/* Message Input Bar (positioned above bottom nav) */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.imageButton} onPress={handleAttachment}>
          <Image source={require('../assets/images/you.png')} style={styles.imageIcon} />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.voiceButton} onPress={handleVoiceMessage}>
          <Ionicons name="mic" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Bottom navigation (visual replica of tab bar for this standalone screen) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="house.fill" size={22} color="#999" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="person.fill" size={22} color="#999" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItemActive}>
          <IconSymbol name="paperplane.fill" size={22} color="#333" />
          <Text style={[styles.navLabel, { color: '#333' }]}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <IconSymbol name="cart.fill" size={22} color="#999" />
          <Text style={styles.navLabel}>Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  chatContent: {
    paddingVertical: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dateBubble: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  dateText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  messageContainer: {
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  messageContainerLeft: {
    alignItems: 'flex-start',
  },
  messageContainerRight: {
    alignItems: 'flex-end',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  senderName: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageBubbleLeft: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageBubbleRight: {
    backgroundColor: '#F0F0F0',
    borderBottomRightRadius: 4,
  },
  messageText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 20,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timestampLeft: {
    marginLeft: 38,
  },
  timestampRight: {
    marginRight: 0,
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
    marginRight: 4,
  },
  inputBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  attachmentButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 8,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* New styles for header, image button, and bottom nav */
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  imageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  imageIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  bottomNav: {
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
});
