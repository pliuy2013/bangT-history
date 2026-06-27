import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, name, password, role } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다' },
        { status: 400 }
      );
    }

    const user = await createUser(email, name, password, role || 'STUDENT');

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: '회원가입 실패' },
      { status: 500 }
    );
  }
}
