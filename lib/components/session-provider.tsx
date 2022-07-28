import * as React from "react";
import { DID } from "dids";
import { DIDSession } from "did-session";
import {useContext, useState} from "react";
import {useAccount, useProvider} from "wagmi";
import {EthereumAuthProvider} from "@ceramicnetwork/blockchain-utils-linking";
import {compose} from "../graphql";

export type ISession = {
  session: DIDSession;
};

const SessionContext = React.createContext<ISession | undefined>(undefined);

export function SessionProvider(props: React.PropsWithChildren<{}>) {


  return <SessionContext.Provider value={undefined}>{props.children}</SessionContext.Provider>;
}

export function useSession() {
  const provider = useProvider()
  const account = useAccount()

  const authenticate = async (resoruces: Array<string>) => {
    const address = account.address
    if (!address) return
    const authProvider = new EthereumAuthProvider(provider, address)
    const session = await DIDSession.authorize(authProvider, {
      resources: resoruces
    })
  }

  return {
    authenticate: authenticate
  }
}
