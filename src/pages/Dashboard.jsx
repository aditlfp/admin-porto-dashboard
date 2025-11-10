import { Shield, Lock, Calendar, Clock, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "../api/projects";
import {
  getCertificates,
} from "../api/certificates";
import Card from '../components/ModernCertificateDashboard'

export default function Dashboard() {
  const [stats, setStats] = useState({
    certificates: 0,
    projects: 0,
    loading: true
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load stats (replace with actual API calls)
    const loadStats = async () => {
      try {
        // Simulated data - replace with actual API calls
        const resProj = await getProjects();
        const resCert = await getCertificates();
        setTimeout(() => {
          setStats({
            certificates: resCert.data.total,
            projects: resProj.data.total,
            loading: false
          });
        }, 1000);
      } catch (error) {
        console.error('Error loading stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadStats();

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                {getGreeting()}, Admin! 👋
              </h1>
              <p className="text-slate-600 text-lg">
                Here's what's happening with your portfolio today.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock size={12} />
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card />

      </div>
    </div>
  );
}