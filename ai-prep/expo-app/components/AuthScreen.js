import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import {
  BrainCircuit, User, Hash, Mail, Lock,
  Calendar, Briefcase, School, Eye, EyeOff
} from 'lucide-react-native';

function AuthInput({ icon: Icon, placeholder, value, onChangeText, error, secureTextEntry, toggleSecure, isPassword, keyboardType = 'default' }) {
  return (
    <View style={styles.inputWrap}>
      <View style={[styles.inputBox, error && styles.inputBoxError]}>
        {Icon && <Icon size={20} color={error ? '#f87171' : '#9ca3af'} style={{ marginRight: 12 }} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {isPassword && (
          <TouchableOpacity onPress={toggleSecure} style={{ padding: 4 }}>
            {secureTextEntry ? <EyeOff size={18} color="#9ca3af" /> : <Eye size={18} color="#9ca3af" />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function AuthScreen({ onLogin, role, setRole }) {
  const [mode, setMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', registerNumber: '', collegeName: '',
    collegeCode: '', email: '', department: '',
    password: '', confirmPassword: '', dob: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    setFormData({ fullName: '', registerNumber: '', collegeName: '', collegeCode: '', email: '', department: '', password: '', confirmPassword: '', dob: '' });
  }, [role, mode]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    let newErrors = {};
    if (mode === 'signup') {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
      if (role === 'Student' && !formData.registerNumber.trim()) newErrors.registerNumber = "Register Number is required";
      if (!formData.collegeName.trim()) newErrors.collegeName = "College Name is required";
      if (!formData.collegeCode.trim()) newErrors.collegeCode = "College Code is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (role === 'Staff' && !formData.department.trim()) newErrors.department = "Department is required";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters required";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    } else {
      if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
      if (role === 'Student' && !formData.registerNumber.trim()) newErrors.registerNumber = "Register Number is required";
      if (role === 'Staff' && !formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onLogin();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <BrainCircuit size={32} color="#fff" />
          </View>
          <Text style={styles.title}>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</Text>
          <Text style={styles.subtitle}>Please authenticate to continue</Text>
          {/* Role Toggle */}
          <View style={styles.toggle}>
            {['Student', 'Staff'].map(r => (
              <TouchableOpacity key={r} style={[styles.toggleBtn, role === r && styles.toggleBtnActive]} onPress={() => setRole(r)}>
                <Text style={[styles.toggleText, role === r && styles.toggleTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <AuthInput icon={User} placeholder="Full Name" value={formData.fullName} onChangeText={v => handleChange('fullName', v)} error={errors.fullName} />
          {role === 'Student' && <AuthInput icon={Hash} placeholder="Register Number" value={formData.registerNumber} onChangeText={v => handleChange('registerNumber', v)} error={errors.registerNumber} />}
          {(role === 'Staff' || mode === 'signup') && <AuthInput icon={Mail} placeholder="Email Address" value={formData.email} onChangeText={v => handleChange('email', v)} error={errors.email} keyboardType="email-address" />}
          {mode === 'signup' && (
            <>
              {role === 'Staff' && <AuthInput icon={Briefcase} placeholder="Department" value={formData.department} onChangeText={v => handleChange('department', v)} error={errors.department} />}
              <AuthInput icon={School} placeholder="College Name" value={formData.collegeName} onChangeText={v => handleChange('collegeName', v)} error={errors.collegeName} />
              <AuthInput icon={Hash} placeholder="College Code" value={formData.collegeCode} onChangeText={v => handleChange('collegeCode', v)} error={errors.collegeCode} />
            </>
          )}
          <AuthInput icon={Lock} placeholder="Password" value={formData.password} onChangeText={v => handleChange('password', v)} error={errors.password} isPassword secureTextEntry={!showPassword} toggleSecure={() => setShowPassword(!showPassword)} />
          {mode === 'signup' && (
            <AuthInput icon={Lock} placeholder="Confirm Password" value={formData.confirmPassword} onChangeText={v => handleChange('confirmPassword', v)} error={errors.confirmPassword} isPassword secureTextEntry={!showConfirmPassword} toggleSecure={() => setShowConfirmPassword(!showConfirmPassword)} />
          )}

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitText}>{mode === 'signin' ? `Sign In as ${role}` : 'Register Account'}</Text>
          </TouchableOpacity>

          <View style={styles.modeSwitch}>
            <Text style={styles.modeSwitchText}>{mode === 'signin' ? "Don't have an account? " : "Already have an account? "}</Text>
            <TouchableOpacity onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
              <Text style={styles.modeSwitchLink}>{mode === 'signin' ? 'Sign Up' : 'Sign In'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eff6ff' },
  header: { alignItems: 'center', paddingTop: 48, paddingBottom: 20, paddingHorizontal: 24 },
  logoBox: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#38bdf8', alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 20 },
  toggle: { flexDirection: 'row', backgroundColor: 'rgba(209,213,219,0.8)', borderRadius: 999, padding: 4, width: 280 },
  toggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 999, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  toggleTextActive: { color: '#2563eb' },
  form: { paddingHorizontal: 24, paddingBottom: 40 },
  inputWrap: { marginBottom: 12 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#f3f4f6', paddingHorizontal: 16, paddingVertical: 14 },
  inputBoxError: { borderColor: '#f87171', backgroundColor: '#fef2f2' },
  input: { flex: 1, fontSize: 15, color: '#1f2937' },
  errorText: { fontSize: 12, color: '#ef4444', marginLeft: 8, marginTop: 4, fontWeight: '500' },
  submitBtn: { backgroundColor: '#0891b2', borderRadius: 18, paddingVertical: 16, alignItems: 'center', marginTop: 20, shadowColor: '#0891b2', shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  modeSwitch: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  modeSwitchText: { fontSize: 14, color: '#6b7280' },
  modeSwitchLink: { fontSize: 14, fontWeight: '700', color: '#2563eb' },
});
