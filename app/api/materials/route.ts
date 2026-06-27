import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const materials = await prisma.material.findMany();
    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json(
      { error: 'Material load failed' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, topic, content, teacherId } = await req.json();

    const material = await prisma.material.create({
      data: {
        title,
        description,
        topic,
        content,
        teacherId,
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Material creation failed' },
      { status: 500 }
    );
  }
}
