'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Submission {
  id: string;
  studentId: string;
  answer: string;
  score?: number;
  isGraded: boolean;
  feedback?: string;
}

export default function AssignmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [assignment, setAssignment] = useState<any>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [gradingData, setGradingData] = useState({ score: 0, feedback: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
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
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('과제 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeSubmit = async () => {
    try {
      const response = await fetch(`/api/submissions/${gradingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: gradingData.score,
          feedback: gradingData.feedback,
          isGraded: true,
        }),
      });

      if (response.ok) {
        setGradingId(null);
        fetchAssignment();
      }
    } catch (error) {
      console.error('채점 실패:', error);
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
          <p className="text-gray-600 mb-4">{assignment.description}</p>
          <p className="text-sm text-gray-500">
            기한: {new Date(assignment.dueDate).toLocaleDateString('ko-KR')}
          </p>
        </Card>

        <Card title="학생 제출 현황">
          {submissions.length === 0 ? (
            <p className="text-gray-600">제출한 학생이 없습니다</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold">학생 ID: {submission.studentId}</p>
                      <p className="text-sm text-gray-600 mt-2">{submission.answer}</p>
                      {submission.isGraded && (
                        <div className="mt-3">
                          <p className="font-bold text-green-600">점수: {submission.score}점</p>
                          {submission.feedback && (
                            <p className="text-sm text-gray-600 mt-1">피드백: {submission.feedback}</p>
                          )}
                        </div>
                      )}
                    </div>
                    {!submission.isGraded && user.role === 'TEACHER' && (
                      <Button
                        variant="primary"
                        onClick={() => setGradingId(submission.id)}
                      >
                        채점
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {gradingId && (
          <Card className="fixed bottom-8 right-8 w-96">
            <h3 className="font-bold mb-4">채점</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">점수</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={gradingData.score}
                onChange={(e) => setGradingData({ ...gradingData, score: parseInt(e.target.value) })}
                max={100}
                min={0}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">피드백</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="피드백을 입력하세요"
                value={gradingData.feedback}
                onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleGradeSubmit} className="flex-1">
                제출
              </Button>
              <Button variant="secondary" onClick={() => setGradingId(null)} className="flex-1">
                취소
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
