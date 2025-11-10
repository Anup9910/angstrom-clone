import Sidebar from './components/sidebar';
import Navbar from './components/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Navbar />
        <main className="pt-14 lg:pt-14 p-6">{children}</main>
      </div>
    </div>
  );
}