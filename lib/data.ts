// Portfolio and content data
export const portfolioData = {
  personalInfo: {
    name: "Bertrand Ong",
    title: "Software Engineer",
    email: "bertrandongchangheng@gmail.com",
    location: "Singapore",
    bio: "Building beautiful digital experiences with modern web technologies.",
    github: "https://github.com/bertrandong",
    linkedin: "https://linkedin.com/in/bertrandoch",
    avatar: "/portfolio/photo.jpg",
  },
  resume: {
    summary:
      "Experienced full-stack developer with a passion for creating elegant solutions to complex problems. Specialized in React, Next.js, TypeScript, and cloud technologies.",
    experience: [
      {
        id: 1,
        title: "Software Engineer Intern",
        company: "Funding Societies",
        companyDescription: "Funding Societies is Southeast Asia's largest SME digital financing and debt investment platform, speciaising in short-term financing for SMEs, funded by individual and institutional investors.",
        logo: "/portfolio/logos/fundingsocieties.jpg",
        period: "Jan 2026 - May 2026",
        location: "Singapore",
        description: [
          "Engineered workflow automation systems to streamline internal processes, improving team productivity and saving more than 200 hours across various departments per week",
          "Contributed extensively to the open-source project Activepieces, implementing production-grade features and maintaining code quality through code reviews and high testing standards.",
          "Governed platform reliability and performance by monitoring system metrics (CPU, memory, and execution flows), identifying workflow bottlenecks, and optimizing code and workflow architectures, achieving a 20% reduction in memory and CPU usage.",
        ],
        skills: ["TypeScript", "Python", "Node.js", "Datadog"],
      },
      {
        id: 2,
        title: "Software Engineer Intern",
        company: "DeepVerse",
        companyDescription: "DeepVerse, through innovative and cross-discipline breakthroughs in materials science and AI, is pioneering the future of R&D and manufacturing.",
        logo: "/portfolio/logos/deepverse.jpg",
        period: "Aug 2024 - Jul 2025",
        location: "Shanghai, China",
        description: [
          "Designed, developed, and tested scalable RESTful APIs using Python FastAPI framework, interfacing with PostgreSQL and MongoDB to support algorithm and frontend requirements.",
          "Engineered data transformation pipelines that converted algorithmic training outputs into structured graph data to be consumed by frontend dashboards.",
          "Set up and deployed gRPC-based microservices to modularize communication between algorithmic models and database layers, improving system scalability and latency.",
          "Integrated DeepSeek LLM into a Chat module; Optimized Retrieval-Augmented Generation (RAG) latency, reducing response time by 50%.",
          "Implemented structure-aware text chunking with LangChain, preserving semantic context around tables, equations, and text to improve document parsing accuracy.",
        ],
        skills: ["Python", "PostgreSQL", "MongoDB", "Docker", "Linux"],
      },
      {
        id: 3,
        title: "Software Engineer Intern",
        company: "Boxgreen",
        companyDescription: "Boxgreen is a Singapore-based startup that delivers healthy snacks to offices and homes across Southeast Asia.",
        logo: "/portfolio/logos/boxgreen.jpg",
        period: "May 2024 - Aug 2024",
        location: "Singapore",
        description: [
          "Maintained and developed new functionalities on Boxgreen's website, resulting in a 20% increase in platform traffic.",
          "Developed an e-commerce store for its partner store, The Good Market, achieving more than 100 sales upon launch.",
          "Designed and built an internal Objectives and Key Results (OKR) web application to support employee performance reviews and reporting workflows.",
        ],
        skills: ["JavaScript", "Shopify", "Liquid", "Node.js"],
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Computing (Honours)",
        field: "Computer Science",
        school: "National University of Singapore",
        year: "2022 - 2026",
      },
    ],
    skills: {
      languages: ["JavaScript", "TypeScript", "Python", "SQL", "C", "Java", "Go"],
      frontend: ["React", "Next.js", "Tailwind CSS"],
      backend: ["Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS", "FastAPI", "Linux", "gRPC", "Redis"],
    },
  },
  portfolio: {
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description:
          "Full-stack e-commerce solution with product catalog, shopping cart, and payment processing.",
        technologies: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL"],
        link: "#",
        image: "🛍️",
      },
      {
        id: 2,
        title: "Task Management App",
        description:
          "Collaborative task management application with real-time updates and team workspaces.",
        technologies: ["React", "Firebase", "Tailwind CSS"],
        link: "#",
        image: "✓",
      },
      {
        id: 3,
        title: "Analytics Dashboard",
        description:
          "Real-time analytics dashboard with interactive charts and data visualization.",
        technologies: ["Next.js", "D3.js", "Node.js", "PostgreSQL"],
        link: "#",
        image: "📊",
      },
      {
        id: 4,
        title: "Social Network",
        description: "Social networking platform with messaging, feeds, and user profiles.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
        link: "#",
        image: "🌐",
      },
      {
        id: 5,
        title: "Content Management System",
        description: "Headless CMS with API-first architecture for content delivery.",
        technologies: ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
        link: "#",
        image: "📝",
      },
      {
        id: 6,
        title: "Machine Learning Pipeline",
        description: "Data pipeline for processing and analyzing large datasets.",
        technologies: ["Python", "TensorFlow", "AWS Lambda", "PostgreSQL"],
        link: "#",
        image: "🤖",
      },
    ],
  },
  apps: [
    {
      id: "resume",
      name: "Resume",
      icon: "📄",
      description: "View my resume PDF",
    },
    {
      id: "experience",
      name: "Experience",
      icon: "💼",
      description: "My work experience",
    },
    {
      id: "portfolio",
      name: "Portfolio",
      icon: "🗂️",
      description: "Explore my latest projects",
    },
    {
      id: "about",
      name: "About",
      icon: "👤",
      description: "Learn more about me",
    },
    {
      id: "contact",
      name: "Contact",
      icon: "✉️",
      description: "Get in touch",
    },
  ],
};
