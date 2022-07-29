import { gql } from '@apollo/client'
import { getClients } from '../../lib/graphql';
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
    const {apolloClient} = await getClients()
    try {
        const result = await apolloClient.mutate({
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