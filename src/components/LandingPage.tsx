import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Target, 
  BookOpen, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle, 
  Brain, 
  MessageCircle, 
  Search,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Globe,
  ChevronDown
} from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stream: '',
    interests: ''
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="font-inter overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50"></div>
        <motion.div 
          className="absolute w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: mousePosition.x / 50,
            y: mousePosition.y / 50,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: -mousePosition.x / 80,
            y: -mousePosition.y / 80,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      {/* Sticky Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Features'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors relative"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              <motion.button 
                onClick={handleLogin}
                className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sign In
              </motion.button>
              <motion.button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-teal-600 p-2"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-2 space-y-2">
                {['About', 'Features'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button 
                  onClick={handleLogin}
                  className="w-full text-left px-3 py-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Sign In
                </motion.button>
                <motion.button 
                  onClick={handleGetStarted}
                  className="w-full mt-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-xl font-medium transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="max-w-xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2 mb-6"
              >
                <motion.div
                  className="bg-gradient-to-r from-teal-100 to-teal-200 px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-teal-700 font-semibold text-sm flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI-Powered Guidance
                  </span>
                </motion.div>
              </motion.div>

              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
                variants={itemVariants}
              >
                Your Personalized Path to 
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 block"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  College Starts Here
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Get AI-based course and college suggestions based on your marks and interests. Make informed decisions about your future with personalized guidance.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get Started</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>

                <motion.button 
                  onClick={handleLogin}
                  className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Sign In</span>
                </motion.button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-6 mt-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full border-2 border-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">10,000+ students guided</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">4.9/5 rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="relative bg-gradient-to-br from-teal-100 to-blue-100 rounded-3xl p-8 lg:p-12"
                style={{ y }}
              >
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 1 }}
                >
                  <Award className="h-6 w-6 text-yellow-500" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-8 bg-white rounded-2xl p-3 shadow-xl"
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 2 }}
                >
                  <Zap className="h-5 w-5 text-purple-500" />
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    initial={{ rotate: 3 }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-teal-100 to-teal-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <BookOpen className="h-6 w-6 text-teal-600" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2">Course Selection</h3>
                    <p className="text-sm text-gray-600">Find the perfect course for your interests</p>
                  </motion.div>

                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    initial={{ rotate: -3 }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-blue-100 to-blue-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <Target className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2">College Matching</h3>
                    <p className="text-sm text-gray-600">Get matched with top colleges</p>
                  </motion.div>

                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 col-span-2 group"
                    whileHover={{ scale: 1.02 }}
                    initial={{ rotate: 1 }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-purple-100 to-purple-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <Users className="h-6 w-6 text-purple-600" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                    <p className="text-sm text-gray-600">Connect with career counselors and mentors</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-gray-400" />
        </motion.div>
      </section>

      {/* Onboarding Form Section */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-teal-600" />
              <span className="text-teal-700 font-semibold">Start Your Journey</span>
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tell Us About Yourself
            </h2>
            <p className="text-xl text-gray-600">
              Get personalized recommendations in just 2 minutes
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  placeholder="Enter your full name"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
                  placeholder="Enter your email"
                />
              </motion.div>
            </div>

            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="stream" className="block text-sm font-semibold text-gray-700 mb-3">
                12th Stream
              </label>
              <select
                id="stream"
                name="stream"
                value={formData.stream}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all hover:border-teal-300"
              >
                <option value="">Select your stream</option>
                <option value="science">Science (PCM/PCB)</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts/Humanities</option>
                <option value="other">Other</option>
              </select>
            </motion.div>

            <motion.div 
              className="mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="interests" className="block text-sm font-semibold text-gray-700 mb-3">
                Interests & Career Goals
              </label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none hover:border-teal-300"
                placeholder="Tell us about your interests, hobbies, and career aspirations..."
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get My Recommendations</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23009688' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="h-5 w-5 text-teal-600" />
              <span className="text-teal-700 font-semibold">Why Choose Us</span>
            </motion.div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge platform provides comprehensive guidance to help you make the best decisions for your future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Matchmaking",
                description: "Our advanced AI analyzes your academic performance, interests, and career goals to suggest the perfect colleges and courses tailored just for you.",
                feature: "Personalized recommendations",
                color: "from-teal-500 to-teal-600",
                bgColor: "from-teal-50 to-teal-100",
                delay: 0
              },
              {
                icon: MessageCircle,
                title: "Mock Counselling",
                description: "Practice with AI-powered mock counselling sessions to prepare for college interviews and build confidence in your career discussions.",
                feature: "Interview preparation",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
                delay: 0.2
              },
              {
                icon: Search,
                title: "Entrance Explorer",
                description: "Discover and prepare for entrance exams with comprehensive information about exam patterns, dates, and preparation strategies.",
                feature: "Exam preparation guide",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100",
                delay: 0.4
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                  
                  <motion.div 
                    className="flex items-center space-x-2 text-teal-600 font-semibold"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>{feature.feature}</span>
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
                <motion.div
                  className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ 
                    scale: [1, 2, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-teal-600 to-teal-700 p-2 rounded-xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCap className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold">PickMySeat</span>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 mb-6 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Empowering students to make informed decisions about their future
            </motion.p>
            
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => navigate('/mycounsell')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="h-5 w-5" />
                <span>Visit MYCOUNSELL</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <p className="text-gray-500 text-sm mt-2">
                Practice counselling simulations with AI guidance
              </p>
            </motion.div>
            
            <motion.div 
              className="border-t border-gray-700 pt-6"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-500 text-sm">
                © 2025 PickMySeat. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;