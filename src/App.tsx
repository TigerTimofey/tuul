import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./layout/components/dashboard/Dashboard";
import ProtectedRoute from "./config/protected/ProtectedRoute";
import AuthenticationPage from "./layout/components/auth/AuthenticationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
