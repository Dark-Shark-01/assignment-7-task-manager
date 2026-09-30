import {
  Archive,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../context/useAuth";

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

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "No due date";
  }

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "No due date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case "High":
      return "dashboard-priority-high";
    case "Medium":
      return "dashboard-priority-medium";
    case "Low":
      return "dashboard-priority-low";
    default:
      return "";
  }
};

function Dashboard() {
  const { user } = useAuth();

    const tasks = useMemo(() => getTasks(), []);

  const statistics = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status === "Closed"
    ).length;

    const pending = tasks.filter(
      (task) => task.status === "Pending"
    ).length;

    const highPriority = tasks.filter(
      (task) => task.priority === "High"
    ).length;

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      highPriority,
      completionRate,
    };
  }, [tasks]);

  const recentTasks = useMemo(
    () => [...tasks].reverse().slice(0, 5),
    [tasks]
  );

  const username = user?.username || "User";

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              PERSONAL WORKSPACE
            </span>

            <h1>
              Welcome back,{" "}
              <span>{username}</span>
            </h1>

            <p>
              Keep your priorities clear and your work moving
              forward.
            </p>
          </div>

          <div className="dashboard-security">
            <ShieldCheck size={15} />
            <span>Session secured</span>
          </div>
        </header>

        <section className="dashboard-overview">
          <div className="dashboard-overview-content">
            <div className="dashboard-overview-icon">
              <Target size={19} />
            </div>

            <div>
              <span className="dashboard-overview-label">
                YOUR PRODUCTIVITY
              </span>

              <h2>
                {statistics.completionRate}%{" "}
                <small>completed</small>
              </h2>

              <p>
                {statistics.completed} of {statistics.total}{" "}
                {statistics.total === 1 ? "task" : "tasks"}{" "}
                completed.
              </p>
            </div>
          </div>

          <div className="dashboard-progress">
            <div className="dashboard-progress-header">
              <span>Completion</span>
              <strong>
                {statistics.completionRate}%
              </strong>
            </div>

            <div className="dashboard-progress-track">
              <div
                className="dashboard-progress-value"
                style={{
                  width: `${statistics.completionRate}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="dashboard-statistics">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <ListTodo size={17} />
            </div>

            <div>
              <span>Total tasks</span>
              <strong>{statistics.total}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Clock3 size={17} />
            </div>

            <div>
              <span>Pending</span>
              <strong>{statistics.pending}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <TrendingUp size={17} />
            </div>

            <div>
              <span>High priority</span>
              <strong>{statistics.highPriority}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CheckCircle2 size={17} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{statistics.completed}</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-content-grid">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <span className="dashboard-panel-eyebrow">
                  ACTIVITY
                </span>

                <h2>Recent tasks</h2>
              </div>

              <Link
                to="/tasks"
                className="dashboard-panel-link"
              >
                View all
                <ArrowUpRight size={13} />
              </Link>
            </div>

            {recentTasks.length === 0 ? (
              <div className="dashboard-empty">
                <div className="dashboard-empty-icon">
                  <ListTodo size={21} />
                </div>

                <h3>No tasks yet</h3>

                <p>
                  Create your first task to start building
                  your workspace.
                </p>

                <Link
                  to="/tasks/add"
                  className="dashboard-primary-button"
                >
                  <Plus size={14} />
                  Create task
                </Link>
              </div>
            ) : (
              <div className="dashboard-task-list">
                {recentTasks.map((task) => (
                  <Link
                    to={`/tasks/${task.id}`}
                    className="dashboard-task-item"
                    key={task.id}
                  >
                    <div className="dashboard-task-status">
                      {task.status === "Closed" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Clock3 size={16} />
                      )}
                    </div>

                    <div className="dashboard-task-main">
                      <strong>
                        {task.header || "Untitled task"}
                      </strong>

                      <span>
                        {task.category ||
                          "Uncategorized"}{" "}
                        · Due {formatDate(task.dueDate)}
                      </span>
                    </div>

                    <span
                      className={`dashboard-priority ${getPriorityClass(
                        task.priority
                      )}`}
                    >
                      {task.priority || "Low"}
                    </span>

                    <ArrowUpRight
                      className="dashboard-task-arrow"
                      size={14}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <aside className="dashboard-panel dashboard-actions-panel">
            <div className="dashboard-panel-header">
              <div>
                <span className="dashboard-panel-eyebrow">
                  QUICK ACTIONS
                </span>

                <h2>Stay productive</h2>
              </div>
            </div>

            <div className="dashboard-actions">
              <Link
                to="/tasks/add"
                className="dashboard-action-card dashboard-action-primary"
              >
                <div className="dashboard-action-icon">
                  <Plus size={17} />
                </div>

                <div>
                  <strong>Create a task</strong>
                  <span>Add something new to your workspace.</span>
                </div>

                <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/tasks"
                className="dashboard-action-card"
              >
                <div className="dashboard-action-icon">
                  <ListTodo size={17} />
                </div>

                <div>
                  <strong>Manage tasks</strong>
                  <span>Search, filter and organize work.</span>
                </div>

                <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/tasks/completed"
                className="dashboard-action-card"
              >
                <div className="dashboard-action-icon">
                  <Archive size={17} />
                </div>

                <div>
                  <strong>Completed archive</strong>
                  <span>Review everything you've finished.</span>
                </div>

                <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;