import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const submissions = await prisma.submission.findMany({
      include: {
        student: true,
        problem: true,
        assignment: true,
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json(
      { error: '제출 내역 조회 실패' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { studentId, assignmentId, problemId, answer } = await req.json();

    const submission = await prisma.submission.create({
      data: {
        studentId,
        assignmentId,
        problemId,
        answer,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '제출 실패' },
      { status: 500 }
    );
  }
}
