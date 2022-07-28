import { firstValueFrom, Subject } from "rxjs";
import { useSignMessage } from "wagmi";
import { useEffect } from "react";

const stream = new Subject<string>();
export type UseSignerResult = (message: string) => Promise<string>;

export function useSigner(): UseSignerResult {
  const s = useSignMessage();

  useEffect(() => {
    if (s.data || s.error) {
      if (s.data) {
        stream.next(s.data);
      }
      if (s.error) {
        stream.error(s.error);
      }
    }
  }, [s.data, s.error]);

  return (message: string): Promise<string> => {
    s.signMessage({ message: message });
    return firstValueFrom(stream);
  };
}
