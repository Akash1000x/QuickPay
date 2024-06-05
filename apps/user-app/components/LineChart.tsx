"use client";

import React from "react";
// import { curveLinear } from "@visx/curve";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";

import { P2pTransferTypes } from "../app/(dashboard)/p2p/page";
import { AxisLeft, AxisBottom } from "@visx/axis";

export type CurveProps = {
  width: number;
  height: number;
  sentTransfers: P2pTransferTypes[] | undefined;
  receivedTransfers: P2pTransferTypes[] | undefined;
};

const LineChart = ({
  width = 800,
  height = 400,
  sentTransfers,
  receivedTransfers,
}: CurveProps) => {
  if (!sentTransfers && !receivedTransfers) {
    return <div>Loading...</div>;
  }

  const sentTransfersData = sentTransfers?.map((d) => {
    return {
      time: d.timestamp,
      amount: d.amount,
    };
  });

  const receivedTransfersData = receivedTransfers?.map((d) => {
    return {
      time: d.timestamp,
      amount: d.amount,
    };
  });

  const amountScale = scaleLinear<number>({
    domain: [
      Math.min(...(sentTransfers ?? []).map((d) => d.amount)),
      Math.max(...(sentTransfers ?? []).map((d) => d.amount)),
    ],
    range: [400, 0],
  });

  const timeScale = scaleTime<number>({
    domain: [
      Math.min(...(sentTransfers ?? []).map((d) => d.timestamp)),
      Math.max(...(sentTransfers ?? []).map((d) => d.timestamp)),
    ],
    range: [0, 600],
  });

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#f3f3f3"
          rx={10}
        />
        <Group left={50} top={50}>
          <AxisBottom scale={timeScale} top={400} numTicks={10} />
          <AxisLeft scale={amountScale} left={0} />
          <LinePath
            data={sentTransfersData}
            x={(d) => timeScale(d.time) ?? 0}
            y={(d) => amountScale(d.amount) ?? 0}
            stroke="red"
            strokeWidth={2}
          />
          <LinePath
            data={receivedTransfersData}
            x={(d) => timeScale(d.time) ?? 0}
            y={(d) => amountScale(d.amount) ?? 0}
            stroke="blue"
            strokeWidth={2}
          />
        </Group>
      </svg>
    </div>
  );
};

export default LineChart;
