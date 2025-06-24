import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Brain, 
  MapPin, 
  Star, 
  TrendingUp, 
  DollarSign,
  Users,
  Calendar,
  Award,
  ExternalLink,
  Heart,
  Filter,
  Search,
  BarChart3,
  CheckCircle,
  Clock,
  Target,
  X,
  BookOpen,
  Home,
  Bed,
  Trophy,
  MessageCircle,
  Download,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCollegeSuggestions } from '../../hooks/useMockData';

interface InputData {
  inputType: 'marks' | 'rank';
  marks?: {
    physics: string;
    chemistry: string;
    mathematics: string;
    biology: string;
    overall: string;
  };
  rank?: {
    examType: 'JEE' | 'NEET' | 'TNEA';
    rankValue: string;
  };
}

function CollegeSuggestions() {
  const [showInput, setShowInput] = useState(true);
  const [inputData, setInputData] = useState<InputData>({ inputType: 'marks' });
  const [selectedCollege, setSelectedCollege] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    cutoffMatch: 'all',
    location: 'all',
    fees: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('cutoffMatch');

  const { isAnalyzing, suggestions, analyzeAndSuggest } = useCollegeSuggestions();

  const handleInputSubmit = async () => {
    setShowInput(false);
    await analyzeAndSuggest(inputData);
  };

  const filteredColleges = suggestions.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCutoff = filters.cutoffMatch === 'all' || college.cutoffMatch.toLowerCase() === filters.cutoffMatch;
    const matchesLocation = filters.location === 'all' || college.location.toLowerCase().includes(filters.location.toLowerCase());
    
    return matchesSearch && matchesCutoff && matchesLocation;
  });

  const getCutoffColor = (match: string) => {
    switch (match) {
      case 'Safe': return 'bg-green-100 text-green-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Reach': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderInputForm = () => (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Enter Your Academic Details</h3>
      
      {/* Input Type Selection */}
      <div className="flex space-x-4 mb-6">
        <motion.button
          onClick={() => setInputData({ inputType: 'marks' })}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            inputData.inputType === 'marks'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          12th Marks
        </motion.button>
        <motion.button
          onClick={() => setInputData({ inputType: 'rank' })}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            inputData.inputType === 'rank'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Entrance Rank
        </motion.button>
      </div>

      {/* Input Fields */}
      {inputData.inputType === 'marks' ? (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            placeholder="Physics (%)"
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setInputData(prev => ({
              ...prev,
              marks: { ...prev.marks, physics: e.target.value }
            }))}
          />
          <input
            type="number"
            placeholder="Chemistry (%)"
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setInputData(prev => ({
              ...prev,
              marks: { ...prev.marks, chemistry: e.target.value }
            }))}
          />
          <input
            type="number"
            placeholder="Mathematics (%)"
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setInputData(prev => ({
              ...prev,
              marks: { ...prev.marks, mathematics: e.target.value }
            }))}
          />
          <input
            type="number"
            placeholder="Overall Percentage (%)"
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setInputData(prev => ({
              ...prev,
              marks: { ...prev.marks, overall: e.target.value }
            }))}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <select
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setInputData(prev => ({
              ...prev,
              rank: { ...prev.rank, examType: e.target.value as 'JEE' | 'NEET' | 'TNEA' }
            }))}
          >
            <option value="">Select Exam</option>
            <option value="JEE">JEE Main/Advanced</option>
            <option value="NEET">NEET</option>
            <option value="TNEA">TNEA</option>
          </select>
          <input
            type="number"
            placeholder="Your Rank"
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setInputData(prev => ({
              ...prev,
              rank: { ...prev.rank, rankValue: e.target.value }
            }))}
          />
        </div>
      )}

      <motion.button
        onClick={handleInputSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Find My Colleges
      </motion.button>
    </motion.div>
  );

  const renderCollegeModal = () => {
    if (!selectedCollege) return null;

    return (
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCollege.name}</h2>
                    <p className="text-blue-100">{selectedCollege.branch}</p>
                  </div>
                  <motion.button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Placement Statistics */}
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Trophy className="h-5 w-5 text-green-600 mr-2" />
                    Placement Statistics
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Average Package</p>
                      <p className="text-xl font-bold text-green-600">{selectedCollege.placementStats?.averagePackage || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Highest Package</p>
                      <p className="text-xl font-bold text-green-600">{selectedCollege.placementStats?.highestPackage || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Placement Rate</p>
                      <p className="text-xl font-bold text-green-600">{selectedCollege.placementStats?.placementRate || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Top Recruiters</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedCollege.placementStats?.topRecruiters?.map((recruiter: string) => (
                          <span key={recruiter} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {recruiter}
                          </span>
                        )) || <span className="text-gray-500">N/A</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <motion.button
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Apply Now</span>
                  </motion.button>
                  
                  <motion.button
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Brochure</span>
                  </motion.button>
                  
                  <motion.button
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save for Later
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
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
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
        <motion.div
          className="absolute inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <GraduationCap className="h-6 w-6 text-white" />
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
        <p className="text-gray-600">Calculating admission probability and matching colleges</p>
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
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {['Analyzing Profile', 'Calculating Probability', 'Ranking Colleges'].map((step, index) => (
          <motion.div
            key={step}
            className="text-center p-4 bg-white rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5 }}
          >
            <motion.div
              className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: index * 0.3 }}
            >
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </motion.div>
            <p className="text-sm font-medium text-gray-700">{step}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  if (showInput) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="bg-white/20 p-3 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-8 w-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">AI-Powered College & Branch Match</h2>
              <p className="text-blue-100">Get personalized college recommendations with admission probability</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Brain className="h-5 w-5 text-yellow-300" />
            <span className="text-blue-100">Enter your marks or rank to find the best colleges for you</span>
          </div>
        </motion.div>
        {renderInputForm()}
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="bg-white/20 p-3 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-8 w-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">AI-Powered College & Branch Match</h2>
              <p className="text-blue-100">Get personalized college recommendations with admission probability</p>
            </div>
          </div>
        </motion.div>
        {renderAIProcessing()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="bg-white/20 p-3 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap className="h-8 w-8" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">AI-Powered College & Branch Match</h2>
            <p className="text-blue-100">Smart sorted list based on your profile</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Brain className="h-5 w-5 text-yellow-300" />
          <span className="text-blue-100">Found {suggestions.length} colleges matching your profile</span>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filters.cutoffMatch}
              onChange={(e) => setFilters(prev => ({ ...prev, cutoffMatch: e.target.value }))}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Matches</option>
              <option value="safe">Safe</option>
              <option value="moderate">Moderate</option>
              <option value="reach">Reach</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="cutoffMatch">Sort by Match</option>
              <option value="rating">Sort by Rating</option>
              <option value="fees">Sort by Fees</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setShowInput(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              New Search
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* College Cards */}
      <div className="grid gap-6">
        {filteredColleges.map((college, index) => (
          <motion.div
            key={college.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{college.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getCutoffColor(college.cutoffMatch)}`}>
                    {college.cutoffMatch} Match
                  </div>
                  {college.admissionProbability && (
                    <div className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                      {college.admissionProbability}% Probability
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>{college.ranking}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{college.rating}/5</span>
                  </div>
                </div>
                
                <p className="text-lg font-medium text-blue-600 mb-4">{college.branch}</p>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <motion.button
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="h-5 w-5" />
                </motion.button>
                <motion.button
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* College Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">Last Year Cutoff</p>
                    <p className="text-gray-600">{college.lastYearCutoff}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">Annual Fees</p>
                    <p className="text-gray-600">{college.fees}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Placements</p>
                    <p className="text-gray-600">{college.placements}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-900">Facilities</p>
                    <p className="text-gray-600">{college.facilities?.length || 0} key facilities</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900 mb-2">Key Facilities</p>
                  <div className="flex flex-wrap gap-1">
                    {college.facilities?.slice(0, 2).map((facility: string) => (
                      <span key={facility} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {facility}
                      </span>
                    ))}
                    {college.facilities?.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{college.facilities.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => {
                  setSelectedCollege(college);
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </motion.button>
              <motion.button
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Compare</span>
              </motion.button>
              <motion.button
                className="text-gray-600 hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save for Later
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* College Detail Modal */}
      {renderCollegeModal()}

      {/* No Results */}
      {filteredColleges.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
}

export default CollegeSuggestions;