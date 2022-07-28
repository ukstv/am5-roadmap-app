import * as React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

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
  return (
    <div className={"container mx-auto"}>
      <div className={"flex justify-between top-menu my-4"}>
        <div className={"flex top-menu-menu"}>
          <div className={"font-bold italic"}>IAM</div>
          <div className={"flex ml-4"}>
            <ActiveLink href={"/favourites"}>Favourites</ActiveLink>
            <ActiveLink href={"/users"}>Users</ActiveLink>
            <ActiveLink href={"/policies"}>Policies</ActiveLink>
          </div>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
