import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Hero from "./pages/Hero";
import Link from "./pages/link";
import RedirectLink from "./pages/redirectLink";
import AppLayout from "./appLayout"; // Contains nav and header
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/link/:id"
            element={
              <ProtectedRoute>
                <Link />
              </ProtectedRoute>
            }
          />
          <Route path="/:id" element={<RedirectLink />} />
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
