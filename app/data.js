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
      "What is `any`?",
      "The Problems with `any`",
      "Where `any` Creeps In",
      "Escape Routes: Avoiding `any`",
      "The Final Boss: `never`",
      "Wrap-up & Key Takeaways"
    ]
  },

  "whatIsAny": {
    "id": "whatIsAny",
    "title": "What is `any`?",
      "horizandalSubSlides": [
        {
        "title": "Definition & Purpose",
          "list": [
            {
            "title": "What is `any`?",
            "content": "TypeScript's escape hatch - a type that represents any value. It disables type checking for that value."
            },
            {
            "title": "Why Does It Exist?",
            "content": "Designed for gradual migration from JavaScript, handling untyped code, and providing flexibility during development."
            },
            {
            "title": "When Is It Used?",
            "content": "Legacy code migration, quick fixes, third-party libraries without types, and situations where types are unknown."
            }
          ]
        },
        {
        "title": "Quick Example",
        "code": "// any allows any value\nlet value: any = 42;\nvalue = 'hello';\nvalue = true;\n\n// No type checking!\nvalue.foo.bar.baz; // No error\n\n// Compare with proper typing\nlet typed: number = 42;\ntyped = 'hello'; // Error!",
        "language": "typescript",
          "list": [
            {
            "title": "Flexibility",
            "content": "`any` accepts any value type - numbers, strings, objects, functions, anything."
            },
            {
            "title": "No Type Checking",
            "content": "TypeScript completely skips type checking for `any` values, allowing any operation."
            },
            {
            "title": "The Trade-off",
            "content": "You gain flexibility but lose all the benefits of TypeScript's type safety."
            }
          ]
        },
        {
        "title": "Common Use Cases",
          "list": [
            {
            "title": "Legacy Code Migration",
            "content": "When migrating JavaScript to TypeScript, `any` helps bridge the gap temporarily."
          },
          {
            "title": "Third-party Libraries",
            "content": "Libraries without type definitions often force you to use `any` or create your own types."
          },
          {
            "title": "Dynamic Content",
            "content": "JSON parsing, API responses with unknown structure, or user input often leads to `any`."
          },
          {
            "title": "Quick Prototyping",
            "content": "Developers sometimes use `any` to move fast, but it becomes technical debt."
            }
          ]
        }
      ]
    },

  "problemsWithAny": {
    "id": "problemsWithAny",
    "title": "Quiz 1: What does this return?",
    "code": "function processData(data: any) {\n  return data.value + 10;\n}\n\nprocessData({ value: 5 });    // 15\nprocessData({ value: '5' });  // '510' (string!)\nprocessData({});              // NaN\nprocessData(null);            // Error!",
    "language": "typescript",
    "theory": {
      "heading": "The Problems with `any`",
      "subHeading": "Type Safety Breakdown",
      "copy": "When you use `any`, TypeScript stops protecting you. This means you lose all the benefits of type safety that TypeScript provides.",
      "list": [
        {
          "title": "No Type Checking",
          "content": "TypeScript won't catch errors at compile time. Bugs appear at runtime instead."
        },
        {
          "title": "No Autocomplete",
          "content": "Your IDE can't help you with suggestions, method names, or property access."
        },
        {
          "title": "Runtime Errors",
          "content": "Operations that should fail at compile time only fail when the code runs."
        },
        {
          "title": "Maintainability Issues",
          "content": "Code becomes harder to understand, refactor, and maintain without type information."
        }
      ],
      "pointers": [
        "`any` disables all type checking",
        "Can lead to unexpected runtime errors",
        "Makes code harder to maintain and refactor",
        "Defeats the purpose of using TypeScript"
      ],
      "blocks": [
        {
          "title": "Key Takeaway",
          "content": "`any` trades short-term convenience for long-term chaos. It's a quick fix that creates technical debt."
        }
      ]
    }
  },

  "whereAnyCreepsIn": {
    "id": "whereAnyCreepsIn",
    "title": "Where `any` Creeps In",
      "horizandalSubSlides": [
        {
        "title": "Quiz 2: Spot the Culprit",
        "code": "// Which line infects the types?\n\nfunction fetchUser(id: number) {\n  return fetch(`/api/users/${id}`)\n    .then(r => r.json()); // Line 1: returns any\n}\n\nfunction processUser(user: any) { // Line 2: accepts any\n  return user.name.toUpperCase();\n}\n\nconst data = JSON.parse('{}'); // Line 3: returns any\nprocessUser(data); // Infection spreads!",
        "language": "typescript",
        "list": [
          {
            "title": "The Infection Point",
            "content": "Once `any` enters your codebase, it spreads through function parameters, return types, and variable assignments."
          },
          {
            "title": "Silent Propagation",
            "content": "Functions that accept `any` pass it along, infecting all code that uses those functions."
          },
          {
            "title": "The Domino Effect",
            "content": "One `any` can contaminate an entire module or even the entire application."
          }
        ]
      },
      {
        "title": "Common Sources: JSON Parsing",
        "code": "// JSON.parse returns any\nconst data = JSON.parse('{}');\n// data is now 'any'\n\nfunction getName(data: any) {\n  return data.name; // No type checking!\n}\n\n// Better: Type it\ninterface User {\n  name: string;\n  email: string;\n}\n\nconst user: User = JSON.parse('{}');",
        "language": "typescript",
          "list": [
            {
            "title": "JSON.parse()",
            "content": "Returns `any` by default, forcing you to type the result manually."
            },
            {
            "title": "API Responses",
            "content": "Fetch responses are often typed as `any` unless you explicitly type them."
            },
            {
            "title": "Local Storage",
            "content": "Reading from localStorage returns `any`, requiring manual type assertions."
            }
          ]
        },
        {
        "title": "Common Sources: Third-party Libraries",
        "code": "// Library without types\nimport { lib } from 'untyped-lib';\n\n// Forced to use any\nconst result: any = lib.doSomething();\n\n// Better: Create types\ninterface Result {\n  data: string;\n  status: number;\n}\n\nconst result: Result = lib.doSomething();\n\n// Or: npm install @types/untyped-lib",
        "language": "typescript",
          "list": [
            {
            "title": "Missing Type Definitions",
            "content": "Libraries without `@types` packages force you to use `any` or create your own types."
          },
          {
            "title": "Poor Type Definitions",
            "content": "Some libraries have incomplete or incorrect type definitions, leading to `any` usage."
          },
          {
            "title": "Legacy Libraries",
            "content": "Older JavaScript libraries may not have TypeScript support, requiring workarounds."
            }
          ]
        },
        {
        "title": "Common Sources: Legacy Code",
        "code": "// Migrating from JavaScript\nfunction oldFunc(param) { // Implicit any\n  return param.value * 2;\n}\n\n// Temporary fix\nfunction oldFunc(param: any) {\n  return param.value * 2;\n}\n\n// Better: Add types\ninterface Param {\n  value: number;\n}\n\nfunction oldFunc(param: Param) {\n  return param.value * 2;\n}",
        "language": "typescript",
          "list": [
            {
            "title": "Gradual Migration",
            "content": "When migrating JavaScript to TypeScript, `any` is often used as a temporary measure."
            },
            {
            "title": "Implicit Any",
            "content": "Functions without type annotations get implicit `any` parameters (unless `noImplicitAny` is enabled)."
            },
            {
            "title": "Technical Debt",
            "content": "Temporary `any` usage often becomes permanent if not refactored."
            }
          ]
        }
      ]
    },

  "escapeRoutes": {
    "id": "escapeRoutes",
    "title": "Quiz 3: Which fix restores type safety?",
    "code": "// Original (broken)\nfunction processData(data: any) {\n  return data.value + 10;\n}\n\n// Option 1: Use unknown\nfunction processData(data: unknown) {\n  if (typeof data === 'object' && data !== null && 'value' in data) {\n    return (data as { value: number }).value + 10;\n  }\n  throw new Error('Invalid');\n}\n\n// Option 2: Use generics\nfunction processData<T extends { value: number }>(data: T) {\n  return data.value + 10;\n}\n\n// Option 3: Use type guards\nfunction hasValue(obj: unknown): obj is { value: number } {\n  return typeof obj === 'object' && obj !== null && 'value' in obj;\n}\n\nfunction processData(data: unknown) {\n  if (hasValue(data)) {\n    return data.value + 10; // TypeScript knows!\n  }\n  throw new Error('Invalid');\n}",
    "language": "typescript",
    "theory": {
      "heading": "Escape Routes: Avoiding `any`",
      "subHeading": "Step-by-Step Refactoring",
      "copy": "There are several strategies to avoid `any` while maintaining flexibility. Let's explore the most effective approaches.",
      "list": [
        {
          "title": "Use `unknown` Instead",
          "content": "`unknown` is type-safe `any`. You must check the type before using it, forcing you to handle all cases."
        },
        {
          "title": "Type Guards",
          "content": "Create functions that narrow types, allowing TypeScript to understand what type you're working with."
        },
        {
          "title": "Generics",
          "content": "Use generics to create flexible functions that maintain type safety without using `any`."
        },
        {
          "title": "Proper Typing",
          "content": "Define interfaces and types for your data structures, even for dynamic content like API responses."
        }
      ],
      "pointers": [
        "`unknown` requires type checking before use",
        "Type guards help TypeScript understand types",
        "Generics provide flexibility with type safety",
        "Always prefer explicit types over `any`"
      ],
      "blocks": [
        {
          "title": "TypeScript Compiler Options",
          "content": "Enable `noImplicitAny` and `strict` mode to catch `any` usage early and enforce better type safety."
        }
      ]
    }
  },

  "compilerOptions": {
    "id": "compilerOptions",
    "title": "TypeScript Compiler Options",
    "horizandalSubSlides": [
      {
        "title": "tsconfig.json Settings",
        "code": "{\n  \"compilerOptions\": {\n    \"strict\": true,        // Enables all strict checks\n    \"noImplicitAny\": true  // Error on implicit any\n  }\n}",
        "language": "json",
          "list": [
            {
            "title": "strict Mode",
            "content": "Enables all strict type checking options, including `noImplicitAny`."
            },
            {
            "title": "noImplicitAny",
            "content": "Raises errors on expressions and declarations with an implied `any` type."
            },
            {
            "title": "Gradual Adoption",
            "content": "Enable these options gradually in existing projects to avoid breaking everything at once."
            }
          ]
        },
        {
        "title": "Practical Example: Refactoring",
        "code": "// Before: Using any\nfunction parseUser(json: string): any {\n  return JSON.parse(json);\n}\n\n// After: Using unknown and type guards\ninterface User {\n  name: string;\n  email: string;\n  age: number;\n}\n\nfunction isUser(obj: unknown): obj is User {\n  return (\n    typeof obj === 'object' &&\n    obj !== null &&\n    'name' in obj && 'email' in obj && 'age' in obj\n  );\n}\n\nfunction parseUser(json: string): User {\n  const parsed = JSON.parse(json);\n  if (isUser(parsed)) return parsed;\n  throw new Error('Invalid');\n}",
        "language": "typescript",
          "list": [
            {
            "title": "Type Safety",
            "content": "The refactored version ensures type safety while handling dynamic JSON data."
            },
            {
            "title": "Runtime Validation",
            "content": "Type guards validate data at runtime, catching invalid data early."
            },
            {
            "title": "Better Developer Experience",
            "content": "Autocomplete and type checking work correctly with properly typed functions."
            }
          ]
        }
      ]
    },

  "finalBossNever": {
    "id": "finalBossNever",
    "title": "Quiz 4: What type does this evaluate to?",
    "code": "// Example 1: Exhaustive switch\nfunction handleStatus(status: 'loading' | 'success' | 'error') {\n  switch (status) {\n    case 'loading': return 'Loading...';\n    case 'success': return 'Done!';\n    case 'error': return 'Failed!';\n    default:\n      const exhaustive: never = status; // never!\n      return exhaustive;\n  }\n}\n\n// Example 2: Union narrowing\nfunction process(value: string | number | boolean) {\n  if (typeof value === 'string') return value.toUpperCase();\n  if (typeof value === 'number') return value * 2;\n  if (typeof value === 'boolean') return !value;\n  const impossible: never = value; // never!\n  return impossible;\n}\n\n// Example 3: Unreachable\nfunction throwError(): never {\n  throw new Error('Error');\n}",
    "language": "typescript",
    "theory": {
      "heading": "The Final Boss: `never`",
      "subHeading": "Perfect Type Safety",
      "copy": "`never` represents values that should never occur. It's the opposite of `any` - the most restrictive type possible. When you see `never`, you've achieved perfect type safety.",
      "list": [
        {
          "title": "What is `never`?",
          "content": "A type that represents values that never occur. Used for functions that never return, exhaustive checks, and impossible states."
        },
        {
          "title": "Exhaustive Checks",
          "content": "In switch statements, `never` appears in the default case when all cases are handled, ensuring completeness."
        },
        {
          "title": "Unreachable Code",
          "content": "Functions that throw errors or never return are typed as `never`, preventing their use in invalid contexts."
        },
        {
          "title": "Type Narrowing",
          "content": "After narrowing all possible types, remaining code sees `never`, indicating an impossible state."
        }
      ],
      "pointers": [
        "`never` is the most restrictive type",
        "Appears in exhaustive checks and unreachable code",
        "Indicates perfect type safety",
        "The goal: refactor until `never` appears in impossible states"
      ],
      "blocks": [
        {
          "title": "The Journey",
          "content": "From `any` (no safety) → `unknown` (safe but requires checks) → proper types → `never` (perfect safety). When `never` appears in unreachable code, you've achieved type safety perfection."
        }
      ]
    }
  },

  "liveCodeChallenge": {
    "id": "liveCodeChallenge",
    "title": "Live-Code Challenge",
    "code": "// Starting: any-ridden\nfunction processApi(response: any) {\n  if (response.status === 'success') {\n    return response.data.map((item: any) => item.name);\n  }\n  return [];\n}\n\n// Refactored: any → never\ninterface ApiResponse<T> {\n  status: 'success' | 'error';\n  data?: T[];\n}\n\ninterface Item {\n  name: string;\n  id: number;\n}\n\nfunction isApiResponse<T>(obj: unknown): obj is ApiResponse<T> {\n  return typeof obj === 'object' && obj !== null && 'status' in obj;\n}\n\nfunction processApi(response: unknown): string[] {\n  if (!isApiResponse<Item>(response)) throw new Error('Invalid');\n  \n  if (response.status === 'success') {\n    return (response.data || []).map(item => item.name);\n  }\n  \n  const exhaustive: never = response.status; // never!\n  return [];\n}",
    "language": "typescript",
    "theory": {
      "heading": "Refactoring Challenge",
      "subHeading": "From `any` to `never`",
      "copy": "Let's refactor a real-world example, step by step, until we achieve perfect type safety with `never` appearing in unreachable states.",
      "list": [
        {
          "title": "Step 1: Identify `any` Usage",
          "content": "Find all instances of `any` in the code and understand why they exist."
        },
        {
          "title": "Step 2: Replace with `unknown`",
          "content": "Replace `any` with `unknown` to force type checking."
        },
        {
          "title": "Step 3: Add Type Guards",
          "content": "Create type guard functions to narrow types safely."
        },
        {
          "title": "Step 4: Define Interfaces",
          "content": "Create proper interfaces for your data structures."
        },
        {
          "title": "Step 5: Achieve Exhaustiveness",
          "content": "Ensure all cases are handled, making `never` appear in impossible states."
        }
      ],
      "pointers": [
        "Start with `unknown` instead of `any`",
        "Use type guards to narrow types",
        "Define interfaces for all data structures",
        "Aim for exhaustive checks where `never` appears"
      ]
    }
  },

  "wrapUp": {
    "id": "wrapUp",
    "title": "Wrap-up & Key Takeaways",
    "horizandalSubSlides": [
      {
        "title": "The Journey: `any` → `never`",
          "list": [
            {
            "title": "Start: `any`",
            "content": "No type safety, runtime errors, technical debt."
          },
          {
            "title": "Step 1: `unknown`",
            "content": "Type-safe alternative to `any`, forces type checking."
          },
          {
            "title": "Step 2: Proper Types",
            "content": "Define interfaces, use generics, create type guards."
          },
          {
            "title": "Step 3: Strict Mode",
            "content": "Enable TypeScript strict mode and `noImplicitAny`."
          },
          {
            "title": "Goal: `never`",
            "content": "Perfect type safety - `never` appears in unreachable code."
            }
          ]
        },
        {
        "title": "Key Takeaways",
          "list": [
            {
            "title": "Avoid `any`",
            "content": "Use `unknown` when types are truly unknown, then narrow with type guards."
          },
          {
            "title": "Enable Strict Mode",
            "content": "Turn on `strict` and `noImplicitAny` to catch issues early."
          },
          {
            "title": "Create Type Guards",
            "content": "Build functions that help TypeScript understand your types."
          },
          {
            "title": "Define Interfaces",
            "content": "Even for dynamic data, create proper type definitions."
          },
          {
            "title": "Aim for `never`",
            "content": "When `never` appears in unreachable code, you've achieved type safety perfection."
          }
        ]
      },
      {
        "title": "Resources & Next Steps",
          "list": [
            {
            "title": "TypeScript Handbook",
            "content": "Official TypeScript documentation on types and type narrowing."
            },
            {
            "title": "Type Guards",
            "content": "Learn about user-defined type guards and narrowing techniques."
            },
            {
            "title": "Strict Mode",
            "content": "Understand all TypeScript compiler options for maximum type safety."
            },
            {
            "title": "Practice",
            "content": "Refactor your own codebase, replacing `any` with proper types."
            }
          ]
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
