import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isCandidateRoute = createRouteMatcher(["/dashboard/candidate(.*)"]);
const isCompanyRoute = createRouteMatcher(["/dashboard/company(.*)"]);
const isAdminUserRoute = createRouteMatcher(["/dashboard/adminuser(.*)"]);

export default clerkMiddleware(async (auth, req) => {

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const { sessionClaims } = await auth();
    const userRole = sessionClaims?.metadata?.role;

    if (!userRole) {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }

    if (isCandidateRoute(req) && userRole !== "candidate") {
      const newRole = userRole === "admin" ? "adminuser" : userRole;
      const url = new URL("/dashboard/" + newRole, req.url);
      return NextResponse.redirect(url);
    }

    if (isCompanyRoute(req) && userRole !== "company") {
      const newRole = userRole === "admin" ? "adminuser" : userRole;
      const url = new URL("/dashboard/" + newRole, req.url);
      return NextResponse.redirect(url);
    }

    if (isAdminUserRoute(req) && userRole !== "admin") {
      const url = new URL("/dashboard/" + userRole, req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
