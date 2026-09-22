// Central site configuration.
// Update personal details, links, and asset paths here — nothing else in the
// codebase should need to change when these values change.

export const site = {
  name: "Asjid Siddique",
  headline: "Software Engineering Student",
  headlineSecondLine: "Building toward AI/ML Research",
  shortHeadline:
    "Software Engineering Student | Full-Stack Developer | Building toward AI/ML Research",
  university: "National University of Sciences and Technology (NUST)",
  degree: "BS Software Engineering",
  studyPeriod: "September 2024 – June 2028",
  currentSemester: "5th Semester",
  cgpa: "3.76 / 4.00",
  location: "Islamabad, Pakistan",
  expectedGraduation: "June 2028",

  intro:
    "I'm a Software Engineering student at NUST focused on building reliable software systems and exploring Machine Learning, Deep Learning, Computer Vision, and Explainable AI through hands-on research and engineering projects.",

  about: [
    "I'm a Software Engineering student at NUST with a strong interest in AI/ML research. My background combines software engineering, algorithms, operating systems, networking, and full-stack development with machine learning, deep learning, and computer vision.",
    "I enjoy taking ideas from a research question, through implementation and experimentation, to evaluation and deployment — building systems I can actually test, measure, and ship rather than leaving as theory.",
  ],

  summary:
    "5th-semester Software Engineering student at NUST (CGPA 3.76/4.00) with strong foundations in algorithms, operating systems, computer networks, probability & statistics, linear algebra, calculus, numerical methods, and software architecture. Hands-on experience developing machine learning, deep learning, computer vision, and explainable AI systems using Python, NumPy, scikit-learn, PyTorch, OpenCV, FastAPI, and modern web technologies. Founder and Full-Stack Developer of Viro.pk, with end-to-end experience in software development, APIs, databases, and production deployment.",

  links: {
    linkedin: "https://www.linkedin.com/in/asjidsiddique469/",
    github: "https://github.com/AsjidSiddique",
    viro: "https://viro.pk",
    email: "asjadsaddique4@gmail.com",
    phone: "+92-318-4485469",
    whatsappUrl: "https://wa.me/923184485469",
  },

  // TODO: place your resume PDF at /public/resume.pdf
  resumePath: "/resume.pdf",
  // TODO: place your profile photo at /public/image.png
  profileImagePath: "/image.png",

  nav: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Research", href: "/#research" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Education", href: "/#education" },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ],

  seo: {
    title: "Asjid Siddique | Software Engineering Student & AI/ML Research",
    description:
      "Asjid Siddique is a Software Engineering student at NUST building toward AI/ML research through machine learning, deep learning, computer vision, explainable AI, and production software engineering.",
    keywords: [
      "Asjid Siddique",
      "Software Engineering",
      "NUST",
      "AI",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Explainable AI",
      "Software Engineering Research",
      "Pakistan",
    ],
  },
};

export const researchInterests = [
  {
    title: "Computer Vision",
    description:
      "Deep learning systems for visual understanding, object detection, localization, and deployment.",
  },
  {
    title: "Deep Learning",
    description:
      "Exploring neural network architectures, model evaluation, and practical deployment.",
  },
  {
    title: "Machine Learning",
    description:
      "Building reproducible ML pipelines with careful preprocessing, evaluation, and decision-oriented metrics.",
  },
  {
    title: "Explainable AI",
    description:
      "Understanding model behavior and making ML predictions more interpretable.",
  },
  {
    title: "Reliable AI Systems",
    description:
      "Interested in robustness, evaluation, failure analysis, and dependable AI systems.",
  },
  {
    title: "AI for Software Engineering",
    description:
      "Exploring how AI can improve software development, testing, reliability, and engineering workflows.",
  },
  {
    title: "AI-Assisted Software Development",
    description:
      "Using AI tools thoughtfully within the software development lifecycle, from design to testing.",
  },
  {
    title: "Intelligent Systems",
    description:
      "Systems that combine learned models with engineered logic to behave reliably in practice.",
  },
  {
    title: "Applied Machine Learning",
    description:
      "Applying ML to real, measurable problems with an emphasis on evaluation over novelty.",
  },
];

export type JourneyStatus = "completed" | "current" | "future";

export const researchJourney: {
  year: string;
  title: string;
  status: JourneyStatus;
  items: string[];
}[] = [
  {
    year: "2024",
    title: "Foundation",
    status: "completed",
    items: [
      "Started BS Software Engineering at NUST.",
      "Built foundations in programming, mathematics, algorithms, databases, and software engineering.",
      "Developed an interest in AI and intelligent systems.",
    ],
  },
  {
    year: "2025",
    title: "Software Engineering",
    status: "completed",
    items: [
      "Strengthened skills in data structures, algorithms, operating systems, computer networks, and software architecture.",
      "Built full-stack software projects and began developing Viro.pk independently.",
      "Started exploring how software engineering can support intelligent applications.",
    ],
  },
  {
    year: "2026",
    title: "AI/ML Transition",
    status: "completed",
    items: [
      "Began focused learning in Machine Learning and Deep Learning.",
      "Built FraudShield for machine learning and explainable fraud detection.",
      "Started PCBDefect-X, applying deep learning and computer vision to PCB defect detection.",
      "Gained hands-on experience with model evaluation, data preprocessing, explainability, and deployment.",
      "Began shaping a research-oriented direction in Computer Vision, Deep Learning, ML, and Explainable AI.",
    ],
  },
  {
    year: "2026–Present",
    title: "Research Focus",
    status: "current",
    items: [
      "Moving from project-based learning toward research-oriented AI/ML work.",
      "Exploring research questions in computer vision, trustworthy AI, explainable AI, and AI for software engineering.",
      "Preparing for research internships and future AI/ML research opportunities.",
    ],
  },
  {
    year: "2027",
    title: "Next Step",
    status: "future",
    items: [
      "Aim to gain international research experience through a competitive research internship.",
      "Plan to work under academic supervision on a meaningful AI/ML research problem.",
      "Continue building toward a long-term career in AI/ML research and intelligent software systems.",
    ],
  },
];

export const experience = [
  {
    role: "Founder & Full-Stack Developer",
    org: "Viro.pk",
    period: "Ongoing", // TODO: add a start date if you'd like one shown
    points: [
      "Independently designed, built, deployed, and continue to maintain a production e-commerce platform end to end",
      "Implemented product discovery, inventory and order management, admin workflows, wishlist, analytics, WhatsApp integration, COD checkout, and responsive PWA functionality",
      "Designed backend logic for inventory consistency, order processing, authentication, and database-driven workflows",
      "Manage the full lifecycle including deployment, debugging, and optimization",
    ],
  },
];

export const education = {
  school: site.university,
  degree: site.degree,
  period: "Sep 2024 – Jun 2028 (Expected)",
  cgpa: site.cgpa,
  courseworkGroups: [
    {
      group: "Computer Science & Engineering",
      items: [
        "Data Structures & Algorithms",
        "Design & Analysis of Algorithms",
        "Operating Systems",
        "Computer Networks",
        "Database Systems",
        "Software Design & Architecture",
        "Software Engineering",
        "Object-Oriented Programming",
      ],
    },
    {
      group: "Mathematics & Scientific Computing",
      items: [
        "Linear Algebra & ODEs",
        "Calculus & Analytical Geometry",
        "Probability & Statistics",
        "Discrete Mathematics",
        "Numerical Methods",
        "Complex Variables & Transforms",
      ],
    },
  ],
  currentCoursework: [
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "Deep Learning",
    "IoT",
  ],
  prior: {
    school: "Punjab College, Burewala",
    program: "F.Sc. Pre-Engineering",
    period: "2022 – 2024",
    result: "1083 / 1200",
  },
};

export const skills = [
  {
    category: "Programming",
    items: ["Python", "C++", "Java", "JavaScript", "MATLAB"],
  },
  {
    category: "AI / Machine Learning",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Object Detection",
      "Explainable AI",
      "Neural Networks",
      "Model Evaluation",
      "Data Preprocessing",
      "Imbalanced Learning",
      "Threshold Optimization",
      "Model Deployment",
    ],
  },
  {
    category: "Scientific Computing",
    items: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "OpenCV",
      "PyTorch",
      "SHAP",
      "ONNX Runtime",
      "TensorRT",
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "JWT",
      "bcrypt",
      "MVC",
      "Rate Limiting",
      "Pagination",
    ],
  },
  {
    category: "Frontend, Databases & Tools",
    items: [
      "React.js",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "PWA",
      "MongoDB",
      "MySQL",
      "Supabase",
      "JDBC",
      "Git",
      "GitHub",
      "Postman",
      "Vercel",
      "Railway",
      "VS Code",
      "NetBeans",
    ],
  },
];
