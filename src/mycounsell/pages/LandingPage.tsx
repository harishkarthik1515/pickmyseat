import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Brain, 
  Target, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Play,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Globe,
  Menu,
  X,
  Monitor,
  FileText,
  BarChart3,
  Lightbulb,
  Sparkles,
  Trophy,
  ChevronDown
} from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Guidance',
      description: 'Smart recommendations based on your academic profile and preferences',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Mock Counselling',
      description: 'Practice TNEA, JoSAA, NEET counselling processes with realistic simulations',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Choice Optimization',
      description: 'Optimize your college choices for maximum admission probability',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Expert Verified',
      description: 'Content verified by education counsellors and admission experts',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const counsellingTypes = [
    {
      name: 'TNEA',
      fullName: 'Tamil Nadu Engineering Admissions',
      description: 'Complete simulation of TNEA counselling process',
      participants: '2.5L+',
      duration: '45 mins',
      difficulty: 'Intermediate',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'JoSAA',
      fullName: 'Joint Seat Allocation Authority',
      description: 'IIT, NIT, IIIT counselling simulation',
      participants: '8L+',
      duration: '60 mins',
      difficulty: 'Advanced',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'NEET',
      fullName: 'National Eligibility cum Entrance Test',
      description: 'Medical college admission counselling',
      participants: '18L+',
      duration: '50 mins',
      difficulty: 'Intermediate',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { label: 'Students Guided', value: '50K+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
    { label: 'Counselling Types', value: '15+', icon: BookOpen },
    { label: 'Expert Rating', value: '4.9/5', icon: Star }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-inter">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <motion.div 
          className="absolute w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: mousePosition.x / 50,
            y: mousePosition.y / 50,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: -mousePosition.x / 80,
            y: -mousePosition.y / 80,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-gray-100/50 z-50"
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
                className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MYCOUNSELL
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Simulations', 'About'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              <motion.button 
                onClick={() => navigate('/mycounsell/login')}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sign In
              </motion.button>
              <motion.button 
                onClick={() => navigate('/mycounsell/signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
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
                className="text-gray-700 hover:text-blue-600 p-2"
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-2 space-y-2">
              {['Features', 'Simulations', 'About'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button 
                onClick={() => navigate('/mycounsell/login')}
                className="w-full text-left px-3 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sign In
              </motion.button>
              <motion.button 
                onClick={() => navigate('/mycounsell/signup')}
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center space-x-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-blue-700 font-semibold text-sm flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    AI-Powered Counselling
                  </span>
                </motion.div>
              </motion.div>

              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Master College 
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Counselling Process
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Practice TNEA, JoSAA, NEET counselling with realistic simulations. Get AI-powered guidance and expert tips to maximize your admission chances.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button 
                  onClick={() => navigate('/mycounsell/signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-5 w-5" />
                  <span>Start Simulation</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </motion.button>

                <motion.button 
                  onClick={() => navigate('/mycounsell/login')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="h-5 w-5" />
                  <span>Sign In</span>
                </motion.button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">50,000+ students guided</span>
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
                className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 lg:p-12"
                variants={floatingVariants}
                animate="animate"
              >
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 1 }}
                >
                  <Brain className="h-6 w-6 text-purple-500" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-8 bg-white rounded-2xl p-3 shadow-xl"
                  variants={floatingVariants}
                  animate="animate"
                  transition={{ delay: 2 }}
                >
                  <Lightbulb className="h-5 w-5 text-orange-500" />
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    initial={{ rotate: 3 }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-blue-100 to-blue-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <Monitor className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2">Live Simulations</h3>
                    <p className="text-sm text-gray-600">Practice with real-time counselling scenarios</p>
                  </motion.div>

                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    initial={{ rotate: -3 }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-purple-100 to-purple-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2">Smart Analytics</h3>
                    <p className="text-sm text-gray-600">Track your progress and performance</p>
                  </motion.div>

                  <motion.div 
                    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 col-span-2 group"
                    whileHover={{ scale: 1.02 }}
                    initial={{ rotate: 1 }}
                  >
                    <motion.div
                      className="bg-gradient-to-br from-green-100 to-green-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    >
                      <Target className="h-6 w-6 text-green-600" />
                    </motion.div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                    <p className="text-sm text-gray-600">Get personalized tips from counselling experts</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                </motion.div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MYCOUNSELL?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced features designed to give you the edge in college admissions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulations Section */}
      <section id="simulations" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Counselling Simulations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice with realistic simulations of major counselling processes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {counsellingTypes.map((type, index) => (
              <motion.div
                key={type.name}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className={`bg-gradient-to-r ${type.color} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <GraduationCap className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.fullName}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{type.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-bold text-blue-600">{type.participants}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-bold text-green-600">{type.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Level</p>
                    <p className="font-bold text-orange-600">{type.difficulty}</p>
                  </div>
                </div>

                <motion.button
                  className={`w-full bg-gradient-to-r ${type.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/mycounsell/signup')}
                >
                  <Play className="h-4 w-4" />
                  <span>Start Simulation</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Master Your Counselling?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of students who have successfully navigated their college admissions with MYCOUNSELL
            </p>
            <motion.button
              onClick={() => navigate('/mycounsell/signup')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold">MYCOUNSELL</span>
            </motion.div>
            
            <p className="text-gray-400 mb-6 text-lg">
              Empowering students with AI-powered counselling guidance
            </p>
            
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-500 text-sm">
                © 2025 MYCOUNSELL. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;