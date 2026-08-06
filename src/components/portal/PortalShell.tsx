import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  GraduationCap,
  MessageSquare,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/button';

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

interface PortalShellProps {
  title: string;
  userType: 'student' | 'staff';
  userEmail?: string;
  userName?: string;
  children: React.ReactNode;
}

export function PortalShell({
  title,
  userType,
  userEmail = 'user@academy.co.za',
  userName = 'Kuhle Ngam',
  children
}: PortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const studentNavItems: NavItem[] = [
    { label: 'Dashboard', to: '/student', icon: LayoutDashboard },
    { label: 'Subjects & Modules', to: '/student/subjects', icon: BookOpen },
    { label: 'Timetable', to: '/student/timetable', icon: Calendar },
    { label: 'Grades & Results', to: '/student/grades', icon: GraduationCap },
    { label: 'Library Resources', to: '/student/library', icon: BookOpen },
    { label: 'Messages', to: '/student/messages', icon: MessageSquare },
    { label: 'Payments & Fees', to: '/student/payment', icon: CreditCard },
    { label: 'Profile', to: '/student/profile', icon: User },
  ];

  const staffNavItems: NavItem[] = [
    { label: 'Dashboard', to: '/staff', icon: LayoutDashboard },
    { label: 'Student Management', to: '/staff/students', icon: User },
    { label: 'Bookings & Appointments', to: '/staff/bookings', icon: Calendar },
    { label: 'Resource Center', to: '/staff/resources', icon: BookOpen },
    { label: 'Messages', to: '/staff/messages', icon: MessageSquare },
  ];

  const navItems = userType === 'student' ? studentNavItems : staffNavItems;

  const handleLogout = () => {
    // Perform logout cleanup if needed
    navigate({ to: userType === 'student' ? '/student-login' : '/staff-login' });
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Top Navbar with Hamburger Toggle */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b bg-background px-4 h-16 shadow-sm">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation drawer"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <span className="font-bold text-base truncate">{title}</span>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
          {userType}
        </span>
      </header>

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-background border-r flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 flex items-center px-6 border-b justify-between">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-sm leading-tight">
                Igugulethu Ulwazi
              </span>
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent text-muted-foreground hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout Button */}
        <div className="p-4 border-t bg-muted/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate">{userName}</span>
              <span className="text-xs text-muted-foreground truncate">{userEmail}</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="hidden md:flex items-center justify-between pb-4 border-b">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {userName}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary capitalize">
              {userType} Portal
            </span>
          </div>

          {/* Children View */}
          {children}
        </div>
      </main>
    </div>
  );
}
