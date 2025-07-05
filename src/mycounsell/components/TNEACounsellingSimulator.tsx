import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Check, 
  X, 
  Users, 
  GraduationCap, 
  FileText, 
  Calendar, 
  AlertCircle, 
  Trophy, 
  Heart, 
  Shield,
  Info,
  HelpCircle,
  Download,
  Star,
  Clock,
  Target,
  Award,
  BookOpen,
  Brain,
  Zap
} from 'lucide-react';

const TNEACounsellingSimulator = () => {
  const [currentPhase, setCurrentPhase] = useState('pre-counselling');
  const [currentStep, setCurrentStep] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    caste: 'General',
    category: '',
    marks: '',
    subjects: [],
    documents: [],
    randomNumber: null,
    rank: null,
    choices: [],
    allottedSeat: null,
    confirmationOption: '',
    roundHistory: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const preCounsellingSteps = [
    { title: 'Registration', icon: FileText, description: 'Register on TNEA Portal' },
    { title: 'Application & Upload', icon: Upload, description: 'Fill application and upload certificates' },
    { title: 'Random Number', icon: Trophy, description: 'Allotment of random number for tie-breaker' },
    { title: 'Verification', icon: Check, description: 'Online certificate verification by TFC' },
    { title: 'Rank List', icon: Users, description: 'Publication of rank list & grievance redressal' }
  ];

  const counsellingSteps = [
    { title: 'Choice Filling', icon: Heart, description: 'Fill college and branch preferences' },
    { title: 'Seat Allotment', icon: GraduationCap, description: 'Seat allotment based on rank and choices' },
    { title: 'Confirmation', icon: Shield, description: 'Confirm your allotted seat' },
    { title: 'Reporting', icon: Calendar, description: 'Report to college/TFC' }
  ];

  const categories = [
    'General',
    'Eminent Sports Person',
    'Differently Abled',
    'Wards of Ex-servicemen',
    'Government School 7.5%',
    'First Generation Graduate'
  ];

  const castes = ['General', 'OBC', 'SC', 'ST', 'EWS'];

  const colleges = [
    { 
      name: 'Anna University, Chennai - Computer Science', 
      cutoff: { General: 95, OBC: 92, SC: 85, ST: 82, EWS: 93 },
      seats: { total: 120, General: 60, OBC: 32, SC: 18, ST: 10 }
    },
    { 
      name: 'MIT Campus, Chennai - Electronics & Communication', 
      cutoff: { General: 92, OBC: 89, SC: 82, ST: 79, EWS: 90 },
      seats: { total: 100, General: 50, OBC: 27, SC: 15, ST: 8 }
    },
    { 
      name: 'College of Engineering, Guindy - Mechanical Engineering', 
      cutoff: { General: 90, OBC: 87, SC: 80, ST: 77, EWS: 88 },
      seats: { total: 150, General: 75, OBC: 40, SC: 22, ST: 13 }
    },
    { 
      name: 'PSG College of Technology - Information Technology', 
      cutoff: { General: 88, OBC: 85, SC: 78, ST: 75, EWS: 86 },
      seats: { total: 80, General: 40, OBC: 22, SC: 12, ST: 6 }
    },
    { 
      name: 'Thiagarajar College of Engineering - Civil Engineering', 
      cutoff: { General: 85, OBC: 82, SC: 75, ST: 72, EWS: 83 },
      seats: { total: 120, General: 60, OBC: 32, SC: 18, ST: 10 }
    },
    { 
      name: 'SSN College of Engineering - Computer Science', 
      cutoff: { General: 93, OBC: 90, SC: 83, ST: 80, EWS: 91 },
      seats: { total: 60, General: 30, OBC: 16, SC: 9, ST: 5 }
    },
    { 
      name: 'VIT Chennai - Biotechnology', 
      cutoff: { General: 80, OBC: 77, SC: 70, ST: 67, EWS: 78 },
      seats: { total: 40, General: 20, OBC: 11, SC: 6, ST: 3 }
    },
    { 
      name: 'SRM Institute of Science - Aerospace Engineering', 
      cutoff: { General: 82, OBC: 79, SC: 72, ST: 69, EWS: 80 },
      seats: { total: 50, General: 25, OBC: 14, SC: 8, ST: 3 }
    }
  ];

  const confirmationOptions = [
    {
      id: 'accept_join',
      title: 'Accept and Join',
      description: 'Satisfied with the seat. Download provisional allotment order and report to college.',
      nextAction: 'complete'
    },
    {
      id: 'accept_upward',
      title: 'Accept and Upward',
      description: 'Satisfied but wait for higher preference in upward movement.',
      nextAction: 'upward'
    },
    {
      id: 'decline_upward',
      title: 'Decline and Upward',
      description: 'Not satisfied, decline but wait for higher preference in upward movement.',
      nextAction: 'upward'
    },
    {
      id: 'decline_next',
      title: 'Decline and Move to Next Round',
      description: 'Not satisfied, participate in next round without upward movement.',
      nextAction: 'next_round'
    },
    {
      id: 'decline_quit',
      title: 'Decline and Quit',
      description: 'Not satisfied and do not wish to participate in subsequent rounds.',
      nextAction: 'quit'
    },
    {
      id: 'upward_next',
      title: 'Upward or Move to Next Round',
      description: 'No seat allotted. Try upward movement or move to next round.',
      nextAction: 'upward_or_next'
    }
  ];

  useEffect(() => {
    if (currentPhase === 'pre-counselling') {
      if (currentStep === 2 && !formData.randomNumber) {
        generateRandomNumber();
      }
      if (currentStep === 4 && !formData.rank) {
        calculateRank();
      }
    }
  }, [currentStep, currentPhase]);

  const generateRandomNumber = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 1000000) + 100000;
      setFormData(prev => ({ ...prev, randomNumber: randomNum }));
      setIsLoading(false);
    }, 2000);
  };

  const calculateRank = () => {
    setIsLoading(true);
    setTimeout(() => {
      const baseRank = Math.floor((500 - parseInt(formData.marks || 400)) * 100);
      const casteBonus = formData.caste === 'General' ? 0 : 
                       formData.caste === 'OBC' ? -500 :
                       formData.caste === 'SC' ? -1000 :
                       formData.caste === 'ST' ? -1500 : -300;
      const finalRank = Math.max(1, baseRank + casteBonus + Math.floor(Math.random() * 1000));
      setFormData(prev => ({ ...prev, rank: finalRank }));
      setIsLoading(false);
    }, 3000);
  };

  const simulateAllotment = () => {
    if (formData.choices.length === 0) return;

    const studentMarks = parseInt(formData.marks || '0');
    const eligibleColleges = formData.choices.filter(choice => {
      const college = colleges.find(c => c.name === choice);
      if (!college) return false;
      
      const requiredCutoff = college.cutoff[formData.caste] || college.cutoff.General;
      return studentMarks >= requiredCutoff;
    });

    if (eligibleColleges.length > 0) {
      // 70% chance of getting first eligible choice, 30% chance of random eligible choice
      const allottedChoice = Math.random() < 0.7 ? 
        eligibleColleges[0] : 
        eligibleColleges[Math.floor(Math.random() * eligibleColleges.length)];
      
      setFormData(prev => ({ 
        ...prev, 
        allottedSeat: allottedChoice 
      }));
    } else {
      // No seat allotted
      setFormData(prev => ({ 
        ...prev, 
        allottedSeat: null 
      }));
    }
  };

  const simulateUpwardMovement = () => {
    setIsLoading(true);
    setTimeout(() => {
      // 30% chance of upward movement success
      const success = Math.random() < 0.3;
      
      if (success && formData.choices.length > 0) {
        // Get a better choice if available
        const currentIndex = formData.allottedSeat ? 
          formData.choices.findIndex(choice => choice === formData.allottedSeat) : -1;
        
        if (currentIndex > 0) {
          const betterChoice = formData.choices[currentIndex - 1];
          setFormData(prev => ({ 
            ...prev, 
            allottedSeat: betterChoice 
          }));
        }
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleNext = () => {
    if (currentPhase === 'pre-counselling') {
      if (currentStep < preCounsellingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('counselling');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'counselling') {
      if (currentStep < counsellingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleRoundCompletion();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 'counselling') {
      setCurrentPhase('pre-counselling');
      setCurrentStep(preCounsellingSteps.length - 1);
    }
  };

  const handleRoundCompletion = () => {
    const option = confirmationOptions.find(opt => opt.id === formData.confirmationOption);
    if (!option) return;

    // Save round history
    const roundData = {
      round: currentRound,
      allottedSeat: formData.allottedSeat,
      confirmationOption: formData.confirmationOption,
      choices: [...formData.choices]
    };

    setFormData(prev => ({
      ...prev,
      roundHistory: [...prev.roundHistory, roundData]
    }));

    switch (option.nextAction) {
      case 'complete':
        setCurrentPhase('completed');
        break;
      case 'quit':
        setCurrentPhase('quit');
        break;
      case 'upward':
        simulateUpwardMovement();
        break;
      case 'next_round':
      case 'upward_or_next':
        if (currentRound < 3) {
          setCurrentRound(currentRound + 1);
          setCurrentStep(0);
          setFormData(prev => ({
            ...prev,
            allottedSeat: null,
            confirmationOption: ''
          }));
        } else {
          setCurrentPhase('completed');
        }
        break;
      default:
        break;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addChoice = (college) => {
    if (formData.choices.length < 10 && !formData.choices.includes(college)) {
      setFormData(prev => ({ 
        ...prev, 
        choices: [...prev.choices, college] 
      }));
    }
  };

  const removeChoice = (index) => {
    setFormData(prev => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index)
    }));
  };

  const moveChoice = (fromIndex, toIndex) => {
    const newChoices = [...formData.choices];
    const [movedItem] = newChoices.splice(fromIndex, 1);
    newChoices.splice(toIndex, 0, movedItem);
    setFormData(prev => ({ ...prev, choices: newChoices }));
  };

  const getCurrentSteps = () => {
    return currentPhase === 'pre-counselling' ? preCounsellingSteps : counsellingSteps;
  };

  const renderProgressBar = () => {
    const steps = getCurrentSteps();
    const totalSteps = preCounsellingSteps.length + counsellingSteps.length;
    const completedSteps = currentPhase === 'pre-counselling' ? 
      currentStep : 
      preCounsellingSteps.length + currentStep;

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-600">
            {currentPhase === 'pre-counselling' ? 'Pre-Counselling' : `Round ${currentRound} Counselling`} - 
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(((completedSteps + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((completedSteps + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  const renderStepNavigation = () => {
    const steps = getCurrentSteps();
    
    return (
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <motion.div
                key={index}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : isCompleted 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-500'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <Icon size={20} />
                <div className="text-left">
                  <div className="font-medium text-sm">{step.title}</div>
                  <div className="text-xs opacity-75">{step.description}</div>
                </div>
                {isCompleted && <Check size={16} className="text-green-600" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    if (currentPhase === 'completed') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <motion.div
              className="text-6xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              🎓
            </motion.div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Counselling Complete!</h2>
            <p className="text-gray-600">You have successfully completed the TNEA 2025 counselling process.</p>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Final Allotment</h3>
            <p className="text-lg opacity-90">{formData.allottedSeat || 'No seat allotted'}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Round History</h4>
              <div className="space-y-3">
                {formData.roundHistory.map((round, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">Round {round.round}</p>
                    <p className="text-sm text-gray-600">
                      {round.allottedSeat ? `Allotted: ${round.allottedSeat}` : 'No seat allotted'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Action: {confirmationOptions.find(opt => opt.id === round.confirmationOption)?.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-bold text-lg mb-4 text-gray-800">Your Profile</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {formData.name}</p>
                <p><span className="font-medium">Category:</span> {formData.category}</p>
                <p><span className="font-medium">Caste:</span> {formData.caste}</p>
                <p><span className="font-medium">Marks:</span> {formData.marks}%</p>
                <p><span className="font-medium">Rank:</span> {formData.rank}</p>
                <p><span className="font-medium">Random Number:</span> {formData.randomNumber}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <motion.button 
              onClick={() => {
                setCurrentPhase('pre-counselling');
                setCurrentStep(0);
                setCurrentRound(1);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  caste: 'General',
                  category: '',
                  marks: '',
                  subjects: [],
                  documents: [],
                  randomNumber: null,
                  rank: null,
                  choices: [],
                  allottedSeat: null,
                  confirmationOption: '',
                  roundHistory: []
                });
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start New Simulation
            </motion.button>
          </div>
        </div>
      );
    }

    if (currentPhase === 'quit') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-3xl font-bold text-red-600 mb-2">Counselling Ended</h2>
            <p className="text-gray-600">You have chosen to quit the counselling process.</p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">What this means:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• You will not participate in subsequent counselling rounds</li>
              <li>• You cannot claim any seat in this counselling process</li>
              <li>• You may need to wait for the next academic year</li>
              <li>• Consider other admission processes or colleges</li>
            </ul>
          </div>

          <div className="text-center">
            <motion.button 
              onClick={() => {
                setCurrentPhase('pre-counselling');
                setCurrentStep(0);
                setCurrentRound(1);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  caste: 'General',
                  category: '',
                  marks: '',
                  subjects: [],
                  documents: [],
                  randomNumber: null,
                  rank: null,
                  choices: [],
                  allottedSeat: null,
                  confirmationOption: '',
                  roundHistory: []
                });
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </div>
        </div>
      );
    }

    // Pre-counselling steps
    if (currentPhase === 'pre-counselling') {
      switch (currentStep) {
        case 0: // Registration
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="h-8 w-8 text-blue-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">TNEA 2025 Registration</h2>
                <p className="text-gray-600">Register on www.tneaonline.org</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Caste Category *</label>
                  <select
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.caste}
                    onChange={(e) => handleInputChange('caste', e.target.value)}
                  >
                    {castes.map(caste => (
                      <option key={caste} value={caste}>{caste}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Special Category</label>
                  <select
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="">Select Category (if applicable)</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <motion.div 
                className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start space-x-3">
                  <Info className="text-blue-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-700">Important Information</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      All applicants will be assigned a random number for tie-breaker purposes. 
                      Registration fee payment is required through the portal.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          );

        case 1: // Application & Upload
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-green-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Upload className="h-8 w-8 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Application & Certificate Upload</h2>
                <p className="text-gray-600">Fill application details and upload required certificates</p>
              </div>
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">12th Standard Marks (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.marks}
                    onChange={(e) => handleInputChange('marks', e.target.value)}
                    placeholder="Enter your 12th marks percentage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Required Documents</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      '10th Standard Mark Sheet',
                      '12th Standard Mark Sheet', 
                      'Transfer Certificate',
                      'Community Certificate',
                      'Income Certificate',
                      'Nativity Certificate'
                    ].map((doc, index) => (
                      <motion.div 
                        key={index} 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                        <p className="text-sm text-gray-600">{doc}</p>
                        <motion.button 
                          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Upload
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <motion.div 
                  className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="text-yellow-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium text-yellow-700">Certificate Verification</h4>
                      <p className="text-sm text-yellow-600 mt-1">
                        Uploaded certificates will be verified online at TFCs. Sports person certificates 
                        will be verified in-person at Chennai.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );

        case 2: // Random Number
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Trophy className="h-8 w-8 text-purple-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Random Number Allotment</h2>
                <p className="text-gray-600">For tie-breaker purposes</p>
              </div>
              <div className="text-center">
                {isLoading ? (
                  <div className="space-y-4">
                    <motion.div 
                      className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-lg text-gray-600">Generating your random number...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">Your Random Number</h3>
                      <motion.div 
                        className="text-6xl font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {formData.randomNumber}
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      className="bg-green-50 p-4 rounded-lg border border-green-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Check className="text-green-500" size={20} />
                        <p className="text-green-700 font-medium">
                          Random number successfully generated and assigned!
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          );

        case 3: // Verification
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-green-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Check className="h-8 w-8 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Certificate Verification</h2>
                <p className="text-gray-600">Online verification by Tamil Nadu Facilitation Centre (TFC)</p>
              </div>
              <div className="space-y-4">
                {[
                  '10th Standard Mark Sheet',
                  '12th Standard Mark Sheet',
                  'Transfer Certificate',
                  'Community Certificate',
                  'Income Certificate',
                  'Nativity Certificate'
                ].map((doc, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium">{doc}</span>
                    <div className="flex items-center space-x-2">
                      <Check className="text-green-500" size={20} />
                      <span className="text-green-600 font-medium">Verified</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="bg-green-50 p-4 rounded-lg border border-green-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-start space-x-3">
                  <Check className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-green-700">Verification Complete</h4>
                    <p className="text-sm text-green-600 mt-1">
                      All your certificates have been successfully verified online by the TFC.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          );

        case 4: // Rank List
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="h-8 w-8 text-yellow-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Rank List Publication</h2>
                <p className="text-gray-600">Your rank has been calculated and published</p>
              </div>
              {isLoading ? (
                <div className="text-center space-y-4">
                  <motion.div 
                    className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-lg text-gray-600">Calculating your rank...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">Your TNEA Rank</h3>
                    <motion.div 
                      className="text-6xl font-bold"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {formData.rank}
                    </motion.div>
                    <p className="mt-4 text-lg opacity-90">Based on your 12th standard marks, caste category, and random number</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="font-medium text-blue-700 mb-2">Grievance Redressal</h4>
                    <p className="text-sm text-blue-600 mb-3">
                      You have one week to raise any grievances regarding your rank. 
                      Contact the Office of Secretary, TNEA or nearby TFCs for in-person grievance redressal.
                    </p>
                    <motion.button 
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Raise Grievance (if any)
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </div>
          );

        default:
          return null;
      }
    }

    // Counselling steps
    if (currentPhase === 'counselling') {
      switch (currentStep) {
        case 0: // Choice Filling
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-pink-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="h-8 w-8 text-pink-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Choice Filling - Round {currentRound}</h2>
                <p className="text-gray-600">Fill your college and branch preferences (3 days given)</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Colleges & Branches</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {colleges.map((college, index) => {
                      const requiredCutoff = college.cutoff[formData.caste] || college.cutoff.General;
                      const studentMarks = parseInt(formData.marks || '0');
                      const isEligible = studentMarks >= requiredCutoff;
                      
                      return (
                        <motion.div 
                          key={index} 
                          className={`p-3 border rounded-lg transition-colors ${
                            isEligible 
                              ? 'hover:bg-green-50 border-green-200' 
                              : 'hover:bg-red-50 border-red-200 opacity-60'
                          }`}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <span className="text-sm font-medium">{college.name}</span>
                              <div className="text-xs text-gray-500 mt-1">
                                Cutoff ({formData.caste}): {requiredCutoff}% | 
                                Your Marks: {formData.marks}%
                              </div>
                              {!isEligible && (
                                <div className="text-xs text-red-500 mt-1">
                                  ⚠️ Below cutoff - Low chance of admission
                                </div>
                              )}
                            </div>
                            <motion.button
                              onClick={() => addChoice(college.name)}
                              className={`px-3 py-1 rounded text-sm transition-colors ${
                                isEligible 
                                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                  : 'bg-gray-400 text-white hover:bg-gray-500'
                              }`}
                              disabled={formData.choices.includes(college.name) || formData.choices.length >= 10}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Add
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Choices (Order matters!)</h3>
                  <div className="space-y-2">
                    {formData.choices.map((choice, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-blue-600">#{index + 1}</span>
                          <span className="text-sm">{choice}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {index > 0 && (
                            <motion.button
                              onClick={() => moveChoice(index, index - 1)}
                              className="text-blue-500 hover:text-blue-700"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ↑
                            </motion.button>
                          )}
                          {index < formData.choices.length - 1 && (
                            <motion.button
                              onClick={() => moveChoice(index, index + 1)}
                              className="text-blue-500 hover:text-blue-700"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ↓
                            </motion.button>
                          )}
                          <motion.button
                            onClick={() => removeChoice(index)}
                            className="text-red-500 hover:text-red-700"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                    {formData.choices.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No choices selected yet</p>
                    )}
                  </div>
                </div>
              </div>
              <motion.div 
                className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-yellow-700">Important Strategy Tips</h4>
                    <ul className="text-sm text-yellow-600 mt-1 space-y-1">
                      <li>• Order your choices by preference - higher preference = better chance</li>
                      <li>• Include both reach and safe choices for better outcomes</li>
                      <li>• Consider location, fees, and placement records</li>
                      <li>• You can add any number of choices, but prioritize carefully</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          );

        case 1: // Seat Allotment
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-green-100 to-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="h-8 w-8 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Seat Allotment - Round {currentRound}</h2>
                <p className="text-gray-600">Based on your rank and preferences</p>
              </div>
              <div className="text-center">
                {!formData.allottedSeat && !isLoading ? (
                  <div className="space-y-4">
                    <motion.button
                      onClick={simulateAllotment}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Process Allotment
                    </motion.button>
                    <p className="text-gray-600">Click to simulate seat allotment based on your choices</p>
                  </div>
                ) : isLoading ? (
                  <div className="space-y-4">
                    <motion.div 
                      className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-lg text-gray-600">Processing allotment...</p>
                  </div>
                ) : formData.allottedSeat ? (
                  <div className="space-y-6">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-2xl shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">🎉 Congratulations!</h3>
                      <h4 className="text-xl mb-2">You have been allotted:</h4>
                      <div className="text-lg font-semibold bg-white bg-opacity-20 p-4 rounded-lg">
                        {formData.allottedSeat}
                      </div>
                    </motion.div>
                    <motion.div 
                      className="bg-red-50 p-4 rounded-lg border border-red-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="text-red-500 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium text-red-700">Important Deadline</h4>
                          <p className="text-sm text-red-600 mt-1">
                            You must confirm your seat within 2 days from the date of allotment. 
                            Non-confirmation will result in loss of seat and exclusion from further rounds.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <motion.div 
                      className="bg-gradient-to-r from-gray-400 to-gray-600 text-white p-8 rounded-2xl shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">No Seat Allotted</h3>
                      <p className="text-lg">
                        Unfortunately, no seat was allotted in this round based on your rank and choices.
                      </p>
                    </motion.div>
                    <motion.div 
                      className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-start space-x-3">
                        <Info className="text-blue-500 mt-1" size={20} />
                        <div>
                          <h4 className="font-medium text-blue-700">What's Next?</h4>
                          <p className="text-sm text-blue-600 mt-1">
                            You can participate in upward movement or wait for the next counselling round.
                            Consider revising your choice list for better chances.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          );

        case 2: // Confirmation
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="h-8 w-8 text-purple-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Seat Confirmation - Round {currentRound}</h2>
                <p className="text-gray-600">Choose your confirmation option</p>
              </div>
              {formData.allottedSeat && (
                <motion.div 
                  className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="font-semibold text-blue-700 mb-2">Allotted Seat:</h3>
                  <p className="text-blue-600">{formData.allottedSeat}</p>
                </motion.div>
              )}
              <div className="grid gap-4">
                {confirmationOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.confirmationOption === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleInputChange('confirmationOption', option.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                        formData.confirmationOption === option.id
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}></div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{option.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="bg-green-50 p-4 rounded-lg border border-green-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start space-x-3">
                  <Info className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-green-700">Fee Concession Information</h4>
                    <p className="text-sm text-green-600 mt-1">
                      Candidates eligible for scholarships under Government school 7.5% preferential treatment, 
                      First Generation Graduate scheme, and PMSS need not pay fees but must report to colleges/TFCs.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          );

        case 3: // Reporting
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-green-100 to-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="h-8 w-8 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Reporting - Round {currentRound}</h2>
                <p className="text-gray-600">Complete the reporting process</p>
              </div>

              <motion.div 
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-2xl shadow-lg text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold mb-4">Round {currentRound} Complete!</h3>
                <p className="text-lg opacity-90">
                  {formData.allottedSeat ? 
                    `You have successfully completed Round ${currentRound} with seat: ${formData.allottedSeat}` :
                    `Round ${currentRound} completed. No seat was allotted in this round.`
                  }
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="font-bold text-lg mb-4 text-gray-800">Round {currentRound} Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Choices Made:</span> {formData.choices.length}</p>
                    <p><span className="font-medium">Allotted Seat:</span> {formData.allottedSeat || 'None'}</p>
                    <p><span className="font-medium">Confirmation:</span> {
                      confirmationOptions.find(opt => opt.id === formData.confirmationOption)?.title || 'Not selected'
                    }</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="font-bold text-lg mb-4 text-gray-800">Next Steps</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {formData.confirmationOption === 'accept_join' ? (
                      <>
                        <p>• Download your provisional allotment order</p>
                        <p>• Report to the college on or before the specified date</p>
                        <p>• Complete admission formalities and fee payment</p>
                        <p>• Keep all original documents ready</p>
                      </>
                    ) : formData.confirmationOption === 'decline_quit' ? (
                      <>
                        <p>• You have chosen to quit the counselling process</p>
                        <p>• No further participation in subsequent rounds</p>
                        <p>• Consider other admission processes</p>
                      </>
                    ) : (
                      <>
                        <p>• Wait for upward movement results</p>
                        <p>• Prepare for next counselling round</p>
                        <p>• Monitor the TNEA portal for updates</p>
                        <p>• Consider revising your choice list</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );

        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.div 
              className="bg-blue-600 text-white p-3 rounded-full"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap size={32} />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">TNEA 2025</h1>
              <p className="text-lg text-gray-600">Online Counselling Simulator</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Directorate of Technical Education, Chennai-25
          </p>
          <motion.button
            onClick={() => setShowHelpModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Need Help?</span>
          </motion.button>
        </motion.div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Steps Navigation */}
        {renderStepNavigation()}

        {/* Main Content */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        {currentPhase !== 'completed' && currentPhase !== 'quit' && (
          <div className="flex justify-between items-center">
            <motion.button
              onClick={handlePrev}
              disabled={currentStep === 0 && currentPhase === 'pre-counselling'}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                currentStep === 0 && currentPhase === 'pre-counselling'
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
              whileHover={{ scale: currentStep === 0 && currentPhase === 'pre-counselling' ? 1 : 1.05 }}
              whileTap={{ scale: currentStep === 0 && currentPhase === 'pre-counselling' ? 1 : 0.95 }}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </motion.button>

            <div className="flex space-x-4">
              {/* Validation messages */}
              {currentPhase === 'counselling' && currentStep === 0 && formData.choices.length === 0 && (
                <div className="text-red-500 text-sm">Please add at least one choice to proceed</div>
              )}
              {currentPhase === 'counselling' && currentStep === 1 && !formData.allottedSeat && !isLoading && (
                <div className="text-orange-500 text-sm">Please process allotment to proceed</div>
              )}
              {currentPhase === 'counselling' && currentStep === 2 && !formData.confirmationOption && (
                <div className="text-red-500 text-sm">Please select a confirmation option</div>
              )}
            </div>

            <motion.button
              onClick={handleNext}
              disabled={
                (currentPhase === 'counselling' && currentStep === 0 && formData.choices.length === 0) ||
                (currentPhase === 'counselling' && currentStep === 1 && !formData.allottedSeat) ||
                (currentPhase === 'counselling' && currentStep === 2 && !formData.confirmationOption)
              }
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                (currentPhase === 'counselling' && currentStep === 0 && formData.choices.length === 0) ||
                (currentPhase === 'counselling' && currentStep === 1 && !formData.allottedSeat) ||
                (currentPhase === 'counselling' && currentStep === 2 && !formData.confirmationOption)
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
              }`}
              whileHover={{ scale: 
                (currentPhase === 'counselling' && currentStep === 0 && formData.choices.length === 0) ||
                (currentPhase === 'counselling' && currentStep === 1 && !formData.allottedSeat) ||
                (currentPhase === 'counselling' && currentStep === 2 && !formData.confirmationOption)
                  ? 1 : 1.05 
              }}
              whileTap={{ scale: 
                (currentPhase === 'counselling' && currentStep === 0 && formData.choices.length === 0) ||
                (currentPhase === 'counselling' && currentStep === 1 && !formData.allottedSeat) ||
                (currentPhase === 'counselling' && currentStep === 2 && !formData.confirmationOption)
                  ? 1 : 0.95 
              }}
            >
              <span>
                {currentPhase === 'pre-counselling' && currentStep === preCounsellingSteps.length - 1 
                  ? 'Start Counselling' 
                  : currentPhase === 'counselling' && currentStep === counsellingSteps.length - 1
                  ? 'Complete Round'
                  : 'Next'
                }
              </span>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        )}

        {/* Information Panel */}
        <motion.div 
          className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About TNEA 2025 Counselling</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">🎯 3 Rounds</h4>
              <p className="text-gray-600">Counselling conducted in 3 rounds with 4 stages each: Choice Filling, Allotment, Confirmation, and Reporting.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">⏰ Time Limits</h4>
              <p className="text-gray-600">3 days for choice filling, 2 days for seat confirmation. Strict deadlines must be followed.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">🏫 Special Categories</h4>
              <p className="text-gray-600">Separate counselling for Sports persons, Differently Abled, Ex-servicemen wards, and Government school students.</p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>This is a simulation for educational purposes. For actual TNEA counselling, visit www.tneaonline.org</p>
          <p className="mt-2">© 2025 Directorate of Technical Education, Tamil Nadu</p>
        </div>

        {/* Help Modal */}
        <AnimatePresence>
          {showHelpModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelpModal(false)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">TNEA Counselling Help</h3>
                  <motion.button
                    onClick={() => setShowHelpModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">How to Use This Simulator</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Follow the step-by-step process from registration to final reporting</li>
                      <li>• Enter realistic data for accurate simulation results</li>
                      <li>• Pay attention to cutoffs and eligibility criteria</li>
                      <li>• Practice different choice filling strategies</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Choice Filling Tips</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Order choices by preference (1st choice = highest preference)</li>
                      <li>• Include both safe and reach choices</li>
                      <li>• Consider location, fees, and placement records</li>
                      <li>• Check cutoffs for your caste category</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Confirmation Options</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <strong>Accept & Join:</strong> Satisfied with seat, complete admission</li>
                      <li>• <strong>Accept & Upward:</strong> Keep seat but try for better options</li>
                      <li>• <strong>Decline & Next Round:</strong> Participate in next round</li>
                      <li>• <strong>Decline & Quit:</strong> Exit counselling process</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TNEACounsellingSimulator;