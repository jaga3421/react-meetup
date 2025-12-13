export default {
  "intro": {
    "title": "From Any to Never: Escaping the Type Safety Black Hole",
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
      "TypeScript Operators Overview",
      "Problems with `any`",
      "How to Systematically Remove `any`",
      "Practical Examples"
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
      }
    ]
  },

  "practicalExamples": {
    "id": "practicalExamples",
    "title": "Practical Examples",
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

