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
  submissions: any[];
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'STUDENT') {
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
      setAssignments(data);
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
        <h1 className="text-4xl font-bold mb-8">학생 대시보드</h1>
        <p className="text-xl mb-8">환영합니다, {user.name}님!</p>

        <Card title="할당받은 과제">
          {loading ? (
            <p>로드 중...</p>
          ) : assignments.length === 0 ? (
            <p className="text-gray-600">할당받은 과제가 없습니다</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => {
                const submitted = assignment.submissions?.some((s: any) => s.studentId === user.id);
                return (
                  <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <h3 className="font-bold text-lg">{assignment.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      기한: {new Date(assignment.dueDate).toLocaleDateString('ko-KR')}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      {submitted ? (
                        <span className="text-green-600 font-bold">✓ 제출됨</span>
                      ) : (
                        <span className="text-red-600 font-bold">미제출</span>
                      )}
                    </div>
                    <Link href={`/student/assignments/${assignment.id}`}>
                      <Button variant="primary" className="mt-4">풀기</Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
