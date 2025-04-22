import { NextRequest, NextResponse } from "next/server";
import { updateApplicationStatus } from "@/Lib/application";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: applicationId } = await params;
    if (!applicationId) {
      return new NextResponse("Application ID is required", { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    const updatedApplication = await updateApplicationStatus(applicationId, status);

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating status", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
