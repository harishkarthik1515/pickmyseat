import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Play, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle,
  Star,
  Target,
  MessageCircle,
  Video,
  FileText,
  TrendingUp,
  Brain,
  Lightbulb,
  ArrowRight,
  GripVertical,
  Plus,
  Minus,
  RotateCcw,
  Save,
  Download,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  Filter,
  Search,
  MapPin,
  DollarSign
} from 'lucide-react';

interface CounsellingSession {
  id: string;
  name: string;
  description: string;
  type: 'TNEA' | 'JoSAA' | 'NEET';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  features: string[];
  completedBy: number;
  rating: number;
  color: string;
  bgColor: string;
}

interface CollegeChoice {
  id: string;
  college: string;
  branch: string;
  location: string;
  fees: string;
  quota: string;
  cutoff: string;
  probability: 'High' | 'Medium' | 'Low';
  category: 'Safe' | 'Moderate' | 'Reach';
}

function MockCounselling() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [counsellingStep, setCounsellingStep] = useState('choice-filling');
  const [choices, setChoices] = useState<CollegeChoice[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: 'all',
    quota: 'all',
    category: 'all'
  });

  const counsellingSessions: CounsellingSession[] = [
    {
      id: 'tnea',
      name: 'TNEA Counselling',
      description: 'Tamil Nadu Engineering Admissions counselling process simulation',
      type: 'TNEA',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      topics: ['Choice Filling', 'Seat Allotment', 'Document Verification', 'Fee Payment'],
      features: ['Real-time simulation', 'Expert guidance', 'Practice rounds', 'Detailed feedback'],
      completedBy: 15420,
      rating: 4.7,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 'josaa',
      name: 'JoSAA Counselling',
      description: 'Joint Seat Allocation Authority counselling for IITs, NITs, and IIITs',
      type: 'JoSAA',
      duration: '60 minutes',
      difficulty: 'Advanced',
      topics: ['Choice Filling Strategy', 'Round-wise Allotment', 'Seat Acceptance', 'Withdrawal Process'],
      features: ['Multi-round simulation', 'Strategy tips', 'Previous year analysis', 'Expert mentorship'],
      completedBy: 28750,
      rating: 4.8,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    {
      id: 'neet',
      name: 'NEET Counselling',
      description: 'Medical college admission counselling process for MBBS, BDS, and other courses',
      type: 'NEET',
      duration: '50 minutes',
      difficulty: 'Intermediate',
      topics: ['Choice Filling', 'State Quota vs AIQ', 'Document Verification', 'Reporting Process'],
      features: ['State-wise guidance', 'Quota understanding', 'College selection tips', 'Timeline management'],
      completedBy: 22100,
      rating: 4.6,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    }
  ];

  const availableColleges: CollegeChoice[] = [
    {
      id: '1',
      college: 'IIT Delhi',
      branch: 'Computer Science Engineering',
      location: 'New Delhi',
      fees: '₹2.5L/year',
      quota: 'General',
      cutoff: 'Rank 150-200',
      probability: 'Medium',
      category: 'Moderate'
    },
    {
      id: '2',
      college: 'IIT Bombay',
      branch: 'Electrical Engineering',
      location: 'Mumbai',
      fees: '₹2.5L/year',
      quota: 'General',
      cutoff: 'Rank 100-150',
      probability: 'Low',
      category: 'Reach'
    },
    {
      id: '3',
      college: 'NIT Trichy',
      branch: 'Computer Science Engineering',
      location: 'Tamil Nadu',
      fees: '₹1.2L/year',
      quota: 'Home State',
      cutoff: 'Rank 500-600',
      probability: 'High',
      category: 'Safe'
    },
    {
      id: '4',
      college: 'BITS Pilani',
      branch: 'Information Technology',
      location: 'Rajasthan',
      fees: '₹4.2L/year',
      quota: 'General',
      cutoff: 'BITSAT 380+',
      probability: 'High',
      category: 'Safe'
    },
    {
      id: '5',
      college: 'VIT Vellore',
      branch: 'Computer Science Engineering',
      location: 'Tamil Nadu',
      fees: '₹1.8L/year',
      quota: 'General',
      cutoff: 'Rank 1-5000',
      probability: 'High',
      category: 'Safe'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'High': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Safe': return 'bg-green-100 text-green-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Reach': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const addToChoices = (college: CollegeChoice) => {
    if (!choices.find(c => c.id === college.id)) {
      setChoices(prev => [...prev, { ...college }]);
    }
  };

  const removeFromChoices = (id: string) => {
    setChoices(prev => prev.filter(c => c.id !== id));
  };

  const moveChoice = (fromIndex: number, toIndex: number) => {
    const newChoices = [...choices];
    const [movedItem] = newChoices.splice(fromIndex, 1);
    newChoices.splice(toIndex, 0, movedItem);
    setChoices(newChoices);
  };

  const filteredColleges = availableColleges.filter(college => {
    const matchesSearch = college.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = filters.location === 'all' || college.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesQuota = filters.quota === 'all' || college.quota.toLowerCase() === filters.quota.toLowerCase();
    const matchesCategory = filters.category === 'all' || college.category.toLowerCase() === filters.category.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesQuota && matchesCategory;
  });

  const renderChoiceFilling = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Available Colleges & Branches</h3>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges or branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Locations</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="tamil nadu">Tamil Nadu</option>
            <option value="rajasthan">Rajasthan</option>
          </select>

          <select
            value={filters.quota}
            onChange={(e) => setFilters(prev => ({ ...prev, quota: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Quotas</option>
            <option value="general">General</option>
            <option value="home state">Home State</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="safe">Safe</option>
            <option value="moderate">Moderate</option>
            <option value="reach">Reach</option>
          </select>
        </div>

        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {filteredColleges.map((college) => (
            <motion.div
              key={college.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{college.college}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getProbabilityColor(college.probability)}`}>
                    {college.probability}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(college.category)}`}>
                    {college.category}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{college.branch}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{college.fees}</span>
                  </div>
                  <span>Quota: {college.quota}</span>
                  <span>Cutoff: {college.cutoff}</span>
                </div>
              </div>
              <motion.button
                onClick={() => addToChoices(college)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={choices.find(c => c.id === college.id) !== undefined}
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Choice List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Your Choice List ({choices.length})</h3>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setChoices([])}
              className="text-gray-600 hover:text-red-600 transition-colors flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All</span>
            </motion.button>
            <motion.button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="h-4 w-4" />
              <span>Save Choices</span>
            </motion.button>
          </div>
        </div>

        {choices.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No choices added yet. Add colleges from the list above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <motion.div
                key={choice.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-2">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-semibold text-gray-900">{choice.college}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(choice.category)}`}>
                      {choice.category}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{choice.branch}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                    <span>{choice.location}</span>
                    <span>{choice.fees}</span>
                    <span>Quota: {choice.quota}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => moveChoice(index, Math.max(0, index - 1))}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={index === 0}
                  >
                    <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
                  </motion.button>
                  <motion.button
                    onClick={() => moveChoice(index, Math.min(choices.length - 1, index + 1))}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={index === choices.length - 1}
                  >
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </motion.button>
                  <motion.button
                    onClick={() => removeFromChoices(choice.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* AI Prediction */}
      {choices.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Brain className="h-5 w-5 text-purple-600 mr-2" />
            AI Allotment Prediction
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">Top 3 Chances</h4>
              <div className="space-y-2">
                {choices.slice(0, 3).map((choice, index) => (
                  <div key={choice.id} className="text-sm">
                    <span className="font-medium">{index + 1}. {choice.college}</span>
                    <p className="text-green-600">{choice.branch}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Safe Choices</h4>
              <div className="space-y-2">
                {choices.filter(c => c.category === 'Safe').slice(0, 3).map((choice, index) => (
                  <div key={choice.id} className="text-sm">
                    <span className="font-medium">{choice.college}</span>
                    <p className="text-yellow-600">{choice.branch}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-2">Reach Choices</h4>
              <div className="space-y-2">
                {choices.filter(c => c.category === 'Reach').slice(0, 3).map((choice, index) => (
                  <div key={choice.id} className="text-sm">
                    <span className="font-medium">{choice.college}</span>
                    <p className="text-red-600">{choice.branch}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <AlertTriangle className="h-4 w-4 inline mr-1" />
              Predictions based on previous year data and current trends
            </div>
            <motion.button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" />
              <span>Download Report</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );

  const renderSessionDetails = (session: CounsellingSession) => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Session Header */}
      <div className={`bg-gradient-to-r ${session.color} rounded-3xl p-8 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{session.name}</h2>
            <p className="text-white/90 text-lg mb-4">{session.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-5 w-5" />
                <span>{session.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-5 w-5" />
                <span>{session.completedBy.toLocaleString()} completed</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-current" />
                <span>{session.rating}/5</span>
              </div>
            </div>
          </div>
          <motion.button
            onClick={() => setSelectedSession(null)}
            className="bg-white/20 p-3 rounded-2xl hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="h-6 w-6 rotate-180" />
          </motion.button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-2 shadow-lg">
        <div className="flex space-x-2">
          {['overview', 'practice', 'choice-filling'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === 'choice-filling' ? 'Choice Filling' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 text-orange-500 mr-2" />
              What You'll Learn
            </h3>
            <ul className="space-y-3">
              {session.topics.map((topic, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Key Features
            </h3>
            <ul className="space-y-3">
              {session.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Practice Modes</h3>
            <div className="space-y-3">
              {[
                { name: 'Guided Practice', description: 'Step-by-step guidance with hints' },
                { name: 'Timed Practice', description: 'Practice under real exam conditions' },
                { name: 'Free Practice', description: 'Explore at your own pace' }
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-medium text-gray-900">{mode.name}</h4>
                  <p className="text-sm text-gray-600">{mode.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Ready to start your counselling practice?</p>
                <motion.button
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-5 w-5" />
                  <span>Start Practice Session</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'choice-filling' && renderChoiceFilling()}
    </motion.div>
  );

  if (selectedSession) {
    const session = counsellingSessions.find(s => s.id === selectedSession);
    if (session) {
      return renderSessionDetails(session);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="bg-white/20 p-3 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="h-8 w-8" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">Mock Counselling Flow</h2>
            <p className="text-orange-100">Practice TNEA/JoSAA/NEET counselling process</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Brain className="h-5 w-5 text-yellow-300" />
          <span className="text-orange-100">Master the counselling process with realistic simulations</span>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sessions', value: '3', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
          { label: 'Students Practiced', value: '66K+', icon: Users, color: 'from-green-500 to-green-600' },
          { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
          { label: 'Avg. Rating', value: '4.7/5', icon: Star, color: 'from-yellow-500 to-yellow-600' },
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

      {/* Counselling Sessions */}
      <div className="grid md:grid-cols-1 gap-6">
        {counsellingSessions.map((session, index) => (
          <motion.div
            key={session.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedSession(session.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <motion.div
                    className={`bg-gradient-to-r ${session.color} p-3 rounded-xl`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{session.name}</h3>
                    <p className="text-gray-600">{session.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(session.difficulty)}`}>
                    {session.difficulty}
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{session.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{session.completedBy.toLocaleString()} completed</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{session.rating}/5</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Topics Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {session.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                          {topic}
                        </span>
                      ))}
                      {session.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                          +{session.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                    <ul className="space-y-1">
                      {session.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <motion.div
                className="ml-4"
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </motion.div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <motion.button
                  className={`bg-gradient-to-r ${session.color} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center space-x-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSession(session.id);
                  }}
                >
                  <Play className="h-4 w-4" />
                  <span>Start Session</span>
                </motion.button>
                
                <motion.button
                  className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FileText className="h-4 w-4" />
                  <span>Preview</span>
                </motion.button>
              </div>

              <div className="text-sm text-gray-500">
                Free • No registration required
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Resources */}
      <motion.div
        className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Lightbulb className="h-5 w-5 text-orange-500 mr-2" />
              Need Additional Help?
            </h3>
            <p className="text-gray-600">Get personalized counselling guidance and expert tips</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Expert Guidance</span>
            </motion.button>
            <motion.button
              className="border border-orange-600 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video className="h-4 w-4" />
              <span>Video Tutorials</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MockCounselling;