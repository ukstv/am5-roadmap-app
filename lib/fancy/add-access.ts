import { gql } from "@apollo/client";
import { getClients } from "../../lib/graphql";
import { CacaoBlock } from "ceramic-cacao";
import * as uint8arrays from "uint8arrays";
import { StreamID } from "@ceramicnetwork/streamid";

const CREATE_ACCESS_MUTATION = gql`
  mutation CreateAccess($input: CreateAccessInput!) {
    createAccess(input: $input) {
      document {
        id
        descr
        policy
      }
    }
  }
`;

export default async function addAccess(
  buildBlock: (streamId: string) => Promise<CacaoBlock>
): Promise<StreamID> {
  const { apolloClient } = await getClients();
  const result0 = await apolloClient.mutate({
    mutation: CREATE_ACCESS_MUTATION,
    variables: {
      input: {
        content: {
          descr: "new access policy",
        },
      },
    },
  });
  const streamId = result0.data.createAccess.document.id;
  const block = await buildBlock(streamId);
  const result1 = await apolloClient.mutate({
    mutation: CREATE_ACCESS_MUTATION,
    variables: {
      input: {
        content: {
          descr: "new access policy",
          policy: uint8arrays.toString(block.bytes, "base64url"),
        },
      },
    },
  });
  return StreamID.fromString(result1.data.createAccess.document.id);
}
