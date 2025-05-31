// Types for the resume data structure
interface Resume {
  basic_info: {
    full_name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    location: string;
  };
  education: {
    degree: string;
    university: string;
    graduation_year: number;
    gpa?: number;
  };
  current_job: {
    job_title: string;
    company: string;
    start_date: string;
    end_date: string;
    responsibilities: string[];
  };
  past_experience: Array<{
    job_title: string;
    company: string;
    start_date: string;
    end_date: string;
    responsibilities: string[];
  }>;
  skills: {
    technical_skills: string[];
    soft_skills: string[];
  };
  projects: Array<{
    project_name: string;
    description: string;
    tech_stack: string[];
    github_url?: string;
    demo_url?: string;
  }>;
  online_profiles: {
    linkedin_url: string;
    github_url: string;
    portfolio_url?: string;
  };
  certifications?: Array<{
    course_name: string;
    provider: string;
    completion_date: string;
  }>;
  languages_known: Array<{
    language: string;
    proficiency: string;
  }>;
}

export const mockResumes: Resume[] = [
  // GenAI Engineer 1
  {
    basic_info: {
      full_name: "Sophia Chen",
      age: 29,
      gender: "Female",
      email: "sophia.chen@email.com",
      phone: "+1 (415) 555-0123",
      location: "San Francisco, USA"
    },
    education: {
      degree: "Master's in Computer Science, AI Specialization",
      university: "Stanford University",
      graduation_year: 2020,
      gpa: 3.92
    },
    current_job: {
      job_title: "Senior GenAI Engineer",
      company: "InnovAI Solutions",
      start_date: "2021-03",
      end_date: "Present",
      responsibilities: [
        "Lead development of large language models with focus on domain adaptation and few-shot learning",
        "Architected and implemented a novel prompt engineering framework reducing inference costs by 40%",
        "Manage a team of 4 ML engineers and coordinate with cross-functional teams",
        "Developed custom training pipelines for efficient fine-tuning of foundation models"
      ]
    },
    past_experience: [
      {
        job_title: "Machine Learning Engineer",
        company: "TechCorp AI",
        start_date: "2020-01",
        end_date: "2021-02",
        responsibilities: [
          "Implemented BERT-based models for natural language understanding tasks",
          "Reduced model inference time by 60% through quantization and optimization",
          "Developed data pipeline processing over 1M documents daily"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Python",
        "PyTorch",
        "Transformers",
        "CUDA",
        "FastAPI",
        "Docker",
        "MLflow",
        "Kubernetes",
        "LangChain",
        "Hugging Face"
      ],
      soft_skills: [
        "Technical Leadership",
        "Project Management",
        "Research Oriented",
        "Cross-functional Collaboration",
        "Problem Solving"
      ]
    },
    projects: [
      {
        project_name: "MultiModal-GPT",
        description: "Developed a custom multimodal LLM capable of understanding and generating both text and images. Achieved 92% accuracy on benchmark tests and reduced training time by 35% through innovative architecture design.",
        tech_stack: ["Python", "PyTorch", "Transformers", "CUDA", "Docker"],
        github_url: "https://github.com/sophiachen/multimodal-gpt"
      },
      {
        project_name: "AutoPrompt Framework",
        description: "Created an automated prompt engineering framework that dynamically optimizes prompts based on context and task requirements. Deployed in production serving 100K+ daily requests.",
        tech_stack: ["Python", "LangChain", "FastAPI", "Redis", "PostgreSQL"],
        demo_url: "https://autoprompt.innovai.tech"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/sophia-chen-ai",
      github_url: "https://github.com/sophiachen",
      portfolio_url: "https://sophia-chen.ai"
    },
    certifications: [
      {
        course_name: "Deep Learning Specialization",
        provider: "DeepLearning.AI",
        completion_date: "2020-12"
      },
      {
        course_name: "MLOps Engineering",
        provider: "Google Cloud",
        completion_date: "2021-06"
      }
    ],
    languages_known: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "Mandarin",
        proficiency: "Fluent"
      }
    ]
  },

  // GenAI Engineer 2
  {
    basic_info: {
      full_name: "Raj Malhotra",
      age: 33,
      gender: "Male",
      email: "raj.malhotra@email.com",
      phone: "+1 (408) 555-0198",
      location: "Mountain View, USA"
    },
    education: {
      degree: "Ph.D. in Natural Language Processing",
      university: "University of California, Berkeley",
      graduation_year: 2018,
      gpa: 3.94
    },
    current_job: {
      job_title: "Principal AI Engineer",
      company: "LanguageAI Labs",
      start_date: "2020-04",
      end_date: "Present",
      responsibilities: [
        "Lead research and development of multilingual language models",
        "Developed novel attention mechanisms improving model efficiency by 35%",
        "Manage team of 8 AI researchers and engineers",
        "Published 5 papers in top NLP conferences"
      ]
    },
    past_experience: [
      {
        job_title: "Senior ML Engineer",
        company: "Search Giant Corp",
        start_date: "2018-06",
        end_date: "2020-03",
        responsibilities: [
          "Developed large-scale language models for search ranking",
          "Improved search relevance by 25% through advanced NLP techniques",
          "Led team of 4 ML engineers in model deployment and optimization"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "JAX",
        "CUDA",
        "Transformers",
        "LangChain",
        "Ray",
        "Docker",
        "Kubernetes",
        "MLflow",
        "Vector Databases"
      ],
      soft_skills: [
        "Research Leadership",
        "Technical Writing",
        "Team Management",
        "Problem Solving",
        "Cross-functional Collaboration"
      ]
    },
    projects: [
      {
        project_name: "MultiLingualGPT",
        description: "Developed multilingual language model supporting 50+ languages with state-of-the-art performance. Achieved 95% accuracy on cross-lingual transfer tasks.",
        tech_stack: ["Python", "PyTorch", "CUDA", "Transformers", "MLflow"],
        github_url: "https://github.com/rajmalhotra/multilingual-gpt"
      },
      {
        project_name: "EfficientAttention",
        description: "Created novel attention mechanism reducing memory usage by 60% while maintaining model performance. Implementation adopted by multiple open-source projects.",
        tech_stack: ["Python", "JAX", "CUDA", "C++"],
        github_url: "https://github.com/rajmalhotra/efficient-attention"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/raj-malhotra-ai",
      github_url: "https://github.com/rajmalhotra",
      portfolio_url: "https://raj-malhotra.ai"
    },
    certifications: [
      {
        course_name: "Advanced Deep Learning Specialization",
        provider: "Stanford Online",
        completion_date: "2021-03"
      },
      {
        course_name: "MLOps Specialization",
        provider: "Google Cloud",
        completion_date: "2022-01"
      }
    ],
    languages_known: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "Hindi",
        proficiency: "Native"
      },
      {
        language: "Python",
        proficiency: "Expert"
      }
    ]
  },

  // GenAI Engineer 3
  {
    basic_info: {
      full_name: "Emma Fischer",
      age: 30,
      gender: "Female",
      email: "emma.fischer@email.com",
      phone: "+49 151 5555 4321",
      location: "Munich, Germany"
    },
    education: {
      degree: "M.Sc. in Artificial Intelligence",
      university: "Technical University of Munich",
      graduation_year: 2019,
      gpa: 3.91
    },
    current_job: {
      job_title: "Lead AI Research Engineer",
      company: "DeepTech GmbH",
      start_date: "2021-01",
      end_date: "Present",
      responsibilities: [
        "Lead development of multimodal AI models for enterprise applications",
        "Pioneered new approach to few-shot learning reducing data requirements by 80%",
        "Manage research collaboration with top European universities",
        "Direct team of 6 AI researchers and engineers"
      ]
    },
    past_experience: [
      {
        job_title: "AI Research Engineer",
        company: "AI Solutions AG",
        start_date: "2019-03",
        end_date: "2020-12",
        responsibilities: [
          "Developed computer vision models for autonomous systems",
          "Improved model robustness through advanced data augmentation",
          "Implemented efficient training pipelines for large-scale models"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "Computer Vision",
        "NLP",
        "CUDA",
        "Docker",
        "Ray",
        "MLflow",
        "DVC",
        "FastAPI",
        "Weights & Biases"
      ],
      soft_skills: [
        "Research Direction",
        "Team Leadership",
        "Academic Collaboration",
        "Technical Writing",
        "Project Management"
      ]
    },
    projects: [
      {
        project_name: "MultiModal-Learner",
        description: "Developed innovative multimodal learning framework combining vision, text, and audio inputs. Achieved state-of-the-art results on multiple benchmark datasets.",
        tech_stack: ["Python", "PyTorch", "CUDA", "Transformers", "Ray"],
        github_url: "https://github.com/emmafischer/multimodal-learner"
      },
      {
        project_name: "FewShotVision",
        description: "Created novel few-shot learning architecture for computer vision tasks. Reduced required training data by 80% while maintaining 95% accuracy.",
        tech_stack: ["Python", "PyTorch", "OpenCV", "MLflow", "Docker"],
        github_url: "https://github.com/emmafischer/fewshot-vision"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/emma-fischer-ai",
      github_url: "https://github.com/emmafischer",
      portfolio_url: "https://emma-fischer.ai"
    },
    certifications: [
      {
        course_name: "Deep Learning Expert Certification",
        provider: "NVIDIA Deep Learning Institute",
        completion_date: "2021-06"
      },
      {
        course_name: "MLOps Engineering Professional",
        provider: "DataCamp",
        completion_date: "2022-02"
      }
    ],
    languages_known: [
      {
        language: "German",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "French",
        proficiency: "Intermediate"
      }
    ]
  },

  // Full Stack Developer 1
  {
    basic_info: {
      full_name: "Alexander Kumar",
      age: 31,
      gender: "Male",
      email: "alex.kumar@email.com",
      phone: "+1 (206) 555-0456",
      location: "Seattle, USA"
    },
    education: {
      degree: "B.S. in Computer Science",
      university: "University of Washington",
      graduation_year: 2018,
      gpa: 3.85
    },
    current_job: {
      job_title: "Senior Full Stack Developer",
      company: "CloudScale Technologies",
      start_date: "2020-06",
      end_date: "Present",
      responsibilities: [
        "Lead developer for cloud-native microservices architecture serving 1M+ users",
        "Implemented real-time collaboration features using WebSocket and Redis",
        "Mentored junior developers and established coding standards",
        "Reduced API response times by 65% through caching and optimization"
      ]
    },
    past_experience: [
      {
        job_title: "Full Stack Developer",
        company: "TechStart Solutions",
        start_date: "2018-07",
        end_date: "2020-05",
        responsibilities: [
          "Developed and maintained multiple React-based web applications",
          "Implemented CI/CD pipelines reducing deployment time by 70%",
          "Built RESTful APIs using Node.js and Express"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Python",
        "Docker",
        "AWS",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "GraphQL",
        "Kubernetes"
      ],
      soft_skills: [
        "Team Leadership",
        "Agile Methodology",
        "Problem Solving",
        "Technical Documentation",
        "Mentoring"
      ]
    },
    projects: [
      {
        project_name: "RealTimeCollab",
        description: "Built a collaborative document editing platform supporting real-time synchronization for 100+ simultaneous users. Implemented custom operational transformation algorithm reducing conflict resolution time by 80%.",
        tech_stack: ["React", "Node.js", "WebSocket", "Redis", "MongoDB"],
        github_url: "https://github.com/alexkumar/realtime-collab",
        demo_url: "https://realtime-collab.dev"
      },
      {
        project_name: "CloudScale Dashboard",
        description: "Developed a real-time monitoring dashboard for cloud resources with predictive scaling capabilities. Reduced infrastructure costs by 45% through intelligent resource allocation.",
        tech_stack: ["TypeScript", "React", "GraphQL", "AWS", "Terraform"],
        github_url: "https://github.com/alexkumar/cloudscale-dashboard"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/alexander-kumar",
      github_url: "https://github.com/alexkumar",
      portfolio_url: "https://alexkumar.dev"
    },
    certifications: [
      {
        course_name: "AWS Solutions Architect",
        provider: "Amazon Web Services",
        completion_date: "2021-03"
      }
    ],
    languages_known: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "Hindi",
        proficiency: "Intermediate"
      }
    ]
  },

  // Flutter Developer 1
  {
    basic_info: {
      full_name: "Priya Sharma",
      age: 28,
      gender: "Female",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      location: "Bangalore, India"
    },
    education: {
      degree: "B.Tech in Information Technology",
      university: "National Institute of Technology, Bangalore",
      graduation_year: 2019,
      gpa: 3.8
    },
    current_job: {
      job_title: "Senior Flutter Developer",
      company: "MobileFirst Solutions",
      start_date: "2021-01",
      end_date: "Present",
      responsibilities: [
        "Lead developer for cross-platform mobile applications serving 500K+ users",
        "Implemented complex state management solutions using BLoC pattern",
        "Reduced app size by 40% through code optimization and asset management",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    past_experience: [
      {
        job_title: "Mobile App Developer",
        company: "TechStartup India",
        start_date: "2019-06",
        end_date: "2020-12",
        responsibilities: [
          "Developed and maintained multiple Flutter applications",
          "Implemented real-time chat features using Firebase",
          "Integrated payment gateways and third-party APIs"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Flutter",
        "Dart",
        "Firebase",
        "REST APIs",
        "Git",
        "SQLite",
        "BLoC Pattern",
        "Provider",
        "GetX",
        "CI/CD"
      ],
      soft_skills: [
        "Problem Solving",
        "Team Leadership",
        "Communication",
        "Time Management",
        "Mentoring"
      ]
    },
    projects: [
      {
        project_name: "HealthTracker Pro",
        description: "Developed a comprehensive health tracking app with real-time monitoring, custom animations, and integration with wearable devices. Achieved 4.8/5 rating on Play Store with 100K+ downloads.",
        tech_stack: ["Flutter", "Dart", "Firebase", "BLoC", "HealthKit", "Google Fit API"],
        github_url: "https://github.com/priyasharma/health-tracker-pro",
        demo_url: "https://play.google.com/store/apps/healthtracker-pro"
      },
      {
        project_name: "SecureChat",
        description: "Built an end-to-end encrypted messaging app with support for voice/video calls and file sharing. Implemented custom encryption protocols and offline message queuing.",
        tech_stack: ["Flutter", "Dart", "WebRTC", "SQLite", "GetX"],
        github_url: "https://github.com/priyasharma/secure-chat"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/priya-sharma-dev",
      github_url: "https://github.com/priyasharma",
      portfolio_url: "https://priyasharma.dev"
    },
    certifications: [
      {
        course_name: "Flutter Development Bootcamp",
        provider: "Udacity",
        completion_date: "2020-03"
      }
    ],
    languages_known: [
      {
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "Hindi",
        proficiency: "Native"
      }
    ]
  },

  // Backend Engineer 1
  {
    basic_info: {
      full_name: "Marcus Schmidt",
      age: 33,
      gender: "Male",
      email: "marcus.schmidt@email.com",
      phone: "+49 176 55550123",
      location: "Berlin, Germany"
    },
    education: {
      degree: "M.Sc. in Computer Science",
      university: "Technical University of Berlin",
      graduation_year: 2017,
      gpa: 3.9
    },
    current_job: {
      job_title: "Senior Backend Engineer",
      company: "DataScale GmbH",
      start_date: "2019-04",
      end_date: "Present",
      responsibilities: [
        "Architect and maintain high-performance microservices processing 10M+ daily transactions",
        "Lead migration from monolith to microservices architecture",
        "Implement event-driven architecture using Apache Kafka",
        "Design and optimize database schemas for scalability"
      ]
    },
    past_experience: [
      {
        job_title: "Backend Developer",
        company: "FinTech Solutions",
        start_date: "2017-08",
        end_date: "2019-03",
        responsibilities: [
          "Developed RESTful APIs using Spring Boot",
          "Implemented real-time payment processing system",
          "Optimized database queries reducing response time by 70%"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Java",
        "Spring Boot",
        "Kotlin",
        "PostgreSQL",
        "MongoDB",
        "Apache Kafka",
        "Docker",
        "Kubernetes",
        "AWS",
        "Microservices"
      ],
      soft_skills: [
        "System Design",
        "Technical Leadership",
        "Problem Solving",
        "Team Collaboration",
        "Documentation"
      ]
    },
    projects: [
      {
        project_name: "EventFlow Platform",
        description: "Designed and implemented a distributed event processing platform handling 100K events/second. Achieved 99.99% uptime and sub-millisecond latency through innovative architecture.",
        tech_stack: ["Kotlin", "Spring Boot", "Kafka", "Redis", "PostgreSQL"],
        github_url: "https://github.com/mschmidt/eventflow"
      },
      {
        project_name: "DataScale Cache",
        description: "Built a distributed caching solution with automatic failover and data replication. Reduced database load by 80% and improved response times by 95%.",
        tech_stack: ["Java", "Redis", "Hazelcast", "Spring Boot", "Prometheus"],
        github_url: "https://github.com/mschmidt/datascale-cache"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/marcus-schmidt",
      github_url: "https://github.com/mschmidt",
      portfolio_url: "https://marcus-schmidt.dev"
    },
    certifications: [
      {
        course_name: "AWS Solutions Architect Professional",
        provider: "Amazon Web Services",
        completion_date: "2021-05"
      },
      {
        course_name: "Certified Kubernetes Administrator",
        provider: "Cloud Native Computing Foundation",
        completion_date: "2020-11"
      }
    ],
    languages_known: [
      {
        language: "German",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      }
    ]
  },

  // Frontend Engineer 1
  {
    basic_info: {
      full_name: "Isabella Martinez",
      age: 30,
      gender: "Female",
      email: "isabella.martinez@email.com",
      phone: "+55 11 98765-4321",
      location: "São Paulo, Brazil"
    },
    education: {
      degree: "B.S. in Computer Engineering",
      university: "University of São Paulo",
      graduation_year: 2018,
      gpa: 3.75
    },
    current_job: {
      job_title: "Senior Frontend Engineer",
      company: "TechBrasil",
      start_date: "2020-03",
      end_date: "Present",
      responsibilities: [
        "Lead frontend development for enterprise SaaS platform serving 200+ corporate clients",
        "Implemented micro-frontend architecture reducing deployment complexity by 60%",
        "Established design system and component library used across multiple products",
        "Mentored junior developers and conducted technical interviews"
      ]
    },
    past_experience: [
      {
        job_title: "Frontend Developer",
        company: "Digital Solutions SA",
        start_date: "2018-06",
        end_date: "2020-02",
        responsibilities: [
          "Developed responsive web applications using React and TypeScript",
          "Implemented A/B testing framework increasing conversion rates by 25%",
          "Optimized frontend performance reducing load time by 40%"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Vue.js",
        "Webpack",
        "CSS-in-JS",
        "GraphQL",
        "Jest",
        "Cypress"
      ],
      soft_skills: [
        "UI/UX Design",
        "Technical Leadership",
        "Problem Solving",
        "Communication",
        "Mentoring"
      ]
    },
    projects: [
      {
        project_name: "DesignSystem Pro",
        description: "Created a comprehensive design system and component library used by 50+ developers. Reduced development time by 40% and improved UI consistency across products.",
        tech_stack: ["React", "TypeScript", "Storybook", "Styled Components", "Jest"],
        github_url: "https://github.com/isabellamartinez/design-system-pro",
        demo_url: "https://design-system-pro.dev"
      },
      {
        project_name: "Analytics Dashboard",
        description: "Built a real-time analytics dashboard with complex data visualizations and interactive reports. Processed and displayed millions of data points with optimal performance.",
        tech_stack: ["React", "D3.js", "GraphQL", "WebSocket", "Material-UI"],
        github_url: "https://github.com/isabellamartinez/analytics-dashboard"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/isabella-martinez",
      github_url: "https://github.com/isabellamartinez",
      portfolio_url: "https://isabella-martinez.dev"
    },
    certifications: [
      {
        course_name: "Advanced React Patterns",
        provider: "Frontend Masters",
        completion_date: "2021-02"
      }
    ],
    languages_known: [
      {
        language: "Portuguese",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "Spanish",
        proficiency: "Intermediate"
      }
    ]
  },

  // Product Manager 1
  {
    basic_info: {
      full_name: "Sarah Thompson",
      age: 35,
      gender: "Female",
      email: "sarah.thompson@email.com",
      phone: "+1 (647) 555-0189",
      location: "Toronto, Canada"
    },
    education: {
      degree: "MBA, Technology Management",
      university: "University of Toronto",
      graduation_year: 2016,
      gpa: 3.95
    },
    current_job: {
      job_title: "Senior Product Manager",
      company: "InnovateNow Technologies",
      start_date: "2019-01",
      end_date: "Present",
      responsibilities: [
        "Lead product strategy for AI-powered enterprise collaboration platform",
        "Grew monthly recurring revenue from $500K to $2.5M in 18 months",
        "Manage cross-functional team of 15 engineers, designers, and data scientists",
        "Define product roadmap and KPIs aligned with business objectives"
      ]
    },
    past_experience: [
      {
        job_title: "Product Manager",
        company: "TechVision Corp",
        start_date: "2016-06",
        end_date: "2018-12",
        responsibilities: [
          "Led development of mobile-first SaaS platform from concept to launch",
          "Increased user engagement by 200% through data-driven feature optimization",
          "Conducted user research and competitive analysis to inform product decisions"
        ]
      },
      {
        job_title: "Business Analyst",
        company: "ConsultTech",
        start_date: "2014-03",
        end_date: "2016-05",
        responsibilities: [
          "Analyzed market trends and user behavior to identify product opportunities",
          "Created detailed product specifications and user stories"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Product Strategy",
        "Agile/Scrum",
        "Data Analytics",
        "SQL",
        "JIRA",
        "Figma",
        "A/B Testing",
        "User Research",
        "Product Analytics",
        "API Design"
      ],
      soft_skills: [
        "Leadership",
        "Strategic Thinking",
        "Stakeholder Management",
        "Communication",
        "Problem Solving"
      ]
    },
    projects: [
      {
        project_name: "CollabAI Platform",
        description: "Led development of AI-powered collaboration platform from inception to launch. Achieved 150% year-over-year growth and 95% customer retention rate.",
        tech_stack: ["Product Management", "AI/ML", "Analytics", "Enterprise Software"],
        demo_url: "https://collab-ai.innovatenow.com"
      },
      {
        project_name: "Mobile Engagement Suite",
        description: "Conceptualized and launched mobile engagement platform serving 1M+ users. Increased customer satisfaction score from 7.5 to 9.2.",
        tech_stack: ["Mobile Strategy", "User Analytics", "CRM Integration"],
        demo_url: "https://mobile.techvision.com"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/sarah-thompson-product",
      github_url: "https://github.com/sarahthompson",
      portfolio_url: "https://sarah-thompson.com"
    },
    certifications: [
      {
        course_name: "Professional Scrum Product Owner II",
        provider: "Scrum.org",
        completion_date: "2020-09"
      },
      {
        course_name: "Product Analytics Certification",
        provider: "Product School",
        completion_date: "2021-03"
      }
    ],
    languages_known: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "French",
        proficiency: "Intermediate"
      }
    ]
  },

  // Project Manager 1
  {
    basic_info: {
      full_name: "David Kim",
      age: 38,
      gender: "Male",
      email: "david.kim@email.com",
      phone: "+82 10-5555-1234",
      location: "Seoul, South Korea"
    },
    education: {
      degree: "M.S. in Project Management",
      university: "Seoul National University",
      graduation_year: 2012,
      gpa: 3.88
    },
    current_job: {
      job_title: "Senior Project Manager",
      company: "Global Tech Solutions",
      start_date: "2018-04",
      end_date: "Present",
      responsibilities: [
        "Lead multiple cross-functional teams delivering enterprise software solutions",
        "Managed $5M+ annual budget across various projects",
        "Implemented Agile transformation reducing time-to-market by 40%",
        "Established PMO best practices and project governance framework"
      ]
    },
    past_experience: [
      {
        job_title: "Technical Project Manager",
        company: "Digital Innovation Co",
        start_date: "2015-06",
        end_date: "2018-03",
        responsibilities: [
          "Managed development of cloud-based ERP system",
          "Led team of 20+ developers, designers, and QA engineers",
          "Improved project delivery efficiency by 35% through process optimization"
        ]
      },
      {
        job_title: "Software Team Lead",
        company: "TechStart Korea",
        start_date: "2012-09",
        end_date: "2015-05",
        responsibilities: [
          "Coordinated development efforts across multiple teams",
          "Implemented Scrum methodology and DevOps practices"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Agile/Scrum",
        "JIRA",
        "MS Project",
        "Confluence",
        "Risk Management",
        "Budgeting",
        "Azure DevOps",
        "Trello",
        "Power BI",
        "SQL"
      ],
      soft_skills: [
        "Leadership",
        "Stakeholder Management",
        "Conflict Resolution",
        "Strategic Planning",
        "Team Building"
      ]
    },
    projects: [
      {
        project_name: "Enterprise Digital Transformation",
        description: "Led company-wide digital transformation initiative affecting 5000+ employees. Delivered 15+ integrated systems on time and under budget with 98% user satisfaction.",
        tech_stack: ["Enterprise Architecture", "Cloud Migration", "Process Automation"],
        demo_url: "https://case-studies.globaltechsolutions.com/transformation"
      },
      {
        project_name: "Agile PMO Framework",
        description: "Developed and implemented enterprise-wide Agile Project Management framework. Increased project success rate from 65% to 89% and reduced overhead costs by 30%.",
        tech_stack: ["Agile", "JIRA", "Confluence", "Process Design"],
        demo_url: "https://pmo.globaltechsolutions.com"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/david-kim-pm",
      github_url: "https://github.com/davidkim",
      portfolio_url: "https://david-kim.com"
    },
    certifications: [
      {
        course_name: "Project Management Professional (PMP)",
        provider: "PMI",
        completion_date: "2016-05"
      },
      {
        course_name: "SAFe Program Consultant",
        provider: "Scaled Agile",
        completion_date: "2019-11"
      }
    ],
    languages_known: [
      {
        language: "Korean",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "Japanese",
        proficiency: "Intermediate"
      }
    ]
  },

  // QA Engineer 1
  {
    basic_info: {
      full_name: "Elena Rodriguez",
      age: 32,
      gender: "Female",
      email: "elena.rodriguez@email.com",
      phone: "+34 611 555 789",
      location: "Madrid, Spain"
    },
    education: {
      degree: "B.S. in Software Engineering",
      university: "Technical University of Madrid",
      graduation_year: 2016,
      gpa: 3.7
    },
    current_job: {
      job_title: "Senior QA Engineer",
      company: "Quality First Software",
      start_date: "2019-07",
      end_date: "Present",
      responsibilities: [
        "Lead end-to-end testing strategy for enterprise SaaS applications",
        "Implemented automated testing framework reducing testing time by 70%",
        "Manage team of 5 QA engineers and coordinate with development teams",
        "Established quality metrics and monitoring systems"
      ]
    },
    past_experience: [
      {
        job_title: "QA Automation Engineer",
        company: "Tech Solutions Spain",
        start_date: "2016-09",
        end_date: "2019-06",
        responsibilities: [
          "Developed and maintained automated test suites using Selenium and Cypress",
          "Reduced regression testing cycle from 2 weeks to 2 days",
          "Implemented continuous testing in CI/CD pipeline"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Selenium",
        "Cypress",
        "JavaScript",
        "Python",
        "Jenkins",
        "Docker",
        "REST API Testing",
        "Performance Testing",
        "JMeter",
        "TestRail"
      ],
      soft_skills: [
        "Analytical Thinking",
        "Attention to Detail",
        "Communication",
        "Problem Solving",
        "Team Leadership"
      ]
    },
    projects: [
      {
        project_name: "TestAutomation Framework",
        description: "Designed and implemented comprehensive test automation framework supporting web, mobile, and API testing. Achieved 90% test coverage and reduced manual testing effort by 80%.",
        tech_stack: ["Python", "Selenium", "Cypress", "Docker", "Jenkins"],
        github_url: "https://github.com/elenarodriguez/test-automation-framework"
      },
      {
        project_name: "Performance Testing Suite",
        description: "Created performance testing suite for high-load microservices architecture. Identified and resolved bottlenecks improving system throughput by 150%.",
        tech_stack: ["JMeter", "Grafana", "Kubernetes", "Python"],
        github_url: "https://github.com/elenarodriguez/performance-testing-suite"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/elena-rodriguez-qa",
      github_url: "https://github.com/elenarodriguez",
      portfolio_url: "https://elena-rodriguez.dev"
    },
    certifications: [
      {
        course_name: "ISTQB Advanced Level Test Automation Engineer",
        provider: "ISTQB",
        completion_date: "2020-03"
      },
      {
        course_name: "AWS Certified DevOps Engineer",
        provider: "Amazon Web Services",
        completion_date: "2021-01"
      }
    ],
    languages_known: [
      {
        language: "Spanish",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "Portuguese",
        proficiency: "Intermediate"
      }
    ]
  },

  // DevOps Engineer 1
  {
    basic_info: {
      full_name: "Lars Nielsen",
      age: 34,
      gender: "Male",
      email: "lars.nielsen@email.com",
      phone: "+45 20 55 55 55",
      location: "Copenhagen, Denmark"
    },
    education: {
      degree: "M.Sc. in Computer Science",
      university: "Technical University of Denmark",
      graduation_year: 2015,
      gpa: 3.85
    },
    current_job: {
      job_title: "Senior DevOps Engineer",
      company: "CloudNordic",
      start_date: "2019-03",
      end_date: "Present",
      responsibilities: [
        "Lead DevOps transformation for enterprise clients across Scandinavia",
        "Designed and implemented multi-cloud infrastructure serving 10M+ users",
        "Reduced deployment time by 85% through CI/CD automation",
        "Managed infrastructure costs saving $200K annually through optimization"
      ]
    },
    past_experience: [
      {
        job_title: "Cloud Infrastructure Engineer",
        company: "Nordic Tech Solutions",
        start_date: "2015-08",
        end_date: "2019-02",
        responsibilities: [
          "Implemented infrastructure as code using Terraform and Ansible",
          "Built and maintained Kubernetes clusters for microservices architecture",
          "Developed automated disaster recovery solutions"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Kubernetes",
        "Docker",
        "Terraform",
        "AWS",
        "Azure",
        "Jenkins",
        "Ansible",
        "Python",
        "Go",
        "Prometheus",
        "Grafana",
        "ELK Stack"
      ],
      soft_skills: [
        "Problem Solving",
        "System Design",
        "Team Leadership",
        "Communication",
        "Documentation"
      ]
    },
    projects: [
      {
        project_name: "CloudScale Platform",
        description: "Architected and implemented auto-scaling cloud platform supporting 1000+ microservices. Achieved 99.999% uptime and reduced infrastructure costs by 45%.",
        tech_stack: ["Kubernetes", "Terraform", "AWS", "Go", "Prometheus"],
        github_url: "https://github.com/larsnielsen/cloud-scale"
      },
      {
        project_name: "DevOps Automation Suite",
        description: "Created comprehensive DevOps automation suite including infrastructure provisioning, monitoring, and self-healing capabilities. Reduced incident response time by 90%.",
        tech_stack: ["Python", "Ansible", "Jenkins", "ELK Stack", "Grafana"],
        github_url: "https://github.com/larsnielsen/devops-automation"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/lars-nielsen-devops",
      github_url: "https://github.com/larsnielsen",
      portfolio_url: "https://lars-nielsen.dev"
    },
    certifications: [
      {
        course_name: "AWS Solutions Architect Professional",
        provider: "Amazon Web Services",
        completion_date: "2020-06"
      },
      {
        course_name: "Certified Kubernetes Administrator",
        provider: "Cloud Native Computing Foundation",
        completion_date: "2019-11"
      },
      {
        course_name: "Azure DevOps Engineer Expert",
        provider: "Microsoft",
        completion_date: "2021-02"
      }
    ],
    languages_known: [
      {
        language: "Danish",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "Swedish",
        proficiency: "Professional"
      }
    ]
  },

  // UI/UX Designer 1
  {
    basic_info: {
      full_name: "Yuki Tanaka",
      age: 29,
      gender: "Female",
      email: "yuki.tanaka@email.com",
      phone: "+81 80-5555-1234",
      location: "Tokyo, Japan"
    },
    education: {
      degree: "B.A. in Interactive Design",
      university: "Musashino Art University",
      graduation_year: 2017,
      gpa: 3.92
    },
    current_job: {
      job_title: "Senior UI/UX Designer",
      company: "Design Innovation Lab",
      start_date: "2020-01",
      end_date: "Present",
      responsibilities: [
        "Lead design strategy for enterprise SaaS products",
        "Conduct user research and usability testing",
        "Manage team of 4 designers and collaborate with product teams",
        "Increased user engagement by 200% through redesign initiatives"
      ]
    },
    past_experience: [
      {
        job_title: "Product Designer",
        company: "TechStart Japan",
        start_date: "2017-04",
        end_date: "2019-12",
        responsibilities: [
          "Created user-centered designs for mobile and web applications",
          "Improved conversion rates by 45% through UX optimization",
          "Developed and maintained design system"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "InVision",
        "Principle",
        "HTML/CSS",
        "Prototyping",
        "User Research",
        "Design Systems",
        "Motion Design"
      ],
      soft_skills: [
        "Creative Thinking",
        "User Empathy",
        "Communication",
        "Problem Solving",
        "Team Collaboration"
      ]
    },
    projects: [
      {
        project_name: "FinTech UX Redesign",
        description: "Led complete redesign of financial management platform used by 2M+ users. Improved user satisfaction score from 72 to 94 and reduced support tickets by 60%.",
        tech_stack: ["Figma", "Principle", "ProtoPie", "UserTesting"],
        demo_url: "https://behance.net/yukitanaka/fintech-redesign"
      },
      {
        project_name: "Healthcare App Design System",
        description: "Created comprehensive design system for healthcare applications serving 500+ designers and developers. Reduced design-to-development time by 70%.",
        tech_stack: ["Figma", "Storybook", "Zeroheight", "Abstract"],
        demo_url: "https://behance.net/yukitanaka/healthcare-design-system"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/yuki-tanaka-design",
      github_url: "https://github.com/yukitanaka",
      portfolio_url: "https://yuki-tanaka.design"
    },
    certifications: [
      {
        course_name: "Google UX Design Professional Certificate",
        provider: "Google",
        completion_date: "2020-09"
      },
      {
        course_name: "Advanced Design System Certification",
        provider: "DesignOps University",
        completion_date: "2021-03"
      }
    ],
    languages_known: [
      {
        language: "Japanese",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      }
    ]
  },

  // Data Scientist 1
  {
    basic_info: {
      full_name: "Aisha Patel",
      age: 31,
      gender: "Female",
      email: "aisha.patel@email.com",
      phone: "+44 7700 555555",
      location: "London, UK"
    },
    education: {
      degree: "Ph.D. in Machine Learning",
      university: "Imperial College London",
      graduation_year: 2019,
      gpa: 3.95
    },
    current_job: {
      job_title: "Senior Data Scientist",
      company: "AI Research Labs",
      start_date: "2019-09",
      end_date: "Present",
      responsibilities: [
        "Lead research team developing novel ML models for financial forecasting",
        "Implemented deep learning solutions reducing prediction error by 45%",
        "Manage team of 5 data scientists and collaborate with product teams",
        "Published 3 papers in top-tier ML conferences"
      ]
    },
    past_experience: [
      {
        job_title: "Machine Learning Engineer",
        company: "FinTech Solutions UK",
        start_date: "2017-06",
        end_date: "2019-08",
        responsibilities: [
          "Developed ML models for fraud detection and risk assessment",
          "Reduced false positive rate by 60% while maintaining recall",
          "Built real-time prediction pipeline processing 100K+ transactions/hour"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
        "R",
        "SQL",
        "Spark",
        "AWS",
        "Docker",
        "MLflow",
        "Kubernetes",
        "Statistical Analysis"
      ],
      soft_skills: [
        "Research",
        "Problem Solving",
        "Team Leadership",
        "Communication",
        "Project Management"
      ]
    },
    projects: [
      {
        project_name: "FinancialML Framework",
        description: "Developed novel deep learning framework for financial time series prediction. Achieved 30% better accuracy than state-of-the-art models on benchmark datasets.",
        tech_stack: ["Python", "PyTorch", "AWS", "MLflow", "Docker"],
        github_url: "https://github.com/aishapatel/financial-ml"
      },
      {
        project_name: "AutoML Pipeline",
        description: "Created automated machine learning pipeline for rapid model development and deployment. Reduced model development cycle from weeks to hours.",
        tech_stack: ["Python", "Scikit-learn", "Kubernetes", "MLflow", "Optuna"],
        github_url: "https://github.com/aishapatel/automl-pipeline"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/aisha-patel-ds",
      github_url: "https://github.com/aishapatel",
      portfolio_url: "https://aisha-patel.ai"
    },
    certifications: [
      {
        course_name: "Deep Learning Specialization",
        provider: "DeepLearning.AI",
        completion_date: "2020-04"
      },
      {
        course_name: "AWS Machine Learning Specialty",
        provider: "Amazon Web Services",
        completion_date: "2021-01"
      }
    ],
    languages_known: [
      {
        language: "English",
        proficiency: "Native"
      },
      {
        language: "Hindi",
        proficiency: "Fluent"
      },
      {
        language: "Python",
        proficiency: "Expert"
      }
    ]
  },

  // GenAI Engineer 4
  {
    basic_info: {
      full_name: "Lucas Santos",
      age: 28,
      gender: "Male",
      email: "lucas.santos@email.com",
      phone: "+55 11 98765-4322",
      location: "São Paulo, Brazil"
    },
    education: {
      degree: "M.Sc. in Computer Science",
      university: "University of São Paulo",
      graduation_year: 2020,
      gpa: 3.89
    },
    current_job: {
      job_title: "Senior GenAI Engineer",
      company: "Creative AI Labs",
      start_date: "2021-06",
      end_date: "Present",
      responsibilities: [
        "Lead development of generative models for creative applications",
        "Developed novel architecture for music and audio generation",
        "Reduced model training time by 55% through optimization techniques",
        "Mentor junior AI engineers and coordinate with product teams"
      ]
    },
    past_experience: [
      {
        job_title: "Machine Learning Engineer",
        company: "Tech Innovators Brazil",
        start_date: "2020-01",
        end_date: "2021-05",
        responsibilities: [
          "Developed deep learning models for audio processing",
          "Implemented real-time inference pipeline for mobile devices",
          "Optimized models for edge deployment reducing latency by 70%"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "Audio Processing",
        "Signal Processing",
        "CUDA",
        "C++",
        "Docker",
        "AWS",
        "MLflow",
        "Librosa",
        "Streamlit"
      ],
      soft_skills: [
        "Innovation",
        "Problem Solving",
        "Team Collaboration",
        "Technical Leadership",
        "Project Management"
      ]
    },
    projects: [
      {
        project_name: "AudioGen AI",
        description: "Created novel architecture for generating high-quality music and sound effects. Achieved human-level quality ratings in blind tests for generated content.",
        tech_stack: ["Python", "PyTorch", "Librosa", "AWS", "C++"],
        github_url: "https://github.com/lucassantos/audiogen-ai",
        demo_url: "https://audiogen.ai/demo"
      },
      {
        project_name: "EdgeAI Optimizer",
        description: "Developed framework for optimizing large AI models for edge devices. Reduced model size by 90% while maintaining 95% accuracy.",
        tech_stack: ["Python", "TensorFlow Lite", "C++", "CUDA"],
        github_url: "https://github.com/lucassantos/edge-ai-optimizer"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/lucas-santos-ai",
      github_url: "https://github.com/lucassantos",
      portfolio_url: "https://lucas-santos.ai"
    },
    certifications: [
      {
        course_name: "Advanced Audio Signal Processing",
        provider: "Stanford Online",
        completion_date: "2021-08"
      },
      {
        course_name: "Edge AI Specialization",
        provider: "Intel",
        completion_date: "2022-03"
      }
    ],
    languages_known: [
      {
        language: "Portuguese",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      },
      {
        language: "Spanish",
        proficiency: "Intermediate"
      }
    ]
  },

  // GenAI Engineer 5
  {
    basic_info: {
      full_name: "Zhang Wei",
      age: 31,
      gender: "Male",
      email: "zhang.wei@email.com",
      phone: "+86 138 5555 6789",
      location: "Shanghai, China"
    },
    education: {
      degree: "Ph.D. in Computer Vision",
      university: "Tsinghua University",
      graduation_year: 2019,
      gpa: 3.93
    },
    current_job: {
      job_title: "Lead AI Research Engineer",
      company: "Vision AI Tech",
      start_date: "2020-07",
      end_date: "Present",
      responsibilities: [
        "Lead research in generative image and video synthesis",
        "Developed state-of-the-art text-to-video generation models",
        "Manage team of 7 researchers and engineers",
        "Published research in top computer vision conferences"
      ]
    },
    past_experience: [
      {
        job_title: "Computer Vision Researcher",
        company: "Advanced Technology Institute",
        start_date: "2019-01",
        end_date: "2020-06",
        responsibilities: [
          "Developed novel architectures for image generation",
          "Improved image synthesis quality through advanced GAN techniques",
          "Led collaboration with international research teams"
        ]
      }
    ],
    skills: {
      technical_skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "Computer Vision",
        "GANs",
        "Diffusion Models",
        "CUDA",
        "C++",
        "Docker",
        "Ray",
        "OpenCV",
        "Weights & Biases"
      ],
      soft_skills: [
        "Research Leadership",
        "Innovation",
        "Team Management",
        "Technical Writing",
        "Strategic Thinking"
      ]
    },
    projects: [
      {
        project_name: "Text2Video-Gen",
        description: "Developed cutting-edge text-to-video generation system. Achieved best-in-class results on standard benchmarks with 40% faster generation time.",
        tech_stack: ["Python", "PyTorch", "CUDA", "Ray", "Docker"],
        github_url: "https://github.com/zhangwei/text2video-gen",
        demo_url: "https://text2video-gen.ai"
      },
      {
        project_name: "Neural Video Editor",
        description: "Created AI-powered video editing system supporting natural language commands. Reduced video editing time by 80% in user studies.",
        tech_stack: ["Python", "PyTorch", "OpenCV", "FastAPI", "React"],
        github_url: "https://github.com/zhangwei/neural-video-editor"
      }
    ],
    online_profiles: {
      linkedin_url: "https://linkedin.com/in/zhang-wei-ai",
      github_url: "https://github.com/zhangwei",
      portfolio_url: "https://zhang-wei.ai"
    },
    certifications: [
      {
        course_name: "Advanced Computer Vision and Deep Learning",
        provider: "NVIDIA Deep Learning Institute",
        completion_date: "2021-04"
      },
      {
        course_name: "High Performance Computing with CUDA",
        provider: "NVIDIA",
        completion_date: "2022-01"
      }
    ],
    languages_known: [
      {
        language: "Chinese",
        proficiency: "Native"
      },
      {
        language: "English",
        proficiency: "Fluent"
      }
    ]
  }
];
