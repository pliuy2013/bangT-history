import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: params.id },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
        submissions: true,
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: '과제를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(assignment);
  } catch (error) {
    return NextResponse.json(
      { error: '과제 조회 실패' },
      { status: 500 }
    );
  }
}
