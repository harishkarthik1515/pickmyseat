import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  state: string;
  stream: string;
  marks: {
    physics: string;
    chemistry: string;
    mathematics: string;
    biology: string;
    english: string;
    overall: string;
  };
  preferredCourses: string[];
  interests: string[];
}

function SignupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    state: '',
    stream: '',
    marks: {
      physics: '',
      chemistry: '',
      mathematics: '',
      biology: '',
      english: '',
      overall: ''
    },
    preferredCourses: [],
    interests: []
  });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  const courses = [
    'Engineering', 'Medical', 'Arts & Humanities', 'Commerce', 'Science', 'Law', 
    'Management', 'Architecture', 'Design', 'Agriculture', 'Pharmacy', 'Nursing'
  ];

  const interestOptions = [
    'Artificial Intelligence', 'Web Development', 'Data Science', 'Robotics', 'Biotechnology',
    'Finance', 'Marketing', 'Psychology', 'Literature', 'History', 'Physics', 'Chemistry',
    'Mathematics', 'Biology', 'Economics', 'Political Science', 'Sociology', 'Philosophy',
    'Art & Design', 'Music', 'Sports', 'Photography', 'Writing', 'Teaching'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelect = (value: string, field: 'preferredCourses' | 'interests') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate registration process
    console.log('Registration data:', formData);
    
    // Show loading for 2 seconds then redirect to dashboard
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-teal-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <User className="h-8 w-8 text-teal-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  placeholder="Enter your full name"
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  placeholder="Enter your phone number"
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  required
                >
                  <option value="">Select your state</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <BookOpen className="h-8 w-8 text-blue-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Details</h2>
              <p className="text-gray-600">Tell us about your 12th grade performance</p>
            </div>

            <motion.div className="mb-6" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                12th Stream *
              </label>
              <select
                name="stream"
                value={formData.stream}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                required
              >
                <option value="">Select your stream</option>
                <option value="science-pcm">Science (PCM)</option>
                <option value="science-pcb">Science (PCB)</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts/Humanities</option>
              </select>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {formData.stream.includes('science') && (
                <>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Physics Marks (%)
                    </label>
                    <input
                      type="number"
                      name="marks.physics"
                      value={formData.marks.physics}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                      placeholder="Enter physics marks"
                      min="0"
                      max="100"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Chemistry Marks (%)
                    </label>
                    <input
                      type="number"
                      name="marks.chemistry"
                      value={formData.marks.chemistry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                      placeholder="Enter chemistry marks"
                      min="0"
                      max="100"
                    />
                  </motion.div>

                  {formData.stream === 'science-pcm' && (
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Mathematics Marks (%)
                      </label>
                      <input
                        type="number"
                        name="marks.mathematics"
                        value={formData.marks.mathematics}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                        placeholder="Enter mathematics marks"
                        min="0"
                        max="100"
                      />
                    </motion.div>
                  )}

                  {formData.stream === 'science-pcb' && (
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Biology Marks (%)
                      </label>
                      <input
                        type="number"
                        name="marks.biology"
                        value={formData.marks.biology}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                        placeholder="Enter biology marks"
                        min="0"
                        max="100"
                      />
                    </motion.div>
                  )}
                </>
              )}

              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  English Marks (%)
                </label>
                <input
                  type="number"
                  name="marks.english"
                  value={formData.marks.english}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  placeholder="Enter english marks"
                  min="0"
                  max="100"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Overall Percentage *
                </label>
                <input
                  type="number"
                  name="marks.overall"
                  value={formData.marks.overall}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  placeholder="Enter overall percentage"
                  min="0"
                  max="100"
                  required
                />
              </motion.div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Preferences</h2>
              <p className="text-gray-600">Select your preferred courses (multiple selection allowed)</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {courses.map((course) => (
                <motion.div
                  key={course}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.preferredCourses.includes(course)
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMultiSelect(course, 'preferredCourses')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{course}</span>
                    {formData.preferredCourses.includes(course) && (
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <motion.div
                className="bg-gradient-to-r from-green-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Star className="h-8 w-8 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Interests & Goals</h2>
              <p className="text-gray-600">Tell us about your interests to get better recommendations</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
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

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 font-inter">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
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
            </motion.div>

            <div className="text-sm text-gray-600">
              Step {currentStep} of 4
            </div>
          </div>
        </div>
      </motion.header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
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
                initial={{ width: '25%' }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <motion.button
                type="button"
                onClick={handlePrevious}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={currentStep === 1}
                whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
              >
                Previous
              </motion.button>

              {currentStep < 4 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <CheckCircle className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default SignupPage;