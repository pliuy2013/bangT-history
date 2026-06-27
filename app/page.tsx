'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      if (JSON.parse(userData).role === 'TEACHER') {
        router.push('/teacher/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">방T의 역사</h1>
        <p className="text-xl mb-8">한국 역사 교육 플랫폼에 오신 것을 환영합니다!</p>
        <div className="space-y-4">
          <p className="text-lg">선생님과 학생을 위한 완벽한 한국사 학습 솔루션</p>
          <div className="mt-12 space-x-4">
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
            >
              로그인
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="bg-blue-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
