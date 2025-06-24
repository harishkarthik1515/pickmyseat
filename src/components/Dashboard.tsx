import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  BookOpen, 
  Target, 
  Calendar, 
  Bell, 
  Star, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Award, 
  Brain, 
  Search, 
  Filter,
  ChevronRight,
  Heart,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Menu,
  X,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  Sparkles,
  Globe,
  FileText,
  Users,
  Zap,
  Lightbulb,
  Database,
  BarChart3,
  Compass,
  Plane,
  DollarSign,
  BookMarked,
  PenTool,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  School,
  GraduationCapIcon,
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  BellIcon,
  EyeIcon,
  EyeOffIcon,
  ShieldIcon,
  CreditCardIcon,
  HelpCircleIcon,
  DownloadIcon,
  TrashIcon,
  PlusIcon
} from 'lucide-react';

// Import module components
import CourseRecommendation from './modules/CourseRecommendation';
import CollegeSuggestions from './modules/CollegeSuggestions';
import EntranceExamFinder from './modules/EntranceExamFinder';
import MockCounselling from './modules/MockCounselling';
import StudyAbroad from './modules/StudyAbroad';
import DreamFitAnalyzer from './modules/DreamFitAnalyzer';

interface College {
  id: string;
  name: string;
  location: string;
  course: string;
  fees: string;
  rating: number;
  cutoff: string;
  deadline: string;
  match: number;
}

interface Exam {
  id: string;
  name: string;
  date: string;
  registrationDeadline: string;
  status: 'upcoming' | 'registered' | 'completed';
}

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  state: string;
  city: string;
  stream: string;
  school: string;
  marks: {
    physics: string;
    chemistry: string;
    mathematics: string;
    biology: string;
    english: string;
    overall: string;
  };
  interests: string[];
  avatar: string;
}

interface Deadline {
  id: string;
  title: string;
  type: 'Application' | 'Exam' | 'Result' | 'Counselling';
  date: string;
  description: string;
  status: 'upcoming' | 'today' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  college?: string;
  exam?: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: 'Dashboard', path: 'overview' }
  ]);

  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210',
    dateOfBirth: '2005-08-15',
    gender: 'Male',
    state: 'Tamil Nadu',
    city: 'Chennai',
    stream: 'Science (PCM)',
    school: 'DAV Public School',
    marks: {
      physics: '92',
      chemistry: '89',
      mathematics: '95',
      biology: '88',
      english: '85',
      overall: '90'
    },
    interests: ['Artificial Intelligence', 'Web Development', 'Data Science', 'Robotics'],
    avatar: ''
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true,
      examReminders: true,
      applicationDeadlines: true,
      counsellingUpdates: true
    },
    privacy: {
      profileVisibility: 'private',
      showMarks: false,
      showContact: false
    },
    preferences: {
      language: 'english',
      theme: 'light',
      timezone: 'Asia/Kolkata'
    }
  });

  // Deadlines state
  const [deadlines] = useState<Deadline[]>([
    {
      id: '1',
      title: 'JEE Main Application',
      type: 'Application',
      date: '2024-03-15',
      description: 'Last date to apply for JEE Main 2024',
      status: 'upcoming',
      priority: 'high',
      exam: 'JEE Main'
    },
    {
      id: '2',
      title: 'NEET Application',
      type: 'Application',
      date: '2024-03-20',
      description: 'NEET 2024 application deadline',
      status: 'upcoming',
      priority: 'high',
      exam: 'NEET'
    },
    {
      id: '3',
      title: 'BITSAT Exam',
      type: 'Exam',
      date: '2024-05-20',
      description: 'BITSAT 2024 examination date',
      status: 'upcoming',
      priority: 'medium',
      exam: 'BITSAT'
    },
    {
      id: '4',
      title: 'VIT Application',
      type: 'Application',
      date: '2024-02-28',
      description: 'VIT application deadline has passed',
      status: 'overdue',
      priority: 'medium',
      college: 'VIT Vellore'
    },
    {
      id: '5',
      title: 'TNEA Counselling',
      type: 'Counselling',
      date: '2024-07-15',
      description: 'TNEA counselling process begins',
      status: 'upcoming',
      priority: 'medium',
      exam: 'TNEA'
    }
  ]);

  const [savedColleges] = useState<College[]>([
    {
      id: '1',
      name: 'IIT Delhi',
      location: 'New Delhi',
      course: 'Computer Science Engineering',
      fees: '₹2.5L/year',
      rating: 4.8,
      cutoff: 'JEE Rank: 150-200',
      deadline: '2024-06-30',
      match: 92
    },
    {
      id: '2',
      name: 'BITS Pilani',
      location: 'Rajasthan',
      course: 'Information Technology',
      fees: '₹4.2L/year',
      rating: 4.6,
      cutoff: 'BITSAT: 380+',
      deadline: '2024-07-15',
      match: 88
    },
    {
      id: '3',
      name: 'VIT Vellore',
      location: 'Tamil Nadu',
      course: 'Computer Science',
      fees: '₹1.8L/year',
      rating: 4.4,
      cutoff: 'VITEEE: Rank 1-5000',
      deadline: '2024-07-20',
      match: 85
    }
  ]);

  const [examReminders] = useState<Exam[]>([
    {
      id: '1',
      name: 'JEE Main 2024',
      date: '2024-04-15',
      registrationDeadline: '2024-03-15',
      status: 'upcoming'
    },
    {
      id: '2',
      name: 'BITSAT 2024',
      date: '2024-05-20',
      registrationDeadline: '2024-04-20',
      status: 'registered'
    },
    {
      id: '3',
      name: 'VITEEE 2024',
      date: '2024-04-25',
      registrationDeadline: '2024-03-25',
      status: 'upcoming'
    }
  ]);

  const [aiSuggestions] = useState([
    {
      id: '1',
      title: 'Perfect Match Found!',
      description: 'Based on your marks and interests, IIT Delhi CSE is an excellent fit.',
      type: 'college',
      confidence: 95
    },
    {
      id: '2',
      title: 'Exam Strategy',
      description: 'Focus on Mathematics and Physics for JEE Main preparation.',
      type: 'preparation',
      confidence: 88
    },
    {
      id: '3',
      title: 'Alternative Options',
      description: 'Consider NITs as backup options with your current percentile.',
      type: 'backup',
      confidence: 82
    }
  ]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'saved', label: 'Saved Choices', icon: Heart },
    { id: 'exams', label: 'Exam Reminders', icon: Calendar },
    { id: 'suggestions', label: 'AI Suggestions', icon: Brain },
    { id: 'deadlines', label: 'Deadlines', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const quickActionModules = [
    {
      id: 'course-recommendation',
      title: 'Course Recommendation',
      description: 'AI-powered course suggestions based on your 12th marks and interests',
      icon: BookOpen,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'from-teal-50 to-teal-100',
      isAI: true
    },
    {
      id: 'college-suggestions',
      title: 'College & Branch Suggestions',
      description: 'Get personalized college recommendations with branch analysis',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      isAI: true
    },
    {
      id: 'entrance-exam-finder',
      title: 'Entrance Exam Finder',
      description: 'All-India search with eligibility filters and exam details',
      icon: Search,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      isAI: false
    },
    {
      id: 'mock-counselling',
      title: 'Mock Counselling Flow',
      description: 'Practice TNEA/JoSAA/NEET counselling process',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      isAI: false
    },
    {
      id: 'study-abroad',
      title: 'Study Abroad Guide',
      description: 'Country selector, scholarships, and step-by-step guidance',
      icon: Plane,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      isAI: false
    },
    {
      id: 'dreamfit-analyzer',
      title: 'DreamFit Analyzer',
      description: 'Analyze what it takes to reach your dream college with target planning',
      icon: Target,
      color: 'from-pink-500 to-purple-600',
      bgColor: 'from-pink-50 to-purple-100',
      isAI: true
    }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const handleModuleClick = (moduleId: string) => {
    const module = quickActionModules.find(m => m.id === moduleId);
    if (module) {
      setActiveModule(moduleId);
      setBreadcrumbs([
        { label: 'Dashboard', path: 'overview' },
        { label: module.title, path: moduleId }
      ]);
    }
  };

  const handleBreadcrumbClick = (path: string) => {
    if (path === 'overview') {
      setActiveModule(null);
      setActiveTab('overview');
      setBreadcrumbs([{ label: 'Dashboard', path: 'overview' }]);
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setActiveModule(null);
    const tabItem = sidebarItems.find(item => item.id === tabId);
    setBreadcrumbs([
      { label: 'Dashboard', path: 'overview' },
      { label: tabItem?.label || 'Page', path: tabId }
    ]);
  };

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // Here you would typically save to backend
  };

  const getDeadlineStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'today': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderBreadcrumbs = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <motion.div 
        className="flex items-center space-x-2 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.path}>
            <motion.button
              onClick={() => handleBreadcrumbClick(item.path)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                index === breadcrumbs.length - 1
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {index === 0 && <Home className="h-4 w-4" />}
              <span>{item.label}</span>
            </motion.button>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );

  const renderModuleContent = () => {
    if (!activeModule) return null;

    switch (activeModule) {
      case 'course-recommendation':
        return <CourseRecommendation />;
      case 'college-suggestions':
        return <CollegeSuggestions />;
      case 'entrance-exam-finder':
        return <EntranceExamFinder />;
      case 'mock-counselling':
        return <MockCounselling />;
      case 'study-abroad':
        return <StudyAbroad />;
      case 'dreamfit-analyzer':
        return <DreamFitAnalyzer />;
      default:
        return null;
    }
  };

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              {isEditingProfile && (
                <motion.button
                  className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="h-4 w-4" />
                </motion.button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-blue-100">{userProfile.stream} • {userProfile.school}</p>
              <p className="text-blue-200">{userProfile.city}, {userProfile.state}</p>
            </div>
          </div>
          <motion.button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditingProfile ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
            <span>{isEditingProfile ? 'Save Changes' : 'Edit Profile'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Profile Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditingProfile ? (
                  <input
                    type="date"
                    value={userProfile.dateOfBirth}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.dateOfBirth}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditingProfile ? (
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                {isEditingProfile ? (
                  <select
                    value={userProfile.state}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{userProfile.state}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={userProfile.city}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{userProfile.city}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Academic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
              {isEditingProfile ? (
                <input
                  type="text"
                  value={userProfile.school}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, school: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{userProfile.school}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
              {isEditingProfile ? (
                <select
                  value={userProfile.stream}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, stream: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Science (PCM)">Science (PCM)</option>
                  <option value="Science (PCB)">Science (PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              ) : (
                <p className="text-gray-900">{userProfile.stream}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">12th Grade Marks</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(userProfile.marks).map(([subject, mark]) => (
                  <div key={subject} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium capitalize">{subject}:</span>
                    {isEditingProfile ? (
                      <input
                        type="number"
                        value={mark}
                        onChange={(e) => setUserProfile(prev => ({
                          ...prev,
                          marks: { ...prev.marks, [subject]: e.target.value }
                        }))}
                        className="w-16 px-2 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                        min="0"
                        max="100"
                      />
                    ) : (
                      <span className="text-sm font-bold text-blue-600">{mark}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Interests & Goals</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile.interests.map((interest, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {interest}
            </span>
          ))}
          {isEditingProfile && (
            <motion.button
              className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Add Interest
            </motion.button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditingProfile && (
        <div className="flex justify-end space-x-4">
          <motion.button
            onClick={() => setIsEditingProfile(false)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleProfileSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Settings Header */}
      <motion.div
        className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3">
          <Settings className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-gray-200">Manage your account preferences and privacy settings</p>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <Bell className="h-5 w-5 text-blue-600 mr-2" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'email' && 'Receive notifications via email'}
                  {key === 'sms' && 'Receive SMS notifications'}
                  {key === 'push' && 'Receive push notifications'}
                  {key === 'examReminders' && 'Get reminders about upcoming exams'}
                  {key === 'applicationDeadlines' && 'Get alerts for application deadlines'}
                  {key === 'counsellingUpdates' && 'Receive counselling process updates'}
                </p>
              </div>
              <motion.button
                onClick={() => setSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, [key]: !value }
                }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <ShieldIcon className="h-5 w-5 text-green-600 mr-2" />
          Privacy Settings
        </h3>
        <div className="space-y-4">
          <div className="p-3 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Profile Visibility</h4>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                privacy: { ...prev.privacy, profileVisibility: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Show Academic Marks</h4>
              <p className="text-sm text-gray-600">Allow others to see your academic performance</p>
            </div>
            <motion.button
              onClick={() => setSettings(prev => ({
                ...prev,
                privacy: { ...prev.privacy, showMarks: !prev.privacy.showMarks }
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.privacy.showMarks ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privacy.showMarks ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </motion.button>
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Show Contact Information</h4>
              <p className="text-sm text-gray-600">Allow others to see your contact details</p>
            </div>
            <motion.button
              onClick={() => setSettings(prev => ({
                ...prev,
                privacy: { ...prev.privacy, showContact: !prev.privacy.showContact }
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.privacy.showContact ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privacy.showContact ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Account Actions</h3>
        <div className="space-y-4">
          <motion.button
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center space-x-3">
              <DownloadIcon className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Download Data</h4>
                <p className="text-sm text-gray-600">Download a copy of your account data</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.button>

          <motion.button
            className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center space-x-3">
              <TrashIcon className="h-5 w-5" />
              <div className="text-left">
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-red-500">Permanently delete your account and data</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-red-400" />
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderDeadlines = () => (
    <div className="space-y-6">
      {/* Deadlines Header */}
      <motion.div
        className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Application Deadlines</h2>
              <p className="text-red-100">Stay on top of important dates and deadlines</p>
            </div>
          </div>
          <motion.button
            className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Deadline</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Deadline Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Deadlines', value: deadlines.length.toString(), icon: Calendar, color: 'from-blue-500 to-blue-600' },
          { label: 'Upcoming', value: deadlines.filter(d => d.status === 'upcoming').length.toString(), icon: Clock, color: 'from-green-500 to-green-600' },
          { label: 'High Priority', value: deadlines.filter(d => d.priority === 'high').length.toString(), icon: AlertCircle, color: 'from-red-500 to-red-600' },
          { label: 'This Week', value: '3', icon: Calendar, color: 'from-purple-500 to-purple-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <motion.div
                className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deadlines List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Upcoming Deadlines</h3>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm">
              <option value="all">All Types</option>
              <option value="application">Applications</option>
              <option value="exam">Exams</option>
              <option value="result">Results</option>
              <option value="counselling">Counselling</option>
            </select>
            <select className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm">
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {deadlines.map((deadline, index) => (
            <motion.div
              key={deadline.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${
                  deadline.type === 'Application' ? 'bg-blue-100' :
                  deadline.type === 'Exam' ? 'bg-green-100' :
                  deadline.type === 'Result' ? 'bg-yellow-100' :
                  'bg-purple-100'
                }`}>
                  {deadline.type === 'Application' && <FileText className={`h-6 w-6 ${
                    deadline.type === 'Application' ? 'text-blue-600' :
                    deadline.type === 'Exam' ? 'text-green-600' :
                    deadline.type === 'Result' ? 'text-yellow-600' :
                    'text-purple-600'
                  }`} />}
                  {deadline.type === 'Exam' && <BookOpen className="h-6 w-6 text-green-600" />}
                  {deadline.type === 'Result' && <Award className="h-6 w-6 text-yellow-600" />}
                  {deadline.type === 'Counselling' && <Users className="h-6 w-6 text-purple-600" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{deadline.title}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getDeadlineStatusColor(deadline.status)}`}>
                      {deadline.status}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{deadline.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>📅 {deadline.date}</span>
                    {deadline.college && <span>🏫 {deadline.college}</span>}
                    {deadline.exam && <span>📝 {deadline.exam}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell className="h-5 w-5" />
                </motion.button>
                <motion.button
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CheckCircle className="h-5 w-5" />
                </motion.button>
                <motion.button
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Never Miss a Deadline</h3>
            <p className="text-gray-600">Set up calendar reminders and notifications</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Export Calendar
            </motion.button>
            <motion.button
              className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Set Reminders
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile.name}!</h1>
            <p className="text-teal-100 text-lg">Your personalized college guidance dashboard</p>
          </div>
          <motion.div
            className="bg-white/20 p-4 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="h-12 w-12" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Saved Colleges', value: '12', icon: Heart, color: 'from-pink-500 to-rose-500' },
          { label: 'Exam Reminders', value: '5', icon: Bell, color: 'from-blue-500 to-indigo-500' },
          { label: 'AI Match Score', value: '92%', icon: Brain, color: 'from-purple-500 to-violet-500' },
          { label: 'Days to Deadline', value: '45', icon: Clock, color: 'from-orange-500 to-red-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <motion.div
                className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions - Enhanced Module Cards */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActionModules.map((module, index) => (
            <motion.div
              key={module.id}
              className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-teal-300 hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModuleClick(module.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${module.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              {/* AI Badge */}
              {module.isAI && (
                <motion.div
                  className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>AI</span>
                </motion.div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div 
                    className={`bg-gradient-to-br ${module.color} p-3 rounded-xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <module.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {module.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors leading-relaxed">
                  {module.description}
                </p>
                
                <motion.div 
                  className="flex items-center space-x-2 text-teal-600 font-semibold text-sm"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </div>

              {/* Hover Effect Particles */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderSavedChoices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Saved Colleges</h2>
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </motion.button>
          <motion.button
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add College
          </motion.button>
        </div>
      </div>

      <div className="grid gap-6">
        {savedColleges.map((college, index) => (
          <motion.div
            key={college.id}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{college.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    college.match >= 90 ? 'bg-green-100 text-green-700' :
                    college.match >= 80 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {college.match}% Match
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{college.course}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>{college.fees}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{college.rating}/5</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Cutoff:</span> {college.cutoff}
                  </div>
                  <div className="text-sm text-red-600">
                    <span className="font-medium">Deadline:</span> {college.deadline}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-5 w-5 fill-current" />
                </motion.button>
                <motion.button
                  className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderExamReminders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Exam Reminders</h2>
        <motion.button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Exam
        </motion.button>
      </div>

      <div className="grid gap-4">
        {examReminders.map((exam, index) => (
          <motion.div
            key={exam.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${
                  exam.status === 'registered' ? 'bg-green-100' :
                  exam.status === 'upcoming' ? 'bg-yellow-100' :
                  'bg-gray-100'
                }`}>
                  <Calendar className={`h-6 w-6 ${
                    exam.status === 'registered' ? 'text-green-600' :
                    exam.status === 'upcoming' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exam.name}</h3>
                  <p className="text-gray-600">Exam Date: {exam.date}</p>
                  <p className="text-sm text-gray-500">Registration Deadline: {exam.registrationDeadline}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  exam.status === 'registered' ? 'bg-green-100 text-green-700' :
                  exam.status === 'upcoming' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {exam.status === 'registered' ? 'Registered' :
                   exam.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                </div>
                <motion.button
                  className="text-teal-600 hover:text-teal-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAISuggestions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">AI-Powered Suggestions</h2>
        <motion.button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Brain className="h-4 w-4" />
          <span>Refresh</span>
        </motion.button>
      </div>

      <div className="grid gap-6">
        {aiSuggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl ${
                suggestion.type === 'college' ? 'bg-teal-100' :
                suggestion.type === 'preparation' ? 'bg-blue-100' :
                'bg-purple-100'
              }`}>
                {suggestion.type === 'college' ? (
                  <GraduationCap className={`h-6 w-6 ${
                    suggestion.type === 'college' ? 'text-teal-600' :
                    suggestion.type === 'preparation' ? 'text-blue-600' :
                    'text-purple-600'
                  }`} />
                ) : suggestion.type === 'preparation' ? (
                  <BookOpen className="h-6 w-6 text-blue-600" />
                ) : (
                  <Target className="h-6 w-6 text-purple-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{suggestion.title}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      suggestion.confidence >= 90 ? 'bg-green-100 text-green-700' :
                      suggestion.confidence >= 80 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {suggestion.confidence}% Confidence
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{suggestion.description}</p>
                <motion.button
                  className="text-teal-600 hover:text-teal-700 font-medium flex items-center space-x-1"
                  whileHover={{ x: 5 }}
                >
                  <span>Learn More</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeModule) {
      return renderModuleContent();
    }

    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'saved':
        return renderSavedChoices();
      case 'exams':
        return renderExamReminders();
      case 'suggestions':
        return renderAISuggestions();
      case 'deadlines':
        return renderDeadlines();
      case 'profile':
        return renderProfile();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div 
              className="bg-gradient-to-br from-teal-600 to-teal-700 p-2 rounded-xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
              PickMySeat
            </span>
          </div>
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 hover:text-teal-600"
            whileTap={{ scale: 0.95 }}
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none flex flex-col`}>
        
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center space-x-2 p-6 border-b border-gray-200 flex-shrink-0">
          <motion.div 
            className="bg-gradient-to-br from-teal-600 to-teal-700 p-2 rounded-xl shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            PickMySeat
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                handleTabClick(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id && !activeModule
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 space-y-2 border-t border-gray-200 flex-shrink-0">
          <motion.button
            onClick={() => {
              handleTabClick('settings');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'settings' && !activeModule
                ? 'bg-gray-50 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Breadcrumbs */}
        {renderBreadcrumbs()}
        
        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <motion.div
            key={activeTab + (activeModule || '')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;