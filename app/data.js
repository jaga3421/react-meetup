export default {
  "intro": {
    "title": "React Without the Internet: Building Offline-First Web Apps",
    "author": "Jagadeesh J, Founding Engineer, Functionals.ai",
    "social": [
      {
        "icon": "FaLinkedin",
        "content": "/in/jjayy",
        "url": "https://www.linkedin.com/in/jjayy"
      },
      {
        "icon": "FaGithub",
        "content": "/jaga3421",
        "url": "https://www.github.com/jaga3421"
      },
      {
        "icon": "FaLink",
        "content": "jaagdeesh-j.vercel.app",
        "url": "https://jaagdeesh-j.vercel.app"
      }
    ]
  },
    "agenda": {
      "id": "agenda",
      "title": "Talk Agenda",
      "subtitles": [
        "What is Offline-First?",
        "Offline-First vs PWA",
        "Core Concepts",
        "Technical Stack",
        "Common Libraries",
        "Demo: Offline-First App",
        "Final Thoughts",
      ]
    },


    "whatIsOfflineFirst": {
      "id": "whatIsOfflineFirst",
      "title": "What is Offline-First?",
      "horizandalSubSlides": [
        {
          "title": "The Basics",
          "list": [
            {
              "title": "What is Offline-First?",
              "content": "An application design approach where the app works seamlessly even without an internet connection, treating offline as the default state."
            },
            {
              "title": "How Do They Work?",
              "content": "Offline-first apps use local storage, caching, and background sync to ensure functionality regardless of network connectivity."
            },
            {
              "title": "Why Build Offline-First?",
              "content": "Provides better user experience, reliability, and performance by eliminating dependency on network availability."
            }
          ]
        },
        {
          "title": "Key Characteristics",
          "list": [
            {
              "title": "Local-First Architecture",
              "content": "Data is stored and processed locally first, then synchronized with the server when connectivity is available."
            },
            {
              "title": "Seamless Offline Experience",
              "content": "Users can read, create, and edit data even when completely disconnected from the internet."
            },
            {
              "title": "Background Synchronization",
              "content": "Changes are queued locally and automatically synced when the connection is restored, ensuring data consistency."
            }
          ]
        },
        {
          "title": "Examples of Offline-First Apps",
          "list": [
            {
              "title": "Google Docs",
              "content": "Allows editing documents offline with changes syncing automatically when connection is restored."
            },
            {
              "title": "Notion",
              "content": "Works offline with local caching, enabling users to access and edit their workspace without internet."
            },
            {
              "title": "Linear",
              "content": "Project management tool that functions offline, queuing actions and syncing when online."
            }
          ]
        }
      ]
    },

    "offlineFirstVsPWA": {
      "id": "offlineFirstVsPWA",
      "title": "Offline-First vs PWA",
      "horizandalSubSlides": [
        {
          "title": "What is PWA?",
          "content": "Progressive Web Apps are web applications that use modern web capabilities to provide a native app-like experience. They can work offline but typically require online-first architecture with offline as a fallback."
        },
        {
          "title": "Key Difference",
          "content": "PWA treats online as primary and offline as secondary. Offline-First treats offline as primary and online as enhancement. Offline-First apps work completely offline from the start, while PWAs add offline capabilities to online apps."
        },
        {
          "title": "Data Strategy",
          "content": "PWAs cache resources for offline access but often need network for core functionality. Offline-First apps store all data locally first, then sync when online, ensuring full functionality without network."
        },
        {
          "title": "When to Use Each",
          "content": "Use PWA for content-heavy apps that can tolerate limited offline functionality. Use Offline-First for data-critical apps, collaboration tools, or apps used in unreliable network conditions where full offline capability is essential."
        }
      ]
    },

    "offlineFirstExamples": {
      "id": "offlineFirstExamples",
      "title": "Offline Apps in Action",
      "horizandalSubSlides": [
        {
          "title": "WhatsApp Web",
          "image": "https://images.hindustantimes.com/tech/img/2021/08/25/1600x900/background-5234461_1920_1628680367499_1629866749478.png",
          "list": [
            {
              "title": "Offline Experience",
              "content": "View limited chat history stored locally. Recent conversations remain accessible even without internet connection."
            },
            {
              "title": "Send Messages Offline",
              "content": "Compose and send messages while offline. Messages are queued locally and automatically sent when connection is restored."
            },
            {
              "title": "Seamless Sync",
              "content": "Once online, queued messages are sent automatically and new messages are synced in the background without interrupting your workflow."
            }
          ]
        },
        {
          "title": "Google Docs",
          "image": "https://media.licdn.com/dms/image/v2/D4D12AQHVMcx-ckRzTQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1693712101604?e=2147483647&v=beta&t=x2x4Klr6G4MotvdA5Vknr0huNRVJi0dNJ4ojugImG-Q",
          "list": [
            {
              "title": "Offline Experience",
              "content": "View and edit documents completely offline. All changes are saved locally and synced automatically when you reconnect."
            },
            {
              "title": "Real-time Collaboration",
              "content": "Continue editing while offline. When online, your changes merge seamlessly with others' edits, maintaining document integrity."
            },
            {
              "title": "Background Sync",
              "content": "Changes made offline are queued and synchronized in the background, ensuring no data loss even with intermittent connectivity."
            }
          ]
        },
        {
          "title": "Notion",
          "image": "https://ceblog.s3.amazonaws.com/wp-content/uploads/2023/05/18140417/notion-brand-logo.png",
          "list": [
            {
              "title": "Offline Experience",
              "content": "Access and edit your workspace offline. All pages and content you've viewed are cached locally for offline access."
            },
            {
              "title": "Full Functionality",
              "content": "Create new pages, edit existing content, and organize your workspace even without internet. All changes are saved locally first."
            },
            {
              "title": "Automatic Sync",
              "content": "When connection is restored, all offline changes sync automatically, keeping your workspace up-to-date across all devices."
            }
          ]
        }
      ]
    },

    "coreConcepts": {
      "id": "coreConcepts",
      "title": "Core Concepts",
      "horizandalSubSlides": [
        {
          "title": "Caching",
          "list": [
            {
              "title": "Service Worker Caching",
              "content": "Service Workers cache network requests and serve them offline. Use Cache API to store static assets, API responses, and dynamic content for offline access."
            },
            {
              "title": "Cache Strategies",
              "content": "Implement cache-first, network-first, or stale-while-revalidate strategies. Choose based on data freshness requirements and offline priority."
            },
            {
              "title": "Cache Management",
              "content": "Manage cache size, expiration, and versioning. Clean up old caches and update cached content when new versions are available."
            }
          ]
        },
        {
          "title": "Local Database",
          "list": [
            {
              "title": "IndexedDB Storage",
              "content": "IndexedDB provides large-scale client-side storage for structured data. Store user data, application state, and cached content that persists across sessions."
            },
            {
              "title": "LocalStorage & SessionStorage",
              "content": "Use localStorage for persistent key-value data and sessionStorage for temporary data. Ideal for user preferences, settings, and small data sets."
            },
            {
              "title": "Data Persistence",
              "content": "Ensure data persists across browser sessions and app restarts. Implement data migration strategies when schema changes are needed."
            }
          ]
        },
        {
          "title": "Offline/Online Detection",
          "list": [
            {
              "title": "Online/Offline Events",
              "content": "Listen to navigator.onLine and online/offline events to detect network status changes. React to connectivity changes in real-time to adjust app behavior."
            },
            {
              "title": "Network Information API",
              "content": "Use Network Information API to detect connection type, bandwidth, and quality. Optimize data usage based on connection capabilities."
            },
            {
              "title": "Heartbeat Checks",
              "content": "Implement periodic network checks by pinging a server endpoint. Detect intermittent connectivity and handle connection failures gracefully."
            }
          ]
        },
        {
          "title": "Synchronization",
          "list": [
            {
              "title": "Background Sync",
              "content": "Use Background Sync API to queue actions when offline and execute them when connection is restored. Perfect for sending messages and syncing data."
            },
            {
              "title": "Conflict Resolution",
              "content": "Handle conflicts when offline changes conflict with server data. Implement strategies like last-write-wins, merge algorithms, or user intervention."
            },
            {
              "title": "Optimistic Updates",
              "content": "Update UI immediately when user performs actions, then sync with server. Rollback changes if sync fails, providing instant feedback."
            }
          ]
        }
      ]
    },

    "demoWithoutOffline": {
      "id": "demoWithoutOffline",
      "title": "Demo - App without offline support",
      "copy": "See how an app behaves without offline capabilities.",
      "link": "/demo-1",
      "linkText": "Demo app"
    },

    "technicalStack": {
      "id": "technicalStack",
      "title": "Technical Stack",
      "horizandalSubSlides": [
        {
          "title": "Service Workers",
          "code": "// Register Service Worker\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js')\n    .then(registration => {\n      console.log('SW registered');\n    });\n}\n\n// Cache API\nself.addEventListener('fetch', event => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(response => response || fetch(event.request))\n  );\n});",
          "language": "javascript",
          "list": [
            {
              "title": "What is Service Worker?",
              "content": "A JavaScript file that runs in the background, intercepting network requests and enabling offline functionality."
            },
            {
              "title": "Cache API",
              "content": "Service Workers use the Cache API to store network requests and serve them offline, enabling offline-first functionality."
            },
            {
              "title": "Background Sync",
              "content": "Service Workers can queue actions when offline and execute them when connection is restored using Background Sync API."
            }
          ]
        },
        {
          "title": "IndexedDB",
          "code": "// Open IndexedDB database\nconst request = indexedDB.open('NotesDB', 1);\n\nrequest.onupgradeneeded = (event) => {\n  const db = event.target.result;\n  const objectStore = db.createObjectStore('notes', {\n    keyPath: 'id',\n    autoIncrement: true\n  });\n};\n\n// Add note\nconst addNote = (note) => {\n  const transaction = db.transaction(['notes'], 'readwrite');\n  const objectStore = transaction.objectStore('notes');\n  return objectStore.add(note);\n};\n\n// Get all notes\nconst getAllNotes = () => {\n  const transaction = db.transaction(['notes'], 'readonly');\n  const objectStore = transaction.objectStore('notes');\n  return objectStore.getAll();\n};",
          "language": "javascript",
          "list": [
            {
              "title": "What is IndexedDB?",
              "content": "A low-level API for client-side storage of large amounts of structured data, including files and blobs."
            },
            {
              "title": "Why Use IndexedDB?",
              "content": "IndexedDB provides large-scale storage for structured data, perfect for storing user data, application state, and cached content."
            },
            {
              "title": "Offline Data Storage",
              "content": "IndexedDB persists data across browser sessions, making it ideal for offline-first applications that need to store data locally."
            }
          ]
        },
        {
          "title": "Network Detection & Sync",
          "code": "// Detect online/offline status\nconst [isOnline, setIsOnline] = useState(navigator.onLine);\n\nuseEffect(() => {\n  const handleOnline = () => setIsOnline(true);\n  const handleOffline = () => setIsOnline(false);\n  \n  window.addEventListener('online', handleOnline);\n  window.addEventListener('offline', handleOffline);\n  \n  return () => {\n    window.removeEventListener('online', handleOnline);\n    window.removeEventListener('offline', handleOffline);\n  };\n}, []);\n\n// Sync when online\nuseEffect(() => {\n  if (isOnline) {\n    syncPendingChanges();\n  }\n}, [isOnline]);\n\n// Queue changes when offline\nconst saveNote = async (note) => {\n  await saveToIndexedDB(note);\n  if (!isOnline) {\n    queueForSync('add', note);\n  } else {\n    syncToServer(note);\n  }\n};",
          "language": "javascript",
          "list": [
            {
              "title": "Online/Offline Detection",
              "content": "Listen to browser online/offline events to detect network status changes and adjust app behavior accordingly."
            },
            {
              "title": "Automatic Sync",
              "content": "When connection is restored, automatically sync pending changes from local storage to the server."
            },
            {
              "title": "Queue Management",
              "content": "Queue user actions when offline and execute them when online, ensuring no data loss during offline periods."
            }
          ]
        },
        {
          "title": "React Hooks",
          "code": "// Custom hook for offline-first notes\nconst useNotes = () => {\n  const [notes, setNotes] = useState([]);\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n\n  useEffect(() => {\n    // Load from IndexedDB first\n    loadFromIndexedDB().then(setNotes);\n    \n    // Then sync with server if online\n    if (isOnline) {\n      syncWithServer();\n    }\n  }, [isOnline]);\n\n  const addNote = async (note) => {\n    // Save to IndexedDB immediately\n    await saveToIndexedDB(note);\n    setNotes(prev => [...prev, note]);\n    \n    // Queue for sync if offline\n    if (!isOnline) {\n      queueForSync('add', note);\n    }\n  };\n\n  return { notes, addNote };\n};",
          "language": "javascript",
          "list": [
            {
              "title": "State Management",
              "content": "Use React hooks like useState and useEffect to manage application state and handle offline/online transitions."
            },
            {
              "title": "Custom Hooks",
              "content": "Create custom hooks to encapsulate offline-first logic, making it reusable across components and easier to maintain."
            },
            {
              "title": "Optimistic Updates",
              "content": "Update UI immediately when user performs actions, then sync with server in the background for better user experience."
            }
          ]
        }
      ]
    },

    "usefulLibraries": {
      "id": "usefulLibraries",
      "title": "Useful Libraries",
      "horizandalSubSlides": [
        {
          "title": "Workbox",
          "content": "A set of libraries and Node modules that make it easy to cache assets and take full advantage of Service Workers. Simplifies Service Worker management and provides powerful caching strategies."
        },
        {
          "title": "Dexie.js",
          "content": "A wrapper library for IndexedDB that provides a cleaner, promise-based API. Makes IndexedDB operations simpler and more intuitive for React developers."
        },
        {
          "title": "React Query / SWR",
          "content": "Data fetching libraries with built-in offline support. Automatically cache data, handle background updates, and sync when connection is restored."
        },
        {
          "title": "PouchDB / RxDB",
          "content": "Local-first databases that sync with remote databases. PouchDB syncs with CouchDB, while RxDB provides real-time sync capabilities for offline-first React apps."
        }
      ]
    },

    "theCatch": {
      "id": "theCatch",
      "title": "Okay.. What's the catch?",
      "horizandalSubSlides": [
        {
          "title": "Challenges of Offline-First",
          "list": [
            {
              "title": "Complexity",
              "content": "Building offline-first apps requires handling caching, sync, conflict resolution, and state management, adding complexity to the codebase."
            },
            {
              "title": "Storage Limits",
              "content": "Browser storage has limits. IndexedDB typically allows 50% of disk space, but you need to manage storage quotas and cleanup strategies."
            },
            {
              "title": "Conflict Resolution",
              "content": "When offline changes conflict with server data, you need robust strategies like last-write-wins, merge algorithms, or user intervention."
            },
            {
              "title": "Testing Challenges",
              "content": "Testing offline scenarios requires simulating network failures, slow connections, and sync conflicts, making testing more complex."
            }
          ]
        }
      ]
    },


    "demoWithOffline": {
      "id": "demoWithOffline",
      "title": "Demo - App with offline capabilities",
      "copy": "Let's see how an offline-first app will behave",
      "link": "/demo-1",
      "linkText": "Demo app"
    },
  

    "thank": {
      "title": "Thanks & QA ?",
      "social": [
        {
          icon: "FaLinkedin",
          content: "/in/jjayy",
          url: "https://www.linkedin.com/in/jjayy",
        },
        {
          icon: "FaGithub",
          content: "/jaga3421",
          url: "https://www.github.com/jaga3421",
        },
        {
          icon: "FaLink",
          content: "jaagdeesh-j.vercel.app",
          url: "https://jaagdeesh-j.vercel.app",
        },
        {
          icon: "IoMailSharp",
          content: "jagadeesh.jkp@gmail.com",
          url: "mailto:jagadeesh.jkp@gmail.com",
        },
      ],
    },
}