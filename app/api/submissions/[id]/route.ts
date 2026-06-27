import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { score, feedback, isGraded } = await req.json();

    const submission = await prisma.submission.update({
      where: { id: params.id },
      data: {
        score,
        feedback,
        isGraded,
        gradedAt: isGraded ? new Date() : null,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    return NextResponse.json(
      { error: '채점 실패' },
      { status: 500 }
    );
  }
}
