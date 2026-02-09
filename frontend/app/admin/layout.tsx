"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (pathname === "/admin/login") {
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          router.push('/admin/login');
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isChecking) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "📊", active: pathname === "/admin" },
    { name: "Content", href: "/admin/content", icon: "📝", active: pathname === "/admin/content" },
    { name: "Industries", href: "/admin/industries", icon: "🏭", active: pathname === "/admin/industries" },
    { name: "Services", href: "/admin/services", icon: "⚙️", active: pathname === "/admin/services" },
    { name: "Insights", href: "/admin/insights", icon: "💡", active: pathname === "/admin/insights" },
    { name: "Experts", href: "/admin/experts", icon: "👥", active: pathname === "/admin/experts" },
    { name: "Offices", href: "/admin/offices", icon: "🏢", active: pathname === "/admin/offices" },
    { name: "Careers", href: "/admin/careers", icon: "💼", active: pathname === "/admin/careers" },
    { name: "Leads", href: "/admin/leads", icon: "📧", active: pathname === "/admin/leads" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r fixed h-full overflow-y-auto">
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              J
            </div>
            <div>
              <div className="font-bold text-lg">JAS.COM</div>
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            Content
          </div>
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Settings
            </div>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <span className="text-lg">🌐</span>
                  <span className="font-medium">View Site</span>
                </Link>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <span className="text-lg">⚙️</span>
                  <span className="font-medium">Settings</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={async () => {
                    await fetch('/api/auth/logout', { method: 'POST' });
                    window.location.href = '/admin/login';
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="text-lg">🚪</span>
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t mt-auto">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Admin User</div>
                <div className="text-xs text-gray-500">admin@jas.com</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}
