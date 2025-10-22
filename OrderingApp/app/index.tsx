import React from 'react';
import { Redirect } from 'expo-router';

export default function RootRedirect() {
  // Use the `Redirect` component so navigation happens declaratively
  // after the root layout is rendered. This avoids calling router.replace
  // during mount which can trigger the "navigate before mounting" error.
  return <Redirect href="/onboarding" />;
}


