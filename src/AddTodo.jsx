import { useEffect, useState } from "react";

const defaultForm = { name: "", dueDate: "", priority: "medium", category: "General" };

function AddTodo({ onSave, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        name: editingTask.name,
        dueDate: editingTask.dueDate || "",
        priority: editingTask.priority || "medium",
        category: editingTask.category || "General",
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
    if (!editingTask) setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h2 className="h5 fw-bold mb-1">{editingTask ? "Edit task" : "Create a task"}</h2>
          <p className="text-secondary small mb-0">{editingTask ? "Update the details below." : "Capture the next thing you need to get done."}</p>
        </div>
        {editingTask && <button type="button" className="btn btn-sm btn-light" onClick={onCancelEdit}>Cancel</button>}
      </div>

      <div className="row g-2">
        <div className="col-12 col-lg-5">
          <label className="visually-hidden" htmlFor="task-name">Task name</label>
          <input id="task-name" name="name" value={form.name} onChange={handleChange} className="form-control form-control-lg" placeholder="What needs to be done?" autoFocus={!editingTask} maxLength="120" />
        </div>
        <div className="col-6 col-lg-2">
          <label className="visually-hidden" htmlFor="task-date">Due date</label>
          <input id="task-date" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="form-control form-control-lg" />
        </div>
        <div className="col-6 col-lg-2">
          <label className="visually-hidden" htmlFor="task-priority">Priority</label>
          <select id="task-priority" name="priority" value={form.priority} onChange={handleChange} className="form-select form-select-lg">
            <option value="high">High priority</option>
            <option value="medium">Medium</option>
            <option value="low">Low priority</option>
          </select>
        </div>
        <div className="col-8 col-lg-2">
          <label className="visually-hidden" htmlFor="task-category">Category</label>
          <select id="task-category" name="category" value={form.category} onChange={handleChange} className="form-select form-select-lg">
            <option>General</option><option>Work</option><option>Personal</option><option>Study</option><option>Shopping</option>
          </select>
        </div>
        <div className="col-4 col-lg-1 d-grid">
          <button className="btn btn-primary btn-lg" type="submit">{editingTask ? "Save" : "Add"}</button>
        </div>
      </div>
    </form>
  );
}

export default AddTodo;
