"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";
import { getBalance } from "./getOnRampTransactions";

export async function createOnRampTransaction(
  provider: string,
  amount: number,
  redirectUrl: string,
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = Math.random() * 1000;
  await prisma.onRampTransaction.create({
    data: {
      provider,
      startTime: new Date(),
      status: "Processing",
      amount: amount * 100,
      token: token.toString(),
      userId: Number(session?.user?.id),
    },
  });

  const res = await fetch("http://localhost:8000/bank-webhook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token.toString(),
      user_identifier: session.user.id,
      amount: amount * 100,
    }),
  });

  if (!res.ok) {
    return {
      message: "Error while creating transaction",
    };
  }
  getBalance();
  // redirect(redirectUrl);
  return {
    message: "Done",
  };
}
