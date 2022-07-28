import { gql } from '@apollo/client'
import { client } from '../../lib/graphql';
import {CacaoBlock} from "ceramic-cacao";
import * as uint8arrays from "uint8arrays";

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
`

export default async function addAccess(policy: CacaoBlock) {
    console.log("in addAccess")
    try {
        const result = await client.mutate({
            mutation: CREATE_ACCESS_MUTATION,
            variables: {
                input: {
                    content: {
                        descr: "new access policy",
                        policy: uint8arrays.toString(policy.bytes, "base64")
                    }
                }
            }
        })
        console.log("addAccess:", result)
    } catch (e) {
        console.error(e)
    }
}