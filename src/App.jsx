import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Hero from "./pages/Hero";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
import AppLayout from "./AppLayout"; // Layout with navigation and header
import ProtectedRoute from "./components/ProtectedRoute";

// Main App component for routing
const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected route for Link page */}
          <Route
            path="/link/:id"
            element={
              <ProtectedRoute>
                <Link />
              </ProtectedRoute>
            }
          />
          {/* Redirect route */}
          <Route path="/:id" element={<RedirectLink />} />

          {/* Protected route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
