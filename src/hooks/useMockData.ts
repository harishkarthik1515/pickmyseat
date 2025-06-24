import { useState, useEffect } from 'react';
import {
  mockData,
  getCollegeById,
  getCourseById,
  getExamById,
  getCollegeCoursesByCollegeId,
  getCollegeCoursesByCourseId,
  getScholarshipsByCountry,
  getDeadlinesByType,
  getUpcomingDeadlines,
  getRecommendedCourses,
  getRecommendedColleges,
  calculateAdmissionProbability,
  type Student,
  type College,
  type Course,
  type EntranceExam,
  type Scholarship,
  type Country,
  type Deadline
} from '../data/mockData';

// Custom hook for accessing mock data with loading simulation
export const useMockData = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API call with loading state
  const simulateApiCall = async <T>(data: T, delay: number = 1000): Promise<T> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsLoading(false);
    return data;
  };

  return {
    isLoading,
    
    // Basic data getters
    getAllColleges: () => simulateApiCall(mockData.colleges),
    getAllCourses: () => simulateApiCall(mockData.courses),
    getAllExams: () => simulateApiCall(mockData.entranceExams),
    getAllScholarships: () => simulateApiCall(mockData.scholarships),
    getAllCountries: () => simulateApiCall(mockData.countries),
    getAllDeadlines: () => simulateApiCall(mockData.deadlines),
    getStudent: () => simulateApiCall(mockData.student),
    
    // Specific data getters
    getCollegeById: (id: string) => simulateApiCall(getCollegeById(id)),
    getCourseById: (id: string) => simulateApiCall(getCourseById(id)),
    getExamById: (id: string) => simulateApiCall(getExamById(id)),
    
    // Related data getters
    getCollegeCoursesByCollegeId: (collegeId: string) => 
      simulateApiCall(getCollegeCoursesByCollegeId(collegeId)),
    getCollegeCoursesByCourseId: (courseId: string) => 
      simulateApiCall(getCollegeCoursesByCourseId(courseId)),
    getScholarshipsByCountry: (country: string) => 
      simulateApiCall(getScholarshipsByCountry(country)),
    getDeadlinesByType: (type: Deadline['type']) => 
      simulateApiCall(getDeadlinesByType(type)),
    getUpcomingDeadlines: (days?: number) => 
      simulateApiCall(getUpcomingDeadlines(days)),
    
    // AI recommendation functions
    getRecommendedCourses: (student: Student) => 
      simulateApiCall(getRecommendedCourses(student), 2000),
    getRecommendedColleges: (student: Student) => 
      simulateApiCall(getRecommendedColleges(student), 2000),
    calculateAdmissionProbability: (student: Student, college: College, course: Course) =>
      simulateApiCall(calculateAdmissionProbability(student, college, course), 1500),
    
    // Search and filter functions
    searchColleges: (query: string, filters?: any) => {
      const filtered = mockData.colleges.filter(college =>
        college.name.toLowerCase().includes(query.toLowerCase()) ||
        college.location.toLowerCase().includes(query.toLowerCase()) ||
        college.state.toLowerCase().includes(query.toLowerCase())
      );
      return simulateApiCall(filtered);
    },
    
    searchCourses: (query: string, filters?: any) => {
      const filtered = mockData.courses.filter(course =>
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.stream.toLowerCase().includes(query.toLowerCase())
      );
      return simulateApiCall(filtered);
    },
    
    searchExams: (query: string, filters?: any) => {
      const filtered = mockData.entranceExams.filter(exam =>
        exam.name.toLowerCase().includes(query.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(query.toLowerCase()) ||
        exam.stream.toLowerCase().includes(query.toLowerCase())
      );
      return simulateApiCall(filtered);
    }
  };
};

// Hook for course recommendations with AI simulation
export const useCourseRecommendations = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Course[]>([]);

  const analyzeAndRecommend = async (formData: any) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const student = mockData.student;
    const recommended = getRecommendedCourses(student);
    
    setRecommendations(recommended);
    setIsAnalyzing(false);
    
    return recommended;
  };

  return {
    isAnalyzing,
    recommendations,
    analyzeAndRecommend,
    clearRecommendations: () => setRecommendations([])
  };
};

// Hook for college suggestions with AI simulation
export const useCollegeSuggestions = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const analyzeAndSuggest = async (inputData: any) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const student = mockData.student;
    const colleges = getRecommendedColleges(student);
    const courses = getRecommendedCourses(student);
    
    // Create college-course combinations with admission probability
    const suggestions = colleges.slice(0, 4).map(college => {
      const course = courses[0]; // Primary recommended course
      const { probability, category } = calculateAdmissionProbability(student, college, course);
      
      return {
        id: `${college.id}_${course.id}`,
        name: college.name,
        location: college.location,
        branch: course.name,
        lastYearCutoff: 'Based on previous year data',
        cutoffMatch: category,
        fees: '₹2.5L/year', // This would come from collegeCourses data
        rating: college.rating,
        ranking: `NIRF Rank: ${college.ranking.nirf}`,
        placements: college.placementStats.averagePackage + ' average package',
        facilities: college.facilities,
        pros: college.pros,
        cons: college.cons,
        hostelInfo: college.hostelInfo,
        seatMatrix: {
          total: 120,
          general: 60,
          obc: 32,
          sc: 18,
          st: 10
        },
        placementStats: college.placementStats,
        reviews: college.reviews,
        admissionProbability: probability
      };
    });
    
    setSuggestions(suggestions);
    setIsAnalyzing(false);
    
    return suggestions;
  };

  return {
    isAnalyzing,
    suggestions,
    analyzeAndSuggest,
    clearSuggestions: () => setSuggestions([])
  };
};

// Hook for entrance exam data
export const useEntranceExams = () => {
  const [exams, setExams] = useState<EntranceExam[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadExams = async (filters?: any) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setExams(mockData.entranceExams);
    setIsLoading(false);
  };

  useEffect(() => {
    loadExams();
  }, []);

  return {
    exams,
    isLoading,
    loadExams,
    searchExams: (query: string) => {
      const filtered = mockData.entranceExams.filter(exam =>
        exam.name.toLowerCase().includes(query.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setExams(filtered);
    }
  };
};

// Hook for study abroad data
export const useStudyAbroad = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountries(mockData.countries);
    setScholarships(mockData.scholarships);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    countries,
    scholarships,
    isLoading,
    loadData,
    getScholarshipsByCountry: (country: string) => {
      return mockData.scholarships.filter(s => 
        s.country.toLowerCase() === country.toLowerCase()
      );
    }
  };
};

// Hook for deadlines
export const useDeadlines = () => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDeadlines = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setDeadlines(mockData.deadlines);
    setIsLoading(false);
  };

  const addDeadline = (deadline: Omit<Deadline, 'id'>) => {
    const newDeadline = {
      ...deadline,
      id: `deadline_${Date.now()}`
    };
    setDeadlines(prev => [...prev, newDeadline]);
  };

  const updateDeadline = (id: string, updates: Partial<Deadline>) => {
    setDeadlines(prev => prev.map(d => 
      d.id === id ? { ...d, ...updates } : d
    ));
  };

  const deleteDeadline = (id: string) => {
    setDeadlines(prev => prev.filter(d => d.id !== id));
  };

  useEffect(() => {
    loadDeadlines();
  }, []);

  return {
    deadlines,
    isLoading,
    loadDeadlines,
    addDeadline,
    updateDeadline,
    deleteDeadline,
    getUpcomingDeadlines: (days: number = 30) => getUpcomingDeadlines(days),
    getDeadlinesByType: (type: Deadline['type']) => getDeadlinesByType(type)
  };
};

// Hook for DreamFit Analyzer
export const useDreamFitAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dreamColleges, setDreamColleges] = useState<any[]>([]);

  const loadDreamColleges = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock dream colleges data
    const colleges = [
      {
        id: 'dream_001',
        name: 'IIT Delhi',
        course: 'Computer Science Engineering',
        location: 'New Delhi',
        type: 'Government' as const,
        ranking: 2,
        fees: '₹2.5L/year',
        lastYearCutoff: {
          general: 95,
          obc: 92,
          sc: 85,
          st: 82,
          ews: 93
        },
        subjectRequirements: {
          physics: 95,
          chemistry: 92,
          mathematics: 98,
          english: 85
        },
        admissionMode: 'Entrance' as const,
        entranceExam: 'JEE Advanced'
      },
      {
        id: 'dream_002',
        name: 'BITS Pilani',
        course: 'Information Technology',
        location: 'Pilani, Rajasthan',
        type: 'Private' as const,
        ranking: 25,
        fees: '₹4.2L/year',
        lastYearCutoff: {
          general: 88,
          obc: 88,
          sc: 88,
          st: 88,
          ews: 88
        },
        subjectRequirements: {
          physics: 90,
          chemistry: 85,
          mathematics: 95,
          english: 80
        },
        admissionMode: 'Entrance' as const,
        entranceExam: 'BITSAT'
      },
      {
        id: 'dream_003',
        name: 'VIT Vellore',
        course: 'Computer Science Engineering',
        location: 'Vellore, Tamil Nadu',
        type: 'Private' as const,
        ranking: 15,
        fees: '₹1.8L/year',
        lastYearCutoff: {
          general: 85,
          obc: 82,
          sc: 75,
          st: 72,
          ews: 83
        },
        subjectRequirements: {
          physics: 85,
          chemistry: 80,
          mathematics: 90,
          english: 75
        },
        admissionMode: 'Both' as const,
        entranceExam: 'VITEEE'
      },
      {
        id: 'dream_004',
        name: 'NIT Trichy',
        course: 'Electronics Engineering',
        location: 'Tiruchirappalli, Tamil Nadu',
        type: 'Government' as const,
        ranking: 8,
        fees: '₹1.2L/year',
        lastYearCutoff: {
          general: 92,
          obc: 88,
          sc: 80,
          st: 75,
          ews: 90
        },
        subjectRequirements: {
          physics: 92,
          chemistry: 88,
          mathematics: 90,
          english: 80
        },
        admissionMode: 'Entrance' as const,
        entranceExam: 'JEE Main'
      },
      {
        id: 'dream_005',
        name: 'SRM Chennai',
        course: 'Data Science',
        location: 'Chennai, Tamil Nadu',
        type: 'Private' as const,
        ranking: 35,
        fees: '₹2.5L/year',
        lastYearCutoff: {
          general: 80,
          obc: 78,
          sc: 70,
          st: 68,
          ews: 79
        },
        subjectRequirements: {
          physics: 80,
          chemistry: 75,
          mathematics: 85,
          english: 75
        },
        admissionMode: 'Both' as const,
        entranceExam: 'SRMJEEE'
      },
      {
        id: 'dream_006',
        name: 'Manipal Institute',
        course: 'Mechanical Engineering',
        location: 'Manipal, Karnataka',
        type: 'Private' as const,
        ranking: 45,
        fees: '₹3.2L/year',
        lastYearCutoff: {
          general: 82,
          obc: 80,
          sc: 72,
          st: 70,
          ews: 81
        },
        subjectRequirements: {
          physics: 85,
          chemistry: 80,
          mathematics: 88,
          english: 75
        },
        admissionMode: 'Entrance' as const,
        entranceExam: 'MET'
      }
    ];
    
    setDreamColleges(colleges);
    setIsAnalyzing(false);
  };

  const analyzeGoal = async (studentData: any) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    return true;
  };

  useEffect(() => {
    loadDreamColleges();
  }, []);

  return {
    dreamColleges,
    isAnalyzing,
    analyzeGoal,
    loadDreamColleges
  };
};