import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword, comparePassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: '비밀번호가 잘못되었습니다' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    return NextResponse.json(
      { error: '로그인 실패' },
      { status: 500 }
    );
  }
}
