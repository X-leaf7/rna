import React, { useEffect } from 'react';
import { router } from 'expo-router';

import { WelcomePage, useOnboarding } from '@/src/features/onboarding';

export default function IndexPage() {
  const { state } = useOnboarding();

  useEffect(() => {
    // Check if user has completed onboarding
    if (state.currentStep === 'complete') {
      router.replace('/(tabs)');
    }
  }, [state.currentStep]);

  return <WelcomePage />;
}