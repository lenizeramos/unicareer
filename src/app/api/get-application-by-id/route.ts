import { NextResponse, NextRequest } from "next/server";
import { getApplicationById } from "@/Lib/application";

export async function GET(request: NextRequest) {
  console.log(request, "***************req");
  try {

    const applicationId = request.nextUrl.searchParams.get("id");
    if (!applicationId) {
      return new NextResponse("Application ID is required", { status: 400 });
    }
    const application = await getApplicationById(applicationId);

    console.log("Application - get app by id", application);
    return NextResponse.json(application);
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
