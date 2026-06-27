'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || '로그인 실패');
        return;
      }

      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'TEACHER') {
        router.push('/teacher/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">로그인</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="이메일"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <p className="text-center mt-4">
          계정이 없으신가요?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            회원가입
          </Link>
        </p>
      </Card>
    </div>
  );
}
