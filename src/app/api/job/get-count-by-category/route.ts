import { NextResponse } from "next/server";
import { getCountByCategory } from "@/Lib/job";

export async function GET() {
  try {
    const jobs = await getCountByCategory();

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
