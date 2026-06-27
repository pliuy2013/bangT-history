import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

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
        problems: true,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Assignment creation failed' },
      { status: 500 }
    );
  }
}
