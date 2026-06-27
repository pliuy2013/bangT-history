import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const problems = await prisma.problem.findMany({
      include: {
        assignments: true,
      },
    });

    return NextResponse.json(problems);
  } catch (error) {
    return NextResponse.json(
      { error: '문제 조회 실패' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, type, topic, options, answer, explanation, difficulty, teacherId } = await req.json();

    const problem = await prisma.problem.create({
      data: {
        title,
        content,
        type,
        topic,
        options: options ? JSON.stringify(options) : null,
        answer,
        explanation,
        difficulty,
        teacherId,
        isAuto: false,
      },
    });

    return NextResponse.json(problem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '문제 생성 실패' },
      { status: 500 }
    );
  }
}
