import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  LogOut,
  Plus,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/useAuth";

const dashboardStats = [
  {
    label: "Total Tasks",
    value: "12",
    icon: ClipboardList,
  },
  {
    label: "Pending",
    value: "05",
    icon: Clock3,
  },
  {
    label: "Completed",
    value: "07",
    icon: CheckCircle2,
  },
];

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link className="dashboard-brand" to="/dashboard">
          <span className="dashboard-brand-mark">
            <ShieldCheck size={19} />
          </span>

          <span>
            <strong>TaskFlow</strong>
            <small>Workspace</small>
          </span>
        </Link>

        <div className="dashboard-user">
          <div className="dashboard-user-info">
            <span>{user?.username}</span>
            <small>Administrator</small>
          </div>

          <div className="dashboard-avatar">
            <UserRound size={17} />
          </div>

          <button
            className="logout-button"
            type="button"
            onClick={logout}
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={17} />
          </button>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-intro">
          <div>
            <span className="dashboard-eyebrow">
              AUTHENTICATED WORKSPACE
            </span>

            <h1>Good to see you, {user?.username}.</h1>

            <p>
              Manage your tasks, monitor progress, and keep your
              workflow moving.
            </p>
          </div>

          <Link className="add-task-button" to="/tasks/add">
            <Plus size={18} />
            <span>Add Task</span>
          </Link>
        </div>

        <div className="dashboard-stats">
          {dashboardStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="stat-card" key={stat.label}>
                <div className="stat-icon">
                  <Icon size={19} />
                </div>

                <div>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              </article>
            );
          })}
        </div>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-eyebrow">TASK MANAGER</span>
              <h2>Your workspace is ready.</h2>
            </div>

            <Link to="/tasks">View Tasks</Link>
          </div>

          <div className="empty-task-state">
            <div className="empty-task-icon">
              <ClipboardList size={24} />
            </div>

            <h3>Start managing your tasks</h3>

            <p>
              Create tasks with priorities, categories, due dates,
              and status tracking.
            </p>

            <Link className="secondary-action" to="/tasks/add">
              Create your first task
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;