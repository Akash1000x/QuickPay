import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { P2pTransfer } from "../../../components/P2pTransfer";

async function getP2pTransfer() {
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
      amount: t.amount,
      timestamp: t.timestamp.getTime(),
      fromUserId: t.fromUserId,
      toUserId: t.toUserId,
    })),
    receivedTransfers: tranfer?.receivedTransfers.map((t) => ({
      amount: t.amount,
      timestamp: t.timestamp.getTime(),
      fromUserId: t.fromUserId,
      toUserId: t.toUserId,
    })),
  };
}

export interface P2pTransferTypes {
  amount: number;
  timestamp: number;
  fromUserId: number;
  toUserId: number;
}

export default async function () {
  const {
    sentTransfers,
    receivedTransfers,
  }: {
    sentTransfers?: P2pTransferTypes[];
    receivedTransfers?: P2pTransferTypes[];
  } = await getP2pTransfer();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <P2pTransfer
            sentTransfers={sentTransfers}
            receivedTransfers={receivedTransfers}
          />
        </div>
      </div>
    </div>
  );
}

// sentTransfers: tranfer?.sentTransfers.map((t) => ({
//   id: t.id,
//   amount: t.amount,
//   timestamp: t.timestamp,
//   fromUserId: t.fromUserId,
//   toUserId: t.toUserId,
// })),
// receivedTransfers: tranfer?.receivedTransfers.map((t) => ({
//   amount: t.amount,
//   timestamp: t.timestamp,
//   fromUserId: t.fromUserId,
//   toUserId: t.toUserId,
// })),
