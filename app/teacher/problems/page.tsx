'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Select from '@/components/Select';

interface Problem {
  id: string;
  title: string;
  content: string;
  type: string;
  topic: string;
  difficulty: string;
}

export default function ProblemsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'MULTIPLE_CHOICE',
    topic: '',
    answer: '',
    difficulty: '중',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'TEACHER') {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems');
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error('문제 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, teacherId: user.id }),
      });

      if (response.ok) {
        setFormData({
          title: '',
          content: '',
          type: 'MULTIPLE_CHOICE',
          topic: '',
          answer: '',
          difficulty: '중',
        });
        setShowForm(false);
        fetchProblems();
      }
    } catch (error) {
      console.error('문제 생성 실패:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('이 문제를 삭제하시겠습니까?')) {
      try {
        await fetch(`/api/problems/${id}`, { method: 'DELETE' });
        fetchProblems();
      } catch (error) {
        console.error('문제 삭제 실패:', error);
      }
    }
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">문제 관리</h1>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '취소' : '새 문제 생성'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-6">새 문제 생성</h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="문제 제목"
                placeholder="문제 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">문제 내용</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="문제 내용을 입력하세요"
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
              </div>
              <Select
                label="문제 유형"
                options={[
                  { value: 'MULTIPLE_CHOICE', label: '객관식' },
                  { value: 'SHORT_ANSWER', label: '단답형' },
                  { value: 'ESSAY', label: '서술형' },
                ]}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
              <Input
                label="주제"
                placeholder="주제를 입력하세요 (예: 삼국시대)"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
              />
              <Input
                label="정답"
                placeholder="정답을 입력하세요"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                required
              />
              <Select
                label="난이도"
                options={[
                  { value: '상', label: '상' },
                  { value: '중', label: '중' },
                  { value: '하', label: '하' },
                ]}
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              />
              <Button type="submit" variant="primary" className="w-full">
                문제 생성
              </Button>
            </form>
          </Card>
        )}

        <Card>
          {loading ? (
            <p>로드 중...</p>
          ) : problems.length === 0 ? (
            <p className="text-gray-600">생성된 문제가 없습니다</p>
          ) : (
            <div className="space-y-4">
              {problems.map((problem) => (
                <div key={problem.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{problem.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{problem.content.substring(0, 100)}...</p>
                      <div className="mt-2 flex gap-2">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs">
                          {problem.type}
                        </span>
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-xs">
                          {problem.topic}
                        </span>
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs">
                          {problem.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => router.push(`/teacher/problems/${problem.id}`)}>
                        수정
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(problem.id)}>
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
