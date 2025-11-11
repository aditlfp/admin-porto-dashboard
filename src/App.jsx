import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";
import Projects from "./pages/Projects";
import { useAuth } from "./context/AuthContext";
import "./App.css";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  // Layout admin (sidebar + content)
  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-64 w-full bg-gray-50 min-h-screen p-4">
        <Outlet />
      </div>
    </div>
  );
};

const GuestLayout = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Outlet />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/projects" element={<Projects />}/>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}