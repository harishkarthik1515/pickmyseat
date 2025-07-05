import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
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
  Play,
  Trophy,
  Shield
} from 'lucide-react';
import TNEACounsellingSimulator from '../components/TNEACounsellingSimulator';

interface BreadcrumbItem {
  label: string;
  path: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: 'Dashboard', path: 'overview' }
  ]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'simulations', label: 'Simulations', icon: Play },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'saved', label: 'Saved Choices', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const counsellingModules = [
    {
      id: 'tnea',
      title: 'TNEA Counselling',
      description: 'Tamil Nadu Engineering Admissions counselling process simulation',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      participants: '2.5L+',
      duration: '45 mins',
      difficulty: 'Intermediate',
      rating: 4.7,
      completed: 15420
    },
    {
      id: 'josaa',
      title: 'JoSAA Counselling',
      description: 'Joint Seat Allocation Authority counselling for IITs, NITs, and IIITs',
      icon: Trophy,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      participants: '8L+',
      duration: '60 mins',
      difficulty: 'Advanced',
      rating: 4.8,
      completed: 28750
    },
    {
      id: 'neet',
      title: 'NEET Counselling',
      description: 'Medical college admission counselling process for MBBS, BDS, and other courses',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      participants: '18L+',
      duration: '50 mins',
      difficulty: 'Intermediate',
      rating: 4.6,
      completed: 22100
    }
  ];

  const handleLogout = () => {
    navigate('/mycounsell');
  };

  const handleModuleClick = (moduleId: string) => {
    const module = counsellingModules.find(m => m.id === moduleId);
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
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
      case 'tnea':
        return <TNEACounsellingSimulator />;
      default:
        return (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This simulation is under development</p>
          </div>
        );
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to MYCOUNSELL!</h1>
            <p className="text-blue-100 text-lg">Master your college counselling process with AI-powered simulations</p>
          </div>
          <motion.div
            className="bg-white/20 p-4 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="h-12 w-12" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Simulations Available', value: '3', icon: Play, color: 'from-blue-500 to-indigo-500' },
          { label: 'Practice Sessions', value: '0', icon: Clock, color: 'from-green-500 to-emerald-500' },
          { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'from-purple-500 to-violet-500' },
          { label: 'Expert Rating', value: '4.7/5', icon: Star, color: 'from-orange-500 to-red-500' },
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

      {/* Counselling Simulations */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Counselling Simulations</h2>
        <div className="grid md:grid-cols-1 gap-6">
          {counsellingModules.map((module, index) => (
            <motion.div
              key={module.id}
              className="relative p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
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
              
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div 
                      className={`bg-gradient-to-br ${module.color} p-3 rounded-xl shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <module.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors text-lg">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <motion.div 
                    className="flex items-center space-x-2 text-blue-600 font-semibold text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span>Start</span>
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-bold text-blue-600">{module.participants}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-bold text-green-600">{module.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Difficulty</p>
                    <p className="font-bold text-orange-600">{module.difficulty}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Rating</p>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <p className="font-bold text-yellow-600">{module.rating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    if (activeModule) {
      return renderModuleContent();
    }

    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'simulations':
        return renderOverview(); // Same as overview for now
      default:
        return (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div 
              className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Users className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MYCOUNSELL
            </span>
          </div>
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 hover:text-blue-600"
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
            className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MYCOUNSELL
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
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
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
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all"
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