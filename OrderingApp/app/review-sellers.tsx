import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function ReviewSellersScreen() {
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState('');

  const handleStarPress = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleSendFeedback = () => {
    // Handle sending feedback
    console.log('Rating:', rating, 'Comment:', comment);
    // You can add navigation or API call here
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Good';
      case 3: return 'Very Good';
      case 4: return 'Excellent';
      case 5: return 'Outstanding';
      default: return 'Good';
    }
  };

  return (
    <RNSafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#374151" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Make a review</Text>
          
          {/* Star Rating */}
          <View style={styles.starContainer}>
            {[0, 1, 2, 3, 4].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarPress(index)}
                style={styles.starButton}
              >
                <MaterialIcons
                  name={index < rating ? "star" : "star-border"}
                  size={32}
                  color={index < rating ? "#4B5563" : "#D1D5DB"}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Rating Text */}
          <Text style={styles.ratingText}>{getRatingText(rating)}</Text>
        </View>

        {/* Comment Input */}
        <View style={styles.commentSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Comment"
            placeholderTextColor="#9CA3AF"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Send Feedback Button */}
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendFeedback}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>Send feedback</Text>
        </TouchableOpacity>
      </View>
    </RNSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  reviewSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 24,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
    marginHorizontal: 2,
  },
  ratingText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  commentSection: {
    marginBottom: 32,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#ffffff',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});
