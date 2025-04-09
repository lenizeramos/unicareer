import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from "@/Lib/prisma"

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        company: {
          include: {
            companyMembership: true,
            payments: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        }
      }
    });

    console.log(user);

    if (!user || !user.company) {
      return NextResponse.json({ isActive: false });
    }

    const membership = user.company.companyMembership[0];
    const latestPayment = user.company.payments[0];

    if (!membership) {
      return NextResponse.json({ isActive: false });
    }

    const isActive = membership.status === 'ACTIVE';
    
    if (latestPayment) {
      console.log('Latest payment status:', latestPayment.status);
    }

    return NextResponse.json({ isActive });
    
  } catch (error) {
    console.error('Error checking membership status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 