import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import { getDashboardStats } from "@/features/admin-dashboard/queries/getDashboardStats";

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions);

    if (
      !session?.user ||
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    await connectDB();

    const stats =
      await getDashboardStats();

    return NextResponse.json(
      {
        success: true,
        data: stats,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "ADMIN_DASHBOARD_STATS_ERROR",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load dashboard statistics.",
      },
      {
        status: 500,
      },
    );
  }
}