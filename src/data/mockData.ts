// Centralized Mock Data for PickMySeat Application

// Types
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  stream: string;
  marks: {
    physics: number;
    chemistry: number;
    mathematics: number;
    biology: number;
    english: number;
    overall: number;
  };
  interests: string[];
  preferredLocations: string[];
}

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: 'Government' | 'Private' | 'Deemed';
  ranking: {
    nirf: number;
    category: string;
  };
  rating: number;
  totalReviews: number;
  establishedYear: number;
  accreditation: string[];
  facilities: string[];
  hostelInfo: {
    available: boolean;
    fees: string;
    facilities: string[];
  };
  placementStats: {
    averagePackage: string;
    highestPackage: string;
    placementRate: string;
    topRecruiters: string[];
  };
  reviews: {
    rating: number;
    totalReviews: number;
    highlights: string[];
  };
  pros: string[];
  cons: string[];
}

export interface Course {
  id: string;
  name: string;
  stream: 'Engineering' | 'Medical' | 'Arts' | 'Science' | 'Commerce' | 'Management' | 'Law';
  duration: string;
  eligibility: string[];
  description: string;
  skills: string[];
  careerPaths: string[];
  averageSalary: string;
  topColleges: string[];
  admissionMode: 'Merit' | 'Entrance' | 'Both';
}

export interface CollegeCourse {
  id: string;
  collegeId: string;
  courseId: string;
  branch: string;
  fees: string;
  seats: {
    total: number;
    general: number;
    obc: number;
    sc: number;
    st: number;
  };
  cutoff: {
    general: string;
    obc: string;
    sc: string;
    st: string;
  };
  admissionProcess: string;
}

export interface EntranceExam {
  id: string;
  name: string;
  fullName: string;
  conductingBody: string;
  stream: string;
  level: 'National' | 'State' | 'University';
  type: 'UG' | 'PG';
  applicationStart: string;
  applicationEnd: string;
  examDate: string;
  resultDate: string;
  eligibility: {
    percentage: string;
    subjects: string[];
    ageLimit: string;
  };
  testFormat: 'Online' | 'Offline' | 'Both';
  subjects: string[];
  pattern: string;
  duration: string;
  fees: string;
  colleges: number;
  seats: string;
  website: string;
  syllabusLink: string;
  status: 'Open' | 'Closed' | 'Upcoming';
}

export interface Scholarship {
  id: string;
  name: string;
  country: string;
  amount: string;
  eligibility: string[];
  deadline: string;
  type: 'Merit' | 'Need-based' | 'Country-specific' | 'University';
  coverage: string;
  provider: string;
  applicationLink: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  popularCourses: string[];
  avgCost: string;
  duration: string;
  intakeSeasons: string[];
  requirements: string[];
  scholarships: number;
  universities: number;
  rating: number;
  pros: string[];
  cons: string[];
}

export interface Deadline {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Application' | 'Exam' | 'Result' | 'Counselling' | 'Document' | 'Fee Payment';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Upcoming' | 'Today' | 'Overdue' | 'Completed';
  relatedTo: string; // College/Exam ID
  actionRequired: string;
}

// Mock Data

export const mockStudent: Student = {
  id: 'student_001',
  name: 'Arjun Kumar',
  email: 'arjun.kumar@email.com',
  phone: '+91 9876543210',
  state: 'Tamil Nadu',
  stream: 'Science (PCM)',
  marks: {
    physics: 92,
    chemistry: 88,
    mathematics: 95,
    biology: 0,
    english: 85,
    overall: 90
  },
  interests: ['Artificial Intelligence', 'Machine Learning', 'Web Development', 'Data Science'],
  preferredLocations: ['Tamil Nadu', 'Karnataka', 'Maharashtra', 'Delhi']
};

export const mockColleges: College[] = [
  {
    id: 'college_001',
    name: 'IIT Delhi',
    location: 'New Delhi',
    state: 'Delhi',
    type: 'Government',
    ranking: {
      nirf: 2,
      category: 'Engineering'
    },
    rating: 4.8,
    totalReviews: 1250,
    establishedYear: 1961,
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    facilities: ['Research Labs', 'Industry Partnerships', 'International Exchange', 'Central Library', 'Sports Complex'],
    hostelInfo: {
      available: true,
      fees: '₹15,000/year',
      facilities: ['WiFi', 'Mess', 'Gym', 'Library', 'Medical Center']
    },
    placementStats: {
      averagePackage: '₹25L',
      highestPackage: '₹1.2Cr',
      placementRate: '95%',
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs']
    },
    reviews: {
      rating: 4.8,
      totalReviews: 1250,
      highlights: ['Excellent faculty', 'Great campus life', 'Top placements', 'Research opportunities']
    },
    pros: ['Top-tier faculty', 'Excellent placements', 'Strong alumni network', 'Research opportunities'],
    cons: ['High competition', 'Limited seats', 'Intense academic pressure']
  },
  {
    id: 'college_002',
    name: 'BITS Pilani',
    location: 'Pilani',
    state: 'Rajasthan',
    type: 'Private',
    ranking: {
      nirf: 25,
      category: 'Engineering'
    },
    rating: 4.6,
    totalReviews: 890,
    establishedYear: 1964,
    accreditation: ['NAAC A', 'NBA', 'AICTE'],
    facilities: ['Modern Infrastructure', 'Industry Connect', 'Flexible Curriculum', 'Innovation Labs'],
    hostelInfo: {
      available: true,
      fees: '₹45,000/year',
      facilities: ['AC Rooms', 'WiFi', 'Mess', 'Sports Complex', 'Recreation Center']
    },
    placementStats: {
      averagePackage: '₹18L',
      highestPackage: '₹60L',
      placementRate: '92%',
      topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Accenture']
    },
    reviews: {
      rating: 4.6,
      totalReviews: 890,
      highlights: ['Flexible curriculum', 'Good infrastructure', 'Industry exposure', 'Campus culture']
    },
    pros: ['No reservation policy', 'Industry-oriented curriculum', 'Good campus life', 'Flexible academics'],
    cons: ['High fees', 'Limited financial aid', 'Remote location']
  },
  {
    id: 'college_003',
    name: 'VIT Vellore',
    location: 'Vellore',
    state: 'Tamil Nadu',
    type: 'Private',
    ranking: {
      nirf: 15,
      category: 'Engineering'
    },
    rating: 4.4,
    totalReviews: 2100,
    establishedYear: 1984,
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    facilities: ['International Programs', 'Research Centers', 'Sports Complex', 'Modern Labs'],
    hostelInfo: {
      available: true,
      fees: '₹25,000/year',
      facilities: ['WiFi', 'Mess', 'Laundry', 'Recreation', 'Medical Center']
    },
    placementStats: {
      averagePackage: '₹12L',
      highestPackage: '₹45L',
      placementRate: '88%',
      topRecruiters: ['Cognizant', 'HCL', 'Tech Mahindra', 'Capgemini']
    },
    reviews: {
      rating: 4.4,
      totalReviews: 2100,
      highlights: ['International programs', 'Good placement support', 'Modern facilities', 'Diverse student body']
    },
    pros: ['International exposure', 'Good infrastructure', 'Diverse student body', 'Industry connections'],
    cons: ['Large batch size', 'Variable faculty quality', 'High competition']
  },
  {
    id: 'college_004',
    name: 'NIT Trichy',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    type: 'Government',
    ranking: {
      nirf: 8,
      category: 'Engineering'
    },
    rating: 4.5,
    totalReviews: 750,
    establishedYear: 1964,
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    facilities: ['Central Library', 'Research Labs', 'Innovation Center', 'Sports Facilities'],
    hostelInfo: {
      available: true,
      fees: '₹12,000/year',
      facilities: ['WiFi', 'Mess', 'Sports', 'Medical', 'Library']
    },
    placementStats: {
      averagePackage: '₹15L',
      highestPackage: '₹50L',
      placementRate: '90%',
      topRecruiters: ['L&T', 'BHEL', 'ISRO', 'Qualcomm']
    },
    reviews: {
      rating: 4.5,
      totalReviews: 750,
      highlights: ['Strong alumni network', 'Research opportunities', 'Government backing', 'Low fees']
    },
    pros: ['Government college', 'Low fees', 'Strong technical focus', 'Research opportunities'],
    cons: ['Limited industry exposure', 'Traditional approach', 'Infrastructure needs upgrade']
  }
];

export const mockCourses: Course[] = [
  {
    id: 'course_001',
    name: 'Computer Science Engineering',
    stream: 'Engineering',
    duration: '4 years',
    eligibility: ['12th with PCM', 'Minimum 75% marks', 'JEE Main/Advanced'],
    description: 'Comprehensive program covering programming, algorithms, data structures, AI, and software development.',
    skills: ['Programming', 'Data Structures', 'AI/ML', 'Software Development', 'Database Management'],
    careerPaths: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Product Manager', 'Tech Lead'],
    averageSalary: '₹8-15 LPA',
    topColleges: ['college_001', 'college_002', 'college_003'],
    admissionMode: 'Entrance'
  },
  {
    id: 'course_002',
    name: 'Information Technology',
    stream: 'Engineering',
    duration: '4 years',
    eligibility: ['12th with PCM', 'Minimum 75% marks', 'JEE Main/State Exams'],
    description: 'Focus on IT systems, networking, web development, and cybersecurity.',
    skills: ['Web Development', 'Database Management', 'Networking', 'Cybersecurity', 'Cloud Computing'],
    careerPaths: ['IT Consultant', 'System Administrator', 'Web Developer', 'Tech Analyst', 'DevOps Engineer'],
    averageSalary: '₹6-12 LPA',
    topColleges: ['college_002', 'college_003'],
    admissionMode: 'Both'
  },
  {
    id: 'course_003',
    name: 'Electronics Engineering',
    stream: 'Engineering',
    duration: '4 years',
    eligibility: ['12th with PCM', 'Minimum 75% marks', 'JEE Main/State Exams'],
    description: 'Study of electronic circuits, embedded systems, and communication technologies.',
    skills: ['Circuit Design', 'Embedded Systems', 'Signal Processing', 'IoT', 'VLSI Design'],
    careerPaths: ['Electronics Engineer', 'Embedded Developer', 'Hardware Designer', 'R&D Engineer', 'VLSI Engineer'],
    averageSalary: '₹5-10 LPA',
    topColleges: ['college_001', 'college_004'],
    admissionMode: 'Entrance'
  },
  {
    id: 'course_004',
    name: 'Data Science',
    stream: 'Science',
    duration: '3 years',
    eligibility: ['12th with PCM', 'Minimum 70% marks', 'Merit/Entrance'],
    description: 'Interdisciplinary field combining statistics, programming, and domain expertise.',
    skills: ['Statistics', 'Machine Learning', 'Python', 'Data Visualization', 'Big Data'],
    careerPaths: ['Data Scientist', 'ML Engineer', 'Business Analyst', 'Research Scientist', 'Data Engineer'],
    averageSalary: '₹10-18 LPA',
    topColleges: ['college_001', 'college_003'],
    admissionMode: 'Merit'
  }
];

export const mockCollegeCourses: CollegeCourse[] = [
  {
    id: 'cc_001',
    collegeId: 'college_001',
    courseId: 'course_001',
    branch: 'Computer Science Engineering',
    fees: '₹2.5L/year',
    seats: {
      total: 120,
      general: 60,
      obc: 32,
      sc: 18,
      st: 10
    },
    cutoff: {
      general: 'JEE Rank: 150-200',
      obc: 'JEE Rank: 300-400',
      sc: 'JEE Rank: 800-1000',
      st: 'JEE Rank: 1200-1500'
    },
    admissionProcess: 'JEE Advanced + Counselling'
  },
  {
    id: 'cc_002',
    collegeId: 'college_002',
    courseId: 'course_002',
    branch: 'Information Technology',
    fees: '₹4.2L/year',
    seats: {
      total: 150,
      general: 150,
      obc: 0,
      sc: 0,
      st: 0
    },
    cutoff: {
      general: 'BITSAT: 380+',
      obc: 'N/A',
      sc: 'N/A',
      st: 'N/A'
    },
    admissionProcess: 'BITSAT + Merit List'
  },
  {
    id: 'cc_003',
    collegeId: 'college_003',
    courseId: 'course_001',
    branch: 'Computer Science Engineering',
    fees: '₹1.8L/year',
    seats: {
      total: 240,
      general: 120,
      obc: 65,
      sc: 36,
      st: 19
    },
    cutoff: {
      general: 'VITEEE: Rank 1-5000',
      obc: 'VITEEE: Rank 1-8000',
      sc: 'VITEEE: Rank 1-12000',
      st: 'VITEEE: Rank 1-15000'
    },
    admissionProcess: 'VITEEE + Counselling'
  }
];

export const mockEntranceExams: EntranceExam[] = [
  {
    id: 'exam_001',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    conductingBody: 'National Testing Agency (NTA)',
    stream: 'Engineering',
    level: 'National',
    type: 'UG',
    applicationStart: '2024-01-15',
    applicationEnd: '2024-03-15',
    examDate: '2024-04-15',
    resultDate: '2024-05-15',
    eligibility: {
      percentage: '75% in 12th (65% for SC/ST)',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      ageLimit: '25 years (30 for SC/ST)'
    },
    testFormat: 'Online',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    pattern: 'Multiple Choice Questions',
    duration: '3 hours',
    fees: '₹1,000',
    colleges: 1500,
    seats: '2.5 Lakh',
    website: 'https://jeemain.nta.nic.in',
    syllabusLink: 'https://jeemain.nta.nic.in/syllabus',
    status: 'Open'
  },
  {
    id: 'exam_002',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    conductingBody: 'National Testing Agency (NTA)',
    stream: 'Medical',
    level: 'National',
    type: 'UG',
    applicationStart: '2024-02-01',
    applicationEnd: '2024-03-20',
    examDate: '2024-05-05',
    resultDate: '2024-06-05',
    eligibility: {
      percentage: '50% in 12th (40% for SC/ST/OBC)',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      ageLimit: '25 years (30 for SC/ST/OBC)'
    },
    testFormat: 'Offline',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    pattern: 'Multiple Choice Questions',
    duration: '3 hours 20 minutes',
    fees: '₹1,700',
    colleges: 600,
    seats: '1.8 Lakh',
    website: 'https://neet.nta.nic.in',
    syllabusLink: 'https://neet.nta.nic.in/syllabus',
    status: 'Open'
  },
  {
    id: 'exam_003',
    name: 'BITSAT',
    fullName: 'Birla Institute of Technology and Science Admission Test',
    conductingBody: 'BITS Pilani',
    stream: 'Engineering',
    level: 'University',
    type: 'UG',
    applicationStart: '2024-01-10',
    applicationEnd: '2024-03-10',
    examDate: '2024-05-20',
    resultDate: '2024-06-20',
    eligibility: {
      percentage: '75% in 12th',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      ageLimit: 'No age limit'
    },
    testFormat: 'Online',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'],
    pattern: 'Computer Based Test',
    duration: '3 hours',
    fees: '₹3,400',
    colleges: 4,
    seats: '2,000',
    website: 'https://www.bitsadmission.com',
    syllabusLink: 'https://www.bitsadmission.com/syllabus',
    status: 'Closed'
  }
];

export const mockScholarships: Scholarship[] = [
  {
    id: 'scholarship_001',
    name: 'Fulbright Scholarship',
    country: 'USA',
    amount: 'Full funding',
    eligibility: ['Bachelor\'s degree', 'Strong academic record', 'Leadership experience'],
    deadline: '2024-05-15',
    type: 'Merit',
    coverage: 'Tuition, living expenses, travel',
    provider: 'US Government',
    applicationLink: 'https://fulbright.org'
  },
  {
    id: 'scholarship_002',
    name: 'Chevening Scholarship',
    country: 'UK',
    amount: 'Full funding',
    eligibility: ['Bachelor\'s degree', '2+ years work experience', 'Leadership potential'],
    deadline: '2024-11-07',
    type: 'Merit',
    coverage: 'Tuition, living allowance, travel',
    provider: 'UK Government',
    applicationLink: 'https://chevening.org'
  },
  {
    id: 'scholarship_003',
    name: 'Australia Awards',
    country: 'Australia',
    amount: 'Full funding',
    eligibility: ['Bachelor\'s degree', 'Work experience', 'Development focus'],
    deadline: '2024-04-30',
    type: 'Country-specific',
    coverage: 'Tuition, living expenses, health cover',
    provider: 'Australian Government',
    applicationLink: 'https://australiaawards.gov.au'
  }
];

export const mockCountries: Country[] = [
  {
    id: 'country_001',
    name: 'United States',
    flag: '🇺🇸',
    description: 'World-class universities with diverse programs and research opportunities',
    popularCourses: ['Computer Science', 'Business Administration', 'Engineering', 'Medicine'],
    avgCost: '$30,000 - $70,000/year',
    duration: '4 years (Bachelor), 2 years (Master)',
    intakeSeasons: ['Fall (September)', 'Spring (January)', 'Summer (May)'],
    requirements: ['TOEFL/IELTS', 'SAT/GRE/GMAT', 'SOP', 'LOR', 'Transcripts'],
    scholarships: 500,
    universities: 4000,
    rating: 4.8,
    pros: ['Top-ranked universities', 'Research opportunities', 'Diverse culture', 'Post-study work options'],
    cons: ['High cost', 'Competitive admission', 'Visa complexity']
  },
  {
    id: 'country_002',
    name: 'Canada',
    flag: '🇨🇦',
    description: 'Affordable education with excellent quality and immigration opportunities',
    popularCourses: ['Engineering', 'Computer Science', 'Healthcare', 'Business'],
    avgCost: '$15,000 - $35,000/year',
    duration: '4 years (Bachelor), 1-2 years (Master)',
    intakeSeasons: ['Fall (September)', 'Winter (January)', 'Summer (May)'],
    requirements: ['IELTS/TOEFL', 'SAT/GRE', 'SOP', 'LOR', 'Transcripts'],
    scholarships: 300,
    universities: 200,
    rating: 4.7,
    pros: ['Affordable tuition', 'Immigration pathways', 'Safe environment', 'Quality education'],
    cons: ['Cold climate', 'Limited universities', 'Competitive programs']
  }
];

export const mockDeadlines: Deadline[] = [
  {
    id: 'deadline_001',
    title: 'JEE Main Application Deadline',
    description: 'Last date to apply for JEE Main 2024',
    date: '2024-03-15',
    type: 'Application',
    priority: 'High',
    status: 'Upcoming',
    relatedTo: 'exam_001',
    actionRequired: 'Complete application form and pay fees'
  },
  {
    id: 'deadline_002',
    title: 'NEET Exam Date',
    description: 'NEET UG 2024 examination',
    date: '2024-05-05',
    type: 'Exam',
    priority: 'High',
    status: 'Upcoming',
    relatedTo: 'exam_002',
    actionRequired: 'Download admit card and prepare for exam'
  },
  {
    id: 'deadline_003',
    title: 'IIT Delhi Document Verification',
    description: 'Document verification for admitted students',
    date: '2024-07-20',
    type: 'Document',
    priority: 'Medium',
    status: 'Upcoming',
    relatedTo: 'college_001',
    actionRequired: 'Prepare and submit required documents'
  },
  {
    id: 'deadline_004',
    title: 'BITS Pilani Fee Payment',
    description: 'Last date for fee payment',
    date: '2024-08-15',
    type: 'Fee Payment',
    priority: 'High',
    status: 'Upcoming',
    relatedTo: 'college_002',
    actionRequired: 'Pay admission fees online'
  }
];

// Utility functions to get related data
export const getCollegeById = (id: string): College | undefined => {
  return mockColleges.find(college => college.id === id);
};

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getExamById = (id: string): EntranceExam | undefined => {
  return mockEntranceExams.find(exam => exam.id === id);
};

export const getCollegeCoursesByCollegeId = (collegeId: string): CollegeCourse[] => {
  return mockCollegeCourses.filter(cc => cc.collegeId === collegeId);
};

export const getCollegeCoursesByCourseId = (courseId: string): CollegeCourse[] => {
  return mockCollegeCourses.filter(cc => cc.courseId === courseId);
};

export const getScholarshipsByCountry = (country: string): Scholarship[] => {
  return mockScholarships.filter(scholarship => 
    scholarship.country.toLowerCase() === country.toLowerCase()
  );
};

export const getDeadlinesByType = (type: Deadline['type']): Deadline[] => {
  return mockDeadlines.filter(deadline => deadline.type === type);
};

export const getUpcomingDeadlines = (days: number = 30): Deadline[] => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
  
  return mockDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= futureDate && deadline.status !== 'Completed';
  });
};

// AI Recommendation Engine Mock Functions
export const getRecommendedCourses = (student: Student): Course[] => {
  // Simple recommendation logic based on marks and interests
  const { marks, interests, stream } = student;
  
  let recommendedCourses = mockCourses.filter(course => {
    // Filter by stream compatibility
    if (stream.includes('PCM') && course.stream === 'Engineering') return true;
    if (stream.includes('PCB') && course.stream === 'Medical') return true;
    if (course.stream === 'Science') return true;
    return false;
  });

  // Sort by relevance to interests
  recommendedCourses = recommendedCourses.sort((a, b) => {
    const aScore = a.skills.filter(skill => 
      interests.some(interest => interest.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    const bScore = b.skills.filter(skill => 
      interests.some(interest => interest.toLowerCase().includes(skill.toLowerCase()))
    ).length;
    return bScore - aScore;
  });

  return recommendedCourses.slice(0, 4);
};

export const getRecommendedColleges = (student: Student): College[] => {
  const { preferredLocations, marks } = student;
  
  let recommendedColleges = mockColleges.filter(college => 
    preferredLocations.some(location => 
      college.state.toLowerCase().includes(location.toLowerCase()) ||
      college.location.toLowerCase().includes(location.toLowerCase())
    )
  );

  // If no location matches, include all colleges
  if (recommendedColleges.length === 0) {
    recommendedColleges = [...mockColleges];
  }

  // Sort by rating and ranking
  recommendedColleges = recommendedColleges.sort((a, b) => {
    const aScore = a.rating + (100 - a.ranking.nirf) / 100;
    const bScore = b.rating + (100 - b.ranking.nirf) / 100;
    return bScore - aScore;
  });

  return recommendedColleges;
};

export const calculateAdmissionProbability = (
  student: Student, 
  college: College, 
  course: Course
): { probability: number; category: 'Safe' | 'Moderate' | 'Reach' } => {
  const { marks } = student;
  const avgMarks = marks.overall;
  
  // Simple probability calculation based on college ranking and student marks
  let probability = 0;
  
  if (college.ranking.nirf <= 10) {
    // Top 10 colleges
    if (avgMarks >= 95) probability = 85;
    else if (avgMarks >= 90) probability = 70;
    else if (avgMarks >= 85) probability = 50;
    else probability = 30;
  } else if (college.ranking.nirf <= 50) {
    // Top 50 colleges
    if (avgMarks >= 90) probability = 90;
    else if (avgMarks >= 85) probability = 75;
    else if (avgMarks >= 80) probability = 60;
    else probability = 40;
  } else {
    // Other colleges
    if (avgMarks >= 85) probability = 95;
    else if (avgMarks >= 80) probability = 85;
    else if (avgMarks >= 75) probability = 70;
    else probability = 50;
  }

  let category: 'Safe' | 'Moderate' | 'Reach';
  if (probability >= 80) category = 'Safe';
  else if (probability >= 60) category = 'Moderate';
  else category = 'Reach';

  return { probability, category };
};

// Export all mock data as a single object for easy importing
export const mockData = {
  student: mockStudent,
  colleges: mockColleges,
  courses: mockCourses,
  collegeCourses: mockCollegeCourses,
  entranceExams: mockEntranceExams,
  scholarships: mockScholarships,
  countries: mockCountries,
  deadlines: mockDeadlines
};