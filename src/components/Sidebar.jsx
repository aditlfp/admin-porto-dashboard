import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Award, Briefcase, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import {
  getUser,
} from "../api/user";
import { useAuth } from "../context/AuthContext";
import { notifyInfo } from './Notifications'

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  const handleLogout = async () => {
    logout();
    notifyInfo("Now You Has Been Log Out!")
    navigate("/login");
  };

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/certificates", icon: Award, label: "Certificates" },
    { path: "/projects", icon: Briefcase, label: "Projects" }
  ];

  const isActive = (path) => location.pathname === path;


  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed ${isOpen ? 'top-7 left-58 translate-x-0 rounded-lg  p-2' : 'top-7 left-0 rounded-r-lg  p-2 px-3'} z-50 bg-slate-800 text-white shadow-lg hover:bg-slate-700 transition-all ease-in-out duration-350`}
      >
        {isOpen ? <PanelLeftClose size={24} /> : <PanelLeftOpen size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 backdrop-blur-md z-40 overflow-hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-72 shadow-2xl
        `}
      >
        {/* Logo/Brand */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold">A</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-slate-400">Management Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20"
                      : "hover:bg-slate-700/50"
                  }
                `}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                )}

                <Icon
                  size={20}
                  className={`
                    transition-transform duration-200
                    ${active ? "text-white" : "text-slate-400 group-hover:text-white"}
                    ${active ? "scale-110" : "group-hover:scale-110"}
                  `}
                />
                <span
                  className={`
                    font-medium transition-colors
                    ${active ? "text-white" : "text-slate-300 group-hover:text-white"}
                  `}
                >
                  {item.label}
                </span>

                {/* Hover effect */}
                <div
                  className={`
                    absolute inset-0 bg-white/10 rounded-xl transition-opacity duration-200
                    ${active ? "opacity-0" : "opacity-0 group-hover:opacity-100"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                AD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>
            <button onClick={() => handleLogout()} className="w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/20">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for main content */}
      <div className={`hidden lg:block sm:mr-9`} />
    </>
  );
}