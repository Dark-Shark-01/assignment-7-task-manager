import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Save,
  Trash2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const getTasks = () =>
  JSON.parse(localStorage.getItem("assignment7_tasks") || "[]");

function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(() =>
    getTasks().find((item) => item.id === taskId)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(() => {
    const foundTask = getTasks().find((item) => item.id === taskId);

    return (
      foundTask || {
        header: "",
        description: "",
        priority: "Medium",
        category: "Academic",
        dueDate: "",
        status: "Raised",
      }
    );
  });

  const [error, setError] = useState("");

  if (!task) {
    return (
      <main className="task-details-page">
        <div className="task-details-empty">
          <h1>Task not found</h1>
          <p>The task may have been deleted or no longer exists.</p>

          <Link to="/tasks" className="create-task-button">
            <ArrowLeft size={15} />
            Back to Tasks
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSave = () => {
    const header = form.header.trim();
    const description = form.description.trim();

    if (!header) {
      setError("Task header is required.");
      return;
    }

    if (!description) {
      setError("Task description is required.");
      return;
    }

    if (!form.dueDate) {
      setError("Due date is required.");
      return;
    }

    const updatedTask = {
      ...task,
      ...form,
      header,
      description,
    };

    const updatedTasks = getTasks().map((item) =>
      item.id === taskId ? updatedTask : item
    );

    localStorage.setItem(
      "assignment7_tasks",
      JSON.stringify(updatedTasks)
    );

    setTask(updatedTask);
    setForm(updatedTask);
    setIsEditing(false);
    setError("");
  };

  const handleStatusChange = (status) => {
    const updatedTask = {
      ...task,
      status,
    };

    const updatedTasks = getTasks().map((item) =>
      item.id === taskId ? updatedTask : item
    );

    localStorage.setItem(
      "assignment7_tasks",
      JSON.stringify(updatedTasks)
    );

    setTask(updatedTask);
    setForm(updatedTask);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    const updatedTasks = getTasks().filter(
      (item) => item.id !== taskId
    );

    localStorage.setItem(
      "assignment7_tasks",
      JSON.stringify(updatedTasks)
    );

    navigate("/tasks");
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Not set";
    }

    return new Date(`${dateValue}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatRaisedDate = (dateValue) => {
    if (!dateValue) {
      return "Not available";
    }

    return new Date(dateValue).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="task-details-page">
      <div className="task-details-container">
        <div className="task-details-topbar">
          <Link to="/tasks" className="back-link">
            <ArrowLeft size={15} />
            Back to Tasks
          </Link>

          <button
            type="button"
            className="delete-detail-button"
            onClick={handleDelete}
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>

        <header className="task-details-header">
          <div>
            <span className="add-task-eyebrow">TASK DETAILS</span>

            <h1>{task.header}</h1>

            <div className="task-detail-badges">
              <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                {task.priority} Priority
              </span>

              <span className="category-badge">
                {task.category}
              </span>

              <span className={`status-badge status-${task.status.toLowerCase()}`}>
                {task.status}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="edit-task-button"
            onClick={() => {
              setIsEditing((current) => !current);
              setError("");
            }}
          >
            <Edit3 size={15} />
            {isEditing ? "Cancel Edit" : "Edit Task"}
          </button>
        </header>

        {isEditing ? (
          <section className="task-edit-panel">
            <div className="form-field">
              <label htmlFor="detail-header">Task Header</label>

              <input
                id="detail-header"
                name="header"
                value={form.header}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="detail-description">
                Task Description
              </label>

              <textarea
                id="detail-description"
                name="description"
                rows={6}
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="detail-priority">Priority</label>

                <select
                  id="detail-priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="detail-category">Category</label>

                <select
                  id="detail-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Academic">Academic</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="detail-due-date">Due Date</label>

                <input
                  id="detail-due-date"
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className="create-task-button save-task-button"
              onClick={handleSave}
            >
              <Save size={15} />
              Save Changes
            </button>
          </section>
        ) : (
          <section className="task-detail-content">
            <div className="task-detail-description">
              <span className="detail-label">DESCRIPTION</span>

              <p>{task.description}</p>
            </div>

            <div className="task-detail-grid">
              <div className="detail-info-card">
                <CalendarDays size={17} />
                <span>Due Date</span>
                <strong>{formatDate(task.dueDate)}</strong>
              </div>

              <div className="detail-info-card">
                <Clock3 size={17} />
                <span>Raised</span>
                <strong>{formatRaisedDate(task.raisedAt)}</strong>
              </div>

              <div className="detail-info-card">
                <CheckCircle2 size={17} />
                <span>Status</span>

                <select
                  value={task.status}
                  onChange={(event) =>
                    handleStatusChange(event.target.value)
                  }
                  className="status-select"
                >
                  <option value="Raised">Raised</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default TaskDetails;