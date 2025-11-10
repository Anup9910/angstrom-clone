'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [masterOpen, setMasterOpen] = useState(false); // control for Master submenu

  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Users', href: '/dashboard/users' },
    { name: 'Reports', href: '/dashboard/reports' },
    { name: 'Settings', href: '/dashboard/settings' },
  ];

  const masterLinks = [
    { name: 'Material Master', href: '/dashboard/master/material' },
    { name: 'Unit Master', href: '/dashboard/master/unit' },
  ];

  return (
    <>
      {/* Mobile toggle */}
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
          {/* Normal links */}
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
              onClick={() => setMasterOpen(!masterOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800 text-gray-300 transition"
            >
              <span>Master</span>
              <span className="text-sm">{masterOpen ? '▼' : '▶'}</span>
            </button>

            {/* Submenu items */}
            {masterOpen && (
              <ul className="ml-4 mt-2 space-y-2 border-l border-gray-700 pl-3">
                {masterLinks.map((sublink) => (
                  <li key={sublink.href}>
                    <Link
                      href={sublink.href}
                      className={`block px-2 py-1 rounded-md text-sm transition ${
                        pathname === sublink.href
                          ? 'bg-gray-700 text-white font-semibold'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                    >
                      {sublink.name}
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
