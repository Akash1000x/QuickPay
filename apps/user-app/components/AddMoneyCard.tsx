"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import {
  getBalance,
  getOnRampTransactions,
} from "../app/lib/actions/getOnRampTransactions";
import { useSetRecoilState } from "recoil";
import {
  balanceAtom,
  onRampTransactionsAtom,
} from "../../../packages/store/src/atoms";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );
  const [amount, setAmount] = useState<string>("");
  const [provider, serProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const setTransactions = useSetRecoilState(onRampTransactionsAtom);
  const setBalance = useSetRecoilState(balanceAtom);

  const fetchBalance = async () => {
    const { amount, locked } = await getBalance();
    setBalance({ amount, locked });
  };

  const fetchTransactions = async () => {
    const transactions = await getOnRampTransactions();
    setTransactions(transactions);
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          value={amount}
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setAmount(val);
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "",
            );
            serProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || "",
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (Number(amount) && Number(amount) > 0) {
                await createOnRampTransaction(
                  provider,
                  Number(amount),
                  redirectUrl || "",
                );
                setAmount("");
                fetchBalance();
                fetchTransactions();
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
