"use client";

import { Card } from "@repo/ui/card";
import { useRecoilState } from "recoil";
import { balanceAtom } from "../../../packages/store/src/atoms";
import { getBalance } from "../app/lib/actions/getOnRampTransactions";
import React from "react";

export const BalanceCard = async () => {
  const [balance, setBalance] = useRecoilState(balanceAtom);

  React.useEffect(() => {
    const fetchBalance = async () => {
      const { amount, locked } = await getBalance();
      setBalance({ amount, locked });
    };
    fetchBalance();
  }, []);

  return (
    <Card title={"Balance"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked balance</div>
        <div>{balance.amount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Locked Balance</div>
        <div>{balance.locked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div>{(balance.amount + balance.locked) / 100} INR</div>
      </div>
    </Card>
  );
};
