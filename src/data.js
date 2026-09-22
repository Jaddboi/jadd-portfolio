export const profile = {
  name: 'Jadd Akkad',
  firstName: 'Jadd',
  username: 'jadd',
  hostname: 'portfolio',
  role: 'Full-stack developer',
  location: 'Toronto, ON',
  email: 'akkadjadd@gmail.com',
  status: 'Building StudyFlow, an AI-powered study platform',
  typing: ['Computer Science student @ UofT', 'Full-stack developer', 'AI enthusiast', 'Maths and statistics minors'],
  bio: [
    "I study at the University of Toronto, with a triple focus on Computer Science, Mathematics and Statistics. I'm most interested in artificial intelligence, and in using it to build software that takes on complex, real-world problems.",
    'Beyond the models themselves, my focus is full-stack development: building the whole product, from the database to the interface.',
  ],
  links: {
    github: 'https://github.com/Jaddboi',
    linkedin: 'https://www.linkedin.com/in/jadd-akkad',
    website: 'https://jaddboi.com',
  },
  resumePdf: `${import.meta.env.BASE_URL}Jadd_Akkad_Resume_2026.pdf`,
}

export const projects = [
  {
    slug: 'hush',
    name: 'Hush',
    tagline: 'Real-time chat for direct messages and private groups',
    year: 2026,
    description:
      'A focused real-time chat app for direct messages and private groups. Messages, typing indicators, online presence and read receipts arrive instantly over Socket.IO, and the Express server hosts the React app, so the whole thing ships as one Docker image.',
    highlights: [
      'Direct and group chats with text, image, video and voice messages',
      'Replies, reactions, editing, pinned messages and message search',
      'Friend requests, blocking, reporting and a moderation dashboard',
      'Clerk sign-in, kept in sync with the database through signed webhooks',
      'Automated backend and frontend tests for messaging, groups and privacy',
    ],
    stack: ['React 19', 'Node.js', 'Express', 'Socket.IO', 'MongoDB', 'Zustand', 'Clerk', 'ImageKit', 'Docker'],
    live: '',
    source: 'https://github.com/Jaddboi/Hush',
    image: '',
  },
  {
    slug: 'portfolio',
    name: 'jadd@portfolio',
    tagline: 'The desktop you are looking at, built in React',
    year: 2026,
    description:
      'A portfolio that behaves like a Linux desktop. Windows drag, resize, minimise and stack; a dock launches apps; and the Files app, Terminal, Text Editor, Image Viewer and Document Viewer all read from one pretend filesystem built out of a single content file. The wallpaper and the project covers are drawn in the browser, and every icon is SVG, so the site ships without a single image file.',
    highlights: [
      'A window manager in one reducer: focus, stacking, minimise, maximise, drag and resize',
      'A terminal with 18 commands, tab completion, command history and aliases',
      'A pretend filesystem generated from data.js, shared by the desktop, Files and the terminal',
      'A contour-map wallpaper drawn on canvas from seeded noise and marching squares',
      'Light and dark themes, a phone layout, keyboard navigation and reduced-motion support',
    ],
    stack: ['React 19', 'Vite', 'JavaScript', 'CSS', 'Canvas', 'SVG'],
    live: 'https://jaddboi.com',
    source: 'https://github.com/Jaddboi/jadd-portfolio',
    image: '',
  },
]

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'C', 'SQL', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bash', 'R', 'RISC-V Assembly'],
  },
  { category: 'Frameworks & Libraries', items: ['Next.js', 'React', 'Express.js', 'Tailwind CSS', 'Socket.IO', 'Zustand', 'Vite'] },
  {
    category: 'Databases & Backend',
    items: ['PostgreSQL', 'MongoDB', 'Supabase', 'REST APIs', 'authentication & authorization'],
  },
  { category: 'Tools & Systems', items: ['Git/GitHub', 'Docker', 'Linux', 'VS Code', 'IntelliJ', 'NetBeans'] },
  {
    category: 'Core Concepts',
    items: ['Data Structures & Algorithms', 'Unit Testing', 'Debugging', 'Agile Development', 'Prompt Engineering'],
  },
]

// Each section of hobbies.txt. A string is a paragraph; an array is a list.
export const hobbies = [
  {
    heading: 'Sport',
    body: [
      'I played almost every sport my school offered, and played them competitively. At some point I was on the school team for one or more of swimming, basketball, soccer, track and field, rock climbing and cross country.',
      'However, I tore my ACL while playing basketball, so now I have been most into rock climbing.',
    ],
  },
  {
    heading: 'Learning random things',
    body: [
      'I pick up skills for no better reason than that they seemed cool. So far that includes:',
      [
        "Solving several kinds of Rubik's cube",
        'Magic',
        'Chess',
        'Lock picking',
        'Juggling',
        'Playing the violin',
        'Speed cup stacking and dice stacking',
        'Cardistry',
      ],
      'Currently I am learning how to play the guitar and ukulele.',
    ],
  },
  {
    heading: 'Gaming',
    body: [
      'I play both competitively and for fun. With friends it is usually "friend slop"/party games or something built on deductive reasoning, where arguing with each other is the whole point.',
      'On my own I enjoy story games like Cyberpunk 2077, Ghost of Tsushima, the Dying Light series, The Last of Us series, and the Subnautica series, among others.',
      'Another game I have enjoyed recently with or without friends was Civilization 6.',
      'Competitively, I am a retired professional Brawlhalla player with tournament earnings, and I now play on the University of Toronto Marvel Rivals main team.',
    ],
  },
]

// Mirrors Jadd_Akkad_Resume_2026.pdf. Words in **double asterisks** are shown
// bold, as on the PDF.
export const resume = {
  education: [
    {
      school: 'University of Toronto',
      place: 'Toronto, ON',
      degree: '**Honours Bachelor of Science** - **Computer Science Major**, Applied Mathematics & Applied Statistics Minors',
      dates: 'Sep. 2023 – Present',
      coursework: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'Databases',
        'Software Design',
        'Software Engineering',
        'Information Security',
        'Computer Organization',
        'Computational Complexity',
      ],
    },
  ],
  experience: [
    {
      org: 'Nirvo',
      role: 'Full-Stack Developer',
      dates: 'Jan. 2026 – Apr. 2026',
      points: [
        'Led development of the admin dashboard for a **Next.js/React** application, building core **user and session management workflows** across overview and administration views.',
        'Implemented **lifecycle controls** for user accounts and sessions, including deactivation, reactivation, deletion, editing, cancellation, **filtering, and pagination**.',
        'Refined landing-page and admin-dashboard UX through **responsive typography**, **interaction polish**, and hover-animation cleanup across production-facing interfaces.',
      ],
    },
  ],
  projects: [
    {
      name: 'StudyFlow - AI-Powered Study Management Platform (In Progress)',
      subtitle: 'Next.js, React, TypeScript, Supabase, PostgreSQL, Gemini API, Tailwind CSS',
      dates: 'Jul. 2026 – Present',
      points: [
        'Architected a **full-stack academic management platform** for courses, assignments, calendars, grades, and uploaded learning materials.',
        'Engineered course-specific document workflows with PDF extraction, text chunking, **vector embeddings**, **semantic retrieval**, **automated summaries**, and structured study-note generation.',
        'Implemented **secure authentication**, **row-level database security**, **private file storage**, ownership validation, generation quotas, and atomic background-job claiming.',
        'Hardened AI generation workflows with **runtime validation**, **retry/fallback handling**, persistent job states, and a **51-test automated test suite** covering reliability and core application behavior.',
      ],
    },
    {
      name: 'Hush - Full-Stack Real-Time Messaging Platform',
      subtitle: 'React 19, Node.js, Express, Socket.IO, MongoDB, Zustand, Clerk, ImageKit, Docker',
      dates: 'Jul. 2026',
      points: [
        'Engineered a **real-time messaging platform** supporting direct and group conversations, typing indicators, presence tracking, **delivery/read receipts**, reactions, replies, message search, pins, and **rich-media sharing**.',
        'Designed **secure backend authorization** for friendships, group membership, administration, blocking, reporting, and moderation using **signed Clerk webhooks**, server-side validation, **rate-limited uploads**, and protected media access.',
        'Implemented **cursor-based pagination** and synchronized client state with **Socket.IO** events, then packaged the React SPA and Express API into a production-ready **multi-stage Docker deployment**.',
        'Built **automated backend and frontend tests** covering authentication boundaries, messaging, groups, moderation, pagination, receipts, media validation, and privacy controls.',
      ],
    },
    {
      name: 'Personal Portfolio - Interactive Desktop Experience',
      subtitle: 'React 19, Vite, JavaScript, CSS',
      dates: 'Sep. 2026',
      points: [
        'Engineered an **interactive desktop-style portfolio** in React with a reusable **window-management system** supporting focus, minimize/maximize, drag, resize, responsive mobile behavior, and persistent light/dark themes.',
        'Built a **simulated file system** and **terminal experience** with command execution, **command history**, **tab completion**, project/document viewers, and responsive interactions for showcasing projects, experience, and contact information.',
      ],
    },
    {
      name: 'Coding Quest Competition',
      subtitle: '**Competitive Programming**',
      dates: 'Oct. 2022',
      points: [
        'Represented the International School of Kuala Lumpur (ISKL) in Coding Quest; the team placed **1st overall** in the competition.',
        'Recorded multiple **top-10, top-20, and top-30 global problem solves** during the competition.',
      ],
    },
  ],
}
