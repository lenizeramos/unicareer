import { NextRequest, NextResponse } from "next/server";
import { getApplicationById } from "@/Lib/application";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const id = (await context.params).id;

  if (!id) {
    return new NextResponse("Job ID is required", { status: 400 });
  }

  try {
    const application = await getApplicationById(id);
    return NextResponse.json(application);
  } catch (error) {
    console.error("Error fetching the application", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
