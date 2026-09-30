import { Navigate, Route, Routes } from "react-router-dom";

import TaskDetails from "./pages/TaskDetails";
import AddTask from "./pages/AddTask";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CompletedTasks from "./pages/CompletedTasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/tasks/add" element={<AddTask />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/tasks/completed" element={<CompletedTasks />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;