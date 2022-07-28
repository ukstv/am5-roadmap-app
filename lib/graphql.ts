import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    NormalizedCacheObject,
    Observable,
} from '@apollo/client'
import { ComposeClient } from '@composedb/client'
import { definition } from './__generated__/definition'
import * as ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import * as KeyDidResolver from 'key-did-resolver'
import * as PkhDidResolver from 'pkh-did-resolver'
import { Resolver } from 'did-resolver'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { relayStylePagination } from '@apollo/client/utilities'
import { EthereumAuthProvider } from "@ceramicnetwork/blockchain-utils-linking";
import { DIDSession } from "did-session";

const SEED = '1515f3a1b8f0325274783382097cfc592dd49ded127e27a7459c1b6be1e85cf4'

let apolloClient: ApolloClient<NormalizedCacheObject>
let composeClient: ComposeClient

export type Clients = {
    apolloClient: ApolloClient<NormalizedCacheObject>
    composeClient: ComposeClient
}

export async function getClients(): Promise<Clients> {
    if (!composeClient) {
        composeClient = new ComposeClient({
            ceramic: 'http://localhost:7007',
            definition,
        });

        const ceramicClientInstance = new CeramicClient('http://localhost:7007')

        // @ts-ignore
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })
        const authProvider = new EthereumAuthProvider(
          // @ts-ignore
          window.ethereum,
          accounts[0],
        )
        const session = await DIDSession.authorize(authProvider, {
            resources: [],
        })

        // const provider = new Ed25519Provider(u8a.fromString(SEED, 'base16'))


        const keyDidResolver = KeyDidResolver.getResolver()
        const pkhDidResolver = PkhDidResolver.getResolver()
        const threeIdResolver = ThreeIdResolver.getResolver(ceramicClientInstance)
        const resolver = new Resolver({
            ...threeIdResolver,
            ...pkhDidResolver,
            ...keyDidResolver,
        })
        // const did = new DID({ provider: session.did, resolver })

        // did.authenticate()

        composeClient.setDID(session.did)
    }

    if (!apolloClient) {
        const link = new ApolloLink((operation) => {
            return new Observable((observer) => {
                composeClient.execute(operation.query, operation.variables).then(
                    (result) => {
                        observer.next(result)
                        observer.complete()
                    },
                    (error) => {
                        observer.error(error)
                    }
                )
            })
        })

        const cache = new InMemoryCache({
            typePolicies: {
                CeramicAccount: {
                    fields: {
                        noteList: relayStylePagination(),
                    },
                },
            },
        })

        apolloClient = new ApolloClient({ cache, link })
    }

    return { apolloClient, composeClient }
}
