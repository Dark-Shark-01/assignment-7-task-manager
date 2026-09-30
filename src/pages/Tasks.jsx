import {
  CheckCircle2,
  Clock3,
  ListFilter,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Complete React Assignment",
    description:
      "Finish the authentication system and prepare the project for submission.",
    priority: "High",
    category: "Academic",
    status: "Pending",
    raisedAt: "30 Sep 2026, 10:30 AM",
    dueDate: "02 Oct 2026",
  },
  {
    id: 2,
    title: "Review Project Documentation",
    description:
      "Check the project structure, README and GitHub repository before submission.",
    priority: "Medium",
    category: "Academic",
    status: "Raised",
    raisedAt: "30 Sep 2026, 11:15 AM",
    dueDate: "03 Oct 2026",
  },
  {
    id: 3,
    title: "Update Portfolio",
    description:
      "Add the latest React project and update the project descriptions.",
    priority: "Low",
    category: "Personal",
    status: "Closed",
    raisedAt: "29 Sep 2026, 04:20 PM",
    dueDate: "30 Sep 2026",
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "All" || task.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [
    tasks,
    searchTerm,
    statusFilter,
    priorityFilter,
    categoryFilter,
  ]);

  const handleDelete = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  return (
    <main className="tasks-page">
      <header className="tasks-header">
        <div>
          <span className="tasks-eyebrow">TASK MANAGEMENT</span>

          <h1>Tasks</h1>

          <p>
            Organize your academic and personal work from one
            workspace.
          </p>
        </div>

        <Link className="add-task-button" to="/tasks/add">
          <Plus size={18} />
          Add Task
        </Link>
      </header>

      <section className="tasks-toolbar">
        <div className="task-search">
          <Search size={17} />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
          />
        </div>

        <div className="task-filter-icon" aria-hidden="true">
          <ListFilter size={17} />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          <option value="Raised">Raised</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          aria-label="Filter by priority"
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All Category</option>
          <option value="Academic">Academic</option>
          <option value="Personal">Personal</option>
        </select>
      </section>

      <section className="tasks-summary">
        <div>
          <strong>{filteredTasks.length}</strong>
          <span>
            {filteredTasks.length === 1 ? " task" : " tasks"} found
          </span>
        </div>

        <span>
          {tasks.length} total {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </section>

      <section className="tasks-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div className="task-card-main">
                <div className="task-card-top">
                  <div className="task-badges">
                    <span
                      className={`priority-badge priority-${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                    <span className="category-badge">
                      {task.category}
                    </span>
                  </div>

                  <button
                    className="delete-task-button"
                    type="button"
                    onClick={() => handleDelete(task.id)}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h2>{task.title}</h2>

                <p>{task.description}</p>

                <div className="task-meta">
                  <span>
                    <Clock3 size={14} />
                    Due {task.dueDate}
                  </span>

                  <span>
                    <CheckCircle2 size={14} />
                    Raised {task.raisedAt}
                  </span>
                </div>
              </div>

              <div className="task-card-status">
                <span
                  className={`status-badge status-${task.status.toLowerCase()}`}
                >
                  {task.status}
                </span>

                <Link
                  className="task-details-link"
                  to={`/tasks/${task.id}`}
                >
                  View Details
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="tasks-empty">
            <div className="tasks-empty-icon">
              <ListFilter size={23} />
            </div>

            <h2>No tasks found</h2>

            <p>
              Try changing your filters or create a new task for
              your workspace.
            </p>

            <Link className="secondary-action" to="/tasks/add">
              <Plus size={16} />
              Create Task
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Tasks;