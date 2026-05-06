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
        company: "Tech Corp",
        companyDescription: "A leading technology firm specialising in enterprise SaaS products.",
        logo: null, // place logo at public/logos/techcorp.png
        period: "2022 - Present",
        location: "Singapore",
        description: [
          "Led development of multiple full-stack applications using Next.js and React.",
          "Mentored junior developers and established best practices.",
        ],
        skills: ["Next.js", "React", "TypeScript", "Node.js"],
      },
      {
        id: 2,
        title: "Software Engineer Intern",
        company: "Digital Agency",
        companyDescription: "A boutique digital agency delivering bespoke web solutions for global clients.",
        logo: null, // place logo at public/logos/digitalagency.png
        period: "2020 - 2022",
        location: "Singapore",
        description: [
          "Developed responsive web applications for various clients.",
          "Worked on both frontend and backend systems.",
        ],
        skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      },
      {
        id: 3,
        title: "Software Engineer Intern",
        company: "Startup Hub",
        companyDescription: "An early-stage startup building productivity tools for remote teams.",
        logo: null, // place logo at public/logos/startuphub.png
        period: "2019 - 2020",
        location: "Singapore",
        description: [
          "Started career building features for SaaS applications.",
          "Learned agile methodologies and modern web development practices.",
        ],
        skills: ["JavaScript", "React", "CSS", "Git"],
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
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Git",
      "AWS",
      "Docker",
      "RESTful APIs",
      "GraphQL",
    ],
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
