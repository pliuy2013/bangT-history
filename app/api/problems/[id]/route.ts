import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: params.id },
    });

    if (!problem) {
      return NextResponse.json(
        { error: '문제를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(problem);
  } catch (error) {
    return NextResponse.json(
      { error: '문제 조회 실패' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const problem = await prisma.problem.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(problem);
  } catch (error) {
    return NextResponse.json(
      { error: '문제 수정 실패' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.problem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '문제 삭제 실패' },
      { status: 500 }
    );
  }
}
