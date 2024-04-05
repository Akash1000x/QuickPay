import { Card } from "@repo/ui/card";
import { P2pTransferTypes } from "../app/(dashboard)/p2p/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const P2pTransfer = async ({
  sentTransfers,
  receivedTransfers,
}: {
  sentTransfers?: P2pTransferTypes[];
  receivedTransfers?: P2pTransferTypes[];
}) => {
  const session = await getServerSession(authOptions);

  let transactions: P2pTransferTypes[] = [];
  if (sentTransfers?.length && receivedTransfers?.length) {
    transactions = sentTransfers.concat(receivedTransfers);
    transactions = transactions.sort((a, b) => b.timestamp - a.timestamp);
  } else if (sentTransfers?.length) {
    transactions = sentTransfers;
  } else if (receivedTransfers?.length) {
    transactions = receivedTransfers;
  }

  if (!sentTransfers?.length && !receivedTransfers?.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions?.map((t) => (
          <div>
            {t.toUserId === Number(session?.user?.id) ? (
              <div className="flex justify-between text-green-500">
                <div>
                  <div className="text-sm">Received INR</div>
                  <div className="text-slate-600 text-xs">
                    {new Date(t.timestamp).toDateString()}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  + Rs {t.amount / 100}
                </div>
              </div>
            ) : (
              <div className="flex justify-between text-red-500">
                <div>
                  <div className="text-sm">Send INR</div>
                  <div className="text-slate-600 text-xs">
                    {new Date(t.timestamp).toDateString()}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  - Rs {t.amount / 100}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
