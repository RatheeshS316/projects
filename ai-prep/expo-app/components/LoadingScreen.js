import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { Brain } from 'lucide-react-native';

export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinSlow = useRef(new Animated.Value(0)).current;
  const spinSlowRev = useRef(new Animated.Value(0)).current;
  const spinNormal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    const loop = (anim, dur) =>
      Animated.loop(Animated.timing(anim, { toValue: 1, duration: dur, easing: Easing.linear, useNativeDriver: true })).start();

    loop(spinSlow, 3000);
    loop(spinSlowRev, 3000);
    loop(spinNormal, 2000);
  }, []);

  const rotateSlow = spinSlow.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const rotateRev = spinSlowRev.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });
  const rotateNormal = spinNormal.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.topGradient} />
      <View style={styles.center}>
        <View style={styles.logoRow}>
          <Brain size={42} color="#3B82F6" />
          <Text style={styles.logoText}>AI Prep</Text>
        </View>
        <View style={styles.loaderWrap}>
          <Animated.View style={[styles.ringOuter, { transform: [{ rotate: rotateSlow }] }]} />
          <Animated.View style={[styles.ringInner, { transform: [{ rotate: rotateRev }] }]} />
          <Animated.View style={[styles.ringAccent, { transform: [{ rotate: rotateNormal }] }]} />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      </View>
      <View style={styles.bottomBar} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  topGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: '28%', backgroundColor: '#84B1F9', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  center: { alignItems: 'center', marginTop: -60, zIndex: 10 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 64 },
  logoText: { fontSize: 36, fontWeight: '800', color: '#0f172a', marginLeft: 10, letterSpacing: -0.5 },
  loaderWrap: { width: 192, height: 192, alignItems: 'center', justifyContent: 'center' },
  ringOuter: { position: 'absolute', width: 192, height: 192, borderRadius: 96, borderWidth: 5, borderColor: '#3B82F6', borderStyle: 'dashed', opacity: 0.3 },
  ringInner: { position: 'absolute', width: 163, height: 163, borderRadius: 82, borderWidth: 4, borderColor: '#10B981', borderStyle: 'dotted', opacity: 0.6 },
  ringAccent: { position: 'absolute', width: 192, height: 192, borderRadius: 96, borderWidth: 5, borderColor: 'transparent', borderTopColor: '#3B82F6' },
  loadingText: { fontSize: 13, fontWeight: '700', color: '#0f172a', letterSpacing: 2 },
  bottomBar: { position: 'absolute', bottom: 48, width: 80, height: 6, backgroundColor: '#f1f5f9', borderRadius: 3 },
});
