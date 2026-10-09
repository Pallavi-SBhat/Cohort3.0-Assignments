# 🚀 Interview Ready - Practice Tracker

A modern, responsive web application designed to track, practice, and master frontend and full-stack interview questions (pre-populated with Sheryians Coding School Sheet 01 prep set).

🔗 **Live Demo:** [https://cohort3-0-assignments-21mj.vercel.app/](https://cohort3-0-assignments-21mj.vercel.app/)

---

## ✨ Features

- **📊 Interactive Dashboard & KPI Analytics**: Real-time stats showing total questions, completed, in-progress, pending counts, and overall completion progress percentage.
- **🔄 Status Cycle & Gamification**: One-click status cycling (`Pending` ➔ `In Progress` ➔ `Completed`). Triggers a celebratory confetti animation upon completion!
- **🔍 Advanced Filtering & Search**: Instant real-time text search across question titles, descriptions, notes, and categories. Dynamic filtering by Category, Status, and Difficulty.
- **📖 Solution Drawer**: Detailed sliding drawer displaying comprehensive explanations, formatted code snippets, key takeaways, and resource links for every question.
- **➕ Full CRUD Support**: Add custom interview questions, edit existing entries, and delete questions with confirmation prompts.
- **💾 LocalStorage Persistence**: Automatically persists all progress, updates, and custom questions locally in the browser (`localStorage`).
- **📥 Data Export & Import**: Backup your progress as a JSON file and import exported backup files anytime.
- **⚡ Reset Data**: Option to restore the original pre-loaded Sheet 01 question database anytime.
- **📱 Modern & Responsive UI**: Glassmorphic aesthetic, sleek dark mode theme, smooth animations, and fully responsive across mobile, tablet, and desktop screens.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Linter**: [Oxlint](https://oxc.rs/)
- **Styling**: Vanilla CSS3 with CSS Variables & Glassmorphism design system

---

## 🚀 Setup Steps

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed on your machine.

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd interviewReady
   ```

2. **Navigate into the project directory:**
   ```bash
   cd tracker
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the URL printed in your terminal).

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build locally:**
   ```bash
   npm run preview
   ```

7. **Run Linter:**
   ```bash
   npm run lint
   ```

---

## 🧠 Assumptions & Architectural Decisions

1. **Client-Side Data Storage (`localStorage`)**:
   - The app operates entirely client-side without requiring a backend database or user authentication service.
   - All state mutations (status updates, added/edited questions, notes) are saved locally in the browser `localStorage` key (`interview_tracker_questions_v1`).

2. **Data Backup & Schema Integrity**:
   - Importing backup JSON files assumes the JSON structure matches the expected question schema (`id`, `title`, `category`, `difficulty`, `status`, `description`, `solution`, `codeSnippet`, `takeaways`, `resources`, `notes`).

3. **Environment & Compatibility**:
   - Assumes a modern browser environment supporting ES6+ JavaScript modules, HTML5 `localStorage`, and CSS flexbox/grid.

4. **Single-User Local Context**:
   - Progress is unique to the active browser instance unless exported and transferred via JSON backups.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
