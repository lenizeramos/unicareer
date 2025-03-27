import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobs = await prisma.job.findMany();
    // console.log(jobs)
    return NextResponse.json(jobs);
  } catch (error) {
    console.log("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
