import React from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

function Card({ title, action, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export default function ModernCertificateDashboard() {
  const certificates = [
    {
      icon: Shield,
      title: "SSL Certificate",
      domain: import.meta.env.VITE_API_BASE_URL,
      days: 89,
      gradient: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderHover: "hover:border-indigo-300"
    },
    {
      icon: Lock,
      title: "Domain Certificate",
      domain: import.meta.env.VITE_API_BASE_URL,
      days: 45,
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderHover: "hover:border-purple-300"
    },
    {
      icon: Zap,
      title: "API Certificate",
      domain: import.meta.env.VITE_API_BASE_URL,
      days: 120,
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderHover: "hover:border-blue-300"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl">
        <Card title="Active Certificates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-xl p-6 border border-gray-200 ${cert.borderHover} transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cert.gradient} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                    <cert.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-200">
                    Active
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1.5 text-base">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-500 mb-4 font-mono">
                  {cert.domain}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
                  <span className="text-gray-500 font-medium">Expires in</span>
                  <span className="font-semibold text-gray-900">
                    {cert.days} <span className="text-gray-500 font-normal">days</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}