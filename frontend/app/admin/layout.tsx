"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/admin/login") return;
    apiClient.checkAuth()
      .catch(() => router.push("/admin/login"));
  }, [pathname, router]);

  const navItems = [
    { path: "/admin", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, label: "Dashboard" },
    { path: "/admin/leads", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>, label: "Leads & Inquiries" },
    { path: "/admin/academy", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, label: "Academy" },
    { path: "/admin/experts", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, label: "Experts Directory" },
    { path: "/admin/industries", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, label: "Industries & Services" },
    { path: "/admin/content", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, label: "Content Library" },
    { path: "/admin/offices", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: "Global Offices" },
    { path: "/admin/partnerships", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, label: "Partnerships" },
    { path: "/admin/settings", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "System Settings" },
  ];

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div>
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col z-50">
          <div className="p-6 flex items-center gap-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg">
              J
            </div>
            <div>
              <h2 className="text-gray-900 font-bold leading-tight">JACOM Admin</h2>
              <p className="text-xs text-gray-500 font-medium">Management Portal</p>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all text-left ${
                  pathname === item.path
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-4 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-bold truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate uppercase tracking-widest font-bold">Master Account</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 flex flex-col min-h-screen bg-white">
          {/* Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
            <h1 className="text-lg font-bold text-gray-800">
              {navItems.find(item => item.path === pathname)?.label || "JACOM Admin"}
            </h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-px bg-gray-200 mx-2"></div>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              </button>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1">{children}</div>

          {/* Footer */}
          <footer className="p-8 border-t border-gray-200 bg-white mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-xs">© 2024 JACOM International Management. All rights reserved.</p>
              <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                <a className="hover:text-blue-600 transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-blue-600 transition-colors" href="#">Terms of Service</a>
                <a className="hover:text-blue-600 transition-colors" href="#">Support</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
