export default {
  "intro": {
    "title": "use-effect vs Side-effects: Writing React code that doesn't fight you",
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
        "content": "jagadeesh-j.vercel.app",
        "url": "https://jagadeesh-j.vercel.app"
      }
    ]
  },
  "agenda": {
    "id": "agenda",
    "title": "Talk Agenda",
    "subtitles": [
      "Introduction",
      "Why useEffect Feels Necessary - Common Misconceptions",
      "React Mental Model - Render → Commit",
      "React 19: New Tools, Same Principles",
      "Pop Quiz"
    ]
  },

  "introAboutUseEffect": {
    "id": "introAboutUseEffect",
    "title": "What is useEffect?",
    "horizandalSubSlides": [
      {
        "title": "The Hook We All Know",
        "list": [
          {
            "title": "useEffect",
            "content": "The most powerful and most misused hook in React"
          },
          {
            "title": "What is it?",
            "content": "A hook that lets you run code after React has updated the DOM"
          },
          {
            "title": "When does it run?",
            "content": "After every render by default, or when dependencies change"
          }
        ]
      },
      {
        "title": "Why Does It Exist?",
        "list": [
          {
            "title": "React's Rendering Model",
            "content": "React components render JSX based on props and state. You can't do things like API calls or DOM updates while the component is rendering"
          },
          {
            "title": "The Need",
            "content": "Sometimes you need to do something after render: fetch data, update document title, set up subscriptions"
          },
          {
            "title": "The Solution",
            "content": "useEffect gives you a way to run code after the component has rendered and committed to the DOM"
          }
        ]
      },
      {
        "title": "Simple Example",
        "code": "function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    // Runs after render\n    fetch(`/api/users/${userId}`)\n      .then(res => res.json())\n      .then(setUser);\n  }, [userId]); // Only re-runs if userId changes\n\n  return <div>{user?.name || 'Loading...'}</div>;\n}",
        "language": "javascript",
        "list": [
          {
            "title": "What's happening?",
            "content": "After component renders, useEffect fetches user data"
          },
          {
            "title": "Dependency array [userId]",
            "content": "Effect only re-runs when userId changes, not on every render"
          }
        ]
      }
    ]
  },

  "whyThisTalk": {
    "id": "whyThisTalk",
    "title": "Why Talk About useEffect in 2026?",
    "horizandalSubSlides": [
      {
        "title": "The Biryani Paradox",
        "list": [
          {
            "title": "Everyone Knows It, But...",
            "content": "Just like how every Hyderabadi knows biryani, every React dev knows useEffect. But do we really know it? Or are we just following the recipe without understanding the spices?"
          },
          {
            "title": "The Recipe vs The Technique",
            "content": "It's been around since Hooks (2018), but we're still writing code that fights React's mental model. Knowing the ingredients isn't the same as knowing when to add them."
          },
          {
            "title": "The 2 AM Debugging Session",
            "content": "We're building amazing products here in Hyderabad, but how many of us have debugged a useEffect dependency nightmare at 2 AM? This talk is for that developer who's been there."
          }
        ]
      },
      {
        "title": "Worth It? Absolutely!",
        "list": [
          {
            "title": "The Impact",
            "content": "Understanding useEffect properly means fewer bugs, better performance, and code that actually makes sense"
          },
          {
            "title": "ReactHyderabad Deserves Better",
            "content": "Our community is growing, and we should write code that doesn't make the next developer (or future you) question your life choices"
          }
        ]
      }
    ]
  },

  "whyUseEffectFeelsNecessary": {
    "id": "whyUseEffectFeelsNecessary",
    "title": "Why useEffect Feels Necessary",
    "horizandalSubSlides": [
      {
        "title": "Misconception 1: Derived State",
        "code": "function UserCard({ firstName, lastName }) {\n  const [fullName, setFullName] = useState('');\n\n  // Issue: Extra render cycle - component renders, then effect runs,\n  // then setState triggers another render. Unnecessary state sync.\n  useEffect(() => {\n    setFullName(`${firstName} ${lastName}`);\n  }, [firstName, lastName]);\n\n  return <div>{fullName}</div>;\n}",
        "language": "javascript",
        "list": [
          {
            "title": "Why It Feels Necessary",
            "content": "We think 'if it changes, it needs useState' - but derived values don't need state"
          },
          {
            "title": "The Problem",
            "content": "Unnecessary state + useEffect sync when value can be computed directly"
          }
        ]
      },
      {
        "title": "Misconception 2: Event Handling",
        "code": "function SearchBox() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n\n  // Issue: User types → setQuery → render → effect runs → fetch\n  // Extra render cycle, delayed response. User action should trigger\n  // handler directly, not wait for render + effect cycle.\n  useEffect(() => {\n    if (query) {\n      fetchResults(query).then(setResults);\n    }\n  }, [query]);\n\n  return <input onChange={(e) => setQuery(e.target.value)} />;\n}",
        "language": "javascript",
        "list": [
          {
            "title": "Why It Feels Necessary",
            "content": "We want to fetch on input change, and useEffect 'reacts' to state changes"
          },
          {
            "title": "The Problem",
            "content": "useEffect runs after render, creating unnecessary re-renders for user actions"
          }
        ]
      },
      {
        "title": "Misconception 3: Orchestrating Logic",
        "code": "function UserDashboard({ userId }) {\n  const [user, setUser] = useState(null);\n  const [posts, setPosts] = useState([]);\n\n  // Issue: Waterfall requests - must wait for user before fetching posts\n  // Multiple renders, unclear dependency chain, harder to reason about\n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, [userId]);\n\n  // Issue: Second effect depends on first, creating sequential flow\n  // If user changes, both effects re-run unnecessarily\n  useEffect(() => {\n    if (user) {\n      fetchPosts(user.id).then(setPosts);\n    }\n  }, [user]);\n\n  return <div>...</div>;\n}",
        "language": "javascript",
        "list": [
          {
            "title": "Why It Feels Necessary",
            "content": "We need user before posts, so separate effects seem logical"
          },
          {
            "title": "The Problem",
            "content": "Multiple effects create waterfall requests and make dependencies unclear"
          }
        ]
      },
      {
        "title": "The Common Thread",
        "list": [
          {
            "title": "We Reach for useEffect Because...",
            "content": "It feels like the 'React way' to handle anything that happens after render"
          },
          {
            "title": "But React Has Better Patterns",
            "content": "Derived state in render, events in handlers, data fetching with proper patterns"
          },
          {
            "title": "The Result",
            "content": "Code that works but is harder to reason about, debug, and maintain"
          }
        ]
      }
    ]
  },

  "reactMentalModel": {
    "id": "reactMentalModel",
    "title": "React Mental Model - Render → Commit",
    "horizandalSubSlides": [
      {
        "title": "Render → Commit → Effects",
        "list": [
          {
            "title": "Render Phase",
            "content": "React calls your component, gets JSX. Pure computation - no side effects. Calculate derived values here."
          },
          {
            "title": "Commit Phase",
            "content": "React updates the DOM. Browser paints the screen."
          },
          {
            "title": "Effects Run",
            "content": "useEffect runs AFTER commit. This is when side effects are safe: API calls, subscriptions, DOM manipulation"
          }
        ]
      },
      {
        "title": "The Golden Rule",
        "list": [
          {
            "title": "Calculated in render?",
            "content": "Do it during render. Derived state, filtered lists, computed values"
          },
          {
            "title": "Side effect?",
            "content": "Put it in useEffect. API calls, subscriptions, timers, DOM updates"
          },
          {
            "title": "User action?",
            "content": "Handle in event handlers. onClick, onChange - direct responses to user input"
          }
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
    ]
  },

  "react19Features": {
    "id": "react19Features",
    "title": "React 19: New Tools, Same Principles",
    "horizandalSubSlides": [
      {
        "title": "The `use` Hook",
        "code": "// Before: useEffect for async data\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  \n  useEffect(() => {\n    fetchUser(userId).then(setUser);\n  }, [userId]);\n  \n  if (!user) return <div>Loading...</div>;\n  return <div>{user.name}</div>;\n}\n\n// React 19: use hook for Promises\nfunction UserProfile({ userId }) {\n  const user = use(fetchUser(userId));\n  // Suspense handles loading automatically\n  return <div>{user.name}</div>;\n}",
        "language": "javascript",
        "list": [
          {
            "title": "What It Does",
            "content": "Reads Promises directly in render, works with Suspense for loading states"
          },
          {
            "title": "Impact on useEffect",
            "content": "Can replace useEffect for data fetching - cleaner, works with Suspense boundaries"
          }
        ]
      },
      {
        "title": "Actions",
        "code": "// Before: useEffect for form submission\nfunction LoginForm() {\n  const [status, setStatus] = useState('idle');\n  \n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    setStatus('pending');\n    try {\n      await login(email, password);\n      setStatus('success');\n    } catch (error) {\n      setStatus('error');\n    }\n  };\n  \n  return <form onSubmit={handleSubmit}>...</form>;\n}\n\n// React 19: Actions simplify this\nfunction LoginForm() {\n  async function handleSubmit(formData) {\n    'use server';\n    await login(formData.get('email'), formData.get('password'));\n  }\n  \n  return <form action={handleSubmit}>...</form>;\n}",
        "language": "javascript",
        "list": [
          {
            "title": "What It Does",
            "content": "Simplifies async form handling with automatic pending/error states"
          },
          {
            "title": "Impact on useEffect",
            "content": "Replaces useEffect patterns for form state management - cleaner, less boilerplate"
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

  "quiz": {
    "id": "quiz",
    "title": "Pop Quiz",
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

