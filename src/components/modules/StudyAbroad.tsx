import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Globe, 
  DollarSign, 
  BookOpen, 
  Award, 
  Clock,
  MapPin,
  Users,
  Star,
  CheckCircle,
  ExternalLink,
  Download,
  Calendar,
  Target,
  TrendingUp,
  FileText,
  Heart,
  Filter,
  Search
} from 'lucide-react';
import { useStudyAbroad } from '../../hooks/useMockData';

function StudyAbroad() {
  const [activeTab, setActiveTab] = useState('countries');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const { countries, scholarships, isLoading } = useStudyAbroad();

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || scholarship.type.toLowerCase() === filterType;
    
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Merit': return 'bg-blue-100 text-blue-700';
      case 'Need-based': return 'bg-green-100 text-green-700';
      case 'Country-specific': return 'bg-purple-100 text-purple-700';
      case 'University': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderCountryDetails = (country: any) => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Country Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{country.flag}</div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{country.name}</h2>
              <p className="text-green-100 text-lg">{country.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span>{country.rating}/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-5 w-5" />
                  <span>{country.universities} universities</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-5 w-5" />
                  <span>{country.scholarships} scholarships</span>
                </div>
              </div>
            </div>
          </div>
          <motion.button
            onClick={() => setSelectedCountry(null)}
            className="bg-white/20 p-3 rounded-2xl hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="h-6 w-6 rotate-180" />
          </motion.button>
        </div>
      </div>

      {/* Country Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
            Popular Courses
          </h3>
          <div className="flex flex-wrap gap-2">
            {country.popularCourses.map((course: string) => (
              <span key={course} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {course}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <DollarSign className="h-5 w-5 text-green-500 mr-2" />
            Cost & Duration
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Cost:</span>
              <span className="font-medium">{country.avgCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{country.duration}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-purple-500 mr-2" />
            Intake Seasons
          </h3>
          <div className="space-y-2">
            {country.intakeSeasons.map((season: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-700">{season}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="h-5 w-5 text-orange-500 mr-2" />
            Requirements
          </h3>
          <div className="space-y-2">
            {country.requirements.map((req: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Advantages
          </h3>
          <ul className="space-y-2">
            {country.pros.map((pro: string, index: number) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 text-orange-500 mr-2" />
            Considerations
          </h3>
          <ul className="space-y-2">
            {country.cons.map((con: string, index: number) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <motion.button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-5 w-5" />
          <span>Download Guide</span>
        </motion.button>
        <motion.button
          className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Users className="h-5 w-5" />
          <span>Find Universities</span>
        </motion.button>
        <motion.button
          className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Award className="h-5 w-5" />
          <span>View Scholarships</span>
        </motion.button>
      </div>
    </motion.div>
  );

  if (selectedCountry) {
    const country = countries.find(c => c.id === selectedCountry);
    if (country) {
      return renderCountryDetails(country);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <motion.div
          className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <motion.div
              className="bg-white/20 p-3 rounded-2xl"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Plane className="h-8 w-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Study Abroad Guide</h2>
              <p className="text-green-100">Country selector, scholarships, and step-by-step guidance</p>
            </div>
          </div>
        </motion.div>
        
        <div className="flex items-center justify-center py-16">
          <motion.div
            className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="ml-3 text-gray-600">Loading study abroad data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="bg-white/20 p-3 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Plane className="h-8 w-8" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">Study Abroad Guide</h2>
            <p className="text-green-100">Country selector, scholarships, and step-by-step guidance</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Globe className="h-5 w-5 text-yellow-300" />
          <span className="text-green-100">Explore global education opportunities and funding options</span>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-2 shadow-lg">
        <div className="flex space-x-2">
          {[
            { id: 'countries', label: 'Countries', icon: Globe },
            { id: 'scholarships', label: 'Scholarships', icon: Award },
            { id: 'process', label: 'Application Process', icon: FileText }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'countries' && (
        <div className="grid md:grid-cols-2 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={country.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCountry(country.id)}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{country.flag}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{country.name}</h3>
                  <p className="text-gray-600 mb-3">{country.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{country.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{country.universities} universities</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{country.scholarships} scholarships</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Popular Courses</p>
                  <div className="flex flex-wrap gap-1">
                    {country.popularCourses.slice(0, 3).map((course) => (
                      <span key={course} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="text-sm">
                    <span className="text-gray-600">Cost: </span>
                    <span className="font-medium">{country.avgCost}</span>
                  </div>
                  <motion.button
                    className="text-green-600 hover:text-green-700 flex items-center space-x-1"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium">Learn More</span>
                    <ExternalLink className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'scholarships' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="merit">Merit-based</option>
                <option value="need-based">Need-based</option>
                <option value="country-specific">Country-specific</option>
                <option value="university">University</option>
              </select>
            </div>
          </div>

          {/* Scholarship Cards */}
          <div className="grid gap-6">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{scholarship.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(scholarship.type)}`}>
                        {scholarship.type}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{scholarship.country}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{scholarship.amount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {scholarship.deadline}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{scholarship.coverage}</p>
                  </div>

                  <motion.button
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Eligibility Requirements</h4>
                  <ul className="space-y-1">
                    {scholarship.eligibility.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-4">
                  <motion.button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Apply Now</span>
                  </motion.button>
                  
                  <motion.button
                    className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Details</span>
                  </motion.button>
                  
                  <motion.button
                    className="text-gray-600 hover:text-green-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save for Later
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'process' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Step-by-Step Application Process</h3>
            
            <div className="space-y-6">
              {[
                { step: 1, title: 'Research & Planning', description: 'Research countries, universities, and courses. Plan your timeline and budget.', duration: '2-3 months' },
                { step: 2, title: 'Prepare Documents', description: 'Gather transcripts, test scores, SOP, LOR, and other required documents.', duration: '1-2 months' },
                { step: 3, title: 'Take Standardized Tests', description: 'Complete IELTS/TOEFL, GRE/GMAT, SAT as required by your target universities.', duration: '2-3 months' },
                { step: 4, title: 'Apply to Universities', description: 'Submit applications to your chosen universities with all required documents.', duration: '1 month' },
                { step: 5, title: 'Apply for Scholarships', description: 'Apply for relevant scholarships and financial aid opportunities.', duration: 'Ongoing' },
                { step: 6, title: 'Visa Application', description: 'Apply for student visa once you receive admission offers.', duration: '1-2 months' },
                { step: 7, title: 'Pre-departure', description: 'Arrange accommodation, book flights, and prepare for departure.', duration: '1 month' }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <span className="text-sm text-green-600 font-medium">Timeline: {item.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Personalized Guidance?</h3>
                <p className="text-gray-600">Get expert consultation for your study abroad journey</p>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Consultation
                </motion.button>
                <motion.button
                  className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Checklist
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default StudyAbroad;