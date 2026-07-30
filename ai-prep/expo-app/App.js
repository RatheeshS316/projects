import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import LoadingScreen from './components/LoadingScreen';
import AuthScreen from './components/AuthScreen';
import StudentPortal from './components/StudentPortal';
import StaffPortal from './components/StaffPortal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [userRole, setUserRole] = useState('Staff'); // 'Student' or 'Staff'

  const handleLogin = () => {
    setIsAppLoading(true);
    setTimeout(() => {
      setIsAppLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  const handleLogout = () => {
    setIsAppLoading(true);
    setTimeout(() => {
      setIsAppLoading(false);
      setIsLoggedIn(false);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {isAppLoading ? (
          <LoadingScreen />
        ) : !isLoggedIn ? (
          <AuthScreen onLogin={handleLogin} role={userRole} setRole={setUserRole} />
        ) : userRole === 'Student' ? (
          <StudentPortal onLogout={handleLogout} userRole={userRole} />
        ) : (
          <StaffPortal onLogout={handleLogout} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#f9fafb' },
});
