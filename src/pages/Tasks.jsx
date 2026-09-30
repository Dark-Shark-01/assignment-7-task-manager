import {
  Archive,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const TASK_STORAGE_KEY = "assignment7_tasks";

const STATUS_OPTIONS = ["All", "Raised", "Pending", "Closed"];
const PRIORITY_OPTIONS = ["All", "High", "Medium", "Low"];

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
    year: "numeric",
  });
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case "High":
      return "task-priority-high";
    case "Medium":
      return "task-priority-medium";
    case "Low":
      return "task-priority-low";
    default:
      return "";
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "Closed":
      return "task-status-closed";
    case "Pending":
      return "task-status-pending";
    case "Raised":
      return "task-status-raised";
    default:
      return "";
  }
};

function Tasks() {
  const [tasks, setTasks] = useState(getTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const statistics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "Closed"
    ).length;
    const pending = tasks.filter(
      (task) => task.status === "Pending"
    ).length;
    const raised = tasks.filter(
      (task) => task.status === "Raised"
    ).length;

    return {
      total,
      completed,
      pending,
      raised,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.header?.toLowerCase().includes(normalizedSearch) ||
        task.description?.toLowerCase().includes(normalizedSearch) ||
        task.category?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    priorityFilter,
    searchQuery,
    statusFilter,
    tasks,
  ]);

  const deleteTask = (taskId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!shouldDelete) {
      return;
    }

    const updatedTasks = tasks.filter(
      (task) => task.id !== taskId
    );

    localStorage.setItem(
      TASK_STORAGE_KEY,
      JSON.stringify(updatedTasks)
    );

    setTasks(updatedTasks);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const hasActiveFilters =
    searchQuery.trim() ||
    statusFilter !== "All" ||
    priorityFilter !== "All";

  return (
    <main className="tasks-page">
      <div className="tasks-container">
        <header className="tasks-header">
          <div>
            <span className="add-task-eyebrow">
              TASK MANAGEMENT
            </span>

            <h1>Tasks</h1>

            <p>
              Organize your work, track progress, and stay in
              control.
            </p>
          </div>

          <div className="tasks-header-actions">
            <Link
              to="/tasks/completed"
              className="secondary-task-button"
            >
              <Archive size={15} />
              Completed
            </Link>

            <Link
              to="/tasks/add"
              className="create-task-button"
            >
              <Plus size={15} />
              Add Task
            </Link>
          </div>
        </header>

        <section className="task-statistics">
          <div className="task-stat-card">
            <div className="task-stat-icon">
              <CheckCircle2 size={17} />
            </div>

            <div>
              <span>Total Tasks</span>
              <strong>{statistics.total}</strong>
            </div>
          </div>

          <div className="task-stat-card">
            <div className="task-stat-icon">
              <Clock3 size={17} />
            </div>

            <div>
              <span>Pending</span>
              <strong>{statistics.pending}</strong>
            </div>
          </div>

          <div className="task-stat-card">
            <div className="task-stat-icon">
              <CircleAlert size={17} />
            </div>

            <div>
              <span>Raised</span>
              <strong>{statistics.raised}</strong>
            </div>
          </div>

          <div className="task-stat-card">
            <div className="task-stat-icon">
              <CheckCircle2 size={17} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{statistics.completed}</strong>
            </div>
          </div>
        </section>

        <section className="task-toolbar">
          <div className="task-search">
            <Search size={15} />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search tasks..."
              aria-label="Search tasks"
            />
          </div>

          <div className="task-filter-group">
            <label htmlFor="status-filter">
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              {STATUS_OPTIONS.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="task-filter-group">
            <label htmlFor="priority-filter">
              Priority
            </label>

            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option value={priority} key={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="clear-task-filters"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}
        </section>

        <section className="tasks-result-header">
          <div>
            <span className="tasks-result-label">
              Showing
            </span>

            <strong>
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1
                ? "task"
                : "tasks"}
            </strong>
          </div>

          {hasActiveFilters && (
            <span className="tasks-filter-active">
              Filters active
            </span>
          )}
        </section>

        {filteredTasks.length === 0 ? (
          <section className="tasks-empty">
            <div className="tasks-empty-icon">
              <CheckCircle2 size={25} />
            </div>

            <h2>
              {tasks.length === 0
                ? "No tasks yet"
                : "No matching tasks"}
            </h2>

            <p>
              {tasks.length === 0
                ? "Create your first task and start organizing your work."
                : "Try changing your search or filter settings."}
            </p>

            {tasks.length === 0 ? (
              <Link
                to="/tasks/add"
                className="create-task-button"
              >
                <Plus size={15} />
                Create Task
              </Link>
            ) : (
              <button
                type="button"
                className="secondary-task-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </section>
        ) : (
          <section className="tasks-list">
            {filteredTasks.map((task) => (
              <article className="task-card" key={task.id}>
                <div className="task-card-main">
                  <div
                    className={`task-status-indicator ${getStatusClass(
                      task.status
                    )}`}
                    aria-hidden="true"
                  />

                  <div className="task-card-content">
                    <div className="task-card-topline">
                      <Link
                        to={`/tasks/${task.id}`}
                        className="task-card-title"
                      >
                        {task.header || "Untitled task"}
                      </Link>

                      <span
                        className={`task-priority ${getPriorityClass(
                          task.priority
                        )}`}
                      >
                        {task.priority || "Low"}
                      </span>
                    </div>

                    <p className="task-card-description">
                      {task.description ||
                        "No description provided."}
                    </p>

                    <div className="task-card-meta">
                      <span>
                        {task.category || "Uncategorized"}
                      </span>

                      <span>
                        {task.status || "Raised"}
                      </span>

                      <span>
                        Due {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="task-card-actions">
                  <Link
                    to={`/tasks/${task.id}`}
                    className="task-view-button"
                    aria-label={`View ${task.header || "task"}`}
                  >
                    View
                    <ChevronRight size={14} />
                  </Link>

                  <button
                    type="button"
                    className="task-delete-button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${
                      task.header || "task"
                    }`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Tasks;