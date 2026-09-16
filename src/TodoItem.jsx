function formatDueDate(date) {
  if (!date) return "No due date";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const isOverdue = task.dueDate && !task.completed && new Date(`${task.dueDate}T23:59:59`) < new Date();

  return (
    <article className={`task-item ${task.completed ? "completed" : ""}`}>
      <button className={`task-check ${task.completed ? "checked" : ""}`} type="button" onClick={() => onToggle(task.id)} aria-label={task.completed ? `Mark ${task.name} active` : `Complete ${task.name}`}>
        {task.completed ? "✓" : ""}
      </button>
      <div className="task-content">
        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
          <h3 className="task-name">{task.name}</h3>
          <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
          <span className="category-badge">{task.category}</span>
        </div>
        <div className={`task-date ${isOverdue ? "overdue" : ""}`}>
          <span aria-hidden="true">◷</span> {isOverdue ? "Overdue · " : "Due · "}{formatDueDate(task.dueDate)}
        </div>
      </div>
      <div className="task-actions">
        <button type="button" className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.name}`}>Edit</button>
        <button type="button" className="icon-btn delete-btn" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.name}`}>Delete</button>
      </div>
    </article>
  );
}

export default TodoItem;
