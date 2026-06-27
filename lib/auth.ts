import bcrypt from 'bcryptjs';
import prisma from './db';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(email: string, name: string, password: string, role: 'TEACHER' | 'STUDENT') {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });
}
