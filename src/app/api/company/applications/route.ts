import { NextResponse, NextRequest } from "next/server";
import { getClerkUserId } from "@/utils/user";
import { getUserByClerkId } from "@/Lib/server/usersService";
import prisma from '@/Lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const clerkUserId = await getClerkUserId();

    if (!clerkUserId)
      return NextResponse.redirect(new URL("/sign-in", req.url));

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const companyId = user.company?.id;

    if (companyId) {
      const startDateParam = req.nextUrl.searchParams.get("startDate");
      const endDateParam = req.nextUrl.searchParams.get("endDate");
      const searchTermParam = req.nextUrl.searchParams.get("search");

      type ApplicationWhereClause = {
        appliedAt?: {
          gte: Date;
          lte: Date;
        };
        OR?: Array<{
          candidate: {
            firstName: { contains: string; mode: 'insensitive' };
          };
        } | {
          candidate: {
            lastName: { contains: string; mode: 'insensitive' };
          };
        }>;
      };

      const whereClause: ApplicationWhereClause = {};
      
      if (startDateParam && endDateParam) {
        whereClause.appliedAt = {
          gte: new Date(startDateParam),
          lte: new Date(endDateParam),
        };
      }

      if (searchTermParam) {
        whereClause.OR = [
          {
            candidate: {
              firstName: { contains: searchTermParam, mode: 'insensitive' },
            },
          },
          {
            candidate: {
              lastName: { contains: searchTermParam, mode: 'insensitive' },
            },
          },
        ];
      }

      const applications = await prisma.application.findMany({
        where: {
          ...whereClause,
          job: {
            companyId: companyId
          }
        },
        include: {
          candidate: {
            select: {
              firstName: true,
              lastName: true,
              skills: true,
            },
          },
          job: {
            select: {
              title: true,
              id: true,
              compatibilityScores: true,
            },
          },
        },
        orderBy: {
          appliedAt: 'desc',
        },
      });

      const transformedApplications = applications.map(app => ({
        id: app.id,
        jobId: app.job.id,
        candidateId: app.candidateId,
        status: app.status,
        appliedAt: app.appliedAt,
        candidate: {
          firstName: app.candidate.firstName,
          lastName: app.candidate.lastName,
        },
        job: {
          title: app.job.title,
        },
        compatibility: app.job.compatibilityScores.find(
          score => score.candidateId === app.candidateId
        ),
        startDate: startDateParam ? new Date(startDateParam) : undefined,
        endDate: endDateParam ? new Date(endDateParam) : undefined,
        searchTerm: searchTermParam || undefined,
      }));

      return NextResponse.json(transformedApplications);
    } else {
      return new NextResponse("Company ID not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error", error);
    return new NextResponse("Error", { status: 500 });
  }
}
