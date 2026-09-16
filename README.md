# TaskFlow — Task Management & Productivity App

A production-style task management dashboard built with React, JavaScript, Bootstrap, and Vite. TaskFlow focuses on practical frontend engineering: predictable state updates, reusable components, browser persistence, responsive UI, and accessible interactions.

## Features

- Create, edit, complete, and delete tasks
- Persistent task data with `localStorage`
- Unique task IDs to safely handle duplicate task names
- Due dates with overdue-state detection
- Priority levels: High, Medium, Low
- Categories: Work, Personal, Study, Shopping, General
- Search by task name or category
- Filter by All, Active, and Completed
- Sort by recently added, due date, or priority
- Dashboard statistics for total, active, completed, and progress percentage
- Clear all completed tasks
- Responsive mobile-first interface
- Keyboard-friendly form controls and descriptive accessible labels

## Tech Stack

- React 19
- JavaScript (ES6+)
- Bootstrap 5
- CSS3
- Vite
- Browser Local Storage API

## Architecture

The UI is split into focused React components while `App.jsx` coordinates application state and persistence:

```text
src/
├── App.jsx              # Application state, filtering, sorting and persistence
├── AddTodo.jsx          # Create/edit task form
├── TodoItem.jsx         # Individual task presentation and actions
├── TodoItems.jsx        # Legacy list component retained for reference
├── App.css              # Application design system and responsive styles
└── main.jsx             # React entry point + Bootstrap
```

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Engineering Notes

Task data is stored under a versioned local-storage key (`todo-app.tasks.v2`). State updates use functional React setters, and derived dashboard statistics/filter results are memoized with `useMemo`. The application is intentionally API-ready: persistence and UI concerns are separated so a backend service can replace local storage without redesigning the interface.

## Portfolio Highlights

This project demonstrates component-based React development, state management, client-side persistence, derived state, responsive UI engineering, form handling, accessibility considerations, and maintainable project documentation.
