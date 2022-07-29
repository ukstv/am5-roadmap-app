import { gql } from '@apollo/client'
import { getClients } from '../../lib/graphql';

const ROADMAP_AUTH_QUERY = gql`
    query {
        accessIndex(last: 100) {
            edges {
                node {
                    id
                }
            }
        }
    }
`

export default async function accessRoadmap() {
    const {apolloClient} = await getClients()
    const authResults = await apolloClient.query({
        query: ROADMAP_AUTH_QUERY,
        fetchPolicy: 'network-only'
    })
    const authEntries = authResults.data.accountIndex?.edges || {}
    console.log("authEntries:", authEntries)
    // Verify policy and return roadmap
}