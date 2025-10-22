import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { View, StyleSheet } from 'react-native';
import type { PressableStateCallbackType } from 'react-native';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  const selected = props.accessibilityState?.selected;

  return (
    <PlatformPressable
      {...props}
      android_ripple={{ color: 'transparent' }}
      pressRetentionOffset={{ top: 10, left: 10, right: 10, bottom: 10 }}
      style={{ backgroundColor: 'transparent' }}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    >
      <View style={[styles.wrapper, selected ? styles.selected : undefined]}>{props.children}</View>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0a7ea4',
  },
});
