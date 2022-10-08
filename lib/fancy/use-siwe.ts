import { useAccount } from "wagmi";
import { useSigner } from "./use-signer";
import * as cacao from "ceramic-cacao";
import { CacaoBlock, SiweMessage } from "ceramic-cacao";

export type SiweFn = (input: Partial<SiweMessage>) => Promise<CacaoBlock>;

export function useSiwe(): SiweFn {
  console.log("inside useSiwe")
  const account = useAccount();
  const s = useSigner();

  return async (input: Partial<SiweMessage>) => {
    const address = account.address;
    if (!address) throw new Error(`Not logged in`);
    const siwe = new cacao.SiweMessage({
      domain: "iam.example",
      address: address,
      uri: "did:pkh:foo",
      chainId: "1",
      version: "1",
      issuedAt: new Date().toISOString().replace(/\..+/, "Z"),
      resources: ["http://roadmap.ceramic.network/roadmap"],
      ...input,
    });
    const signature = await s(siwe.signMessage());
    const signed = new cacao.SiweMessage(
      Object.assign({}, siwe, { signature })
    );
    const cacaoInstance = cacao.Cacao.fromSiweMessage(signed);
    return cacao.CacaoBlock.fromCacao(cacaoInstance);
  };
}
