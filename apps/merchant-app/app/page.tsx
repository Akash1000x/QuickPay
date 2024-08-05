"use client";

import { useBalance } from "@repo/store/balance";
import { Button } from "@repo/ui/button";
import { signIn } from "next-auth/react";

export default function () {
  const balance = useBalance();
  return (
    <div>
      <div>hi there {balance}</div>
      <Button onClick={() => signIn()}>Sign IN</Button>
    </div>
  );
}
