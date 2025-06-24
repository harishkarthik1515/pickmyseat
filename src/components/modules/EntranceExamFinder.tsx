import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Users, 
  Clock, 
  ExternalLink,
  Star,
  Award,
  CheckCircle,
  AlertCircle,
  Download,
  Bell,
  Target,
  Globe,
  GraduationCap,
  FileText,
  Wifi,
  Monitor,
  Building
} from 'lucide-react';
import { useEntranceExams } from '../../hooks/useMockData';

function EntranceExamFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: 'all',
    type: 'all',
    stream: 'all',
    testFormat: 'all',
    status: 'all',
    eligibility: 'all'
  });

  const { exams, isLoading, searchExams } = useEntranceExams();

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.stream.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.conductingBody.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = filters.level === 'all' || exam.level.toLowerCase() === filters.level;
    const matchesType = filters.type === 'all' || exam.type.toLowerCase() === filters.type;
    const matchesStream = filters.stream === 'all' || exam.stream.toLowerCase() === filters.stream;
    const matchesFormat = filters.testFormat === 'all' || exam.testFormat.toLowerCase() === filters.testFormat;
    const matchesStatus = filters.status === 'all' || exam.status.toLowerCase() === filters.status;
    
    return matchesSearch && matchesLevel && matchesType && matchesStream && matchesFormat && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-700';
      case 'Closed': return 'bg-red-100 text-red-700';
      case 'Upcoming': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <CheckCircle className="h-4 w-4" />;
      case 'Closed': return <AlertCircle className="h-4 w-4" />;
      case 'Upcoming': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Online': return <Monitor className="h-4 w-4" />;
      case 'Offline': return <FileText className="h-4 w-4" />;
      case 'Both': return <Building className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="bg-white/20 p-3 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Search className="h-8 w-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Entrance Exam Finder</h2>
              <p className="text-purple-100">Global search with eligibility filters and exam details</p>
            </div>
          </div>
        </motion.div>
        
        <div className="flex items-center justify-center py-16">
          <motion.div
            className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="ml-3 text-gray-600">Loading entrance exams...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="bg-white/20 p-3 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Search className="h-8 w-8" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">Entrance Exam Finder</h2>
            <p className="text-purple-100">Global search with eligibility filters and exam details</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Target className="h-5 w-5 text-yellow-300" />
          <span className="text-purple-100">Find the perfect entrance exam for your career goals</span>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.level}
            onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="national">National</option>
            <option value="state">State</option>
            <option value="university">University</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">UG/PG</option>
            <option value="ug">UG</option>
            <option value="pg">PG</option>
          </select>

          <select
            value={filters.stream}
            onChange={(e) => setFilters(prev => ({ ...prev, stream: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Streams</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="management">Management</option>
            <option value="law">Law</option>
          </select>

          <select
            value={filters.testFormat}
            onChange={(e) => setFilters(prev => ({ ...prev, testFormat: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Test Format</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="upcoming">Upcoming</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </motion.div>

      {/* Results Summary */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">
              Found {filteredExams.length} entrance exams matching your criteria
            </span>
          </div>
          <motion.button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-4 w-4" />
            <span>Set Reminders</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Exam Cards */}
      <div className="grid gap-6">
        {filteredExams.map((exam, index) => (
          <motion.div
            key={exam.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{exam.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getStatusColor(exam.status)}`}>
                    {getStatusIcon(exam.status)}
                    <span>{exam.status}</span>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm">
                    {exam.level}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                    {exam.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">{exam.fullName}</p>
                <p className="text-sm text-gray-500 mb-3">Conducted by: {exam.conductingBody}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{exam.stream}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{exam.colleges} colleges</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>{exam.seats} seats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getFormatIcon(exam.testFormat)}
                    <span>{exam.testFormat}</span>
                  </div>
                </div>
              </div>

              <motion.button
                className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Exam Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Important Dates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Start:</span>
                    <span className="font-medium">{exam.applicationStart}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application End:</span>
                    <span className="font-medium">{exam.applicationEnd}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Date:</span>
                    <span className="font-medium">{exam.examDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Result Date:</span>
                    <span className="font-medium">{exam.resultDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Exam Pattern</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pattern:</span>
                    <span className="font-medium">{exam.pattern}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{exam.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Fee:</span>
                    <span className="font-medium">{exam.fees}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {exam.subjects.map((subject) => (
                      <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Eligibility</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Percentage: </span>
                    <span className="font-medium">{exam.eligibility.percentage}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Age Limit: </span>
                    <span className="font-medium">{exam.eligibility.ageLimit}</span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Subject Combo:</p>
                    <div className="flex flex-wrap gap-1">
                      {exam.eligibility.subjects.map((subject) => (
                        <span key={subject} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
              <motion.button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Apply Now</span>
              </motion.button>
              
              <motion.button
                className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="h-4 w-4" />
                <span>Syllabus</span>
              </motion.button>
              
              <motion.button
                className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-4 w-4" />
                <span>Download Info</span>
              </motion.button>
              
              <motion.button
                className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-4 w-4" />
                <span>Set Reminder</span>
              </motion.button>
              
              <motion.button
                className="text-gray-600 hover:text-purple-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save for Later
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredExams.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help with Exam Preparation?</h3>
            <p className="text-gray-600">Get study materials, mock tests, and preparation guidance</p>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Study Materials
            </motion.button>
            <motion.button
              className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mock Tests
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EntranceExamFinder;