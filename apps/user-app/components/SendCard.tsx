"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Card title="Send">
        <div className="min-w-72 pt-2">
          <TextInput
            value={number}
            placeholder={"Number"}
            label="Number"
            onChange={(value) => {
              setNumber(value);
            }}
          />
          <TextInput
            value={amount}
            placeholder={"Amount"}
            label="Amount"
            onChange={(value) => {
              setAmount(value);
            }}
          />
          <div className="pt-4 flex justify-center">
            <Button
              onClick={async () => {
                await p2pTransfer(number, Number(amount) * 100);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
