import { gql } from "@apollo/client";
import { getClients } from "../../lib/graphql";
import { parseResource } from "../perm1";

const ROADMAP_AUTH_QUERY = gql`
  query {
    accessIndex(last: 100) {
      edges {
        node {
          id
          descr
          policy
        }
      }
    }
  }
`;

export default async function accessRoadmap(
  userAddress: string,
  policyStream: string
) {
  const { apolloClient } = await getClients();
  const authResults = await apolloClient.query({
    query: ROADMAP_AUTH_QUERY,
    fetchPolicy: "network-only",
  });
  const authEntries = authResults.data.accessIndex?.edges || [];
  const found = authEntries.find((e: any) => e.node.id === policyStream);
  const cacao = found?.node.policy;
  if (cacao && userAddress) {
    const parsedCacao = parseResource(cacao);
    const aud = parsedCacao.p.aud.replace(/did:pkh:eip155:\d+:/, "");
    if (userAddress.toLowerCase() === aud.toLowerCase()) {
      return true;
    }
  }
  return false;
}
