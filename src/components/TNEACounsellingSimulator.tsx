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
  RefreshCw,
  Download,
  Clock,
  MapPin,
  Star,
  Award,
  DollarSign,
  BookOpen,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowUp,
  RotateCcw,
  Home,
  Phone,
  Mail,
  School,
  User,
  CreditCard,
  Building,
  Bookmark,
  Eye,
  EyeOff,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const TNEACounsellingSimulator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isInCounsellingPhase, setIsInCounsellingPhase] = useState(false);
  const [counsellingStep, setCounsellingStep] = useState(0); // 0: Choice Filling, 1: Allotment, 2: Confirmation, 3: Reporting
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ title: '', content: '' });
  
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
    hasReportedToCollege: false,
    participateInUpward: false,
    upwardResult: null,
    roundHistory: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [allotmentResult, setAllotmentResult] = useState(null);

  const preSteps = [
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
    { title: 'Reporting/Next Round', icon: Calendar, description: 'Report to college or proceed to next round' }
  ];

  const categories = [
    'General',
    'Eminent Sports Person',
    'Differently Abled',
    'Wards of Ex-servicemen',
    'Government School 7.5%',
    'First Generation Graduate'
  ];

  const castes = [
    'General',
    'BC (Backward Class)',
    'BCM (Backward Class Muslim)',
    'MBC (Most Backward Class)',
    'SC (Scheduled Caste)',
    'SCA (Scheduled Caste Arunthathiyar)',
    'ST (Scheduled Tribe)'
  ];

  const colleges = [
    { 
      name: 'Anna University, Chennai - Computer Science Engineering',
      cutoff: { General: 1200, BC: 1800, MBC: 2500, SC: 3500, ST: 4000 },
      fees: '₹25,000',
      type: 'Government',
      seats: 120
    },
    { 
      name: 'MIT Campus, Chennai - Electronics & Communication Engineering',
      cutoff: { General: 1500, BC: 2200, MBC: 3000, SC: 4000, ST: 4500 },
      fees: '₹25,000',
      type: 'Government',
      seats: 90
    },
    { 
      name: 'College of Engineering, Guindy - Mechanical Engineering',
      cutoff: { General: 2000, BC: 2800, MBC: 3500, SC: 4500, ST: 5000 },
      fees: '₹25,000',
      type: 'Government',
      seats: 150
    },
    { 
      name: 'PSG College of Technology - Information Technology',
      cutoff: { General: 2500, BC: 3200, MBC: 4000, SC: 5000, ST: 5500 },
      fees: '₹1,20,000',
      type: 'Private',
      seats: 180
    },
    { 
      name: 'Thiagarajar College of Engineering - Civil Engineering',
      cutoff: { General: 3000, BC: 3800, MBC: 4500, SC: 5500, ST: 6000 },
      fees: '₹85,000',
      type: 'Private',
      seats: 120
    },
    { 
      name: 'SSN College of Engineering - Computer Science Engineering',
      cutoff: { General: 1800, BC: 2500, MBC: 3200, SC: 4200, ST: 4700 },
      fees: '₹1,50,000',
      type: 'Private',
      seats: 240
    },
    { 
      name: 'VIT Chennai - Biotechnology',
      cutoff: { General: 4000, BC: 4800, MBC: 5500, SC: 6500, ST: 7000 },
      fees: '₹1,80,000',
      type: 'Private',
      seats: 60
    },
    { 
      name: 'SRM Institute of Science - Aerospace Engineering',
      cutoff: { General: 3500, BC: 4200, MBC: 5000, SC: 6000, ST: 6500 },
      fees: '₹2,50,000',
      type: 'Private',
      seats: 80
    },
    { 
      name: 'Madras Institute of Technology - Instrumentation Engineering',
      cutoff: { General: 2800, BC: 3500, MBC: 4200, SC: 5200, ST: 5700 },
      fees: '₹25,000',
      type: 'Government',
      seats: 60
    },
    { 
      name: 'Government College of Technology - Textile Technology',
      cutoff: { General: 5000, BC: 5800, MBC: 6500, SC: 7500, ST: 8000 },
      fees: '₹25,000',
      type: 'Government',
      seats: 40
    }
  ];

  const confirmationOptions = [
    {
      id: 'accept_join',
      title: 'Accept and Join',
      description: 'Satisfied with the seat. Download provisional allotment order and report to college.',
      consequence: 'You will be admitted to this college and cannot participate in further rounds.',
      action: 'complete'
    },
    {
      id: 'accept_upward',
      title: 'Accept and Upward',
      description: 'Satisfied but wait for higher preference in upward movement.',
      consequence: 'You secure this seat but can get a better seat if available in upward movement.',
      action: 'upward'
    },
    {
      id: 'decline_upward',
      title: 'Decline and Upward',
      description: 'Not satisfied, decline but wait for higher preference in upward movement.',
      consequence: 'You lose this seat but can get a better seat if available in upward movement.',
      action: 'upward'
    },
    {
      id: 'decline_next',
      title: 'Decline and Move to Next Round',
      description: 'Not satisfied, participate in next round without upward movement.',
      consequence: 'You lose this seat and will participate in the next round with remaining seats.',
      action: 'next_round'
    },
    {
      id: 'decline_quit',
      title: 'Decline and Quit',
      description: 'Not satisfied and do not wish to participate in subsequent rounds.',
      consequence: 'You will exit the counselling process and cannot participate in further rounds.',
      action: 'quit'
    },
    {
      id: 'upward_next',
      title: 'Upward or Move to Next Round',
      description: 'No seat allotted. Try upward movement or move to next round.',
      consequence: 'You will participate in upward movement and then next round if no seat is available.',
      action: 'upward_or_next'
    }
  ];

  useEffect(() => {
    if (currentStep === 2 && !formData.randomNumber) {
      generateRandomNumber();
    }
    if (currentStep === 4 && !formData.rank) {
      calculateRank();
    }
  }, [currentStep]);

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
      const finalRank = Math.max(1, baseRank + Math.floor(Math.random() * 1000));
      setFormData(prev => ({ ...prev, rank: finalRank }));
      setIsLoading(false);
    }, 3000);
  };

  const handleNext = () => {
    if (!isInCounsellingPhase) {
      if (currentStep < preSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Move to counselling phase
        setIsInCounsellingPhase(true);
        setCounsellingStep(0);
      }
    } else {
      // Handle counselling phase navigation
      if (counsellingStep < counsellingSteps.length - 1) {
        setCounsellingStep(counsellingStep + 1);
      } else {
        // Handle round completion
        handleRoundCompletion();
      }
    }
  };

  const handlePrev = () => {
    if (!isInCounsellingPhase) {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    } else {
      if (counsellingStep > 0) {
        setCounsellingStep(counsellingStep - 1);
      } else {
        // Go back to pre-steps
        setIsInCounsellingPhase(false);
        setCurrentStep(preSteps.length - 1);
      }
    }
  };

  const handleRoundCompletion = () => {
    const result = formData.confirmationOption;
    
    // Add to round history
    const roundData = {
      round: currentRound,
      allottedSeat: formData.allottedSeat,
      confirmationOption: formData.confirmationOption,
      action: confirmationOptions.find(opt => opt.id === result)?.action
    };
    
    setFormData(prev => ({
      ...prev,
      roundHistory: [...prev.roundHistory, roundData]
    }));

    const action = confirmationOptions.find(opt => opt.id === result)?.action;
    
    if (action === 'complete' || action === 'quit') {
      // End simulation
      setCounsellingStep(3); // Show final reporting step
    } else if (action === 'upward') {
      // Process upward movement
      processUpwardMovement();
    } else if (action === 'next_round' || action === 'upward_or_next') {
      // Move to next round
      if (currentRound < 3) {
        startNextRound();
      } else {
        // No more rounds
        setCounsellingStep(3);
      }
    }
  };

  const processUpwardMovement = () => {
    setIsLoading(true);
    setTimeout(() => {
      const upwardSuccess = Math.random() < 0.3; // 30% chance of upward movement success
      
      if (upwardSuccess) {
        // Find a better college from their choices
        const currentChoiceIndex = formData.choices.findIndex(choice => choice === formData.allottedSeat);
        const betterChoices = formData.choices.slice(0, currentChoiceIndex);
        
        if (betterChoices.length > 0) {
          const newSeat = betterChoices[Math.floor(Math.random() * betterChoices.length)];
          setFormData(prev => ({ 
            ...prev, 
            allottedSeat: newSeat,
            upwardResult: 'success'
          }));
          setAllotmentResult({
            type: 'upward_success',
            seat: newSeat,
            message: 'Congratulations! You got a better seat through upward movement.'
          });
        } else {
          setFormData(prev => ({ ...prev, upwardResult: 'no_better' }));
          setAllotmentResult({
            type: 'upward_no_better',
            message: 'No better seat available in upward movement. Your original seat is confirmed.'
          });
        }
      } else {
        setFormData(prev => ({ ...prev, upwardResult: 'failed' }));
        
        if (formData.confirmationOption === 'decline_upward') {
          // They declined and upward failed, so they have no seat
          setFormData(prev => ({ ...prev, allottedSeat: null }));
          setAllotmentResult({
            type: 'upward_failed_no_seat',
            message: 'Upward movement unsuccessful. You have no seat for this round.'
          });
        } else {
          // They accepted, so they keep their original seat
          setAllotmentResult({
            type: 'upward_failed_keep_seat',
            message: 'Upward movement unsuccessful. Your original seat is confirmed.'
          });
        }
      }
      
      setIsLoading(false);
      setCounsellingStep(3); // Move to reporting step
    }, 3000);
  };

  const startNextRound = () => {
    setCurrentRound(currentRound + 1);
    setCounsellingStep(0);
    setFormData(prev => ({
      ...prev,
      choices: [], // Reset choices for new round
      allottedSeat: null,
      confirmationOption: '',
      upwardResult: null
    }));
    setAllotmentResult(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addChoice = (college) => {
    if (formData.choices.length < 10 && !formData.choices.includes(college.name)) {
      setFormData(prev => ({ 
        ...prev, 
        choices: [...prev.choices, college.name] 
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
    const [movedChoice] = newChoices.splice(fromIndex, 1);
    newChoices.splice(toIndex, 0, movedChoice);
    setFormData(prev => ({ ...prev, choices: newChoices }));
  };

  const simulateAllotment = () => {
    setIsLoading(true);
    setTimeout(() => {
      const eligibleChoices = formData.choices.filter(choiceName => {
        const college = colleges.find(c => c.name === choiceName);
        if (!college) return false;
        
        const cutoff = college.cutoff[formData.caste] || college.cutoff.General;
        return formData.rank <= cutoff;
      });

      if (eligibleChoices.length > 0) {
        // Get the highest preference eligible choice
        const allottedSeat = eligibleChoices[0];
        setFormData(prev => ({ ...prev, allottedSeat }));
        setAllotmentResult({
          type: 'allotted',
          seat: allottedSeat,
          message: 'Congratulations! You have been allotted a seat.'
        });
      } else {
        setFormData(prev => ({ ...prev, allottedSeat: null }));
        setAllotmentResult({
          type: 'not_allotted',
          message: 'No seat allotted in this round. You can participate in the next round.'
        });
      }
      setIsLoading(false);
    }, 3000);
  };

  const showInfo = (title, content) => {
    setInfoModalContent({ title, content });
    setShowInfoModal(true);
  };

  const getStepProgress = () => {
    if (!isInCounsellingPhase) {
      return ((currentStep + 1) / (preSteps.length + 4)) * 100;
    } else {
      const preStepsComplete = preSteps.length;
      const currentProgress = preStepsComplete + counsellingStep + 1;
      const totalSteps = preSteps.length + 4;
      return (currentProgress / totalSteps) * 100;
    }
  };

  const getCurrentStepInfo = () => {
    if (!isInCounsellingPhase) {
      return preSteps[currentStep];
    } else {
      return counsellingSteps[counsellingStep];
    }
  };

  const renderInfoModal = () => (
    <AnimatePresence>
      {showInfoModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowInfoModal(false)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{infoModalContent.title}</h3>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                {infoModalContent.content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderStep = () => {
    if (!isInCounsellingPhase) {
      // Pre-counselling steps
      switch (currentStep) {
        case 0: // Registration
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  TNEA 2025 Registration
                </h2>
                <p className="text-gray-600">Register on www.tneaonline.org</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name as per 12th certificate"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your 10-digit mobile number"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Caste Category *</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.caste}
                    onChange={(e) => handleInputChange('caste', e.target.value)}
                  >
                    {castes.map(caste => (
                      <option key={caste} value={caste}>{caste}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Special Category</label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="">Select if applicable</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <AlertCircle className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Important Registration Guidelines</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Registration fee: ₹500 for General/BC/BCM, ₹250 for MBC/SC/SCA/ST</li>
                      <li>• All applicants will be assigned a random number for tie-breaker purposes</li>
                      <li>• Ensure all details match your 12th standard certificate exactly</li>
                      <li>• Keep your registration number safe for future reference</li>
                    </ul>
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
                  className="bg-gradient-to-r from-green-500 to-teal-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Upload className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Application & Certificate Upload
                </h2>
                <p className="text-gray-600">Fill application details and upload required certificates</p>
              </div>

              <div className="grid gap-6">
                <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">12th Standard Marks (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    value={formData.marks}
                    onChange={(e) => handleInputChange('marks', e.target.value)}
                    placeholder="Enter your 12th marks percentage (e.g., 85.5)"
                  />
                  <p className="text-xs text-gray-500">Enter the percentage as mentioned in your 12th standard certificate</p>
                </motion.div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Required Documents Upload</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '10th Standard Mark Sheet', required: true, desc: 'Clear scan of original certificate' },
                      { name: '12th Standard Mark Sheet', required: true, desc: 'Clear scan of original certificate' },
                      { name: 'Transfer Certificate', required: true, desc: 'From your 12th standard school' },
                      { name: 'Community Certificate', required: true, desc: 'Valid community certificate (if applicable)' },
                      { name: 'Income Certificate', required: false, desc: 'For fee concession (if applicable)' },
                      { name: 'Nativity Certificate', required: true, desc: 'Tamil Nadu nativity certificate' }
                    ].map((doc, index) => (
                      <motion.div 
                        key={index} 
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 hover:bg-green-50 transition-all group"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Upload className="mx-auto mb-3 text-gray-400 group-hover:text-green-500 transition-colors h-8 w-8" />
                        <p className="font-medium text-gray-700 mb-1">{doc.name}</p>
                        <p className="text-xs text-gray-500 mb-3">{doc.desc}</p>
                        {doc.required && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Required</span>}
                        <motion.button 
                          className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Upload File
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div 
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                      <AlertCircle className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Certificate Verification Process</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• All certificates will be verified online at Tamil Nadu Facilitation Centres (TFCs)</li>
                        <li>• Sports person certificates require in-person verification at Chennai</li>
                        <li>• Upload clear, readable scans in PDF format (max 2MB per file)</li>
                        <li>• Any discrepancy in documents may lead to rejection</li>
                      </ul>
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
                  className="bg-gradient-to-r from-purple-500 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Trophy className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Random Number Allotment
                </h2>
                <p className="text-gray-600">For tie-breaker purposes in case of equal marks</p>
              </div>

              <div className="text-center">
                {isLoading ? (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">Generating your random number...</p>
                      <p className="text-gray-500">This process ensures fairness in tie-breaking scenarios</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-3xl shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-2xl font-bold mb-4">Your Random Number</h3>
                      <motion.div 
                        className="text-7xl font-bold mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {formData.randomNumber}
                      </motion.div>
                      <p className="text-purple-100">This number will be used for tie-breaking during seat allotment</p>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <CheckCircle className="text-green-500 h-6 w-6" />
                        <p className="text-green-700 font-semibold text-lg">Random Number Successfully Generated!</p>
                      </div>
                      <div className="text-sm text-green-600 space-y-1">
                        <p>• Your random number has been recorded in the TNEA database</p>
                        <p>• This number will be used if you and another candidate have the same marks</p>
                        <p>• Lower random number gets preference in case of ties</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          );

        case 3: // Verification
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                  Certificate Verification
                </h2>
                <p className="text-gray-600">Online verification by Tamil Nadu Facilitation Centre (TFC)</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: '10th Standard Mark Sheet', status: 'verified', time: '2 mins ago' },
                  { name: '12th Standard Mark Sheet', status: 'verified', time: '3 mins ago' },
                  { name: 'Transfer Certificate', status: 'verified', time: '5 mins ago' },
                  { name: 'Community Certificate', status: 'verified', time: '7 mins ago' },
                  { name: 'Income Certificate', status: 'verified', time: '8 mins ago' },
                  { name: 'Nativity Certificate', status: 'verified', time: '10 mins ago' }
                ].map((doc, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{doc.name}</span>
                        <p className="text-sm text-gray-500">Verified {doc.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500 h-5 w-5" />
                      <span className="text-green-600 font-semibold">Verified</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <CheckCircle className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Verification Complete ✅</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <p>• All your certificates have been successfully verified online by the TFC</p>
                      <p>• Your application is now eligible for rank calculation</p>
                      <p>• You will receive SMS/Email notifications for further updates</p>
                      <p>• Keep checking the TNEA portal regularly for announcements</p>
                    </div>
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
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Rank List Publication
                </h2>
                <p className="text-gray-600">Your rank has been calculated and published</p>
              </div>

              {isLoading ? (
                <motion.div 
                  className="text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">Calculating your rank...</p>
                    <p className="text-gray-500">Processing marks, random number, and category details</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl text-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">Your TNEA 2025 Rank</h3>
                    <motion.div 
                      className="text-7xl font-bold mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {formData.rank}
                    </motion.div>
                    <p className="text-blue-100 text-lg">Based on your 12th marks, random number, and category</p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div 
                      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-semibold text-gray-800 mb-4">Rank Calculation Details</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">12th Marks:</span>
                          <span className="font-semibold">{formData.marks}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Random Number:</span>
                          <span className="font-semibold">{formData.randomNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-semibold">{formData.caste}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-600">Final Rank:</span>
                          <span className="font-bold text-blue-600">{formData.rank}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Grievance Redressal
                      </h4>
                      <div className="text-sm text-yellow-700 space-y-2">
                        <p>You have <strong>one week</strong> to raise any grievances regarding your rank calculation.</p>
                        <p>Contact options:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Office of Secretary, TNEA</li>
                          <li>Nearby Tamil Nadu Facilitation Centres (TFCs)</li>
                          <li>Online grievance portal</li>
                        </ul>
                      </div>
                      <motion.button 
                        className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Raise Grievance (if any)
                      </motion.button>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <Lightbulb className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">What's Next?</h4>
                        <div className="text-sm text-green-700 space-y-1">
                          <p>• Counselling will begin soon - stay tuned for announcements</p>
                          <p>• Start researching colleges and courses based on your rank</p>
                          <p>• Prepare your choice list in order of preference</p>
                          <p>• Keep all original documents ready for verification</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          );

        default:
          return null;
      }
    } else {
      // Counselling phase steps
      switch (counsellingStep) {
        case 0: // Choice Filling
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-pink-500 to-rose-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                  Choice Filling - Round {currentRound}
                </h2>
                <p className="text-gray-600">Fill your college and branch preferences (3 days given)</p>
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <div className="bg-blue-100 px-3 py-1 rounded-full">
                    <span className="text-blue-700 font-semibold">Your Rank: {formData.rank}</span>
                  </div>
                  <div className="bg-purple-100 px-3 py-1 rounded-full">
                    <span className="text-purple-700 font-semibold">Category: {formData.caste}</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Available Colleges */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Available Colleges & Branches</h3>
                    <motion.button
                      onClick={() => showInfo('Choice Filling Guidelines', 
                        <div className="space-y-4">
                          <p>Follow these guidelines for effective choice filling:</p>
                          <ul className="list-disc list-inside space-y-2">
                            <li><strong>Order matters:</strong> List colleges in order of your preference</li>
                            <li><strong>Mix safe and reach choices:</strong> Include colleges where you have high chances and some aspirational ones</li>
                            <li><strong>Check cutoffs:</strong> Refer to previous year cutoffs for guidance</li>
                            <li><strong>Consider all factors:</strong> Location, fees, placement records, etc.</li>
                            <li><strong>No limit:</strong> You can add as many choices as you want</li>
                            <li><strong>Deadline:</strong> Submit within 3 days of choice filling opening</li>
                          </ul>
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-yellow-800"><strong>Important:</strong> Once submitted, choices cannot be modified. Choose carefully!</p>
                          </div>
                        </div>
                      )}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Info className="h-4 w-4" />
                      <span>Guidelines</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {colleges.map((college, index) => {
                      const cutoff = college.cutoff[formData.caste] || college.cutoff.General;
                      const isEligible = formData.rank <= cutoff;
                      const chanceLevel = formData.rank <= cutoff * 0.8 ? 'high' : 
                                         formData.rank <= cutoff ? 'medium' : 'low';
                      
                      return (
                        <motion.div 
                          key={index} 
                          className={`p-4 border-2 rounded-xl transition-all ${
                            isEligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                          } hover:shadow-md`}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1">{college.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Building className="h-4 w-4 mr-1" />
                                  {college.type}
                                </span>
                                <span className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {college.fees}
                                </span>
                                <span className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {college.seats} seats
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                chanceLevel === 'high' ? 'bg-green-100 text-green-700' :
                                chanceLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {chanceLevel === 'high' ? 'High Chance' :
                                 chanceLevel === 'medium' ? 'Medium Chance' : 'Low Chance'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="text-gray-600">Cutoff ({formData.caste}): </span>
                              <span className="font-semibold">{cutoff}</span>
                            </div>
                            <motion.button
                              onClick={() => addChoice(college)}
                              disabled={formData.choices.includes(college.name) || formData.choices.length >= 10}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                formData.choices.includes(college.name) 
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : formData.choices.length >= 10
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : 'bg-pink-500 text-white hover:bg-pink-600'
                              }`}
                              whileHover={!formData.choices.includes(college.name) && formData.choices.length < 10 ? { scale: 1.05 } : {}}
                              whileTap={!formData.choices.includes(college.name) && formData.choices.length < 10 ? { scale: 0.95 } : {}}
                            >
                              {formData.choices.includes(college.name) ? 'Added' : 'Add Choice'}
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Your Choices */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Your Choices ({formData.choices.length}/10)
                    </h3>
                    {formData.choices.length > 0 && (
                      <motion.button
                        onClick={() => setFormData(prev => ({ ...prev, choices: [] }))}
                        className="text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Clear All</span>
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="space-y-3 min-h-96">
                    {formData.choices.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <Target className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">No choices selected yet</p>
                        <p className="text-sm">Add colleges from the list on the left</p>
                      </div>
                    ) : (
                      formData.choices.map((choice, index) => {
                        const college = colleges.find(c => c.name === choice);
                        const cutoff = college?.cutoff[formData.caste] || college?.cutoff.General;
                        const isEligible = formData.rank <= cutoff;
                        
                        return (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 text-sm">{choice}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-gray-600">
                                    Cutoff: {cutoff}
                                  </span>
                                  <div className={`px-2 py-1 rounded-full text-xs ${
                                    isEligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                  }`}>
                                    {isEligible ? 'Eligible' : 'Not Eligible'}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <motion.button
                                onClick={() => moveChoice(index, Math.max(0, index - 1))}
                                disabled={index === 0}
                                className="p-1 text-gray-400 hover:text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => moveChoice(index, Math.min(formData.choices.length - 1, index + 1))}
                                disabled={index === formData.choices.length - 1}
                                className="p-1 text-gray-400 hover:text-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => removeChoice(index)}
                                className="p-1 text-gray-400 hover:text-red-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <motion.div 
                className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <AlertCircle className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Important Choice Filling Guidelines</h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <p>• <strong>Order is crucial:</strong> List colleges in order of your preference</p>
                      <p>• <strong>Allotment process:</strong> You'll get the highest preference college where you're eligible</p>
                      <p>• <strong>No limit:</strong> Add as many choices as you want, but prioritize carefully</p>
                      <p>• <strong>Deadline:</strong> Submit within 3 days from choice filling opening</p>
                      <p>• <strong>Final submission:</strong> Once submitted, choices cannot be modified</p>
                    </div>
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
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Seat Allotment - Round {currentRound}
                </h2>
                <p className="text-gray-600">Based on your rank, category, and preferences</p>
              </div>

              <div className="text-center">
                {!allotmentResult ? (
                  <motion.div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Ready for Seat Allotment?</h3>
                      <p className="text-gray-600 mb-6">
                        The system will process your choices and allocate seats based on your rank and availability.
                      </p>
                      <motion.button
                        onClick={simulateAllotment}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Process Seat Allotment
                      </motion.button>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-3">Your Submitted Choices</h4>
                      <div className="space-y-2">
                        {formData.choices.slice(0, 5).map((choice, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm">
                            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                              {index + 1}
                            </span>
                            <span className="text-blue-700">{choice}</span>
                          </div>
                        ))}
                        {formData.choices.length > 5 && (
                          <p className="text-blue-600 text-sm">... and {formData.choices.length - 5} more choices</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : isLoading ? (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">Processing seat allotment...</p>
                      <p className="text-gray-500">Checking eligibility and seat availability</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {allotmentResult.type === 'allotted' ? (
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-3xl font-bold mb-4">Congratulations!</h3>
                        <h4 className="text-xl mb-4">You have been allotted:</h4>
                        <div className="text-lg font-semibold bg-white bg-opacity-20 p-4 rounded-xl mb-4">
                          {allotmentResult.seat}
                        </div>
                        <p className="text-green-100">{allotmentResult.message}</p>
                      </motion.div>
                    ) : allotmentResult.type === 'upward_success' ? (
                      <motion.div 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-3xl shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-6xl mb-4">🚀</div>
                        <h3 className="text-3xl font-bold mb-4">Upward Movement Success!</h3>
                        <h4 className="text-xl mb-4">Your new allotment:</h4>
                        <div className="text-lg font-semibold bg-white bg-opacity-20 p-4 rounded-xl mb-4">
                          {allotmentResult.seat}
                        </div>
                        <p className="text-purple-100">{allotmentResult.message}</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-3xl shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-3xl font-bold mb-4">No Seat Allotted</h3>
                        <p className="text-orange-100 text-lg">{allotmentResult.message}</p>
                      </motion.div>
                    )}

                    <motion.div 
                      className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-red-500 p-2 rounded-lg">
                          <Clock className="text-white h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-800 mb-2">⏰ Important Deadline</h4>
                          <div className="text-sm text-red-700 space-y-1">
                            <p>• You must confirm your seat within <strong>2 days</strong> from the date of allotment</p>
                            <p>• Non-confirmation will result in loss of seat and exclusion from further rounds</p>
                            <p>• Choose your confirmation option carefully as it affects future rounds</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          );

        case 2: // Confirmation
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Seat Confirmation - Round {currentRound}
                </h2>
                <p className="text-gray-600">Choose your confirmation option carefully</p>
              </div>

              {formData.allottedSeat ? (
                <motion.div 
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-6"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Your Allotted Seat:
                  </h3>
                  <p className="text-green-700 text-lg font-medium">{formData.allottedSeat}</p>
                  <div className="mt-3 text-sm text-green-600">
                    <p>• College fees and other details will be available after confirmation</p>
                    <p>• You have 2 days to make your decision</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 mb-6"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <XCircle className="h-5 w-5 mr-2" />
                    No Seat Allotted in This Round
                  </h3>
                  <p className="text-orange-700">You can participate in upward movement or the next round.</p>
                </motion.div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Your Confirmation Option:</h3>
                
                {confirmationOptions.map((option) => {
                  // Show relevant options based on allotment status
                  if (!formData.allottedSeat && !['upward_next'].includes(option.id)) return null;
                  if (formData.allottedSeat && ['upward_next'].includes(option.id)) return null;
                  
                  return (
                    <motion.div
                      key={option.id}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                        formData.confirmationOption === option.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                      }`}
                      onClick={() => handleInputChange('confirmationOption', option.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center ${
                          formData.confirmationOption === option.id
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.confirmationOption === option.id && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">{option.title}</h4>
                          <p className="text-gray-600 mb-3">{option.description}</p>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-yellow-800 text-sm">
                              <strong>Consequence:</strong> {option.consequence}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Info className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Fee Concession Information</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <p>• Government school 7.5% quota students: Fee concession available</p>
                      <p>• First Generation Graduate scheme: Special fee structure</p>
                      <p>• PMSS (Prime Minister's Scholarship Scheme): Full fee waiver for eligible candidates</p>
                      <p>• All eligible candidates must still report to colleges/TFCs for document verification</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );

        case 3: // Reporting/Next Round
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-gradient-to-r from-violet-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Round {currentRound} Results
                </h2>
                <p className="text-gray-600">Your counselling journey continues</p>
              </div>

              {isLoading ? (
                <motion.div 
                  className="text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">Processing upward movement...</p>
                    <p className="text-gray-500">Checking for better seat availability</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Round Summary */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Round {currentRound} Summary</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Your Details</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-600">Rank:</span> <span className="font-medium">{formData.rank}</span></p>
                          <p><span className="text-gray-600">Category:</span> <span className="font-medium">{formData.caste}</span></p>
                          <p><span className="text-gray-600">Choices Submitted:</span> <span className="font-medium">{formData.choices.length}</span></p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Allotment Result</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-600">Allotted Seat:</span> <span className="font-medium">{formData.allottedSeat || 'None'}</span></p>
                          <p><span className="text-gray-600">Confirmation:</span> <span className="font-medium">
                            {confirmationOptions.find(opt => opt.id === formData.confirmationOption)?.title || 'Not selected'}
                          </span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Based on Confirmation */}
                  {(() => {
                    const action = confirmationOptions.find(opt => opt.id === formData.confirmationOption)?.action;
                    
                    if (action === 'complete') {
                      return (
                        <motion.div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl text-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-6xl mb-4">🎓</div>
                          <h3 className="text-3xl font-bold mb-4">Counselling Complete!</h3>
                          <p className="text-green-100 text-lg mb-6">
                            You have successfully completed the TNEA 2025 counselling process.
                          </p>
                          <div className="bg-white bg-opacity-20 rounded-2xl p-4">
                            <h4 className="font-semibold mb-2">Next Steps:</h4>
                            <ul className="text-left text-green-100 space-y-1">
                              <li>• Download your provisional allotment order</li>
                              <li>• Report to {formData.allottedSeat?.split(' - ')[0]} on the specified date</li>
                              <li>• Complete admission formalities and fee payment</li>
                              <li>• Submit original documents for verification</li>
                            </ul>
                          </div>
                        </motion.div>
                      );
                    } else if (action === 'quit') {
                      return (
                        <motion.div 
                          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-8 rounded-3xl shadow-2xl text-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-6xl mb-4">👋</div>
                          <h3 className="text-3xl font-bold mb-4">Counselling Ended</h3>
                          <p className="text-gray-100 text-lg">
                            You have chosen to exit the counselling process. You cannot participate in further rounds.
                          </p>
                        </motion.div>
                      );
                    } else if (currentRound >= 3) {
                      return (
                        <motion.div 
                          className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-3xl shadow-2xl text-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-6xl mb-4">🔚</div>
                          <h3 className="text-3xl font-bold mb-4">All Rounds Complete</h3>
                          <p className="text-orange-100 text-lg">
                            All 3 rounds of counselling have been completed. Check for spot round announcements.
                          </p>
                        </motion.div>
                      );
                    } else {
                      return (
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-2xl text-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-6xl mb-4">➡️</div>
                          <h3 className="text-3xl font-bold mb-4">Moving to Round {currentRound + 1}</h3>
                          <p className="text-blue-100 text-lg mb-6">
                            Get ready for the next round of counselling with remaining seats.
                          </p>
                          <motion.button
                            onClick={startNextRound}
                            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Start Round {currentRound + 1}
                          </motion.button>
                        </motion.div>
                      );
                    }
                  })()}

                  {/* Round History */}
                  {formData.roundHistory.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Counselling History</h3>
                      <div className="space-y-3">
                        {formData.roundHistory.map((round, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-medium">Round {round.round}</span>
                              <p className="text-sm text-gray-600">{round.allottedSeat || 'No seat allotted'}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium">
                                {confirmationOptions.find(opt => opt.id === round.confirmationOption)?.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Restart Option */}
                  <div className="text-center pt-6">
                    <motion.button 
                      onClick={() => {
                        setCurrentStep(0);
                        setCurrentRound(1);
                        setIsInCounsellingPhase(false);
                        setCounsellingStep(0);
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
                          hasReportedToCollege: false,
                          participateInUpward: false,
                          upwardResult: null,
                          roundHistory: []
                        });
                        setAllotmentResult(null);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start New Simulation
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          );

        default:
          return null;
      }
    }
  };

  const canProceed = () => {
    if (!isInCounsellingPhase) {
      // Pre-counselling validation
      switch (currentStep) {
        case 0:
          return formData.name && formData.email && formData.phone && formData.caste;
        case 1:
          return formData.marks;
        case 2:
          return formData.randomNumber;
        case 3:
          return true; // Verification is automatic
        case 4:
          return formData.rank;
        default:
          return true;
      }
    } else {
      // Counselling phase validation
      switch (counsellingStep) {
        case 0:
          return formData.choices.length > 0;
        case 1:
          return allotmentResult !== null;
        case 2:
          return formData.confirmationOption !== '';
        case 3:
          return true;
        default:
          return true;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="h-10 w-10" />
            </motion.div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TNEA 2025
              </h1>
              <p className="text-xl text-gray-600">Online Counselling Simulator</p>
            </div>
          </div>
          <p className="text-gray-600 mb-2">Directorate of Technical Education, Chennai-25</p>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-blue-700 font-semibold text-sm">Round {currentRound}</span>
            </div>
            {isInCounsellingPhase && (
              <div className="bg-purple-100 px-3 py-1 rounded-full">
                <span className="text-purple-700 font-semibold text-sm">Counselling Phase</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              {isInCounsellingPhase 
                ? `Round ${currentRound} - ${getCurrentStepInfo().title}`
                : getCurrentStepInfo().title
              }
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(getStepProgress())}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${getStepProgress()}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Steps Navigation */}
        <motion.div 
          className="mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-4 min-w-max pb-4">
            {(isInCounsellingPhase ? counsellingSteps : preSteps).map((step, index) => {
              const Icon = step.icon;
              const isActive = isInCounsellingPhase ? index === counsellingStep : index === currentStep;
              const isCompleted = isInCounsellingPhase ? index < counsellingStep : index < currentStep;
              
              return (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all shadow-lg ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl scale-105' 
                      : isCompleted 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' 
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                  whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{step.title}</div>
                    <div className="text-xs opacity-75">{step.description}</div>
                  </div>
                  {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${isInCounsellingPhase}-${isInCounsellingPhase ? counsellingStep : currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handlePrev}
            disabled={!isInCounsellingPhase && currentStep === 0}
            className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg ${
              (!isInCounsellingPhase && currentStep === 0)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-xl'
            }`}
            whileHover={(!isInCounsellingPhase && currentStep === 0) ? {} : { scale: 1.05, y: -2 }}
            whileTap={(!isInCounsellingPhase && currentStep === 0) ? {} : { scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </motion.button>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => showInfo('Help & Guidelines', 
                <div className="space-y-4">
                  <p>This simulator helps you understand the TNEA counselling process:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Registration:</strong> Fill your basic details and pay fees</li>
                    <li><strong>Application:</strong> Upload required certificates</li>
                    <li><strong>Random Number:</strong> Assigned for tie-breaking</li>
                    <li><strong>Verification:</strong> Online certificate verification</li>
                    <li><strong>Rank List:</strong> Your rank calculation and publication</li>
                    <li><strong>Counselling:</strong> 3 rounds of choice filling and allotment</li>
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800"><strong>Note:</strong> This is a simulation for educational purposes. For actual counselling, visit www.tneaonline.org</p>
                  </div>
                </div>
              )}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </motion.button>

            {!canProceed() && (
              <div className="text-red-500 text-sm font-medium">
                {!isInCounsellingPhase && currentStep === 0 && 'Please fill all required fields'}
                {!isInCounsellingPhase && currentStep === 1 && 'Please enter your 12th marks'}
                {isInCounsellingPhase && counsellingStep === 0 && 'Please add at least one choice'}
                {isInCounsellingPhase && counsellingStep === 1 && 'Please process seat allotment'}
                {isInCounsellingPhase && counsellingStep === 2 && 'Please select a confirmation option'}
              </div>
            )}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg ${
              !canProceed()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-xl'
            }`}
            whileHover={!canProceed() ? {} : { scale: 1.05, y: -2 }}
            whileTap={!canProceed() ? {} : { scale: 0.95 }}
          >
            <span>
              {!isInCounsellingPhase && currentStep === preSteps.length - 1 ? 'Start Counselling' :
               isInCounsellingPhase && counsellingStep === counsellingSteps.length - 1 ? 'Complete Round' :
               'Next'}
            </span>
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Information Panel */}
        <motion.div 
          className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Info className="h-6 w-6 text-blue-600 mr-2" />
            About TNEA 2025 Counselling
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-700 mb-3">3 Rounds Process</h4>
              <p className="text-gray-600">Counselling conducted in 3 rounds with 4 stages each: Choice Filling, Allotment, Confirmation, and Reporting.</p>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="font-semibold text-gray-700 mb-3">Strict Deadlines</h4>
              <p className="text-gray-600">3 days for choice filling, 2 days for seat confirmation. Missing deadlines results in exclusion from further rounds.</p>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-sm border border-green-100"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-3xl mb-3">🏫</div>
              <h4 className="font-semibold text-gray-700 mb-3">Special Categories</h4>
              <p className="text-gray-600">Separate counselling for Sports persons, Differently Abled, Ex-servicemen wards, and Government school students.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div 
          className="text-center mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <h4 className="font-semibold text-yellow-800">Important Disclaimer</h4>
          </div>
          <div className="text-yellow-700 text-sm space-y-1">
            <p>This is a <strong>simulation for educational purposes only</strong>. For actual TNEA counselling, visit <strong>www.tneaonline.org</strong></p>
            <p>Actual cutoffs, procedures, and timelines may vary. Always refer to official TNEA notifications.</p>
            <p className="mt-3 text-xs">© 2025 Directorate of Technical Education, Tamil Nadu</p>
          </div>
        </motion.div>

        {/* Info Modal */}
        {renderInfoModal()}
      </div>
    </div>
  );
};

export default TNEACounsellingSimulator;