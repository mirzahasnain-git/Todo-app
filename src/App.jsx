import { useEffect, useMemo, useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import "./App.css";

const STORAGE_KEY = "todo-app.tasks.v2";
const FILTERS = ["all", "active", "completed"];

const createTask = ({ name, dueDate, priority, category }) => ({
  id: crypto.randomUUID(),
  name: name.trim(),
  dueDate,
  priority,
  category,
  completed: false,
  createdAt: new Date().toISOString(),
});

function App() {
  const [todoItems, setTodoItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItems));
  }, [todoItems]);

  const stats = useMemo(() => {
    const completed = todoItems.filter((item) => item.completed).length;
    return {
      total: todoItems.length,
      completed,
      active: todoItems.length - completed,
    };
  }, [todoItems]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = todoItems.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !item.completed) ||
        (filter === "completed" && item.completed);
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "dueDate") return (a.dueDate || "9999") .localeCompare(b.dueDate || "9999");
      if (sortBy === "priority") {
        const weights = { high: 0, medium: 1, low: 2 };
        return weights[a.priority] - weights[b.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [filter, search, sortBy, todoItems]);

  const handleSaveTask = (formData) => {
    if (!formData.name.trim()) return;

    if (editingTask) {
      setTodoItems((items) =>
        items.map((item) =>
          item.id === editingTask.id
            ? { ...item, ...formData, name: formData.name.trim() }
            : item,
        ),
      );
      setEditingTask(null);
      return;
    }

    setTodoItems((items) => [createTask(formData), ...items]);
  };

  const handleToggle = (id) => {
    setTodoItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodoItems((items) => items.filter((item) => item.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  };

  const handleClearCompleted = () => {
    setTodoItems((items) => items.filter((item) => !item.completed));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="app-shell">
      <div className="container py-4 py-lg-5">
        <header className="app-header mb-4">
          <div>
            <span className="eyebrow">PRODUCTIVITY WORKSPACE</span>
            <h1 className="display-6 fw-bold mb-2">TaskFlow</h1>
            <p className="text-secondary mb-0">
              Plan, prioritize, and track your work in one focused workspace.
            </p>
          </div>
          <div className="header-badge">{stats.active} active</div>
        </header>

        <section className="dashboard-card p-3 p-md-4 mb-4">
          <AddTodo
            onSave={handleSaveTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </section>

        <section className="stats-grid mb-4" aria-label="Task statistics">
          <div className="stat-card"><span>Total</span><strong>{stats.total}</strong></div>
          <div className="stat-card"><span>Active</span><strong>{stats.active}</strong></div>
          <div className="stat-card"><span>Completed</span><strong>{stats.completed}</strong></div>
          <div className="stat-card"><span>Progress</span><strong>{stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}%</strong></div>
        </section>

        <section className="dashboard-card p-3 p-md-4">
          <div className="toolbar mb-4">
            <div className="search-wrap flex-grow-1">
              <span aria-hidden="true">⌕</span>
              <input
                className="form-control"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks or categories..."
                aria-label="Search tasks"
              />
            </div>
            <select className="form-select toolbar-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort tasks">
              <option value="created">Recently added</option>
              <option value="dueDate">Due date</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div className="filter-group" role="tablist" aria-label="Task filters">
              {FILTERS.map((item) => (
                <button
                  key={item}
                  className={`filter-btn ${filter === item ? "active" : ""}`}
                  onClick={() => setFilter(item)}
                  type="button"
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
            <button className="btn btn-link text-decoration-none text-secondary p-0" type="button" onClick={handleClearCompleted} disabled={!stats.completed}>
              Clear completed
            </button>
          </div>

          <div className="task-list">
            {filteredItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✓</div>
                <h2 className="h5">{todoItems.length ? "No matching tasks" : "Your workspace is clear"}</h2>
                <p className="text-secondary mb-0">{todoItems.length ? "Try another search or filter." : "Add your first task above to get started."}</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <TodoItem
                  key={item.id}
                  task={item}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </section>

        <footer className="text-center text-secondary small pt-4">
          TaskFlow stores your tasks locally in this browser.
        </footer>
      </div>
    </main>
  );
}

export default App;
