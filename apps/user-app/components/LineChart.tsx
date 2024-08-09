"use client";
import * as React from "react";
import { Card } from "@repo/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { P2pTransferTypes } from "../app/(dashboard)/p2p/page";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ff0000",
  },
} satisfies ChartConfig;
const chartConfig2 = {
  desktop: {
    label: "Desktop",
    color: "#1500ff",
  },
} satisfies ChartConfig;

const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Component({
  sentTransfers,
  receivedTransfers,
}: {
  sentTransfers: P2pTransferTypes[] | undefined;
  receivedTransfers: P2pTransferTypes[] | undefined;
}) {
  const [sentChartData, setSentAmoutChartData] = React.useState<any>([]);
  const [receivedAmountChartData, setReceivedAmoutChartData] =
    React.useState<any>([]);

  React.useEffect(() => {
    if (sentTransfers && sentTransfers.length) {
      setSentAmoutChartData(
        sentTransfers.map((data) => {
          return {
            time: new Date(data.timestamp).toLocaleDateString(),
            Amount: data.amount,
          };
        }),
      );
    }
  }, []);
  React.useEffect(() => {
    if (receivedTransfers && receivedTransfers.length) {
      setReceivedAmoutChartData(
        receivedTransfers.map((data) => {
          return {
            time: new Date(data.timestamp).toLocaleDateString(),
            Amount: data.amount,
          };
        }),
      );
    }
  }, []);
  return (
    <div className="space-y-6">
      <Card title={"Received"} clasName="border-t-0">
        <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
          <AreaChart
            accessibilityLayer
            data={receivedAmountChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                String(monthNames[parseInt(value.slice(3, 5))]).slice(0, 3)
              }
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent label={"Amount: "} indicator="line" />
              }
              label={"Amount: "}
            />
            <Area
              dataKey="Amount"
              type="monotone"
              fill={chartConfig2.desktop.color}
              fillOpacity={0.4}
              stroke={chartConfig2.desktop.color}
            />
          </AreaChart>
        </ChartContainer>
      </Card>
      <Card title="Sent">
        <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
          <AreaChart
            accessibilityLayer
            data={sentChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                String(monthNames[parseInt(value.slice(3, 5))]).slice(0, 3)
              }
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="Amount"
              type="monotone"
              fill={chartConfig.desktop.color}
              fillOpacity={0.4}
              stroke={chartConfig.desktop.color}
            />
          </AreaChart>
        </ChartContainer>
      </Card>
    </div>
  );
}
