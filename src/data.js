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

// A project's `image` is a screenshot in public/screenshots/, pointed at through
// import.meta.env.BASE_URL so it still loads when the site is served from a
// sub-path. A project without one simply has no picture in its folder.
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
    image: `${import.meta.env.BASE_URL}screenshots/hush.webp`,
  },
  {
    slug: 'portfolio',
    name: 'jadd@portfolio',
    tagline: 'The desktop you are looking at, built in React',
    year: 2026,
    description:
      'A portfolio that behaves like a Linux desktop. Windows drag, resize, minimise and stack; a dock launches apps; and the Files app, Terminal, Text Editor, Image Viewer and Document Viewer all read from one pretend filesystem built out of a single content file. The wallpaper is drawn in the browser from seeded noise, and every icon is SVG, so the only images the site ships are the project screenshots.',
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
    image: `${import.meta.env.BASE_URL}screenshots/portfolio.webp`,
  },
]

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'C', 'SQL', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bash', 'R', 'RISC-V Assembly'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['Next.js', 'React', 'Express.js', 'FastAPI', 'LangChain', 'LangGraph', 'Tailwind CSS', 'Socket.IO'],
  },
  { category: 'Databases & Backend', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'REST APIs'] },
  {
    category: 'Tools & Systems',
    items: ['Git/GitHub', 'Docker', 'Linux/Unix', 'Windows', 'macOS', 'Cursor', 'VS Code', 'IntelliJ'],
  },
  {
    category: 'Core Concepts',
    items: [
      'Object-Oriented Programming (OOP)',
      'Data Structures & Algorithms',
      'MVC Architecture',
      'Unit Testing',
      'Agile Development',
      'Prompt Engineering',
    ],
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
      degree: '**Bachelor of Science in Computer Science, Mathematics, and Statistics**',
      dates: 'Sep. 2023 – Present',
      coursework: [
        'Data Structures & Algorithms',
        'Systems Programming',
        'Operating Systems',
        'Databases',
        'Software Design',
        'Software Engineering',
        'Information Security',
        'Computer Organization',
        'Computational Complexity',
        'Linear Algebra II',
        'Statistics II',
        'Intro to AI',
      ],
    },
  ],
  experience: [
    {
      org: 'Nirvo',
      role: 'Fullstack Developer Intern',
      dates: 'Jan. 2026 – Apr. 2026',
      points: [
        '**Led development of the admin dashboard** for a **Next.js/React** application.',
        'Built **user and session management** across overview and administration views.',
        'Added **account and session lifecycle controls** for deactivation, reactivation, deletion, editing, and cancellation.',
        'Implemented **filtering and pagination** for account and session records.',
        'Refined the landing page and dashboard with **responsive typography and interaction polish**.',
      ],
    },
  ],
  projects: [
    {
      name: 'StudyFlow - AI Study Platform (In Progress)',
      subtitle: 'Next.js, Supabase, Gemini API',
      dates: 'Jul. 2026 – Present',
      points: [
        'Architected a **full-stack academic platform** for courses, assignments, calendars, and grades.',
        'Built **upload workflows** for course documents and learning materials.',
        'Added **PDF extraction, text chunking, vector embeddings, and semantic retrieval**.',
        'Generated **automated summaries and structured study notes** with the Gemini API.',
        'Secured data with **authentication, RLS, private storage, and ownership validation**.',
        'Added quotas, atomic job claiming, persistent states, validation, **retry/fallback handling**, and **51 automated tests**.',
      ],
    },
    {
      name: 'Hush - Full-Stack Real-Time Messaging Platform',
      subtitle: 'React, Node.js, Socket.IO, MongoDB, Docker',
      dates: 'Jul. 2026',
      points: [
        'Built **direct and group chat** with typing indicators, presence, and delivery/read receipts.',
        'Added **reactions, replies, search, pins, and rich-media sharing**.',
        'Enforced **backend authorization** for friendships, groups, administration, blocking, reporting, and moderation.',
        'Secured webhooks, validated server input, **rate-limited uploads**, and protected media access.',
        'Added **cursor pagination** and synchronized client state through **Socket.IO events**.',
        'Built **backend/frontend tests** and a production-ready multi-stage **Docker deployment**.',
      ],
    },
    {
      name: 'Connect Four AI Agent',
      subtitle: 'Python, Game Theory, Heuristics',
      dates: 'Oct. 2026',
      points: [
        'Built an adversarial agent using **Minimax with Alpha-Beta Pruning** for a 6x7 board.',
        'Designed a **heuristic evaluation function** that prioritized strategic positioning and won over **80% of simulated matches**.',
        'Added **dynamic move ordering** to increase pruning and reduce computation time.',
        'Tuned **recursion depth** to balance decision quality with real-time performance.',
      ],
    },
    {
      name: 'Coding Quest Competition',
      subtitle: 'Competitive Programming',
      dates: 'Oct. 2022',
      points: [
        'Represented the International School of Kuala Lumpur and placed **1st overall**.',
        'Earned multiple **top-10, top-20, and top-30 global problem solves**.',
      ],
    },
  ],
}
