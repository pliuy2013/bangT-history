'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Problem {
  id: string;
  title: string;
  content: string;
  type: string;
  answer: string;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  problems: { problem: Problem }[];
}

export default function StudentAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'STUDENT') {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchAssignment();
  }, []);

  const fetchAssignment = async () => {
    try {
      const response = await fetch(`/api/assignments/${params.id}`);
      const data = await response.json();
      setAssignment(data);
    } catch (error) {
      console.error('과제 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const [problemId, answer] of Object.entries(answers)) {
        await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: user.id,
            assignmentId: params.id,
            problemId,
            answer,
          }),
        });
      }
      setSubmitted(true);
    } catch (error) {
      console.error('제출 실패:', error);
    }
  };

  if (!user || loading) return <div>로딩 중...</div>;
  if (!assignment) return <div>과제를 찾을 수 없습니다</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <Button variant="secondary" onClick={() => router.back()} className="mb-8">
          ← 돌아가기
        </Button>

        <Card className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{assignment.title}</h1>
          <p className="text-gray-600">{assignment.description}</p>
        </Card>

        {submitted ? (
          <Card className="bg-green-50 border-2 border-green-500">
            <h2 className="text-2xl font-bold text-green-600 mb-2">✓ 제출 완료!</h2>
            <p className="text-gray-600">과제가 성공적으로 제출되었습니다. 선생님의 채점을 기다려주세요.</p>
            <Button variant="primary" onClick={() => router.push('/student/dashboard')} className="mt-4">
              대시보드로 돌아가기
            </Button>
          </Card>
        ) : (
          <>
            <div className="space-y-6">
              {assignment.problems.map((ap, index) => {
                const problem = ap.problem;
                return (
                  <Card key={problem.id}>
                    <h2 className="text-2xl font-bold mb-2">
                      문제 {index + 1}: {problem.title}
                    </h2>
                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">{problem.content}</p>
                    <div>
                      <label className="block text-sm font-medium mb-2">답변</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="답변을 입력하세요"
                        rows={4}
                        value={answers[problem.id] || ''}
                        onChange={(e) =>
                          setAnswers({ ...answers, [problem.id]: e.target.value })
                        }
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="w-full mt-8 py-3 text-lg"
            >
              과제 제출
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
