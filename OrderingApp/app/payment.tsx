import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentScreen() {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleHomePress = () => {
    router.push('/');
  };

  const handleSendFeedback = () => {
    Alert.alert(
      'Feedback Sent',
      `Thank you for your ${rating}-star rating! Your feedback has been submitted.`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/')
        }
      ]
    );
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={30}
              color={star <= rating ? '#8B4513' : '#F7CF94'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.homeText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Payment</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Payment Summary Card */}
      <View style={styles.paymentCard}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>₵ 45,000</Text>
        <View style={styles.infoRow}>
          <Ionicons name="information-circle" size={16} color="#999" />
          <Text style={styles.infoText}>Pay courier this amount in full</Text>
        </View>
      </View>

      {/* Rating Section */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>Rate the delivery</Text>
        {renderStars()}
      </View>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <TextInput
          style={styles.commentInput}
          placeholder="Comment"
          placeholderTextColor="#999"
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Send Feedback Button */}
      <TouchableOpacity style={styles.sendFeedbackButton} onPress={handleSendFeedback}>
        <Text style={styles.sendFeedbackText}>Send Feedback</Text>
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
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  screenTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
  paymentCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 6,
  },
  ratingSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  ratingLabel: {
    fontSize: 16,
    color: '#999',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    marginHorizontal: 5,
  },
  commentSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  sendFeedbackButton: {
    backgroundColor: '#F7CF94',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendFeedbackText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
