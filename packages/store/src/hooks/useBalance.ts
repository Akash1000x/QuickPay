import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms";

export const useBalance = () => {
  const values = useRecoilValue(balanceAtom);
  return values.amount;
};
