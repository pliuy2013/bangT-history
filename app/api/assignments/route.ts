import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
        teacher: true,
      },
    });

    return NextResponse.json(assignments);
  } catch (error) {
    return NextResponse.json(
      { error: '과제 조회 실패' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, dueDate, teacherId, problemIds } = await req.json();

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        teacherId,
        problems: {
          create: problemIds.map((problemId: string, index: number) => ({
            problemId,
            order: index + 1,
          })),
        },
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '과제 생성 실패' },
      { status: 500 }
    );
  }
}
