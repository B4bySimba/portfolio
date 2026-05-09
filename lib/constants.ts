export const NAV_ITEMS = [
  { id: "home", label: "Home", section: "entry" },
  { id: "work", label: "Work", section: "architecture" },
  { id: "philosophy", label: "Philosophy", section: "philosophy" },
  { id: "writing", label: "Writing", section: "writing" },
  { id: "contact", label: "Contact", section: "contact" },
] as const;

export const PROJECTS = [
  {
    id: "propv2",
    name: "Property Management Platform v2.0",
    tags: ["Multi-tenant", "Full-stack", "REST API"],
    role: "Lead Developer",
    stack: ["React", "Node.js", "PostgreSQL", "Next.js", "Prisma"],
    description:
      "A full-featured multi-tenant property management system with rent tracking, maintenance workflows, and tenant-landlord communication. Designed REST APIs and database schemas to streamline billing, issue tracking, and reporting — significantly improving operational efficiency.",
    architecture:
      "RESTful API backend with a React frontend, Prisma ORM for type-safe database access, and PostgreSQL for relational data integrity across tenants.",
    stats: { loc: "42k", commits: "620", deployFreq: "Weekly" },
    color: "#6ea8fe",
    x: 0.2,
    y: 0.35,
  },
  {
    id: "propv1",
    name: "Property Management Platform v1.0",
    tags: ["Monolithic", "PHP", "Laravel"],
    role: "Solo Developer",
    stack: ["PHP", "Laravel", "MySQL", "Blade"],
    description:
      "The initial monolithic property management system that digitized tenant records, rent payments, and basic reporting for Papat Properties. Served as the architectural foundation for v2.0, informing later modularization and performance improvements.",
    architecture:
      "Laravel MVC monolith with Blade templating, MySQL relational schema, and Eloquent ORM for rapid feature development.",
    stats: { loc: "18k", commits: "210", deployFreq: "Monthly" },
    color: "#a78bfa",
    x: 0.65,
    y: 0.22,
  },
  {
    id: "traffic",
    name: "Traffic Control Simulator (AI)",
    tags: ["Reinforcement Learning", "AI", "Simulation"],
    role: "Solo Developer",
    stack: ["Python", "SUMO", "Reinforcement Learning"],
    description:
      "A traffic signal control simulator using reinforcement learning to dynamically optimize signal timings. Trained and evaluated on a simulated Nairobi CBD road network, achieving an estimated ~21% reduction in average vehicle wait time compared to fixed-time signals.",
    architecture:
      "RL agent trained with a custom reward function on a SUMO-simulated network, using state observations of queue length and vehicle throughput per intersection.",
    stats: { loc: "8k", commits: "94", deployFreq: "Research" },
    color: "#fbbf24",
    x: 0.78,
    y: 0.6,
  },
  {
    id: "pos",
    name: "AI-Integrated POS System",
    tags: ["AI", "Predictive Analytics", "Backend"],
    role: "Lead Developer",
    stack: ["Laravel", "PHP", "MySQL", "Python"],
    description:
      "A scalable POS backend with AI-driven recommendation and predictive analytics modules. Increased cross-sell conversions by 22% through data-driven product suggestions surfaced at the point of sale.",
    architecture:
      "Laravel backend exposing a RESTful API consumed by the POS frontend, with a Python ML service providing real-time product recommendations via an internal API bridge.",
    stats: { loc: "22k", commits: "310", deployFreq: "Bi-weekly" },
    color: "#34d399",
    x: 0.38,
    y: 0.72,
  },
  {
    id: "scheduler",
    name: "Scheduler Simulation",
    tags: ["OS Algorithms", "Java", "Concurrency"],
    role: "Solo Developer",
    stack: ["Java"],
    description:
      "A simulation of core operating system scheduling algorithms including Round Robin, FIFO, SJF, and uni-programming. Uses priority queues and quantum counters to improve fairness and prevent starvation in concurrent workloads.",
    architecture:
      "Pure Java implementation with abstract scheduler interface, pluggable algorithm strategies, and a simulation harness that measures turnaround time and CPU utilization per algorithm.",
    stats: { loc: "4k", commits: "58", deployFreq: "Academic" },
    color: "#f97316",
    x: 0.52,
    y: 0.48,
  },
] as const;

export const EXPERIENCE = [
  {
    hash: "a1f3c20",
    company: "Papat Properties",
    role: "Projects Lead Developer",
    duration: "2023 – Present",
    message: "feat: architected 10+ custom platforms including property & insurance systems",
    details:
      "Accelerated digital service delivery by designing and deploying 10+ production platforms. Led Agile execution, enforced code quality standards, and coordinated release cycles with KPI-driven reporting. Designed scalable APIs and backend workflows that automated core business processes and reduced customer turnaround time.",
    isMerge: true,
    branch: "main",
  },
  {
    hash: "b7e2d41",
    company: "Craft Hub",
    role: "Lead Developer – Projects",
    duration: "2023 – 2025",
    message: "perf: led SEO & performance optimization, shipped responsive internal dashboards",
    details:
      "Architected and delivered internal software for data analytics, project management, and reporting. Owned the company website, internal dashboards, and production deployments end-to-end. Led technical SEO and performance optimization initiatives, increasing discoverability and user engagement across public-facing platforms.",
    isMerge: false,
    branch: "feature/craft-hub",
  },
  {
    hash: "c3a9f70",
    company: "National Housing Corporation",
    role: "IT Support Attaché",
    duration: "Jun – Aug 2024",
    message: "chore: IT support, enterprise database maintenance & system documentation",
    details:
      "Provided hands-on IT support for hardware, software, and networked systems in a production environment. Assisted in maintaining enterprise databases and backend systems, ensuring reliability and data integrity. Documented technical procedures, contributing to improved system continuity and support efficiency.",
    isMerge: false,
    branch: "feature/nhc-internship",
  },
] as const;

export const ARTICLES = [
  {
    id: 1,
    title: "Building Multi-tenant Systems with Next.js and PostgreSQL",
    date: "Jan 2025",
    readTime: "10 min",
    excerpt:
      "Lessons from building a production multi-tenant property platform — schema isolation strategies, row-level security, and connection pooling that actually scales.",
    frequency: 90,
  },
  {
    id: 2,
    title: "Reinforcement Learning for Real-World Traffic Control",
    date: "Oct 2024",
    readTime: "12 min",
    excerpt:
      "How I used SUMO and a custom RL agent to simulate the Nairobi CBD road network and cut average vehicle wait times by 21% compared to fixed-time signals.",
    frequency: 82,
  },
  {
    id: 3,
    title: "From Monolith to Modular: Migrating a Laravel App",
    date: "Jun 2024",
    readTime: "8 min",
    excerpt:
      "A practical walkthrough of how we evolved a Laravel monolith into a modular, API-first architecture — without ever taking the system offline.",
    frequency: 78,
  },
  {
    id: 4,
    title: "Integrating AI Recommendations into a POS Backend",
    date: "Mar 2024",
    readTime: "9 min",
    excerpt:
      "How a lightweight Python ML service bridged to a Laravel POS API increased cross-sell conversions by 22% through real-time product suggestions.",
    frequency: 70,
  },
] as const;

export const SKILLS = [
  { label: "Full-stack Dev", value: 94, color: "#6ea8fe" },
  { label: "API Design", value: 90, color: "#a78bfa" },
  { label: "Cloud & DevOps", value: 84, color: "#fbbf24" },
  { label: "SEO / SEM", value: 82, color: "#34d399" },
  { label: "Database Design", value: 88, color: "#f97316" },
  { label: "Agile Leadership", value: 86, color: "#fb7185" },
] as const;

export const SYSTEM_INFO = [
  { key: "Location", value: "Nairobi, Kenya" },
  { key: "Stack", value: "Next.js, React, NestJS, Node.js, Laravel, Python" },
  { key: "Database", value: "PostgreSQL, MySQL, MongoDB, Prisma" },
  { key: "Cloud", value: "AWS (EC2, S3, Lambda), Azure, Docker, Linux" },
  { key: "Tooling", value: "CI/CD, TailwindCSS, Git, Agile / Scrum" },
  { key: "Availability", value: "Open to full-time & contract roles" },
] as const;

export type Project = (typeof PROJECTS)[number];
export type Experience = (typeof EXPERIENCE)[number];
export type Article = (typeof ARTICLES)[number];
export type Skill = (typeof SKILLS)[number];
