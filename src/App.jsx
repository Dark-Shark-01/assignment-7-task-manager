import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuth } from "./context/useAuth";

function Login() {
  const { login } = useAuth();

  return (
    <main>
      <h1>Login</h1>
      <button
        type="button"
        onClick={() => login("admin", "Admin@123")}
      >
        Demo Login
      </button>
    </main>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}</p>

      <button type="button" onClick={logout}>
        Logout
      </button>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;