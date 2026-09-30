import { useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  header: "",
  description: "",
  priority: "Medium",
  category: "Academic",
  dueDate: "",
};

function AddTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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

    const existingTasks = JSON.parse(
      localStorage.getItem("assignment7_tasks") || "[]"
    );

    const newTask = {
      id: crypto.randomUUID(),
      header,
      description,
      priority: form.priority,
      category: form.category,
      raisedAt: new Date().toISOString(),
      dueDate: form.dueDate,
      status: "Raised",
    };

    localStorage.setItem(
      "assignment7_tasks",
      JSON.stringify([...existingTasks, newTask])
    );

    navigate("/tasks");
  };

  return (
    <main className="add-task-page">
      <div className="add-task-container">
        <Link to="/tasks" className="back-link">
          <ArrowLeft size={15} />
          Back to Tasks
        </Link>

        <header className="add-task-header">
          <span className="add-task-eyebrow">TASK MANAGEMENT</span>

          <h1>Create a new task</h1>

          <p>
            Add a task with its priority, category and due date.
            You can manage it later from your task list.
          </p>
        </header>

        <form className="add-task-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-section-heading">
              <span>01</span>

              <div>
                <h2>Task information</h2>
                <p>Give your task a clear title and description.</p>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="header">
                Task Header <span>*</span>
              </label>

              <input
                id="header"
                name="header"
                type="text"
                value={form.header}
                onChange={handleChange}
                placeholder="e.g. Complete React assignment"
                maxLength={100}
              />
            </div>

            <div className="form-field">
              <label htmlFor="description">
                Task Description <span>*</span>
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what needs to be completed..."
                rows={5}
                maxLength={500}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-heading">
              <span>02</span>

              <div>
                <h2>Task settings</h2>
                <p>Define how this task should be organized.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="priority">Priority</label>

                <select
                  id="priority"
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
                <label htmlFor="category">Category</label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Academic">Academic</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="dueDate">Due Date</label>

                <div className="date-input">
                  <CalendarDays size={16} />

                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="task-form-footer">
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <div className="task-form-actions">
              <Link to="/tasks" className="cancel-button">
                Cancel
              </Link>

              <button type="submit" className="create-task-button">
                <CheckCircle2 size={16} />
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AddTask;
