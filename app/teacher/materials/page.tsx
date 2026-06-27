'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';

interface Material {
  id: string;
  title: string;
  description: string;
  topic: string;
  fileUrl?: string;
}

export default function MaterialsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    content: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'TEACHER') {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/materials');
      const data = await response.json();
      setMaterials(data.filter((m: any) => m.teacherId === JSON.parse(localStorage.getItem('user') || '{}').id));
    } catch (error) {
      console.error('자료 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, teacherId: user.id }),
      });

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          topic: '',
          content: '',
        });
        setShowForm(false);
        fetchMaterials();
      }
    } catch (error) {
      console.error('자료 생성 실패:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('이 자료를 삭제하시겠습니까?')) {
      try {
        await fetch(`/api/materials/${id}`, { method: 'DELETE' });
        fetchMaterials();
      } catch (error) {
        console.error('자료 삭제 실패:', error);
      }
    }
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">자료 관리</h1>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '취소' : '새 자료 업로드'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold mb-6">새 자료 업로드</h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="자료 제목"
                placeholder="자료 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">설명</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="자료 설명을 입력하세요"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Input
                label="주제"
                placeholder="주제를 입력하세요 (예: 삼국시대)"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">내용</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="자료 내용을 입력하세요"
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                자료 업로드
              </Button>
            </form>
          </Card>
        )}

        <Card>
          {loading ? (
            <p>로드 중...</p>
          ) : materials.length === 0 ? (
            <p className="text-gray-600">업로드된 자료가 없습니다</p>
          ) : (
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{material.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs mt-2">
                        {material.topic}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="danger" onClick={() => handleDelete(material.id)}>
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
