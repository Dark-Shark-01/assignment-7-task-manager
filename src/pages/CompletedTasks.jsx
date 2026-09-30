import {
  Archive,
  CheckCircle2,
  Clock3,
  ListChecks,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const TASK_STORAGE_KEY = "assignment7_tasks";

const getTasks = () => {
  try {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch {
    return [];
  }
};

function CompletedTasks() {
  const [tasks, setTasks] = useState(getTasks);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "Closed"),
    [tasks]
  );

  const reopenTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: "Pending",
          }
        : task
    );

    localStorage.setItem(
      TASK_STORAGE_KEY,
      JSON.stringify(updatedTasks)
    );

    setTasks(updatedTasks);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "No due date";
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

  return (
    <main className="completed-page">
      <div className="completed-container">
        <header className="completed-header">
          <div>
            <span className="add-task-eyebrow">
              TASK ARCHIVE
            </span>

            <h1>Completed Tasks</h1>

            <p>
              A record of everything you have successfully
              completed.
            </p>
          </div>

          <div className="completed-count">
            <CheckCircle2 size={17} />
            <strong>{completedTasks.length}</strong>
            <span>completed</span>
          </div>
        </header>

        <section className="completed-summary">
          <div className="completed-summary-card">
            <div className="summary-icon">
              <ListChecks size={17} />
            </div>

            <div>
              <span>Total completed</span>
              <strong>{completedTasks.length}</strong>
            </div>
          </div>

          <div className="completed-summary-card">
            <div className="summary-icon">
              <Clock3 size={17} />
            </div>

            <div>
              <span>Task history</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="completed-summary-card">
            <div className="summary-icon">
              <Archive size={17} />
            </div>

            <div>
              <span>Archive status</span>
              <strong>
                {completedTasks.length > 0
                  ? "Active"
                  : "Empty"}
              </strong>
            </div>
          </div>
        </section>

        {completedTasks.length === 0 ? (
          <section className="completed-empty">
            <div className="completed-empty-icon">
              <CheckCircle2 size={26} />
            </div>

            <h2>No completed tasks yet</h2>

            <p>
              Tasks marked as <strong>Closed</strong> will appear
              here automatically.
            </p>

            <Link to="/tasks" className="create-task-button">
              <ListChecks size={15} />
              View Tasks
            </Link>
          </section>
        ) : (
          <section className="completed-list">
            {completedTasks.map((task) => (
              <article className="completed-task-card" key={task.id}>
                <div className="completed-task-main">
                  <div className="completed-check">
                    <CheckCircle2 size={17} />
                  </div>

                  <div className="completed-task-content">
                    <Link
                      to={`/tasks/${task.id}`}
                      className="completed-task-title"
                    >
                      {task.header}
                    </Link>

                    <p>{task.description}</p>

                    <div className="completed-task-meta">
                      <span>{task.category}</span>
                      <span>{task.priority} Priority</span>
                      <span>
                        Due {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="reopen-task-button"
                  onClick={() => reopenTask(task.id)}
                >
                  <RotateCcw size={14} />
                  Reopen
                </button>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default CompletedTasks;