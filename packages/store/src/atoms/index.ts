import { atom } from "recoil";

interface Balance {
  amount: number;
  locked: number;
}

export const balanceAtom = atom<Balance>({
  key: "balance",
  default: {
    amount: 0,
    locked: 0,
  },
});

interface OnRampTransaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

export const onRampTransactionsAtom = atom<OnRampTransaction[]>({
  key: "onRampTransactions",
  default: [],
});
