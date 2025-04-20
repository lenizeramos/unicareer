import { NextResponse } from "next/server";
import { updateClosingDateJobById } from "@/Lib/job";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { closingDate } = await request.json();

    if (!id || !closingDate) {
      return NextResponse.json(
        { error: "Job ID and closing date are required" },
        { status: 400 }
      );
    }

    const updatedJob = await updateClosingDateJobById(id, closingDate);

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating closing date:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
