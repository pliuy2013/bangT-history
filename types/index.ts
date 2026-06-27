export interface User {
  id: string;
  email: string;
  name: string;
  role: 'TEACHER' | 'STUDENT';
  createdAt: Date;
}

export interface Problem {
  id: string;
  title: string;
  content: string;
  type: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'ESSAY';
  topic: string;
  options?: any[];
  answer: string;
  explanation?: string;
  difficulty: string;
  isAuto: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  teacherId: string;
  createdAt: Date;
}

export interface Submission {
  id: string;
  studentId: string;
  assignmentId: string;
  problemId: string;
  answer: string;
  score?: number;
  feedback?: string;
  isGraded: boolean;
  submittedAt: Date;
}

export interface Material {
  id: string;
  title: string;
  description?: string;
  content?: string;
  fileUrl?: string;
  fileType?: string;
  topic: string;
  teacherId: string;
  createdAt: Date;
}
