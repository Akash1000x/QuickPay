import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  try {
    if (session.user) {
      return NextResponse.json({
        user: session.user,
      });
    }
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      {
        status: 403,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      {
        status: 403,
      },
    );
  }
};
