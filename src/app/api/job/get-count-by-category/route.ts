import { NextResponse } from "next/server";
import { getCountByJobCategory } from "@/Lib/job";

export async function GET() {
  try {
    const jobs = await getCountByJobCategory();

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
