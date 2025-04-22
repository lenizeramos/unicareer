import { NextRequest, NextResponse } from "next/server";
import { getApplicationById } from "@/Lib/application";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Job ID is required", { status: 400 });
    }

    const application = await getApplicationById(id);
    return NextResponse.json(application);
  } catch (error) {
    console.error("Error fetching the application", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
