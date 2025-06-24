import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Calculator,
  Star,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Download,
  Share2,
  Bell,
  BarChart3,
  Zap,
  Trophy,
  Brain,
  Heart,
  ArrowRight,
  Plus,
  Minus,
  Search,
  Filter,
  Clock,
  DollarSign,
  GraduationCap,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { useDreamFitAnalyzer } from '../../hooks/useMockData';

interface DreamCollege {
  id: string;
  name: string;
  course: string;
  location: string;
  type: 'Government' | 'Private';
  ranking: number;
  fees: string;
  lastYearCutoff: {
    general: number;
    obc: number;
    sc: number;
    st: number;
    ews: number;
  };
  subjectRequirements: {
    [key: string]: number;
  };
  admissionMode: 'Board' | 'Entrance' | 'Both';
  entranceExam?: string;
}

interface StudentProfile {
  currentMarks: {
    physics: number;
    chemistry: number;
    mathematics: number;
    biology: number;
    english: number;
    overall: number;
  };
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  targetCollege?: DreamCollege;
}

function DreamFitAnalyzer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    location: 'all',
    admissionMode: 'all'
  });
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    currentMarks: {
      physics: 0,
      chemistry: 0,
      mathematics: 0,
      biology: 0,
      english: 0,
      overall: 0
    },
    category: 'General'
  });
  const [showAnalysis, setShowAnalysis] = useState(false);

  const { dreamColleges, isAnalyzing, analyzeGoal } = useDreamFitAnalyzer();

  const filteredColleges = dreamColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filters.type === 'all' || college.type.toLowerCase() === filters.type;
    const matchesLocation = filters.location === 'all' || college.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesAdmission = filters.admissionMode === 'all' || college.admissionMode.toLowerCase() === filters.admissionMode.toLowerCase();
    
    return matchesSearch && matchesType && matchesLocation && matchesAdmission;
  });

  const handleCollegeSelect = (college: DreamCollege) => {
    setStudentProfile(prev => ({ ...prev, targetCollege: college }));
    setCurrentStep(2);
  };

  const handleMarksUpdate = (subject: string, value: number) => {
    setStudentProfile(prev => ({
      ...prev,
      currentMarks: {
        ...prev.currentMarks,
        [subject]: value
      }
    }));
  };

  const calculateOverallPercentage = () => {
    const { physics, chemistry, mathematics, biology, english } = studentProfile.currentMarks;
    const total = physics + chemistry + mathematics + biology + english;
    return Math.round(total / 5);
  };

  const getRequiredMarks = () => {
    if (!studentProfile.targetCollege) return null;
    
    const targetCutoff = studentProfile.targetCollege.lastYearCutoff[studentProfile.category.toLowerCase() as keyof typeof studentProfile.targetCollege.lastYearCutoff];
    const currentOverall = calculateOverallPercentage();
    const gap = targetCutoff - currentOverall;
    
    return {
      targetCutoff,
      currentOverall,
      gap,
      subjectTargets: studentProfile.targetCollege.subjectRequirements
    };
  };

  const getMotivationalMessage = () => {
    const analysis = getRequiredMarks();
    if (!analysis) return '';
    
    if (analysis.gap <= 0) {
      return "🎉 Congratulations! You're already above last year's cutoff!";
    } else if (analysis.gap <= 5) {
      return `🔥 You're so close! Just ${analysis.gap}% more to reach your dream college!`;
    } else if (analysis.gap <= 10) {
      return `💪 You can do this! Focus on improving by ${analysis.gap}% to achieve your goal!`;
    } else {
      return `🚀 Dream big! With dedication, you can bridge the ${analysis.gap}% gap to your dream college!`;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'General': return 'bg-blue-100 text-blue-700';
      case 'OBC': return 'bg-green-100 text-green-700';
      case 'SC': return 'bg-purple-100 text-purple-700';
      case 'ST': return 'bg-orange-100 text-orange-700';
      case 'EWS': return 'bg-teal-100 text-teal-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderCollegeSelector = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Find Your Dream College</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="all">All Locations</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="chennai">Chennai</option>
            <option value="hyderabad">Hyderabad</option>
          </select>

          <select
            value={filters.admissionMode}
            onChange={(e) => setFilters(prev => ({ ...prev, admissionMode: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="all">All Admission Modes</option>
            <option value="board">Board Based</option>
            <option value="entrance">Entrance Based</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      {/* College Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredColleges.map((college, index) => (
          <motion.div
            key={college.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCollegeSelect(college)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{college.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    college.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {college.type}
                  </span>
                </div>
                <p className="text-pink-600 font-medium mb-2">{college.course}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>Rank {college.ranking}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{college.fees}</span>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </motion.div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Last Year Cutoffs</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">General:</span>
                    <span className="font-medium">{college.lastYearCutoff.general}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">OBC:</span>
                    <span className="font-medium">{college.lastYearCutoff.obc}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SC:</span>
                    <span className="font-medium">{college.lastYearCutoff.sc}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ST:</span>
                    <span className="font-medium">{college.lastYearCutoff.st}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Admission Mode:</span>
                  <span className="text-sm font-medium">{college.admissionMode}</span>
                </div>
                {college.entranceExam && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600">Entrance Exam:</span>
                    <span className="text-sm font-medium">{college.entranceExam}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCurrentMarksInput = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Enter Your Current Marks</h3>
            <p className="text-gray-600">Tell us your current performance to calculate the gap</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Target College</p>
            <p className="font-semibold text-pink-600">{studentProfile.targetCollege?.name}</p>
            <p className="text-sm text-gray-600">{studentProfile.targetCollege?.course}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
            <select
              value={studentProfile.category}
              onChange={(e) => setStudentProfile(prev => ({ ...prev, category: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className={`px-4 py-2 rounded-lg ${getCategoryColor(studentProfile.category)}`}>
              <span className="font-medium">
                Target: {studentProfile.targetCollege?.lastYearCutoff[studentProfile.category.toLowerCase() as keyof typeof studentProfile.targetCollege.lastYearCutoff]}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {['physics', 'chemistry', 'mathematics', 'biology', 'english'].map((subject) => (
            <motion.div
              key={subject}
              className="space-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <label className="block text-sm font-semibold text-gray-700 capitalize">
                {subject} (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={studentProfile.currentMarks[subject as keyof typeof studentProfile.currentMarks]}
                onChange={(e) => handleMarksUpdate(subject, parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter marks"
              />
              {studentProfile.targetCollege?.subjectRequirements[subject] && (
                <p className="text-xs text-gray-500">
                  Target: {studentProfile.targetCollege.subjectRequirements[subject]}%
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Overall Percentage</p>
              <p className="text-2xl font-bold text-pink-600">{calculateOverallPercentage()}%</p>
            </div>
            <motion.button
              onClick={() => setShowAnalysis(true)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator className="h-5 w-5" />
              <span>Analyze My Goal</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => {
    const analysis = getRequiredMarks();
    if (!analysis) return null;

    const progressPercentage = Math.max(0, Math.min(100, (analysis.currentOverall / analysis.targetCutoff) * 100));

    return (
      <div className="space-y-6">
        {/* Motivational Header */}
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="bg-white/20 p-3 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Target className="h-8 w-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">DreamFit Analysis</h2>
              <p className="text-pink-100">{studentProfile.targetCollege?.name} - {studentProfile.targetCollege?.course}</p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 mt-6">
            <p className="text-xl font-semibold mb-2">{getMotivationalMessage()}</p>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to Goal</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    className="bg-white h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Gap</p>
                <p className="text-2xl font-bold">{analysis.gap > 0 ? `${analysis.gap}%` : '✓'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current vs Target */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 text-pink-500 mr-2" />
              Performance Overview
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600">Current Overall</p>
                  <p className="text-2xl font-bold text-gray-900">{analysis.currentOverall}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Target ({studentProfile.category})</p>
                  <p className="text-2xl font-bold text-pink-600">{analysis.targetCutoff}%</p>
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(analysis.subjectTargets).map(([subject, target]) => {
                  const current = studentProfile.currentMarks[subject as keyof typeof studentProfile.currentMarks];
                  const gap = target - current;
                  return (
                    <div key={subject} className="flex items-center justify-between">
                      <span className="capitalize font-medium">{subject}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{current}%</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-semibold text-pink-600">{target}%</span>
                        {gap > 0 && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            +{gap}
                          </span>
                        )}
                        {gap <= 0 && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
              Action Plan
            </h3>
            
            <div className="space-y-4">
              {analysis.gap > 0 ? (
                <>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-2">Priority Subjects</h4>
                    <ul className="space-y-2">
                      {Object.entries(analysis.subjectTargets)
                        .filter(([subject, target]) => {
                          const current = studentProfile.currentMarks[subject as keyof typeof studentProfile.currentMarks];
                          return target - current > 0;
                        })
                        .sort(([, targetA], [, targetB]) => {
                          const currentA = studentProfile.currentMarks[targetA as any] || 0;
                          const currentB = studentProfile.currentMarks[targetB as any] || 0;
                          return (targetB - currentB) - (targetA - currentA);
                        })
                        .map(([subject, target]) => {
                          const current = studentProfile.currentMarks[subject as keyof typeof studentProfile.currentMarks];
                          const gap = target - current;
                          return (
                            <li key={subject} className="flex items-center justify-between text-sm">
                              <span className="capitalize">{subject}</span>
                              <span className="font-semibold text-blue-700">Improve by {gap}%</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl">
                    <h4 className="font-semibold text-green-900 mb-2">Study Strategy</h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li>• Focus on weak subjects first</li>
                      <li>• Take regular mock tests</li>
                      <li>• Maintain strong subjects</li>
                      <li>• Set weekly targets</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <Trophy className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-green-900 mb-2">You're on Track!</h4>
                  <p className="text-sm text-green-800">
                    Your current performance exceeds last year's cutoff. Keep up the excellent work!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Brain className="h-5 w-5 text-purple-500 mr-2" />
            Additional Insights
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-900">Time Left</h4>
              <p className="text-sm text-purple-700">Board exams in ~120 days</p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h4 className="font-semibold text-orange-900">Daily Target</h4>
              <p className="text-sm text-orange-700">
                {analysis.gap > 0 ? `+${(analysis.gap / 4).toFixed(1)}% per month` : 'Maintain current level'}
              </p>
            </div>
            
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <Award className="h-8 w-8 text-teal-500 mx-auto mb-2" />
              <h4 className="font-semibold text-teal-900">Success Rate</h4>
              <p className="text-sm text-teal-700">
                {analysis.gap <= 0 ? '95%' : analysis.gap <= 5 ? '80%' : analysis.gap <= 10 ? '65%' : '45%'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <motion.button
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-5 w-5" />
            <span>Download Report</span>
          </motion.button>
          
          <motion.button
            className="border border-pink-600 text-pink-600 px-6 py-3 rounded-lg hover:bg-pink-50 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="h-5 w-5" />
            <span>Share Goals</span>
          </motion.button>
          
          <motion.button
            className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            <span>Set Reminders</span>
          </motion.button>
          
          <motion.button
            onClick={() => {
              setCurrentStep(1);
              setShowAnalysis(false);
              setStudentProfile(prev => ({ ...prev, targetCollege: undefined }));
            }}
            className="text-gray-600 hover:text-pink-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Another College
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="bg-white/20 p-3 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Target className="h-8 w-8" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">DreamFit Analyzer</h2>
            <p className="text-pink-100">Discover what it takes to reach your dream college</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Heart className="h-5 w-5 text-yellow-300" />
          <span className="text-pink-100">Set your goals, track your progress, achieve your dreams</span>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          {[
            { step: 1, title: 'Choose Dream College', icon: Search },
            { step: 2, title: 'Enter Current Marks', icon: Calculator },
            { step: 3, title: 'View Analysis', icon: BarChart3 }
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= item.step
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                whileHover={{ scale: 1.1 }}
                animate={{ scale: currentStep === item.step ? 1.1 : 1 }}
              >
                <item.icon className="h-5 w-5" />
              </motion.div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">Step {item.step}</p>
              </div>
              {index < 2 && (
                <div className={`w-16 h-1 mx-4 ${
                  currentStep > item.step ? 'bg-pink-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!showAnalysis && currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {renderCollegeSelector()}
          </motion.div>
        )}

        {!showAnalysis && currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {renderCurrentMarksInput()}
          </motion.div>
        )}

        {showAnalysis && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {renderAnalysis()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      {!showAnalysis && (
        <motion.div
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Dream Colleges', value: '500+', icon: GraduationCap, color: 'text-pink-600' },
              { label: 'Success Stories', value: '10K+', icon: Trophy, color: 'text-purple-600' },
              { label: 'Avg. Improvement', value: '15%', icon: TrendingUp, color: 'text-green-600' },
              { label: 'Goal Achievement', value: '85%', icon: Target, color: 'text-blue-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default DreamFitAnalyzer;