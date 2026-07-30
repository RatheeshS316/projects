import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  FlatList, StyleSheet, KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import {
  Home, Calendar, FileText, MessageSquare, User,
  CheckCircle2, Circle, Plus, Trash2, Edit2,
  Send, ChevronLeft, Upload, PlayCircle, BrainCircuit,
  Check, Clock, UploadCloud
} from 'lucide-react-native';
import LoadingScreen from './LoadingScreen';

// ── Bottom Nav ────────────────────────────────────────────────────────────────
function StudentBottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'Study', icon: Calendar, label: 'Schedule' },
    { id: 'AI', icon: MessageSquare, label: 'AI Chat' },
    { id: 'Test', icon: FileText, label: 'Test' },
    { id: 'Profile', icon: User, label: 'Profile' },
  ];
  return (
    <View style={styles.bottomNav}>
      {navItems.map(item => {
        const isActive = activeTab === item.id;
        return (
          <TouchableOpacity key={item.id} style={styles.navItem} onPress={() => setActiveTab(item.id)}>
            {isActive && <View style={styles.navActiveBar} />}
            <item.icon size={24} color={isActive ? '#3b82f6' : '#9ca3af'} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Task Modal ────────────────────────────────────────────────────────────────
function TaskModal({ visible, config, onClose, onSave }) {
  const [value, setValue] = useState('');
  useEffect(() => { setValue(config.data?.title || ''); }, [config]);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <TextInput
            style={styles.modalInput}
            placeholder="e.g. Read Chapter 5"
            placeholderTextColor="#9ca3af"
            value={value}
            onChangeText={setValue}
            autoFocus
          />
          <TouchableOpacity style={styles.modalBtn} onPress={() => { if (value.trim()) onSave({ id: config.data?.id, title: value }); }}>
            <Text style={styles.modalBtnText}>{config.type === 'edit_task' ? 'Save' : 'Add Task'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCancelBtn} onPress={onClose}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Home Tab ──────────────────────────────────────────────────────────────────
function HomeTab({ tasks, progressPercent, completedTasks, toggleTask, openModal, deleteTask, setActiveTab, navigate }) {
  const actions = [
    { icon: Upload, label: 'Upload Notes', color: '#3b82f6', onPress: () => navigate('UploadNotes') },
    { icon: FileText, label: 'Take Test', color: '#f97316', onPress: () => setActiveTab('Test') },
    { icon: BrainCircuit, label: 'Ask AI', color: '#10b981', onPress: () => setActiveTab('AI') },
    { icon: PlayCircle, label: 'Watch Videos', color: '#8b5cf6', onPress: () => navigate('WatchVideos') },
  ];
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.greeting}>Hello, John! 👋</Text>

      {/* Exam Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Maths Exam in 5 days</Text>
        <Text style={styles.examDays}>5 <Text style={styles.examDaysLabel}>days</Text></Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Preparation</Text>
          <Text style={styles.progressLabel}>{progressPercent}%</Text>
        </View>
        <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${progressPercent}%` }]} /></View>
      </View>

      {/* Tasks Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Today's Plan</Text>
          <TouchableOpacity onPress={() => openModal('add_task')}><Plus size={22} color="#3b82f6" /></TouchableOpacity>
        </View>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskRow}>
            <TouchableOpacity onPress={() => toggleTask(task.id)}>
              {task.completed ? <CheckCircle2 size={24} color="#06b6d4" /> : <Circle size={24} color="#d1d5db" />}
            </TouchableOpacity>
            <Text style={[styles.taskText, task.completed && styles.taskTextDone]}>{task.title}</Text>
            <TouchableOpacity onPress={() => openModal('edit_task', task)} style={{ marginRight: 8 }}><Edit2 size={16} color="#9ca3af" /></TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(task.id)}><Trash2 size={16} color="#9ca3af" /></TouchableOpacity>
          </View>
        ))}
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressLabel}>{completedTasks}/{tasks.length}</Text>
        </View>
        <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: '#60a5fa' }]} /></View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        {actions.map((a, i) => (
          <TouchableOpacity key={i} style={styles.quickBtn} onPress={a.onPress} activeOpacity={0.75}>
            <View style={[styles.quickIcon, { backgroundColor: a.color }]}><a.icon size={28} color="#fff" /></View>
            <Text style={styles.quickLabel}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// ── Study Tab ─────────────────────────────────────────────────────────────────
function StudyTab({ tasks, openModal, toggleTask, deleteTask }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 48 }} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Study Schedule</Text>
      <Text style={styles.pageSub}>October 19</Text>
      <View style={styles.cardHeader}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <TouchableOpacity onPress={() => openModal('add_task')} style={styles.addBtn}><Text style={styles.addBtnText}>+ Add</Text></TouchableOpacity>
      </View>
      {tasks.map(task => (
        <View key={task.id} style={styles.studyTaskCard}>
          <TouchableOpacity onPress={() => toggleTask(task.id)}>{task.completed ? <CheckCircle2 size={24} color="#06b6d4" /> : <Circle size={24} color="#d1d5db" />}</TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.taskText, task.completed && styles.taskTextDone]}>{task.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Clock size={12} color="#9ca3af" />
              <Text style={styles.taskMeta}>{task.completed ? ' Complete' : ' Pending'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => openModal('edit_task', task)} style={{ marginRight: 8 }}><Edit2 size={16} color="#9ca3af" /></TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(task.id)}><Trash2 size={16} color="#9ca3af" /></TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

// ── Test Tab ──────────────────────────────────────────────────────────────────
function TestTab({ setTestScore }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const questions = [
    { q: "Derivative of f(x) = e²ˣ + sin(x)?", opts: ["2e²ˣ + cos(x)", "e²ˣ + cos(x)", "2e²ˣ - cos(x)", "1/2e²ˣ + cos(x)"], ans: 0 },
    { q: "Integral of 2x dx?", opts: ["x² + C", "2x²", "x + C", "2"], ans: 0 }
  ];

  const handleNext = () => {
    if (currentQ < questions.length - 1) { setCurrentQ(c => c + 1); setSelectedOpt(null); }
    else { setIsFinished(true); setTestScore(84); }
  };

  if (isFinished) return (
    <View style={styles.finishedWrap}>
      <View style={styles.finishedIcon}><Check size={48} color="#10b981" /></View>
      <Text style={styles.finishedTitle}>Test Completed!</Text>
      <TouchableOpacity style={styles.retakeBtn} onPress={() => { setIsFinished(false); setCurrentQ(0); setSelectedOpt(null); }}>
        <Text style={styles.retakeBtnText}>Retake Test</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 48 }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <View style={styles.cardHeader}>
          <Text style={styles.pageTitle}>Mock Test 1</Text>
          <View style={styles.timerBadge}><Text style={styles.timerText}>58:32</Text></View>
        </View>
        <Text style={styles.pageSub}>Question {currentQ + 1} of {questions.length}</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.card}>
          <Text style={styles.questionText}>{questions[currentQ].q}</Text>
          {questions[currentQ].opts.map((opt, i) => (
            <TouchableOpacity key={i} style={[styles.optionBtn, selectedOpt === i && styles.optionBtnActive]} onPress={() => setSelectedOpt(i)}>
              <View style={[styles.optionLabel, selectedOpt === i && styles.optionLabelActive]}>
                <Text style={[styles.optionLabelText, selectedOpt === i && { color: '#fff' }]}>{String.fromCharCode(65 + i)}</Text>
              </View>
              <Text style={[styles.optionText, selectedOpt === i && { color: '#1d4ed8' }]}>{opt}</Text>
              {selectedOpt === i && <CheckCircle2 size={20} color="#3b82f6" />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.testNav}>
        <TouchableOpacity disabled={currentQ === 0} onPress={() => setCurrentQ(c => c - 1)} style={[styles.navPrev, currentQ === 0 && { opacity: 0.3 }]}>
          <Text style={{ color: '#3b82f6', fontWeight: '700' }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={selectedOpt === null} onPress={handleNext} style={[styles.navNext, selectedOpt === null && { backgroundColor: '#e5e7eb' }]}>
          <Text style={[styles.navNextText, selectedOpt === null && { color: '#9ca3af' }]}>{currentQ === questions.length - 1 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── AI Chat Tab ───────────────────────────────────────────────────────────────
function AIChatTab({ chatMessages, setChatMessages }) {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "I can help with that!" }]), 1000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.chatHeader}>
        <View style={styles.aiAvatar}><Text style={styles.aiAvatarText}>AI</Text></View>
        <Text style={styles.pageTitle}>Study Assistant</Text>
      </View>
      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: 8 }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {chatMessages.map(msg => (
          <View key={msg.id} style={[styles.msgRow, msg.sender === 'user' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
            <View style={[styles.msgBubble, msg.sender === 'user' ? styles.msgUser : styles.msgAI]}>
              <Text style={[styles.msgText, msg.sender === 'user' && { color: '#fff' }]}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatInputRow}>
        <TextInput style={styles.chatInput} value={input} onChangeText={setInput} placeholder="Ask anything..." placeholderTextColor="#9ca3af" onSubmitEditing={handleSend} returnKeyType="send" />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Send size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ── Profile Tab ───────────────────────────────────────────────────────────────
function ProfileTab({ testScore, userRole, onLogout }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 48 }}>
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>JD</Text></View>
        <View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileRole}>{userRole} • Grade 12</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Performance Overview</Text>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.pageSub}>Overall Score:</Text>
          <Text style={styles.bigScore}>{testScore || 84}%</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── Upload Notes Screen ───────────────────────────────────────────────────────
function StudentUploadNotesScreen({ goBack }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}><ChevronLeft size={24} color="#111827" /></TouchableOpacity>
        <Text style={styles.screenHeaderTitle}>Upload Notes</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.uploadZone}>
          <UploadCloud size={40} color="#3b82f6" />
          <Text style={styles.uploadTitle}>Tap to browse or drag file</Text>
          <Text style={styles.uploadSub}>PDF, DOCX, Images (Max 10MB)</Text>
        </View>
        <Text style={styles.sectionTitle}>My Uploads</Text>
        {[
          { id: 1, title: 'Physics Formula Sheet.pdf', size: '1.2 MB', date: 'Today', color: '#fef2f2', iconColor: '#ef4444' },
          { id: 2, title: 'Calculus Handout.docx', size: '2.4 MB', date: 'Yesterday', color: '#eff6ff', iconColor: '#3b82f6' },
        ].map(f => (
          <View key={f.id} style={styles.fileCard}>
            <View style={[styles.fileIcon, { backgroundColor: f.color }]}><FileText size={22} color={f.iconColor} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.fileName}>{f.title}</Text>
              <Text style={styles.fileMeta}>{f.size} • {f.date}</Text>
            </View>
            <TouchableOpacity><Trash2 size={18} color="#9ca3af" /></TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ── Watch Videos Screen ───────────────────────────────────────────────────────
function StudentWatchVideosScreen({ goBack }) {
  const videos = [
    { id: 1, title: 'Calculus: Integration Basics', duration: '12:45', color: '#818cf8' },
    { id: 2, title: "Newton's Laws of Motion", duration: '18:20', color: '#34d399' },
    { id: 3, title: 'Organic Chemistry Intro', duration: '22:10', color: '#fb923c' },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}><ChevronLeft size={24} color="#111827" /></TouchableOpacity>
        <Text style={styles.screenHeaderTitle}>Watch Videos</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {videos.map(v => (
          <View key={v.id} style={styles.videoCard}>
            <View style={[styles.videoThumb, { backgroundColor: v.color }]}>
              <View style={styles.playBtn}><PlayCircle size={28} color="#3b82f6" /></View>
              <View style={styles.durationBadge}><Text style={styles.durationText}>{v.duration}</Text></View>
            </View>
            <View style={{ padding: 14 }}>
              <Text style={styles.videoTitle}>{v.title}</Text>
              <Text style={styles.videoMeta}>AI Prep Channel • 1.2k views</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ── Main Student Portal ───────────────────────────────────────────────────────
export default function StudentPortal({ onLogout, userRole }) {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeScreen, setActiveScreen] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revise Calculus', completed: true },
    { id: 2, title: 'Solve 30 Qs', completed: false },
    { id: 3, title: 'Take Physics Test', completed: false },
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'user', text: 'How do I solve linear equations with exponents?' },
    { id: 2, sender: 'ai', text: "Absolutely! Let's solve 2^(x+1) = 8.\n\nStep 1: Write 8 as a power of 2: 2^3\nStep 2: Equate exponents: x+1 = 3\nStep 3: Solve: x = 2." },
  ]);
  const [testScore, setTestScore] = useState(null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '', data: null });

  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const openModal = (type, data = null) => setModalConfig({ isOpen: true, type, data });
  const closeModal = () => setModalConfig({ isOpen: false, type: '', data: null });

  const saveTask = (taskData) => {
    if (modalConfig.type === 'add_task') setTasks([...tasks, { id: Date.now(), title: taskData.title, completed: false }]);
    else setTasks(tasks.map(t => t.id === taskData.id ? { ...t, title: taskData.title } : t));
    closeModal();
  };

  const withTransition = (fn) => {
    setIsNavigating(true);
    setTimeout(() => { fn(); setIsNavigating(false); }, 500);
  };

  const navigate = (screen) => withTransition(() => setActiveScreen(screen));
  const goBack = () => withTransition(() => setActiveScreen(null));
  const changeTab = (tab) => { if (tab !== activeTab) withTransition(() => { setActiveTab(tab); setActiveScreen(null); }); };

  return (
    <View style={{ flex: 1 }}>
      {isNavigating && <LoadingScreen />}
      {!isNavigating && (
        <>
          {activeScreen === 'UploadNotes' && <StudentUploadNotesScreen goBack={goBack} />}
          {activeScreen === 'WatchVideos' && <StudentWatchVideosScreen goBack={goBack} />}
          {!activeScreen && (
            <View style={{ flex: 1 }}>
              {activeTab === 'Home' && <HomeTab tasks={tasks} progressPercent={progressPercent} completedTasks={completedTasks} toggleTask={id => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))} openModal={openModal} deleteTask={id => setTasks(tasks.filter(t => t.id !== id))} setActiveTab={changeTab} navigate={navigate} />}
              {activeTab === 'Study' && <StudyTab tasks={tasks} openModal={openModal} toggleTask={id => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))} deleteTask={id => setTasks(tasks.filter(t => t.id !== id))} />}
              {activeTab === 'Test' && <TestTab setTestScore={setTestScore} />}
              {activeTab === 'AI' && <AIChatTab chatMessages={chatMessages} setChatMessages={setChatMessages} />}
              {activeTab === 'Profile' && <ProfileTab testScore={testScore} userRole={userRole} onLogout={onLogout} />}
              <StudentBottomNav activeTab={activeTab} setActiveTab={changeTab} />
            </View>
          )}
        </>
      )}
      <TaskModal visible={modalConfig.isOpen} config={modalConfig} onClose={closeModal} onSave={saveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Nav
  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingBottom: 20, paddingTop: 8 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  navActiveBar: { position: 'absolute', top: -8, width: 28, height: 3, backgroundColor: '#3b82f6', borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
  navLabel: { fontSize: 10, color: '#9ca3af', marginTop: 3, fontWeight: '500' },
  navLabelActive: { color: '#2563eb', fontWeight: '700' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalBox: { backgroundColor: '#fff', borderRadius: 24, padding: 24, width: '100%' },
  modalInput: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#111827', marginBottom: 16 },
  modalBtn: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 8 },
  modalBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  modalCancelBtn: { padding: 10, alignItems: 'center' },
  modalCancelText: { color: '#6b7280', fontWeight: '600' },
  // Common
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111827', marginBottom: 12 },
  pageTitle: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 2 },
  pageSub: { fontSize: 14, color: '#6b7280', marginBottom: 16 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 13, color: '#6b7280', fontWeight: '500' },
  progressBar: { height: 6, backgroundColor: '#f3f4f6', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#06b6d4', borderRadius: 3 },
  taskRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  taskText: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '500', color: '#374151' },
  taskTextDone: { textDecorationLine: 'line-through', color: '#9ca3af' },
  taskMeta: { fontSize: 11, color: '#9ca3af' },
  // Home
  homeContent: { padding: 20, paddingTop: 48, paddingBottom: 32 },
  greeting: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 20 },
  examDays: { fontSize: 56, fontWeight: '800', color: '#111827', marginTop: 8, marginBottom: 8 },
  examDaysLabel: { fontSize: 18, fontWeight: '500', color: '#6b7280' },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between' },
  quickBtn: { alignItems: 'center', width: '23%' },
  quickIcon: { width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 6, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, elevation: 3 },
  quickLabel: { fontSize: 11, fontWeight: '600', color: '#4b5563', textAlign: 'center' },
  addBtn: { backgroundColor: '#eff6ff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 99 },
  addBtnText: { color: '#3b82f6', fontWeight: '600', fontSize: 14 },
  studyTaskCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 20, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  // Test
  finishedWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  finishedIcon: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#d1fae5', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  finishedTitle: { fontSize: 22, fontWeight: '800', color: '#111827' },
  retakeBtn: { marginTop: 32, backgroundColor: '#3b82f6', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 16 },
  retakeBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  timerBadge: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 4, borderRadius: 99, borderWidth: 1, borderColor: '#f3f4f6' },
  timerText: { fontWeight: '700', fontSize: 14, color: '#1f2937' },
  questionText: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 24 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 2, borderColor: '#f3f4f6', backgroundColor: '#fff', marginBottom: 10 },
  optionBtnActive: { borderColor: '#3b82f6', backgroundColor: '#eff6ff' },
  optionLabel: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  optionLabelActive: { backgroundColor: '#3b82f6' },
  optionLabelText: { fontWeight: '700', fontSize: 13, color: '#374151' },
  optionText: { flex: 1, fontWeight: '500', color: '#1f2937' },
  testNav: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  navPrev: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: '#f3f4f6' },
  navNext: { paddingVertical: 12, paddingHorizontal: 32, borderRadius: 14, backgroundColor: '#3b82f6' },
  navNextText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  // Chat
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, gap: 10 },
  aiAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  aiAvatarText: { fontWeight: '700', color: '#3b82f6', fontSize: 13 },
  msgRow: { flexDirection: 'row', marginBottom: 12 },
  msgBubble: { maxWidth: '80%', padding: 14, borderRadius: 18 },
  msgUser: { backgroundColor: '#3b82f6', borderBottomRightRadius: 4 },
  msgAI: { backgroundColor: '#fff', borderBottomLeftRadius: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  msgText: { fontSize: 14, color: '#1f2937', lineHeight: 20 },
  chatInputRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: '#f3f4f6', backgroundColor: '#f9fafb', gap: 8 },
  chatInput: { flex: 1, backgroundColor: '#fff', borderRadius: 99, paddingHorizontal: 18, paddingVertical: 12, fontSize: 14, color: '#374151', borderWidth: 1, borderColor: '#e5e7eb' },
  sendBtn: { width: 44, height: 44, backgroundColor: '#3b82f6', borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  // Profile
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 24, marginBottom: 24, gap: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  profileAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#0e7490', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#06b6d4' },
  profileAvatarText: { color: '#fff', fontWeight: '800', fontSize: 20 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#111827' },
  profileRole: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  bigScore: { fontSize: 32, fontWeight: '800', color: '#111827' },
  logoutBtn: { marginTop: 24, padding: 18, backgroundColor: '#fff5f5', borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#fee2e2' },
  logoutText: { color: '#ef4444', fontWeight: '700', fontSize: 16 },
  // Screens
  screenHeader: { flexDirection: 'row', alignItems: 'center', paddingTop: 48, paddingBottom: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', backgroundColor: '#fff' },
  backBtn: { padding: 8, borderRadius: 99, marginRight: 10 },
  screenHeaderTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  uploadZone: { borderWidth: 2, borderColor: '#93c5fd', borderStyle: 'dashed', borderRadius: 24, padding: 36, alignItems: 'center', backgroundColor: '#eff6ff', marginBottom: 24 },
  uploadTitle: { fontWeight: '600', color: '#111827', marginTop: 10, fontSize: 15 },
  uploadSub: { color: '#6b7280', fontSize: 12, marginTop: 4 },
  fileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 18, marginBottom: 10, borderWidth: 1, borderColor: '#f3f4f6', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  fileIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  fileName: { fontWeight: '600', color: '#1f2937', fontSize: 13 },
  fileMeta: { color: '#6b7280', fontSize: 11, marginTop: 2 },
  videoCard: { backgroundColor: '#fff', borderRadius: 24, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  videoThumb: { height: 150, justifyContent: 'center', alignItems: 'center' },
  playBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  durationBadge: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  durationText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  videoTitle: { fontWeight: '700', color: '#111827', fontSize: 15 },
  videoMeta: { color: '#6b7280', fontSize: 12, marginTop: 4 },
});
