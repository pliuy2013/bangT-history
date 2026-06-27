'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  description?: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'TEACHER') {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/assignments');
      const data = await response.json();
      setAssignments(data.filter((a: any) => a.teacherId === JSON.parse(localStorage.getItem('user') || '{}').id));
    } catch (error) {
      console.error('과제 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">선생님 대시보드</h1>
        <p className="text-xl mb-8">환영합니다, {user.name}님!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <h2 className="text-xl font-bold mb-2">문제 관리</h2>
            <p className="text-gray-600 mb-4">한국 역사 문제를 생성하고 관리하세요</p>
            <Link href="/teacher/problems">
              <Button variant="primary" className="w-full">문제 관리하기</Button>
            </Link>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-2">자료 관리</h2>
            <p className="text-gray-600 mb-4">학습 자료를 업로드하고 공유하세요</p>
            <Link href="/teacher/materials">
              <Button variant="primary" className="w-full">자료 관리하기</Button>
            </Link>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-2">과제 할당</h2>
            <p className="text-gray-600 mb-4">학생들에게 과제를 할당하세요</p>
            <Link href="/teacher/assignments/create">
              <Button variant="primary" className="w-full">과제 할당하기</Button>
            </Link>
          </Card>
        </div>

        <Card title="내 과제">
          {loading ? (
            <p>로드 중...</p>
          ) : assignments.length === 0 ? (
            <p className="text-gray-600">할당한 과제가 없습니다</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <h3 className="font-bold">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    기한: {new Date(assignment.dueDate).toLocaleDateString('ko-KR')}
                  </p>
                  <Link href={`/teacher/assignments/${assignment.id}`}>
                    <Button variant="secondary" className="mt-2">상세보기</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
