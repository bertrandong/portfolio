// Portfolio and content data
export const portfolioData = {
  personalInfo: {
    name: "Bertrand Ong",
    title: "Software Engineer",
    email: "bertrandongchangheng@gmail.com",
    location: "Singapore",
    bio: "I'm a passionate software engineer with experience in building scalable web applications and a keen interest in startups. I enjoy creating elegant solutions to complex problems and am always eager to learn new technologies. I enjoy a fun session of squash with friends outside work.",
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
      backend: ["Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS", "FastAPI", "Linux", "gRPC", "Redis", "Express.js"],
    },
  },
  portfolio: {
    projects: [
      {
        id: 1,
        title: "Activepieces (Open-source Contributor)",
        description:
          "Open-source no-code workflow automation platform with 280+ integrations — an alternative to Zapier. Contributed production-grade features during internship at Funding Societies.",
        technologies: ["TypeScript", "Angular", "Node.js", "Docker"],
        githubLink: "https://github.com/activepieces/activepieces",
        deployedLink: "https://www.activepieces.com/",
        image: "Workflow",
      },
      {
        id: 2,
        title: "SideQuest (In Progress)",
        description:
          "Motivational tool that helps users break down large tasks into digestible steps, tackle daily LeetCode challenges, and rank among friends on a leaderboard.",
        technologies: ["TypeScript", "React", "Go", "PostgreSQL"],
        githubLink: "https://github.com/Kb-Tay/SideQuest",
        deployedLink: null,
        image: "Target",
      },
      {
        id: 3,
        title: "FindTheKey",
        description:
          "Gamified educational app that teaches database normalization through interactive puzzles and a roguelike Spire mode with combat mechanics and procedural maps.",
        technologies: ["TypeScript", "React", "Closure", "Minimum Cover", "Algorithms"],
        githubLink: "https://github.com/nigel27022001/FindTheKey",
        deployedLink: "https://spire-of-fds.vercel.app/",
        image: "KeyRound",
      },
      {
        id: 4,
        title: "PeerPrep",
        description:
          "Collaborative coding platform for technical interview prep. Matches peers by topic and difficulty for real-time coding sessions with integrated chat and code execution.",
        technologies: ["React", "Python", "PostgreSQL", "Docker", "AWS", "Kafka", "Redis"],
        githubLink: "https://github.com/CS3219-AY2526Sem1/cs3219-ay2526s1-project-g19",
        deployedLink: null,
        image: "Users",
      },
    ],
  },
  apps: [
    {
      id: "resume",
      name: "Resume",
      description: "View my resume PDF",
    },
    {
      id: "experience",
      name: "Experience",
      description: "My work experience",
    },
    {
      id: "portfolio",
      name: "Portfolio",
      description: "Explore my latest projects",
    },
    {
      id: "about",
      name: "About",
      description: "Learn more about me",
    },
    {
      id: "contact",
      name: "Contact",
      description: "Get in touch",
    },
  ],
};
