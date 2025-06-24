import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  BookOpen, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target,
  Award,
  Clock,
  Users,
  BarChart3,
  MapPin,
  Filter,
  Search,
  Heart,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  DollarSign
} from 'lucide-react';
import { useCourseRecommendations } from '../../hooks/useMockData';
import { mockData } from '../../data/mockData';

interface FormData {
  marks: {
    physics: string;
    chemistry: string;
    mathematics: string;
    biology: string;
    english: string;
    overall: string;
  };
  interests: string[];
  locationPreference: string[];
}

function CourseRecommendation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    marks: {
      physics: '',
      chemistry: '',
      mathematics: '',
      biology: '',
      english: '',
      overall: ''
    },
    interests: [],
    locationPreference: []
  });
  const [filters, setFilters] = useState({
    stream: 'all',
    location: 'all',
    admissionMode: 'all'
  });

  const { isAnalyzing, recommendations, analyzeAndRecommend } = useCourseRecommendations();

  const subjectInterests = [
    'Artificial Intelligence', 'Machine Learning', 'Web Development', 'Mobile App Development',
    'Data Science', 'Cybersecurity', 'Robotics', 'Biotechnology', 'Genetics', 'Pharmacology',
    'Surgery', 'Pediatrics', 'Psychology', 'Literature', 'History', 'Political Science',
    'Economics', 'Philosophy', 'Art & Design', 'Music', 'Photography', 'Creative Writing',
    'Physics', 'Chemistry', 'Mathematics', 'Environmental Science', 'Astronomy', 'Research'
  ];

  const states = [
    'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Maharashtra',
    'Gujarat', 'Rajasthan', 'Delhi', 'Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal',
    'Bihar', 'Odisha', 'Madhya Pradesh', 'Chhattisgarh', 'Jharkhand', 'Assam'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('marks.')) {
      const markField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        marks: {
          ...prev.marks,
          [markField]: value
        }
      }));
    }
  };

  const handleMultiSelect = (value: string, field: 'interests' | 'locationPreference') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const result = await analyzeAndRecommend(formData);
    setShowResults(true);
  };

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesStream = filters.stream === 'all' || rec.stream.toLowerCase() === filters.stream;
    const matchesAdmission = filters.admissionMode === 'all' || rec.admissionMode.toLowerCase() === filters.admissionMode.toLowerCase();
    return matchesStream && matchesAdmission;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-700';
    if (confidence >= 80) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getAdmissionModeColor = (mode: string) => {
    switch (mode) {
      case 'Merit': return 'bg-blue-100 text-blue-700';
      case 'Entrance': return 'bg-purple-100 text-purple-700';
      case 'Both': return 'bg-teal-100 text-teal-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-teal-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <BarChart3 className="h-8 w-8 text-teal-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">12th Grade Marks</h3>
              <p className="text-gray-600">Enter your subject-wise marks for accurate recommendations</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Physics (%)
                </label>
                <input
                  type="number"
                  name="marks.physics"
                  value={formData.marks.physics}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter physics marks"
                  min="0"
                  max="100"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Chemistry (%)
                </label>
                <input
                  type="number"
                  name="marks.chemistry"
                  value={formData.marks.chemistry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter chemistry marks"
                  min="0"
                  max="100"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Mathematics (%)
                </label>
                <input
                  type="number"
                  name="marks.mathematics"
                  value={formData.marks.mathematics}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter mathematics marks"
                  min="0"
                  max="100"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Biology (%)
                </label>
                <input
                  type="number"
                  name="marks.biology"
                  value={formData.marks.biology}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter biology marks"
                  min="0"
                  max="100"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  English (%)
                </label>
                <input
                  type="number"
                  name="marks.english"
                  value={formData.marks.english}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter english marks"
                  min="0"
                  max="100"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Overall Percentage (%)
                </label>
                <input
                  type="number"
                  name="marks.overall"
                  value={formData.marks.overall}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter overall percentage"
                  min="0"
                  max="100"
                />
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Target className="h-8 w-8 text-purple-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Subject Interests</h3>
              <p className="text-gray-600">Select your areas of interest (multiple selection allowed)</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjectInterests.map((interest) => (
                <motion.div
                  key={interest}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                    formData.interests.includes(interest)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMultiSelect(interest, 'interests')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{interest}</span>
                    {formData.interests.includes(interest) && (
                      <CheckCircle className="h-4 w-4 text-teal-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-green-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="h-8 w-8 text-green-600" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Location Preference</h3>
              <p className="text-gray-600">Select your preferred states for college education</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {states.map((state) => (
                <motion.div
                  key={state}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.locationPreference.includes(state)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMultiSelect(state, 'locationPreference')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{state}</span>
                    {formData.locationPreference.includes(state) && (
                      <CheckCircle className="h-4 w-4 text-teal-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderAIProcessing = () => (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full"></div>
        <motion.div
          className="absolute inset-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Brain className="h-6 w-6 text-white" />
        </motion.div>
      </motion.div>
      
      <div className="text-center">
        <motion.h3 
          className="text-xl font-semibold text-gray-900 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AI is analyzing your profile...
        </motion.h3>
        <p className="text-gray-600">Processing marks, interests, and location preferences</p>
      </div>

      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-teal-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {['Analyzing Marks', 'Processing Interests', 'Matching Courses'].map((step, index) => (
          <motion.div
            key={step}
            className="text-center p-4 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5 }}
          >
            <motion.div
              className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: index * 0.3 }}
            >
              <CheckCircle className="h-4 w-4 text-teal-600" />
            </motion.div>
            <p className="text-sm font-medium text-gray-700">{step}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderResults = () => (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={filters.stream}
              onChange={(e) => setFilters(prev => ({ ...prev, stream: e.target.value }))}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Streams</option>
              <option value="engineering">Engineering</option>
              <option value="medical">Medical</option>
              <option value="arts">Arts</option>
              <option value="science">Science</option>
            </select>
            
            <select
              value={filters.admissionMode}
              onChange={(e) => setFilters(prev => ({ ...prev, admissionMode: e.target.value }))}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Admission Modes</option>
              <option value="merit">Merit Based</option>
              <option value="entrance">Entrance Based</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Found {filteredRecommendations.length} course recommendations
          </div>
        </div>
      </motion.div>

      {/* Course Cards */}
      <div className="grid gap-6">
        {filteredRecommendations.map((course, index) => {
          // Calculate AI confidence based on course match
          const aiConfidence = 95 - (index * 5); // Simple calculation for demo
          
          return (
            <motion.div
              key={course.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(aiConfidence)}`}>
                      {aiConfidence}% AI Match
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getAdmissionModeColor(course.admissionMode)}`}>
                      {course.admissionMode}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">Duration</p>
                        <p className="text-gray-600">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">Average Salary</p>
                        <p className="text-gray-600">{course.averageSalary}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Linked Colleges */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Top Colleges ({course.topColleges.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.topColleges.slice(0, 3).map((collegeId) => {
                    const college = mockData.colleges.find(c => c.id === collegeId);
                    return college ? (
                      <span key={collegeId} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                        {college.name}
                      </span>
                    ) : null;
                  })}
                  {course.topColleges.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                      +{course.topColleges.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Skills and Career Paths */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Career Paths</h4>
                  <div className="flex flex-wrap gap-1">
                    {course.careerPaths.map((path) => (
                      <span key={path} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                        {path}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <motion.button
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Apply Now</span>
                </motion.button>
                <motion.button
                  className="border border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50 transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>View Details</span>
                </motion.button>
                <motion.button
                  className="text-gray-600 hover:text-teal-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save for Later
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  if (isAnalyzing) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="bg-white/20 p-3 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="h-8 w-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">AI Course Recommendations</h2>
              <p className="text-teal-100">Based on your academic profile and interests</p>
            </div>
          </div>
        </motion.div>
        {renderAIProcessing()}
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="bg-white/20 p-3 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="h-8 w-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">AI Course Recommendations</h2>
              <p className="text-teal-100">Based on your academic profile and interests</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-teal-100">Analysis complete! Here are your personalized recommendations:</span>
          </div>
        </motion.div>
        {renderResults()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="bg-white/20 p-3 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Brain className="h-8 w-8" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">AI Course Recommendations</h2>
            <p className="text-teal-100">Based on your academic profile and interests</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Target className="h-5 w-5 text-yellow-300" />
          <span className="text-teal-100">Step {currentStep} of 3: Complete the form to get personalized recommendations</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <motion.div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= currentStep
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: step === currentStep ? 1.1 : 1 }}
            >
              {step}
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-teal-600 to-teal-700 h-2 rounded-full"
            initial={{ width: '33%' }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <motion.div className="bg-white rounded-2xl p-8 shadow-lg">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            type="button"
            onClick={handlePrevious}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={currentStep === 1}
            whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={handleNext}
            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{currentStep === 3 ? 'Get Recommendations' : 'Next'}</span>
            {currentStep === 3 ? <Sparkles className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default CourseRecommendation;