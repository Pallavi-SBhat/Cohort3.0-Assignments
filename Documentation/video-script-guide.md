# 🎥 Video Recording Guide & Script: Redux Toolkit Mini Hackathon
**Target Duration:** 3.5 to 4.5 Minutes  
**Project:** DevTrack - Study & Skill Progress Manager  

---

## 🛠️ Pre-Recording Checklist (Do This Before Pressing Record!)
1. **Open your Terminal** inside `dev-track` and run `npm run dev`.
2. **Open your Browser** to `http://localhost:5173/` and maximize the window.
3. **Open VS Code** alongside or in another tab with `store.js` and `studySlice.js` ready to show.
4. **Clean up your Desktop/Tabs** so only your project, documentation, and VS Code are visible.
5. **Take a deep breath!** Speak in a natural, enthusiastic conversational tone—imagine you are explaining this to a fellow bootcamp classmate over Discord or Zoom!

---

## ⏱️ Step-by-Step Talking Script & Screen Actions

### 🎬 Part 1: Introduction & What is Redux Toolkit? (0:00 - 0:45)
* **What to Show on Screen:** Show your live **DevTrack** web application running in the browser.
* **What to Say:**
> *"Hello everyone! My name is Pallavi Bhat, and today I'm presenting my submission for the Sheryians Coding School Mini Hackathon. Our challenge was really unique: we were asked to independently research, learn, and build a project using **Redux Toolkit** before it was even taught in our live classes!*
>
> *Before I show you the app I built, let's talk about what Redux Toolkit is and why we need it. In standard React, when an application grows, passing data between nested components causes a messy problem called **Props Drilling**. Redux solves this by creating a centralized **Global Store**—think of it as a master vault where all shared application state lives.*
>
> *While classic Redux required dozens of boilerplate files for actions, constants, and complex switch-case reducers, **Redux Toolkit (RTK)** was introduced as the official, modern standard. It simplifies everything using clean **Slices** and a library called **Immer**, which lets us write code that looks like direct state mutation while safely handling immutability in the background!"*

---

### 💻 Part 2: Live Project Demo - DevTrack (0:45 - 2:00)
* **What to Show on Screen:** Interact with the application while you talk!
  1. Point to the top **Productivity & Progress Overview** dashboard cards.
  2. Click **"New Task"**, type `"Build Interactive Cart in React"`, select `"Frontend"`, set Priority to `"High"`, and click **Create Task**.
  3. Show how the new card appears and how the top Total Tasks count increments instantly!
  4. Click the circle/checkbox on a card to mark it as **Completed**. Show the percentage progress bar move!
  5. Click the **"Completed"** filter tab, then test the search bar by typing `"React"` or `"API"`.
* **What to Say:**
> *"To put my learning into practice, I built **DevTrack**, a clean, professional productivity and learning dashboard for developers. Let me show you how it works!*
>
> *Right at the top, we have a real-time metrics overview. Here's the cool architectural part: I don't store total counts or completion percentages in my database. Instead, I use React-Redux's `useSelector` hook under the hood to derive these metrics on the fly! Whenever my tasks array changes, this dashboard automatically recalculates.*
>
> *Let's add a new task—say, 'Build Interactive Cart in React'. I'll assign it to the Frontend category with High priority and save it. Notice how our UI updates immediately without any page refresh! I can also toggle tasks between In Progress and Completed with a single click, filter my workspace by status, or search for specific keywords in real-time."*

---

### 🔍 Part 3: Under the Hood - Code Walkthrough (2:00 - 3:15)
* **What to Show on Screen:** Switch to **VS Code**. First open `src/redux/store.js`, then open `src/redux/studySlice.js`. Highlight the `createSlice` section and the `addGoal` reducer.
* **What to Say:**
> *"Let me take you under the hood into my source code to show how Redux Toolkit manages this data flow.*
>
> *In my `store.js` file, I used `configureStore()` to set up our master state vault. One extra feature I implemented here is custom **LocalStorage persistence**. I subscribed to store updates so that whenever an action modifies our state, the latest data is automatically backed up in the browser's storage. Even if I refresh the page tomorrow, my study goals are restored!*
>
> *Now looking at `studySlice.js`, I used `createSlice()` to bundle our initial data, reducers, and actions together. Notice my `addGoal` and `updateGoal` reducers: thanks to Immer under the hood, I can literally write `state.goals.unshift(action.payload)` or mutate object properties directly without manually writing messy spread operators like in classic Redux. When a user clicks Save in my UI, we call `useDispatch()` to send these actions straight to the store!"*

---

### 🚧 Part 4: Challenges Faced & Interesting Discoveries (3:15 - 3:50)
* **What to Show on Screen:** Switch back to the browser showing your clean app or documentation markdown file.
* **What to Say:**
> *"Learning global state management independently definitely came with hurdles. My biggest challenge at first was understanding the **Immer Illusion**. When reading classic Redux tutorials online, you see strict warnings never to mutate state directly. It took some experimenting and reading docs to realize that in Redux Toolkit, mutating state inside `createSlice` is actually the recommended way!*
>
> *One really interesting concept I explored during this challenge was **Time-Travel Debugging** using the Redux DevTools browser extension. Being able to inspect every dispatched action, check payload data, and replay past state transitions step-by-step made debugging an absolute joy compared to standard console.logs!"*

---

### 🏁 Part 5: Conclusion & Outro (3:50 - 4:15)
* **What to Show on Screen:** Smile (if face camera is on) or show your LinkedIn/GitHub repo on screen.
* **What to Say:**
> *"Overall, this Mini Hackathon pushed me out of my comfort zone and taught me how to learn new software engineering documentation independently. Redux Toolkit is no longer an intimidating buzzword to me—it's a clean, logical tool that I can't wait to explore further in our upcoming live classes.*
>
> *Thank you so much to Sheryians Coding School and my mentors for this challenge, and thank you for watching my presentation! All code, live demo links, and documentation are attached in my LinkedIn post below. Happy coding!"*

---
*Tip: If you stumble over a word, don't worry! A conversational, authentic delivery is much better than sounding like a robot reading a script!*
