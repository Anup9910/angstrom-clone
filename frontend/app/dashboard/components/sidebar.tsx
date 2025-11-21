'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [masterExpanded, setMasterExpanded] = useState(
    pathname?.startsWith('/dashboard/master') || false
  );

  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Users', href: '/dashboard/users' },
    { name: 'Reports', href: '/dashboard/reports' },
    { name: 'Settings', href: '/dashboard/settings' },
  ];

  const masterSubmenu = [
    { name: 'Material Master', href: '/dashboard/master/material' },
    { name: 'Master Formulas', href: '/dashboard/master/formulas' },
  ];

  const isMasterActive = pathname?.startsWith('/dashboard/master');

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-gray-800 text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white w-64 p-5 z-40 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-10 text-center">Angstrom</h2>

        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-3 py-2 rounded-md transition ${
                  pathname === link.href
                    ? 'bg-gray-700 text-white font-semibold'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Master expandable section */}
          <li>
            <button
              onClick={() => setMasterExpanded(!masterExpanded)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition ${
                isMasterActive
                  ? 'bg-gray-700 text-white font-semibold'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <span>Master</span>
              <span className="text-sm">
                {masterExpanded ? '▼' : '▶'}
              </span>
            </button>
            {masterExpanded && (
              <ul className="mt-2 ml-4 space-y-2">
                {masterSubmenu.map((subItem) => (
                  <li key={subItem.href}>
                    <Link
                      href={subItem.href}
                      className={`block px-3 py-2 rounded-md transition ${
                        pathname === subItem.href
                          ? 'bg-gray-700 text-white font-semibold'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
