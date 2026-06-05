'use client';

import { useRouter } from 'next/navigation';
import { ChevronRight, BookOpen, Users, Calendar, LayoutDashboard, FileText, GraduationCap } from 'lucide-react';

const myApps = [
  { name: 'School Management System', description: 'Complete system for managing students, teachers, classes, and grades', icon: GraduationCap, color: 'bg-teal-500', href: '/projects/school-management' },
  { name: 'Library System', description: 'Digital library management with book catalog and borrowing system', icon: BookOpen, color: 'bg-orange-500', href: '/projects/library' },
  { name: 'Student Portal', description: 'Online portal for students to view grades, attendance, and announcements', icon: Users, color: 'bg-red-500', href: '/projects/student-portal' },
  { name: 'Attendance Tracker', description: 'Real-time attendance tracking for schools and organizations', icon: Calendar, color: 'bg-blue-500', href: '/projects/attendance' },
  { name: 'E-Learning Platform', description: 'Online learning platform with courses, quizzes, and progress tracking', icon: LayoutDashboard, color: 'bg-purple-500', href: '/projects/e-learning' },
  { name: 'Report Generator', description: 'Automated report generation for school administrations', icon: FileText, color: 'bg-green-500', href: '/projects/reports' },
];

export default function ApplicationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">My Applications</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of web applications I've built for various clients and projects.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={index}
                onClick={() => router.push(app.href)}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-gray-900 transition-colors" size={24} />
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-900">{app.name}</h2>
                <p className="text-gray-600 mb-4">{app.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
