export default {
  "intro": {
    "title": "Voice first React",
    "subtitle": "Build web application that listens to you",
    "author": "Jagadeesh",
    "meetup": "React Bangalore",
    "company": "Turing",
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
        "content": "jagadeesh-j.vercel.app",
        "url": "https://jagadeesh-j.vercel.app"
      }
    ]
  },
  "agenda": {
    "id": "agenda",
    "title": "Talk Agenda",
    "subtitles": [
      "CLI → GUI → Voice",
      "Use Cases",
      "React Architecture",
      "Implementation",
      "Demo",
      "Phrase vs Intent",
      "Best Practices",
      "Q&A"
    ]
  },

  "theEvolution": {
    "id": "theEvolution",
    "title": "CLI → GUI → Voice",
    "horizandalSubSlides": [
      {
        "title": "CLI",
        "content": "Command driven",
        "example": "precise,scriptable,expert"
      },
      {
        "title": "GUI",
        "content": "Direct manipulation",
        "example": "clickable,intuitive,spatial"
      },
      {
        "title": "Voice",
        "content": "Natural interaction",
        "example": "natural,hands-free,ambient"
      }
    ]
  },

  "realLifeUseCases": {
    "id": "realLifeUseCases",
    "title": "Use Cases",
    "horizandalSubSlides": [
      {
        "title": "Accessibility",
        "list": [
          { "title": "Inclusion", "content": "Empowering users with motor or visual impairments" },
          { "title": "Alt-Input", "content": "Voice as a primary, not secondary, interaction" }
        ]
      },
      {
        "title": "Hands-Free Contexts",
        "list": [
          { "title": "Safety", "content": "Driving, industrial work, medical procedures" },
          { "title": "Convenience", "content": "Smart homes, cooking, multi-tasking" }
        ]
      },
      {
        "title": "Next-Gen Agents",
        "list": [
          { "title": "Contextual AI", "content": "Talking to LLMs directly within your app" },
          { "title": "intent-First", "content": "Replacing complex forms with natural dialogue" }
        ]
      }
    ]
  },

  "theGeneralIdea": {
    "id": "theGeneralIdea",
    "title": "How Voice Interfaces Work",
    "horizandalSubSlides": [
      {
        "title": "The Interaction Loop",
        "list": [
          { "title": "Listen", "content": "Capture audio continuously and detect when the user starts or stops speaking" },
          { "title": "Transcribe", "content": "Convert speech into text using the browser or a cloud speech-to-text API" },
          { "title": "Understand", "content": "Decide whether the text is a direct command, free-form intent, or just dictation" },
          { "title": "Act", "content": "Trigger a React state change, API call, navigation, or spoken response" }
        ]
      }
    ]
  },

  "commandsVsConversation": {
    "id": "commandsVsConversation",
    "title": "Commands vs Conversation",
    "horizandalSubSlides": [
      {
        "title": "Command Mode",
        "list": [
          { "title": "Deterministic", "content": "Exact or near-exact phrases like 'next slide', 'open demo', or 'submit form'" },
          { "title": "Fast", "content": "Low latency and predictable results because you already know the supported actions" },
          { "title": "Safer", "content": "Best for navigation, toggles, filters, or anything that changes app state directly" }
        ]
      },
      {
        "title": "Conversation Mode",
        "list": [
          { "title": "Flexible", "content": "Natural language requests like 'show me the customer who signed up yesterday'" },
          { "title": "Ambiguous", "content": "Needs interpretation, slot extraction, and more careful validation" },
          { "title": "AI-Friendly", "content": "Best for assistants, search, summarization, and contextual help" }
        ]
      },
      {
        "title": "The Practical Rule",
        "list": [
          { "title": "Commands First", "content": "Use deterministic matching whenever the action is known and bounded" },
          { "title": "Escalate When Needed", "content": "Use AI only when the user's language is too fuzzy for direct matching" },
          { "title": "Keep UX Clear", "content": "Users should know whether they are controlling the app or talking to an assistant" }
        ]
      }
    ]
  },

  "reactArchitecture": {
    "id": "reactArchitecture",
    "title": "Voice Architecture in React",
    "horizandalSubSlides": [
      {
        "title": "A Clean State Flow",
        "list": [
          { "title": "Speech Input", "content": "Microphone audio enters through Web Speech API or a streaming transcription service" },
          { "title": "Transcript State", "content": "React stores the current transcript separately from UI state and command state" },
          { "title": "Intent Parser", "content": "A parser or matcher converts text into a known command or structured intent" },
          { "title": "Action Dispatcher", "content": "Only the dispatcher changes app state, calls APIs, or navigates routes" }
        ]
      },
      {
        "title": "Why React Fits Well",
        "list": [
          { "title": "State Coordination", "content": "Voice UIs have many moving states: listening, idle, interim text, final text, errors, and permissions" },
          { "title": "Component Boundaries", "content": "A microphone button, transcript panel, and action result can stay isolated but synchronized" },
          { "title": "Predictable Updates", "content": "The UI remains a function of state, even when the input is continuous and event-driven" }
        ]
      }
    ]
  },

  "triggerCommands": {
    "id": "triggerCommands",
    "title": "Trigger Commands and Intent Detection",
    "horizandalSubSlides": [
      {
        "title": "Examples",
        "list": [
          { "title": "Navigation", "content": "'next slide', 'previous slide', 'open demo'" },
          { "title": "Controls", "content": "'start listening', 'stop listening', 'pause timer'" },
          { "title": "Tasks", "content": "'search docs for hooks', 'filter by status', 'create a note'" }
        ]
      },
      {
        "title": "How to Detect Them",
        "list": [
          { "title": "Command Registry", "content": "Store supported phrases and handlers in one place instead of scattering string checks across components" },
          { "title": "Aliases", "content": "Support natural variations like 'go next', 'next one', or 'show the demo'" },
          { "title": "Confidence", "content": "Require enough certainty before firing a command that mutates state or triggers an API call" }
        ]
      },
      {
        "title": "What Not to Do",
        "list": [
          { "title": "Don't Execute Raw Text", "content": "A transcript is not a command until it has been matched and validated" },
          { "title": "Don't Mix Parsing with UI", "content": "Keep intent detection separate from button rendering and side effects" },
          { "title": "Don't Trust Interim Text", "content": "Use interim text for feedback, but trigger actions from stable final phrases" }
        ]
      }
    ]
  },

  "exampleImplementation": {
    "id": "exampleImplementation",
    "title": "Implementation",
    "horizandalSubSlides": [
      {
        "title": "What You Build",
        "code": "function VoiceController() {\n  const [transcript, setTranscript] = useState(\"\");\n  const [isListening, setIsListening] = useState(false);\n\n  // 1. Listen continuously\n  // 2. Wait for pause\n  // 3. Match command\n  // 4. Dispatch safe action\n}",
        "language": "javascript",
        "list": [
          { "title": "One loop", "content": "A single controller listens, waits for a pause, understands the phrase, and decides what happens next." },
          { "title": "Predictable states", "content": "You will manage listening, transcript, command match, execution, and optional AI mode as separate states." }
        ]
      },
      {
        "title": "What You Need",
        "code": "const commands = [\n  { phrases: [\"next slide\", \"next\"], action: goNext },\n  { phrases: [\"previous slide\"], action: goPrevious },\n  { phrases: [\"pause timer\"], action: pauseTimer },\n];",
        "language": "javascript",
        "list": [
          { "title": "Command registry", "content": "Keep supported phrases and handlers in one place so the system stays debuggable." },
          { "title": "Fallback path", "content": "Exact phrase matching can run first; AI can come later only for ambiguous cases." }
        ]
      },
      {
        "title": "What Users See",
        "code": "<VoiceInterface />\n<VoiceSubtitleBar />\n<TimerComponent timer={25} />",
        "language": "javascript",
        "list": [
          { "title": "Immediate feedback", "content": "Show whether the mic is active, what was heard, and what command was triggered." },
          { "title": "Safe actions", "content": "Only validated commands should navigate, start timers, or mutate state." }
        ]
      }
    ]
  },

  "bestPractices": {
    "id": "bestPractices",
    "title": "Best Practices",
    "subtitles": [
      "Always show microphone state and permission state",
      "Keep keyboard/mouse fallback for every critical flow",
      "Separate transcript, intent, and action",
      "Confirm destructive actions before executing them",
      "Use final phrases for commands, not unstable interim text",
      "Measure latency, failures, and no-match commands",
      "Design for noise, accents, and bad network conditions",
      "Be explicit about what stays local vs what goes to cloud"
    ]
  },

  "usingAI": {
    "id": "usingAI",
    "title": "Using AI",
    "horizandalSubSlides": [
      {
        "title": "Where AI Helps",
        "list": [
          { "title": "Intent Extraction", "content": "Turn fuzzy natural language into a structured intent and parameters" },
          { "title": "Contextual Help", "content": "Answer user questions inside the app without forcing rigid commands" },
          { "title": "Formatting", "content": "Clean up dictation, summarize notes, or extract tasks from speech" }
        ]
      },
      {
        "title": "Where AI Should Not Lead",
        "list": [
          { "title": "Critical Controls", "content": "Don't let a model directly trigger payments, deletes, or irreversible mutations" },
          { "title": "Permission Boundaries", "content": "The model can suggest an intent, but the app must own execution" },
          { "title": "Basic Commands", "content": "Simple known commands should stay deterministic for speed and reliability" }
        ]
      },
      {
        "title": "The Hybrid Model",
        "list": [
          { "title": "Step 1", "content": "Try exact command matching against a registry of supported actions" },
          { "title": "Step 2", "content": "If nothing matches, send the transcript to AI for structured intent parsing" },
          { "title": "Step 3", "content": "Validate the AI result against an allow-list before dispatching the action" }
        ]
      }
    ]
  },

  "reactMentalModelExamples": {
    "id": "reactMentalModelExamples",
    "title": "Examples: Putting It Together",
    "horizandalSubSlides": [
      {
        "title": "Example 1: Derived State in Render",
        "code": "function ProductList({ products, filter }) {\n  // ✅ Calculate during render - pure computation\n  const filteredProducts = products.filter(\n    p => p.category === filter\n  );\n  const totalPrice = filteredProducts.reduce(\n    (sum, p) => sum + p.price, 0\n  );\n\n  return (\n    <div>\n      <p>Found {filteredProducts.length} products</p>\n      <p>Total: ${totalPrice}</p>\n    </div>\n  );\n}",
        "language": "javascript",
        "list": [
          {
            "title": "What's Happening",
            "content": "Filtering and calculating total happen during render - pure functions, no side effects"
          },
          {
            "title": "Why This Works",
            "content": "These values are derived from props. They recalculate automatically when props change"
          }
        ]
      },
      {
        "title": "Example 2: Side Effects in useEffect",
        "code": "function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n\n  // ✅ Side effect belongs in useEffect\n  useEffect(() => {\n    // Runs after commit - safe to fetch\n    fetch(`/api/users/${userId}`)\n      .then(res => res.json())\n      .then(setUser);\n  }, [userId]);\n\n  if (!user) return <div>Loading...</div>;\n  return <div>{user.name}</div>;\n}",
        "language": "javascript",
        "list": [
          {
            "title": "What's Happening",
            "content": "API call happens in useEffect - runs after component commits to DOM"
          },
          {
            "title": "Why This Works",
            "content": "Fetching is a side effect that affects outside world. useEffect is the right place"
          }
        ]
      },
      {
        "title": "Example 3: User Actions in Handlers",
        "code": "function SearchBox() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n\n  // ✅ User action handled directly in event handler\n  const handleSearch = (value) => {\n    setQuery(value);\n    if (value) {\n      // Direct response to user input - no waiting for render cycle\n      fetchResults(value).then(setResults);\n    } else {\n      setResults([]);\n    }\n  };\n\n  return (\n    <input\n      value={query}\n      onChange={(e) => handleSearch(e.target.value)}\n    />\n  );\n}",
        "language": "javascript",
        "list": [
          {
            "title": "What's Happening",
            "content": "Form input handled directly in onChange handler - immediate response to user action"
          },
          {
            "title": "Why This Works",
            "content": "User actions should trigger handlers immediately, not wait for render + effect cycle"
          }
        ]
      },
      {
        "title": "Example 4: Orchestrating Logic Properly",
        "code": "function UserDashboard({ userId }) {\n  const [user, setUser] = useState(null);\n  const [posts, setPosts] = useState([]);\n\n  // ✅ Single effect with async - clearer flow, no waterfall\n  useEffect(() => {\n    async function loadData() {\n      // Fetch user first\n      const userData = await fetchUser(userId);\n      setUser(userData);\n      \n      // Then fetch posts - sequential but in one effect\n      const postsData = await fetchPosts(userData.id);\n      setPosts(postsData);\n    }\n    loadData();\n  }, [userId]);\n\n  if (!user) return <div>Loading...</div>;\n  return (\n    <div>\n      <h1>{user.name}</h1>\n      <p>{posts.length} posts</p>\n    </div>\n  );\n}",
        "language": "javascript",
        "list": [
          {
            "title": "What's Happening",
            "content": "Both fetches happen in one effect using async/await - clear sequential flow"
          },
          {
            "title": "Why This Works",
            "content": "No waterfall of effects, clear dependency on userId, easier to reason about and maintain"
          }
        ]
      }
    ]
  },

  "fullDemo": {
    "id": "fullDemo",
    "heading": "Demo",
    "links": [
      {
        "displayText": "Open voice demo",
        "link": "/demo-dictation"
      }
    ]
  },

  "phraseVsIntent": {
    "id": "phraseVsIntent",
    "title": "Phrase vs Intent",
    "horizandalSubSlides": [
      {
        "title": "Why Phrase Match Can Be Dangerous",
        "list": [
          {
            "title": "Speech is messy",
            "content": "Accents, pauses, filler words, and recognition errors can turn a safe phrase into the wrong command."
          },
          {
            "title": "Raw text is ambiguous",
            "content": "A phrase like 'can you go to the next one after agenda' is not the same as the exact command 'next slide'."
          },
          {
            "title": "Execution risk",
            "content": "If you directly map partial or unstable transcript text to actions, the UI can navigate, mutate state, or trigger side effects too early."
          }
        ]
      },
      {
        "title": "Use AI To Extract Intent",
        "list": [
          {
            "title": "Model the meaning",
            "content": "Instead of trusting the literal phrase, ask AI to classify the transcript into one allowed intent such as `next_slide` or `pause_timer`."
          },
          {
            "title": "Validate before acting",
            "content": "The model should return only a known command id and reason. Your app still decides whether that intent is allowed."
          },
          {
            "title": "Hybrid works best",
            "content": "Try exact matching first for speed, then fall back to AI only when the phrase is fuzzy, longer, or conversational."
          }
        ]
      }
    ]
  },

  "basicOperators": {
    "id": "basicOperators",
    "title": "TypeScript Operators: Basic",
    "horizandalSubSlides": [
      {
        "title": "Basic",
        "list": [
          {
            "title": "Union Types (`|`)",
            "content": "Combine multiple types: `string | number`"
          },
          {
            "title": "Intersection Types (`&`)",
            "content": "Combine types: `A & B`"
          },
          {
            "title": "Optional Properties (`?`)",
            "content": "Make properties optional: `age?: number`"
          },
          {
            "title": "Readonly",
            "content": "Prevent modification: `readonly apiKey: string`"
          },
          {
            "title": "Type Aliases",
            "content": "Create custom types: `type ID = string | number`"
          },
          {
            "title": "Generics",
            "content": "Reusable types: `function identity<T>(arg: T): T`"
          }
        ]
      },
      {
        "title": "Advanced",
        "list": [
          {
            "title": "Utility Types",
            "content": "`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`, `Required<T>`"
          },
          {
            "title": "typeof",
            "content": "Get type of value: `type Point = typeof point`"
          },
          {
            "title": "keyof",
            "content": "Get keys of type: `type Keys = keyof User`"
          },
          {
            "title": "Indexed Access Types",
            "content": "Access property types: `type Name = User['name']`"
          },
          {
            "title": "Conditional Types",
            "content": "Type-level conditionals: `T extends U ? X : Y`"
          },
          {
            "title": "Mapped Types",
            "content": "Transform types: `{ [K in keyof T]: T[K] }`"
          }
        ]
      }
    ]
  },

  "trickyOperators": {
    "id": "trickyOperators",
    "title": "TypeScript Operators: Tricky",
    "horizandalSubSlides": [
      {
        "title": "any - The Escape Hatch",
        "code": "let value: any = \"25\";\n\n// Allowed: no type checking\nvalue = value + 10;          // \"2510\"\nvalue = value.toUpperCase(); // \"2510\" → runtime error if value wasn't a string\n\nconsole.log(value);",
        "language": "typescript",
        "list": [
          {
            "title": "What is `any`?",
            "content": "Disables all type checking. Accepts any value and allows any operation."
          },
          {
            "title": "The Problem",
            "content": "Loses all TypeScript benefits: no type checking, no autocomplete, runtime errors."
          }
        ]
      },
      {
        "title": "unknown - Type-Safe any",
        "code": "function processValue(val: unknown) {\n  // Positive flow: Type is narrowed\n  if (typeof val === \"number\") {\n    const doubled = val * 2;\n    console.log(\"Positive:\", doubled);\n    // Output when val = 5 → Positive: 10\n  }\n\n  // Negative flow: TypeScript blocks this\n  // const x = val + 10;  \n  // ❌ Error: Object is of type 'unknown'\n}\n\nprocessValue(5);      \n// Output: Positive: 10\n\nprocessValue(\"hello\");\n// Output: (no positive output)",
        "language": "typescript",
        "list": [
          {
            "title": "What is `unknown`?",
            "content": "Type-safe version of `any`. Forces you to check types before use."
          },
          {
            "title": "Type Guards Required",
            "content": "Must narrow the type before using `unknown` values."
          },
          {
            "title": "When to Use",
            "content": "When you don't know the type, but want type safety."
          }
        ]
      },
      {
        "title": "never - The Impossible Type",
        "code": "type Size = \"small\" | \"large\";\n\nfunction pickSize(size: Size) {\n  if (size === \"small\") {\n    console.log(\"Small picked\");\n  } else if (size === \"large\") {\n    console.log(\"Large picked\");\n  } else {\n    // This should NEVER happen\n    const check: never = size;   // TypeScript warns you here\n  }\n}",
        "language": "typescript",
        "list": [
          {
            "title": "What is `never`?",
            "content": "Represents values that never occur. The most restrictive type."
          },
          {
            "title": "Exhaustive Checks",
            "content": "Appears in default cases when all possibilities are handled."
          },
          {
            "title": "When It Appears",
            "content": "Functions that throw, exhaustive checks, or unreachable code."
          }
        ]
      }
    ]
  },

  "whenAnyIsUsed": {
    "id": "whenAnyIsUsed",
    "title": "When `any` is Used",
    "subtitles": [
      "JSON.parse() returns `any`",
      "Untyped function parameters",
      "Migrating JavaScript to TypeScript",
      "Third-party libraries without types",
      "Dynamic content from APIs",
      "Legacy codebases"
    ]
  },

  "whyAnyCreepsUp": {
    "id": "whyAnyCreepsUp",
    "title": "Why `any` Creeps Up in Our Codebase",
    "subtitles": [
      "Quick fixes to make code compile",
      "Copy-pasting code with `any` types",
      "Time pressure to ship features",
      "Lack of type definitions for external libraries",
      "Complex types seem too difficult",
      "Gradual migration from JavaScript"
    ]
  },

  "problemsWithAny": {
    "id": "problemsWithAny",
    "title": "Problems with `any`",
    "horizandalSubSlides": [

      {
        "title": "Problem 1: No Type Checking",
        "code": "let value: any = 42;\n\n// All of these compile, but crash at runtime\nvalue.toUpperCase(); // Runtime Error!\nvalue.foo.bar.baz; // Runtime Error!\nvalue[100].name; // Runtime Error!\n\n// Output:\n// TypeError: value.toUpperCase is not a function",
        "language": "typescript",
        "list": [
          {
            "title": "The Issue",
            "content": "TypeScript doesn't check if operations are valid on `any`."
          },
          {
            "title": "Result",
            "content": "Code compiles successfully but crashes at runtime."
          }
        ]
      },
      {
        "title": "Problem 2: No Autocomplete",
        "code": "interface User {\n  name: string;\n  email: string;\n  age: number;\n}\n\nconst user: User = { name: 'John', email: 'j@x.com', age: 30 };\nconst anyUser: any = user;\n\n// With User type:\nuser. // IDE suggests: name, email, age\n\n// With any type:\nanyUser. // No suggestions!",
        "language": "typescript",
        "list": [
          {
            "title": "The Issue",
            "content": "IDEs can't provide autocomplete or suggestions for `any` types."
          },
          {
            "title": "Result",
            "content": "Slower development, more typos, harder to discover APIs."
          }
        ]
      },
      {
        "title": "Problem 3: Runtime Errors",
        "code": "function processData(data: any) {\n  return data.value.toUpperCase() + 10;\n}\n\n// Compiles fine, but:\nprocessData({ value: 42 }); // Runtime Error!\n// TypeError: data.value.toUpperCase is not a function\n\nprocessData(null); // Runtime Error!\n// TypeError: Cannot read property 'value' of null",
        "language": "typescript",
        "list": [
          {
            "title": "The Issue",
            "content": "Type errors are only caught when code runs, not during development."
          },
          {
            "title": "Result",
            "content": "Bugs reach production that should have been caught earlier."
          }
        ]
      },
      {
        "title": "Problem 4: Silent Propagation",
        "code": "function fetchData(): any {\n  return JSON.parse('{}');\n}\n\nconst data = fetchData(); // any\n\nfunction process(data: any) { // any spreads\n  return data.value.toUpperCase();\n}\n\nconst result = process(data); // any continues\n\n// One any infects the entire chain!",
        "language": "typescript",
        "list": [
          {
            "title": "The Issue",
            "content": "One `any` spreads through function parameters and return types."
          },
          {
            "title": "Result",
            "content": "Entire codebase loses type safety, even in unrelated code."
          }
        ]
      },
      {
        "title": "Problem 5: Refactoring Issues",
        "code": "interface User {\n  name: string;\n  email: string;\n}\n\nfunction getUser(): any {\n  return { name: 'John', email: 'j@x.com' };\n}\n\n// Change 'email' to 'emailAddress' in interface\n// TypeScript can't find all usages with any!\n// Must manually search entire codebase\n// High risk of missing references",
        "language": "typescript",
        "list": [
          {
            "title": "The Issue",
            "content": "Can't safely refactor, rename, or find usages with `any` types."
          },
          {
            "title": "Result",
            "content": "Manual searching, high risk of breaking changes, slow refactoring."
          }
        ]
      }
    ]
  },

  "howToAvoidAny": {
    "id": "howToAvoidAny",
    "title": "How to Systematically Avoid/Remove `any`",
    "horizandalSubSlides": [

      {
        "title": "Strategy 1: Enable Strict TypeScript Settings",
        "code": "// tsconfig.json\n{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noImplicitAny\": true,\n    \"strictNullChecks\": true\n  }\n}\n\n// Before: Implicit any allowed\nfunction process(param) { // param is any\n  return param.value;\n}\n\n// After: TypeScript forces you to type it\nfunction process(param: unknown) { // Must specify type\n  // Type guard required\n  return param.value;\n}",
        "language": "typescript",
        "list": [
          {
            "title": "The Approach",
            "content": "Enable `strict` and `noImplicitAny` in tsconfig.json to catch `any` early."
          },
          {
            "title": "Benefits",
            "content": "Catches issues at compile time, prevents `any` from creeping in."
          }
        ]
      },
      {
        "title": "Strategy 2: Replace `any` with `unknown`",
        "code": "// Before: Using any\nfunction processData(data: any) {\n  return data.value.toUpperCase();\n}\n\n// After: Using unknown with type guard\nfunction processData(data: unknown) {\n  if (typeof data === 'object' && data !== null && 'value' in data) {\n    const value = (data as { value: string }).value;\n    return value.toUpperCase();\n  }\n  throw new Error('Invalid data');\n}",
        "language": "typescript",
        "list": [
          {
            "title": "The Approach",
            "content": "Replace `any` with `unknown` and add type guards to narrow types safely."
          },
          {
            "title": "Benefits",
            "content": "Forces type checking, prevents runtime errors, maintains type safety."
          }
        ]
      },
      {
        "title": "Strategy 3: Create Type Definitions",
        "code": "// Before: Using any for API response\nconst response: any = await fetch('/api/user');\nconst user = response.data;\n\n// After: Define proper types\ninterface ApiResponse<T> {\n  data: T;\n  status: 'success' | 'error';\n}\n\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst response: ApiResponse<User> = await fetch('/api/user');\nconst user = response.data; // Fully typed!\n\n// For third-party libraries\n// Create @types/package-name or use existing types",
        "language": "typescript",
        "list": [
          {
            "title": "The Approach",
            "content": "Create proper interfaces/types for APIs and third-party libraries."
          },
          {
            "title": "Benefits",
            "content": "Full type safety, autocomplete, catch API contract changes early."
          }
        ]
      },
      {
        "title": "Strategy 4: Use Utility Types",
        "code": "// Before: Using any for partial updates\nfunction updateUser(user: any, updates: any) {\n  return { ...user, ...updates };\n}\n\n// After: Using utility types\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  age: number;\n}\n\nfunction updateUser(\n  user: User, \n  updates: Partial<User>\n) {\n  return { ...user, ...updates };\n}\n\n// Other utilities\nconst nameOnly: Pick<User, 'name'> = { name: 'John' };\nconst withoutEmail: Omit<User, 'email'> = { id: 1, name: 'John', age: 30 };",
        "language": "typescript",
        "list": [
          {
            "title": "The Approach",
            "content": "Use `Partial`, `Pick`, `Omit`, `Record` instead of `any` for transformations."
          },
          {
            "title": "Benefits",
            "content": "Type-safe transformations, better than `any`, maintains relationships."
          }
        ]
      },
      {
        "title": "Strategy 5: Gradual Migration",
        "code": "// Step 1: Identify critical paths\n// - Authentication flows\n// - Payment processing\n// - Data validation\n\n// Step 2: Start with high-risk areas\nfunction processPayment(data: any) { // Start here\n  // Replace with proper types\n}\n\n// Step 3: Work outward\nfunction validateInput(input: any) { // Next\n  // Add types\n}\n\n// Step 4: Use tools\n// - ESLint rule: @typescript-eslint/no-explicit-any\n// - Find all 'any' in codebase\n// - Track progress with metrics",
        "language": "typescript",
        "list": [
          {
            "title": "The Approach",
            "content": "Start with critical paths and high-risk areas, then expand gradually."
          },
          {
            "title": "Benefits",
            "content": "Manageable migration, reduces risk, can track progress systematically."
          }
        ]
      },
      {
        "title": "Strategy 6: Using Type Libraries",
        "code": "import React, { FC, ReactNode, ChangeEvent } from 'react';\n\n// FC - FunctionComponent type\nconst MyComponent: FC<{ name: string }> = ({ name }) => {\n  return <div>{name}</div>;\n};\n\n// ReactNode - anything renderable\nconst Container: FC<{ children: ReactNode }> = ({ children }) => {\n  return <div>{children}</div>;\n};\n\n// Event types - properly typed event handlers\nfunction MyRadio(e: ChangeEvent<HTMLInputElement>) {\n  console.log(e.target.checked); // Fully typed!\n}\n\n// useState setter type\nconst [count, setCount] = useState<number>(0);\n// setCount is Dispatch<SetStateAction<number>>",
        "language": "typescript",
        "list": [
          {
            "title": "FC (FunctionComponent)",
            "content": "Type for a component that receives props and returns JSX."
          },
          {
            "title": "ReactNode",
            "content": "Anything that can be rendered: string, number, JSX, fragments, arrays."
          },
          {
            "title": "JSX.Element & ReactElement",
            "content": "Types for component output - JSX.Element is the output, ReactElement has props and type info."
          },
          {
            "title": "Dispatch<SetStateAction>",
            "content": "The type of a state setter from useState - properly typed state updates."
          },
          {
            "title": "Event Types",
            "content": "ChangeEvent, MouseEvent, KeyboardEvent - properly typed DOM events with element types."
          },
          {
            "title": "DOM Element Types",
            "content": "HTMLInputElement, HTMLTextAreaElement, HTMLButtonElement - use with events for full type safety."
          }
        ]
      }
    ]
  },

  "practicalExamples": {
    "id": "practicalExamples",
    "title": "Practical Examples",
    "subtitles": []
  },

  "summingUp": {
    "id": "summingUp",
    "title": "Summing Up",
    "subtitles": [
      "Voice is the most natural interface",
      "React is a great coordinator for transcript, intent, and action state",
      "Deterministic commands should come before AI interpretation",
      "AI is best for ambiguity, extraction, and assistance",
      "The app must always own execution and safety",
      "Let's build apps that listen"
    ]
  },

  "qa": {
    "id": "qa",
    "title": "Q&A",
    "subtitles": []
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
        content: "jagadeesh-j.vercel.app",
        url: "https://jagadeesh-j.vercel.app",
      },
      {
        icon: "IoMailSharp",
        content: "jagadeesh.jkp@gmail.com",
        url: "mailto:jagadeesh.jkp@gmail.com",
      },
    ],
  },
}

