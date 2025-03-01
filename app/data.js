export default {
  "intro": {
    "title": "Tauri + React | Building better cross functional Apps",
    "author": "Jagadeesh Jayachandran | React Chennai",
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
        "content": "ja.gadee.sh",
        "url": "https://ja.gadee.sh"
      }
    ]
  },
    "agenda": {
      "id": "agenda",
      "title": "Talk Agenda",
      "subtitles": [
        "What are Cross-Platform Apps?",
        "Electron - The Heavyweight Champion",
        "Tauri - A Better Alternative",
        "WebView and the Rust Connection",
        "A Quick Look at Tauris APIs",
        "Lets Build a Clipboard Manager",
        "Final Thoughts",
      ]
    },


    "whatIsCrossFunctionalApp": {
      "id": "whatIsCrossPlatformApp",
      "title": "What are Cross-Platform Apps?",
      "horizandalSubSlides": [
        {
          "title": "The Basics",
          "list": [
            {
              "title": "What is a Cross-Platform App?",
              "content": "A software application that runs on multiple operating systems (Windows, macOS, Linux) using a single codebase."
            },
            {
              "title": "How Do They Work?",
              "content": "Cross-platform apps leverage frameworks like Electron, Tauri, or Flutter to abstract OS-specific differences and provide a unified development approach."
            },
            {
              "title": "Why Build Cross-Platform?",
              "content": "Develop once, deploy everywhere. Reduces development time, cost, and effort while ensuring consistency across devices."
            }
          ]
        },
        {
          "title": "Key Characteristics",
          "list": [
            {
              "title": "Single Codebase",
              "content": "Cross-platform frameworks allow developers to write code once and deploy it across multiple operating systems."
            },
            {
              "title": "Platform Independence",
              "content": "Apps run smoothly across Windows, macOS, and Linux without needing major modifications."
            },
            {
              "title": "Cost & Time Efficiency",
              "content": "Maintaining one codebase instead of multiple native applications reduces costs and speeds up development cycles."
            }
          ]
        },
        {
          "title": "Examples of Cross-Platform Apps",
          "list": [
            {
              "title": "VS Code (Electron)",
              "content": "A widely used code editor built using Electron, making it available on Windows, macOS, and Linux."
            },
            {
              "title": "Slack (Electron)",
              "content": "A popular communication platform using Electron for a seamless cross-platform experience."
            },
            {
              "title": "Tauri Apps",
              "content": "Modern lightweight desktop applications built with Tauri that consume fewer system resources while maintaining cross-platform compatibility."
            }
          ]
        }
      ]
    },

    "whyCrossPlatformApps": {
      "id": "whyCrossPlatformApps",
      "title": "Why Companies Use Cross-Platform Apps?",
      "horizandalSubSlides": [
        {
          "title": "Faster Development & Deployment",
          "content": "A single codebase allows companies to build and release desktop apps quicker, reducing development time and effort compared to maintaining separate native apps for each OS."
        },
        {
          "title": "Cost Efficiency",
          "content": "Businesses save on development and maintenance costs by avoiding the need for separate teams managing Windows, macOS, and Linux versions of their software."
        },
        {
          "title": "Wider Market Reach",
          "content": "Cross-platform apps ensure accessibility across different operating systems, increasing user adoption and expanding the potential customer base."
        },
        {
          "title": "Easier Maintenance & Updates",
          "content": "Bug fixes, new features, and updates can be rolled out simultaneously across all platforms, ensuring consistency and a seamless user experience."
        }
      ]
    },

    "letsTalkElectron": {
      "id": "letsTalkElectron",
      "title": "Electron, the Heavyweight Champion",
      "horizandalSubSlides": [
        {
          "title": "What is Electron?",
          "list": [
            {
              "title": "A Cross-Platform Desktop Framework",
              "content": "Electron allows developers to build desktop applications using web technologies like HTML, CSS, and JavaScript."
            },
            {
              "title": "Powered by Chromium & Node.js",
              "content": "Each Electron app bundles a full Chromium browser and Node.js runtime, enabling powerful web-based experiences on desktop."
            },
            {
              "title": "Who Uses Electron?",
              "content": "Popular apps like VS Code, Slack, Discord, and Figma are built with Electron, proving its capability to handle large-scale applications."
            }
          ]
        },
        {
          "title": "The Darling of Developers",
          "list": [
            {
              "title": "Web Developers Feel at Home",
              "content": "Electron lets web developers build desktop apps with the same stack they already know - HTML, CSS, and JavaScript."
            },
            {
              "title": "Cross-Platform by Default",
              "content": "With a single codebase, apps run seamlessly on Windows, macOS, and Linux, eliminating the need for separate native apps."
            },
            {
              "title": "Rich Ecosystem & Community",
              "content": "Backed by GitHub and a massive community, Electron has extensive documentation and thousands of libraries for rapid development."
            }
          ]
        },
        {
          "title": "Eats RAM for breakfast",
          "list": [
            {
              "title": "Resource Hog",
              "content": "Electron apps bundle an entire Chromium instance, leading to high RAM and CPU usage, even for simple apps."
            },
            {
              "title": "Bloated App Sizes",
              "content": "An Electron app can easily be 100-200MB due to the bundled browser, compared to native apps that are much smaller."
            },
            {
              "title": "Not Truly Native",
              "content": "Despite looking like a desktop app, Electron apps don't integrate as deeply with the OS as true native applications."
            }
          ]
        }
      ]
    },

    "tauriAsAlternative": {
      "id": "tauriAsAlternative",
      "title": "Tauri - A Better Alternative",
      "horizandalSubSlides": [
        {
          "title": "What is Tauri?",
          "list": [
            {
              "title": "A Lightweight Cross-Platform Framework",
              "content": "Tauri is an open-source framework that lets developers build desktop applications using web technologies, but with significantly lower resource consumption."
            },
            {
              "title": "Built with Rust",
              "content": "Tauri uses Rust for its backend, ensuring better memory safety, security, and performance compared to Electron’s Node.js runtime."
            },
            {
              "title": "Who Uses Tauri?",
              "content": "Tauri is gaining adoption among developers looking for an Electron alternative, with apps like AppFlowy and Sidekick showcasing its capabilities."
            }
          ]
        },
        {
          "title": "How Tauri Works?",
          "list": [
            {
              "title": "WebView Instead of Bundling a Browser",
              "content": "Unlike Electron, which ships with Chromium, Tauri uses the system’s native WebView, reducing app size and memory consumption."
            },
            {
              "title": "Rust-Powered Backend",
              "content": "The backend logic is handled by Rust, which enables direct system access, better security, and superior performance compared to JavaScript-based Electron."
            },
            {
              "title": "Secure API Communication",
              "content": "Tauri restricts access to system APIs using permission-based access, making it more secure than Electron’s unrestricted Node.js access."
            }
          ]
        },
        {
          "title": "Why Tauri is Better?",
          "list": [
            {
              "title": "Smaller App Size",
              "content": "Tauri apps are typically under 10MB, compared to Electron apps that can exceed 100MB due to the bundled Chromium engine."
            },
            {
              "title": "Lower RAM & CPU Usage",
              "content": "Since it relies on the system’s WebView instead of running a full browser instance, Tauri consumes far fewer resources."
            },
            {
              "title": "Better Security",
              "content": "Tauri apps are sandboxed by default, limiting what the application can access and reducing security risks."
            },
            {
              "title": "Deep OS Integration",
              "content": "Unlike Electron, which runs in a browser-like environment, Tauri apps can interact more efficiently with the underlying operating system."
            }
          ]
        }
      ]
    },

    "understandingWebView": {
      "id": "understandingWebView",
      "title": "Understanding WebView",
      "horizandalSubSlides": [
        {
          "title": "What is WebView?",
          "content": "WebView is a built-in component in operating systems that allows apps to display web content without needing a full browser."
        },
        {
          "title": "How Does WebView Work?",
          "content": "It acts as a lightweight browser within an application, rendering HTML, CSS, and JavaScript inside a native app."
        },
        {
          "title": "Why Use WebView?",
          "content": "Using WebView eliminates the need to bundle a full browser engine, reducing app size and improving performance while maintaining web capabilities."
        },
        {
          "title": "WebView in Tauri vs. Electron",
          "content": "Electron bundles Chromium, making apps heavier, while Tauri leverages the system’s native WebView, keeping apps lightweight and efficient."
        }
      ]
    },

    "understandingRust": {
      "id": "understandingRust",
      "title": "Understanding Rust",
      "horizandalSubSlides": [
        {
          "title": "What is Rust?",
          "content": "Rust is a modern, systems-level programming language focused on performance, memory safety, and concurrency, without a garbage collector."
        },
        {
          "title": "Why is Rust Fast?",
          "content": "Rust compiles directly to machine code, eliminating runtime overhead and making it as fast as C and C++."
        },
        {
          "title": "How Does Rust Ensure Safety?",
          "content": "Rust prevents memory leaks and security vulnerabilities with strict ownership, borrowing, and type safety rules."
        },
        {
          "title": "Why Rust in Tauri?",
          "content": "Tauri uses Rust to handle system-level tasks securely and efficiently, making apps smaller, faster, and safer than Electron."
        }
      ]
    },

    "theCatch": {
      "id": "theCatch",
      "title": "Okay.. What's the catch?",
      "horizandalSubSlides": [
        {
          "list": 
          [
            {
              "content": "",
             "images": [
              './images/webview-vs-electron.png',
             ]
            }
          ]
        }
      
      ]
    },

    "arch": {
      "id": "arch",
      "title": "How Tauri Works",
      "center": true,
      "horizandalSubSlides": [
        {
          "list": 
          [
            {
              "content": "",
             "images": [
              './images/arc.png',
             ]
            }
          ]
        }
      
      ]
    },

  
    "tauriApiBreakdown": {
      "id": "tauriApiBreakdown",
      "title": "Tauri APIs",
      "horizandalSubSlides": [
        {
          "title": "System & App Management",
          "list": [
            {
              "title": "app",
              "content": "Retrieve app metadata, manage lifecycle events, and control app state."
            },
            {
              "title": "os",
              "content": "Get OS details like platform, version, and architecture for system-specific logic."
            },
            {
              "title": "path",
              "content": "Access common system paths like home, temp, downloads, and config directories."
            }
          ]
        },
        {
          "title": "File & Process Handling",
          "list": [
            {
              "title": "fs",
              "content": "Perform file operations like read, write, delete, and directory management securely."
            },
            {
              "title": "process",
              "content": "Execute system processes, manage running applications, and handle process termination."
            },
            {
              "title": "shell",
              "content": "Run terminal commands safely with sandboxing to prevent security risks."
            }
          ]
        },
        {
          "title": "User Interaction & UI Control",
          "list": [
            {
              "title": "dialog",
              "content": "Open native file pickers, alerts, and confirmation dialogs for user interactions."
            },
            {
              "title": "notification",
              "content": "Send desktop notifications with system-level visibility and custom messages."
            },
            {
              "title": "window",
              "content": "Control application windows—resize, minimize, maximize, focus, or set always-on-top behavior."
            }
          ]
        },
        {
          "title": "Performance & Background Tasks",
          "list": [
            {
              "title": "globalShortcut",
              "content": "Register and handle system-wide keyboard shortcuts for quick actions."
            },
            {
              "title": "event",
              "content": "Send and listen for real-time events between frontend and backend components."
            },
            {
              "title": "http",
              "content": "Make network requests securely, bypass CORS restrictions, and fetch APIs efficiently."
            }
          ]
        },
        {
          "title": "Clipboard & Updates",
          "list": [
            {
              "title": "clipboard",
              "content": "Read and write text data to the system clipboard for easy copy-paste."
            },
            {
              "title": "updater",
              "content": "Enable secure auto-updates for the application, keeping users on the latest version."
            },
            {
              "title": "tauri",
              "content": "Core API that integrates frontend WebView with backend Rust for secure app operations."
            }
          ]
        }
      ]
    },

    "demo": {
      "id": "demo",
      "title": "Let's Make a simple app?",
      "horizandalSubSlides": [
        {
          
        }
      
      ]
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
          content: "ja.gadee.sh",
          url: "https://ja.gadee.sh",
        },
        {
          icon: "IoMailSharp",
          content: "j@gadee.sh",
          url: "mailto:j@gadee.sh",
        },
      ],
    },
}