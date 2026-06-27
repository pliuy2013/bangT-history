'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Select from '@/components/Select';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password, role }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || '회원가입 실패');
        return;
      }

      router.push('/login');
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>
        
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
            label="이름"
            type="text"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select
            label="역할"
            options={[
              { value: 'STUDENT', label: '학생' },
              { value: 'TEACHER', label: '선생님' },
            ]}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </form>

        <p className="text-center mt-4">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            로그인
          </Link>
        </p>
      </Card>
    </div>
  );
}
