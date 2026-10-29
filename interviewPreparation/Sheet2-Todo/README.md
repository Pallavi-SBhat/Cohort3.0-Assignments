# FlowBoard — Pro React Kanban Task Board

A responsive **Kanban Task Board** built with **React**, **Tailwind CSS v3**, **Vite**, and **HTML5 Drag and Drop**. Designed specifically to meet all requirements of the **Frontend Machine Coding Round (Section 4)** with UX and engineering practices.

![Kanban Board Preview](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8)
![Build](https://img.shields.io/badge/Vite-Build%20Passing-emerald)
![License](https://img.shields.io/badge/Status-Complete-green)

---

## 🚀 Key Features & Requirements Matrix

| Requirement | Implementation Details |
|---|---|
| **Add Task** | Modal with input validation, title character counter (80 chars), multiline description, priority picker (Urgent, High, Medium, Low), status selector, and due date. |
| **Edit / Delete** | Update any task in-place via an accessible modal. Delete triggers a confirmation modal followed by a 6-second **Undo** toast to prevent accidental loss. |
| **Status / Move** | Native **HTML5 Drag and Drop** with hover glows and placeholder targets. Includes a **quick move dropdown** on every card for accessibility and mobile users. |
| **Search** | Real-time debounced title and description search with instant **keyword highlighting** (`<mark>`) and quick clear (`X`). |
| **Filter & Sort** | Filter by priority (`Urgent`, `High`, `Medium`, `Low`) and sort by Due Date, Priority level, Creation date, or Title. Active filters pill with one-click **Reset Filters**. |
| **Persistence** | Full **LocalStorage** synchronization (`flowboard_react_tasks_v1`). Pre-seeded with sample tasks on initial visit. JSON Export and Import capabilities. |
| **Responsive UI** | Seamless 3-column grid on desktop and tablets. On mobile devices (<768px), an adaptive **segmented column tab switcher** displays column counts and switches views smoothly. |
| **UX States** | Column empty states with custom icons and quick-add actions; Global "No matching tasks found" banner with reset action; Form validation with red highlights and shake animation; floating toasts with progress bars; celebration confetti on task completion. |
| **Theme Support** | Curated Dark mode and Light mode with instant theme toggle and LocalStorage memory. |

---

## ⌨️ Keyboard Shortcuts

- <kbd>N</kbd> — Open modal to create a new task
- <kbd>/</kbd> — Focus the task search input immediately
- <kbd>Esc</kbd> — Close active modal, dropdown, or search focus

---

## 🛠️ Project Structure

```
Sheet2-Todo/
├── index.html                 # Semantic entry point with Google Fonts (Plus Jakarta Sans & Inter)
├── package.json               # Dependencies (React, Tailwind v3, Lucide, Canvas Confetti)
├── tailwind.config.js         # Tailwind theme extension, brand tokens, and keyframe animations
├── postcss.config.js          # PostCSS configuration for Tailwind CSS v3
├── vite.config.js             # Vite configuration
└── src/
    ├── main.jsx               # Application mount point
    ├── App.jsx                # Main layout coordinator & keyboard shortcut listeners
    ├── index.css              # Tailwind directives, custom scrollbars, and drop glow
    ├── context/
    │   └── KanbanContext.jsx  # Central reactive state, actions, toast engine, and confetti
    ├── utils/
    │   └── storage.js         # LocalStorage read/write, seed generator, JSON export/import
    └── components/
        ├── Header.jsx         # Board header, real-time stats (Total, Done, Progress %), data menu
        ├── Toolbar.jsx        # Search input, priority filter, sort selector, reset button
        ├── MobileTabs.jsx     # Segmented column switcher for mobile viewports
        ├── KanbanBoard.jsx    # 3-column layout grid & global no-results banner
        ├── KanbanColumn.jsx   # Column container, HTML5 drop-zone, empty state
        ├── TaskCard.jsx       # Draggable card, priority badge, search highlight, quick move
        ├── TaskModal.jsx      # Create & Edit task dialog with form validation & shake effect
        ├── DeleteConfirmModal.jsx # Confirmation dialog before deletion
        ├── ToastContainer.jsx # Floating toast notifications with timer bar & Undo button
        └── Footer.jsx         # Keyboard shortcuts guide & persistence status
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` folder.

---

## 🎨 Design Decisions & Machine Coding Highlights

1. **Accessibility First**:
   - Every card has an accessible dropdown to move between columns without relying solely on mouse dragging.
   - Modals trap focus and can be dismissed using `Esc`.
   - Colors meet WCAG contrast guidelines in both Dark and Light modes.

2. **Accidental Deletion Prevention**:
   - Two layers of protection: a delete confirmation modal and a toast notification with an interactive **Undo** button.

3. **Performance & Clean State Flow**:
   - Single source of truth managed via `KanbanContext`.
   - Derives search, filter, and sort results with `useMemo` to eliminate unnecessary re-renders.
   - Drag and Drop uses native HTML5 `dataTransfer`, requiring zero external heavy drag libraries.
