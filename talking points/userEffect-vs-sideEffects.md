# Talking Points: useEffect vs Side-effects
## React Hyderabad Meetup

---

## Opening & Introduction

**Slide: Title Slide**

"Hey everyone! Thanks for coming. I'm Jagadeesh, and today we're going to talk about something we all think we know - useEffect. But here's the thing - knowing how to use it and knowing when to use it are two very different things."

"Before we dive in, quick show of hands - who here has written a component with multiple useEffects and then spent way too long debugging why something isn't working? *pause for hands* Yeah, we've all been there. That's exactly what we're going to fix today."

---

## Agenda

**Slide: Talk Agenda**

"Here's what we'll cover today. We'll start with understanding what useEffect actually is, then we'll look at why we reach for it even when we shouldn't. We'll talk about React's mental model - this is the key to everything. Then we'll see some examples, check out what React 19 brings to the table, and wrap up with a quick quiz."

---

## What is useEffect?

**Slide: What is useEffect? - The Hook We All Know**

"Let's start with the basics. useEffect is probably the most powerful hook in React, and also the most misused. What is it? Simply put, it's a hook that lets you run code after React has updated the DOM."

"When does it run? After every render by default, or when the dependencies you specify change. That's the dependency array - it controls when your effect re-runs."

**Slide: Why Does It Exist?**

"Now, why does useEffect even exist? React components are pure functions - they render JSX based on props and state. You can't do things like API calls or DOM updates while the component is rendering. That would break React's model."

"But sometimes you need to do something after render - fetch data, update the document title, set up subscriptions. That's where useEffect comes in. It gives you a way to run code after the component has rendered and committed to the DOM."

**Slide: Simple Example**

"Here's a simple example. We have a UserProfile component that takes a userId. After the component renders, useEffect fetches the user data. Notice the dependency array - [userId]. This means the effect only re-runs when userId changes, not on every render. That's important for performance."

---

## Why Talk About useEffect in 2026?

**Slide: The Biryani Paradox**

"Okay, so why are we still talking about useEffect in 2026? It's been around since Hooks launched in 2018. Here's the thing - just like how every Hyderabadi knows biryani, every React developer knows useEffect. But do we really know it? Or are we just following the recipe without understanding the spices?"

"It's been around for years, but we're still writing code that fights React's mental model. Knowing the ingredients isn't the same as knowing when to add them."

"And let's be honest - how many of us have debugged a useEffect dependency nightmare at 2 AM? *pause* Yeah, this talk is for that developer. The one who's been there, staring at the screen wondering why your effect ran three times when you only wanted it to run once."

---

## Why useEffect Feels Necessary

**Slide: Misconception 1 - Derived State**

"Let's talk about why we reach for useEffect even when we shouldn't. First misconception - derived state."

"Look at this code. We have firstName and lastName, and we want fullName. So we create state for fullName, and we use useEffect to sync it whenever firstName or lastName changes."

"Here's the problem - this creates an extra render cycle. Component renders, effect runs, setState triggers another render. It's unnecessary. Why? Because fullName can be calculated directly during render. It's just string concatenation - no state needed, no effect needed."

"We think 'if it changes, it needs useState' - but that's not true. Derived values don't need state. They can be computed during render."

**Slide: Misconception 2 - Event Handling**

"Second misconception - using useEffect to respond to user input."

"In this search box example, every time the user types, we update the query state, which triggers a render, which then triggers the effect to fetch results. That's a lot of steps for something that should be direct."

"The issue? User types, setQuery runs, component renders, effect runs, then fetch happens. That's an extra render cycle and a delayed response. User actions should trigger handlers directly, not wait for the render plus effect cycle."

"We want to fetch when the user types, so useEffect seems like the right place because it 'reacts' to state changes. But actually, this should be in the onChange handler directly."

**Slide: Misconception 3 - Orchestrating Logic**

"Third misconception - chaining multiple useEffects to orchestrate dependent data."

"Here we need to fetch user data first, then fetch posts. So we have one effect that fetches the user, and another effect that waits for the user to exist before fetching posts."

"The problem? This creates waterfall requests - we have to wait for user before we can fetch posts. Multiple renders, unclear dependency chain, harder to reason about. If the user changes, both effects re-run unnecessarily."

"We think 'we need user before posts, so separate effects seem logical' - but there are better ways to handle this."

**Slide: The Common Thread**

"So what's the common thread here? We reach for useEffect because it feels like the 'React way' to handle anything that happens after render. But React has better patterns - derived state in render, events in handlers, data fetching with proper patterns."

"The result? Code that works, but is harder to reason about, debug, and maintain. And we've all been there - debugging at 2 AM wondering why our effect is running when it shouldn't."

---

## React Mental Model

**Slide: Render → Commit → Effects**

"Now let's talk about React's mental model. This is the key to understanding when to use useEffect and when not to."

"React works in phases. First, the Render phase - React calls your component function and gets the JSX. This is pure computation. No side effects allowed. This is where you calculate derived values."

"Then, the Commit phase - React updates the DOM. The browser paints the screen."

"Finally, Effects run - useEffect runs AFTER commit. This is when side effects are safe - API calls, subscriptions, DOM manipulation. This is why useEffect is the right place for these things."

**Slide: The Golden Rule**

"Here's the golden rule. If it can be calculated in render? Do it during render. Derived state, filtered lists, computed values - all of this belongs in the render phase."

"If it's a side effect? Put it in useEffect. API calls, subscriptions, timers, DOM updates - things that affect the outside world."

"If it's a user action? Handle it in event handlers. onClick, onChange - these are direct responses to user input. Don't make the user wait for a render cycle."

---

## Examples: Putting It Together

**Slide: Example 1 - Derived State in Render**

"Let's see this in action. Here we have a ProductList component. We're filtering products and calculating a total price."

"Notice - this all happens during render. We're not using useState, we're not using useEffect. We're just calculating values from props. These are pure functions, no side effects."

"Why does this work? These values are derived from props. They recalculate automatically when props change. No state sync needed, no effects needed. Simple and fast."

**Slide: Example 2 - Side Effects in useEffect**

"Now here's a legitimate use of useEffect. We're fetching user data from an API."

"The API call happens in useEffect - it runs after the component commits to the DOM. This is the right place because fetching is a side effect that affects the outside world. It's not something we can calculate during render."

"This is what useEffect is actually for - side effects that need to happen after render."

---

## React 19: New Tools, Same Principles

**Slide: The `use` Hook**

"React 19 brings some new tools, but the principles stay the same. First, the `use` hook."

"Before, we'd use useEffect for async data. Set up state, fetch in the effect, handle loading states manually."

"With React 19's `use` hook, we can read Promises directly in render. It works with Suspense for loading states automatically. Much cleaner."

"Does this replace useEffect? For data fetching, yes. But useEffect is still needed for other side effects - subscriptions, timers, DOM manipulation."

**Slide: Actions**

"Second, Actions. These simplify async form handling."

"Before, we'd manage pending states, error states, all manually. With Actions, React handles this automatically. Less boilerplate, cleaner code."

"Again, this replaces useEffect patterns for form state management, but useEffect is still needed for legitimate side effects."

"The key takeaway? React 19 gives us better tools, but understanding when to use useEffect vs alternatives is still crucial. The mental model doesn't change."

---

## Summing Up

**Slide: Summing Up**

"Let's recap the key points:"

"If it can be calculated in render, do it there. No state, no effects, just pure computation."

"Side effects belong in useEffect. API calls, subscriptions, timers - things that affect the outside world."

"User actions go in event handlers. Direct responses, no waiting for render cycles."

"React 19 gives us better tools, but the principles remain the same."

"And remember - predictable components are happy components. When you follow this model, your code becomes easier to reason about, easier to debug, and easier to maintain."

---

## Pop Quiz

**Slide: Pop Quiz**

"Alright, time for a quick quiz! I'm going to show you some code snippets and situations. Your job is to identify what's wrong or suggest the right approach. Let's see how well you've been paying attention!"

*[Navigate to quiz page]*

---

## Closing

**Slide: Thanks & QA**

"Thanks for sticking with me! I hope this helps you write React code that doesn't fight you. Remember - understanding React's mental model is the key. Render → Commit → Effects. Keep that in mind, and you'll write better code."

"Any questions? I'm happy to chat about useEffect, React, or really anything. You can find me on LinkedIn, GitHub, or my website. Thanks again!"

---

## Transition Phrases & Tips

- **Between slides**: "Let's move on to...", "Now let's look at...", "Next up..."
- **Code examples**: "Take a look at this...", "Notice here...", "The key thing to see is..."
- **Engagement**: "Quick show of hands...", "Who's been there?", "Let me know if this sounds familiar..."
- **Humor**: Keep it subtle and relatable. Reference the 2 AM debugging session, the dependency nightmare, but avoid overdoing Hyderabad stereotypes.
- **Pacing**: Pause after asking questions. Give people time to think. Don't rush through code examples.
- **Clarity**: If something is complex, say "Let me break this down..." or "The key thing to remember is..."

---

## Key Messages to Reinforce

1. **Render is pure** - Calculate derived values here
2. **Effects run after commit** - Side effects belong here
3. **User actions are direct** - Handle in event handlers
4. **React 19 adds tools** - But principles stay the same
5. **Predictable code is better code** - Follow the mental model

---

## Time Management (18 minutes)

- Intro & Agenda: ~1.5 min
- What is useEffect: ~2.5 min
- Why This Talk: ~1.5 min
- Why useEffect Feels Necessary: ~4 min
- React Mental Model: ~2 min
- Examples: ~2 min
- React 19: ~2 min
- Summing Up: ~1 min
- Quiz intro: ~0.5 min
- **Total: ~17-18 minutes**

---

*Good luck with your talk! Remember to breathe, pause, and engage with the audience. You've got this!*

