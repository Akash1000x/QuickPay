import LineChart from "../../../components/LineChart";
import { getP2pTransfer } from "../../lib/actions/getP2pTransfer";

export default async function DashBoard() {
  const { sentTransfers, receivedTransfers } = await getP2pTransfer();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LineChart
        width={800}
        height={500}
        sentTransfers={sentTransfers}
        receivedTransfers={receivedTransfers}
      />
    </div>
  );
}
