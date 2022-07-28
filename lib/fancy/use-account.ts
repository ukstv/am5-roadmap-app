import { useAccount as useAccountW } from "wagmi";
import { useEffect, useState } from "react";

export type AccountResult = {
  address: string | undefined;
};

export function useAccount() {
  const account = useAccountW();
  const [acc, setAcc] = useState<AccountResult | undefined>(undefined);

  useEffect(() => setAcc(account), []);
  return acc;
}
