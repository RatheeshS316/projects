import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Modal
} from 'react-native';
import {
  Home, Users, BookOpen, User, UploadCloud, Edit2,
  BarChart2, Plus, Trash2, ChevronLeft, FileText,
  Clock, Search
} from 'lucide-react-native';
import LoadingScreen from './LoadingScreen';

// ── Theme ─────────────────────────────────────────────────────────────────────
const T = {
  primary: '#1E3A8A', secondary: '#38BDF8', accent: '#8B5CF6',
  blue: '#3B82F6', orange: '#F97316', green: '#10B981', purple: '#8B5CF6',
  error: '#EF4444', muted: '#6B7280', main: '#111827',
};

// ── Context ───────────────────────────────────────────────────────────────────
const StaffAppContext = createContext();
const useStaffApp = () => useContext(StaffAppContext);

const INITIAL_DATA = {
  profile: { name: 'Prof. Sarah Jenkins', subject: 'Mathematics', role: 'Senior Educator' },
  students: [
    { id: '1', name: 'Alex Johnson', grade: 'A', score: 92, avatar: 'AJ' },
    { id: '2', name: 'Maria Garcia', grade: 'B', score: 78, avatar: 'MG' },
    { id: '3', name: 'James Smith', grade: 'C', score: 65, avatar: 'JS' },
    { id: '4', name: 'Linda Chen', grade: 'A', score: 95, avatar: 'LC' },
  ],
  materials: [
    { id: '1', title: 'Calculus Chapter 4', type: 'PDF', date: 'Oct 15', size: '2.4 MB' },
    { id: '2', title: 'Algebra Practice Set', type: 'DOC', date: 'Oct 18', size: '1.1 MB' },
  ],
  tests: [
    { id: '1', title: 'Midterm: Calculus', date: 'Oct 25', duration: '60m', questions: 30, status: 'Upcoming' },
    { id: '2', title: 'Quiz: Derivatives', date: 'Oct 10', duration: '30m', questions: 15, status: 'Completed' },
  ],
};

// ── Reusable Components ───────────────────────────────────────────────────────
function Card({ children, style, delay = 0 }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <View style={[styles.card, style, !vis && { opacity: 0 }]}>{children}</View>
  );
}

function HeaderBg() {
  return <View style={styles.headerBg} />;
}

function ScreenHeader({ title }) {
  const { goBack } = useStaffApp();
  return (
    <View style={styles.screenHeader}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}><ChevronLeft size={24} color={T.main} /></TouchableOpacity>
      <Text style={styles.screenTitle}>{title}</Text>
    </View>
  );
}

function InputField({ label, value, onChangeText, placeholder, multiline, keyboardType }) {
  return (
    <View style={{ marginBottom: 14 }}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={[styles.inputField, multiline && { height: 100, textAlignVertical: 'top', paddingTop: 12 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        multiline={multiline}
        keyboardType={keyboardType || 'default'}
      />
    </View>
  );
}

function PrimaryButton({ title, onPress, color = T.primary }) {
  return (
    <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: color }]} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.primaryBtnText}>{title}</Text>
    </TouchableOpacity>
  );
}

// ── Home Screen ───────────────────────────────────────────────────────────────
function StaffHomeScreen() {
  const { profile, students, materials, tests, navigate } = useStaffApp();
  const stats = [
    { label: 'Students', value: students.length, color: T.blue },
    { label: 'Materials', value: materials.length, color: T.orange },
    { label: 'Tests', value: tests.length, color: T.green },
  ];
  const actions = [
    { label: 'Upload\nMaterial', color: T.blue, icon: UploadCloud, screen: 'UploadMaterial' },
    { label: 'Create\nTest', color: T.orange, icon: Edit2, screen: 'CreateTest' },
    { label: 'View\nPerformance', color: T.green, icon: BarChart2, screen: 'Performance' },
    { label: 'Manage\nStudents', color: T.purple, icon: User, screen: 'ManageStudents' },
  ];
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <HeaderBg />
      <View style={styles.homeTop}>
        <View>
          <Text style={styles.homeGreeting}>Hello, {profile.name.split(' ')[1]}!</Text>
          <Text style={styles.homeSub}>{profile.subject} Department</Text>
        </View>
        <View style={styles.avatarCircle}><Text style={styles.avatarText}>{profile.name.charAt(0)}</Text></View>
      </View>

      <Card style={styles.mx} delay={100}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 }}>
          {stats.map((s, i) => (
            <View key={i} style={{ alignItems: 'center' }}>
              <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
                {i === 0 ? <Users size={22} color={s.color} /> : i === 1 ? <FileText size={22} color={s.color} /> : <Clock size={22} color={s.color} />}
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Text style={[styles.sectionTitle, styles.mx, { marginTop: 8, marginBottom: 12 }]}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((a, i) => (
          <TouchableOpacity key={i} style={[styles.actionBtn, { backgroundColor: a.color }]} onPress={() => navigate(a.screen)} activeOpacity={0.85}>
            <a.icon size={26} color="#fff" />
            <Text style={styles.actionBtnText}>{a.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.sectionTitle, styles.mx, { marginTop: 8, marginBottom: 12 }]}>Recent Tests</Text>
      {tests.slice(0, 2).map((test, i) => (
        <Card key={test.id} style={styles.mx} delay={200 + i * 100}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.testIcon}><BookOpen size={22} color={T.primary} /></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.testTitle}>{test.title}</Text>
              <Text style={styles.testMeta}>{test.date} • {test.duration}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: test.status === 'Completed' ? '#d1fae5' : '#dbeafe' }]}>
              <Text style={[styles.statusText, { color: test.status === 'Completed' ? '#065f46' : '#1e40af' }]}>{test.status}</Text>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

// ── Students Screen ───────────────────────────────────────────────────────────
function StudentsScreen() {
  const { students, deleteStudent } = useStaffApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' ? true : filter === 'Top' ? s.score >= 90 : s.score < 70;
    return matchSearch && matchFilter;
  });

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <HeaderBg />
      <View style={styles.pageHead}>
        <Text style={styles.pageTitle}>Directory</Text>
        <View style={styles.searchRow}>
          <Search size={18} color={T.muted} style={{ marginRight: 8 }} />
          <TextInput style={{ flex: 1, fontSize: 15, color: T.main }} placeholder="Search students..." placeholderTextColor="#9ca3af" value={search} onChangeText={setSearch} />
        </View>
        <View style={styles.filterRow}>
          {['All', 'Top', 'Needs Help'].map(f => (
            <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterBtnActive]} onPress={() => setFilter(f)}>
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.mx}>
        {filtered.map((s, i) => (
          <Card key={s.id} delay={i * 50} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.studentAvatar, { backgroundColor: T.secondary }]}>
                <Text style={styles.studentAvatarText}>{s.avatar}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.studentName}>{s.name}</Text>
                <Text style={styles.studentScore}>Overall Score: {s.score}%</Text>
              </View>
              <TouchableOpacity onPress={() => deleteStudent(s.id)} style={styles.deleteBtn}>
                <Trash2 size={20} color={T.error} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

// ── Materials Screen ──────────────────────────────────────────────────────────
function MaterialsScreen() {
  const { materials, deleteMaterial, navigate } = useStaffApp();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <HeaderBg />
      <View style={styles.pageHead}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.pageTitle}>Materials</Text>
          <TouchableOpacity style={styles.addCircleBtn} onPress={() => navigate('UploadMaterial')}>
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mx}>
        {materials.map((m, i) => (
          <Card key={m.id} delay={i * 100} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.matIcon, { backgroundColor: T.orange + '20' }]}><FileText size={22} color={T.orange} /></View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.matTitle}>{m.title}</Text>
                <Text style={styles.matMeta}>{m.type} • {m.size} • {m.date}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteMaterial(m.id)}><Trash2 size={20} color="#9ca3af" /></TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

// ── Upload Material Screen ────────────────────────────────────────────────────
function UploadMaterialScreen() {
  const { addMaterial, goBack } = useStaffApp();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScreenHeader title="Upload Material" />
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <View style={styles.uploadZone}>
          <UploadCloud size={44} color={T.secondary} />
          <Text style={styles.uploadTitle}>Tap to browse or drag file</Text>
          <Text style={styles.uploadSub}>PDF, DOCX, PPTX (Max 50MB)</Text>
        </View>
        <InputField label="Document Title" value={title} onChangeText={setTitle} placeholder="e.g., Chapter 5 Notes" />
        <InputField label="Description (Optional)" value={desc} onChangeText={setDesc} placeholder="Brief description..." multiline />
        <PrimaryButton title="Upload File" color={T.blue} onPress={() => { if (title) { addMaterial({ title, type: 'PDF', size: '1.2 MB' }); goBack(); } }} />
      </ScrollView>
    </View>
  );
}

// ── Create Test Screen ────────────────────────────────────────────────────────
function CreateTestScreen() {
  const { addTest, goBack } = useStaffApp();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('60');
  const [questions, setQuestions] = useState([{ id: '1' }]);
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScreenHeader title="Create New Test" />
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <Card>
          <InputField label="Test Title" value={title} onChangeText={setTitle} placeholder="e.g., Weekly Mathematics Quiz" />
          <InputField label="Duration (minutes)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
        </Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 14 }}>
          <Text style={styles.sectionTitle}>Questions ({questions.length})</Text>
          <TouchableOpacity style={styles.addQBtn} onPress={() => setQuestions([...questions, { id: Date.now().toString() }])}>
            <Plus size={16} color="#fff" />
            <Text style={styles.addQBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
        {questions.map((q, i) => (
          <Card key={q.id} style={{ marginBottom: 12 }}>
            <Text style={styles.qLabel}>Question {i + 1}</Text>
            <TextInput style={styles.qInput} placeholder="Enter question text..." placeholderTextColor="#9ca3af" multiline numberOfLines={2} />
          </Card>
        ))}
        <View style={{ marginTop: 16, marginBottom: 40 }}>
          <PrimaryButton title="Publish Test" onPress={() => { if (title) { addTest({ title, duration: duration + 'm', date: 'Upcoming', questions: questions.length }); goBack(); } }} />
        </View>
      </ScrollView>
    </View>
  );
}

// ── Performance Screen ────────────────────────────────────────────────────────
function PerformanceScreen() {
  const { students, goBack } = useStaffApp();
  const avg = Math.round(students.reduce((a, s) => a + s.score, 0) / students.length) || 0;
  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScreenHeader title="Class Performance" />
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: 'center', paddingVertical: 32, marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>Class Average</Text>
          <View style={styles.avgCircle}>
            <Text style={styles.avgScore}>{avg}%</Text>
            <Text style={styles.avgLabel}>Overall</Text>
          </View>
        </Card>
        <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>Student Rankings</Text>
        {[...students].sort((a, b) => b.score - a.score).map((s, i) => (
          <View key={s.id} style={styles.rankRow}>
            <Text style={styles.rankNum}>{i + 1}</Text>
            <View style={styles.rankAvatar}><Text style={styles.rankAvatarText}>{s.avatar}</Text></View>
            <Text style={styles.rankName}>{s.name}</Text>
            <Text style={styles.rankScore}>{s.score}%</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ── Profile Screen ────────────────────────────────────────────────────────────
function StaffProfileScreen() {
  const { profile, onLogout } = useStaffApp();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }}>
      <HeaderBg />
      <View style={{ alignItems: 'center', paddingTop: 64, paddingBottom: 20 }}>
        <View style={styles.profileBigAvatar}><Text style={styles.profileBigText}>{profile.name.charAt(0)}</Text></View>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileRole}>{profile.role} - {profile.subject}</Text>
      </View>
      <View style={styles.mx}>
        <PrimaryButton title="Log Out" color={T.error} onPress={onLogout} />
      </View>
    </ScrollView>
  );
}

// ── Bottom Tabs ───────────────────────────────────────────────────────────────
function StaffBottomTabs() {
  const { activeTab, setActiveTab } = useStaffApp();
  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'Students', icon: Users },
    { name: 'Materials', icon: BookOpen },
    { name: 'Profile', icon: User },
  ];
  return (
    <View style={styles.bottomNav}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity key={tab.name} style={styles.navItem} onPress={() => setActiveTab(tab.name)}>
            <tab.icon size={24} color={isActive ? T.primary : T.muted} strokeWidth={isActive ? 2.5 : 2} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Navigator ─────────────────────────────────────────────────────────────────
function StaffNavigator() {
  const { activeScreen, activeTab, setActiveTab, setActiveScreen, isNavigating } = useStaffApp();

  if (activeScreen === 'ManageStudents') {
    setTimeout(() => { setActiveTab('Students'); setActiveScreen(null); }, 0);
    return null;
  }

  let Screen = StaffHomeScreen;
  if (activeScreen === 'UploadMaterial') Screen = UploadMaterialScreen;
  else if (activeScreen === 'CreateTest') Screen = CreateTestScreen;
  else if (activeScreen === 'Performance') Screen = PerformanceScreen;
  else if (activeTab === 'Students') Screen = StudentsScreen;
  else if (activeTab === 'Materials') Screen = MaterialsScreen;
  else if (activeTab === 'Profile') Screen = StaffProfileScreen;

  return (
    <View style={{ flex: 1 }}>
      {isNavigating && <LoadingScreen />}
      {!isNavigating && (
        <>
          <Screen />
          {!activeScreen && <StaffBottomTabs />}
        </>
      )}
    </View>
  );
}

// ── Provider + Export ─────────────────────────────────────────────────────────
export default function StaffPortal({ onLogout }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [activeTab, setTabRaw] = useState('Home');
  const [activeScreen, setActiveScreen] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const withAnim = (fn) => { setIsNavigating(true); setTimeout(() => { fn(); setIsNavigating(false); }, 500); };
  const navigate = (screen) => withAnim(() => setActiveScreen(screen));
  const goBack = () => withAnim(() => setActiveScreen(null));
  const setActiveTab = (tab) => { if (tab !== activeTab) withAnim(() => { setTabRaw(tab); setActiveScreen(null); }); };

  const ctx = {
    ...data,
    activeTab, setActiveTab,
    activeScreen, setActiveScreen,
    navigate, goBack, onLogout, isNavigating,
    addStudent: (s) => setData(p => ({ ...p, students: [...p.students, { ...s, id: Date.now().toString() }] })),
    deleteStudent: (id) => setData(p => ({ ...p, students: p.students.filter(s => s.id !== id) })),
    addMaterial: (m) => setData(p => ({ ...p, materials: [{ ...m, id: Date.now().toString(), date: 'Just now' }, ...p.materials] })),
    deleteMaterial: (id) => setData(p => ({ ...p, materials: p.materials.filter(m => m.id !== id) })),
    addTest: (t) => setData(p => ({ ...p, tests: [{ ...t, id: Date.now().toString(), status: 'Upcoming' }, ...p.tests] })),
  };

  return (
    <StaffAppContext.Provider value={ctx}>
      <StaffNavigator />
    </StaffAppContext.Provider>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
  mx: { marginHorizontal: 16 },
  headerBg: { position: 'absolute', top: 0, left: 0, right: 0, height: 220, backgroundColor: '#eff6ff', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  screenHeader: { flexDirection: 'row', alignItems: 'center', paddingTop: 48, paddingBottom: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', backgroundColor: '#fff' },
  backBtn: { padding: 8, marginRight: 8 },
  screenTitle: { fontSize: 18, fontWeight: '700', color: T.main },
  inputLabel: { fontSize: 14, fontWeight: '600', color: T.main, marginBottom: 6 },
  inputField: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: T.main },
  primaryBtn: { padding: 16, borderRadius: 14, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  // Home
  homeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 20, zIndex: 1 },
  homeGreeting: { fontSize: 26, fontWeight: '800', color: T.main },
  homeSub: { fontSize: 14, color: T.muted, marginTop: 2 },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: T.main },
  statIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  statValue: { fontSize: 20, fontWeight: '700', color: T.main },
  statLabel: { fontSize: 11, color: T.muted, fontWeight: '500' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
  actionBtn: { width: '48%', height: 110, borderRadius: 20, padding: 16, justifyContent: 'space-between', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  testIcon: { width: 46, height: 46, borderRadius: 14, backgroundColor: '#dbeafe', alignItems: 'center', justifyContent: 'center' },
  testTitle: { fontSize: 14, fontWeight: '700', color: T.main },
  testMeta: { fontSize: 11, color: T.muted, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
  statusText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  // Students
  pageHead: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8, zIndex: 1 },
  pageTitle: { fontSize: 28, fontWeight: '800', color: T.main, marginBottom: 14 },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 99, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12, borderWidth: 1, borderColor: '#f3f4f6' },
  filterRow: { flexDirection: 'row', backgroundColor: 'rgba(209,213,219,0.6)', borderRadius: 99, padding: 4 },
  filterBtn: { flex: 1, paddingVertical: 8, borderRadius: 99, alignItems: 'center' },
  filterBtnActive: { backgroundColor: T.blue },
  filterText: { fontSize: 13, fontWeight: '600', color: T.muted },
  filterTextActive: { color: '#fff' },
  studentAvatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  studentAvatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  studentName: { fontSize: 15, fontWeight: '700', color: T.main },
  studentScore: { fontSize: 13, color: T.muted, marginTop: 2 },
  deleteBtn: { padding: 8 },
  // Materials
  matIcon: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  matTitle: { fontSize: 14, fontWeight: '700', color: T.main },
  matMeta: { fontSize: 11, color: T.muted, marginTop: 2 },
  addCircleBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: T.blue, alignItems: 'center', justifyContent: 'center', shadowColor: T.blue, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4 },
  // Upload
  uploadZone: { borderWidth: 2, borderColor: '#d1d5db', borderStyle: 'dashed', borderRadius: 20, padding: 40, alignItems: 'center', backgroundColor: '#fff', marginBottom: 20 },
  uploadTitle: { fontWeight: '600', color: T.main, marginTop: 12, fontSize: 15 },
  uploadSub: { color: T.muted, fontSize: 12, marginTop: 4 },
  // Create Test
  addQBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E3A8A', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99 },
  addQBtnText: { color: '#fff', fontWeight: '700', fontSize: 13, marginLeft: 4 },
  qLabel: { fontSize: 12, fontWeight: '700', color: T.muted, marginBottom: 8 },
  qInput: { borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingBottom: 8, fontSize: 15, color: T.main },
  // Performance
  avgCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 14, borderColor: T.blue, alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  avgScore: { fontSize: 30, fontWeight: '800', color: T.main },
  avgLabel: { fontSize: 13, color: T.muted, fontWeight: '500' },
  rankRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 18, marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  rankNum: { width: 24, fontSize: 13, fontWeight: '700', color: T.muted },
  rankAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  rankAvatarText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  rankName: { flex: 1, fontSize: 13, fontWeight: '700', color: T.main },
  rankScore: { fontSize: 15, fontWeight: '800', color: T.main },
  // Profile
  profileBigAvatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#1E3A8A', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#fff', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, elevation: 6, marginBottom: 14 },
  profileBigText: { color: '#fff', fontSize: 40, fontWeight: '800' },
  profileName: { fontSize: 22, fontWeight: '800', color: T.main },
  profileRole: { fontSize: 14, color: T.muted, marginTop: 4, fontWeight: '500' },
  // Bottom Nav
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingBottom: 24, paddingTop: 10 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 10, color: T.muted, marginTop: 3, fontWeight: '500' },
  navLabelActive: { color: '#1E3A8A', fontWeight: '800' },
});
