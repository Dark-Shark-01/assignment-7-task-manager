import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <main>
            <h1>Assignment 7</h1>
            <p>Authentication System</p>
          </main>
        }
      />

      <Route
        path="/dashboard"
        element={
          <main>
            <h1>Dashboard</h1>
            <p>Protected Task Manager Dashboard</p>
          </main>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;