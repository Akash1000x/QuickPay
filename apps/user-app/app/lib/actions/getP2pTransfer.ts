import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getP2pTransfer() {
  const session = await getServerSession(authOptions);
  const tranfer = await prisma.user.findUnique({
    where: {
      id: Number(session?.user?.id),
    },
    include: {
      sentTransfers: { orderBy: { timestamp: "desc" } },
      receivedTransfers: { orderBy: { timestamp: "desc" } },
    },
  });
  return {
    sentTransfers: tranfer?.sentTransfers.map((t) => ({
      id: t.id,
      amount: t.amount / 100,
      timestamp: t.timestamp.getTime(),
      fromUserId: t.fromUserId,
      toUserId: t.toUserId,
    })),
    receivedTransfers: tranfer?.receivedTransfers.map((t) => ({
      amount: t.amount / 100,
      timestamp: t.timestamp.getTime(),
      fromUserId: t.fromUserId,
      toUserId: t.toUserId,
    })),
  };
}
