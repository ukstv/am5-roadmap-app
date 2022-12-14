import * as React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import {getClients, Clients} from "../../lib/graphql";
import { ApolloProvider } from "@apollo/client";
import Image from "next/image";

function ActiveLink(props: React.PropsWithChildren<{ href: string }>) {
  const router = useRouter();
  let className = "top-menu-menu-item";
  if (router.pathname === props.href) {
    className = `${className} active`;
  }

  return (
    <Link href={props.href} passHref={true}>
      <a className={className}>{props.children}</a>
    </Link>
  );
}

export function Container(props: React.PropsWithChildren<{}>) {
  const [state, setState] = useState<Clients | undefined>(undefined)
  useEffect(() => {
    loadClients().catch(err => console.log(err))
  }, [])

  let loadClients = async () => {
    setState(await getClients())
  };

  if (state) {
    return (
        <ApolloProvider client={state.apolloClient}>
        <div className={"container mx-auto"}>
          <div className={"flex justify-between top-menu my-4"}>
            <div className={"flex top-menu-menu"}>
              <div className={"font-bold italic"}><Image width={"152"} height={"37"} src="/ceramic_web3sso.png"></Image></div>
              <div className={"flex ml-4"}>
                {/*<ActiveLink href={"/favourites"}>Favourites</ActiveLink>*/}
                {/*<ActiveLink href={"/users"}>Users</ActiveLink>*/}
                <ActiveLink href={"/policies"}>Policies</ActiveLink>
                <ActiveLink href={"/secret"}>Secret of Success</ActiveLink>
              </div>
            </div>
            <div>
              <ConnectButton/>
            </div>
          </div>
          <div>{props.children}</div>
        </div>
        </ApolloProvider>
    );
  } else {
    return (
        <div>Loading...</div>
    )
  }
}
