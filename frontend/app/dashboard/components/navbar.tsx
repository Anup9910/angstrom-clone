'use client';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // You can clear token/cookie here if using JWT auth
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md h-14 px-6 fixed top-0 left-0 right-0 lg:left-64 z-30">
      <div className="flex items-center space-x-3">
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
