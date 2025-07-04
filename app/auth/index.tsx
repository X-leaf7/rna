import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/src/features/auth/context/AuthContext';
import { LoginForm } from '@/src/features/auth/components/LoginForm';
import { RegisterForm } from '@/src/features/auth/components/RegisterForm';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});