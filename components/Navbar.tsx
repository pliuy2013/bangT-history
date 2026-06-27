'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          방T의 역사
        </Link>
        
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.name}</span>
            {user.role === 'TEACHER' && (
              <Link href="/teacher/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">
                선생님 대시보드
              </Link>
            )}
            {user.role === 'STUDENT' && (
              <Link href="/student/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">
                학생 대시보드
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="hover:bg-blue-700 px-4 py-2 rounded">
              로그인
            </Link>
            <Link href="/signup" className="hover:bg-blue-700 px-4 py-2 rounded">
              회원가입
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
