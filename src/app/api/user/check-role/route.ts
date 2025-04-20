import { NextResponse } from "next/server";
import { checkUserRole } from '@/Lib/server/usersService';
import { getClerkUserId } from "@/utils/user";

export async function POST(request: Request) {
  try {
    const { role } = await request.json();
    const userId = await getClerkUserId();
    
    if (!userId) {
      return NextResponse.json({ hasRole: false }, { status: 401 });
    }

    const hasRole = await checkUserRole(userId, role);
    return NextResponse.json({ hasRole });
  } catch (error) {
    console.error('Error checking role:', error);
    return NextResponse.json({ hasRole: false }, { status: 500 });
  }
} 