export type Metric = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technology: string[];
  metrics: Metric[];
  liveUrl?: string;
  githubUrl?: string;
  researchUrl?: string;
  filterTags: string[];
  status?: string;
  detail: {
    overview: string;
    problem: string;
    approach: string[];
    results: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "pcbdefect-x",
    title: "PCBDefect-X",
    category: "Deep Learning / Computer Vision Research",
    tagline: "Deep Learning for PCB Manufacturing Defect Detection & Localization",
    description:
      "An end-to-end deep learning and computer vision system for automated PCB defect detection and localization, built on the DeepPCB dataset and RF-DETR Nano.",
    technology: [
      "Python",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "Pandas",
      "RF-DETR",
      "ONNX Runtime",
      "TensorRT",
      "FastAPI",
      "Next.js",
    ],
    metrics: [
      { label: "Held-out test images", value: "366" },
      { label: "Defect classes", value: "6" },
      { label: "mAP@50", value: "78.8%" },
      { label: "mAP@50:95", value: "39.3%" },
      { label: "Precision", value: "90.0%" },
      { label: "Recall", value: "74.8%" },
      { label: "F1", value: "81.4%" },
    ],
    liveUrl: "https://pcb-defect-x.vercel.app",
    githubUrl: "https://github.com/AsjidSiddique/PCBDefect-X",
    filterTags: ["AI / ML", "Computer Vision"],
    detail: {
      overview:
        "PCBDefect-X detects and localizes manufacturing defects on printed circuit boards from images, using an RF-DETR Nano object detector trained on the DeepPCB dataset.",
      problem:
        "Manual visual inspection of PCBs for defects such as opens, shorts, and mousebites is slow and inconsistent. The goal was to build a research-grade detection pipeline that could be evaluated rigorously and deployed as a working demo, not just a notebook experiment.",
      approach: [
        "Built a reproducible data pipeline including deterministic dataset conversion, train/validation/test splitting, preprocessing, augmentation, and configuration management",
        "Trained RF-DETR Nano and evaluated on a held-out test set of 366 images across 6 defect classes",
        "Developed inference and deployment pipelines using ONNX Runtime and TensorRT FP16, with parity validation and deployment smoke checks",
        "Served the model behind a FastAPI backend and a Next.js frontend for live inference",
      ],
      results: [
        "78.8% mAP@50 and 39.3% mAP@50:95 on the held-out test set",
        "90.0% precision and 74.8% recall (81.4% F1) at the selected operating threshold",
        "Deployed as a live inference demo backed by ONNX Runtime",
      ],
    },
  },
  {
    slug: "fraudshield",
    title: "FraudShield",
    category: "Machine Learning / Explainable AI Research",
    tagline: "Explainable, Cost-Sensitive Fraud Detection",
    description:
      "An end-to-end machine learning system for highly imbalanced fraud detection on 284,807 financial transactions (~0.17% fraud), with cost-sensitive threshold optimization and SHAP-based explainability.",
    technology: [
      "Python",
      "Scikit-learn",
      "PyTorch",
      "SHAP",
      "Pandas",
      "NumPy",
      "FastAPI",
      "Next.js",
    ],
    metrics: [
      { label: "Transactions", value: "284,807" },
      { label: "Fraud rate", value: "~0.17%" },
      { label: "PR-AUC", value: "0.803" },
      { label: "Precision", value: "86.9%" },
      { label: "Recall", value: "76.8%" },
      { label: "F1", value: "81.6%" },
    ],
    liveUrl: "https://fraudshield-sable.vercel.app",
    githubUrl: "https://github.com/AsjidSiddique/Fraudshield",
    researchUrl: "https://fraudshield-sable.vercel.app/research",
    filterTags: ["AI / ML"],
    status: "Ongoing",
    detail: {
      overview:
        "FraudShield is a research/portfolio project exploring credit card fraud detection on a highly imbalanced dataset, with an emphasis on cost-sensitive decision-making and explainability rather than raw accuracy.",
      problem:
        "With fraud occurring in roughly 0.17% of transactions, accuracy is a misleading metric and a fixed 0.5 decision threshold is arbitrary. The project needed a principled way to choose a threshold and to explain individual predictions.",
      approach: [
        "Implemented train-only preprocessing and held-out evaluation to prevent data leakage, with validation-based threshold optimization on an untouched final test set",
        "Compared Logistic Regression, Random Forest, HistGradientBoosting, and a PyTorch MLP using ROC-AUC, PR-AUC, precision, recall, F1, and cost-sensitive evaluation",
        "Selected Random Forest based on PR-AUC of 0.803, achieving 86.9% precision, 76.8% recall, and 81.6% F1 at the optimized threshold",
        "Added SHAP-based explainability and a FastAPI inference service",
      ],
      results: [
        "Random Forest selected as the final model: PR-AUC 0.803",
        "86.9% precision / 76.8% recall / 81.6% F1 at the optimized threshold",
        "This is a research/portfolio project — the dataset and cost assumptions are illustrative, not a real banking production system",
      ],
    },
  },
  {
    slug: "viro",
    title: "Viro.pk",
    category: "Founder & Full-Stack Developer",
    tagline: "Independently built and operated production e-commerce platform",
    description:
      "An independently built and operated production e-commerce platform, covering product discovery, customer workflows, order management, inventory, analytics, and deployment.",
    technology: [
      "Next.js",
      "React",
      "Supabase",
      "Tailwind CSS",
      "PWA",
      "REST APIs",
      "Git",
      "Vercel",
    ],
    metrics: [],
    liveUrl: "https://viro.pk",
    filterTags: ["Software Engineering"],
    detail: {
      overview:
        "Viro.pk is a production e-commerce platform I designed, built, and continue to operate — covering the full path from product discovery to order fulfillment.",
      problem:
        "Unlike the research projects, Viro.pk is a real product with real customers, requiring ongoing reliability, not a one-off evaluation.",
      approach: [
        "Independently designed, built, deployed, and continue to maintain the platform end to end",
        "Implemented product discovery, inventory and order management, admin workflows, wishlist, analytics, WhatsApp integration, and COD checkout",
        "Designed backend logic for inventory consistency, order processing, authentication, and database-driven workflows",
        "Manage the full lifecycle: deployment, debugging, and optimization",
      ],
      results: [
        "Live, production platform handling real orders and inventory",
        "Demonstrates full-stack ownership: product decisions, engineering, deployment, and maintenance",
      ],
    },
  },
  {
    slug: "os-kernel-simulator",
    title: "OS Kernel Simulator",
    category: "Systems / Operating Systems (CS-330)",
    tagline: "Web-based simulator for core operating systems concepts",
    description:
      "A full-stack operating systems simulator built for CS-330, implementing CPU scheduling, page replacement, and process synchronization with an interactive web interface.",
    technology: [
      "Node.js",
      "Express.js",
      "React",
      "MongoDB",
      "JWT",
      "REST APIs",
      "Railway",
      "Vercel",
    ],
    metrics: [],
    githubUrl: "https://github.com/AsjidSiddique/OS-Kernel-Simulator",
    filterTags: ["Systems", "Software Engineering"],
    detail: {
      overview:
        "A web application that simulates core operating systems concepts — CPU scheduling, page replacement, and process synchronization — with visualizations of each algorithm's behavior.",
      problem:
        "OS concepts like scheduling and page replacement are easier to reason about when you can run and visualize them, not just read pseudocode.",
      approach: [
        "Implemented CPU scheduling (FCFS, SJF, Round Robin, Priority) and page replacement (FIFO, LRU, Optimal)",
        "Designed an MVC REST API with 15+ endpoints, JWT authentication, bcrypt, Helmet, CORS, rate limiting, pagination, and centralized error handling",
        "Developed interactive Gantt-chart visualizations and CSV-based simulation input",
        "Deployed frontend and backend via Vercel and Railway",
      ],
      results: [
        "Working full-stack simulator covering scheduling, memory management, and synchronization",
        "Demonstrates systems knowledge, backend engineering, and software architecture (MVC)",
      ],
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
