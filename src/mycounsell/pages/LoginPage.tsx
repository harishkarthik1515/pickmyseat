import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle,
  User,
  Sparkles,
  BookOpen,
  Target,
  Brain,
  Info,
  Copy
} from 'lucide-react';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const testCredentials = {
    email: 'student@mycounsell.com',
    password: 'demo123'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/mycounsell/dashboard');
    }, 1500);
  };

  const handleUseTestCredentials = () => {
    setFormData({
      email: testCredentials.email,
      password: testCredentials.password
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-inter flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Illustration */}
        <motion.div 
          className="hidden lg:block relative"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 lg:p-12"
            animate={{
              y: [-10, 10, -10],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="flex items-center justify-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="h-8 w-8 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MYCOUNSELL
                </span>
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
              <p className="text-gray-600 text-lg">Continue your counselling journey</p>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl"
              animate={{
                y: [-10, 10, -10],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CheckCircle className="h-6 w-6 text-green-500" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl"
              animate={{
                y: [-10, 10, -10],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-8 bg-white rounded-2xl p-3 shadow-xl"
              animate={{
                y: [-10, 10, -10],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <Brain className="h-5 w-5 text-purple-500" />
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ scale: 1.05, rotate: 0 }}
                initial={{ rotate: 3 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-blue-100 to-blue-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                >
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 mb-2">Mock Counselling</h3>
                <p className="text-sm text-gray-600">Practice with realistic simulations</p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                whileHover={{ scale: 1.05, rotate: 0 }}
                initial={{ rotate: -3 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-purple-100 to-purple-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                >
                  <Target className="h-6 w-6 text-purple-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Guidance</h3>
                <p className="text-sm text-gray-600">Smart recommendations</p>
              </motion.div>

              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 col-span-2 group"
                whileHover={{ scale: 1.02 }}
                initial={{ rotate: 1 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-green-100 to-green-200 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                >
                  <Brain className="h-6 w-6 text-green-600" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 mb-2">Expert Verified</h3>
                <p className="text-sm text-gray-600">Content verified by counselling experts</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Mobile Header */}
          <motion.div 
            className="lg:hidden text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MYCOUNSELL
              </span>
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="hidden lg:block text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-gray-600">Access your counselling dashboard</p>
            </motion.div>

            {/* Test Credentials Section */}
            <motion.div 
              className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Info className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Demo Credentials</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between bg-white rounded-lg p-2">
                  <div>
                    <span className="text-gray-600">Email: </span>
                    <span className="font-medium text-gray-900">{testCredentials.email}</span>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(testCredentials.email, 'email')}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-2">
                  <div>
                    <span className="text-gray-600">Password: </span>
                    <span className="font-medium text-gray-900">{testCredentials.password}</span>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(testCredentials.password, 'password')}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              <motion.button
                onClick={handleUseTestCredentials}
                className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Use Demo Credentials
              </motion.button>
              {copySuccess && (
                <motion.p 
                  className="text-xs text-green-600 mt-2 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {copySuccess === 'email' ? 'Email' : 'Password'} copied to clipboard!
                </motion.p>
              )}
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                    placeholder="Enter your email"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
                    placeholder="Enter your password"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link 
                  to="/mycounsell/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/mycounsell/signup" 
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign up here
                </Link>
              </p>
            </motion.div>

            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Link 
                to="/mycounsell" 
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;